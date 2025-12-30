import { z } from 'zod';

/**
 * MCP tool name exposed by this package.
 */
export const USER_INPUT_TOOL_NAME = 'user_input' as const;

/**
 * Zod schema shape for the `user_input` tool input.
 */
export const userInputInputSchema = {
  /** Prompt to show to the human in the terminal client. */
  prompt: z.string().min(1),

  /**
   * Optional timeout (ms) before the server fails the tool call.
   *
   * Use `0` to disable the server-side timeout (wait indefinitely).
   *
   * This is best-effort and only affects the server-side wait.
   */
  timeoutMs: z.number().int().nonnegative().optional(),
};

/**
 * Zod schema shape for the `user_input` tool output.
 */
export const userInputOutputSchema = {
  /** The human's response typed into the terminal client. */
  value: z.string(),
};

/**
 * Input type for the `user_input` tool.
 */
export const UserInputInputSchema = z.object(userInputInputSchema);

/**
 * Input type for the `user_input` tool.
 */
export type UserInputInput = z.infer<typeof UserInputInputSchema>;

/**
 * Output type for the `user_input` tool.
 */
export const UserInputOutputSchema = z.object(userInputOutputSchema);

/**
 * Output type for the `user_input` tool.
 */
export type UserInputOutput = z.infer<typeof UserInputOutputSchema>;
