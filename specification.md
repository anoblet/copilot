# @anoblet/copilot

## Overview

Workspace-level tooling for Copilot customization in this repository.

## Status

Active

## Components

### @anoblet/copilot-cli (`packages/cli`)

- Wrapper around the `copilot` CLI
- Re-runs the same prompt for N iterations (default `3`)
- Supports `--agent` and `--model` via flags or environment variables
- Always passes `--add-dir .` and `--allow-all-tools`

### @anoblet/copilot-link (`packages/link`)

- Applies JSON link mappings into the current working directory
- Supports `--enable`, `--disable`, and `--toggle` modes
- Handles nested mapping structures (arrays and nested objects)
- Supports overwrite/refresh behavior with `--force`

### @copilot/mcp (`packages/mcp`)

- Local MCP server and terminal bridge client
- Supports stdio and HTTP server workflows

### session utility (`packages/session`)

- Purges session directories from `COPILOT_SESSION_DATA` or `.copilot/sessions`
- Purges oldest-first by modification time
- Supports confirmation bypass with `-y` or `--yes`

## Architecture

`copilot/` is a dedicated tooling workspace that supports the parent repository. It contains:

- instruction hierarchy under `.github/instructions/`
- custom agents under `.github/agents/`
- reusable prompts under `prompts/`
- package-level utilities under `packages/`

## Dependencies

- Use `pnpm` workspace management
- Node.js `>= 24` for packages that define runtime engines
