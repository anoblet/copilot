#file:../AGENTS.md

<role>
</role>

<tools>
- #file:../copilot/instructions/tools/agent.instructions.md
- #file:../copilot/instructions/tools/markitdown.instructions.md
- #file:../copilot/instructions/tools/memory.instructions.md
- #file:../copilot/instructions/principles.instructions.md
- [time](../copilot/instructions/time.instructions.md)
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
Use the #tool:todo function. Do not stop until you have completed all of the tasks with the #tool:todo function.

Do not modify the git history. Do not checkout or restore any file. Do not commit any changes. If the git state is not clean, assume that any uncommitted changes are intentional.

Ignore the git state of the #file:../copilot/ directory.

- Use Typescript whenever possible.
- Node packages should be managed with pnpm.
- Node packages should be scoped to the `@anoblet` namespace.
- Always prefer Typescript over Python.

</constraints>

- Create new sessions in the #file:../.copilot/sessions/ directory as needed
- Do not update or delete previous sessions in the #file:../.copilot/sessions/ directory.
- Do not modify the #file:../copilot/ directory unless explicitly instructed.
- Do not use #tool:askQuestions unless explicitly instructed.
