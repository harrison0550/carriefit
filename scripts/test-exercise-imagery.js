const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const librarySource = fs.readFileSync(path.join(root, "exercise-library.js"), "utf8");
const context = { self: {} };
vm.runInNewContext(librarySource, context, { filename: "exercise-library.js" });

const treadmill = context.self.CARRIEFIT_EXERCISE_LIBRARY.entries["Treadmill Walk"];
const inclineTreadmill = context.self.CARRIEFIT_EXERCISE_LIBRARY.entries["Incline Treadmill Walk"];
const treadmillHiit = context.self.CARRIEFIT_EXERCISE_LIBRARY.entries["Treadmill HIIT Intervals"];
const hipHinge = context.self.CARRIEFIT_EXERCISE_LIBRARY.entries["Hip Hinge"];
const inclineCablePress =
  context.self.CARRIEFIT_EXERCISE_LIBRARY.entries["Incline Cable Press"];
const cableHammerCurl =
  context.self.CARRIEFIT_EXERCISE_LIBRARY.entries["Cable Hammer Curl"];
const armCircles = context.self.CARRIEFIT_EXERCISE_LIBRARY.entries["Arm Circles"];
const bodyweightSquat =
  context.self.CARRIEFIT_EXERCISE_LIBRARY.entries["Bodyweight Squat"];
const latPulldown = context.self.CARRIEFIT_EXERCISE_LIBRARY.entries["Lat Pulldown"];
assert(treadmill, "Treadmill Walk must have an exercise-library visual");
assert.strictEqual(treadmill.sourceType, "app-original");
assert(treadmill.mediaAlt.includes("safety clip"), "the visual needs useful alternative text");
assert(
  fs.existsSync(path.join(root, treadmill.media)),
  "the treadmill illustration must be stored locally",
);
for (const [entry, expected] of [
  [treadmill, "treadmill-easy-walk.gif"],
  [inclineTreadmill, "treadmill-incline-walk.gif"],
  [treadmillHiit, "treadmill-hiit-interval.gif"],
]) {
  assert(entry, `${expected} must have exercise-library metadata`);
  assert(entry.media.endsWith(expected), `${expected} must use its approved female animation`);
  const asset = path.join(root, entry.media);
  assert(fs.existsSync(asset), `${expected} must be stored locally`);
  assert(fs.readFileSync(asset).subarray(0, 6).toString("ascii").startsWith("GIF8"), `${expected} must be a real GIF`);
}

