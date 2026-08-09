const assert = require("assert");
const fs = require("fs");
const path = require("path");

const css = fs.readFileSync(path.resolve(__dirname, "..", "app.css"), "utf8");
const audit = css.split("/* CarrieFit v1.1.6 — complete legacy-surface theme audit */")[1];
assert(audit, "the complete legacy-surface theme audit must exist");

for (const selector of [
  ".pr-grid div",
  ".achievement-grid div",
  ".library-category-grid button",
  ".exercise-library-tile",
  ".visual-guide-grid button",
  ".about-grid>div",
  ".text-guide-grid article",
  ".exercise-media-card",
  ".setup-stage-nav button",
  ".m1-photo-card",
  ".history-card",
]) {
  assert(audit.includes(selector), `${selector} must be covered by the pink theme audit`);
}

assert(!/background\s*:\s*#(?:0[0-9a-f]{5}|1[0-9a-f]{5}|2[0-9a-f]{5})/i.test(audit), "audited surfaces must not reintroduce near-black backgrounds");
assert.match(audit, /\.pr-grid strong\{color:var\(--pink-deep\)\}/, "personal-record values must use the rose/plum palette");
assert.match(audit, /body\.home-mode \.today-rescheduled\{[^}]*background:linear-gradient\(145deg,#fffaf0,#fffafd\)/, "Home schedule updates must use a light amber-and-white surface");
assert.match(audit, /body\.home-mode nav\{[^}]*background:rgba\(255,248,252,\.97\)/, "Home navigation must keep the blush-white theme despite the legacy Home selector");
console.log("Pink theme coverage checks passed: progress, library, profile, setup, history, and supporting surfaces use light CarrieFit colors.");
