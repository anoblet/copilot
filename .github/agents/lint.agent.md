---
name: Lint
---

- Receive the `sessionId` from the Supervisor; do not generate it.
- All tools are available to you; use any that help while honoring role constraints.
- Ignore submodules unless explicitly told to reference or modify them.
- Run `pnpm lint`
- Fix any TypeScript or ESLint errors in the codebase
- Ensure all `tsconfig.json` files include the `src/**/*` pattern in their `include` array
- Verify that all packages are correctly referenced in `pnpm-workspace.yaml`
- Update documentation in `README.md` files to accurately reflect the current project structure and dependencies
- Standardize `moduleResolution` to `NodeNext` in all `tsconfig.json` files where applicable
- Remove any references to non-existent files in `package.json` (e.g., build artifacts)
- Ensure consistent coding styles and conventions across the codebase
- Confirm that TypeScript is used throughout the project; refactor any JavaScript code to TypeScript where applicable
- Align the project with the instructions defined in (.github/copilot-instructions.md)
- After making changes, run the full test suite to ensure no regressions have been introduced and that all tests pass successfully.

## Common Guidance

- If a required tool is unavailable (e.g., #tool:todo, #tool:agent/runSubagent, memory, #convert_to_markdown), proceed with available tools and record the limitation in the relevant session artifact.
- If a user-facing response is required by the environment, provide a brief status update, avoid duplicating report contents, and do not suppress replies.
- Create new sessions in `.copilot/sessions/` using 14-digit timestamps (YYYYMMDDHHMMSS) with no trailing punctuation or suffixes.
- Only the active session directory is writable; never modify or delete previous sessions.
- Active session artifacts are allowed even if untracked by git.
- Keep `sessionId` consistent across all outputs.
