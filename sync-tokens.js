#!/usr/bin/env node
/**
 * sync-tokens.js
 * Reads tokens.json (Tokens Studio export) and injects three CSS blocks
 * directly into src/index.css using a simplified, semantic naming scheme.
 *
 *   :root { ... }           — resolved light-mode values
 *   .dark { ... }           — dark-mode overrides
 *   @theme inline { ... }   — Tailwind v4 utility mappings
 *
 * Blocks are wrapped in /* sync-tokens:start … sync-tokens:end *\/ markers
 * so re-running the script safely replaces the previous output.
 *
 * Usage:  node sync-tokens.js
 */

import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = __dirname;
const tokens    = JSON.parse(fs.readFileSync(path.join(ROOT, 'tokens.json'), 'utf8'));
const { Primitives, Semantics } = tokens;

// ─── Alias resolver ───────────────────────────────────────────────────────────
// Resolves "{color/brand/500}" → "#247ba0" through the Primitives tree.
// Handles chained aliases and compound group keys ("color/chart colors/purple").
function resolve(value) {
  if (typeof value !== 'string' || value[0] !== '{') return value;
  const ref   = value.slice(1, -1);
  const parts = ref.split('/');
  for (let i = parts.length - 1; i >= 1; i--) {
    const group = parts.slice(0, i).join('/');
    const leaf  = parts.slice(i).join('/');
    const node  = Primitives[group]?.[leaf];
    if (node?.value !== undefined) return resolve(node.value);
  }
  return value;
}

const FONT_WEIGHT_MAP = {
  'Extra Bold': '800',
  'Bold':       '700',
  'Semi Bold':  '600',
  'Medium':     '500',
  'Regular':    '400',
};

/** Resolve a Semantics leaf to { light, dark } CSS values. */
function resolveToken(group, leaf) {
  const node = Semantics[group]?.[leaf];
  if (!node) return null;
  const src = node.valuesByMode ?? { Light: node.value, Dark: node.value };
  let light = resolve(src.Light);
  let dark  = resolve(src.Dark);
  if (node.type === 'string') {
    light = FONT_WEIGHT_MAP[light] ?? light;
    dark  = FONT_WEIGHT_MAP[dark]  ?? dark;
  }
  return { light, dark };
}

// ─── Simplified color mapping ─────────────────────────────────────────────────
// Format: [semanticGroup, semanticLeafKey, simplifiedTokenName]
//
// Naming conventions (mirrors shadcn/ui + Radix patterns):
//   Surfaces:       background | surface | muted
//   Action colors:  primary[-hover|-active|-subtle]
//                   destructive[-hover|-active|-subtle]
//                   warning[-*] | success[-*]
//   Text/fg:        foreground | foreground-muted | foreground-disabled
//                   on-primary | on-destructive | on-warning | on-success
//   Borders/rings:  border | border-strong | ring | border-destructive | …
const COLOR_MAP = [
  // ── Surfaces ──────────────────────────────────────────────────────────────
  ['Color/surface/standard', 'primary',            'background'],
  ['Color/surface/standard', 'secondary',          'surface'],
  ['Color/surface/standard', 'tertiary (disabled)','muted'],

  // ── Primary action (brand) ────────────────────────────────────────────────
  ['Color/surface/brand/bold', 'static',  'primary'],
  ['Color/surface/brand/bold', 'hover',   'primary-hover'],
  ['Color/surface/brand/bold', 'pressed', 'primary-active'],
  ['Color/surface/brand/soft', 'static',  'primary-subtle'],
  ['Color/surface/brand/soft', 'hover',   'primary-subtle-hover'],
  ['Color/surface/brand/soft', 'pressed', 'primary-subtle-active'],

  // ── Destructive (critical) ────────────────────────────────────────────────
  ['Color/surface/critical/bold', 'static',  'destructive'],
  ['Color/surface/critical/bold', 'hover',   'destructive-hover'],
  ['Color/surface/critical/bold', 'pressed', 'destructive-active'],
  ['Color/surface/critical/soft', 'static',  'destructive-subtle'],
  ['Color/surface/critical/soft', 'hover',   'destructive-subtle-hover'],
  ['Color/surface/critical/soft', 'pressed', 'destructive-subtle-active'],

  // ── Warning ───────────────────────────────────────────────────────────────
  ['Color/surface/warning/bold', 'static',  'warning'],
  ['Color/surface/warning/bold', 'hover',   'warning-hover'],
  ['Color/surface/warning/bold', 'pressed', 'warning-active'],
  ['Color/surface/warning/soft', 'static',  'warning-subtle'],
  ['Color/surface/warning/soft', 'hover',   'warning-subtle-hover'],
  ['Color/surface/warning/soft', 'pressed', 'warning-subtle-active'],

  // ── Success ───────────────────────────────────────────────────────────────
  ['Color/surface/success/bold', 'static',  'success'],
  ['Color/surface/success/bold', 'hover',   'success-hover'],
  ['Color/surface/success/bold', 'pressed', 'success-active'],
  ['Color/surface/success/soft', 'static',  'success-subtle'],
  ['Color/surface/success/soft', 'hover',   'success-subtle-hover'],
  ['Color/surface/success/soft', 'pressed', 'success-subtle-active'],

  // ── Foreground / text ─────────────────────────────────────────────────────
  ['Color/text/on-primary', 'standard',  'foreground'],
  ['Color/text/on-primary', 'subtext',   'foreground-muted'],
  ['Color/text/on-primary', 'disabled',  'foreground-disabled'],
  ['Color/text/on-primary', 'critical',  'foreground-destructive'],
  ['Color/text/on-primary', 'warning',   'foreground-warning'],
  ['Color/text/on-primary', 'success',   'foreground-success'],

  // Text on inverted (bold) surfaces
  ['Color/text/on-brand',    'bold', 'on-primary'],
  ['Color/text/on-brand',    'soft', 'on-primary-subtle'],
  ['Color/text/on-critical', 'bold', 'on-destructive'],
  ['Color/text/on-critical', 'soft', 'on-destructive-subtle'],
  ['Color/text/on-warning',  'bold', 'on-warning'],
  ['Color/text/on-success',  'bold', 'on-success'],

  // Interactive link / brand text
  ['Color/text/brand', 'static',  'link'],
  ['Color/text/brand', 'hover',   'link-hover'],
  ['Color/text/brand', 'pressed', 'link-active'],

  // ── Borders & rings ───────────────────────────────────────────────────────
  ['Color/border', 'primary',   'border'],
  ['Color/border', 'secondary', 'border-strong'],
  ['Color/border', 'brand',     'ring'],           // used for focus rings
  ['Color/border', 'critical',  'border-destructive'],
  ['Color/border', 'warning',   'border-warning'],
  ['Color/border', 'success',   'border-success'],

  // ── Overlay / special ─────────────────────────────────────────────────────
  ['Color/special', 'transparent', 'overlay-none'],
  ['Color/special', 'hover',       'overlay-hover'],
  ['Color/special', 'pressed',     'overlay-active'],
];

