const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const app = fs.readFileSync(path.resolve(__dirname, "..", "app.js"), "utf8");
const helperSource = app.match(/function previewScheduleForDay\([\s\S]*?\n}/)?.[0];
assert(helperSource, "previewScheduleForDay helper must exist");

const context = {};
vm.runInNewContext(`${helperSource}; result=previewScheduleForDay;`, context);
const selectPreview = context.result;
const sessions = [
  {id:"today",planDay:1,scheduledDate:"2026-08-04",status:"scheduled"},
  {id:"tomorrow",planDay:2,scheduledDate:"2026-08-05",status:"scheduled"},
  {id:"next-week",planDay:2,scheduledDate:"2026-08-12",status:"scheduled"}
];

assert.strictEqual(selectPreview(sessions,2,"2026-08-04").id,"tomorrow","starting tomorrow's preview must select tomorrow's schedule entry");
assert.strictEqual(selectPreview(sessions,1,"2026-08-04").id,"today","starting today's preview must select today's schedule entry");
assert.match(app, /startNewSession\(dayIndex,selectedSchedule\)/, "preview launch must pass the selected day and schedule to the workout engine");
assert.match(app, /isToday=dayIndex===currentPlanIndex\(\)/, "preview must identify today on every weekday, not only Monday");
const selectedSessionSource = app.match(/function selectedWorkoutSessionForToday\([\s\S]*?\n}/)?.[0];
assert(selectedSessionSource, "workout landing must preserve a newly selected session before step one");
const landingContext = {};
vm.runInNewContext(`${selectedSessionSource}; result=selectedWorkoutSessionForToday;`, landingContext);
assert.strictEqual(landingContext.result({dateKey:"2026-08-04",planDay:2,scheduleId:"tomorrow"},"2026-08-04").planDay,2,"a step-zero Full Body B session must remain selected on Tuesday");
assert.strictEqual(landingContext.result({dateKey:"2026-08-03",planDay:2},"2026-08-04"),null,"a stale prior-day session must not override today");
assert.match(app, /const dayIndex=selectedSession[\s\S]*?selectedSession\.planDay/, "workout landing must derive its plan from the selected session");
assert.match(app, /if\(!selectedSession\)startNewSession\(dayIndex\)/, "launching a prepared early session must not create today's session over it");
assert.match(app, /isStartingEarly\?"STARTING EARLY"/, "the landing screen must identify an early workout explicitly");
assert.match(app, /item\.status==="missed"&&!item\.coachDismissedAt/, "dismissed missed workouts must stop producing coach recommendations");
assert.match(app, /session\.coachDismissedAt=new Date\(\)\.toISOString\(\)/, "leave-missed action must record its additive dismissal state");
assert.match(app, /session\.coachDisposition="leaveMissed"/, "leave-missed intent must be explicit");

const completedHelpers = [
  app.match(/function completedScheduleIds\([\s\S]*?\n}/)?.[0],
  app.match(/function isCompletedScheduleSession\([\s\S]*?\n}/)?.[0],
  app.match(/function nextHomeWorkoutSession\([\s\S]*?\n}/)?.[0]
].join("\n");
assert(completedHelpers.includes("function nextHomeWorkoutSession"), "Home must have a dedicated next-workout selector");
const homeContext = {};
vm.runInNewContext(`${completedHelpers}; result=nextHomeWorkoutSession;`, homeContext);
const selectHomeWorkout = homeContext.result;
const staleSchedule = [
  {id:"completed-today",plannedDate:"2026-08-04",scheduledDate:"2026-08-04",planDay:1,status:"scheduled"},
  {id:"upcoming",plannedDate:"2026-08-05",scheduledDate:"2026-08-05",planDay:2,status:"scheduled"}
];
assert.strictEqual(
  selectHomeWorkout(staleSchedule,[{scheduleId:"completed-today",dateKey:"2026-08-04"}],"2026-08-04").id,
  "upcoming",
  "Home must advance when today's workout is complete even if an older saved schedule still says scheduled"
);
assert.strictEqual(
  selectHomeWorkout(staleSchedule,[],"2026-08-04").id,
  "completed-today",
  "Home must continue to offer today's workout when it has not been completed"
);

console.log("Home workout-selection checks passed: completed days advance, future previews launch correctly, and missed recommendations can be dismissed safely.");
