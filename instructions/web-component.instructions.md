- Use Lit
- [decorators](https://lit.dev/docs/components/decorators/)
- Each component should have it's folder and 3 files:
  - index.ts
  - index.html.ts
  - index.css.ts
    Use TypeScript decorators
- Reference [components](https://github.com/anoblet/astronautical-apogee/tree/main/src/components)

## Examples

index.ts:

```typescript
import { LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styles } from "./index.css.ts";
import { render } from "./index.html.ts";

@customElement("my-element")
export class MyElement extends LitElement {
  static styles = styles;

  @property({ type: String }) accessor name = "World";

  @state() private accessor count = 0;

  private increment() {
    this.count++;
  }

  render = render.call(this);
}
```

index.css.ts:

```typescript
import { css } from "lit";

export const styles = css`
  :host {
    display: block;
    padding: 16px;
    background-color: #f0f0f0;
  }
  h1 {
    color: #333;
  }
  button {
    padding: 8px 16px;
    font-size: 16px;
  }
`;
```

index.html.ts:

```typescript
import { html } from "lit";

export function render() {
  return html`
    <h1>Hello, ${this.name}!</h1>
    <p>Count: ${this.count}</p>
    <button @click=${this.increment}>Increment</button>
  `;
}
```