// ─── Build color CSS lines ─────────────────────────────────────────────────────
const colorRootLines  = [];
const colorDarkLines  = [];
const colorThemeLines = ['  /* ── Colors ───────────────────────────────────────────── */'];

for (const [group, leaf, name] of COLOR_MAP) {
  const result = resolveToken(group, leaf);
  if (!result) {
    console.warn(`  ⚠  Token not found: ${group} / ${leaf}`);
    continue;
  }
  const { light, dark } = result;
  const varName = `--color-${name}`;
  colorRootLines.push(`  ${varName}: ${light};`);
  if (dark !== light) colorDarkLines.push(`  ${varName}: ${dark};`);
  colorThemeLines.push(`  ${varName}: var(${varName});`);
}

// ─── Build non-color CSS lines ────────────────────────────────────────────────
const miscRootLines  = [];
const miscThemeLines = [];

// Spacing
miscThemeLines.push('  /* ── Spacing ──────────────────────────────────────────── */');
for (const [key, leaf] of Object.entries(Semantics['Spacing'] ?? {})) {
  const val     = resolve(leaf.valuesByMode?.Light ?? leaf.value);
  const varName = `--spacing-${key}`;
  miscRootLines.push(`  ${varName}: ${val};`);
  miscThemeLines.push(`  ${varName}: var(${varName});`);
}

// Font family
const ffLeaf = Semantics['Font/family']?.['family'];
if (ffLeaf) {
  const val = resolve(ffLeaf.valuesByMode?.Light ?? ffLeaf.value);
  miscRootLines.push(`  --font-family: ${val};`);
  miscThemeLines.push('  /* ── Font family ──────────────────────────────────────── */');
  miscThemeLines.push('  --font-sans: var(--font-family);');
}

// Font weights
miscThemeLines.push('  /* ── Font weights ─────────────────────────────────────── */');
for (const [key, leaf] of Object.entries(Semantics['Font/weight'] ?? {})) {
  const raw = resolve(leaf.valuesByMode?.Light ?? leaf.value);
  const val = FONT_WEIGHT_MAP[raw] ?? raw;
  const varName = `--font-weight-${key}`;
  miscRootLines.push(`  ${varName}: ${val};`);
  miscThemeLines.push(`  ${varName}: var(${varName});`);
}

