---
name: resume
description: Use when working on the Resume workspace, including resume and cover-letter generation, applications/jobs/providers/logs behavior, client-server-cli changes, data-directory workflows, or repository-specific Copilot customizations.
---

# Resume

Use this skill when a task depends on repository-specific structure, workflows, or conventions in this workspace.

## Good Fit

- Resume and cover-letter generation flows backed by `data/documents/`, `data/jobs/`, and `data/applications/`.
- Jobs, applications, providers, and logs behavior across the client and server.
- Changes spanning `packages/client`, `packages/server`, `packages/cli`, `packages/shared`, or provider packages.
- Repository-specific Copilot agents, prompts, skills, sessions, and discovery wiring.

## Weak Fit

- General programming questions that do not depend on this repository.
- Third-party library or framework questions that should use Context7.

## Default Workflow

1. Read the active session artifacts in `.copilot/sessions/` and the relevant `AGENTS.md` instructions first.
2. Identify the owning package or data area before editing: client UI, server API, CLI generation flow, provider integration, shared models, or Copilot customization.
3. Prefer the repository's active customization surfaces: `.github/agents/` for custom agents and `copilot/.github/skills/` for skills.
4. Keep changes source-backed, minimal, and aligned with the existing monorepo structure.
5. Validate with the smallest relevant checks, usually targeted tests or diagnostics.

## Guardrails

- Do not modify `data/` contents unless the task explicitly requires it.
- Do not enable `.agents/skills/` or other dormant discovery roots just to place a new skill.
- Do not expose unrelated `gws-*` skills through workspace wiring.
- Treat `README.md`, `CHANGELOG.md`, `TASKS.md`, and `.copilot/sessions/` as the primary repo context for ongoing work.

## Examples

- Add a repository skill or agent that is immediately discoverable in this workspace.
- Trace a bug across the applications, jobs, providers, or logs flows.
- Update a CLI or data-model behavior that affects generated resumes or cover letters.