# Configuration and Automations

Use this reference for YAML-first Home Assistant work.

## Find the Right Entry Point

- Start from how configuration is loaded instead of guessing file names.
- Common patterns include a root configuration file that uses `!include`, `!include_dir_named`, `!include_dir_merge_named`, `!include_dir_list`, or `!include_dir_merge_list`.
- Packages are declared under `homeassistant: packages:` and let one feature area merge multiple domains.
- YAML merge behavior matters: names and keys that must be unique still need to remain unique after includes or packages are combined.

## Automation Model

- Treat automations as `triggers`, optional `conditions`, and `actions`.
- Make the smallest change at the correct layer: trigger semantics, condition guards, or action sequence.
- Use readable branching with `choose` or `if` when behavior diverges.
- Use `repeat`, `wait`, `parallel`, and `continue_on_error` only when the task truly needs those execution semantics.
- When concurrency matters, check the run mode instead of assuming the default behavior is correct.

## Validation Loop

1. Run the narrowest supported configuration validation before restart-level changes.
2. If the environment exposes the Home Assistant core CLI, `hass --script check_config` is the standard full-configuration check.
3. Reload YAML where Home Assistant supports a reload instead of restarting the entire system.
4. Use Developer Tools Actions to test services and scripts in isolation.
5. Use automation traces to confirm which trigger, condition, or action path actually ran.
6. Restart only when the changed integration or configuration area cannot be reloaded safely.

## Common Failure Patterns

- Includes that load a different structure than the parent key expects.
- Duplicate keys or identifiers introduced by packages or merged directories.
- Triggers that never fire because the event, entity, or state transition is too narrow.
- Conditions that block execution because a template, time window, or state check never matches.
- Actions that call the wrong service or assume an entity attribute exists when it does not.
