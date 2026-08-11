const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const context = { self: {} };
vm.createContext(context);
vm.runInContext(
  fs.readFileSync(path.join(root, "scheduling.js"), "utf8"),
  context,
  { filename: "scheduling.js" },
);

const scheduling = context.self.CARRIEFIT_SCHEDULING;
const TODAY = "2026-07-30";

assert.strictEqual(
  scheduling.scheduleActivationDate(undefined, TODAY),
  "2026-07-29",
  "new calendars must include yesterday so a missed workout remains recoverable",
);
assert.strictEqual(
  scheduling.scheduleActivationDate("2026-07-31", TODAY),
  "2026-07-29",
  "a UTC-derived future activation date must be repaired using the local calendar date",
);
assert.strictEqual(
  scheduling.scheduleActivationDate("2026-07-30", TODAY),
  "2026-07-29",
  "same-day activation must backfill yesterday",
);
assert.strictEqual(
  scheduling.scheduleActivationDate("2026-07-20", TODAY),
  "2026-07-20",
  "an earlier activation date and its existing history must be preserved",
);
assert.strictEqual(
  scheduling.scheduleActivationDate(
    scheduling.scheduleActivationDate("2026-07-31", TODAY),
    TODAY,
  ),
  "2026-07-29",
  "the activation repair must be idempotent",
);

function baseSchedule() {
  return [
    {
      id: "missed",
      plannedDate: "2026-07-29",
      scheduledDate: "2026-07-29",
      status: "missed",
    },
    {
      id: "today",
      plannedDate: "2026-07-30",
      scheduledDate: "2026-07-30",
      status: "scheduled",
    },
    {
      id: "friday",
      plannedDate: "2026-07-31",
      scheduledDate: "2026-07-31",
      status: "scheduled",
    },
    {
      id: "saturday",
      plannedDate: "2026-08-01",
      scheduledDate: "2026-08-01",
      status: "scheduled",
    },
    {
      id: "rest",
      plannedDate: "2026-08-06",
      scheduledDate: "2026-08-06",
      status: "restDay",
    },
    {
      id: "monday",
      plannedDate: "2026-08-03",
      scheduledDate: "2026-08-03",
      status: "scheduled",
    },
    {
      id: "completed",
      plannedDate: "2026-08-04",
      scheduledDate: "2026-08-04",
      status: "completed",
    },
  ];
}

function assertPlannedDatesUnchanged(before, after) {
  assert.deepStrictEqual(
    after.map((item) => [item.id, item.plannedDate]),
    before.map((item) => [item.id, item.plannedDate]),
    "plannedDate must remain immutable",
  );
}

for (const choice of ["replace", "forward"]) {
  const sessions = baseSchedule();
  const before = structuredClone(sessions);
  assert.strictEqual(
    scheduling.recoverWorkoutToday(sessions, "missed", choice, TODAY),
    true,
  );
  assertPlannedDatesUnchanged(before, sessions);
  assert.strictEqual(sessions.find((item) => item.id === "missed").scheduledDate, TODAY);
  assert.deepStrictEqual(
    sessions
      .filter((item) => ["today", "friday", "saturday", "monday"].includes(item.id))
      .map((item) => item.scheduledDate),
    ["2026-07-31", "2026-08-01", "2026-08-02", "2026-08-03"],
    `${choice} must preserve workout order and skip Thursday and completed dates`,
  );
  assert.deepStrictEqual(
    sessions.find((item) => item.id === "rest"),
    before.find((item) => item.id === "rest"),
    `${choice} must not move or change rest days`,
  );
  assert.deepStrictEqual(
    sessions.find((item) => item.id === "completed"),
    before.find((item) => item.id === "completed"),
    `${choice} must not move completed sessions`,
  );
}

