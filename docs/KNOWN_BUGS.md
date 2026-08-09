# Known Bugs

Use this file as the durable defect tracker. Do not delete resolved records; update their status and add regression coverage.

## Active

No confirmed production defects are currently documented.

## Resolved

### BUG-017 — Home schedule update and navigation retain dark theme

- Status: Resolved in v1.1.7
- Severity: High
- Area: Home / Navigation
- Report: A rescheduled workout exposed a black Schedule Update card, and the Home-specific bottom-navigation selector overrode CarrieFit's light navigation theme.
- Resolution: Added explicit light-theme rules at the same Home-specific cascade level for the schedule notice and navigation.
- Regression test: `scripts/test-pink-theme-coverage.js`

### BUG-016 — Legacy black cards remain on secondary screens

- Status: Resolved in v1.1.6
- Severity: High
- Area: Progress / Exercises / Profile / Workout support screens
- Report: Some secondary surfaces, including Personal Records, still inherited the original dark Road to 12% card styling and were difficult to read inside CarrieFit's light theme.
- Resolution: Added a complete light-theme coverage layer for legacy record, history, library, setup, profile, media, and supporting-dialog surfaces and updated the UI standard to prohibit near-black content cards.
- Regression test: `scripts/test-pink-theme-coverage.js`

### BUG-015 — Completed early workout hidden on shared date

- Status: Resolved in v1.1.5
- Severity: High
- Area: Home / Calendar
- Report: When an early completed workout shared a date with the workout originally planned for that day, Home and Calendar could show the older incomplete record instead of the green completed state.
- Resolution: Date summaries now consistently prioritize completed sessions while retaining every schedule record in the date details.
- Regression test: `scripts/test-home-workout-selection.js`

### BUG-001 — Workout page scroll jumps

- Status: Resolved in v13.2.0
- Severity: High
- Area: Workout
- Report: Returning to a workout caused the page to jump upward unexpectedly.
- Resolution: Removed unintended viewport-anchor correction and restore the saved position only when resuming the same exercise. Intentional next-exercise navigation starts at the top.
- Regression test: `scripts/test-workout-scroll.js`

### BUG-002 — Save Check-In exceeds screen width

- Status: Resolved in v13.2.0
- Severity: High
- Area: Progress
- Report: The Save Check-In button could extend beyond the content width on smaller iPhones.
- Resolution: The button now spans the full grid container with safe, constrained input sizing.
- Regression test: `scripts/test-responsive-layout.js`

### BUG-003 — Past workout opens Close-only details

- Status: Resolved in v13.2.0 maintenance build 2026.07.30.7
- Severity: High
- Area: Calendar / Workout Recovery
- Report: A past incomplete workout could open the legacy Workout Details modal without Start Workout or Reschedule actions.
- Resolution: The existing Calendar Workout Details renderer now includes recovery metadata and actions directly; the separate recovery-details modal path was removed.
- Regression test: `scripts/test-recovered-workout-flow.js`

### BUG-004 — Installed PWA does not promptly receive a new build

- Status: Resolved in v13.2.0 maintenance build 2026.07.30.8
- Severity: High
- Area: Service Worker / Release
- Report: The live site served the corrected build, but an installed iPhone Home Screen app could remain on an older cached shell.
- Resolution: Mutable shell requests now refresh network-first, Service Worker metadata imports are build-keyed, new registrations bypass the HTTP cache, and controller changes trigger one safe reload.
- Regression test: `scripts/test-offline-pwa.js`

### BUG-005 — Yesterday's missed workout is absent from Calendar

- Status: Resolved in v13.2.0 maintenance build 2026.07.30.9
- Severity: High
- Area: Calendar / Data Migration
- Report: On the evening of July 30 in a western UTC offset, Calendar began on July 31 and did not show July 29 as missed.
- Resolution: Schedule activation now uses local calendar identity. An additive, idempotent migration backfills yesterday when the saved activation boundary is missing, today, or in the future, while preserving existing sessions and earlier history.
- Regression test: `scripts/test-scheduling.js`

### BUG-006 — Calendar opens on a previously viewed month

- Status: Resolved in v13.2.0 maintenance build 2026.08.03.1
- Severity: High
- Area: Calendar / Launch State
- Report: Launching the app on August 3 could leave Calendar displaying July because the last browsed month was persisted.
- Resolution: Every fresh application launch initializes the Calendar viewport from the device's current local month while preserving previous/next navigation during the running session.
- Regression test: `scripts/test-calendar-current-workout.js`

### BUG-007 — Today's Calendar workout has no Start action

- Status: Resolved in v13.2.0 maintenance build 2026.08.03.1
- Severity: High
- Area: Calendar / Workout Launch
- Report: Tapping today's scheduled workout displayed details with only a Close button.
- Resolution: Today's incomplete session now exposes Start Workout and launches or resumes the existing Workout Engine without being classified as a recovered workout.
- Regression test: `scripts/test-calendar-current-workout.js`

### BUG-008 — Full Body A cooldowns appear mid-workout

