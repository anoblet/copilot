# Optional BOSL2 Guidance

BOSL2 is optional. Use it when it meaningfully simplifies the model or makes the code clearer than a native OpenSCAD-only approach.

## Good Reasons To Use BOSL2

- Repeated transform-heavy composition benefits from clearer helper modules.
- The task needs path, region, sweep, or skin-style modeling that native primitives do not express cleanly.
- Rounded transitions, attachments, or structured polyhedron workflows would otherwise require verbose manual geometry.

## Useful BOSL2 Families

- Transform helpers for readable placement and orientation.
- Shapes and regions utilities for richer 2D and 3D building blocks.
- Paths, sweeps, and skinning helpers for profile-driven geometry.
- Rounding and VNF-oriented helpers when manual polyhedron work becomes brittle.
- Attachment-oriented composition when complex parts need predictable anchors.

## When Native OpenSCAD Is Enough

- Extruded logos, simple brackets, spacers, plates, boxes, and boolean-driven mechanical parts.
- Heightmap reliefs built from `surface()`.
- Straightforward geometry where native modules remain shorter and easier to review.

## Decision Rule

1. Start with native OpenSCAD.
2. Identify the specific pain point: repeated transforms, hard-to-maintain sweeps, complex rounding, or awkward composition.
3. Introduce BOSL2 only for that pain point.
4. Keep the dependency optional in the instructions and explain the native fallback when BOSL2 is unavailable.

## Guardrails

- Do not assume BOSL2 is installed everywhere.
- Do not rewrite a simple model around BOSL2 unless it materially improves clarity.
- Keep the final model understandable to someone who only knows standard OpenSCAD unless the task clearly demands the extra abstraction.
