# Project Context

## Current production candidate

- Product: CarrieFit
- Version: 1.1.0
- Build: 2026.08.05.2
- Last updated: August 5, 2026
- Service Worker cache: `carriefit-v1-1-0-shell`
- Runtime: static, client-only, offline-first PWA
- Primary storage key: `carriefitv5`

## Product direction

CarrieFit is the wife-focused sibling of Road to 12%. It shares the mature workout, scheduling, recovery, history, adaptive-coaching, responsive, and offline architecture while keeping its branding and saved data independent.

The approved visual direction is a polished pink system: warm blush canvas, white and pale-pink elevated surfaces, rose primary actions, plum text, and restrained amber and green semantic states. It applies consistently across every primary screen and modal without changing navigation or product behavior.

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
- Thursday: Core + Recovery
- Friday: Strength + Shape C
- Saturday: Zone 2 Cardio
- Sunday: Recovery + Check-in

## Architecture and constraints

Follow `ARCHITECTURE.md`, `UI_GUIDELINES.md`, and `RELEASE_PROCESS.md`. Preserve completed history, immutable planned dates, protected rest days, offline functionality, 320 px layouts, accessible state labels, and additive migrations. CarrieFit must never reuse the Road to 12% storage key or Service Worker cache prefix.
