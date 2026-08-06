const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");

assert(
  app.includes('state.calendarMonth=localDateKey().slice(0,7);'),
  "a fresh app launch must reset Calendar to the device's current month",
);
assert(
  app.includes('const isStartable=item=>item.scheduledDate<=todayKey&&isIncomplete(item);'),
  "today's incomplete workout must be startable from Calendar",
);
assert.match(
  app,
  /data-start-calendar-workout="\$\{item\.id\}">Start Workout<\/button>/,
  "a startable Calendar workout must expose the Start Workout action",
);
assert(
  app.includes('const isRecovered=!!selectedSchedule&&selectedSchedule.scheduledDate<todayKey;'),
  "starting today's scheduled workout must not classify it as recovered",
);
assert(
  app.includes('if(todaySchedule&&!isRecovered&&todaySchedule.status!=="rescheduled")todaySchedule.status="inProgress";'),
  "starting today's scheduled workout must mark the schedule in progress",
);
assert(
  app.includes('const alreadyActive=state.currentSession?.scheduleId===session.id&&state.currentSession.dateKey===todayKey;'),
  "an already active Calendar workout must resume instead of being replaced",
);

console.log(
  "Calendar current-workout tests passed: current-month launch, today's Start Workout action, normal-session classification, and active-session resume.",
);
