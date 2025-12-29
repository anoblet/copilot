- A wrapper around [copilot-cli](https://github.com/github/copilot-cli)

## Arguments

```
  -i, --iterations <number>    Number of iterations to run (default: 3)
  -p, --prompt <string>        Path to the prompt file
  -h, --help                   display help for command
```

## Usage

```bash
node packages/copilot/cli/src/index.ts -a .github/agents/supervisor.agent.md -i 5 -p copilot/prompts/align.prompt.md
```

This runs the copilot CLI with 5 iterations using the prompt located at `prompt.md`.

```bash
copilot --add-dir . --allow-all-tools --model gpt-5-mini -p [PROMPT]
```

## Environment Variables

Environment variables are relative to where the command is run.

- `COPILOT_CLI_AGENT`: Specify the agent to use (overrides `--agent` flag)
- `COPILOT_CLI_MODEL`: Specify the model to use (overrides `--model` flag)
