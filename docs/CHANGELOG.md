# Changelog

All notable changes to CarrieFit are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses Semantic Versioning for public release numbers.

## [Unreleased]

### Fixed

- Fixed completed strength-set checks disappearing from saved workout logs by flushing the visible green-check state before every exercise advance; added a scoped repair for affected completed sessions recorded from August 10, 2026 onward.
- Fixed the Home schedule-update card and installed-app bottom navigation so their higher-specificity legacy selectors no longer restore black backgrounds.
- Removed remaining legacy black content surfaces from Personal Records, Progress, Exercises, Profile, setup guides, workout history, and supporting dialogs so the approved pink-and-white theme is consistent throughout.
- Fixed Home and Calendar date tiles so a completed workout displays as the primary green status when the same date also contains an older incomplete schedule record.

### Added

- Added the three approved looping female treadmill demonstrations for easy walking, incline walking, and HIIT intervals, including all treadmill warm-up and cooldown surfaces and offline use.
- Added the approved looping female Hamstring Mobility demonstration in CarrieFit's blush-and-plum visual style, cached for offline workouts.
- Added an original looping female Chest and Shoulder Mobility wall-slide demonstration in CarrieFit's blush-and-plum visual style, cached for offline workouts.
- Added an original looping female Hip Flexor Mobility demonstration in CarrieFit's blush-and-plum visual style, cached for offline workouts.
- Replicated the mature Road to 12% workout, scheduling, recovery, progress, adaptive-coaching, exercise-guide, and offline PWA experience as CarrieFit.
- Added a Carrie-specific three-day Strength + Shape program supported by cardio, mobility, core, recovery, and check-in days using the same home-gym equipment.
- Added independent `carriefitv5` device storage and a `carriefit-` offline cache namespace.

### Changed

- Advanced CarrieFit to version 1.1.12 and rotated the offline shell cache for the completed-set history repair.
- Advanced CarrieFit to version 1.1.11 and rotated the offline shell cache for the approved treadmill animation set.
- Advanced CarrieFit to version 1.1.10 and rotated the offline shell cache for the approved animated hamstring mobility guide.
- Advanced CarrieFit to version 1.1.9 and rotated the offline shell cache for the animated chest-and-shoulder mobility guide.
- Advanced CarrieFit to version 1.1.8 and rotated the offline shell cache for the animated mobility guide.
- Advanced CarrieFit to version 1.1.7 and rotated the offline shell cache for the final Home-theme specificity fix.
- Advanced CarrieFit to version 1.1.6 and rotated the offline shell cache for the complete light-theme audit.
- Changed CarrieFit's protected weekly rest day from Sunday to Thursday and moved the full guided Core + Recovery session to Sunday.
- Advanced CarrieFit to version 1.1.5 and rotated the offline shell cache for the completed-date display fix.
- Advanced CarrieFit to version 1.1.4 and rotated the offline shell cache for the Thursday-rest schedule migration.
- Removed the Road to 12% goal text from CarrieFit's installed app icon, leaving a clean pink dumbbell mark.
- Extended the polished pink design system through workout launch, active exercises, setup guidance, timers, set entry, workout feedback, completion, and workout-related dialogs.
- Advanced CarrieFit to version 1.1.2 and rotated the offline shell cache for the completed workout-theme release.
- Recolored CarrieFit's dumbbell app icon from red to the approved rose pink and added explicit iPhone Home Screen and install-icon metadata.
- Advanced CarrieFit to version 1.1.1 and rotated the offline shell cache for the app-icon release.
- Applied the approved polished pink design system across Home, Calendar, workouts, exercise guides, Progress, Profile, coaching, dialogs, controls, and navigation.
- Advanced CarrieFit to version 1.1.0 and rotated the offline shell cache for the theme release.

- An approved offline Bird Dog animation with a dedicated guided exercise screen and alternating opposite-arm/opposite-leg directions.
- Independent Dumbbells and Kettlebells controls under My Equipment, with dumbbells enabled and kettlebells disabled for the current equipment profile.
- An offline adaptive-coaching foundation with a private on-device training profile, explainable recommendations, explicit acceptance, session-length volume caps, cardio targets, conservative progression guardrails, and backup compatibility.
- A coach-forward Home command center with an accessible weekly status strip, focused workout card, existing adherence/recovery/session metrics, compact next-workout context, and latest check-in summary.
- Home coach recommendations now offer a confirmed “Leave missed & continue plan” action while preserving the Missed Calendar record.
- Offline timer-completion chime with vibration and an accessible completion announcement.
- Previous completed weight guidance on every strength exercise, including Smith working weight and per-stack context.
- Professional project documentation under `/docs`.
- Project context and contributor standards for future development sessions.
- Deterministic recovery scheduling tests covering sequence order, immutable planned dates, completed sessions, and protected rest days.
- Automated regression coverage for workout resume and intentional next-exercise scrolling.
- Automated small-iPhone layout coverage for the Progress Save Check-In control.
- Automated Service Worker smoke coverage for install, update cleanup, cached relaunch, and network fallback.
- Calendar-driven recovery for completing a missed workout through the existing workout engine.
- Recovery history metadata showing the original planned date and actual completion date.
- Workout Recovery rescheduling choices for today, tomorrow, or a user-selected date.
- Offline treadmill posture artwork with a full-screen enlargement and accessible description.
- Offline two-position Hip Hinge artwork showing the standing start and correct hinge posture.
- Offline two-position Incline Cable Press artwork using a cage-style Smith machine with low pulleys on both front posts.
- Offline two-position Cable Hammer Curl artwork using a rope on the low inner front-left pulley of the red Smith cage.
- Offline Arm Circles artwork showing the standing posture and circular arm path.
- Offline two-position Bodyweight Squat artwork showing a tall start and controlled parallel-depth squat.
- Offline two-position Lat Pulldown artwork showing the complete red Smith cage, one high front-post pulley, a center-connected cable, and a safe upper-chest finish.
- Offline two-position illustrations for Hip Flexor Mobility, supported standing Hamstring Mobility, and Chest and Shoulder wall slides.

