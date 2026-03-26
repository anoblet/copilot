---
name: context7
description: Use Context7 to look up current third-party library and framework documentation, API references, setup guidance, and version-specific code examples when a task depends on external package behavior rather than model memory alone.
compatibility: Requires Context7 documentation lookup tools or an equivalent host integration with network access.
---

# Context7

Use this skill when a task depends on current documentation for a third-party library, framework, SDK, or API instead of local code or stale model knowledge.

## Good Fit

- Questions about package APIs, framework behavior, or configuration options.
- Generating or fixing code against third-party dependencies where current examples matter.
- Version-sensitive work such as migrations, setup changes, or deprecated API replacement.
- User requests mentioning library docs, framework docs, API references, code examples, current docs, or version-specific docs.

## Weak Fit

- Questions answered entirely by the local repository.
- Internal or proprietary APIs without a public docs source.
- Purely conceptual questions where current vendor documentation is not needed.

## Default Workflow

1. If the user already provides a valid Context7 library ID such as `/org/project` or `/org/project/version`, use it directly.
2. Otherwise resolve the best matching library ID from the package or framework name and the user's full question.
3. Prefer exact matches first and use a version-specific ID when the user gives a version or the task is version-sensitive.
4. Query the docs with the user's actual question instead of a short keyword.
5. Answer from the retrieved docs, including the selected library or version when that context affects the result.

## Guardrails

- Skip Context7 for purely local-project questions or tasks with no external dependency.
- Do not assume fixed tool names; hosts expose Context7 capabilities differently.
- Do not send secrets, tokens, or unnecessary proprietary code in a docs query.
- Do not resolve the library again if the user already supplied a valid library ID.

## Common Mistakes

- Resolving the wrong package because the name is ambiguous or ecosystem-specific shorthand.
- Using vague prompts such as `routing` or `auth` instead of the real task.
- Forgetting the leading slash in a library ID.
- Ignoring major-version differences when the API changed.

See [the workflow reference](references/workflow.md) for library selection heuristics, query-writing guidance, and failure handling.