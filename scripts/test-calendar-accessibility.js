const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "app.js"), "utf8");
const css = fs.readFileSync(path.join(root, "app.css"), "utf8");

const requiredContracts = [
  ['overlay.setAttribute("role","dialog")', "dialogs expose the dialog role"],
  ['overlay.setAttribute("aria-modal","true")', "dialogs identify modal behavior"],
  ['overlay.setAttribute("aria-labelledby","v42DialogTitle")', "dialogs use their visible heading as the accessible name"],
  ['id="v42DialogTitle" tabindex="-1"', "dialog headings can receive initial programmatic focus"],
  ['document.querySelector(".shell")?.setAttribute("inert","")', "background content is removed from the focus order"],
  ['document.querySelector(".shell")?.removeAttribute("inert")', "background content is restored after dismissal"],
  ['if(event.key==="Escape")', "dialogs support Escape dismissal"],
  ["v42DialogReturnFocus.focus()", "dialogs return focus to the invoking control"],
  ['querySelector("#v42DialogTitle")?.focus()', "dialogs focus and announce the visible heading"],
  ['class="secondary v42-close" type="button">Close</button>', "dialogs provide a visible Close action"],
];

for (const [source, message] of requiredContracts) {
  assert(app.includes(source), message);
}

assert(
  /data-calendar-day="\$\{key\}" aria-label="\$\{[\s\S]*?V42_STATUS\[primary\.status\]\.label[\s\S]*?V42_TYPES\[primary\.workoutType\]\.label/.test(
    app,
  ),
  "Calendar cells must announce date, status, and workout type independently",
);
assert(
  /<section class="card calendar-legend" aria-label="Calendar legend">/.test(app),
  "Calendar legend must expose a named region",
);
assert(
  /data-legend-kind="status"/.test(app) && /data-legend-kind="type"/.test(app),
  "status and workout-type legend controls must remain independently tappable",
);
assert(
  /:focus-visible\{outline:3pxsolid#[0-9a-f]+;outline-offset:3px\}/i.test(
    css.replace(/\s+/g, ""),
  ),
  "interactive elements must have a visible keyboard focus indicator",
);

console.log(
  "Calendar accessibility tests passed: VoiceOver names, modal focus, Escape, focus return, background isolation, and visible focus.",
);
