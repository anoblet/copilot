import type { Request, Response } from "express";
import express from "express";

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { HUMAN_ROUTES } from "../shared/humanProtocol.ts";
import {
  DEFAULT_PORT,
  DEFAULT_TIMEOUT_MS,
  createMcpServer,
  log,
  parseNonNegativeInt,
  parsePort,
} from "./shared.ts";
import { UserInputBroker } from "./userInputBroker.ts";

/**
 * Starts the MCP server over stdio, plus the terminal bridging HTTP endpoints.
 *
 * Notes:
 * - This mode does NOT expose an HTTP `/mcp` endpoint.
 * - VS Code connects over stdio.
 * - The terminal client connects over HTTP to `/human/*`.
 */
export async function main(): Promise<void> {
  const port =
    parsePort(process.env.MCP_PORT ?? process.env.PORT) ?? DEFAULT_PORT;
  const timeoutMs =
    parseNonNegativeInt(process.env.MCP_USER_INPUT_TIMEOUT_MS) ??
    DEFAULT_TIMEOUT_MS;

  const broker = new UserInputBroker();
  const mcpServer = createMcpServer({ broker, timeoutMs });

  const transport = new StdioServerTransport();
  await mcpServer.connect(transport);

  const app = express();

  // Only parse JSON for the response endpoint.
  app.use(express.json({ type: ["application/json", "application/*+json"] }));

  // Terminal client: SSE stream.
  app.get(HUMAN_ROUTES.stream, (_req: Request, res: Response) => {
    res.status(200);
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.write(`: connected\n\n`);

    broker.addSseClient(res);
  });

  // Terminal client: submit an answer.
  app.post(HUMAN_ROUTES.respond, (req: Request, res: Response) => {
    const result = broker.resolveFromHttpBody(req.body as Record<string, unknown>);
    if (!result.ok) {
      res.status(result.status).json({ error: result.message });
      return;
    }

    res.status(200).json({ ok: true, requestId: result.requestId });
  });

  // Basic health check.
  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({ ok: true });
  });

  app.listen(port, () => {
    log(
      `@copilot/mcp (stdio) listening for terminal client on http://localhost:${port}`
    );
    log(`Terminal stream: http://localhost:${port}${HUMAN_ROUTES.stream}`);
  });
}

// Run when invoked directly.
if (import.meta.url === `file://${process.argv[1]}`) {
  void main();
}
