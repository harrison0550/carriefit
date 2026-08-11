const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const context = { self: {} };
vm.runInNewContext(
  fs.readFileSync(path.join(root, "workout-history.js"), "utf8"),
  context,
  { filename: "workout-history.js" },
);
const historyTools = context.self.CARRIEFIT_WORKOUT_HISTORY;

const affected = [{
  completedDate: "2026-08-10",
  exercises: [{
    name: "Smith Machine RDL",
    sets: [
      { weight: "20", reps: "10" },
      { weight: "20", reps: "10" },
      { weight: "20", reps: "10" },
    ],
  }, {
    name: "Smith Bulgarian Split Squat",
    sets: [{ weight: "0", reps: "10" }, { weight: "0", reps: "10" }],
  }],
}];
assert.strictEqual(historyTools.repairLostSetCompletions(affected), true);
assert(affected[0].exercises.flatMap((exercise) => exercise.sets).every((set) => set.done));
assert.strictEqual(affected[0].setCompletionRepair, "recorded-values-v2");
assert.strictEqual(historyTools.repairLostSetCompletions(affected), false, "repair must be idempotent");

const intentionallyIncomplete = [{
  completedDate: "2026-08-10",
  exercises: [{ sets: [null, { weight: "", reps: "" }] }],
}];
assert.strictEqual(historyTools.repairLostSetCompletions(intentionallyIncomplete), false);

const mixed = [{
  completedDate: "2026-08-10",
  exercises: [{ sets: [{ weight: "10", reps: "8", done: true }, { weight: "10", reps: "8" }] }],
}];
assert.strictEqual(historyTools.repairLostSetCompletions(mixed), false, "sessions with any explicit completion must remain unchanged");

const postMigrationWorkout = [{
  date: "8/10/2026",
  setCompletionRepair: "recorded-values-v1",
  exercises: [{ sets: [{ weight: "35", reps: "10" }] }],
}];
assert.strictEqual(historyTools.repairLostSetCompletions(postMigrationWorkout), true, "startup repair must revisit a workout saved after the first one-time migration");
assert.strictEqual(postMigrationWorkout[0].exercises[0].sets[0].done, true);
assert.strictEqual(postMigrationWorkout[0].setCompletionRepair, "recorded-values-v2");

const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
assert.match(app, /function syncVisibleSetRows\(ex\)/);
assert.match(app, /document\.querySelector\("#next"\)\.onclick=\(\)=>next\(ex\)/);
assert.match(app, /function next\(ex\)\{\s*if\(ex\?\.type==="strength"\)syncVisibleSetRows\(ex\)/);
assert.match(app, /recoverV1131History\(\);\s*window\.CARRIEFIT_WORKOUT_HISTORY\.repairLostSetCompletions\(state\.history\);/);

console.log("Set-completion history tests passed: visible green checks are flushed before navigation and affected recorded sessions repair safely.");
