const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "app.css"), "utf8");
const sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");

assert.match(app, /<h2>Workout Details<\/h2>/);
assert.match(app, /SCHEDULED DATE/);
assert.match(app, /WORKOUT TYPE/);
assert.match(app, /data-start-calendar-workout="\$\{item\.id\}">Start Workout<\/button>/);
assert.match(app, /data-reschedule-recovery="\$\{item\.id\}">Reschedule<\/button>/);
assert.doesNotMatch(app, /function openWorkoutRecovery/);
assert.doesNotMatch(app, /Open workout recovery/);
assert.match(app, /Move to Today/);
assert.match(app, /Move to Tomorrow/);
assert.match(app, /Choose Date…/);
assert.match(app, /Reschedule Workout/);
assert.match(app, /if\(!alreadyActive\)startNewSession\(session\.planDay,session\)/);
assert.match(
  app,
  /You completed a workout that was originally scheduled for yesterday\./,
);
assert.match(app, /What would you like to do with today’s scheduled workout\?/);
assert.match(app, /Replace today’s workout with the one I just completed/);
assert.match(app, /Keep today’s workout/);
assert.match(app, /Decide later/);
assert.match(app, /actualCompletionDate/);
assert.match(app, /completedDate/);
assert.match(app, /recoveryIndicator/);
assert.match(app, /Originally planned:/);
assert.match(app, /Completed:/);
assert.match(css, /\.calendar-day\.status-missed/);
assert.match(css, /\.recovery-workout-facts/);
assert.match(css, /grid-template-columns:minmax\(0,1fr\)/);
assert.match(sw, /"\.\/scheduling\.js"/);
assert.match(sw, /"\.\/app\.js"/);
assert.match(app, /const CARRIEFIT_STORAGE_KEY="carriefitv5"/);

console.log(
  "Recovered workout flow tests passed: Calendar recovery launch, deferred scheduling choice, history dates, responsive layout, offline shell, and storage compatibility.",
);
