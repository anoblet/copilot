# Serena Workflow Reference

## Minimal Loop

1. Activate or select the project if Serena requires it.
2. Narrow the target with symbol overview, name search, or scoped pattern search.
3. Read only the relevant symbol bodies or file regions.
4. Inspect references or implementations before changing exported or shared behavior.
5. Apply the smallest edit that fits the task.
6. Validate with diagnostics, tests, or another reference check.

## Match The Task To The Approach

- Find a definition: start with symbol search or overview before opening files.
- Understand a code path: begin at the entry symbol, then follow callers, callees, implementations, or subclasses.
- Change a few lines in a large function: do a narrow read, then use targeted content replacement.
- Replace an entire function, method, or class body: use symbol-level editing instead of repeated line edits.
- Rename something safely: use semantic rename or reference-aware refactoring and inspect the affected call sites.
- Investigate an unfamiliar area: combine scoped pattern search with symbol overview, then read only the symbols that answer the question.

## Practical Heuristics

- If you know the symbol name, start semantically.
- If you only know a string or behavior, use pattern search to find candidates, then switch back to semantic tools.
- If a file is large, resist reading it top to bottom until you have narrowed the relevant symbols.
- If a change affects an interface, protocol, or exported type, inspect dependents before editing.

## Common Pitfalls

- Reading entire files or directories too early.
- Editing a shared symbol without checking callers or implementers.
- Using broad text replacement when the host can perform symbol-aware edits.
- Trusting stale memory or old index state without re-checking the current code.
- Expecting strong semantic coverage in generated, vendored, or minified sources.

## Host Notes

- Some hosts expose Serena through MCP and some bundle it directly.
- Tool names differ across hosts; follow the host's actual tool surface instead of assuming fixed commands.
- If the host offers modes or contexts, prefer the setup that keeps semantic code tools available without unnecessary duplication.