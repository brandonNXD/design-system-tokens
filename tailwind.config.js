// tailwind.config.js
// Reads tokens.json directly at build time — no separate codegen step needed.
// Run `node build-tokens.js` separately to generate src/styles/tokens.css.

'use strict';

const tokens = require('./tokens.json');
const { Primitives, Semantics } = tokens;

// ─── Shared resolver (mirrors build-tokens.js) ───────────────────────────────
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

function cssVar(group, leaf) {
  return (
    '--' +
    `${group}/${leaf}`
      .toLowerCase()
      .replace(/\s*\([^)]*\)/g, '')
      .replace(/\s+/g, '-')
      .replace(/\//g, '-')
      .replace(/-{2,}/g, '-')
      .replace(/^-|-$/g, '')
  );
}

const FONT_WEIGHT = {
  'Extra Bold': '800',
  'Bold':       '700',
  'Semi Bold':  '600',
  'Medium':     '500',
  'Regular':    '400',
};

// ─── Primitive color palettes ─────────────────────────────────────────────────
// e.g. palette('gray') → { '0': '#ffffff', '25': '#f4f6f5', ... }
function palette(key) {
  const group = Primitives[`color/${key}`];
  if (!group) return {};
  return Object.fromEntries(
    Object.entries(group).map(([stop, tok]) => [stop, resolve(tok.value)])
  );
}

// ─── Semantic colors → CSS var references ────────────────────────────────────
// Collects every CSS var whose name starts with --{prefix}-, strips the prefix,
// and returns a flat map suitable for a Tailwind `colors` sub-key.
//
// semanticGroup('color-surface') builds:
//   { 'standard-primary': 'var(--color-surface-standard-primary)',
//     'brand-bold-static': 'var(--color-surface-brand-bold-static)', ... }
//
// Resulting Tailwind classes:
//   bg-surface-standard-primary  bg-surface-brand-bold-static  etc.
function semanticGroup(prefix) {
  const map       = {};
  const cssPrefix = `--${prefix}-`;

  for (const [group, members] of Object.entries(Semantics)) {
    for (const [leafKey, leaf] of Object.entries(members)) {
      if (typeof leaf !== 'object' || leaf.type === undefined) continue;
      const varName = cssVar(group, leafKey);
      if (varName.startsWith(cssPrefix)) {
        map[varName.slice(cssPrefix.length)] = `var(${varName})`;
      }
    }
  }
  return map;
}

// ─── Spacing ─────────────────────────────────────────────────────────────────
// Tokens Studio semantic spacing: xs=2px, sm=4px, md=8px, lg=12px, xl=16px,
// 2xl=20px, 3xl=24px, 4xl=32px, 5xl=40px, 6xl=48px, 7xl=56px, 8xl=64px
function spacingScale() {
  const scale = {};
  for (const [key, tok] of Object.entries(Semantics['Spacing'] ?? {})) {
    scale[key] = resolve(tok.valuesByMode?.Light ?? tok.value);
  }
  return scale;
}

// ─── Border radius ────────────────────────────────────────────────────────────
function radiusScale() {
  const ALIAS = { default: 'DEFAULT', small: 'sm', large: 'lg', round: 'full' };
  const scale = { none: '0px' };
  for (const [key, tok] of Object.entries(Semantics['Radius'] ?? {})) {
    scale[ALIAS[key] ?? key] = resolve(tok.valuesByMode?.Light ?? tok.value);
  }
  return scale;
}

// ─── Font sizes paired with matching line heights ─────────────────────────────
// Title: h1=36px/40px  h2=30px/36px  h3=24px/32px  h4=20px/28px
// Body:  large=18px/28px  medium=16px/24px  small=14px/20px  caption=12px/16px
function fontSizeScale() {
  const TITLE_LH = { h1: '40px', h2: '36px', h3: '32px', h4: '28px' };
  const BODY_LH  = { large: '28px', medium: '24px', small: '20px', caption: '16px' };
  const scale    = {};

  for (const [key, tok] of Object.entries(Semantics['Font/size/title'] ?? {})) {
    scale[key] = [
      resolve(tok.valuesByMode?.Light ?? tok.value),
      { lineHeight: TITLE_LH[key] ?? 'normal' },
    ];
  }
  for (const [key, tok] of Object.entries(Semantics['Font/size/body'] ?? {})) {
    scale[key] = [
      resolve(tok.valuesByMode?.Light ?? tok.value),
      { lineHeight: BODY_LH[key] ?? 'normal' },
    ];
  }
  return scale;
}

