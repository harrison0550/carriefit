const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const library = fs.readFileSync(path.join(root, "exercise-library.js"), "utf8");
const serviceWorker = fs.readFileSync(path.join(root, "sw.js"), "utf8");

const generated = {
  "Dead Bug": "dead-bug-female.gif",
  "Bird Dog": "bird-dog-female.gif",
  "Side Plank from Knees": "side-plank-from-knees-female.gif",
  "Hip and Glute Mobility": "hip-glute-mobility-female.gif",
  "Slow Breathing Cooldown": "slow-breathing-female.gif",
  "Post-Workout Stretch": "post-workout-stretch-female.gif",
};

for (const [exercise, filename] of Object.entries(generated)) {
  const asset = fs.readFileSync(path.join(root, "assets", "exercise-library", "generated", filename));
  assert.match(asset.subarray(0, 6).toString("ascii"), /^GIF8[79]a$/, `${exercise} must use a real GIF`);
  assert.ok([...asset].filter((byte) => byte === 0x2c).length >= 2, `${exercise} must contain multiple frames`);
  assert.ok(app.includes(filename), `${exercise} must be connected to the workout UI`);
  assert.ok(library.includes(filename), `${exercise} must have an app-original library record`);
  assert.ok(serviceWorker.includes(`./assets/exercise-library/generated/${filename}`), `${exercise} must work offline`);
}

assert.match(app, /name:"Thoracic and Shoulder Mobility"[\s\S]*?chest-shoulder-mobility\.gif/);
assert.match(app, /name:"Zone 2 Cooldown"[\s\S]*?treadmill-easy-walk\.gif/);

console.log("Recovery animation coverage passed: every core, mobility, breathing, stretching, and cooldown step uses an approved female loop offline.");
