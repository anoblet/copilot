# Workflow Patterns

## Start With The Image Type

- Use a vector-style workflow when the image is a logo, icon, sign face, stencil, or other crisp 2D outline.
- Use a heightmap workflow when the source is intentionally grayscale and the model should behave like a relief or terrain surface.
- Use a parametric reconstruction workflow when the image is a photo or sketch of a functional object.
- Use optional BOSL2 helpers when the shape needs sweeps, rounded transitions, path or region logic, or attachable composition that native OpenSCAD makes cumbersome.

## Vector-Like Artwork

1. Reduce the image to clean closed outlines before writing SCAD.
2. Import the resulting SVG into OpenSCAD.
3. Turn the 2D profile into a solid with `linear_extrude()` or a similar operation.
4. Add holes, borders, backing plates, or mounting features with boolean operations.
5. Render a preview and compare edge fidelity, line thickness, and overall proportions with the reference image.
6. Iterate on outline cleanup, extrusion depth, and feature spacing until the rendered silhouette is correct.

Stop when the rendered front view matches the intended outline and the depth or mounting features meet the stated use case.

## Heightmap Reliefs

1. Confirm that the image is suitable for grayscale-driven depth rather than shape tracing.
2. Normalize the image so the light-to-dark mapping produces predictable height variation.
3. Use `surface()` with a PNG input when the task truly wants relief geometry.
4. Add a predictable base thickness and crop or frame the output as needed.
5. Render from both oblique and top views to inspect whether the relief reads correctly.
6. Iterate on XY scaling, Z scaling, and base thickness until the render matches the desired visual depth.

Stop when the preview communicates the intended raised or recessed detail and the base remains printable or manufacturable.

## Parametric Reconstruction From Photos

1. Extract the main primitives from the image before writing code: rectangles, circles, cylinders, ribs, slots, or chamfers.
2. Ask for missing dimensions or infer only the minimum set needed to start.
3. Build the model from named parameters so dimensions can change without rewriting the structure.
4. Use transforms and boolean operations to place and subtract features incrementally.
5. Render early and often, comparing the overall silhouette first and small details second.
6. Use user feedback to correct proportions, spacing, and functional clearances.

Stop when the model satisfies both the visible shape and the intended function.

## When To Escalate To BOSL2

- Reach for BOSL2 when the task needs repeated transforms, shaped profiles along paths, region operations, or rounded transitions that would otherwise require brittle manual geometry.
- Keep the first pass native when possible, then introduce BOSL2 only where it materially simplifies the code or improves maintainability.
- If BOSL2 is unavailable, fall back to the simplest native approximation and be explicit about the limitation.

## Recommended Execution Order

1. Read the image and identify the modeling path.
2. Set up a temporary workspace for source images, generated SCAD, and rendered outputs.
3. Draft the smallest viable model.
4. Validate from the command line with renders and, when needed, exported solids.
5. Review mismatches against the image and capture user feedback.
6. Revise the model and repeat the loop until the result is acceptable.
