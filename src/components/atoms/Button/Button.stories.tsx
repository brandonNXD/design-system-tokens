/**
 * Button stories — Storybook v7/v8 CSF3 format
 *
 * Run: npx storybook dev -p 6006
 * Build: npx storybook build
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// ─── Demo icons ───────────────────────────────────────────────────────────────
// Inline SVGs so the stories have zero extra dependencies.

const PlusIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path
      d="M2 4h12M5 4V2.5A.5.5 0 015.5 2h5a.5.5 0 01.5.5V4M6 7v5M10 7v5M3 4l.9 8.5A1 1 0 004.9 13h6.2a1 1 0 001-0.9L13 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M2.5 8l4 4 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A polymorphic, fully token-driven button atom. All colors respond to light/dark
mode automatically via CSS custom properties generated from \`tokens.json\` by
\`sync-tokens.js\`.

**Variants**: \`primary\` · \`secondary\` · \`destructive\` · \`ghost\` · \`icon-only\`
**Sizes**: \`sm\` (36px) · \`md\` (40px) · \`lg\` (44px)
**Polymorphism**: Use \`as="a"\` for links, \`as={Link}\` for router links, etc.

**Token classes used:**
- \`bg-primary\` / \`text-on-primary\` / \`hover:bg-primary-hover\`
- \`bg-surface\` / \`border-border\` / \`text-foreground\`
- \`bg-destructive\` / \`text-on-destructive\`
- \`ring-ring\` (focus ring)
        `.trim(),
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive', 'ghost', 'icon-only'],
      description: 'Visual style. Maps to simplified semantic token names.',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Height and horizontal padding. sm=36px · md=40px · lg=44px.',
      table: { defaultValue: { summary: 'md' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents interaction and reduces opacity.',
      table: { defaultValue: { summary: 'false' } },
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows a spinner and disables the button. Label remains for layout stability.',
      table: { defaultValue: { summary: 'false' } },
    },
    children: {
      control: 'text',
      description: 'Label text (or icon node for icon-only).',
    },
    as: {
      control: false,
      description: 'Render as any HTML element or React component.',
    },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    isLoading: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  parameters: {
    docs: {
      description: { story: 'Use the controls panel to explore all combinations.' },
    },
  },
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  parameters: {
    docs: {
      description: {
        story: 'Five visual variants covering every use-case in the system.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="icon-only" aria-label="Add item">
        <PlusIcon />
      </Button>
    </div>
  ),
};

// ─── All Sizes ────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'All Sizes',
  parameters: {
    docs: {
      description: {
        story: 'Three sizes mapped directly from Figma token measurements.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-end gap-md">
      <Button size="sm">Small (36px)</Button>
      <Button size="md">Medium (40px)</Button>
      <Button size="lg">Large (44px)</Button>
    </div>
  ),
};

// ─── States ───────────────────────────────────────────────────────────────────

export const States: Story = {
  name: 'States',
  parameters: {
    docs: {
      description: {
        story: `
Hover and pressed states are CSS-driven (\`:hover\` / \`:active\`) and will
respond naturally in the browser. Disabled and loading are prop-driven.
        `.trim(),
      },
    },
  },
  render: () => {
    const variants = ['primary', 'secondary', 'destructive', 'ghost'] as const;
    const states: {
      label: string;
      props: Partial<React.ComponentProps<typeof Button>>;
    }[] = [
      { label: 'Default', props: {} },
      { label: 'Disabled', props: { disabled: true } },
      { label: 'Loading', props: { isLoading: true } },
    ];

    return (
      <div className="flex flex-col gap-xl">
        {/* Header row */}
        <div className="grid gap-md" style={{ gridTemplateColumns: '112px repeat(3, 120px)' }}>
          <span />
          {states.map((s) => (
            <span key={s.label} className="text-small font-medium text-foreground-muted text-center">
              {s.label}
            </span>
          ))}
        </div>

        {/* Variant rows */}
        {variants.map((variant) => (
          <div
            key={variant}
            className="grid items-center gap-md"
            style={{ gridTemplateColumns: '112px repeat(3, 120px)' }}
          >
            <span className="text-small text-foreground-muted capitalize">{variant}</span>
            {states.map((s) => (
              <div key={s.label} className="flex justify-center">
                <Button variant={variant} {...(s.props as object)}>
                  {variant === 'ghost' ? 'Ghost' : 'Label'}
                </Button>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
};

// ─── Icon-Only ────────────────────────────────────────────────────────────────

export const IconOnly: Story = {
  name: 'Icon Only',
  parameters: {
    docs: {
      description: {
        story: `
Square buttons with only an icon. **Always provide \`aria-label\`** for
accessibility. Sizes follow the same 36/40/44px scale.
      `.trim(),
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-lg">
      {/* Sizes */}
      <div className="flex flex-wrap items-end gap-md">
        <Button variant="icon-only" size="sm" aria-label="Add item (small)">
          <PlusIcon />
        </Button>
        <Button variant="icon-only" size="md" aria-label="Add item (medium)">
          <PlusIcon />
        </Button>
        <Button variant="icon-only" size="lg" aria-label="Add item (large)">
          <PlusIcon />
        </Button>
      </div>
      {/* Loading & disabled */}
      <div className="flex flex-wrap items-center gap-md">
        <Button variant="icon-only" aria-label="Loading example" isLoading />
        <Button variant="icon-only" aria-label="Disabled example" disabled>
          <PlusIcon />
        </Button>
      </div>
    </div>
  ),
};

// ─── With Icons ───────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  name: 'With Icons',
  parameters: {
    docs: {
      description: {
        story: 'Leading and trailing icons via `leftIcon` / `rightIcon` props.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-md">
      <div className="flex flex-wrap items-center gap-md">
        <Button variant="primary" leftIcon={<PlusIcon />}>
          Add Item
        </Button>
        <Button variant="primary" rightIcon={<ArrowRightIcon />}>
          Continue
        </Button>
        <Button variant="secondary" leftIcon={<CheckIcon />}>
          Confirm
        </Button>
        <Button variant="destructive" leftIcon={<TrashIcon />}>
          Delete
        </Button>
        <Button variant="ghost" rightIcon={<ArrowRightIcon />}>
          Learn more
        </Button>
      </div>
      {/* Loading hides left icon gracefully */}
      <div className="flex flex-wrap items-center gap-md">
        <Button variant="primary" isLoading leftIcon={<PlusIcon />}>
          Adding…
        </Button>
      </div>
    </div>
  ),
};

// ─── Polymorphic (as anchor) ──────────────────────────────────────────────────

export const AsAnchor: Story = {
  name: 'As Anchor',
  parameters: {
    docs: {
      description: {
        story: `
Use \`as="a"\` to render a link with full button styling.
Non-button elements receive \`aria-disabled\` instead of the \`disabled\` attribute.
      `.trim(),
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <Button as="a" href="#" variant="primary">
        Go to dashboard
      </Button>
      <Button as="a" href="#" variant="secondary">
        View details
      </Button>
      <Button as="a" href="#" variant="ghost" rightIcon={<ArrowRightIcon />}>
        Learn more
      </Button>
      <Button as="a" href="#" variant="primary" disabled>
        Disabled link
      </Button>
    </div>
  ),
};

// ─── Dark mode ────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  name: 'Dark Mode',
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story:
          'All tokens switch automatically when the `dark` class is on `<html>`. ' +
          'Toggle dark mode in the toolbar to preview.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="dark p-xl rounded bg-background">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="icon-only" aria-label="Add">
        <PlusIcon />
      </Button>
    </div>
  ),
};

// ─── Individual named stories (for easy deep-linking) ────────────────────────

export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Destructive' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
};

export const Loading: Story = {
  args: { isLoading: true, children: 'Saving…' },
};
