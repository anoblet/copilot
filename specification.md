# @anoblet/copilot

## Overview

This is the workspace root for the Copilot-related tools and agents used in the project. It houses the CLI wrapper, linking utilities, and MCP server integration.

## Status

Active

## Components

### @anoblet/copilot-cli

Located in `packages/cli`.

- [x] Wrapper around `copilot-cli`
- [x] Support for running multiple iterations
- [x] Input via prompt file path
- [x] Configuration of agent and model via CLI or env vars
- [x] Passes default arguments (`--add-dir .`, `--allow-all-tools`)

### link

Located in `packages/link`.

- [x] Utility to create relative symlinks from JSON config
- [x] Toggle between symlinks and hard copies
- [x] Support for nested directory structures
- [x] Overwrite capability for existing links
- [x] Force hard copy creation option

### @copilot/mcp

Located in `packages/mcp`.

- [x] MCP server and terminal client
- [x] Exposes `user_input` tool for agent interaction
- [x] Support for both stdio and HTTP server modes
- [x] Terminal client for handling user input
- [x] Configurable timeouts for input requests

## Architecture

This directory operates as a nested workspace (or separate project structure) containing tools that assist the development and operation of the main resume project.

## Dependencies

- See individual packages for specific dependencies.