{
  const sessions = baseSchedule();
  const before = structuredClone(sessions);
  assert.strictEqual(
    scheduling.recoverWorkoutToday(sessions, "missed", "both", TODAY),
    true,
  );
  assertPlannedDatesUnchanged(before, sessions);
  assert.strictEqual(sessions.find((item) => item.id === "missed").scheduledDate, TODAY);
  assert.strictEqual(sessions.find((item) => item.id === "today").scheduledDate, TODAY);
  assert.deepStrictEqual(
    sessions.find((item) => item.id === "rest"),
    before.find((item) => item.id === "rest"),
    "complete-both mode must leave rest days intact",
  );
}

{
  const sessions = baseSchedule();
  const before = structuredClone(sessions);
  assert.strictEqual(
    scheduling.completeRecoveredWorkout(sessions, "missed", TODAY, "replace"),
    true,
  );
  assertPlannedDatesUnchanged(before, sessions);
  assert.deepStrictEqual(
    {
      scheduledDate: sessions.find((item) => item.id === "missed").scheduledDate,
      actualCompletionDate: sessions.find((item) => item.id === "missed").actualCompletionDate,
      completedDate: sessions.find((item) => item.id === "missed").completedDate,
      status: sessions.find((item) => item.id === "missed").status,
    },
    {
      scheduledDate: "2026-07-29",
      actualCompletionDate: TODAY,
      completedDate: TODAY,
      status: "completed",
    },
    "recovery completion must preserve the original schedule date and record the actual date",
  );
  assert.deepStrictEqual(
    sessions
      .filter((item) => ["today", "friday", "saturday", "monday"].includes(item.id))
      .map((item) => item.scheduledDate),
    ["2026-07-31", "2026-08-01", "2026-08-02", "2026-08-03"],
    "replacement must shift future workouts in order and skip Thursday and completed dates",
  );
  assert.deepStrictEqual(
    sessions.find((item) => item.id === "rest"),
    before.find((item) => item.id === "rest"),
    "replacement must preserve protected rest days",
  );
  assert.deepStrictEqual(
    sessions.find((item) => item.id === "completed"),
    before.find((item) => item.id === "completed"),
    "replacement must never overwrite completed workouts",
  );
}

{
  const sessions = baseSchedule();
  const before = structuredClone(sessions);
  assert.strictEqual(
    scheduling.rescheduleWorkout(sessions, "missed", "2026-07-31", TODAY),
    true,
  );
  assertPlannedDatesUnchanged(before, sessions);
  assert.strictEqual(sessions.find((item) => item.id === "missed").scheduledDate, "2026-07-31");
  assert.deepStrictEqual(
    sessions
      .filter((item) => ["today", "friday", "saturday", "monday"].includes(item.id))
      .map((item) => item.scheduledDate),
    ["2026-07-30", "2026-08-01", "2026-08-02", "2026-08-03"],
    "rescheduling to an occupied day must shift future workouts without collisions",
  );
  assert.deepStrictEqual(
    sessions.find((item) => item.id === "rest"),
    before.find((item) => item.id === "rest"),
  );
  assert.deepStrictEqual(
    sessions.find((item) => item.id === "completed"),
    before.find((item) => item.id === "completed"),
  );
}

for (const target of ["2026-08-06", "2026-08-04", "2026-07-29"]) {
  const sessions = baseSchedule();
  const before = structuredClone(sessions);
  assert.strictEqual(
    scheduling.rescheduleWorkout(sessions, "missed", target, TODAY),
    false,
    `${target} must be rejected when it is a rest day, completed date, or before the minimum`,
  );
  assert.deepStrictEqual(sessions, before);
}

{
  const sessions = baseSchedule();
  const before = structuredClone(sessions);
  assert.strictEqual(
    scheduling.rescheduleWorkout(sessions, "missed", "2026-08-07", TODAY),
    true,
  );
  assert.strictEqual(
    sessions.find((item) => item.id === "missed").scheduledDate,
    "2026-08-07",
  );
  assert.deepStrictEqual(
    sessions.filter((item) => item.id !== "missed"),
    before.filter((item) => item.id !== "missed"),
    "an open target date must not shift unrelated future workouts",
  );
}

