const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const data = fs.readFileSync(path.join(root, "data.js"), "utf8");

assert.match(app, /const CARRIEFIT_SCHEMA_VERSION=6;/, "equipment separation must use an additive storage migration");
assert.match(app, /version:6,[\s\S]*?dumbbells:true,kettlebells:false[\s\S]*?schemaVersion=6;/, "existing profiles must gain the user's confirmed equipment without losing saved state");
assert.match(app, /dumbbells:true,\s*kettlebells:false,/, "new profiles must default to dumbbells available and kettlebells unavailable");
assert.match(app, /dumbbells:"Dumbbells",\s*kettlebells:"Kettlebells"/, "equipment labels must remain independent");
assert.match(app, /\["dumbbells","🔩","Dumbbells"/, "Profile must show a dedicated dumbbell control");
assert.match(app, /\["kettlebells","⚫","Kettlebells"/, "Profile must show a dedicated kettlebell control");
assert.match(app, /gobletSquatTemplate\.setup=\["Equipment: one dumbbell"/, "Goblet Squat instructions must match the available dumbbell");
assert.match(data, /"name":"Goblet Squat"[\s\S]*?"requires":\["dumbbells"\]/, "Goblet Squat must enter the workout only when dumbbells are enabled");

console.log("Equipment profile checks passed: dumbbells and kettlebells are separate, compatible, and Goblet Squat uses the available dumbbell.");
