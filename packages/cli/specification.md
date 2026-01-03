# @anoblet/copilot-cli

## Overview

A wrapper around the GitHub Copilot CLI to facilitate running multiple iterations of a prompt, with support for configuring agents and models via CLI arguments or environment variables.

## Status

Stable (v1.0.0)

## Features

- [x] Wrapper around `copilot-cli`
- [x] Support for running multiple iterations
- [x] Input via prompt file path
- [x] Configuration of agent and model via CLI or env vars
- [x] Passes default arguments (`--add-dir .`, `--allow-all-tools`)

## Architecture

The tool uses `commander` for CLI argument parsing and `execa` to spawn the `copilot` process. It reads a prompt file and passes its content to the `copilot` CLI, repeating the process for the specified number of iterations.

## CLI Commands

### Usage

```bash
copilot-wrapper -p <path-to-prompt-file> [options]
```

### Options

- `-i, --iterations <number>`: Number of iterations to run (default: 3).
- `-p, --prompt <string>`: Path to the prompt file (required).
- `-a, --agent <string>`: Agent to use (overrides `COPILOT_CLI_AGENT`).
- `-m, --model <string>`: Model to use (overrides `COPILOT_CLI_MODEL`).

## Dependencies

- `commander`
- `execa`
