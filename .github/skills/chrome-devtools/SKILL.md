---
name: chrome-devtools
description: Use Chrome DevTools MCP to inspect and control a live browser when a task depends on rendered state, console output, network traffic, audits, or performance traces instead of static code alone.
---

# Chrome DevTools

Use this skill when you need evidence from a live page or browser session, not just source files.

## Good Fit

- Reproducing bugs that depend on runtime state, storage, auth, or responsive layout.
- Inspecting rendered structure before clicking, typing, or extracting data.
- Debugging console errors, failed requests, missing assets, or client-side navigation.
- Collecting screenshots, audits, or trace-based performance evidence.

## Default Workflow

1. Open or select the correct page with `new_page`, `list_pages`, or `select_page`.
2. Navigate and wait for the relevant state with `navigate_page` and `wait_for`.
3. Take a fresh `take_snapshot` before any interaction that depends on element identity.
4. Use the narrowest investigation branch:
   - `list_console_messages` and `get_console_message`
   - `list_network_requests` and `get_network_request`
   - `lighthouse_audit`
   - `performance_start_trace`, `performance_stop_trace`, and `performance_analyze_insight`
5. Save large artifacts to files and refresh the snapshot after actions that can re-render the page.

## Guardrails

- Re-check the selected page before acting because tools operate on shared page context.
- Prefer `take_snapshot` for automation and `take_screenshot` for visual confirmation.
- Use `evaluate_script` only when the needed data is not exposed by the page tree or built-in tools.
- Some hosts expose reduced tool sets, so verify tool availability before depending on a specific branch.
- Keep captures narrow because page content, storage state, and network data may be sensitive.

See [workflow patterns](references/workflows.md) for investigation branches and tool-selection heuristics.