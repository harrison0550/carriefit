(function (root) {
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
    return parseDateKey(key).getDay() === 0;
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
    completeRecoveredWorkout,
    isRestDate,
    moveWorkout,
    nextAvailableTrainingDates,
    nextTrainingDates,
    recoverWorkoutToday,
    rescheduleWorkout,
    scheduleActivationDate,
  });
})(typeof self !== "undefined" ? self : window);
