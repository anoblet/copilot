# Astro Instructions

- Use `.astro` files for pages and layouts.
- Pages should be located in `src/pages`.
- Layouts should be located in `src/layouts`.
- Use the `---` frontmatter block for imports and logic.
- Import Lit components as side-effects to register them: `import '@components/my-element';`.
- Pass data to components via attributes (strings) or properties (complex data).
- Use `client:load` or `client:visible` directives for interactive components.
- Prefer `Layout` components to wrap page content.

## Example Page

```astro
---
import Layout from '../layouts/Layout.astro';
import '@components/my-element';

const title = "My Page";
const data = { id: 1, name: "Test" };
---

<Layout title={title}>
  <main>
    <h1>{title}</h1>
    <my-element .data={data}></my-element>
  </main>
</Layout>
```
