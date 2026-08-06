(function (root) {
  function advanceExercise(state) {
    state.step++;
    state.workoutScroll = 0;
  }

  function scrollToNextExercise(scrollTo) {
    scrollTo({ top: 0, behavior: "smooth" });
  }

  function captureWorkoutScroll(state, scrollY) {
    state.workoutScroll = Math.max(0, Number(scrollY) || 0);
  }

  function restoreWorkoutScroll(state, scrollTo, scheduleFrame) {
    if (!(state.workoutScroll > 0)) return false;
    const target = state.workoutScroll;
    state.workoutScroll = 0;
    scheduleFrame(() =>
      scheduleFrame(() => scrollTo({ top: target, behavior: "auto" })),
    );
    return true;
  }

  root.CARRIEFIT_WORKOUT_NAVIGATION = Object.freeze({
    advanceExercise,
    captureWorkoutScroll,
    restoreWorkoutScroll,
    scrollToNextExercise,
  });
})(typeof self !== "undefined" ? self : window);
