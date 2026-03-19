---
name: home-assistant
description: Use official Home Assistant concepts and documentation to work on configuration, automations, templates, integrations, frontend, dashboards, and debugging without assuming repository-specific wrappers or layouts.
---

# Home Assistant

Use this skill when the task is clearly about Home Assistant behavior, configuration, development, or debugging and the agent should stay grounded in official Home Assistant concepts instead of repository-local conventions.

## Good Fit

- Editing configuration, packages, automations, scripts, scenes, helpers, or templates.
- Debugging entity state, template rendering, failed actions, automation traces, or runtime logs.
- Working on custom integrations, core backend code, frontend UI, dashboards, or custom cards.
- Deciding whether a change needs a reload, restart, trace inspection, template testing, or targeted code validation.

## Weak Fit

- Generic language or framework work with no Home Assistant concepts.
- Tasks that depend on repository-specific wrappers, deployment flows, or local naming conventions better handled by local instructions.
- Changes where no Home Assistant entry point, runtime behavior, or documentation path can be identified.

## Default Workflow

1. Triage the workspace or task type first: configuration repo, integration or backend code, frontend or dashboard code, or a mixed workspace.
2. Read local instructions before assuming commands, file layout, validation steps, or restart behavior.
3. Find the narrowest Home Assistant entry point for the change: configuration loading, automation or script logic, template usage, integration behavior, or frontend component structure.
4. Make the smallest change that preserves existing entity ids, service contracts, and user-facing behavior unless the task requires otherwise.
5. Validate with the narrowest official loop the environment supports: config check, reload or restart, action testing, template testing, traces, logs, or targeted tests.
6. Remove temporary troubleshooting instrumentation once the issue is confirmed or fixed.

## Guardrails

- Prefer official Home Assistant documentation and platform concepts over repository-local conventions.
- Do not assume one installation type, package manager, supervisor wrapper, or repository layout.
- Keep commands and paths portable; mention repository-specific workflows only when local instructions explicitly require them.
- Treat runtime validation as part of the change, especially for automations, templates, and integrations.
- Keep YAML-oriented guidance separate from backend and frontend development paths so the validation loop stays relevant.

## Examples

- A motion-light automation misfires. Inspect the trigger, conditions, and actions, test the related template, run the smallest supported validation, and check the trace before broad refactors.
- A Home Assistant task mentions a failing custom integration or dashboard component. Triage whether it is backend or frontend work first, then follow the matching development path and validation loop.

See [configuration and automations](references/configuration-and-automations.md) for YAML structure, packages, scripts, and runtime validation.
See [templates and debugging](references/templates-and-debugging.md) for Jinja patterns, Developer Tools workflows, traces, logs, and temporary instrumentation.
See [development paths](references/development-paths.md) for backend, integration, frontend, dashboard, and custom-card triage.
