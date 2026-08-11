# Architecture

## Overview

CarrieFit is a client-only, offline-first PWA. `index.html` loads version metadata, exercise content, workout data, and the production application script. The application renders screens into a single main container and persists state locally. A Service Worker caches the application shell and reviewed media.

The current architecture favors reliability and portability: no application server is required, no account is required, and the installed app remains useful without connectivity.

Exercise media may be an official equipment reference, reviewed licensed media, or a clearly identified app-created posture illustration. App-created artwork supplements but never replaces the written setup, execution, and safety cues. All production exercise media is locally stored and precached.

## Workout Engine

The Workout Engine selects the appropriate program day, resolves exercises against available equipment, starts or resumes a session, tracks sets and timers, and writes a completed snapshot to workout history.

Workout timers use an absolute wall-clock finish timestamp rather than counting interval callbacks. The UI reconciles remaining time when the document becomes visible, receives focus, or is restored, because iOS may suspend JavaScript while another app is active. Completion chimes are generated locally through the browser audio API so the cue remains available offline, although iOS may delay the cue until the PWA resumes. Previous-weight guidance is read from the latest completed snapshot for the same exercise and must never prefill or mutate the active set automatically.

Session snapshots should remain stable after completion. Future changes to exercise definitions must not silently rewrite historical workout records. Active workout state may be resumed, but completed history is append-oriented.

Workout navigation and scroll-state rules live in `workout-navigation.js`. The UI captures position before leaving a workout and restores it after returning; only an intentional next-exercise action requests smooth scrolling to the top.

Before advancing from a strength exercise, the UI re-reads every visible set row and its green completion state into the active log. `workout-history.js` owns narrowly scoped, idempotent completed-history repair rules; the August 2026 repair restores completion only when an affected completed session has recorded weight and reps, has no surviving completed-set flags, and falls within the documented defect window.

## Scheduling

Scheduling represents training intent separately from execution:

- `plannedDate` records the original program date and is immutable.
- `scheduledDate` records when the session is currently expected to occur.
- `status` records scheduled, in-progress, completed, missed, rescheduled, or rest-day state.
- `reason` records optional recovery context such as travel, illness, or competing priorities.

Recovery operations move `scheduledDate` values while preserving `plannedDate`, workout order, completed sessions, and protected rest days. Scheduling rules should remain deterministic and independently testable as the codebase evolves.

After recovery or early-completion reflow, a deterministic cadence safeguard prevents two strength sessions from occupying consecutive calendar days. When that collision exists, the next incomplete cardio or mobility session moves ahead of the second strength session; completed dates and Thursday rest records remain immutable.

Starting a recovered workout does not mutate the schedule. It creates a normal Workout Engine session linked to the missed schedule entry. Completion records `completedDate` while retaining `actualCompletionDate` as a compatibility alias; any shift of today and future workouts occurs only after the user explicitly chooses the replacement option.

Starting a future workout early links the active session to the explicitly selected future schedule entry rather than re-resolving today’s entry. A selected session remains authoritative on the pre-workout landing screen even while `step` is zero; workout progress is not required merely to preserve that selection. Dismissing a Home coach recommendation adds `coachDismissedAt` and `coachDisposition` metadata to the missed session; it does not change `status`, `plannedDate`, `scheduledDate`, or later workouts, and the missed session remains recoverable from Calendar.

Completing that future workout early re-anchors its mutable `scheduledDate` to the actual local completion date, records the original scheduled date additively, and pulls later incomplete sessions forward in program order across available non-Thursday training dates. Completed sessions and protected rest-day records are never moved, and `plannedDate` remains immutable. The same pure rule reconciles older linked history through an additive, idempotent migration so an update can repair the schedule without rewriting the completed workout snapshot.

Thursday is CarrieFit's protected weekly rest day effective with the week of August 10, 2026; Core + Recovery occupies Sunday. The version 8 schedule-policy migration reclassifies generated Thursday and Sunday entries, then deterministically reflows incomplete sessions from the latest early-completion anchor. Historical completion timestamps remain authoritative, including Carrie's Saturday, August 8 Strength + Shape A session.

