[agents](../agents.md)

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
- Use Typescript whenever possible.
- Use ESNext module syntax.
- Run Typescript directly with Node.js (no build step).
- Node packages should be managed with pnpm.
- Node packages should be scoped to the `@anoblet` namespace.
</instructions>

<constraints>
Use the #todo function. Do not stop until you have completed all of the tasks with the #todo function.

Do not modify the git history. Do not checkout or restore any file. Do not commit any changes. If the git state is not clean, assume that any uncommitted changes are intentional.

Ignore the git state of the [copilot] directory.
</constraints>
