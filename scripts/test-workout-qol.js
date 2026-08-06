const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "app.css"), "utf8");

assert.match(app, /function playTimerCompleteSound\(\)/);
assert.match(app, /window\.AudioContext\|\|window\.webkitAudioContext/);
assert.match(app, /playTimerCompleteSound\(\);navigator\.vibrate/);
assert.match(app, /role="status" aria-live="polite"/);
assert.match(app, /function lastCompletedWeight\(ex\)/);
assert.match(app, /Last completed:/);
assert.match(css, /\.weight-entry-explainer \.previous-weight/);
assert.match(app, /muscles:ex\.muscles\|\|""/);
assert.match(app, /x\.muscles\|\|historyMuscles\(x\.name\)/);
assert.match(app, /function nextHomeWorkoutSession\(sessions,history,today,excludeId=null\)/);
assert.match(app, /!isCompletedScheduleSession\(item,history\)/);
assert.match(app, /const primaryLabel=active\?"WORKOUT IN PROGRESS":nextIsFuture\?`UP NEXT/);
assert.match(app, /previewNextWorkout/);
assert.match(
  app,
  /else if\(tab==="progress"\)\{\s*state\.historyView=null;\s*render\(\);/,
  "Progress navigation must pass through render() so its bottom-tab active state updates",
);

console.log(
  "Workout quality-of-life tests passed: audible timer, previous weights, next scheduled workout, and muscle recovery history fallback.",
);