// ─── Font weights ─────────────────────────────────────────────────────────────
function fontWeightScale() {
  const scale = {};
  for (const [key, tok] of Object.entries(Semantics['Font/weight'] ?? {})) {
    const raw = resolve(tok.valuesByMode?.Light ?? tok.value);
    scale[key] = FONT_WEIGHT[raw] ?? raw;
  }
  return scale;
}

// ─── Line heights ─────────────────────────────────────────────────────────────
function lineHeightScale() {
  const scale = {};
  for (const [key, tok] of Object.entries(Semantics['Font/line-height'] ?? {})) {
    scale[key] = resolve(tok.valuesByMode?.Light ?? tok.value);
  }
  return scale;
}

// ─── Border widths (Stroke Thickness) ────────────────────────────────────────
function borderWidthScale() {
  const scale = {};
  for (const [key, tok] of Object.entries(Semantics['Stroke Thickness'] ?? {})) {
    scale[key] = resolve(tok.valuesByMode?.Light ?? tok.value);
  }
  return scale;
}

// ─── Font family ──────────────────────────────────────────────────────────────
const fontFamily = resolve(
  Semantics['Font/family']?.family?.valuesByMode?.Light ?? 'Inter'
);

// ─── Config ───────────────────────────────────────────────────────────────────
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // ── Primitive palettes ──────────────────────────────────────────────
        // Use these when you need direct palette access (e.g. gray-900, brand-500)
        gray:    palette('gray'),
        blue:    palette('blue'),
        green:   palette('green'),
        red:     palette('red'),
        orange:  palette('orange'),
        brand:   palette('brand'),
        // Chart palettes
        purple:  palette('chart colors/purple'),
        lime:    palette('chart colors/lime'),
        magenta: palette('chart colors/magenta'),
        teal:    palette('chart colors/teal'),
        yellow:  palette('chart colors/yellow'),

        // ── Semantic tokens ─────────────────────────────────────────────────
        // Light/dark-aware via CSS custom properties (requires tokens.css loaded).
        // Requires `node build-tokens.js` to have been run to generate tokens.css,
        // and that file to be imported in your global stylesheet.
        //
        // Surface:  bg-surface-standard-primary   bg-surface-brand-bold-static
        //           bg-surface-brand-bold-hover    bg-surface-critical-soft-static
        surface: semanticGroup('color-surface'),

        // Border:   border-border-primary          border-border-brand
        //           border-border-critical          border-border-chart-1
        border:  semanticGroup('color-border'),

        // Text:     text-text-on-primary-standard  text-text-on-brand-bold
        //           text-text-brand-static          text-text-on-chart-1-bold
        text:    semanticGroup('color-text'),

        // Special overlay utilities (transparent, hover scrim, pressed scrim)
        special: semanticGroup('color-special'),
      },

      borderRadius: radiusScale(),
      // { none: '0px', sm: '4px', DEFAULT: '6px', lg: '8px', full: '999px' }

      spacing: spacingScale(),
      // { xs: '2px', sm: '4px', md: '8px', lg: '12px', xl: '16px',
      //   '2xl': '20px', '3xl': '24px', '4xl': '32px', '5xl': '40px',
      //   '6xl': '48px', '7xl': '56px', '8xl': '64px' }

      fontFamily: {
        sans: [fontFamily, 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },

      fontSize: fontSizeScale(),
      // { h1: ['36px', {lineHeight:'40px'}], h2: ['30px', {lineHeight:'36px'}],
      //   h3: ['24px', {lineHeight:'32px'}], h4: ['20px', {lineHeight:'28px'}],
      //   large: ['18px', ...], medium: ['16px', ...], small: ['14px', ...],
      //   caption: ['12px', {lineHeight:'16px'}] }

      fontWeight: fontWeightScale(),
      // { bold: '700', semibold: '600', medium: '500', regular: '400' }

      lineHeight: lineHeightScale(),
      // { '2xl': '40px', xl: '36px', lg: '32px', md: '28px',
      //   sm: '24px', xs: '20px', '2xs': '16px' }

      borderWidth: borderWidthScale(),
      // { primary: '1px', focused: '2px' }
    },
  },
  plugins: [],
};
