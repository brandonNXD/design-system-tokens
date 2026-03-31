#!/usr/bin/env node
// build-tokens.js
// Reads tokens.json (Tokens Studio export) and outputs:
//   src/styles/tokens.css  — CSS custom properties + Tailwind v4 @theme mapping
//
// Usage: node build-tokens.js

import fs   from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const require    = createRequire(import.meta.url);

const ROOT   = __dirname;
const tokens = JSON.parse(fs.readFileSync(path.join(ROOT, 'tokens.json'), 'utf8'));
const { Primitives, Semantics } = tokens;

// ─── Ref resolver ────────────────────────────────────────────────────────────
// Resolves "{color/gray/100}" → "#e9ebea" by walking the Primitives tree.
// Handles chained aliases (e.g. brand → blue) and compound group keys
// like "color/chart colors/purple" where the key itself contains slashes.
function resolve(value) {
  if (typeof value !== 'string' || value[0] !== '{') return value;
  const ref   = value.slice(1, -1); // strip braces
  const parts = ref.split('/');

  // Try all prefix lengths longest-first to match compound group keys
  // e.g. "color/chart colors/purple" (3 parts) before "color/chart colors" (2)
  for (let i = parts.length - 1; i >= 1; i--) {
    const group = parts.slice(0, i).join('/');
    const leaf  = parts.slice(i).join('/');
    const node  = Primitives[group]?.[leaf];
    if (node?.value !== undefined) return resolve(node.value); // recurse for chains
  }
  return value; // unresolvable — return as-is
}

// ─── CSS variable name ────────────────────────────────────────────────────────
// "Color/surface/brand/bold" + "static"        → "--color-surface-brand-bold-static"
// "Color/surface/standard" + "tertiary (disabled)" → "--color-surface-standard-tertiary-disabled"
// "Font/line-height" + "2xl"                   → "--font-line-height-2xl"
function cssVar(group, leaf) {
  return (
    '--' +
    `${group}/${leaf}`
      .toLowerCase()
      .replace(/\s*\([^)]*\)/g, '')  // drop "(disabled)", "(pressed)" etc.
      .replace(/\s+/g, '-')
      .replace(/\//g, '-')
      .replace(/-{2,}/g, '-')
      .replace(/^-|-$/g, '')
  );
}

// ─── Font-weight string → numeric CSS value ──────────────────────────────────
const FONT_WEIGHT = {
  'Extra Bold': '800',
  'Bold':       '700',
  'Semi Bold':  '600',
  'Medium':     '500',
  'Regular':    '400',
};

function resolveLeaf(leaf) {
  const src = leaf.valuesByMode
    ? { light: leaf.valuesByMode.Light, dark: leaf.valuesByMode.Dark }
    : { light: leaf.value, dark: leaf.value };

  let light = resolve(src.light);
  let dark  = resolve(src.dark);

  if (leaf.type === 'string') {
    light = FONT_WEIGHT[light] ?? light;
    dark  = FONT_WEIGHT[dark]  ?? dark;
  }

  return { light, dark };
}

// ─── Walk Semantics → CSS var lists ──────────────────────────────────────────
const rootLines = [];
const darkLines = [];
const lightVars = {}; // name → resolved light value (used by @theme section below)

for (const [group, members] of Object.entries(Semantics)) {
  for (const [leafKey, leaf] of Object.entries(members)) {
    // Skip nested groups (their children will be iterated as flat leaves)
    if (typeof leaf !== 'object' || leaf.type === undefined) continue;

    const name          = cssVar(group, leafKey);
    const { light, dark } = resolveLeaf(leaf);

    rootLines.push(`  ${name}: ${light};`);
    lightVars[name] = light;
    if (dark !== light) darkLines.push(`  ${name}: ${dark};`);
  }
}

// ─── Tailwind v4 @theme inline block ─────────────────────────────────────────
// @theme inline {} tells Tailwind to generate utility classes where the value
// is a var() reference (not a baked value), so dark-mode overrides work.
//
// Naming conventions required by Tailwind v4:
//   --color-*         → bg-*, text-*, border-*, ring-*, etc.
//   --spacing-*       → p-*, m-*, gap-*, w-*, h-*, etc.
//   --font-weight-*   → font-*
//   --text-*          → text-* (font-size)   ← we remap from --font-size-*
//   --leading-*       → leading-*            ← we remap from --font-line-height-*
//   --radius-*        → rounded-*            ← we remap names (default→bare)
//   --font-*          → font-* (family)

