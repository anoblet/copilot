# Development Paths

Use this reference when the task is Home Assistant related but not obviously just YAML.

## Start with Triage

- Decide which path best matches the workspace or bug before editing: configuration, backend or integration, frontend or dashboard, custom card, or a mixed workspace.
- Read local project instructions before assuming commands, containers, test runners, or build tools.
- Validate each layer independently whenever a task spans configuration, backend logic, and frontend rendering.

## Configuration Path

- Look for configuration loading, packages, automations, scripts, templates, and runtime validation points.
- Prefer reloads, traces, and template testing before broader restarts.

## Backend and Integration Path

- Inspect the manifest, config flow, supported platforms, services, and tests before changing behavior.
- Follow official Home Assistant architecture and integration guidance for setup, entity models, services, diagnostics, and repairs.
- Use the smallest relevant validation loop: targeted tests, integration reloads where supported, and logs for setup or runtime failures.
- Preserve stable entity ids, translation keys, service schemas, and config-entry behavior unless the task explicitly requires a breaking change.

## Frontend, Dashboard, and Custom-Card Path

- Identify whether the task belongs to the main frontend, a Lovelace dashboard, or a standalone custom card.
- Follow official frontend or custom-card guidance for component structure, data flow, styling, and development setup instead of inventing a new pattern.
- Validate with the narrowest UI loop the project supports: targeted tests, local development mode, and in-UI verification of states, actions, and responsive behavior.
- Keep accessibility, localization, and state-driven rendering in scope because Home Assistant UI work is heavily runtime-dependent.

## Mixed Workspace Path

- Separate configuration concerns from code concerns and validate each layer independently.
- Confirm whether the bug is caused by configuration, runtime state, backend logic, or frontend rendering before editing multiple layers.
- Keep repository-specific wrappers or deployment workflows out of shared guidance unless local instructions explicitly require them.