### Changed

- Advanced the maintenance build to `2026.08.05.2` and rotated the offline shell cache for the Bird Dog visual guide.
- Split the Core Activation Circuit into Dead Bug, Bird Dog, and Side Plank from Knees while preserving its eight-minute total duration.
- Advanced the maintenance build to `2026.08.05.1` and rotated the offline shell cache for guided cardio and recovery preview launches.
- Workout previews now list the actual equipment-safe guided sequence that will launch rather than a separate summary list.
- Advanced the maintenance build to `2026.08.04.10` and rotated the offline shell cache for the equipment-profile update.
- Goblet Squat now explicitly uses one dumbbell and returns to the equipment-safe workout rotation.
- Advanced the maintenance build to `2026.08.04.9` and rotated the offline shell cache for the Home next-workout correction.
- Advanced the maintenance build to `2026.08.04.8` and rotated the offline shell cache for adaptive coaching.
- The muscle recovery map now derives trained groups from saved exercise muscles and falls back to current exercise definitions for compatible older history.
- Smith-machine weight entry now clearly requests total plate weight across both sides and reports the per-side load plus the M1 Pro's 33 lb Smith bar in the working-weight total.
- Bumper plates are now enabled for existing and new installations, reflecting the available 10–45 lb plate range for Smith-machine loading.
- Isolated pure recovery scheduling rules in a testable browser module without changing stored data.
- Calendar cells now announce both workout status and workout type to assistive technology.
- Calendar and recovery dialogs now focus their heading, isolate background controls, support Escape, and return focus to their invoking control.
- Advanced the maintenance build to `2026.07.30.2` and rotated the offline shell cache to deliver the completed High Priority fixes to installed PWAs.
- Missed-workout recovery now defers changes to today’s schedule until the recovered workout is complete and the user confirms a choice.
- Advanced the maintenance build to `2026.07.30.4` and rotated the offline shell cache for the recovered-workout flow.
- Past incomplete Calendar workouts now open complete details with Start Workout, Reschedule, and Close actions.
- Consolidated recovery actions into the existing Workout Details modal, removing the obsolete Close-only/intermediate recovery path.
- Mutable PWA shell files now refresh from the network when available while retaining cached offline fallback.
- Service Worker metadata imports are build-keyed to prevent stale iOS Home Screen updates.
- Rescheduling now avoids completed dates and protected rest days, shifting later incomplete workouts only when the selected date is occupied.
- Advanced the maintenance build to `2026.07.30.7` and rotated the offline shell cache for the corrected Workout Details flow.
- Advanced the maintenance build to `2026.07.30.8` and rotated the offline shell cache for reliable installed-PWA updates.
- Advanced the maintenance build to `2026.07.30.9` and rotated the offline shell cache for the local-date Calendar repair.
- Advanced the maintenance build to `2026.07.30.10` and rotated the offline shell cache for the treadmill visual guide.
- Advanced the maintenance build to `2026.07.30.11` and rotated the offline shell cache for the Hip Hinge visual guide.
- Advanced the maintenance build to `2026.07.30.12` and rotated the offline shell cache for the Incline Cable Press visual guide.
- Advanced the maintenance build to `2026.07.30.13` and rotated the offline shell cache for the corrected Incline Cable Press equipment artwork.
- Advanced the maintenance build to `2026.07.30.14` and rotated the offline shell cache after moving the left Incline Cable Press pulley to the inner front-left upright.
- Advanced the maintenance build to `2026.07.30.15` and rotated the offline shell cache for the Cable Hammer Curl visual guide.
- Advanced the maintenance build to `2026.07.30.16` and rotated the offline shell cache for the corrected Cable Hammer Curl orientation.
- Advanced the maintenance build to `2026.08.03.1` and rotated the offline shell cache for the current-month Calendar and same-day workout-launch fixes.
- Advanced the maintenance build to `2026.08.03.2` and rotated the offline shell cache for the Arm Circles visual guide.
- Advanced the maintenance build to `2026.08.03.3` and rotated the offline shell cache for the Bodyweight Squat visual guide.
- Advanced the maintenance build to `2026.08.03.4` and rotated the offline shell cache for corrected Full Body A workout ordering.
- Advanced the maintenance build to `2026.08.03.5` and rotated the offline shell cache for the Lat Pulldown visual guide.
- Advanced the maintenance build to `2026.08.03.6` and rotated the offline shell cache for the approved full-cage Lat Pulldown artwork.
- Advanced the maintenance build to `2026.08.03.7` and rotated the offline shell cache for the updated equipment availability.
- Advanced the maintenance build to `2026.08.03.8` and rotated the offline shell cache for the clarified Smith-machine weight calculator.
- Advanced the maintenance build to `2026.08.04.1` and rotated the offline shell cache for workout quality-of-life improvements.
- Advanced the maintenance build to `2026.08.04.2` and rotated the offline shell cache for the Progress navigation-state fix.
- Advanced the maintenance build to `2026.08.04.3` and rotated the offline shell cache for the three approved mobility guides.
- Advanced the maintenance build to `2026.08.04.4` and rotated the offline shell cache for background-safe workout timers.
- Advanced the maintenance build to `2026.08.04.5` and rotated the offline shell cache for future-workout launch selection and dismissible coach recommendations.
- Advanced the maintenance build to `2026.08.04.6` and rotated the offline shell cache after preserving the selected early workout through the step-zero launch screen.
- Advanced the maintenance build to `2026.08.04.7` and rotated the offline shell cache for the Concept B visual refresh.
- Refreshed Home with the Training Command Center design while retaining the existing workout, preview, history, coach, scheduling, and bottom-navigation actions.
- Replaced the ambiguous mobility directions with one equipment-specific movement per exercise that matches its illustration.
- Replaced developer-facing missing-media copy with concise coached-instruction guidance.

