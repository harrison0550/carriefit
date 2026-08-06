const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const context = { self: {} };
vm.createContext(context);
vm.runInContext(
  fs.readFileSync(path.join(root, "workout-navigation.js"), "utf8"),
  context,
  { filename: "workout-navigation.js" },
);

const navigation = context.self.CARRIEFIT_WORKOUT_NAVIGATION;

{
  const state = { step: 4, workoutScroll: 0 };
  navigation.captureWorkoutScroll(state, 638.5);
  assert.strictEqual(state.workoutScroll, 638.5);

  const frames = [];
  const scrollCalls = [];
  assert.strictEqual(
    navigation.restoreWorkoutScroll(
      state,
      (options) => scrollCalls.push(options),
      (callback) => frames.push(callback),
    ),
    true,
  );
  assert.strictEqual(state.workoutScroll, 0, "saved position is consumed once");
  assert.strictEqual(scrollCalls.length, 0, "restoration waits for rendered layout");
  frames.shift()();
  assert.strictEqual(scrollCalls.length, 0, "restoration waits for a second frame");
  frames.shift()();
  assert.deepStrictEqual(
    JSON.parse(JSON.stringify(scrollCalls)),
    [{ top: 638.5, behavior: "auto" }],
    "resuming restores the exact prior position without animation",
  );
  assert.strictEqual(
    navigation.restoreWorkoutScroll(state, () => {}, () => {}),
    false,
    "consumed positions do not cause repeated auto-scroll",
  );
}

{
  const state = { step: 4, workoutScroll: 638.5 };
  const scrollCalls = [];
  navigation.advanceExercise(state);
  assert.strictEqual(state.step, 5);
  assert.strictEqual(state.workoutScroll, 0);
  assert.strictEqual(scrollCalls.length, 0, "state advances before the new exercise renders");
  navigation.scrollToNextExercise((options) => scrollCalls.push(options));
  assert.deepStrictEqual(
    JSON.parse(JSON.stringify(scrollCalls)),
    [{ top: 0, behavior: "smooth" }],
    "only intentional exercise advancement scrolls to the top",
  );
}

{
  const state = { workoutScroll: 100 };
  navigation.captureWorkoutScroll(state, -50);
  assert.strictEqual(state.workoutScroll, 0, "invalid negative positions are clamped");
}

console.log(
  "BUG-001 regression tests passed: resume restoration is exact and next-exercise scrolling is intentional.",
);
