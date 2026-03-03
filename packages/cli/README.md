# @anoblet/copilot-cli

Wrapper around the `copilot` command that repeats the same prompt for multiple iterations.

## Features

- Runs `copilot` for a configurable number of iterations
- Reads prompt text from a file
- Supports agent/model overrides via flags or environment variables
- Always passes `--add-dir .` and `--allow-all-tools`

## Usage

```bash
copilot-cli -p /absolute/path/to/prompt.md
copilot-cli -p /absolute/path/to/prompt.md -i 5
copilot-cli -p /absolute/path/to/prompt.md -a implement -m gpt-5.3-codex
```

## Options

- `-p, --prompt <string>`: Prompt file path (required)
- `-i, --iterations <number>`: Number of runs (default: `3`)
- `-a, --agent <string>`: Agent name (overrides `COPILOT_CLI_AGENT`)
- `-m, --model <string>`: Model name (overrides `COPILOT_CLI_MODEL`)

## Environment Variables

- `COPILOT_CLI_AGENT`
- `COPILOT_CLI_MODEL`

## Behavior Notes

- The executable is `copilot-cli` (`bin` entry), while help output currently uses program name `copilot-wrapper`.
- Prompt file content is passed to `copilot` as `-p <prompt-content>` on each iteration.
- Iterations must be a positive integer.
- Execution stops on first failing iteration.
