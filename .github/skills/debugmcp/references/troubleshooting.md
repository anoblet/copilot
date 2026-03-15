# DebugMCP Troubleshooting Reference

## Capability And Prerequisite Check

- Confirm the host exposes debugger-control capabilities before planning around a live session.
- Confirm the language runtime, debugger extension, or launch integration needed by the target program is installed and available.
- Confirm the file path, working directory, and any optional test name or launch configuration are valid before starting.

If these prerequisites are not met, switch to static analysis or request the missing environment details instead of repeatedly retrying startup.

## Session Will Not Start

Common causes:

- Wrong file path or working directory.
- Missing or incompatible runtime or debugger integration.
- Selecting a launch configuration that does not actually run the failing code path.
- Passing a test name, argument, or target that the host cannot resolve.

Recovery steps:

1. Reduce the launch target to the smallest known reproduction path.
2. Re-check the exact path, working directory, and target selection.
3. If the host supports multiple configurations, pick the one closest to the failing code path.
4. Restart the session only after a concrete correction.

## Breakpoint Does Not Bind Or Does Not Hit

Common causes:

- The selected target is not executing the file or code path you expect.
- The breakpoint is set after the relevant code already ran.
- Source mapping or generated-code boundaries do not match the file you placed the breakpoint in.
- The breakpoint condition is too narrow or never becomes true.

Recovery steps:

1. Move the breakpoint earlier in the execution path.
2. Break at a stable entry point first, then step forward.
3. Confirm that the launched target, test, or configuration actually reaches the suspected code.
4. Simplify or remove conditions until an unconditional stop proves the path.

## Variables Or Expression Evaluation Are Unavailable

Common causes:

- Execution is not paused.
- The selected frame does not contain the symbol or scope you expect.
- The expression depends on data that is out of scope, optimized away, or not yet initialized.

Recovery steps:

1. Pause execution at a relevant frame.
2. Re-select the frame closest to the logic you are investigating.
3. Step once or twice to enter the scope where the needed values exist.
4. Prefer small, side-effect-free expressions when testing a hypothesis.

## The Session Hangs, Waits Forever, Or Times Out

Common causes:

- The program is waiting for external input or a resource that never arrives.
- The target configuration is too broad and takes too long to reproduce.
- A stale session or leftover breakpoint set is obscuring the current run.

Recovery steps:

1. Stop the session and restart with a smaller target.
2. Clear exploratory breakpoints that may be interrupting unrelated code.
3. Verify the working directory, arguments, and environment assumptions.
4. If attach-style debugging is required, confirm the target process is actually ready.

## Host Compatibility Gaps

- Some hosts expose only part of the debugger workflow, such as start and stop without expression evaluation.
- Some hosts rename operations or merge multiple debugger actions behind broader commands.
- Some hosts require explicit access to the debugging guide before other debugger controls are reliable.

When capability names differ, translate the skill's workflow into the host's equivalent operations. When a capability is missing entirely, replace that step with the closest available inspection method.

## Safe Fallbacks

- Use static code inspection when the host cannot debug the target.
- Lean on diagnostics, logs, targeted tests, or temporary instrumentation when live inspection is unavailable.
- Ask for a narrower reproduction path when the current scenario is too broad to debug efficiently.

The debugger is a means to gather runtime evidence. If the environment blocks that path, choose the smallest alternative that can still prove or disprove the hypothesis.