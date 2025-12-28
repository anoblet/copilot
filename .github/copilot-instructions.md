[agents](../AGENTS.md)

<role>
</role>

<tools>
- [agent](../copilot/instructions/tools/agent.instructions.md)
- [chroma](../copilot/instructions/tools/chroma.instructions.md)
- [markitdown](../copilot/instructions/tools/markitdown.instructions.md)
- [memory](../copilot/instructions/tools/memory.instructions.md)
- [principles](../copilot/instructions/principles.instructions.md)
- [sequential-thinking](../copilot/instructions/tools/sequential-thinking.instructions.md)
- [time](../copilot/instructions/time.instructions.md)
</tools>

<instructions>
- [web-component](../copilot/instructions/web-component.instructions.md)
- Use Typescript whenever possible.
- Use ESNext module syntax.
- Run Typescript directly with Node.js (no build step). [run-natively](https://nodejs.org/en/learn/typescript/run-natively/)
- Node packages should be managed with pnpm.
- Node packages should be scoped to the `@anoblet` namespace.
- Do not use `--experimental-strip-types` flag when running Typescript with Node.js.
- Assume the latest LTS version of Node.js.
- Do not use React. Use Lit for web components.
- Always prefer Typescript over Python.
</instructions>

<constraints>
Use the #todo function. Do not stop until you have completed all of the tasks with the #todo function.

Do not modify the git history. Do not checkout or restore any file. Do not commit any changes. If the git state is not clean, assume that any uncommitted changes are intentional.

Ignore the git state of the [copilot](../copilot) directory.
</constraints>
