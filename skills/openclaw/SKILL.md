---
name: anoblet-openclaw
description: Create, inspect, or update OpenClaw scheduled tasks, validate announcement delivery, and preserve verified corrections through self-refinement. Use for OpenClaw cron/task CLI work; do not use for unrelated application scheduling.
---

# OpenClaw Tasks

Use the installed OpenClaw CLI's live help and returned JSON as the authority for command options and stored task shape.

## Before a Change

- Inspect the relevant subcommand help instead of assuming flags from another OpenClaw version.
- List existing jobs, including disabled jobs, and check for an existing name or declaration identity before creating a duplicate.
- Resolve a named Discord destination with `openclaw directory groups list --channel discord --query <name> --json`. Confirm that the result is a text channel, not a similarly named voice channel.
- Treat creating, editing, enabling, disabling, removing, or manually running a task as an external mutation. The user's direct request authorizes only the named action and destination.

## Discord Announcement Format

For a Discord channel with numeric ID `507204290796978204`, use:

```text
--announce --channel discord --to channel:507204290796978204
```

The stored delivery object should normalize to:

```json
{
  "mode": "announce",
  "channel": "discord",
  "to": "channel:507204290796978204"
}
```

`--channel` identifies the provider and must be `discord`. `--to` identifies the destination and must use `channel:<numeric-id>`. If the user supplies a bare Discord channel ID, prefix it with `channel:` exactly once. Do not pass `#general`, a bare numeric ID, or `channel:<id>` as the provider value.

## Scheduling

- For clock-time schedules, specify the IANA timezone explicitly. Use `--exact` when the requested time should not be staggered.
- Prefer `--command-argv` plus `--command-cwd` for deterministic local scripts; use an agent message only when the task requires agent reasoning or tools.
- Do not manually run a newly created announcing task unless the user asked for an immediate send or a live delivery test.

## Verification

After a mutation:

1. Read the task back with `openclaw cron get <id>` using only options supported by its current help.
2. Confirm the schedule, timezone, enabled state, payload, and delivery object.
3. In `openclaw cron list --all --json`, verify that `deliveryPreviews[<id>]` reports an explicit destination such as `announce -> discord:channel:507204290796978204`.
4. Convert `nextRunAtMs` to the requested timezone when reporting the next run.

Do not claim successful delivery merely because configuration validation passed. A configured future announcement and a completed delivered run are different states.

## Self-Refinement

This skill is the durable owner for corrections learned while performing OpenClaw task and cron work. Before the final response, refine it whenever a user correction, live CLI mismatch, failed validation, or verified runtime behavior changes its guidance.

For every correction:

1. Verify the behavior against the live CLI, stored task JSON, or another direct runtime result when possible. Keep version-specific behavior scoped to the observed version.
2. Update the smallest affected instruction in this skill. Do not broaden authorization or convert an unverified workaround into a general rule.
3. Append an entry to [references/corrections.md](references/corrections.md), even if the existing rule was already correct and only its evidence or scope was clarified.
4. Record the date, trigger, corrected rule, evidence, validation, and affected scope. Never record credentials, tokens, private message contents, or unrelated personal data.
5. Run the skill validator and inspect the diff. If validation cannot run, document why and perform the narrowest equivalent structural checks.

Routine successful runs without a correction do not require a skill edit or log entry.
