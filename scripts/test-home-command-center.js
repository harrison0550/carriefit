const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "app.css"), "utf8");
const homeSource = app.slice(app.indexOf("function home(){"), app.indexOf("function progress(){"));

for (const marker of [
  "command-week",
  "command-week-strip",
  "command-workout-card",
  "home-command-metrics",
  "command-up-next",
  "command-achievement",
  "command-checkin"
]) assert(app.includes(marker), `Home command center must render ${marker}`);

assert.match(app, /document\.body\.classList\.toggle\("home-mode",state\.tab==="home"\)/, "Home styling must be scoped and removed on other screens");
assert.match(app, /const metrics=v42Metrics\(\)/, "Home metrics must use the existing adherence and recovery calculation");
assert.match(app, /metrics\.adherence/, "Home must display real adherence");
assert.match(app, /metrics\.recovery/, "Home must display real recovery");
assert.match(app, /metrics\.total/, "Home must display the existing total-session count");
assert.doesNotMatch(homeSource, /\bHRV\b|\bSleep\b|\bSteps\b/, "Home refresh must not invent wearable metrics");
assert.match(app, /aria-label="\$\{day\.short\}, \$\{isToday\?"Today, ":""}\$\{statusInfo\.label}\"/, "Weekly status must have a non-color accessible label");
assert.match(css, /\.command-week-strip\{[^}]*grid-template-columns:repeat\(7,minmax\(0,1fr\)\)/, "Weekly strip must remain container-bound");
assert.match(css, /\.home-command-metrics\{[^}]*grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/, "Metric cards must shrink safely on small screens");
assert.match(css, /@media\(max-width:370px\)/, "Command center must include small-iPhone adjustments");
assert.match(css, /env\(safe-area-inset-top\)/, "Home refresh must retain safe-area support");

console.log("Home command-center regression checks passed: existing data, actions, accessibility, and small-iPhone constraints are preserved.");
