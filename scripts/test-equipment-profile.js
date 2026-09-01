const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const data = fs.readFileSync(path.join(root, "data.js"), "utf8");

assert.match(app, /const CARRIEFIT_SCHEMA_VERSION=12;/, "the current schema must include every additive storage migration");
assert.match(app, /version:6,[\s\S]*?dumbbells:true,kettlebells:false[\s\S]*?schemaVersion=6;/, "existing profiles must gain the user's confirmed equipment without losing saved state");
assert.match(app, /version:11,[\s\S]*?kettlebells:true[\s\S]*?kettlebellWeightsLb[\s\S]*?\[20,25,30\][\s\S]*?schemaVersion=11;/, "existing profiles must gain the confirmed kettlebells and exact inventory additively");
assert.match(app, /dumbbells:true,\s*kettlebells:true,/, "new profiles must default to both dumbbells and kettlebells available");
assert.match(app, /state\.kettlebellWeightsLb[\s\S]*?\[20,25,30\]/, "new profiles must retain the 20, 25, and 30 lb kettlebell rack");
assert.match(app, /dumbbells:"Dumbbells",\s*kettlebells:"Kettlebells"/, "equipment labels must remain independent");
assert.match(app, /\["dumbbells","🔩","Dumbbells"/, "Profile must show a dedicated dumbbell control");
assert.match(app, /\["kettlebells","⚫","Kettlebells"/, "Profile must show a dedicated kettlebell control");
assert.match(app, /class="kettlebell-inventory"[\s\S]*?KETTLEBELL RACK/, "Profile must display the exact kettlebell inventory");
assert.match(app, /gobletSquatTemplate\.setup=\["Equipment: one kettlebell"/, "Goblet Squat instructions must use the confirmed kettlebell");
assert.match(app, /gobletSquatTemplate\.requires=\["kettlebells"\]/, "Goblet Squat must enter the workout only when kettlebells are enabled");
assert.match(data, /"name":"Goblet Squat"/, "the existing Goblet Squat definition must remain in the base program");

console.log("Equipment profile checks passed: the 20, 25, and 30 lb kettlebells are enabled, inventoried, and used by Goblet Squat.");
