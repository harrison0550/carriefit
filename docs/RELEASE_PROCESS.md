# Release Process

## Version numbering

CarrieFit uses `MAJOR.MINOR.PATCH` release numbers:

- **Major**: incompatible data, architecture, or product changes.
- **Minor**: backward-compatible features and substantial improvements.
- **Patch**: backward-compatible defect or documentation corrections.

Build identifiers use `YYYY.MM.DD.N`, where `N` increments for multiple builds on the same date.

## Prepare the release

1. Confirm the target scope in `ROADMAP.md` and `CODEX_TASKS.md`.
2. Ensure active bugs are recorded in `KNOWN_BUGS.md`.
3. Work from a focused branch using the conventions in `CONTRIBUTING.md`.
4. Preserve unrelated changes and existing local data compatibility.
5. Complete implementation and tests before changing release metadata.

## Update release records

1. Move relevant entries from `CHANGELOG.md` → `Unreleased` into a new version section.
2. Add the release date and build identifier.
3. Record Added, Changed, Fixed, and Removed items; keep empty headings only under `Unreleased`.
4. Update `app-meta.js`:
   - `version`
   - `build`
   - `lastUpdated`
   - `serviceWorkerCache`
5. Update the build query on the `app-meta.js` import in `sw.js` to the same build identifier.
6. Update `PROJECT_CONTEXT.md`.
7. Update completed roadmap and sprint items.
8. Update the About screen only through its metadata source; do not hard-code a second version value.

## Automated checks

Run from the repository root:

```powershell
node scripts/validate-foundation.js
node scripts/validate-exercise-library.js
git diff --check
```

All checks must pass without ignored errors.

## Testing checklist

### Functional

- [ ] Home loads with existing data.
- [ ] A workout can start, save progress, resume, and finish.
- [ ] Completed history remains readable.
- [ ] Calendar opens every day and displays correct independent indicators.
- [ ] Recovery actions preserve `plannedDate`, order, and rest days.
- [ ] Progress check-ins save correctly.
- [ ] Backup export and import work with representative data.
- [ ] Exercises and Profile remain reachable.

### Responsive and accessibility

- [ ] Verify 320 × 568.
- [ ] Verify 375 × 667.
- [ ] Verify 390 × 844.
- [ ] Verify 430 × 932.
- [ ] No page-level horizontal overflow.
- [ ] Top and bottom safe areas are respected in standalone mode.
- [ ] Primary buttons remain inside content containers.
- [ ] Touch targets are at least 44px.
- [ ] Status is not communicated by color alone.
- [ ] Keyboard focus and VoiceOver labels are meaningful.
- [ ] Reduced-motion behavior remains usable.

### PWA and offline

- [ ] Manifest loads without errors.
- [ ] Service Worker installs on a clean origin.
- [ ] Required shell and media assets cache successfully.
- [ ] App relaunches offline after one online visit.
- [ ] Existing installation receives the new cache after update.
- [ ] Startup time shows no material regression.

### Data compatibility

- [ ] Test a clean install.
- [ ] Test representative production `localStorage`.
- [ ] Confirm migrations are additive and idempotent.
- [ ] Confirm malformed storage is preserved rather than overwritten.
- [ ] Confirm completed history is not rewritten.

## Commit and review

- Review `git diff` for accidental generated files or unrelated edits.
- Verify that production entry points referenced by `index.html` are correct.
- Use focused Conventional Commit messages.
- Request review for storage, Service Worker, scheduling, or accessibility changes.

## Git tagging

After the release commit is approved and merged:

```powershell
git tag -a v13.2.0 -m "CarrieFit v13.2.0"
git push origin v13.2.0
```

Replace the example version with the actual release. Never move or reuse a published release tag.

## Release notes

Release notes should include:

- Short user-facing summary
- Added or improved capabilities
- Important fixes
- Data or migration considerations
- Known limitations
- Validation performed
- Upgrade or cache-refresh instructions, if necessary

Publish release notes from the matching `CHANGELOG.md` section and keep technical implementation detail secondary.

## Post-release

1. Confirm the deployed app reports the expected version and build.
2. Verify the installed PWA updates successfully.
3. Move remaining tasks to the appropriate roadmap release.
4. Add newly discovered defects to `KNOWN_BUGS.md`.
5. Update `PROJECT_CONTEXT.md` for the next session.
