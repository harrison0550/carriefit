const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const library = fs.readFileSync(path.join(root, "exercise-library.js"), "utf8");

function section(start, end) {
  const startIndex = app.indexOf(start);
  const endIndex = app.indexOf(end, startIndex + start.length);
  assert(startIndex >= 0 && endIndex > startIndex, `Unable to isolate ${start}`);
  return app.slice(startIndex, endIndex);
}

const monday = section("function fullBodyAWorkout()", "function cardioMobilityWorkout()");
const wednesday = section("function fullBodyBWorkout()", "function fullBodyCWorkout()");
const friday = section("function fullBodyCWorkout()", "function strengthWorkoutForDay(dayIndex)");

assert.match(monday, /data\.map\(exercise=>deepCopy\(exercise\)\)/, "Monday must begin with every existing Full Body A exercise");
assert.match(monday, /splice\(hingeIndex\+1,0,cloneExerciseByName\("Kettlebell Around the World"\)\)/, "Monday must add Around the World without replacing an exercise");

const wednesdayHinge = wednesday.indexOf('cloneExerciseByName("Hip Hinge")');
const wednesdayDeadlift = wednesday.indexOf('cloneExerciseByName("Kettlebell Deadlift")');
const wednesdaySmithRdl = wednesday.indexOf('name:"Smith Machine RDL"');
assert(wednesdayHinge < wednesdayDeadlift && wednesdayDeadlift < wednesdaySmithRdl, "Wednesday must place the kettlebell hinge primer before the existing Smith RDL");

const fridaySwing = friday.indexOf('cloneExerciseByName("Kettlebell Swing")');
const fridayIntervals = friday.indexOf('name:"Treadmill HIIT Intervals"');
assert(fridaySwing >= 0 && fridaySwing < fridayIntervals, "Friday must place kettlebell swings before the existing treadmill intervals");

for (const name of ["Kettlebell Around the World", "Kettlebell Deadlift", "Kettlebell Swing"]) {
  assert(app.includes(`name:"${name}"`), `${name} must have a guided workout definition`);
  assert(library.includes(`"${name}": carriefitIllustration`), `${name} must have an approved exercise-library entry`);
  assert(app.includes(`"${name}":"assets/exercise-library/generated/`), `${name} must have an animation mapping`);
}

assert.match(app, /title:"Recovery \+ Check-in"[\s\S]*?action:"progress"/, "Thursday must remain Carrie's protected recovery and check-in day");
assert.match(app, /dayIndex===3\)workoutData=\[\]/, "Thursday must continue to launch no workout");
assert.match(app, /setupGroupOrder:0[\s\S]*?name:"Kettlebell Deadlift"/, "light kettlebell preparation must remain ahead of machine work");
assert.match(app, /name:"Kettlebell Swing"[\s\S]*?setupGroupOrder:6/, "swings must remain in the conditioning block");

console.log("Kettlebell program checks passed: all existing work remains, the three new movements are placed safely, and Thursday stays protected.");
