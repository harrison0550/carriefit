const assert = require("assert");
const fs = require("fs");
const path = require("path");

const app = fs.readFileSync(path.resolve(__dirname, "..", "app.js"), "utf8");
const previewSource = app.match(/function showDayPlan\([\s\S]*?\n}/)?.[0];

assert(previewSource, "showDayPlan must exist");
assert.match(previewSource, /workoutForDay\(dayIndex\)\.map\(exercise=>exercise\.name\)/, "preview steps must come from the actual guided workout");
assert.doesNotMatch(previewSource, /guided timer flow will be added/, "implemented cardio and recovery workouts must not show the obsolete preview-only alert");
assert.match(previewSource, /if\(day\.action==="progress"\)return setTab\("progress"\);/, "Sunday check-in must continue to open Progress");
assert.match(previewSource, /startNewSession\(dayIndex,selectedSchedule\);setTab\("workout"\);/, "every other scheduled program day must launch through the existing workout engine");
assert.match(app, /function coreRecoveryWorkout\(\)[\s\S]*?Easy Recovery Walk[\s\S]*?Slow Breathing Cooldown/, "Core + Recovery must retain its complete guided sequence");

console.log("Guided preview checks passed: cardio and recovery previews match and launch the existing workout engine.");
