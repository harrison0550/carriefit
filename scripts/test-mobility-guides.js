const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const library = fs.readFileSync(path.join(root, "exercise-library.js"), "utf8");
const serviceWorker = fs.readFileSync(path.join(root, "sw.js"), "utf8");

const guides = [
  ["Hip Flexor Mobility", "hip-flexor-mobility.webp", "half-kneeling"],
  ["Hamstring Mobility", "hamstring-mobility.webp", "supported standing"],
  ["Chest and Shoulder Mobility", "chest-shoulder-mobility.webp", "wall slide"]
];

for (const [name, media, movement] of guides) {
  const asset = path.join(root, "assets", "exercise-library", "original", media);
  assert(fs.existsSync(asset), `${name} approved artwork must exist`);
  assert(fs.statSync(asset).size > 0, `${name} artwork must not be empty`);
  assert(app.includes(`name:"${name}"`), `${name} must remain in the workout definition`);
  assert(app.includes(`assets/exercise-library/original/${media}`), `${name} must use its approved artwork`);
  assert(library.includes(`"${name}": carriefitIllustration({`), `${name} must have app-created media metadata`);
  assert(library.toLowerCase().includes(movement), `${name} metadata must identify the illustrated movement`);
  assert(serviceWorker.includes(`./assets/exercise-library/original/${media}`), `${name} artwork must be available offline`);
}

assert(!app.includes('setup:["Use a supported standing or seated position"'), "Hamstring instructions must not offer conflicting positions");
assert(!app.includes('"Perform controlled arm circles in both directions.",\n        "Open and close the arms across the chest."'), "Chest and shoulder instructions must describe one illustrated drill");

console.log("Mobility guide regression checks passed.");