const themeLines = [];

// Colors — direct, all --color-* vars map 1-to-1
themeLines.push('  /* ── Colors ───────────────────────────────────────────── */');
for (const name of Object.keys(lightVars).filter(n => n.startsWith('--color-'))) {
  themeLines.push(`  ${name}: var(${name});`);
}

// Spacing — direct, --spacing-* vars map 1-to-1
themeLines.push('  /* ── Spacing ──────────────────────────────────────────── */');
for (const name of Object.keys(lightVars).filter(n => n.startsWith('--spacing-'))) {
  themeLines.push(`  ${name}: var(${name});`);
}

// Font family — remap --font-family-family → --font-sans
if (lightVars['--font-family-family']) {
  themeLines.push('  /* ── Font family ──────────────────────────────────────── */');
  themeLines.push('  --font-sans: var(--font-family-family);');
}

// Font weights — direct, --font-weight-* map 1-to-1
themeLines.push('  /* ── Font weights ─────────────────────────────────────── */');
for (const name of Object.keys(lightVars).filter(n => n.startsWith('--font-weight-'))) {
  themeLines.push(`  ${name}: var(${name});`);
}

// Font sizes — remap --font-size-title-h1 → --text-h1 (with paired line-height)
const TITLE_LH = { h1: '40px', h2: '36px', h3: '32px', h4: '28px' };
const BODY_LH  = { large: '28px', medium: '24px', small: '20px', caption: '16px' };
themeLines.push('  /* ── Font sizes (paired with default line-heights) ─────── */');
for (const key of Object.keys(Semantics['Font/size/title'] ?? {})) {
  const varName = cssVar('Font/size/title', key);
  themeLines.push(`  --text-${key}: var(${varName});`);
  if (TITLE_LH[key]) themeLines.push(`  --text-${key}--line-height: ${TITLE_LH[key]};`);
}
for (const key of Object.keys(Semantics['Font/size/body'] ?? {})) {
  const varName = cssVar('Font/size/body', key);
  themeLines.push(`  --text-${key}: var(${varName});`);
  if (BODY_LH[key]) themeLines.push(`  --text-${key}--line-height: ${BODY_LH[key]};`);
}

// Line heights — remap --font-line-height-* → --leading-*
themeLines.push('  /* ── Line heights ─────────────────────────────────────── */');
for (const key of Object.keys(Semantics['Font/line-height'] ?? {})) {
  const varName = cssVar('Font/line-height', key);
  themeLines.push(`  --leading-${key}: var(${varName});`);
}

// Border radius — remap names to Tailwind v4 conventions
// Tailwind generates: rounded (bare), rounded-sm, rounded-lg, rounded-full, rounded-none
themeLines.push('  /* ── Border radius ────────────────────────────────────── */');
const RADIUS_KEY = { default: '', small: '-sm', large: '-lg', round: '-full' };
for (const key of Object.keys(Semantics['Radius'] ?? {})) {
  const suffix  = RADIUS_KEY[key] ?? `-${key}`;
  const varName = cssVar('Radius', key);
  themeLines.push(`  --radius${suffix}: var(${varName});`);
}
themeLines.push('  --radius-none: 0px;');

// ─── Emit CSS ────────────────────────────────────────────────────────────────
const css = [
  '/* Auto-generated by build-tokens.js — do not edit manually */',
  '/* Run `node build-tokens.js` to regenerate after updating tokens.json */',
  '',
  '/* ─── 1. Raw CSS variables (light & dark) ──────────────────────────────── */',
  ':root {',
  ...rootLines,
  '}',
  '',
  '.dark {',
  ...darkLines,
  '}',
  '',
  '/* ─── 2. Tailwind v4 @theme mapping ────────────────────────────────────── */',
  '/* Maps CSS vars → Tailwind utility classes. Requires Tailwind v4.           */',
  '@theme inline {',
  ...themeLines,
  '}',
  '',
].join('\n');

const outDir = path.join(ROOT, 'src', 'styles');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'tokens.css'), css);

console.log(
  `✓  src/styles/tokens.css  (${rootLines.length} vars, ${darkLines.length} dark, ${themeLines.filter(l => l.trim().startsWith('--')).length} @theme entries)`
);
