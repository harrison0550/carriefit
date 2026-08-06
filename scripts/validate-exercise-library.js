const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "exercise-library.js"), "utf8");
const context = { self: {} };
vm.runInNewContext(source, context, { filename: "exercise-library.js" });

const library = context.self.CARRIEFIT_EXERCISE_LIBRARY;
if (!library?.entries) throw new Error("Exercise library did not initialize.");

const sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");
const missing = [];
const notCached = [];
const invalid = [];

for (const [name, entry] of Object.entries(library.entries)) {
  if (!entry.media || !fs.existsSync(path.join(root, entry.media))) missing.push(`${name}: ${entry.media}`);
  if (!sw.includes(`./${entry.media}`)) notCached.push(`${name}: ${entry.media}`);

  if (entry.sourceType === "official-manual") {
    for (const key of ["sourceDocument", "sourceExercise", "rightsNote"]) {
      if (!entry[key]) invalid.push(`${name}: missing ${key}`);
    }
  } else if (entry.sourceType === "app-original") {
    for (const key of ["provider", "sourceExercise", "author", "rightsNote"]) {
      if (!entry[key]) invalid.push(`${name}: missing ${key}`);
    }
  } else if (!entry.license?.url || !entry.sourceUrl) {
    invalid.push(`${name}: incomplete fallback license metadata`);
  }
}

if (missing.length) throw new Error(`Missing media:\n${missing.join("\n")}`);
if (notCached.length) throw new Error(`Media missing from service worker:\n${notCached.join("\n")}`);
if (invalid.length) throw new Error(`Invalid source metadata:\n${invalid.join("\n")}`);

const official = Object.values(library.entries).filter(x => x.sourceType === "official-manual").length;
const original = Object.values(library.entries).filter(x => x.sourceType === "app-original").length;
const fallback = Object.keys(library.entries).length - official - original;
console.log(`Exercise library validation passed: ${official} RitFit guides, ${original} app-created illustrations, ${fallback} licensed fallbacks.`);
