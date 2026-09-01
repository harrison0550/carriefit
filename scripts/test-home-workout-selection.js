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
assert.match(app, /CARRIEFIT_SCHEMA_VERSION=12/, "saved CarrieFit data must run every current additive migration");
assert.match(app, /version:12,[\s\S]*?shiftWorkoutRotationForwardOneDay[\s\S]*?"2026-08-31"[\s\S]*?repairStrengthRecoveryCadence[\s\S]*?value\.schemaVersion=12/, "the migration must shift Carrie's incomplete August 31 rotation and retain the strength/recovery cadence");
assert.match(app, /reconcileEarlyWorkoutCompletions\([\s\S]*?value\.workoutSessions,[\s\S]*?value\.history/, "the migration must repair existing linked early-workout history");
assert.match(app, /completeEarlyWorkout\([\s\S]*?state\.workoutSessions,[\s\S]*?scheduled\.id,[\s\S]*?session\.completedDate/, "new early completions must shift the rotation at completion time");
assert.match(app, /version:8,[\s\S]*?applyWeeklyRestDayPolicy[\s\S]*?restPlanDay:3[\s\S]*?formerRestPlanDay:6[\s\S]*?value\.schemaVersion=8/, "the migration must move the protected rest day from Sunday to Thursday");
assert.match(app, /short:"THU"[\s\S]*?title:"Recovery \+ Check-in"[\s\S]*?action:"progress"/, "Thursday must be the protected recovery and check-in day");
assert.match(app, /short:"SUN"[\s\S]*?title:"Core \+ Recovery"[\s\S]*?action:"recovery"/, "Core + Recovery must move to Sunday");

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

const datePrioritySource = [
  app.match(/const DATE_STATUS_PRIORITY=[^;]+;/)?.[0],
  app.match(/function primarySessionForDate\([\s\S]*?\n}/)?.[0]
].join("\n");
assert(datePrioritySource.includes("function primarySessionForDate"), "dated views must have a shared primary-session selector");
const datePriorityContext = {};
vm.runInNewContext(`${datePrioritySource}; result=primarySessionForDate;`, datePriorityContext);
const selectPrimaryForDate = datePriorityContext.result;
assert.strictEqual(
  selectPrimaryForDate([
    {id:"original-saturday",plannedDate:"2026-08-08",status:"missed"},
    {id:"completed-early",plannedDate:"2026-08-10",status:"completed"}
  ]).id,
  "completed-early",
  "a completed early workout must be the visible status when its date also has an older missed workout"
);
assert.strictEqual(selectPrimaryForDate([]),null,"an empty date must not produce a primary session");
assert.match(app, /const session=primarySessionForDate\(entries\)/, "Home must use completed-first date status priority");
assert.match(app, /const primary=primarySessionForDate\(entries\)/, "Calendar must use completed-first date status priority");

console.log("Home workout-selection checks passed: completed days take visual priority, completed days advance, future previews launch correctly, and missed recommendations can be dismissed safely.");
