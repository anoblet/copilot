[AGENTS.md](../AGENTS.md)

<role>
</role>

<tools>
- [agent.instructions.md](../copilot/.github/instructions/tools/agent.instructions.md)
</tools>

<instructions>
- [css.instructions.md](../copilot/.github/instructions/css.instructions.md)
- [copilot.instructions.md](../copilot/.github/instructions/copilot.instructions.md)
- [git.instructions.md](../copilot/.github/instructions/git.instructions.md)
- [node.instructions.md](../copilot/.github/instructions/node.instructions.md)
- [principles.instructions.md](../copilot/.github/instructions/principles.instructions.md)
- [time.instructions.md](../copilot/.github/instructions/time.instructions.md)
- [typescript.instructions.md](../copilot/.github/instructions/typescript.instructions.md)
- [web-component.instructions.md](../copilot/.github/instructions/web-component.instructions.md)
</instructions>

<constraints>
Use the #todo function when available. If unavailable, track tasks in `.copilot/sessions/${sessionId}/tasks.md` and continue.

Do not modify the git history. Do not checkout or restore any file. Do not commit any changes. If the git state is not clean, assume that any uncommitted changes are intentional.

Ignore the git state of the [copilot](../copilot) directory.

Only the Supervisor generates the `sessionId`; all other agents must receive it from the Supervisor and must not generate their own.
All agents have access to every tool.
The Supervisor should delegate work to subagents and do minimal direct work.
Ignore submodules unless explicitly told to reference or modify them.

- Use Typescript whenever possible.
- Node packages should be managed with pnpm.
- Node packages should be scoped to the `@anoblet` namespace.
- Always prefer Typescript over Python.
  </constraints>

- Do not use #askQuestions unless explicitly instructed.
