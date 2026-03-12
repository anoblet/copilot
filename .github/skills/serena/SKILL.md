---
name: serena
description: Use Serena for semantic code search, symbol-aware navigation, reference tracing, and targeted refactoring in larger codebases when plain text search or whole-file reads would be noisy, slow, or error-prone.
compatibility: Requires a host with Serena semantic coding tools, whether exposed directly or through an integration layer such as MCP.
---

# Serena

Use this skill when the task is about understanding or changing code with semantic, symbol-aware tools instead of relying only on plain text search and whole-file reads.

## Good Fit

- Finding the definition of a class, function, method, type, or constant.
- Tracing callers, implementations, subclasses, or other references before editing.
- Making precise refactors in a large codebase without reading unrelated files.
- Updating a small part of a large symbol after narrowing the exact region that matters.

## Weak Fit

- Binary files, images, or prose-only documents.
- Generated, vendored, or minified sources where semantic indexing may be poor.
- Tiny text-only edits where symbol awareness adds no value.

## Default Workflow

1. Activate the project in Serena if the host requires project selection or onboarding.
2. Start with the narrowest lookup available: symbol overview, symbol search, or a scoped pattern search.
3. Read only the symbols or file regions needed to answer the task.
4. Before changing public behavior, inspect references, implementations, and nearby tests.
5. Pick the smallest edit mechanism that fits the change.
6. Re-check references, diagnostics, or tests after editing.

## Guardrails

- Prefer semantic lookup before full-file reads.
- Do not assume exact tool names; hosts expose Serena capabilities differently.
- Use symbol-level edits for whole definitions and targeted content edits for a few lines inside a larger symbol.
- Treat shell, write, and network actions as separate privileges and follow the host agent's safety model.
- Re-verify cached memory or prior context before treating it as current truth.

## Examples

- A user asks where a service method is implemented and who calls it. Start with symbol lookup, then inspect references instead of reading every related file.
- A bug appears inside a large method. Read only that symbol and its callers, then make a narrow edit rather than replacing the whole file.
- A rename must preserve behavior across the codebase. Use semantic rename or reference-aware refactoring instead of broad text replacement.

See [the workflow reference](references/workflow.md) for task patterns, common pitfalls, and a practical decision guide.