(function (root) {
  const REST_DAY_INDEX = 4;

  function parseDateKey(key) {
    const [year, month, day] = key.split("-").map(Number);
    return new Date(year, month - 1, day, 12);
  }

  function localDateKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  function addCalendarDays(key, amount) {
    const date = parseDateKey(key);
    date.setDate(date.getDate() + amount);
    return localDateKey(date);
  }

  function scheduleActivationDate(existingDate, today) {
    const yesterday = addCalendarDays(today, -1);
    return !existingDate || existingDate > yesterday ? yesterday : existingDate;
  }

  function isRestDate(key) {
    return parseDateKey(key).getDay() === REST_DAY_INDEX;
  }

  function nextTrainingDates(fromKey, count) {
    const dates = [];
    for (let offset = 0; dates.length < count && offset < 400; offset++) {
      const key = addCalendarDays(fromKey, offset);
      if (!isRestDate(key)) dates.push(key);
    }
    return dates;
  }

  function nextAvailableTrainingDates(fromKey, count, blockedDates) {
    const blocked = new Set(blockedDates || []);
    const dates = [];
    for (let offset = 0; dates.length < count && offset < 400; offset++) {
      const key = addCalendarDays(fromKey, offset);
      if (!isRestDate(key) && !blocked.has(key)) dates.push(key);
    }
    return dates;
  }

  function protectedDates(sessions) {
    return sessions
      .filter((item) => item.status === "completed" || item.status === "restDay")
      .map((item) => item.scheduledDate);
  }

  function repairStrengthRecoveryCadence(sessions, today) {
    const occurrenceDate = (item) => item.status === "completed"
      ? item.completedDate || item.actualCompletionDate || item.scheduledDate
      : item.scheduledDate;
    const ordered = sessions
      .filter((item) => item.status !== "restDay" && occurrenceDate(item))
      .sort((a, b) => occurrenceDate(a).localeCompare(occurrenceDate(b)) ||
        String(a.plannedDate || "").localeCompare(String(b.plannedDate || "")));
    let changed = false;
    for (let index = 1; index < ordered.length; index++) {
      const previous = ordered[index - 1];
      const current = ordered[index];
      if (
        previous.workoutType !== "strength" ||
        current.workoutType !== "strength" ||
        current.status === "completed" ||
        current.scheduledDate < today ||
        current.scheduledDate !== addCalendarDays(occurrenceDate(previous), 1)
      ) continue;
      const recoveryIndex = ordered.findIndex((candidate, candidateIndex) =>
        candidateIndex > index &&
        candidate.status !== "completed" &&
        candidate.status !== "restDay" &&
        candidate.workoutType !== "strength" &&
        candidate.scheduledDate >= current.scheduledDate,
      );
      if (recoveryIndex < 0) continue;
      const recovery = ordered[recoveryIndex];
      const strengthDate = current.scheduledDate;
      current.scheduledDate = recovery.scheduledDate;
      recovery.scheduledDate = strengthDate;
      [current, recovery].forEach((item) => {
        item.status = item.scheduledDate === item.plannedDate ? "scheduled" : "rescheduled";
        item.cadenceRepair = "alternate-strength-recovery-v1";
      });
      ordered.sort((a, b) => occurrenceDate(a).localeCompare(occurrenceDate(b)) ||
        String(a.plannedDate || "").localeCompare(String(b.plannedDate || "")));
      changed = true;
      index = 0;
    }
    return changed;
  }

  function recoverWorkoutToday(sessions, missedId, choice, today) {
    const missed = sessions.find((item) => item.id === missedId);
    if (!missed) return false;

    missed.scheduledDate = today;
    missed.status = "rescheduled";
    if (choice === "both") return true;

    const movable = sessions
      .filter(
        (item) =>
          item.id !== missed.id &&
          item.status !== "restDay" &&
          item.scheduledDate >= today &&
          item.status !== "completed",
      )
      .sort(
        (a, b) =>
          a.scheduledDate.localeCompare(b.scheduledDate) ||
          a.plannedDate.localeCompare(b.plannedDate),
      );
    const targets = nextAvailableTrainingDates(
      addCalendarDays(today, 1),
      movable.length,
      protectedDates(sessions),
    );
    movable.forEach((item, index) => {
      item.scheduledDate = targets[index];
      item.status =
        item.scheduledDate === item.plannedDate ? "scheduled" : "rescheduled";
    });
    return true;
  }

  function completeRecoveredWorkout(sessions, missedId, today, decision) {
    const recovered = sessions.find((item) => item.id === missedId);
    if (!recovered) return false;

    recovered.status = "completed";
    recovered.actualCompletionDate = today;
    recovered.completedDate = today;
    if (decision !== "replace") return true;

    const movable = sessions
      .filter(
        (item) =>
          item.id !== recovered.id &&
          item.status !== "restDay" &&
          item.status !== "completed" &&
          item.scheduledDate >= today,
      )
      .sort(
        (a, b) =>
          a.scheduledDate.localeCompare(b.scheduledDate) ||
          a.plannedDate.localeCompare(b.plannedDate),
      );
    const targets = nextAvailableTrainingDates(
      addCalendarDays(today, 1),
      movable.length,
      protectedDates(sessions),
    );
    movable.forEach((item, index) => {
      item.scheduledDate = targets[index];
      item.status =
        item.scheduledDate === item.plannedDate ? "scheduled" : "rescheduled";
    });
    return true;
  }

  function completeEarlyWorkout(sessions, sessionId, completedDate) {
    const early = sessions.find((item) => item.id === sessionId);
    if (
      !early ||
      early.status === "restDay" ||
      !completedDate ||
      !early.scheduledDate ||
      completedDate >= early.scheduledDate
    ) {
      return false;
    }

    const originalScheduledDate = early.scheduledDate;
    const movable = sessions
      .filter(
        (item) =>
          item.id !== early.id &&
          item.status !== "restDay" &&
          item.status !== "completed" &&
          item.scheduledDate >= originalScheduledDate,
      )
      .sort(
        (a, b) =>
          a.scheduledDate.localeCompare(b.scheduledDate) ||
          a.plannedDate.localeCompare(b.plannedDate),
      );

    early.originalScheduledDate = early.originalScheduledDate || originalScheduledDate;
    early.scheduledDate = completedDate;
    early.status = "completed";
    early.completedDate = completedDate;
    early.actualCompletionDate = completedDate;
    early.earlyCompletionAdjusted = true;

    const targets = nextAvailableTrainingDates(
      addCalendarDays(completedDate, 1),
      movable.length,
      protectedDates(sessions),
    );
    movable.forEach((item, index) => {
      item.scheduledDate = targets[index];
      item.status =
        item.scheduledDate === item.plannedDate ? "scheduled" : "rescheduled";
    });
    return true;
  }

  function shiftWorkoutRotationForwardOneDay(sessions, fromDate) {
    const movable = sessions
      .filter(
        (item) =>
          item.status !== "completed" &&
          item.status !== "restDay" &&
          item.scheduledDate >= fromDate,
      )
      .sort(
        (a, b) =>
          a.scheduledDate.localeCompare(b.scheduledDate) ||
          String(a.plannedDate || "").localeCompare(String(b.plannedDate || "")),
      );
    if (!movable.some((item) => item.scheduledDate === fromDate)) return false;

    const targets = nextAvailableTrainingDates(
      addCalendarDays(fromDate, 1),
      movable.length,
      protectedDates(sessions),
    );
    movable.forEach((item, index) => {
      item.scheduledDate = targets[index];
      item.status = item.scheduledDate === item.plannedDate ? "scheduled" : "rescheduled";
      item.rotationShift = "august-31-forward-one-day-v1";
    });
    return true;
  }

  function reconcileEarlyWorkoutCompletions(sessions, history) {
    const completionBySchedule = new Map(
      (Array.isArray(history) ? history : [])
        .filter((item) => item?.scheduleId)
        .map((item) => [
          item.scheduleId,
          item.completedDate ||
            item.actualCompletionDate ||
            item.dateKey ||
            (item.completedAt ? localDateKey(new Date(item.completedAt)) : null),
        ]),
    );
    const candidates = sessions
      .map((item) => ({
        item,
        completedDate:
          item.completedDate ||
          item.actualCompletionDate ||
          completionBySchedule.get(item.id) ||
          null,
      }))
      .filter(
        ({ item, completedDate }) =>
          completedDate && item.scheduledDate && completedDate < item.scheduledDate,
      )
      .sort(
        (a, b) =>
          a.completedDate.localeCompare(b.completedDate) ||
          a.item.scheduledDate.localeCompare(b.item.scheduledDate),
      );

    return candidates.reduce(
      (count, candidate) =>
        completeEarlyWorkout(sessions, candidate.item.id, candidate.completedDate)
          ? count + 1
          : count,
      0,
    );
  }

  function applyWeeklyRestDayPolicy(sessions, options) {
    const {
      effectiveDate,
      today,
      restPlanDay,
      formerRestPlanDay,
      restName,
      activeName,
      activeWorkoutType,
    } = options;

    sessions.forEach((item) => {
      if (item.status === "completed") return;
      if (
        item.planDay === formerRestPlanDay &&
        item.status === "restDay" &&
        item.plannedDate < effectiveDate
      ) {
        item.planDay = restPlanDay;
        item.scheduledDate = addCalendarDays(item.plannedDate, -3);
        item.name = restName;
        item.workoutType = "recovery";
        return;
      }
      if (item.plannedDate < effectiveDate) return;
      if (item.planDay === restPlanDay) {
        item.scheduledDate = item.plannedDate;
        item.name = restName;
        item.workoutType = "recovery";
        item.status = "restDay";
      } else if (item.planDay === formerRestPlanDay && item.status === "restDay") {
        item.scheduledDate = item.plannedDate;
        item.name = activeName;
        item.workoutType = activeWorkoutType;
        item.status = item.plannedDate < today ? "missed" : "scheduled";
      }
    });

    const anchor = sessions
      .filter(
        (item) =>
          item.status === "completed" &&
          item.completedDate &&
          item.originalScheduledDate &&
          item.completedDate < item.originalScheduledDate,
      )
      .sort(
        (a, b) =>
          b.completedDate.localeCompare(a.completedDate) ||
          b.plannedDate.localeCompare(a.plannedDate),
      )[0];
    if (!anchor) return true;

    const movable = sessions
      .filter(
        (item) =>
          item.status !== "restDay" &&
          item.status !== "completed" &&
          item.plannedDate > anchor.plannedDate,
      )
      .sort((a, b) => a.plannedDate.localeCompare(b.plannedDate));
    const targets = nextAvailableTrainingDates(
      addCalendarDays(anchor.completedDate, 1),
      movable.length,
      protectedDates(sessions),
    );
    movable.forEach((item, index) => {
      item.scheduledDate = targets[index];
      item.status =
        item.scheduledDate === item.plannedDate ? "scheduled" : "rescheduled";
    });
    return true;
  }

  function rescheduleWorkout(sessions, sessionId, targetDate, minimumDate) {
    const session = sessions.find((item) => item.id === sessionId);
    if (
      !session ||
      session.status === "completed" ||
      session.status === "restDay" ||
      !targetDate ||
      targetDate < minimumDate ||
      isRestDate(targetDate)
    ) {
      return false;
    }

    const blocked = protectedDates(sessions);
    if (blocked.includes(targetDate)) return false;

    const hasCollision = sessions.some(
      (item) =>
        item.id !== session.id &&
        item.status !== "restDay" &&
        item.status !== "completed" &&
        item.scheduledDate === targetDate,
    );
    session.scheduledDate = targetDate;
    session.status = "rescheduled";
    if (!hasCollision) return true;

    const movable = sessions
      .filter(
        (item) =>
          item.id !== session.id &&
          item.status !== "restDay" &&
          item.status !== "completed" &&
          item.scheduledDate >= targetDate,
      )
      .sort(
        (a, b) =>
          a.scheduledDate.localeCompare(b.scheduledDate) ||
          a.plannedDate.localeCompare(b.plannedDate),
      );
    const targets = nextAvailableTrainingDates(
      addCalendarDays(targetDate, 1),
      movable.length,
      blocked,
    );
    movable.forEach((item, index) => {
      item.scheduledDate = targets[index];
      item.status =
        item.scheduledDate === item.plannedDate ? "scheduled" : "rescheduled";
    });
    return true;
  }

  function moveWorkout(sessions, sessionId, targetDate, minimumDate) {
    const session = sessions.find((item) => item.id === sessionId);
    if (!session || !targetDate || targetDate < minimumDate) return false;
    session.scheduledDate = targetDate;
    session.status = "rescheduled";
    return true;
  }

  root.CARRIEFIT_SCHEDULING = Object.freeze({
    addCalendarDays,
    applyWeeklyRestDayPolicy,
    completeEarlyWorkout,
    completeRecoveredWorkout,
    isRestDate,
    moveWorkout,
    nextAvailableTrainingDates,
    nextTrainingDates,
    recoverWorkoutToday,
    repairStrengthRecoveryCadence,
    reconcileEarlyWorkoutCompletions,
    rescheduleWorkout,
    scheduleActivationDate,
    shiftWorkoutRotationForwardOneDay,
  });
})(typeof self !== "undefined" ? self : window);
