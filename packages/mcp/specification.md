# @copilot/mcp

## Overview

An implementation of the Model Context Protocol (MCP) server and a corresponding terminal client. It is designed to expose specific tools (like `user_input`) to AI agents and handle communication.

## Status

Alpha (v0.0.0)

## Features

- [x] MCP server and terminal client
- [x] Exposes `user_input` tool for agent interaction
- [x] Support for both stdio and HTTP server modes
- [x] Terminal client for handling user input
- [x] Configurable timeouts for input requests

## Architecture

- **Server**: Built with Express and `@modelcontextprotocol/sdk`. It defines tools and handles MCP protocol messages.
- **Client**: A terminal-based client that connects to the server (or runs it) to facilitate user interaction when the agent requests input.

## API / CLI

### Scripts

- `pnpm start`: Start the MCP server.
- `pnpm server`: Alias for start.
- `pnpm client`: Start the terminal client.

### Tools

- `user_input`: A tool exposed to agents to request text input from the user.

## Dependencies

- `@modelcontextprotocol/sdk`
- `express`
- `zod`
