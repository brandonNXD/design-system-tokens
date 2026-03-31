## Design System Architecture

- **Source of Truth:** All design tokens live in `tokens.json` (exported via Tokens Studio).
- **Token Logic:**
  - **Primitives:** Raw values (colors, spacing units). Do not use these directly in components.
  - **Semantics:** Themed aliases (e.g., `Color/surface/standard/primary` → `color/gray/0`). **Always** use Semantic tokens for component styling.
- **Theming:** Light and Dark modes — Semantic tokens alias Primitives per mode. CSS variables are injected by `sync-tokens.js`.

## Tech Stack & Standards

- **Components:** React + TypeScript.
- **Styling:** Tailwind CSS v4 with `@theme inline {}` in `src/index.css`. Extended with token-generated CSS variables via `node sync-tokens.js`.
- **Naming:** PascalCase for components, kebab-case for CSS custom properties, slash-separated paths for Figma variable names.
- **Folder Structure:** Atomic Design — `src/components/atoms/`, `molecules/`, `organisms/`.

## Build Workflow

1. **Token Translation:** Run `npm run sync` (`node sync-tokens.js`) to parse `tokens.json` into CSS variables in `src/index.css`.
2. **Component Scaffolding:** Each component must include:
   - `Component.tsx` (Logic & Markup)
   - `Component.test.tsx` (Basic unit tests)
   - `Component.stories.tsx` (Storybook for visual documentation)

---

## Figma MCP Integration Rules

These rules govern every Figma-driven task and must be followed in full.

### Required Flow (never skip steps)

1. Call `get_design_context` first with the exact `nodeId` and `fileKey`.
2. Call `get_screenshot` for visual reference.
3. Only after both responses, begin implementation.
4. Translate MCP output (React + Tailwind) into **this project's stack** — do not paste it verbatim.
5. Validate the final UI against the Figma screenshot before marking complete.

### Token & Styling Rules

- IMPORTANT: **Never hardcode hex values** in Figma nodes or in React/CSS. Always bind to a Figma Variable or use a CSS custom property from `src/index.css`.
- Colors in React use Tailwind utilities mapped from `--color-*` variables (e.g., `bg-primary`, `text-foreground`, `border-border`).
- Semantic token names follow the pattern `Color/surface/<category>/<leaf>` in Figma and `--color-<simplified>` in CSS.
- Spacing uses `--spacing-*` tokens; radius uses `--radius-*`; never use arbitrary pixel values.
- The simplified CSS name mapping lives in `sync-tokens.js` → `COLOR_MAP`. Check it before introducing a new name.

### Figma Variable Rules

- The Figma file `AEhelp890jn35ZaDBKlgle` has **two** variable collections:
  - **Primitives** — raw values (`color/gray/500`, `spacing/16px`, etc.), single "Default" mode. Never bind component fills directly to these.
  - **Semantics** — Light/Dark mode aliases (`Color/surface/brand/bold/static`, `Radius/default`, `Sizes/button/height/md`, etc.). **Always bind component fills, strokes, cornerRadius, padding, height, and gap to Semantic variables.**
- To toggle the whole library between Light and Dark: select the "Button Library" frame → in the right panel under Variables, switch the **Semantics** collection mode from Light to Dark.
- Do **not** create a third "Design Tokens" collection — it caused duplicates and has been removed.
- When writing Figma Plugin API code:
  - Fills: `V.setBoundVariableForPaint(paint, 'color', semanticVar)` — returns a new paint object; reassign it.
  - Layout floats: `node.setBoundVariable('cornerRadius' | 'paddingLeft' | 'paddingRight' | 'height' | 'itemSpacing', floatVar)`.
  - Never call `V.createVariableAlias` on a Primitive and attach it directly to a node fill — go through a Semantic variable.

### Component Rules

- IMPORTANT: Always check `src/components/atoms/` for an existing component before creating a new one.
- Button variants: `primary | secondary | destructive | ghost | icon-only`. Do not introduce new variant names without updating `Button.tsx`, `Button.stories.tsx`, `Button.test.tsx`, and the Figma ComponentSet.
- Use `cva` (class-variance-authority) for variant logic in React components.
- Components must accept `className` and `as` props for polymorphism.

### Asset Rules

- IMPORTANT: If the Figma MCP server returns a `localhost` source for an image or SVG, use it directly.
- IMPORTANT: Do not install new icon libraries — use what is already in the Figma payload.
- Static assets go in `public/assets/`.

### Component File Locations

| Type | Path |
|------|------|
| Atoms | `src/components/atoms/<Name>/` |
| Molecules | `src/components/molecules/<Name>/` |
| Organisms | `src/components/organisms/<Name>/` |
| CSS tokens | `src/index.css` (auto-generated block between sync markers) |
| Token source | `tokens.json` |
| Token sync script | `sync-tokens.js` |
| Storybook config | `.storybook/` |