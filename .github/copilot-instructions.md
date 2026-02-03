#file:../AGENTS.md

<role>
</role>

<tools>
- #file:../copilot/instructions/tools/agent.instructions.md
- #file:../copilot/instructions/tools/markitdown.instructions.md
- #file:../copilot/instructions/tools/memory.instructions.md
- #file:../copilot/instructions/principles.instructions.md
- #file:../copilot/instructions/time.instructions.md
</tools>

<instructions>
- #file:../copilot/instructions/css.instructions.md
- #file:../copilot/instructions/copilot.instructions.md
- #file:../copilot/instructions/git.instructions.md
- #file:../copilot/instructions/node.instructions.md
- #file:../copilot/instructions/typescript.instructions.md
- #file:../copilot/instructions/web-component.instructions.md
</instructions>

<constraints>
Use the #todo function when available. If unavailable, track tasks in `.copilot/sessions/${sessionId}/tasks.md` and continue.

Do not modify the git history. Do not checkout or restore any file. Do not commit any changes. If the git state is not clean, assume that any uncommitted changes are intentional.

Ignore the git state of the #file:../copilot/ directory.

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
