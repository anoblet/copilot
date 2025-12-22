import type { Request, Response } from "express";
import express from "express";

import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

import { HUMAN_ROUTES } from "../shared/humanProtocol.ts";
import {
  DEFAULT_PORT,
  DEFAULT_TIMEOUT_MS,
  createMcpServer,
  log,
  parsePort,
  parsePositiveInt,
} from "./shared.ts";
import { UserInputBroker } from "./userInputBroker.ts";

/**
 * Starts the MCP server (Streamable HTTP) plus the terminal bridging endpoints.
 */
export async function main(): Promise<void> {
  const port =
    parsePort(process.env.MCP_PORT ?? process.env.PORT) ?? DEFAULT_PORT;
  const timeoutMs =
    parsePositiveInt(process.env.MCP_USER_INPUT_TIMEOUT_MS) ??
    DEFAULT_TIMEOUT_MS;

  const broker = new UserInputBroker();

  const mcpServer = createMcpServer({ broker, timeoutMs });

  const app = express();

  // Only parse JSON for the MCP and response endpoints.
  app.use(express.json({ type: ["application/json", "application/*+json"] }));

  // MCP endpoint (Streamable HTTP).
  app.all("/mcp", async (req: Request, res: Response) => {
    try {
      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
        enableJsonResponse: true,
      });

      res.on("close", () => {
        void transport.close();
      });

      await mcpServer.connect(transport);
      await transport.handleRequest(req, res, (req as any).body);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error: message });
    }
  });

  // Terminal client: SSE stream.
  app.get(HUMAN_ROUTES.stream, (_req: Request, res: Response) => {
    // SSE headers.
    res.status(200);
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    // Initial comment for some proxies.
    res.write(`: connected\n\n`);

    broker.addSseClient(res);
  });

  // Terminal client: submit an answer.
  app.post(HUMAN_ROUTES.respond, (req: Request, res: Response) => {
    const result = broker.resolveFromHttpBody((req as any).body);
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
    log(`@copilot/mcp server listening on http://localhost:${port}`);
    log(`MCP endpoint: http://localhost:${port}/mcp`);
    log(`Terminal stream: http://localhost:${port}${HUMAN_ROUTES.stream}`);
  });
}

// Run when invoked directly.
if (import.meta.url === `file://${process.argv[1]}`) {
  void main();
}
