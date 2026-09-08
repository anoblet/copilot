---
name: debugmcp
description: Use debugger-control capabilities such as session start, breakpoints, stepping, variable inspection, and expression evaluation when a task requires runtime evidence instead of static inspection alone.
compatibility: Requires a host that exposes DebugMCP or equivalent debugger-control capabilities, whether directly, through MCP, or through another debugger integration.
---

# DebugMCP

Use this skill when the fastest path to root cause is a live debugger with breakpoints, stepping, runtime state inspection, or expression evaluation.

## Good Fit

- Reproducing a bug that depends on runtime values, control flow, async timing, or test state.
- Confirming why a function returns the wrong value or why an exception is thrown.
- Comparing expected and actual state at a precise execution point.
- Debugging a specific test, script, application entry point, or integration boundary.

## Weak Fit

- Purely static tasks such as formatting, refactors with no behavior change, or documentation updates.
- Failures that are already explained by diagnostics, logs, or a clear compile error.
- Environments where the host cannot start or control a debug session.

## Default Workflow

1. Confirm that a live debugger is warranted and static inspection is not enough.
2. Read the host's debugging instructions or guide before starting a session.
3. Verify the exact target file, working directory, and if relevant the specific test or launch configuration.
4. Start one debug session and place the smallest useful set of breakpoints near the suspected boundary.
5. Step, inspect variables, and evaluate expressions until the root cause is confirmed.
6. Clear breakpoints and stop or restart the session as needed.

## Guardrails

- Do not assume exact tool names; hosts expose DebugMCP-equivalent capabilities differently.
- Keep one active debug session unless the host clearly supports more.
- Prefer narrow breakpoints at entry points, failure boundaries, or state transitions.
- Separate symptom collection from root-cause confirmation; inspect runtime state before editing code.
- Fall back to static analysis when debugger prerequisites are unavailable.

## Examples

- A unit test fails only under certain inputs. Start a debug session for that test, pause at the assertion boundary, and inspect the state that produced the mismatch.
- A handler returns the wrong result. Break on the decision point, step through the branch, and evaluate the inputs that led there.

See [the workflow reference](references/workflow.md) for a practical debugging loop and [the troubleshooting reference](references/troubleshooting.md) for prerequisite checks and recovery steps.