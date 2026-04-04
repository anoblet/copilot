# Validation And Iteration

## Discover The OpenSCAD Executable

- Check for a usable executable in a local `bin/` directory first because many workspaces pin tool versions locally.
- Fall back to an `openscad` executable on `PATH` when no local binary is present.
- If the available executable is an AppImage and the environment cannot mount it normally, use the extraction fallback supported by that environment before giving up.

## Use A Scratch Workspace While Iterating

- Prefer a local `tmp/` directory when the workspace already provides one.
- Reuse nested scratch folders such as input and output directories when they already exist, otherwise create a task-local temporary layout.
- Keep the reference image, generated SCAD, render outputs, exported meshes, and comparison notes together in that scratch area.
- Avoid editing final destination files directly while the geometry is still unstable.

## Example Scratch Layout Conventions

- When a workspace already has a `tmp/` directory, use a task-scoped layout such as `tmp/openscad/<task-slug>/input/` and `tmp/openscad/<task-slug>/output/`.
- When there is no workspace scratch area, use a system temporary root such as `$TMPDIR/openscad/<task-slug>/input/` and `$TMPDIR/openscad/<task-slug>/output/`.
- Keep the generated SCAD file close to the render artifacts so each iteration can be rerun from the same working set.
- A simple reusable convention is:

```text
<scratch-root>/input/reference.svg
<scratch-root>/input/reference.png
<scratch-root>/output/model.scad
<scratch-root>/output/preview-front.png
<scratch-root>/output/preview-iso.png
<scratch-root>/output/model.stl
<scratch-root>/output/summary.json
```

## Reusable CLI Command Shapes

Use shell variables or equivalent placeholders so the same commands work in any repository:

```sh
OPENSCAD="${OPENSCAD:-openscad}"
SCRATCH_ROOT="${SCRATCH_ROOT:-./tmp/openscad/<task-slug>}"
INPUT_DIR="$SCRATCH_ROOT/input"
OUTPUT_DIR="$SCRATCH_ROOT/output"
MODEL_SCAD="$OUTPUT_DIR/model.scad"
```

- Replace `./tmp/...` with a system temporary directory when the workspace does not expose a local scratch area.
- Resolve `OPENSCAD` to a repo-local binary first when one exists, then fall back to `openscad` on `PATH`.
- Keep one SCAD file per iteration and overwrite preview artifacts intentionally so comparisons stay simple.

### Preview Render

Use a rendered PNG as the fast validation step because it exercises parsing, evaluation, and visual composition in one command.

```sh
"$OPENSCAD" \
	--render \
	--hardwarnings \
	--autocenter \
	--viewall \
	--imgsize=1600,1200 \
	--summary=all \
	--summary-file "$OUTPUT_DIR/summary.json" \
	-o "$OUTPUT_DIR/preview-front.png" \
	"$MODEL_SCAD"
```

- `--render` forces a real geometry evaluation instead of relying on preview-only behavior.
- `--hardwarnings` turns warnings into iteration blockers.
- `--autocenter` and `--viewall` normalize framing across reruns so image comparisons are more stable.
- `--imgsize` makes review artifacts large enough to inspect silhouette and feature placement.
- `--summary` and `--summary-file` preserve machine-readable diagnostics for later review.

### Parameter Override Render

Use `-D` overrides when you need to probe a dimension or variant without editing the file between iterations.

```sh
"$OPENSCAD" \
	--render \
	--hardwarnings \
	--autocenter \
	--viewall \
	--imgsize=1600,1200 \
	-D 'part_height=6' \
	-D 'base_thickness=2.4' \
	-o "$OUTPUT_DIR/preview-variant.png" \
	"$MODEL_SCAD"
```

### Solid Export

When the preview output looks correct, export a downstream solid artifact from the same SCAD source.

```sh
"$OPENSCAD" \
	--render \
	--hardwarnings \
	--summary=all \
	--summary-file "$OUTPUT_DIR/export-summary.json" \
	-o "$OUTPUT_DIR/model.stl" \
	"$MODEL_SCAD"
```

- Use STL export only after the preview render is already clean.
- Keep preview images and exported meshes in the same `output/` directory so a reviewer can correlate them quickly.
- If the environment requires an AppImage extraction fallback, apply that to the executable invocation without changing the scratch layout or output naming.

## CLI Validation Loop

1. Write or revise the SCAD file in the scratch workspace.
2. Run OpenSCAD from the command line to render a preview image from a representative view using a stable command shape and stable output paths.
3. Treat warnings, parser errors, and render failures as iteration blockers rather than minor issues.
4. When preview output looks correct, export a solid format such as STL if the task needs printable or downstream geometry.
5. Compare the render or export result against the reference image and the user’s stated intent.
6. Revise parameters, structure, or modeling strategy and repeat until the loop stabilizes.

## What To Check On Each Iteration

- Silhouette match from the most informative view.
- Relative proportions between large features.
- Hole placement, slot spacing, and clearances for functional parts.
- Relief readability and base thickness for heightmap-derived models.
- Absence of unexpected warnings, missing imports, or non-manifold output.

## Use Temporary Instrumentation Carefully

- Add `echo()` statements to expose intermediate dimensions during early iterations.
- Use `assert()` to catch impossible parameter combinations or violated assumptions.
- Remove or reduce debugging output once the model validates cleanly.

## Feedback-Driven Refinement

- Show the user rendered outputs or summarize what changed between iterations.
- Ask targeted questions about mismatches instead of requesting broad feedback.
- Use validation results and user comments together: command-line success proves the model renders, while user feedback confirms whether it resembles the reference and serves the intended purpose.
- If the chosen modeling path keeps failing, switch paths instead of endlessly tuning the wrong approach.

## Warning Policy

- Treat warnings as actionable during iteration because they often reveal missing files, bad geometry assumptions, or unstable imports.
- Do not declare the model complete until the validation loop is clean enough that future revisions remain reproducible.
