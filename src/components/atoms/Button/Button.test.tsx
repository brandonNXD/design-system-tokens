/**
 * Button unit tests
 *
 * Setup requirements (if not already configured):
 *   npm install -D @testing-library/react @testing-library/user-event
 *              @testing-library/jest-dom jest jest-environment-jsdom
 *
 * Add to jest.config.ts / vitest.config.ts:
 *   setupFilesAfterFramework: ['@testing-library/jest-dom']
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';
import { buttonVariants } from './Button';

// ─── Rendering ────────────────────────────────────────────────────────────────

describe('Button — rendering', () => {
  it('renders a <button> element by default', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('renders its children as the visible label', () => {
    render(<Button>Save changes</Button>);
    expect(screen.getByText('Save changes')).toBeInTheDocument();
  });

  it('forwards a ref to the underlying element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref test</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('spreads arbitrary HTML attributes onto the root element', () => {
    render(<Button data-testid="my-btn">Click</Button>);
    expect(screen.getByTestId('my-btn')).toBeInTheDocument();
  });
});

// ─── Polymorphism ─────────────────────────────────────────────────────────────

describe('Button — polymorphism (as prop)', () => {
  it('renders as an <a> when as="a"', () => {
    render(
      <Button as="a" href="/dashboard">
        Dashboard
      </Button>
    );
    const link = screen.getByRole('link', { name: 'Dashboard' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/dashboard');
  });

  it('renders as a <div> when as="div"', () => {
    render(<Button as="div">Div button</Button>);
    const el = screen.getByText('Div button').closest('div');
    expect(el).toBeInTheDocument();
  });

  it('sets aria-disabled on non-button elements when disabled', () => {
    render(
      <Button as="a" href="#" disabled>
        Link
      </Button>
    );
    expect(screen.getByRole('link')).toHaveAttribute('aria-disabled', 'true');
  });
});

// ─── Variants ────────────────────────────────────────────────────────────────

describe('Button — variants', () => {
  it.each([
    ['primary',     'bg-primary'],
    ['secondary',   'bg-surface'],
    ['destructive', 'bg-destructive'],
    ['ghost',       'bg-transparent'],
    ['icon-only',   'bg-primary'],
  ] as const)('applies correct bg class for variant "%s"', (variant, expectedClass) => {
    render(
      <Button variant={variant} aria-label="test">
        X
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass(expectedClass);
  });

  it('applies border class for secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-border');
  });

  it('applies text-on-primary class for primary variant', () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-on-primary');
  });

  it('applies text-on-destructive class for destructive variant', () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-on-destructive');
  });

  it('applies text-foreground class for ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-foreground');
  });
});

// ─── Sizes ───────────────────────────────────────────────────────────────────

describe('Button — sizes', () => {
  it.each([
    ['sm', 'h-9',  'px-lg'],
    ['md', 'h-10', 'px-xl'],
    ['lg', 'h-11', 'px-4xl'],
  ] as const)('size "%s" applies height "%s" and padding "%s"', (size, height, padding) => {
    render(<Button size={size}>Label</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass(height);
    expect(btn).toHaveClass(padding);
  });

  it('icon-only size="md" renders as a square (w-10 h-10)', () => {
    render(
      <Button variant="icon-only" size="md" aria-label="Close">
        ✕
      </Button>
    );
    const btn = screen.getByRole('button', { name: 'Close' });
    expect(btn).toHaveClass('h-10');
    expect(btn).toHaveClass('w-10');
  });

  it('icon-only removes horizontal padding (p-0)', () => {
    render(
      <Button variant="icon-only" aria-label="Close">
        ✕
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass('p-0');
  });
});

// ─── Disabled state ───────────────────────────────────────────────────────────

describe('Button — disabled', () => {
  it('is disabled via the disabled prop', () => {
    render(<Button disabled>Save</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies opacity and cursor classes when disabled', () => {
    render(<Button disabled>Save</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('disabled:opacity-50');
    expect(btn).toHaveClass('disabled:cursor-not-allowed');
  });

  it('does not fire onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});

// ─── Loading state ────────────────────────────────────────────────────────────

describe('Button — isLoading', () => {
  it('disables the button when isLoading=true', () => {
    render(<Button isLoading>Saving…</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders the spinner SVG', () => {
    render(<Button isLoading>Saving…</Button>);
    expect(document.querySelector('svg.animate-spin')).toBeInTheDocument();
  });

  it('keeps the label visible while loading', () => {
    render(<Button isLoading>Saving…</Button>);
    expect(screen.getByText('Saving…')).toBeInTheDocument();
  });

  it('sets data-loading attribute when loading', () => {
    render(<Button isLoading>Saving…</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-loading');
  });
});

// ─── Icons ────────────────────────────────────────────────────────────────────

describe('Button — icons', () => {
  it('renders a leftIcon slot', () => {
    render(
      <Button leftIcon={<span data-testid="left-icon" />}>Add</Button>
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders a rightIcon slot', () => {
    render(
      <Button rightIcon={<span data-testid="right-icon" />}>Continue</Button>
    );
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('hides leftIcon while loading', () => {
    render(
      <Button isLoading leftIcon={<span data-testid="left-icon" />}>
        Save
      </Button>
    );
    expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
  });

  it('does not render rightIcon in icon-only variant', () => {
    render(
      <Button variant="icon-only" rightIcon={<span data-testid="right-icon" />} aria-label="Add">
        +
      </Button>
    );
    expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument();
  });
});

// ─── Interaction ──────────────────────────────────────────────────────────────

describe('Button — interaction', () => {
  it('fires onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is keyboard-accessible via Enter key', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Keyboard</Button>);
    screen.getByRole('button').focus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

// ─── className merging ────────────────────────────────────────────────────────

describe('Button — className', () => {
  it('merges custom className without breaking variant classes', () => {
    render(<Button className="my-custom-class">Save</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('my-custom-class');
    expect(btn).toHaveClass('bg-primary'); // primary default
  });
});

// ─── buttonVariants utility ───────────────────────────────────────────────────

describe('buttonVariants helper', () => {
  it('returns a string of classes', () => {
    const classes = buttonVariants({ variant: 'primary', size: 'md' });
    expect(typeof classes).toBe('string');
    expect(classes).toContain('bg-primary');
    expect(classes).toContain('h-10');
  });

  it('applies default variant and size when no args passed', () => {
    const classes = buttonVariants();
    expect(classes).toContain('bg-primary'); // primary default
    expect(classes).toContain('h-10');        // md default
  });

  it('returns destructive-specific classes for destructive variant', () => {
    const classes = buttonVariants({ variant: 'destructive' });
    expect(classes).toContain('bg-destructive');
    expect(classes).toContain('text-on-destructive');
  });

  it('returns focus ring class referencing ring token', () => {
    const classes = buttonVariants({ variant: 'primary' });
    expect(classes).toContain('focus-visible:ring-ring');
  });
});
