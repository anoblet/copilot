# Configuration and Troubleshooting

Use this reference when a task needs more detail than the main skill.

## Core Workflow

- Each Adaptive Lighting configuration controls a set of lights through four switches: the main switch, sleep mode, adapt brightness, and adapt color.
- The integration can intercept `light.turn_on` so the current target is applied immediately, then keep updating on its regular interval.
- `only_once` limits adaptation to turn-on time. `adapt_only_on_bare_turn_on` narrows that further to bare `light.turn_on` calls without explicit brightness or color data.
- Scene activations, vendor apps, remotes, and physical changes often show up as manual-control or interception problems rather than simple configuration mistakes.

## Configuration Surface

- YAML and UI configuration use the same option names.
- Even UI-driven setups still need a top-level `adaptive_lighting:` YAML entry so the integration can load.
- Use separate switches when different rooms or light groups need different curves, transitions, or takeover rules.
- Choose groups that should adapt together as one unit instead of trying to synchronize many independent bulbs by coincidence.

## Major Option Families

- Light selection: `lights`.
- Timing and startup behavior: `interval`, `transition`, `initial_transition`, `sleep_transition`, `adapt_delay`.
- Brightness behavior: `min_brightness`, `max_brightness`, `brightness_mode`, `brightness_mode_time_dark`, `brightness_mode_time_light`.
- Color behavior: `min_color_temp`, `max_color_temp`, `prefer_rgb_color`.
- Sleep behavior: `sleep_brightness`, `sleep_color_temp`, `sleep_rgb_or_color_temp`, `sleep_rgb_color`, `adapt_until_sleep`.
- Sun overrides: `sunrise_time`, `sunrise_offset`, `sunset_time`, `sunset_offset`, plus min and max sunrise or sunset clamps.
- Takeover and manual control: `take_over_control`, `detect_non_ha_changes`, `autoreset_control_seconds`, `only_once`, `adapt_only_on_bare_turn_on`.
- Intercept and performance: `intercept`, `multi_light_intercept`, `separate_turn_on_commands`, `send_split_delay`, `skip_redundant_commands`, `turn_on_lights`, `include_config_in_attributes`.

## Service Calls

The custom services target the Adaptive Lighting switch entity, not the light entity.

```yaml
service: adaptive_lighting.apply
data:
  entity_id: switch.adaptive_lighting_living_room
  lights:
    - light.floor_lamp
  transition: 5
```

- `adaptive_lighting.apply`: force the current adaptive settings onto all or selected lights, often after scenes, scripts, or temporary overrides.
- `adaptive_lighting.set_manual_control`: mark selected lights as manual or clear that flag so adaptation pauses or resumes.
- `adaptive_lighting.change_switch_settings`: change switch settings at runtime or reset them with `use_defaults` such as `current`, `factory`, or `configuration`.

## High-Value Caveats

- `detect_non_ha_changes` can make some lights appear to turn on unexpectedly. Disable it if a device falsely reports an `on` state.
- Lights that must stay synchronized should be grouped together at the device or network layer when possible instead of controlled as many separate bulbs.
- If those bulbs are also controlled individually, `manual_control` cannot behave correctly. Use a Home Assistant light group when individual control must coexist with grouped behavior.
- Some bulbs cannot handle simultaneous brightness and color changes. Try `separate_turn_on_commands` in those cases.
- Some firmware reacts badly to long transitions. If lights become unresponsive or turn back on during a long fade, shorten the transition or use `transition: 0`.
- `adapt_delay` helps when another automation, scene, or integration should set an initial state before Adaptive Lighting takes over.
- When debugging, split the problem into first-turn-on behavior and ongoing adaptation. `intercept`, `only_once`, and `adapt_only_on_bare_turn_on` affect the first category; `interval`, `skip_redundant_commands`, and manual-control settings affect the second.