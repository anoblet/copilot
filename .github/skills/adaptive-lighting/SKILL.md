---
name: adaptive-lighting
description: Use this skill when working with the Home Assistant Adaptive Lighting integration, including YAML or UI configuration, switch entities, service calls, manual control behavior, option tuning, and troubleshooting.
---

# Adaptive Lighting

Use this skill when the task is about configuring, automating, or troubleshooting Home Assistant Adaptive Lighting and the answer needs integration-specific behavior instead of generic lighting advice.

## Good Fit

- Creating or tuning Adaptive Lighting YAML or UI options for one or more light groups.
- Explaining how the main switch, sleep mode, brightness adaptation, and color adaptation work together.
- Applying settings after scenes or overrides, or handling manual-control takeovers.
- Troubleshooting turn-on interception, transitions, color temperature, brightness, or non-Home-Assistant change detection.

## Weak Fit

- Generic Home Assistant lighting tasks with no Adaptive Lighting switch, service, or option involved.
- Hardware pairing, coordinator setup, or mesh troubleshooting unrelated to Adaptive Lighting behavior.
- Pure dashboard styling work with no configuration or runtime behavior question.

## Default Workflow

1. Identify the Adaptive Lighting switch entity and the light group it controls before changing options or automations.
2. Confirm whether the integration is configured from YAML, the UI, or both; the option names stay aligned across both surfaces.
3. Decide whether the issue is about initial turn-on interception, periodic adaptation, sleep mode, or manual-control takeover.
4. Tune the smallest option family that fits: timing, brightness, color, sleep, sun overrides, takeover, or performance.
5. Use services for runtime control when the change is temporary or context-specific instead of rewriting the full configuration.
6. Validate on real lights with turn-on, manual override, and scene or automation paths because many symptoms are device-specific.

## Guardrails

- Treat each Adaptive Lighting configuration as a switch-driven controller for a light group, not just a bag of YAML options.
- Keep guidance grouped by behavior instead of copying exhaustive default lists.
- Prefer durable concepts over version-sensitive defaults when explaining settings.
- Expect device quirks around transitions, grouped bulbs, and manual-control detection.
- Separate Adaptive Lighting behavior from unrelated radio or vendor-app troubleshooting unless the symptom clearly crosses layers.

## Examples

- A scene leaves lights at the wrong color. Call `adaptive_lighting.apply` after the scene or tune intercept and transition behavior.
- A user wants brighter mornings and warmer nights. Adjust brightness bounds, color-temperature bounds, and sunrise, sunset, or sleep settings.
- A lamp should stay fixed during movie time. Mark it manual with `adaptive_lighting.set_manual_control` and clear it later.

See [configuration and troubleshooting](references/configuration-and-troubleshooting.md) for setup surfaces, major option families, service calls, and high-value caveats.