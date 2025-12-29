- Use Lit
- [decorators](https://lit.dev/docs/components/decorators/)
- Each component should be a single file: `index.ts`.
- Extend the `Base` class from `@components/base`.
- Use TypeScript decorators.
- Use the `accessor` keyword for `@property` and `@state`.
- Define styles using `static styles = [globalStyles, css\`...\`]`.
- For icons, export `lit-html` templates from `.ts` files (e.g., `src/icons/my-icon.ts`).
- Do not use React
- Do not use JavaScript
- Use @lit/context for state management
- Use @lit/task for async operations
- Each component should have it's own folder with three files:
  - `index.ts`: The main component file.
  - `index.html.ts`: The HTML template.
  - `index.css.ts`: The CSS styles.
- Import the HTML and CSS files into the main component file.

## Examples

index.ts:

```typescript
import { customElement, property, state } from 'lit/decorators.js';
import { html, css } from 'lit';
import { BaseElement, globalStyles } from '@components/base-element';
import { render } from './index.html.ts';
import { styles } from './index.css.ts';

@customElement('my-element')
export class MyElement extends BaseElement {
  static styles = [globalStyles, styles];

  @property({ type: String }) accessor name = 'World';

  @state() private accessor count = 0;

  private increment() {
    this.count++;
  }

  render() {
    return render.call(this);
  }
}
```

index.html.ts:

```typescript
import { html } from 'lit';

export function render() {
  return html`
    <div>
      <h1>Hello, ${this.name}!</h1>
      <p>Count: ${this.count}</p>
      <button @click=${this.increment}>Increment</button>
    </div>
  `;
}
```

index.css.ts:

```typescript
import { css } from 'lit';

export const styles = css`
  div {
    text-align: center;
  }
  button {
    padding: 8px 16px;
    font-size: 16px;
  }
`;
```
