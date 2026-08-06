# CarrieFit

CarrieFit is a private, offline-first home-training PWA built from the proven Road to 12% workout engine. It uses the same RitFit M1 Pro, Gator bench, treadmill, rower, bike trainer, dumbbells, and bumper plates while maintaining completely separate device data.

## Training direction

The default week supports sustainable fat loss and muscle definition through:

- Three full-body resistance sessions to build or preserve muscle.
- Two low-impact cardio sessions for aerobic fitness and energy expenditure.
- One core and mobility session.
- One recovery and progress check-in day.

Carrie's starting weight and target are initialized from the earlier CarrieFit scaffold (190 lb and 140 lb). Age, height, limitations, session length, training frequency, and targets remain editable in Profile. Body weight informs goal context but never calculates lifting loads.

## Features

- Guided equipment-specific workouts with set, rep, weight, rest, and timer tracking.
- Offline exercise instructions and reviewed visual guides.
- Calendar scheduling, missed-workout recovery, and protected rest days.
- Progress check-ins, immutable workout history, records, and recovery context.
- On-device adaptive coaching with explainable, confirm-before-apply recommendations.
- Offline PWA installation and backup export/import.

## Local development

Serve the repository over HTTP, then open it in a browser. There is no compilation step; the checked-in static files are the production app.

Run the core validation before release:

```powershell
node scripts/validate-foundation.js
node scripts/validate-exercise-library.js
node scripts/test-scheduling.js
node scripts/test-adaptive-coaching.js
node scripts/test-offline-pwa.js
git diff --check
```

CarrieFit uses the `carriefitv5` local-storage key and the `carriefit-` Service Worker cache prefix. It does not read or modify Road to 12% data.
