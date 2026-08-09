# UI Guidelines

## Design intent

CarrieFit uses a polished, high-contrast light interface designed for clear one-handed interactions during training. It should feel soft, capable, and uncluttered. New screens should reuse the blush, white, rose, and plum components before introducing new patterns.

Home follows the Concept B “Training Command Center” direction: a compact brand header, seven-day status strip, dominant workout card, coach recommendation, three existing training metrics, and concise upcoming/history context. Use red for the primary workout action, amber for coach guidance, and green for completion or recovery readiness. Do not introduce wearable-style metrics unless the product actually stores their source data.

## Light pink theme

- Use the warm blush page background for a soft, consistent canvas.
- Place content in white or pale-pink elevated cards with subtle mauve borders.
- Reserve dark plum for readable text; do not use black or near-black content cards.
- Preserve sufficient contrast in bright rooms and at low screen brightness.
- Do not encode state through color alone; pair color with an icon and text label.

## Color system

Current production tokens are defined in `app.css`:

| Role | Token / value | Usage |
| --- | --- | --- |
| Page background | `--bg: #fff7fb` | Application canvas |
| Primary card | `--card: #ffffff` | Standard content cards |
| Elevated surface | `--card2: #fcecf4` | Controls and secondary surfaces |
| Border | `--line: #ead8e2` | Dividers and component outlines |
| Primary text | `--text: #342832` | Headings and important values |
| Secondary text | `--muted: #786b74` | Supporting information |
| Action rose | `--pink: #d94f8b` | Primary actions and active navigation |
| Success green | `--green: #388b68` | Completion and positive state |

Calendar status colors must remain paired with their named icons. Warning, recovery, and information colors should maintain at least 4.5:1 contrast for normal text.

## Typography

- Use the system stack beginning with `-apple-system` and `BlinkMacSystemFont`.
- Page titles use compact tracking and strong weight.
- Card titles should use responsive `clamp()` sizing and avoid fixed oversized text.
- Supporting copy should be at least 15px on small screens.
- Labels may be uppercase with increased letter spacing, but never for long paragraphs.
- Numeric training values should use tabular figures where changing width would be distracting.
- Do not disable iOS text resizing.

## Spacing

Use a consistent 4px-based rhythm:

- 4–8px: tightly related icon or label spacing
- 10–14px: control and grid gaps
- 14–18px: related content groups
- 20–24px: card padding and major section separation
- 28px or more: distinct page regions

Standard cards have approximately 14px bottom separation. Avoid nested cards unless the inner surface communicates a clear sub-state.

## Cards

- Standard corner radius: 26px.
- Compact inner panels: 13–18px.
- Use a one-pixel `--line` border for separation.
- Keep card padding responsive, approximately 16–22px.
- Cards must never exceed their content container or require page-level horizontal scrolling.
- Use specialized border color sparingly for warnings, recommendations, or completion.

## Buttons and touch targets

- Primary and secondary buttons are full-width inside their content container by default.
- Standard button radius: 17px.
- Standard vertical padding: 16px.
- Minimum interactive target: 44 × 44 CSS pixels.
- Primary actions use the rose gradient and white text.
- Secondary actions use a pale-pink surface and visible border.
- Place the primary action before secondary alternatives in both visual and DOM order.
- Destructive actions require clear wording and confirmation.
- Avoid more than one visually dominant primary action in a single section.
- Disabled controls must remain legible and expose their disabled state semantically.

## Navigation

The bottom navigation contains exactly five primary destinations:

1. Home
2. Calendar
3. Progress
4. Exercises
5. Profile

Navigation must:

- Remain fixed above the iPhone Home indicator.
- Use `env(safe-area-inset-bottom)`.
- Pair every icon with a visible text label.
- Clearly indicate the active destination.
- Keep labels readable at 320px width.
- Avoid replacing a primary destination without a product decision recorded in `PROJECT_CONTEXT.md`.

Workout actions may use dedicated in-flow controls, but users must always have a clear path back to a primary destination.

## Safe areas and responsive behavior

- The application shell accounts for top, left, right, and bottom safe areas.
- Validate new UI at 320 × 568, 375 × 667, 390 × 844, and 430 × 932.
- Use `minmax(0, 1fr)` in grids containing text or controls.
- Inputs and buttons use `width: 100%` and `max-width: 100%` inside cards.
- Page-level horizontal overflow is a release blocker.
- Internal horizontal scrolling is acceptable only for an intentional control such as a compact date strip.
- Use `100dvh` where viewport height affects layout.

## Motion and transitions

- Keep transitions short, generally 120–220ms.
- Animate opacity or transform rather than layout-heavy properties.
- Never auto-scroll except when the user intentionally advances to the next exercise.
- Restore a workout’s prior scroll position when resuming the same exercise.
- Respect `prefers-reduced-motion` and avoid essential information that depends on animation.

## Accessibility

Adaptive recommendations use amber coach styling, show a plain-language rationale, and require a labelled Apply action. Applied state must be conveyed with text and an icon rather than green alone. Profile health and limitation fields must never imply diagnosis or replace professional care.

Exercise illustrations require meaningful alternative text. App-created artwork must be labelled as an illustration and must not imply that it is licensed footage or a substitute for written coaching.

- Use semantic headings in a logical hierarchy.
- Every icon-only control requires an accessible name.
- Dialogs require a meaningful label, focus management, and a clear Close action.
- Visible focus styles must remain present for keyboard users.
- Associate labels with inputs and use appropriate `inputmode`.
- Do not rely on placeholder text as the only label.
- Do not rely on color, gesture, hover, or animation alone.
- Use plain language for status and recovery choices.
- Announce saved, completed, or error states where practical.
- Test VoiceOver order for new primary flows.

## UI review checklist

- Does it fit without horizontal overflow at 320px?
- Are safe areas respected in standalone mode?
- Is the primary action obvious and container-bound?
- Are cards, gaps, radii, and typography consistent?
- Are all states named as well as colored?
- Are touch targets at least 44px?
- Is the interaction understandable with reduced motion?
- Can the flow be completed using VoiceOver or keyboard navigation?
