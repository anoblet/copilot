# Context7 Workflow Reference

## Minimal Loop

1. Decide whether the task actually depends on third-party documentation.
2. Reuse a supplied Context7 library ID when the user already provides one.
3. Otherwise resolve the best library match before querying docs.
4. Query the docs with the user's full question, including the concrete API, behavior, error, or goal.
5. Answer from the fetched docs and call out the selected library or version when it matters.

## Picking The Library ID

- Start with the exact package or framework name the user gave.
- Prefer exact matches over similarly named community packages.
- Use the user's full request to break ties when multiple libraries share similar names.
- Prefer version-specific IDs when the user names a version, a major upgrade, or a version-sensitive API surface.
- If several candidates remain genuinely ambiguous, ask for clarification instead of guessing.

## Writing Better Queries

- Send the user's real question, not a one-word topic.
- Include the operation, expected behavior, and relevant version details.
- Include error messages when the task is about diagnosing library usage.
- Keep proprietary code or secrets out of the query unless they are essential and safe to share.

Better query examples:

- `How do I configure nested routes in React Router 7 with data loaders?`
- `What is the recommended way to create a server action in Next.js 15?`
- `How do I migrate from Pydantic v1 validators to v2 field validators?`

Weak query examples:

- `router`
- `next setup`
- `validation`

## Version Handling

- Treat version information as a first-class constraint when APIs differ across releases.
- Prefer a versioned library ID over an unversioned ID when both are available and the task is version-sensitive.
- If the user did not specify a version but the answer depends on one, state the assumption clearly or ask for the version.
- When migration guidance is requested, query for both the target behavior and the version transition if needed.

## Ambiguity And Failure Cases

- If resolution returns multiple plausible libraries, narrow the choice using the ecosystem, package manager name, or import path from the user's request.
- If no relevant docs are found, say so directly and fall back to the best available non-Context7 reasoning instead of inventing APIs.
- If the host exposes different Context7 tool names, follow the host's actual interface and keep the two-step resolve-then-query flow.
- If the task is really about the local codebase, stop using Context7 and inspect the repository instead.

## Response Guidance

- Summarize the current documented answer before giving code.
- Provide a concrete example when the docs support one.
- Mention the selected library and version when that changes the recommendation.
- Distinguish between documented behavior and any additional inference.

## Common Pitfalls

- Re-resolving a library ID that the user already supplied.
- Choosing a package by popularity when a more exact match is available.
- Asking overly broad questions that return generic documentation.
- Treating outdated model memory as equal to current documentation.