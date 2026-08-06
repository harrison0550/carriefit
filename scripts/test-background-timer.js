const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const app = fs.readFileSync(path.resolve(__dirname, "..", "app.js"), "utf8");
const helperSource = app.match(/function timerRemainingSeconds\([\s\S]*?\n}/)?.[0];
assert(helperSource, "timerRemainingSeconds helper must exist");

const context = {};
vm.runInNewContext(`${helperSource}; result=timerRemainingSeconds;`, context);
const remainingAt = context.result;

assert.strictEqual(remainingAt(70_000, 10_000), 60, "a new 60-second timer must show 60 seconds");
assert.strictEqual(remainingAt(70_000, 40_250), 30, "elapsed wall-clock time must be reflected after suspension");
assert.strictEqual(remainingAt(70_000, 75_000), 0, "an expired timer must not become negative");
assert.match(app, /timerEndsAt=Date\.now\(\)\+\(remaining\*1000\)/, "timer must store an absolute finish time");
assert.match(app, /visibilitychange[\s\S]*document\.visibilityState==="visible"[\s\S]*syncTimer/, "timer must synchronize when the PWA becomes visible");
assert.match(app, /window\.addEventListener\("pageshow",syncTimer\)/, "timer must synchronize when iOS restores the page");
assert.match(app, /if\(timerEndsAt===null\)return;/, "completion must be guarded so the alert fires only once");

console.log("Background timer regression checks passed: elapsed wall-clock time survives app suspension.");
