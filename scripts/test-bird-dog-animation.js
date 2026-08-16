const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const library = fs.readFileSync(path.join(root, "exercise-library.js"), "utf8");
const serviceWorker = fs.readFileSync(path.join(root, "sw.js"), "utf8");
const assetPath = path.join(root, "assets", "exercise-library", "generated", "bird-dog-female.gif");
const asset = fs.readFileSync(assetPath);

assert.match(asset.subarray(0, 6).toString("ascii"), /^GIF8[79]a$/, "Bird Dog visual must be a valid GIF");
assert.ok([...asset].filter(byte => byte === 0x2c).length >= 2, "Bird Dog GIF must contain multiple animation frames");
assert.match(app, /function coreRecoveryWorkout\(\)[\s\S]*?name:"Dead Bug"[\s\S]*?name:"Bird Dog"[\s\S]*?name:"Side Plank from Knees"/, "Core + Recovery must expose all three core movements as separate guided steps");
assert.match(app, /name:"Bird Dog"[\s\S]*?left arm forward as your right leg[\s\S]*?right arm and left leg[\s\S]*?bird-dog-female\.gif/, "Bird Dog coaching must describe both opposite-side pairings and use the approved female animation");
assert.match(library, /"Bird Dog": carriefitIllustration\([\s\S]*?bird-dog-female\.gif/, "Bird Dog must be registered as an original reviewed female exercise asset");
assert.match(serviceWorker, /\.\/assets\/exercise-library\/generated\/bird-dog-female\.gif/, "Bird Dog animation must be cached for offline workouts");

console.log("Bird Dog checks passed: dedicated directions, approved animation, and offline caching are present.");