- Status: Resolved in v13.2.0 maintenance build 2026.08.03.4
- Severity: High
- Area: Workout Engine / Exercise Ordering
- Report: Easy Treadmill Cooldown and Post-Workout Stretch appeared after the Smith block but before the cable exercises in Full Body A.
- Resolution: Cooldown exercises now use the final ordering group for every strength workout instead of only Full Body B and C.
- Regression test: `scripts/test-workout-order.js`

### BUG-009 — Home repeats the completed workout

- Status: Resolved in v13.2.0 maintenance build 2026.08.04.1; legacy-state hardening added in build 2026.08.04.9
- Severity: Medium
- Area: Home / Scheduling
- Report: After completing Full Body A, the Next Workout card still displayed Full Body A.
- Resolution: Home now selects the next incomplete scheduled session and previews future sessions without rewriting schedule state. Selection verifies both schedule status and linked workout history so stale saved schedule state cannot repeat a completed workout.
- Regression tests: `scripts/test-workout-qol.js`, `scripts/test-home-workout-selection.js`

### BUG-010 — Muscle recovery map remains green after training

- Status: Resolved in v13.2.0 maintenance build 2026.08.04.1
- Severity: Medium
- Area: Progress / Workout History
- Report: The recovery map showed every muscle as Ready immediately after a completed strength workout.
- Resolution: New history snapshots include muscle metadata, and older snapshots resolve muscles from their saved exercise names without modifying history.
- Regression test: `scripts/test-workout-qol.js`

### BUG-011 — Progress tab does not show its selected state

- Status: Resolved in v13.2.0 maintenance build 2026.08.04.2
- Severity: Low
- Area: Bottom Navigation / Progress
- Report: Tapping Progress opened the screen but left the bottom tab gray instead of red.
- Resolution: Progress now renders through the shared navigation path that applies the active class while continuing to clear a previously opened history detail.
- Regression test: `scripts/test-workout-qol.js`

### BUG-012 — Workout timer pauses while another iPhone app is active

- Status: Resolved in v13.2.0 maintenance build 2026.08.04.4
- Severity: Medium
- Area: Workout Engine / Timer
- Report: Switching from the installed PWA to another app suspended JavaScript callbacks, so a walking or rest timer resumed from the value shown when CarrieFit entered the background.
- Resolution: Active timers now store an absolute finish timestamp, derive remaining time from the device clock, and synchronize on visibility, focus, and page restoration. If the timer expires while suspended, completion is announced once when the PWA resumes.
- Platform limitation: iOS may not permit a Home Screen PWA to play audio while it remains suspended; the existing sound and vibration occur when the app returns if the timer expired in the background.
- Regression test: `scripts/test-background-timer.js`

### BUG-013 — Starting a future preview launches today’s workout

- Status: Resolved in v13.2.0 maintenance build 2026.08.04.6
- Severity: High
- Area: Home / Workout Engine
- Report: Confirming Start This Workout Early from tomorrow’s preview discarded the selected weekday and called the session launcher with its default arguments, restarting today’s workout.
- Resolution: Home now resolves the earliest incomplete schedule entry for the previewed weekday and passes both its plan day and schedule record into the existing Workout Engine. The pre-workout landing screen preserves that selected session at step zero instead of falling back to the current weekday or creating today’s session over it. Today detection now uses the current weekday instead of treating Monday as the only possible today.
- Regression test: `scripts/test-home-workout-selection.js`

### BUG-014 — Completed early workout does not advance the rotation

- Status: Resolved in CarrieFit v1.1.3 build 2026.08.09.1; corrected rest-day policy and August 8 completion date in v1.1.4 build 2026.08.09.2
- Severity: High
- Area: Workout Engine / Scheduling
- Report: Carrie completed Strength + Shape A one day early, but the schedule kept that workout on its original future date and did not make the following workout available on the next training day.
- Resolution: Early completion now moves the linked schedule entry to its saved local completion date and pulls later incomplete sessions forward in program order while preserving completed history and immutable planned dates. An additive version 7 migration repairs already-saved linked early completions idempotently. Version 8 anchors Carrie's first session to Saturday, August 8, changes the protected rest day to Thursday, moves Core + Recovery to Sunday, and recalculates the rotation.
- Regression tests: `scripts/test-scheduling.js`, `scripts/test-home-workout-selection.js`

## Bug template

```markdown
### BUG-014 — Cardio and recovery previews do not launch

- Status: Resolved in v13.2.0 maintenance build 2026.08.05.1
- Severity: High
- Area: Workout Preview / Workout Engine
- Report: Core + Recovery displayed a Start Early button but only showed an alert saying its guided timer flow would be added later, even though the guided workout already existed.
- Resolution: Every non-check-in preview now lists the actual equipment-safe workout and launches it through the existing Workout Engine. Sunday check-in continues to open Progress.
- Regression test: `scripts/test-guided-preview-launch.js`

### BUG-000 — Short description

- Status: Reported | Confirmed | In progress | Resolved
- Severity: Critical | High | Medium | Low
- Area:
- First observed:
- Environment:
- Reproduction:
  1.
- Expected:
- Actual:
- Workaround:
- Resolution:
- Regression test:
```