// Font sizes — remapped to Tailwind v4 --text-* convention
const TITLE_LH = { h1: '40px', h2: '36px', h3: '32px', h4: '28px' };
const BODY_LH  = { large: '28px', medium: '24px', small: '20px', caption: '16px' };
miscThemeLines.push('  /* ── Font sizes (with paired line-heights) ─────────────── */');
for (const [key, leaf] of Object.entries(Semantics['Font/size/title'] ?? {})) {
  const val     = resolve(leaf.valuesByMode?.Light ?? leaf.value);
  const rawVar  = `--font-size-title-${key}`;
  miscRootLines.push(`  ${rawVar}: ${val};`);
  miscThemeLines.push(`  --text-${key}: var(${rawVar});`);
  if (TITLE_LH[key]) miscThemeLines.push(`  --text-${key}--line-height: ${TITLE_LH[key]};`);
}
for (const [key, leaf] of Object.entries(Semantics['Font/size/body'] ?? {})) {
  const val    = resolve(leaf.valuesByMode?.Light ?? leaf.value);
  const rawVar = `--font-size-body-${key}`;
  miscRootLines.push(`  ${rawVar}: ${val};`);
  miscThemeLines.push(`  --text-${key}: var(${rawVar});`);
  if (BODY_LH[key]) miscThemeLines.push(`  --text-${key}--line-height: ${BODY_LH[key]};`);
}

// Line heights → --leading-*
miscThemeLines.push('  /* ── Line heights ─────────────────────────────────────── */');
for (const [key, leaf] of Object.entries(Semantics['Font/line-height'] ?? {})) {
  const val    = resolve(leaf.valuesByMode?.Light ?? leaf.value);
  const rawVar = `--line-height-${key}`;
  miscRootLines.push(`  ${rawVar}: ${val};`);
  miscThemeLines.push(`  --leading-${key}: var(${rawVar});`);
}

// Border radius → --radius-* (Tailwind v4 bare/sm/lg/full names)
const RADIUS_SUFFIX = { default: '', small: '-sm', large: '-lg', round: '-full' };
miscThemeLines.push('  /* ── Border radius ────────────────────────────────────── */');
for (const [key, leaf] of Object.entries(Semantics['Radius'] ?? {})) {
  const val    = resolve(leaf.valuesByMode?.Light ?? leaf.value);
  const rawVar = `--radius-semantic-${key}`;
  miscRootLines.push(`  ${rawVar}: ${val};`);
  const suffix = RADIUS_SUFFIX[key] ?? `-${key}`;
  miscThemeLines.push(`  --radius${suffix}: var(${rawVar});`);
}
miscThemeLines.push('  --radius-none: 0px;');

// ─── Assemble the generated block ─────────────────────────────────────────────
const allRootLines  = [...colorRootLines,  ...miscRootLines];
const allDarkLines  = colorDarkLines;         // only colors have dark overrides
const allThemeLines = [...colorThemeLines, ...miscThemeLines];

const BLOCK = [
  '/* sync-tokens:start — auto-generated by sync-tokens.js — do not edit */',
  '/* Run `node sync-tokens.js` after updating tokens.json to regenerate. */',
  '',
  ':root {',
  ...allRootLines,
  '}',
  '',
  '.dark {',
  ...allDarkLines,
  '}',
  '',
  '@theme inline {',
  ...allThemeLines,
  '}',
  '',
  '/* sync-tokens:end */',
].join('\n');

// ─── Inject / replace in src/index.css ───────────────────────────────────────
const CSS_PATH     = path.join(ROOT, 'src', 'index.css');
const START_MARKER = '/* sync-tokens:start';
const END_MARKER   = '/* sync-tokens:end */';

let css = fs.readFileSync(CSS_PATH, 'utf8');

// Remove old tokens.css import (replaced by inline block)
css = css.replace(/^@import\s+['"]\.\/styles\/tokens\.css['"]\s*;\n?/m, '');

if (css.includes(START_MARKER) && css.includes(END_MARKER)) {
  // Replace existing block
  const startIdx = css.indexOf(START_MARKER);
  const endIdx   = css.indexOf(END_MARKER) + END_MARKER.length;
  css = css.slice(0, startIdx).trimEnd() + '\n\n' + BLOCK + '\n\n' + css.slice(endIdx).trimStart();
} else {
  // First run — insert before @layer base, or append
  const layerIdx = css.indexOf('@layer base');
  if (layerIdx !== -1) {
    css = css.slice(0, layerIdx).trimEnd() + '\n\n' + BLOCK + '\n\n' + css.slice(layerIdx);
  } else {
    css = css.trimEnd() + '\n\n' + BLOCK + '\n';
  }
}

fs.writeFileSync(CSS_PATH, css);

console.log(
  `✓  src/index.css — ${allRootLines.length} vars ·` +
  ` ${allDarkLines.length} dark overrides ·` +
  ` ${allThemeLines.filter(l => l.trim().startsWith('--')).length} @theme entries`
);
