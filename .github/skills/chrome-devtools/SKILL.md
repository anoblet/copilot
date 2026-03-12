---
name: chrome-devtools
description: Use Chrome DevTools MCP for browser debugging, page inspection, automation, network analysis, and performance investigation when a task needs live browser state instead of static code alone.
---

# Chrome DevTools

Use this skill when the task depends on current browser state: reproducing UI bugs, inspecting rendered structure, tracing requests, or collecting browser-side audit and performance evidence.

## Good Fit

- Reproducing issues that only appear after a page loads or updates in the browser.
- Inspecting live page structure before clicking, typing, or extracting data.
- Debugging console errors, failed requests, or page-load regressions.
- Capturing accessibility, SEO, best-practices, or runtime performance evidence.

## Default Workflow

1. Open or select the right page with `new_page`, `list_pages`, or `select_page`.
2. If load state matters, use `navigate_page` and `wait_for` before inspecting anything.
3. Use `take_snapshot` to get the current page tree and fresh `uid` values.
4. Interact with the page using snapshot `uid`s.
5. Branch into the narrowest investigation path:
   - `list_console_messages` for browser errors, warnings, and issues.
   - `list_network_requests` and `get_network_request` for request and response detail.
   - `lighthouse_audit` for accessibility, SEO, and best-practices audits.
   - `performance_start_trace` for runtime performance and Core Web Vitals.
6. Save large artifacts to files instead of attaching everything inline.

## Guardrails

- Re-check the selected page before acting because tools operate on shared page context.
- Prefer `take_snapshot` for automation and `take_screenshot` for visual confirmation.
- Use `evaluate_script` only when the needed data is not exposed by the page tree or built-in tools.
- Keep captures narrow because page content, storage state, and network data may be sensitive.

See [workflow patterns](references/workflows.md) for investigation branches and tool-selection heuristics.