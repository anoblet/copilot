# Templates and Debugging

Use this reference for Jinja templates, runtime inspection, and short-lived troubleshooting instrumentation.

## Template Safety

- Quote single-line templates in YAML.
- Prefer helpers such as `states()`, `is_state()`, `state_attr()`, and `is_state_attr()` over direct state-object access when values may be missing.
- Guard `unknown`, `unavailable`, `none`, and other missing values before numeric conversions or string operations.
- Use reusable macros in `custom_templates/` when the same logic appears in multiple templates.
- Check whether the template runs in a limited-template context before using features that are not universally available.

## Debugging Loop

1. Reproduce the problem with the narrowest possible trigger, action, or UI path.
2. Test related expressions in Developer Tools Template.
3. Test services or scripts directly in Developer Tools Actions.
4. Inspect entity state, attributes, and recent events in States and Events.
5. Use automation or script traces to identify the exact branch or failed step.
6. Check logs for warnings, template errors, missing services, or reload failures.
7. Remove temporary logging once the issue is understood.

## Temporary Instrumentation

- `system_log.write` is useful for short-lived debugging when traces or normal logs are not enough.
- Keep messages structured and specific so they identify the automation, script, entity, or branch under inspection.
- If the workflow depends on `system_log_event`, remember that the `system_log` integration must enable `fire_event: true`.
- Do not leave debug logging, debug events, or placeholder notifications behind after the fix.

## Common Pitfalls

- Directly accessing `states.domain.object.state` or attributes that may not exist at startup.
- Treating strings as numbers without conversion or default handling.
- Assuming a template updates continuously when it actually reevaluates only on referenced entity changes.
- Debugging the wrong layer when the real problem is an unmet condition, a missing reload, or a stale entity state.
