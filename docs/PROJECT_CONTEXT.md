# Project Context

## Current production candidate

- Product: CarrieFit
- Version: 1.1.10
- Build: 2026.08.09.8
- Last updated: August 9, 2026
- Service Worker cache: `carriefit-v1-1-10-shell`
- Runtime: static, client-only, offline-first PWA
- Primary storage key: `carriefitv5`

## Product direction

CarrieFit is the wife-focused sibling of Road to 12%. It shares the mature workout, scheduling, recovery, history, adaptive-coaching, responsive, and offline architecture while keeping its branding and saved data independent.

The approved visual direction is a polished pink system: warm blush canvas, white and pale-pink elevated surfaces, rose primary actions, plum text, and restrained amber and green semantic states. It applies consistently across every primary screen, workout surface, setup guide, record/history card, and modal without changing navigation or product behavior. Black or near-black content cards are not part of CarrieFit's interface.

The installed iPhone Home Screen icon is a clean CarrieFit rose-pink (`#d94f8b`) dumbbell without Road to 12% goal text. Safari receives an explicit 180 px Apple touch icon, and the web app manifest includes standard 192 px and 512 px install icons.

The polished pink system covers the entire workout journey as well as the five primary screens: workout launch and preview cards, active-exercise surfaces, setup instructions, set entry, timers, feedback, completion, media overlays, and workout-related dialogs all use light blush, white, rose, and plum surfaces.

The program uses the same home-gym equipment and prioritizes sustainable fat loss, muscle retention and definition, lower-body and glute strength, posture, aerobic fitness, core control, mobility, and recovery. Exercise selection is based on goal, movement quality, available equipment, and recovery—not gender stereotypes.

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