for (const decision of ["keep", "later"]) {
  const sessions = baseSchedule();
  const before = structuredClone(sessions);
  assert.strictEqual(
    scheduling.completeRecoveredWorkout(sessions, "missed", TODAY, decision),
    true,
  );
  assertPlannedDatesUnchanged(before, sessions);
  assert.strictEqual(sessions.find((item) => item.id === "missed").status, "completed");
  assert.strictEqual(
    sessions.find((item) => item.id === "missed").actualCompletionDate,
    TODAY,
  );
  assert.deepStrictEqual(
    sessions.find((item) => item.id === "today"),
    before.find((item) => item.id === "today"),
    `${decision} must leave today's scheduled workout unchanged`,
  );
}

{
  const sessions = [
    {id:"sunday-rest",plannedDate:"2026-08-09",scheduledDate:"2026-08-09",planDay:6,status:"restDay"},
    {id:"strength-a",plannedDate:"2026-08-10",scheduledDate:"2026-08-10",planDay:0,status:"inProgress"},
    {id:"cardio",plannedDate:"2026-08-11",scheduledDate:"2026-08-11",planDay:1,status:"scheduled"},
    {id:"strength-b",plannedDate:"2026-08-12",scheduledDate:"2026-08-12",planDay:2,status:"scheduled"},
    {id:"core",plannedDate:"2026-08-13",scheduledDate:"2026-08-13",planDay:3,status:"scheduled"},
    {id:"strength-c",plannedDate:"2026-08-14",scheduledDate:"2026-08-14",planDay:4,status:"scheduled"},
    {id:"zone-2",plannedDate:"2026-08-15",scheduledDate:"2026-08-15",planDay:5,status:"scheduled"},
    {id:"next-rest",plannedDate:"2026-08-16",scheduledDate:"2026-08-16",planDay:6,status:"restDay"},
    {id:"next-strength-a",plannedDate:"2026-08-17",scheduledDate:"2026-08-17",planDay:0,status:"scheduled"},
  ];
  const before = structuredClone(sessions);
  assert.strictEqual(
    scheduling.completeEarlyWorkout(sessions,"strength-a","2026-08-08"),
    true,
    "an early workout must become completed on its actual completion date",
  );
  assertPlannedDatesUnchanged(before,sessions);
  assert.deepStrictEqual(
    {
      scheduledDate:sessions.find(item=>item.id==="strength-a").scheduledDate,
      originalScheduledDate:sessions.find(item=>item.id==="strength-a").originalScheduledDate,
      completedDate:sessions.find(item=>item.id==="strength-a").completedDate,
      status:sessions.find(item=>item.id==="strength-a").status,
    },
    {
      scheduledDate:"2026-08-08",
      originalScheduledDate:"2026-08-10",
      completedDate:"2026-08-08",
      status:"completed",
    },
  );
  scheduling.applyWeeklyRestDayPolicy(sessions,{
    effectiveDate:"2026-08-10",
    today:"2026-08-09",
    restPlanDay:3,
    formerRestPlanDay:6,
    restName:"Recovery + Check-in",
    activeName:"Core + Recovery",
    activeWorkoutType:"mobility",
  });
  assert.deepStrictEqual(
    sessions
      .filter(item=>["cardio","strength-b","strength-c","zone-2","next-rest","next-strength-a"].includes(item.id))
      .map(item=>item.scheduledDate),
    ["2026-08-09","2026-08-10","2026-08-11","2026-08-12","2026-08-14","2026-08-15"],
    "Sunday must become the next workout, Thursday must remain clear, and the rotation must stay in order",
  );
  assert.deepStrictEqual(
    {scheduledDate:sessions.find(item=>item.id==="core").scheduledDate,status:sessions.find(item=>item.id==="core").status},
    {scheduledDate:"2026-08-13",status:"restDay"},
    "Thursday must become the protected rest day",
  );
  assert.deepStrictEqual(
    {scheduledDate:sessions.find(item=>item.id==="sunday-rest").scheduledDate,planDay:sessions.find(item=>item.id==="sunday-rest").planDay,status:sessions.find(item=>item.id==="sunday-rest").status},
    {scheduledDate:"2026-08-06",planDay:3,status:"restDay"},
    "the generated Sunday rest placeholder must move off Carrie's August 9 training date",
  );
}

