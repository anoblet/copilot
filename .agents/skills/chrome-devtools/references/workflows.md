# Workflow Patterns

## Page Context

- Start with `list_pages` when more than one tab may be open.
- Use `select_page` before any action that changes state.
- Use `new_page` when you need a clean reproduction path.
- If load timing matters, `navigate_page` first and `wait_for` the state you actually care about.

The tools act on shared page context, so page selection is part of every investigation.

## Snapshot-First Interaction Loop

1. Open or select the page you care about.
2. Take a fresh snapshot before any interaction that depends on element identity.
3. Use the returned `uid` values for `click`, `fill`, `drag`, `hover`, or keyboard actions.
4. Take another snapshot after any action that can re-render the page.

Use `includeSnapshot` on actions only when you need the updated tree immediately. Otherwise keep action responses small.

## Investigation Branches

### Console Triage

- Start with `list_console_messages` filtered to the smallest useful set, such as `error`, `warn`, or `issue`.
- Use `includePreservedMessages` when the problem may have happened during page load or an earlier navigation.
- Fetch a specific entry with `get_console_message` when one message needs full detail.

Use this branch first for JavaScript exceptions, CSP violations, broken imports, and browser-surfaced issues.

### Network Investigation

- Use `list_network_requests` with `resourceTypes`, pagination, or preserved requests to reduce noise.
- Follow up with `get_network_request` only for the requests that matter.
- Save large request or response bodies to files when inline output would be noisy.

Prefer this branch when the problem looks like a bad API response, cache issue, missing asset, or header mismatch.

### Audits And Performance

- Use `lighthouse_audit` for accessibility, SEO, and best-practices audits.
- Use `mode: "navigation"` when you need a fresh load and `mode: "snapshot"` when the current page state is already correct.
- Use `performance_start_trace` for runtime performance analysis, Core Web Vitals, and timeline-level investigation.
- Use `performance_analyze_insight` after a trace when the output includes insight sets worth drilling into.

Choose Lighthouse for scored audits. Choose a performance trace for timing detail, insight breakdowns, or runtime evidence.

### Visual Evidence And Script Fallback

- Prefer `take_snapshot` for structure and `take_screenshot` when the visual result is the actual evidence.
- Use file output parameters for screenshots, traces, and reports when the artifact is large.
- Use `evaluate_script` only for facts the page tree and built-in tools cannot expose directly.

## Common Recovery Steps

- If an element action fails, the page likely changed; take a fresh snapshot.
- If a tool acts on the wrong tab, run `list_pages` and `select_page` again.
- If a trace has nothing useful to inspect, record a new trace before calling insight tools.