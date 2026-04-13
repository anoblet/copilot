# Home Assistant

## Instructions

- After each meaningful change to the configuration, run `pnpm reload`, then check runtime logs via `pnpm home-assistant raw request GET /api/hassio/core/logs --text` (Supervisor) to confirm there are no warnings or errors related to the changes.
- If `/api/hassio/core/logs` is unavailable or returns an upstream error, fall back to `pnpm home-assistant error-log` and continue the runtime validation there.
- When changing helper `initial` values, do not assume `pnpm reload` will update existing live helper states. Verify the runtime state explicitly, and use a service call or one-time migration if existing installs must adopt the new values immediately.
- For runtime-only settings that cannot be templated in static package config, use a helper-backed script or automation and trigger it on `automation_reloaded` in addition to startup so `pnpm reload` reapplies the live settings without a full restart.
- `pnpm home-assistant` requires Node.js `>= 22.6.0` (see `bin/cli/README.md`).
- Do not use `mode: single` in automations since it is the default
- Do not use empty conditions
- Do not add erronenous keys where the value is the same as the default value
- Comments should be at the beginning of a code block, and not at the end.
- All package names, ids, unique_ids, entity_ids, etc. should use snake_case.
- For area automations that share a trigger across multiple concerns, prefer nested trigger directories with one automation per concern, for example `tv/on/lights.yaml` and `tv/on/blinds.yaml`, instead of a single mixed `on.yaml` or `off.yaml` package.
- For room-specific configuration surfaces in the Rooms dashboard, use `includes/lovelace/views/<area>/configuration.yaml` with `subview: true`, include that view from `includes/lovelace/dashboards/dashboard_room.yaml`, and navigate to it from the room controls with `navigation_path: /dashboard-room/<area>-configuration`.
- Use the `notify.mobile_app_pixel_6_pro` service for all mobile notifications.

Use the `flex-card` and `grid-card` to create a responsive layout.

Avoid using `grep` in the root directory. Instead, use it within specific subdirectories to limit the scope of the search and improve performance.

Use the `pnpm home-assistant` command to run Home Assistant CLI commands. The documentation is located in the `bin/cli` directory.

## Commands

- Use `ha core logs` to view Home Assistant core logs.
- Use `ha core restart` to restart Home Assistant core.
