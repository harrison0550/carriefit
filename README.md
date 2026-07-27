# CarrieFit X — Phase 5

Phase 5 is a substantial functional upgrade.

## Included

- Mobile-first five-tab interface
- Persistent local storage
- Full workout logging for weight, reps, and completed sets
- Workout completion history
- Interactive rest timer with 60, 90, and 120 second presets
- Searchable workout library
- Searchable equipment library
- Expandable RitFit M1 setup guides
- Weight history and canvas-based progress chart
- Water, sleep, mood, and energy tracking
- Offline PWA cache
- iPhone safe-area support

## Deploying

Replace the existing files in the CarrieFit GitHub repository with the contents of this ZIP, commit, and push.

Because the service worker caches files, an installed older build may need to be fully closed and reopened after deployment. If GitHub Pages still shows old content, remove the app from the home screen once, open the website in Safari, and add it again.

## Photo folders

The following folders are ready for the actual home-gym images:

- `assets/equipment/`
- `assets/images/`

Phase 6 can connect those photos to individual equipment and exercise guides.
