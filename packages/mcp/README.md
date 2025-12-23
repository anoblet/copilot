# @copilot/mcp

MCP server (stdio or HTTP) + terminal client that exposes a single MCP tool: `user_input`.

When an agent calls `user_input`, the server forwards the prompt to a separately-run terminal client (via SSE). The terminal client shows the prompt, reads the user's response, and POSTs the response back to the server.

## Quickstart

This starts the **HTTP** MCP server. If you're using VS Code auto-start via **stdio** (recommended), skip starting the server and only run the terminal client (see below).

Prereqs:

- Node.js >= 24
- `pnpm`

From the repository root:

```bash
cd copilot

# Start the MCP server (default: http://localhost:4300/mcp)
pnpm --filter @copilot/mcp start
```

In another terminal:

```bash
cd copilot

# Run the terminal client (connects to http://localhost:4300 by default)
pnpm --filter @copilot/mcp client
```

## VS Code MCP configuration

### Auto-start (recommended): stdio server

This repo is set up so VS Code can auto-start `@copilot/mcp` as a **stdio** MCP server.

In this repo, add a server entry like this to `.vscode/mcp.json` (already present in the root workspace config):

```json
{
  "servers": {
    "copilot-mcp": {
      "command": "node",
      "args": ["${workspaceFolder}/copilot/packages/mcp/src/server/stdio.ts"],
      "env": {
        "MCP_PORT": "4300",
        "MCP_USER_INPUT_TIMEOUT_MS": "0"
      }
    }
  }
}
```

If your VS Code workspace root is the `copilot/` repo itself (instead of the parent repo that contains `copilot/` as a subfolder), the `args` path should usually be:

```json
{
  "args": ["${workspaceFolder}/packages/mcp/src/server/stdio.ts"]
}
```

Notes:

- In stdio mode, VS Code connects to the MCP server over stdio (not HTTP).
- The terminal client is still run manually (see below). It connects to the HTTP endpoints (`/human/stream`, `/human/respond`, `/health`) on `MCP_PORT`.

Run the terminal client manually:

```bash
cd copilot
pnpm --filter @copilot/mcp client
```

### Connect-only (optional): HTTP MCP endpoint

Add this server entry to your VS Code MCP config (in this repo, `.vscode/mcp.json` or `copilot/.vscode/mcp.json` are typical places to add it):

```json
{
  "servers": {
    "copilot-mcp": {
      "type": "http",
      "url": "http://localhost:4300/mcp"
    }
  }
}
```

Note: this `type: "http"` entry tells VS Code how to connect; it does not start the server process for you. Run the server (`pnpm --filter @copilot/mcp start`) and terminal client (`pnpm --filter @copilot/mcp client`) as shown in the Quickstart.

## Configuration

### Server environment variables

- `MCP_PORT` / `PORT`: HTTP listen port (default: `4300`)
- `MCP_USER_INPUT_TIMEOUT_MS`: default timeout for `user_input` calls (default: `600000` / 10 minutes). Set to `0` for no server-side timeout.

### Timeouts

The effective timeout for `user_input` is chosen in this order (highest precedence first):

1. Tool call argument `timeoutMs`
2. Server environment variable `MCP_USER_INPUT_TIMEOUT_MS` (commonly set via VS Code `.vscode/mcp.json`)
3. Package default (10 minutes)

`timeoutMs: 0` disables the server-side timeout (wait indefinitely).

Note: This only controls the server-side wait for a human response; some clients may impose their own request/connection timeouts.

### Client configuration

- `--url <baseUrl>`: server base URL (default: `http://localhost:4300`)
- `MCP_SERVER_URL`: same as `--url`

Note: VS Code points at the MCP endpoint `http://localhost:4300/mcp`, while the terminal client uses the base URL `http://localhost:4300`.

## Endpoints / protocol

- MCP endpoint (Streamable HTTP): `GET|POST http://localhost:<port>/mcp`
- Terminal bridge stream (SSE): `GET http://localhost:<port>/human/stream`
  - SSE event name: `user_input`
- Terminal bridge response: `POST http://localhost:<port>/human/respond`
- Health check: `GET http://localhost:<port>/health`

## Troubleshooting

- If VS Code can't connect, confirm the server is running and the URL is `http://localhost:4300/mcp` (note the `/mcp`).
- If the terminal client connects but never shows prompts, make sure your agent/tooling is calling the MCP tool named `user_input`.
- If you changed the port, update both the server env var (`MCP_PORT`/`PORT`) and your VS Code `url`.