{
  const sessions = [
    {id:"strength-a",plannedDate:"2026-08-10",scheduledDate:"2026-08-10",status:"completed"},
    {id:"cardio",plannedDate:"2026-08-11",scheduledDate:"2026-08-11",status:"scheduled"},
  ];
  const history = [{scheduleId:"strength-a",completedDate:"2026-08-08"}];
  assert.strictEqual(
    scheduling.reconcileEarlyWorkoutCompletions(sessions,history),
    1,
    "existing linked history must repair an unshifted early completion",
  );
  const repaired=structuredClone(sessions);
  assert.strictEqual(
    scheduling.reconcileEarlyWorkoutCompletions(sessions,history),
    0,
    "the saved-data repair must be idempotent",
  );
  assert.deepStrictEqual(sessions,repaired);
  assert.strictEqual(sessions.find(item=>item.id==="cardio").scheduledDate,"2026-08-09");
}

{
  const sessions = baseSchedule();
  const before = structuredClone(sessions);
  assert.strictEqual(
    scheduling.moveWorkout(sessions, "missed", "2026-08-05", "2026-07-31"),
    true,
  );
  assertPlannedDatesUnchanged(before, sessions);
  assert.strictEqual(sessions.find((item) => item.id === "missed").scheduledDate, "2026-08-05");
  assert.strictEqual(sessions.find((item) => item.id === "missed").status, "rescheduled");
  assert.deepStrictEqual(
    sessions.find((item) => item.id === "rest"),
    before.find((item) => item.id === "rest"),
    "future-date move must not change rest days",
  );
  assert.strictEqual(
    scheduling.moveWorkout(sessions, "missed", "2026-07-29", "2026-07-31"),
    false,
    "future-date move must reject dates before the minimum",
  );
}

assert.deepStrictEqual(
  Array.from(scheduling.nextTrainingDates("2026-07-31", 5)),
  ["2026-07-31", "2026-08-01", "2026-08-02", "2026-08-03", "2026-08-04"],
  "training dates must skip Thursday deterministically",
);

{
  const sessions = [
    {id:"strength-b",plannedDate:"2026-08-12",scheduledDate:"2026-08-10",completedDate:"2026-08-10",status:"completed",workoutType:"strength"},
    {id:"strength-c",plannedDate:"2026-08-14",scheduledDate:"2026-08-11",status:"rescheduled",workoutType:"strength"},
    {id:"zone-2",plannedDate:"2026-08-15",scheduledDate:"2026-08-12",status:"rescheduled",workoutType:"cardio"},
    {id:"rest",plannedDate:"2026-08-13",scheduledDate:"2026-08-13",status:"restDay",workoutType:"recovery"},
  ];
  assert.strictEqual(scheduling.repairStrengthRecoveryCadence(sessions,"2026-08-11"),true);
  assert.strictEqual(sessions.find(item=>item.id==="zone-2").scheduledDate,"2026-08-11","cardio must follow a completed strength day");
  assert.strictEqual(sessions.find(item=>item.id==="strength-c").scheduledDate,"2026-08-12","the next strength workout must move after recovery");
  const repaired=structuredClone(sessions);
  assert.strictEqual(scheduling.repairStrengthRecoveryCadence(sessions,"2026-08-11"),false,"cadence repair must be idempotent");
  assert.deepStrictEqual(sessions,repaired);
}

console.log(
  "Scheduling tests passed: local-date activation, recovery and early-completion rotation, plannedDate immutability, completed-session protection, and rest-day preservation.",
);
