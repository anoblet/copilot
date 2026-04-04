---
name: openscad
description: Use OpenSCAD to generate or refine script-based 3D models from SVG artwork, PNG heightmaps, photos, and other reference images, validate them with a local OpenSCAD executable, and iterate with optional BOSL2 support when image-driven workflows need more than native primitives.
compatibility: Requires an OpenSCAD executable discoverable from a local bin directory or PATH, plus write access to a temporary working directory for iterative renders and exports. BOSL2 is optional.
---

# OpenSCAD

Use this skill when a task is about turning an SVG logo, PNG relief source, photo, sketch, or other reference image into OpenSCAD code and validating the generated model through a repeatable command-line loop.

## Good Fit

- Creating signs, logos, icons, embosses, reliefs, and simple mechanical shapes from a reference image.
- Converting SVG-like artwork into extruded solids or grayscale images into heightmap-based surfaces.
- Reconstructing a functional part parametrically from a photo, sketch, or annotated screenshot.
- Iteratively refining generated OpenSCAD based on render results, warnings, and direct user feedback.

## Weak Fit

- Tasks that need sculpting, freeform subdivision, or mesh editing that OpenSCAD is poorly suited for.
- Requests with no usable visual reference, dimensions, or functional intent.
- Workflows that require BOSL2-specific features when the environment does not provide BOSL2 and native OpenSCAD is insufficient.

## Default Workflow

1. Inspect the reference image first and classify it as vector-like artwork, grayscale relief, or a photographed physical object.
2. Choose the simplest modeling path that fits: SVG import plus extrusion, PNG heightmap plus `surface()`, or parametric reconstruction from measured or inferred geometry.
3. Discover an OpenSCAD executable by checking for a suitable binary in a local `bin/` directory first, then falling back to `openscad` on `PATH`.
4. Create a scratch workspace in a local `tmp/` directory when available, including separate inputs and outputs if that layout already exists, otherwise use a task-local temporary directory.
5. Generate or revise the SCAD file in that scratch workspace, render it from the command line, and treat warnings or render failures as signals to revise the model.
6. Compare the rendered output against the reference image, ask the user about mismatches or missing dimensions, and iterate until the shape and intent are aligned.
7. Escalate to optional BOSL2 helpers only when native primitives, transforms, and boolean operations become awkward or repetitive.

## Guardrails

- Keep the workflow project agnostic. Treat `bin/` and `tmp/` as discovery patterns, not mandatory repository structure.
- Prefer command-line validation over GUI-only inspection so the loop stays reproducible.
- Use temporary `echo()` or `assert()` statements during iteration when debugging dimensions, parameters, or invariants, then remove or reduce them once the model is stable.
- Treat user feedback as part of the validation loop. A render that succeeds technically can still be wrong if it misses the intended silhouette or proportions.
- Keep BOSL2 optional. Native OpenSCAD should remain the default unless the model clearly benefits from regions, sweeps, attachments, or rounding helpers.

## Examples

- A user provides a logo image and wants a printable sign. Clean the artwork into SVG-compatible paths, extrude the result, render previews, and iterate on thickness and outline details.
- A user provides a product photo for a bracket or adapter. Infer the primary dimensions, build the shape parametrically from primitives, render from several views, and refine the geometry from feedback.
- A user provides a grayscale image for a relief. Use a PNG heightmap workflow, validate the render, and adjust scaling or base thickness until the result matches the intended depth.

See [workflow patterns](references/workflows.md) for modeling-path selection and step-by-step execution.
See [modeling from images](references/modeling-from-images.md) for image analysis heuristics and translation into OpenSCAD structure.
See [validation and iteration](references/validation-and-iteration.md) for the CLI loop, scratch-space handling, and feedback-driven refinement.
See [optional BOSL2 guidance](references/bosl2-reference-map.md) for when native OpenSCAD is not expressive enough.
