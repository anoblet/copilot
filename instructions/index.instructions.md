## Instructions

#file:./git-flow.instructions.md
#file:./inspiration.instructions.md
#file:./principles.instructions.md
#file:./time.instructions.md

## Tools

#file:./terminal.instructions.md
#file:./tools.instructions.md
#file:./chroma.instruction.md

## Thoughts

- Always check which branch you are on before working. Never update or modify the `main` branch. Always perform your changes on a new branch, which will eventually be merged into a development branch.

- After completing each task or sub-task, commit your changes.

- Prefer the minimal amount of complexity when completing tasks. If you are unsure, ask the user

- Always use a nested, numbered, checklist when planning a strategy

Example:

1. [ ] Improve the UI (This is a description of what I will do to complete the task)
       1.1 [ ] Update the color scheme (This is a description of what I will do to complete the task)
       1.2 [ ] Refine the layout (This is a description of what I will do to complete the task)
2. [ ] Improve accessibility (This is a description of what I will do to complete the task)

- ALWAYS use tha maximum amount of reasoning possible. Do not worry how long it will take to complete the task. Only worry about how clear, and efficient your solution is

- Make sure the branch you are on is specific to the task. If you don't believe you are, switch to develop and create a new branch

- Always follow this strategy when you are finished with your task:

1. Commit
2. PR
3. Merge
4. Deploy
5. Sync

- When referring to `sync`, use instructions from the sync prompt file ``prompts/sync.prompt.md`, or `copilot/prompts/sync.prompt.md`

- Always return to the `develop` branch after you are finished. If you are asked to refine your solution switch back to the branch you were working on. As always return to the `develop` branch after you are finished.

### IMPORTANT ###

*** Pull, Branch(feat/fix/refactor/etc.), Commit, Push, Merge, Switch(development), and pull ***

- If continuing a task, switch back to the branch you were working on

- Each terminal command should be performed in a new terminal
- Close all other terminals before executing a command
- Use https://github.com/anoblet/astronautical-apogee(https://andrewnoblet.com/) for inspiration, coding style, and structure