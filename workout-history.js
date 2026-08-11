(function (root) {
  function recordedSet(set) {
    return !!set
      && typeof set === "object"
      && Object.prototype.hasOwnProperty.call(set, "weight")
      && Object.prototype.hasOwnProperty.call(set, "reps")
      && set.weight !== ""
      && set.weight !== null
      && set.weight !== undefined
      && set.reps !== ""
      && set.reps !== null
      && set.reps !== undefined;
  }

  function localDateKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  function completedDateKey(session) {
    const direct = session.completedDate || session.actualCompletionDate || session.dateKey;
    if (direct) return direct;
    const parsed = new Date(session.completedAt || session.date || "");
    return Number.isNaN(parsed.getTime()) ? "" : localDateKey(parsed);
  }

  function repairLostSetCompletions(history, effectiveDate = "2026-08-10") {
    let changed = false;
    (Array.isArray(history) ? history : []).forEach((session) => {
      if (!session || typeof session !== "object") return;
      const completedDate = completedDateKey(session);
      if (completedDate < effectiveDate || session.setCompletionRepair === "recorded-values-v3") return;
      const sets = (session.exercises || []).flatMap((exercise) => exercise.sets || []);
      if (!sets.length) return;
      const recorded = sets.filter((set) => recordedSet(set) && !set.done);
      if (!recorded.length) return;
      recorded.forEach((set) => { set.done = true; });
      session.setCompletionRepair = "recorded-values-v3";
      changed = true;
    });
    return changed;
  }

  root.CARRIEFIT_WORKOUT_HISTORY = Object.freeze({
    recordedSet,
    completedDateKey,
    repairLostSetCompletions,
  });
})(typeof self !== "undefined" ? self : window);
