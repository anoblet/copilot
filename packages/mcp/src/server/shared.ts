import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import {
  USER_INPUT_TOOL_NAME,
  userInputInputSchema,
  userInputOutputSchema,
} from "../shared/userInput.ts";
import { UserInputBroker } from "./userInputBroker.ts";

/**
 * Default server port for the HTTP listener.
 */
export const DEFAULT_PORT = 4300;

/**
 * Default timeout (ms) if a tool call does not provide one.
 */
export const DEFAULT_TIMEOUT_MS = 10 * 60 * 1000;

export function createMcpServer(options: {
  broker: UserInputBroker;
  timeoutMs: number;
}): McpServer {
  const mcpServer = new McpServer({
    name: "@copilot/mcp",
    version: "0.0.0",
  });

  mcpServer.registerTool(
    USER_INPUT_TOOL_NAME,
    {
      title: "User Input",
      description:
        "Ask a human for input via a separately-run terminal client and return the response.",
      inputSchema: userInputInputSchema,
      outputSchema: userInputOutputSchema,
    },
    async ({
      prompt,
      timeoutMs: requestTimeoutMs,
    }: {
      prompt: string;
      timeoutMs?: number;
    }) => {
      try {
        const effectiveTimeoutMs = requestTimeoutMs ?? options.timeoutMs;
        const { value } = await options.broker.requestUserInput({
          prompt,
          timeoutMs: effectiveTimeoutMs,
        });

        const output = { value };
        return {
          content: [{ type: "text", text: value }],
          structuredContent: output,
        };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        return {
          content: [{ type: "text", text: `Error: ${message}` }],
          isError: true,
        };
      }
    }
  );

  return mcpServer;
}

/**
 * Parses and validates a TCP port number.
 */
export function parsePort(value: string | undefined): number | undefined {
  const n = parsePositiveInt(value);
  if (n === undefined) return undefined;
  if (n > 65535) return undefined;
  return n;
}

/**
 * Parses a strictly positive integer from an environment variable-like string.
 */
export function parsePositiveInt(
  value: string | undefined
): number | undefined {
  if (!value) return undefined;
  const n = Number(value);
  if (!Number.isInteger(n) || n <= 0) return undefined;
  return n;
}

/**
 * Parses a non-negative integer (0 or greater) from an environment variable-like string.
 */
export function parseNonNegativeInt(
  value: string | undefined
): number | undefined {
  if (value === undefined || value === "") return undefined;
  const n = Number(value);
  if (!Number.isInteger(n) || n < 0) return undefined;
  return n;
}

/**
 * Writes a log line to stderr.
 *
 * Stderr is used to avoid polluting any protocol streams.
 */
export function log(message: string): void {
  process.stderr.write(`${message}\n`);
}
