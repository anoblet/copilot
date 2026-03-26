# Improve

## Tools

- #askQuestions
- #chrome-devtools
- #context7
- #runSubagent
- #todo
- #oraios/serena

## Summary

A focused, repeatable checklist for finding, prioritizing, and fixing issues across the app. Use #askQuestions whenever anything is unclear.

## Before you begin

- Read [.copilot/sessions/](.copilot/sessions/) to understand recent sessions and context.
- Run the test suite and a quick smoke test locally to surface obvious failures.
- Open an issue or thread if you need clarification (use #askQuestions first).

## Process

1. Triage: run the app, reproduce problems, and list candidate issues with severity (P0–P3) and area (e.g., UX, perf, security).
2. Propose fixes: for each P0–P2, write a concise plan: code change, tests, docs, and manual verification steps.
3. Implement: make small, atomic changes with tests and a short PR description referencing the issue.
4. Verify: run automated tests, manual smoke checks, and update the issue with results.
5. Document: update docs, changelog, and add migration notes if relevant.

## Areas to check (concise, actionable)

- Functionality: bugs, missing features, edge cases. Deliver: failing test(s) or repro steps + fix.
- Code quality: dead code, duplication, unclear APIs. Deliver: refactor PRs with tests.
- Documentation: outdated or missing docs. Deliver: doc edits, examples, and READMEs.
- Security: input validation, auth, secrets, dependencies. Deliver: vulnerability summary and fixes or mitigations.
- Testing: low coverage or flaky tests. Deliver: new stable tests and CI updates.
- Accessibility: keyboard navigation, ARIA, contrast. Deliver: accessibility audit notes and fixes.
- Compatibility: browser/device/os regressions. Deliver: repro matrix and fixes or graceful degradations.
- Performance: slow pages, memory or CPU hotspots. Deliver: profiling data and optimizations.
- UX/UI: confusing flows, poor feedback. Deliver: concrete UI changes and copy improvements.
- Integration & APIs: unreliable third-party calls, retries, timeouts. Deliver: hardened integrations and tests.
- Deployment & CI/CD: flaky builds or manual steps. Deliver: pipeline fixes and deployment playbook.
- Monitoring & Logging: missing logs or alerts. Deliver: added logs, metrics, and alert rules.
- Error handling & resilience: uncaught errors, bad user messages. Deliver: graceful error paths and tests.
- Scalability & Architecture: single points of failure or bottlenecks. Deliver: design notes and incremental changes.

## Deliverables for each change

- Issue or ticket summarizing the problem and priority.
- Small PR implementing the fix with tests and a clear description.
- Verification steps and expected results.
- Documentation or changelog entry if behavior changed.

## Acceptance criteria

- Reproducible steps and tests for every bug fixed.
- CI passes and no new lint or type errors.
- Changes are small, scoped, and reversible.
- Documentation updated where public behavior changed.

## Notes

- Use #askQuestions first if unsure. Do not assume requirements.
- Prefer incremental fixes over large rewrites unless justified in a design note.
- Keep changes limited to a single concern per PR.