Calendar rescheduling delegates to the pure scheduling module. Moving into an occupied training date shifts later incomplete sessions in order; completed dates and protected rest dates are treated as unavailable. Moving into an open date does not shift unrelated sessions.

Pure recovery and date-shifting rules live in `scheduling.js`. UI code supplies the current session collection and persists the result; the scheduling module does not access the DOM or `localStorage`. This boundary allows deterministic Node.js regression tests without changing the versioned storage model.

## Calendar

The Calendar is a projection of scheduled sessions, not a separate source of truth. It groups sessions by `scheduledDate` and renders status and workout type independently. Every date remains interactive, including empty dates and rest days.

Calendar actions delegate changes to scheduling rules. Calendar UI code should never directly invent or reorder program state.

The existing Calendar Workout Details modal is the single entry point for past-session recovery actions. It renders Start Workout and Reschedule directly for incomplete past sessions rather than opening a second details modal.

A fresh application launch initializes the Calendar viewport to the device's current local month. Incomplete sessions scheduled for today can start or resume through the same Workout Engine entry point; only sessions scheduled before today are classified as recovered workouts.

## Progress Tracking

Progress combines immutable workout history, body check-ins, exercise records, adherence, recovery indicators, and aggregate session counts. Calculated metrics should be derived from saved facts whenever possible rather than stored redundantly.

Completed exercise snapshots include their muscle description. Recovery-map rendering may resolve missing muscle descriptions from matching exercise definitions for older compatible history, but it must not rewrite those historical snapshots during rendering.

Changes to formulas must be documented because users may compare results across releases.

## Data Storage

Application state is stored in browser `localStorage` behind a versioned storage boundary. Migrations are ordered, additive, and idempotent. Existing data must be preserved if a migration or parse fails.

Key constraints:

- Never change the production storage key without an explicit migration plan.
- Never overwrite completed history during routine rendering.
- Treat imports as untrusted input and validate their structure.
- Keep backup export compatibility across releases.
- Store dates in a stable local-date representation when calendar identity matters.
- Derive schedule activation from the device's local calendar date. Backfill boundaries through additive, idempotent migrations; never replace existing session records to repair a boundary.

Optional future synchronization must not make the local store unusable offline.

## Service Worker

The Service Worker precaches the application shell and required exercise media. `app-meta.js` owns the cache version. Mutable shell files use a network-first strategy with cached fallback; reviewed media remains cache-first. Each release that changes cached production files must rotate the cache name and update the `app-meta.js` import query in `sw.js` so installed iOS PWAs receive fresh metadata.

Offline validation must cover first installation, cached relaunch, update activation, and missing-network behavior. The Service Worker must not conceal stale application code indefinitely.

## Future AI modules

AI capabilities should enter through explicit, testable boundaries:

- Recommendation input builder: produces a minimal, structured summary.
- Recommendation engine: returns advice and rationale without mutating state.
- Policy layer: validates that recommendations respect program and safety rules.
- User confirmation layer: applies only approved schedule or progression changes.
- Audit record: stores the recommendation, rationale, and accepted action.

AI modules must be optional, privacy-conscious, and gracefully unavailable offline. Deterministic scheduling and workout completion rules remain authoritative.

The first adaptive-coaching foundation is deterministic and offline. `adaptive-coaching.js` normalizes profile inputs, builds an explainable recommendation from the profile and saved workout feedback, and returns cloned workout definitions with an accepted set cap or cardio target. It never accesses the DOM, storage, Calendar, or scheduling state. The UI stores a recommendation only after explicit acceptance and snapshots it into a newly started session so feedback changes cannot alter an active workout. Recorded limitations disable load-increase recommendations; they are not parsed into medical exercise prescriptions.

## Architectural boundaries

New work should move toward clear modules without large one-release rewrites:

```text
UI screens
   ↓
Workout / Scheduling / Progress services
   ↓
Versioned local storage
   ↓
Service Worker and browser platform
```

Refactoring production code requires dedicated tests and a separate task. Documentation-only work must not alter these runtime boundaries.
