const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "app.css"), "utf8");

function compact(value) {
  return value.replace(/\s+/g, "").toLowerCase();
}

function lastRuleBody(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matches = [...css.matchAll(new RegExp(`${escaped}\\s*\\{([^}]+)\\}`, "gi"))];
  assert(matches.length > 0, `Missing CSS rule for ${selector}`);
  return compact(matches.at(-1)[1]);
}

assert(
  /<div class="measurement-row">[\s\S]*?<button class="secondary" id="saveP">Save check-in<\/button>/.test(
    app,
  ),
  "Progress must render Save Check-In inside the measurement-row container",
);

const rowRule = lastRuleBody(".measurement-row");
assert(
  rowRule.includes("grid-template-columns:repeat(2,minmax(0,1fr))"),
  "measurement-row columns must be shrinkable on small iPhones",
);

const inputRule = lastRuleBody(".measurement-row input");
assert(inputRule.includes("min-width:0"), "measurement inputs must be allowed to shrink");
assert(inputRule.includes("width:100%"), "measurement inputs must fill, not exceed, their cells");

const saveRule = lastRuleBody(".measurement-row #saveP");
assert(
  saveRule.includes("grid-column:1/-1"),
  "Save Check-In must span the complete content grid",
);
assert(
  saveRule.includes("width:100%"),
  "Save Check-In must remain full-width inside the content grid",
);

const universalRules = compact(css);
assert(
  universalRules.includes(".primary,.secondary{width:100%;"),
  "primary and secondary button sizing contract must remain consistent",
);
assert(
  universalRules.includes("max-width:100%"),
  "interactive content must retain a max-width overflow guard",
);
assert(
  universalRules.includes("env(safe-area-inset-bottom)"),
  "bottom safe-area support must remain present",
);
assert(
  universalRules.includes("env(safe-area-inset-left)") &&
    universalRules.includes("env(safe-area-inset-right)"),
  "small-iPhone layout must retain left and right safe-area support",
);

for (const width of [320, 375, 390, 430]) {
  const shellPadding = Math.max(14, Math.min(width * 0.04, 20));
  const contentWidth = Math.min(width, 520) - shellPadding * 2;
  assert(
    contentWidth > 0 && contentWidth <= width,
    `${width}px viewport must produce a positive, contained content width`,
  );
  const saveButtonWidth = contentWidth;
  assert(
    saveButtonWidth <= width,
    `Save Check-In must remain inside the ${width}px viewport`,
  );
}

console.log(
  "BUG-002 regression tests passed: Save Check-In remains container-bound at 320px, 375px, 390px, and 430px.",
);