### Fixed

- Corrected Carrie's first completed Strength + Shape A date to Saturday, August 8, based on the saved local completion timestamp, and recalculated the following rotation around Thursday rest.
- Fixed completed early workouts remaining on their original future date instead of becoming today's completed workout and pulling the remaining rotation forward. Version 1.1.3 also repairs already-saved linked early completions without changing completed history or immutable planned dates.
- Core + Recovery, Cardio + Mobility, and Zone 2 previews now start their implemented guided workouts instead of showing an obsolete preview-only message.
- Home now advances to the next incomplete scheduled workout after today's workout is complete, including older saved sessions whose schedule status was not updated.

- Fixed Start This Workout Early launching today’s workout instead of the selected future workout, including the second handoff through the pre-workout landing screen.
- Fixed workout timers pausing while the iPhone PWA is suspended behind another app; elapsed wall-clock time is now reconciled when CarrieFit returns to the foreground.
- Fixed Home repeating a just-completed workout instead of displaying the next incomplete scheduled session.
- Fixed the muscle recovery map remaining green after a completed workout whose exercise snapshots lacked muscle metadata.
- Fixed the Progress bottom-navigation tab not turning red when selected.
- Added a consistent visible keyboard focus indicator across interactive controls.
- Fixed installed PWAs remaining on an older shell after a newer build was deployed.
- Fixed UTC date conversion causing yesterday's missed workout to be absent from Calendar.
- Corrected the Incline Cable Press illustration so both low pulleys are on the front posts and the Smith cage matches the red equipment.
- Corrected the left Incline Cable Press carriage placement from the outer rear-left upright to the inner front-left upright beside the bench.
- Corrected the Cable Hammer Curl illustration so both positions face the same single front pulley post.
- Fixed Calendar opening on a previously viewed month after launching the app on a new month.
- Added the missing Start Workout action for today's incomplete Calendar workout while preserving normal, non-recovery completion behavior.
- Moved Easy Treadmill Cooldown and Post-Workout Stretch to the end of Full Body A instead of between the Smith and cable blocks.

### Removed

## [13.2.0] - 2026-07-30

Current production build: `2026.07.30.1`.

### Added

- Monthly workout Calendar with tappable days.
- Independent workout status and workout type indicators.
- Tappable Calendar legend with plain-language explanations.
- Flexible missed-workout recovery and rescheduling flows.
- Coach recommendations for missed sessions.
- Training streak, program adherence, recovery score, and total-session metrics.
- Separate immutable planned dates and movable scheduled dates.

### Changed

- Bottom navigation now uses Home, Calendar, Progress, Exercises, and Profile.
- Dashboard messaging reflects rescheduled workouts and shifted sessions.
- Service Worker shell cache advanced to `carriefit-v13-2-shell`.

### Fixed

- Workout scroll position is preserved when returning to an active workout.
- Automatic scrolling occurs only when intentionally advancing exercises.
- Save Check-In stays within the Progress content container on small iPhones.
- Safe-area spacing and page-level overflow behavior were tightened.

### Removed

- Unintended viewport-anchor scrolling after marking a set complete.

Future versions should be inserted above `13.2.0`, beneath `Unreleased`.

[Unreleased]: https://github.com/harrison0550/road-to-12/compare/v13.2.0...HEAD
[13.2.0]: https://github.com/harrison0550/road-to-12/releases/tag/v13.2.0
