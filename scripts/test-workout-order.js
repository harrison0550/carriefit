const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const dataSource = fs.readFileSync(path.join(root, "data.js"), "utf8");
const context = { window: {} };
vm.runInNewContext(dataSource, context, { filename: "data.js" });

assert(
  app.includes('if(ex.type==="cooldown")return 7;'),
  "every strength workout must place cooldown exercises in the final setup group",
);
assert(
  !app.includes('(dayIndex===2||dayIndex===4)&&ex.type==="cooldown"'),
  "cooldown ordering must not exclude Full Body A",
);

const fullBodyA = Array.from(context.window.WORKOUT_DATA);
const ordered = fullBodyA
  .map((exercise, index) => ({
    exercise,
    index,
    group: exercise.type === "cooldown" ? 7 : 0,
  }))
  .sort((a, b) => a.group - b.group || a.index - b.index)
  .map(({ exercise }) => exercise.name);

assert.deepStrictEqual(
  ordered.slice(-2),
  ["Easy Treadmill Cooldown", "Post-Workout Stretch"],
  "Full Body A must finish with the cooldown followed by post-workout stretching",
);

console.log(
  "Workout-order regression tests passed: Full Body A finishes with Easy Treadmill Cooldown and Post-Workout Stretch.",
);
