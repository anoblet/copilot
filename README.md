# @anoblet/copilot

Copilot workspace for this repository. It contains instruction sets, chat agents, reusable prompts, and small Node/TypeScript utilities used by local workflows.

## Scope

This directory is a dedicated tooling workspace. It supports development in the root `homeassistant/` repository and is not a standalone Home Assistant configuration.

## Repository Layout

- `.github/agents/`: custom chat agents
- `.github/instructions/`: instruction hierarchy consumed by Copilot
- `.github/hooks/`: hook metadata
- `.github/skills/`: repository skills
- `packages/`: workspace utilities (`cli`, `link`, `mcp`, `session`)
- `prompts/`: reusable prompt templates
- `awesome-copilot/`: upstream resources
- `specification.md`: workspace-level specification

## Packages

| Package                 | Path               | Purpose                                                  |
| ----------------------- | ------------------ | -------------------------------------------------------- |
| `@anoblet/copilot-cli`  | `packages/cli`     | Runs the `copilot` command repeatedly from a prompt file |
| `@anoblet/copilot-link` | `packages/link`    | Applies link.json mappings as symlinks or hard copies    |
| `@copilot/mcp`          | `packages/mcp`     | Local MCP server and terminal client                     |
| session utility         | `packages/session` | Purges old session directories                           |

## Requirements

- `pnpm`
- Node.js `>= 24` for workspace packages that define engine constraints

## Common Commands

Run from `copilot/`:

```bash
pnpm install
pnpm copilot:link:enable
pnpm copilot:link:disable
pnpm copilot:link:toggle
```

Run from repository root (`/homeassistant`):

```bash
pnpm link /homeassistant/link.json --enable
```

## Link Mapping Notes

The canonical mapping for this repository is `/homeassistant/link.json`. Current mappings target `.github/agents` and `.github/copilot-instructions.md`, matching the structure under `copilot/.github/`.

## Session Artifacts

Session outputs are stored under `.copilot/sessions/<session_id>/` at repository root, for example:

- `prompt.md`
- `research.md`
- `questions.md`
- `plan.md`
- `implement.md`
- `summary.md`

Use `packages/session` when you need to purge older session directories.

## Documentation

- `copilot/specification.md`
- `copilot/packages/cli/README.md`
- `copilot/packages/link/README.md`
- `copilot/packages/session/README.md`
- `copilot/packages/mcp/README.md`