const appSource = fs.readFileSync(path.join(root, "app.js"), "utf8");
for (const legacy of ["treadmill-walking.jpg", "treadmill-incline-walk.jpg", "treadmill-hiit-intervals.jpg"]) {
  assert(!appSource.includes(legacy), `app treadmill surfaces must not retain ${legacy}`);
}
assert(hipHinge, "Hip Hinge must have an exercise-library visual");
assert.strictEqual(hipHinge.sourceType, "app-original");
assert(
  hipHinge.mediaAlt.includes("hips pushed backward") &&
    hipHinge.mediaAlt.includes("neutral spine"),
  "the hip-hinge visual needs movement-specific alternative text",
);
assert(
  fs.existsSync(path.join(root, hipHinge.media)),
  "the hip-hinge illustration must be stored locally",
);
assert(inclineCablePress, "Incline Cable Press must have an exercise-library visual");
assert.strictEqual(inclineCablePress.sourceType, "app-original");
assert(
  inclineCablePress.mediaAlt.includes("low pulleys") &&
    inclineCablePress.mediaAlt.includes("both front posts") &&
    inclineCablePress.mediaAlt.includes("red cage-style Smith machine"),
  "the incline cable press needs equipment-specific alternative text",
);
assert(
  fs.existsSync(path.join(root, inclineCablePress.media)),
  "the incline cable press illustration must be stored locally",
);
assert(cableHammerCurl, "Cable Hammer Curl must have an exercise-library visual");
assert.strictEqual(cableHammerCurl.sourceType, "app-original");
assert(
  cableHammerCurl.mediaAlt.includes("neutral-grip rope hammer curl") &&
    cableHammerCurl.mediaAlt.includes("facing the same single front post") &&
    cableHammerCurl.mediaAlt.includes("low pulley") &&
    cableHammerCurl.mediaAlt.includes("red cage-style Smith machine"),
  "the cable hammer curl needs grip-, orientation-, and equipment-specific alternative text",
);
assert(
  fs.existsSync(path.join(root, cableHammerCurl.media)),
  "the cable hammer curl illustration must be stored locally",
);
assert(armCircles, "Arm Circles must have an exercise-library visual");
assert.strictEqual(armCircles.sourceType, "app-original");
assert(
  armCircles.mediaAlt.includes("arms extended at shoulder height") &&
    armCircles.mediaAlt.includes("circular motion arrows"),
  "the arm-circles visual needs posture- and movement-specific alternative text",
);
assert(
  fs.existsSync(path.join(root, armCircles.media)),
  "the arm-circles illustration must be stored locally",
);
assert(bodyweightSquat, "Bodyweight Squat must have an exercise-library visual");
assert.strictEqual(bodyweightSquat.sourceType, "app-original");
assert(
  bodyweightSquat.mediaAlt.includes("heels planted") &&
    bodyweightSquat.mediaAlt.includes("knees tracking over the toes") &&
    bodyweightSquat.mediaAlt.includes("parallel-depth squat"),
  "the bodyweight-squat visual needs depth-, foot-, and knee-specific alternative text",
);
assert(
  fs.existsSync(path.join(root, bodyweightSquat.media)),
  "the bodyweight-squat illustration must be stored locally",
);
assert(latPulldown, "Lat Pulldown must have an exercise-library visual");
assert.strictEqual(latPulldown.sourceType, "app-original");
assert(
  latPulldown.mediaAlt.includes("both high front-post pulleys") &&
    latPulldown.mediaAlt.includes("upper chest") &&
    latPulldown.mediaAlt.includes("red cage-style Smith machine"),
  "the lat-pulldown visual needs pulley-, finish-position-, and equipment-specific alternative text",
);
assert(
  latPulldown.commonMistakes.includes("Pulling the bar behind the neck"),
  "the lat-pulldown guide must explicitly reject the behind-the-neck finish",
);
assert(
  fs.existsSync(path.join(root, latPulldown.media)),
  "the lat-pulldown illustration must be stored locally",
);

const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
assert(!app.includes("No reviewed free demonstration yet"));
assert(app.includes("POSTURE ILLUSTRATION"));
assert(
  treadmill.rightsNote.includes("Written setup and movement cues remain the authoritative coaching guide"),
);

const sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");
assert(
  sw.includes(`./${treadmill.media}`),
  "the treadmill illustration must be available offline",
);
assert(
  sw.includes(`./${hipHinge.media}`),
  "the hip-hinge illustration must be available offline",
);
assert(
  sw.includes(`./${inclineCablePress.media}`),
  "the incline cable press illustration must be available offline",
);
assert(
  sw.includes(`./${cableHammerCurl.media}`),
  "the cable hammer curl illustration must be available offline",
);
assert(
  sw.includes(`./${armCircles.media}`),
  "the arm-circles illustration must be available offline",
);
assert(
  sw.includes(`./${bodyweightSquat.media}`),
  "the bodyweight-squat illustration must be available offline",
);
assert(
  sw.includes(`./${latPulldown.media}`),
  "the lat-pulldown illustration must be available offline",
);

console.log(
  "Exercise imagery tests passed: treadmill, hip-hinge, incline-cable-press, cable-hammer-curl, arm-circles, bodyweight-squat, and lat-pulldown artwork, provenance, accessible text, polished fallback, and offline caching.",
);
