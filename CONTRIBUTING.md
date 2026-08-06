# Contributing to CarrieFit

Before making changes, read `/docs/PROJECT_CONTEXT.md` and the rest of `/docs`. Keep documentation, tests, metadata, and implementation aligned.

## Naming conventions

- JavaScript variables and functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE` for fixed cross-module values; existing local conventions may remain
- CSS classes: descriptive `kebab-case`
- Files: lowercase `kebab-case` unless matching an established production filename
- Bug IDs: `BUG-###`
- Task IDs: `TASK-###`
- Dates stored as calendar identity: `YYYY-MM-DD`
- Public versions: `MAJOR.MINOR.PATCH`
- Build identifiers: `YYYY.MM.DD.N`

Prefer names that describe product intent, such as `scheduledDate`, over visual or temporary names.

## Folder organization

- Production runtime files remain at the repository root until a tested migration is approved.
- Exercise and application media belongs in `assets/`.
- Validation and maintenance utilities belong in `scripts/`.
- Product and engineering standards belong in `docs/`.
- Do not add generated build output, dependency folders, temporary screenshots, or local server logs.
- Do not add a new production entry point without updating validation, Service Worker caching, architecture documentation, and release checks.

## JavaScript and TypeScript style

The current runtime uses plain modern JavaScript. TypeScript may be introduced only through an approved architecture task with a migration and build plan.

- Use `const` by default and `let` only for reassignment.
- Use semicolons consistently with surrounding production code.
- Prefer small, named functions for business rules.
- Keep scheduling and metric calculations deterministic.
- Avoid implicit global variables.
- Validate browser storage and imported data before use.
- Use optional chaining only where absence is expected.
- Keep DOM event binding close to the rendering function it supports until UI modules are introduced.
- Escape or avoid inserting untrusted text into HTML.
- Do not silently swallow errors that threaten saved data.
- Add comments for invariants and non-obvious constraints, not line-by-line narration.

## CSS style

- Reuse tokens and components defined in `app.css`.
- Follow `docs/UI_GUIDELINES.md`.
- Use mobile-first responsive rules.
- Prefer Grid or Flexbox with `minmax(0, 1fr)` for constrained content.
- Test at the required iPhone widths.
- Avoid `!important` unless overriding an external or unavoidable cascade constraint.
- Do not add page-level horizontal scrolling.

## Commits

Use Conventional Commits:

```text
feat: add calendar filtering
fix: preserve workout scroll position
docs: establish release process
refactor: isolate scheduling calculations
test: cover rest-day workout shifting
chore: rotate service worker cache
```

Keep commits focused and independently understandable. Do not mix unrelated formatting, refactoring, features, and documentation.

## Branch naming

Use lowercase, descriptive branches:

```text
feature/v13.3-calendar-filters
fix/bug-001-scroll-restoration
docs/project-organization
refactor/scheduling-engine
test/workout-recovery
```

Avoid vague names such as `updates`, `changes`, or `work`.

## Pull requests

Every pull request should state:

- Problem and user impact
- Scope and non-goals
- Architecture and data implications
- UI and accessibility implications
- Validation performed
- Screens or storage migrations affected
- Documentation updated

Changes to scheduling, storage, Service Worker behavior, or completed history require explicit regression testing.

## Definition of done

- Acceptance criteria are satisfied.
- Existing user data remains compatible.
- Automated validation passes.
- Required mobile, accessibility, and offline checks pass.
- No unrelated production changes are included.
- `CHANGELOG.md`, `KNOWN_BUGS.md`, `ROADMAP.md`, and `PROJECT_CONTEXT.md` are updated where relevant.

