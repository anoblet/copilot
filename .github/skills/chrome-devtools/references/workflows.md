# Workflow Patterns

## Snapshot-First Interaction Loop

1. Open or select the page you care about.
2. Navigate and wait if the bug depends on page load, routing, or async content.
3. Take a fresh snapshot before any interaction that depends on element identity.
4. Use the returned `uid` values for `click`, `fill`, `drag`, `hover`, or keyboard actions.
5. Take another snapshot after any action that can re-render the page.

Use `includeSnapshot` on actions only when you need the updated tree immediately. Otherwise keep action responses small.

## Console And Browser Issue Triage

- Start with `list_console_messages` filtered to the smallest useful set, such as `error`, `warn`, or `issue`.
- Use `includePreservedMessages` when the problem may have happened during page load or a previous navigation.
- Fetch a specific entry with `get_console_message` when one message needs full detail.

This is usually the fastest branch for JavaScript exceptions, CSP violations, broken imports, and browser-surfaced audits.

## Network Investigation

- Use `list_network_requests` with `resourceTypes`, pagination, or preserved requests to reduce noise.
- Follow up with `get_network_request` only for the requests that matter.
- Save large request or response bodies to files when inline output would be noisy.

Prefer this branch when the bug looks like a bad API response, cache issue, missing asset, or incorrect request headers.

## Audits Versus Performance Traces

- Use `lighthouse_audit` for accessibility, SEO, and best-practices audits.
- Use `mode: "navigation"` when you need a fresh load and `mode: "snapshot"` when the current page state is already correct.
- Use `performance_start_trace` for runtime performance analysis, Core Web Vitals, and timeline-level investigation.
- When tracing with reload, navigate to the correct page first and let the trace capture the reload path.
- Use `performance_analyze_insight` after a trace when the output includes insight sets you need to drill into.

Choose Lighthouse when you need a scored audit. Choose a performance trace when you need timing detail, insight breakdowns, or memory and runtime evidence.

## Output Handling

- Prefer `take_snapshot` over screenshots unless visual layout is the actual question.
- Use file output parameters for screenshots, traces, and reports when the artifact is large.
- Use `evaluate_script` only for facts the page tree and built-in tools cannot expose directly.

## Common Recovery Steps

- If an element action fails, the page likely changed; take a fresh snapshot.
- If a tool seems to act on the wrong tab, run `list_pages` and `select_page` again.
- If trace analysis has nothing to inspect, record a new trace before calling insight tools.