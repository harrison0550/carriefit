# Codex Sprint Backlog

This file contains implementation-ready work. Move completed user-visible work to `CHANGELOG.md`; retain defect history in `KNOWN_BUGS.md`.

## High priority

- [x] Add Carrie's 20, 25, and 30 lb kettlebells, approved female exercise animations, and short Monday/Wednesday/Friday kettlebell blocks without removing existing work or changing Thursday recovery.

- [x] Complete the active-program animation audit and retain the official RitFit/equipment image beside every new CarrieFit movement loop.

- [x] Replace all remaining core, stretch, mobility, breathing, and cooldown placeholders or male assets with approved female CarrieFit animations.

- [x] Restore Carrie’s recorded 110 lb Lat Pulldown sets when other completion flags survived in the same workout.

- [x] Re-run the recorded-set repair after startup history recovery and preserve alternating strength/recovery cadence after schedule shifts.

- [x] Preserve visible green set checks in completed workout snapshots and repair the affected August 10 history signature.

- [x] Apply the user-approved female treadmill GIF set to every treadmill workout, warm-up, and cooldown surface.

- [x] Replace the static Hamstring Mobility guide with the user-approved CarrieFit-style looping demonstration.

- [x] Replace the static Chest and Shoulder Mobility guide with an original CarrieFit-style looping wall-slide demonstration.

- [x] Replace the static Hip Flexor Mobility guide with an original CarrieFit-style looping demonstration.

- [x] Correct the Home schedule-update card and Home-specific bottom-navigation theme.

- [x] Audit and convert every remaining legacy black content surface to CarrieFit's pink-and-white theme.

- [x] Prioritize completed workouts on Home and Calendar dates containing multiple schedule records.

- [x] Add an offline adaptive training profile with explainable, confirm-before-apply volume, cardio, and progression recommendations.
- [x] Add deterministic tests for recovery sequence shifting.
- [x] Test that rest days remain fixed during every rescheduling mode.
- [x] Add regression coverage for BUG-001 workout scroll restoration.
- [x] Add regression coverage for BUG-002 small-iPhone check-in layout.
- [x] Add offline install, update, and relaunch smoke tests.
- [x] Audit Calendar and recovery dialogs with VoiceOver.

## Medium priority

- [ ] Add calendar filters for status and workout type.
- [ ] Improve calendar navigation for jumping to Today.
- [ ] Document adherence and recovery-score formulas for users.
- [ ] Add structured validation for imported backup data.
- [ ] Review coach recommendations for stale missed sessions.
- [ ] Consolidate duplicated legacy styling where tests permit.

## Low priority

- [ ] Add exercise search.
- [ ] Add exercise category filters.
- [ ] Add an agenda-style calendar option.
- [ ] Improve empty states for historical calendar dates.
- [ ] Add printable or exportable progress summaries.

## Parking lot

- [x] Define a progressive-overload recommendation data contract.
- [ ] Research privacy-preserving optional synchronization.
- [ ] Research Apple Health integration requirements.
- [ ] Research wearable and heart-rate data sources.
- [ ] Define nutrition feature boundaries and safety language.

## Future task template

Copy this block for new work:

```markdown
### TASK-000 — Short title

- Priority:
- Target release:
- Owner:
- Status:
- Problem:
- Acceptance criteria:
  - [ ]
- Architecture notes:
- UI notes:
- Test plan:
- Dependencies:
```

## Completed this sprint

- [x] Move Carrie's protected rest day to Thursday, move Core + Recovery to Sunday, and reflow the August 8 early-completion schedule through an additive migration.
- [x] Re-anchor a completed early workout to its actual completion date, advance the remaining rotation, and repair existing linked history through an additive migration.
- [x] Implement the approved Concept B Training Command Center visual refresh for Home using only existing application data and actions.
- [x] Launch the explicitly selected future workout from Start This Workout Early and allow missed-workout coach recommendations to be dismissed without changing the schedule.
- [x] Keep workout timers accurate while the iPhone PWA is suspended behind another app.
- [x] Add approved offline illustrations and matching single-movement instructions for all three Tuesday mobility exercises.
- [x] Add an offline timer-completion sound and accessible completion announcement.
- [x] Show the most recent completed weight during each strength exercise.
- [x] Select the next incomplete scheduled session on Home after workout completion.
- [x] Derive the muscle recovery map from completed workout history with legacy fallback coverage.
- [x] Add an offline red-cage Lat Pulldown illustration with a safe upper-chest finish.
- [x] Keep Full Body A cooldown and stretching exercises at the end of the workout.
- [x] Add an offline two-position Bodyweight Squat posture illustration.
- [x] Add an offline Arm Circles posture and motion illustration.
- [x] Open Calendar on the current month at app launch and allow today's workout to start from its details.
- [x] Correct the Cable Hammer Curl start and finish positions to face one front pulley post.
- [x] Add an offline Cable Hammer Curl illustration on the red Smith cage.
- [x] Move the Incline Cable Press left carriage to the inner front-left upright.
- [x] Correct the Incline Cable Press pulley placement and red Smith cage finish.
- [x] Add an offline cage-style Smith machine Incline Cable Press illustration.
- [x] Add an offline two-position Hip Hinge posture illustration.
- [x] Add an offline treadmill posture illustration and polish the reviewed-media fallback.
- [x] Repair local-date schedule activation so yesterday's missed workout remains visible and recoverable.
- [x] Complete yesterday’s missed workout today without changing today’s schedule before completion.
- [x] Add Calendar recovery rescheduling with completed-workout and rest-day collision protection.
- [x] Add deterministic recovery, sequence, immutability, and rest-day tests.
- [x] Add BUG-001 workout scroll restoration regression tests.
- [x] Add BUG-002 responsive Save Check-In layout regression tests.
- [x] Add Service Worker install, update, cache, and offline relaunch smoke tests.
- [x] Audit and test Calendar names, recovery dialog focus, dismissal, and focus return.
- [x] Establish the `/docs` documentation system.
- [x] Record architecture, UI, contribution, and release standards.
- [x] Add `PROJECT_CONTEXT.md` as the current project handoff.
