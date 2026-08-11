(function (root) {
  function recordedSet(set) {
    return !!set
      && typeof set === "object"
      && Object.prototype.hasOwnProperty.call(set, "weight")
      && Object.prototype.hasOwnProperty.call(set, "reps")
      && set.reps !== ""
      && set.reps !== null
      && set.reps !== undefined;
  }

  function repairLostSetCompletions(history, effectiveDate = "2026-08-10") {
    let changed = false;
    (Array.isArray(history) ? history : []).forEach((session) => {
      if (!session || typeof session !== "object") return;
      const completedDate = session.completedDate
        || session.actualCompletionDate
        || session.dateKey
        || "";
      if (completedDate < effectiveDate || session.setCompletionRepair) return;
      const sets = (session.exercises || []).flatMap((exercise) => exercise.sets || []);
      if (!sets.length || sets.some((set) => set?.done)) return;
      const recorded = sets.filter(recordedSet);
      if (!recorded.length) return;
      recorded.forEach((set) => { set.done = true; });
      session.setCompletionRepair = "recorded-values-v1";
      changed = true;
    });
    return changed;
  }

  root.CARRIEFIT_WORKOUT_HISTORY = Object.freeze({
    recordedSet,
    repairLostSetCompletions,
  });
})(typeof self !== "undefined" ? self : window);
