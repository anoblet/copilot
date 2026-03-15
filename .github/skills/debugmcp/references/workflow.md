# DebugMCP Workflow Reference

## Minimal Loop

1. Decide whether runtime evidence is needed. Use the debugger when logs, diagnostics, and static reading do not explain the behavior.
2. Read the host's debugging guide or instructions before starting. Many hosts expect a specific order for session startup, breakpoint placement, or cleanup.
3. Verify the target file path, working directory, and any test name or launch configuration before starting a session.
4. Start one debug session with the smallest reproduction path that can still show the problem.
5. Add a narrow breakpoint set around the suspected boundary, reproduce the issue, and pause execution.
6. While paused, inspect variables, evaluate expressions, and step until the root cause is proven.
7. Clear temporary breakpoints and stop or restart the session when the investigation branch is complete.

## Match The Entry Point To The Failure

- Test failure: debug the smallest failing test or test case if the host supports test-focused sessions.
- Script or command failure: start at the script entry point and pause near argument parsing, setup, or the first incorrect side effect.
- Application bug: use the smallest launch or attach configuration that reproduces the behavior.
- Integration boundary: break at the handoff between components, services, or async tasks instead of starting deep inside the failure.

Prefer the narrowest reproducible path. A smaller launch target reduces noise and makes stepping easier to interpret.

## Breakpoint Strategy

- Break at entry points, decision points, state transitions, and error boundaries.
- Start with as few breakpoints as possible. Add more only when the current evidence is insufficient.
- If the host supports conditional or log-style breakpoints, use them to reduce repeated stops in hot paths.
- Move breakpoints closer to the incorrect behavior after each pause instead of scattering them broadly.

Breakpoint placement should answer a specific question, such as which branch executed, which value changed, or where an exception originated.

## Pause, Inspect, Evaluate

- Inspect the current frame before stepping. Confirm whether the paused state already explains the failure.
- Compare expected values with actual runtime state rather than assuming earlier code behaved correctly.
- Use expression evaluation for short hypotheses, derived values, or to inspect nested state that is cumbersome to expand manually.
- Step over when the current line is the focus, step into when the callee may contain the defect, and step out when the current frame is already understood.
- Re-check the active frame after stepping because scope and visible variables may have changed.

Do not edit code until the debugger evidence explains the defect, not just the symptom.

## Root-Cause Confirmation

- Identify the earliest point where state diverges from expectation.
- Prove why that divergence occurs, such as a wrong branch, stale value, missing await, incorrect argument, or failed assumption.
- If the host allows restart, replay the reproduction path to confirm the same evidence appears consistently.
- Record the decisive observations so the eventual fix is tied to verified runtime facts.

The goal is not only to find where execution stopped, but to confirm why the incorrect behavior became inevitable.

## Host Compatibility Notes

- Some hosts expose DebugMCP directly, some wrap it through MCP, and some provide equivalent debugger controls with different names.
- Map this workflow to the host's capability groups rather than one vendor's exact identifiers.
- The required capability groups are: debugging instructions, debug-session lifecycle, breakpoint management, execution control, variable inspection, and expression evaluation.
- If a host lacks one capability group, adjust the workflow instead of forcing unavailable operations.

## Cleanup

- Remove exploratory breakpoints when they are no longer needed.
- Stop the session once the root cause is confirmed or the current branch is exhausted.
- If the debugger state becomes confusing, clear breakpoints and restart with a smaller scope instead of continuing from uncertain state.