# Project Context

## Current production candidate

- Product: CarrieFit
- Version: 1.3.2
- Build: 2026.09.01.1
- Last updated: September 1, 2026
- Service Worker cache: `carriefit-v1-3-2-shell`
- Runtime: static, client-only, offline-first PWA
- Primary storage key: `carriefitv5`

## Product direction

CarrieFit is the wife-focused sibling of Road to 12%. It shares the mature workout, scheduling, recovery, history, adaptive-coaching, responsive, and offline architecture while keeping its branding and saved data independent.

The approved visual direction is a polished pink system: warm blush canvas, white and pale-pink elevated surfaces, rose primary actions, plum text, and restrained amber and green semantic states. It applies consistently across every primary screen, workout surface, setup guide, record/history card, and modal without changing navigation or product behavior. Black or near-black content cards are not part of CarrieFit's interface.

The installed iPhone Home Screen icon is a clean CarrieFit rose-pink (`#d94f8b`) dumbbell without Road to 12% goal text. Safari receives an explicit 180 px Apple touch icon, and the web app manifest includes standard 192 px and 512 px install icons.

The polished pink system covers the entire workout journey as well as the five primary screens: workout launch and preview cards, active-exercise surfaces, setup instructions, set entry, timers, feedback, completion, media overlays, and workout-related dialogs all use light blush, white, rose, and plum surfaces.

The program uses the same home-gym equipment and prioritizes sustainable fat loss, muscle retention and definition, lower-body and glute strength, posture, aerobic fitness, core control, mobility, and recovery. Exercise selection is based on goal, movement quality, available equipment, and recovery—not gender stereotypes.

Carrie's confirmed kettlebell rack contains 20, 25, and 30 lb kettlebells. Version 1.3.0 enables that inventory through an additive schema migration, changes Goblet Squat to the kettlebell setup, adds a light Around the World block on Monday, a Deadlift hinge primer on Wednesday, and technique-focused Swings before Friday's existing treadmill intervals. No existing exercise is removed, the alternating strength/recovery structure remains intact, and Thursday remains protected.

## Default profile

- Preferred name: Carrie
- Current weight: 190 lb, carried forward from the earlier CarrieFit scaffold
- Target weight: 140 lb, carried forward from the earlier CarrieFit scaffold
- Primary goal: fat loss while preserving muscle
- Experience: beginner
- Typical session: 45 minutes
- Training availability: 5 days per week

Age, height, waist measurement, limitations, health context, and all targets remain editable or unset until Carrie supplies them.

## Weekly structure

- Monday: Strength + Shape A
- Tuesday: Cardio + Mobility
- Wednesday: Strength + Shape B
- Thursday: Recovery + Check-in (protected rest day)
- Friday: Strength + Shape C
- Saturday: Zone 2 Cardio
- Sunday: Core + Recovery

## Architecture and constraints

Follow `ARCHITECTURE.md`, `UI_GUIDELINES.md`, and `RELEASE_PROCESS.md`. Preserve completed history, immutable planned dates, protected rest days, offline functionality, 320 px layouts, accessible state labels, and additive migrations. CarrieFit must never reuse the Road to 12% storage key or Service Worker cache prefix.

Completing a future workout early now makes that linked session today's completed workout and pulls every later incomplete workout forward to the next available training dates. The version 7 storage migration automatically applies the same idempotent reconciliation to previously saved linked history, including Carrie's first Strength + Shape A session, without rewriting the history snapshot.

Carrie's saved local completion date for her first Strength + Shape A session is Saturday, August 8, 2026. Version 1.1.4 preserves that date, makes Thursday the fixed protected rest day starting with the week of August 10, moves Core + Recovery to Sunday, and recalculates the incomplete rotation so Cardio + Mobility follows on Sunday, August 9. The version 8 migration is additive and idempotent.

Version 1.1.13 re-runs the narrow completed-set repair after startup history recovery so an affected workout saved after the earlier one-time migration still restores its completion flags and Personal Records. Schedule reconciliation also prevents incomplete strength sessions from landing on consecutive calendar days by bringing the next available cardio or mobility session forward; Thursday remains protected.

Version 1.1.14 makes that history recovery set-specific: every affected set with an explicitly entered weight and reps is restored even if another completion flag survived elsewhere in the same workout. This specifically restores Carrie’s recorded 110 lb Lat Pulldown sets and allows that load to replace the prior 88 lb Personal Record; blank weight rows are not inferred as complete.

Version 1.1.15 completes the approved female animation coverage for Core + Recovery and stretching: Dead Bug, Bird Dog, Side Plank from Knees, Hip & Glute Mobility, Slow Breathing, and the combined Post-Workout Stretch each use reviewed CarrieFit loops. Thoracic & Shoulder Mobility reuses the approved female wall-slide loop, and Zone 2 cooldown reuses the approved female treadmill loop. All are available offline.

Version 1.2.0 completes the active-program animation audit with 24 additional approved female movement loops spanning warm-ups, Zone 2 cardio, cable exercises, Smith-machine exercises, and accessory work. Animated movement guidance and the existing RitFit/equipment reference are intentionally shown together on each affected exercise, and both remain available offline.

Version 1.3.0 adds the approved kettlebell programming and female movement loops. App-created kettlebell demonstrations use the same blush-and-plum model and remain available offline; machine exercises continue to retain their official RitFit setup reference beside the CarrieFit animation.

Version 1.3.1 ensures an existing iPhone Home Screen installation re-registers the Service Worker using the current build key. The worker and metadata import remain build-keyed together, and the offline cache rotates with the patch release.

Version 1.3.2 applies Carrie's requested one-day rotation shift after the incomplete Monday, August 31 session. The incomplete workout moves to Tuesday, September 1; later incomplete workouts move to the next available training dates, Thursday remains protected, completed history and immutable planned dates remain unchanged, and the existing cadence safeguard keeps strength sessions separated by cardio or mobility.
