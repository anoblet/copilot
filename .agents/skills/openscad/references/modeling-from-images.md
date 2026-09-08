# Modeling From Images

## Read The Reference Before Writing Code

- Identify whether the image communicates outline, relief, or physical structure.
- Look for symmetry, repeated features, mounting points, cutouts, and major thickness transitions.
- Separate decorative details from function-critical geometry so the first draft solves the important shape first.
- If dimensions are missing, ask for the minimum measurements needed to anchor scale rather than guessing every feature.

## Translate Visual Cues Into Parameters

- Define a coordinate system early so the model can be reasoned about consistently.
- Capture major dimensions as top-level parameters: width, height, depth, wall thickness, hole diameter, spacing, and clearance.
- Prefer named intermediate values for derived measurements so revisions remain traceable.
- Keep the first version intentionally simple and add secondary details only after the main proportions validate.

## Image-Specific Heuristics

### Logos, Signs, And Icons

- Clean the source into closed paths and reduce noise before importing.
- Separate foreground shapes, negative spaces, and backing geometry.
- Use extrusion depth, borders, and offsets to create readable printable geometry.

### Reliefs And Grayscale Sources

- Confirm that the image encodes depth meaningfully; not every photo is a good heightmap.
- Simplify contrast when the relief should emphasize only a few height bands.
- Expect to tune Z exaggeration because visual depth in an image rarely maps cleanly to physical depth.

### Product Photos And Functional Parts

- Start from the gross silhouette and the load-bearing or interfacing features.
- Infer hidden geometry cautiously and label assumptions so the user can confirm them.
- Prefer constructive solid geometry over freeform approximation when the object appears manufactured.

## Ask For Clarification At The Right Time

- Ask for dimensions when scale affects fit, printability, or mechanical intent.
- Ask whether the goal is visual resemblance, physical fit, or both.
- Ask which features are optional when the image contains clutter or occluded details.

## Common Drafting Strategy

1. Build the base body.
2. Add primary positive features.
3. Cut holes, slots, and recesses.
4. Add finishing details only after the render matches the major silhouette.
5. Refactor repeated geometry into modules or helper parameters once the structure stabilizes.
