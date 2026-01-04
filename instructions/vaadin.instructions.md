# Vaadin Instructions

This document outlines the standards for using Vaadin components and routing within the workspace.

## Routing

Use `@vaadin/router` for client-side routing in Single Page Applications (SPAs).

### Standard Pattern

Define routes in a dedicated file (e.g., `routes.ts`) or within the main application shell component.

```typescript
import { Router } from '@vaadin/router';

const router = new Router(document.getElementById('outlet'));
router.setRoutes([
  { path: '/', component: 'home-view' },
  { path: '/users', component: 'user-list-view' },
  { path: '(.*)', component: 'not-found-view' },
]);
```

## Components

Use standard Vaadin components to ensure UI consistency across applications.

### Recommended Components

- **Layout**: `vaadin-app-layout`, `vaadin-scroller`, `vaadin-split-layout`
- **Data Display**: `vaadin-grid` (for tabular data)
- **Input**: `vaadin-text-field`, `vaadin-text-area`, `vaadin-checkbox`, `vaadin-select`
- **Action**: `vaadin-button`
- **Feedback**: `vaadin-notification`, `vaadin-progress-bar`

### Usage Guidelines

- Import components individually to minimize bundle size.
- Use TypeScript for all component implementations.
- Avoid using legacy Polymer-based syntax if encountered in older documentation.

## TypeScript Enforcement

All Vaadin-related code must be written in **TypeScript**.
While legacy examples or existing codebases might use JavaScript, new implementations must strictly adhere to the workspace's TypeScript standards.
