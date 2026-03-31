import React, { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cn } from '../../../lib/utils';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, hint, className, id: idProp, ...rest }, ref) => {
    const generatedId = useId();
    const id = idProp ?? generatedId;

    return (
      <div className="flex flex-col gap-sm w-full">
        {label && (
          <label
            htmlFor={id}
            className="text-small font-medium text-foreground"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={id}
          className={cn(
            // Layout
            'w-full h-10 px-lg',
            // Shape
            'rounded border border-border',
            // Colors
            'bg-background text-foreground',
            'placeholder:text-foreground-disabled',
            // Focus
            'outline-none',
            'focus:ring-2 focus:ring-ring focus:ring-offset-0 focus:border-transparent',
            // Invalid state
            error && 'border-border-destructive focus:ring-border-destructive',
            // Transitions
            'transition-colors duration-150',
            className,
          )}
          aria-describedby={
            [error && `${id}-error`, hint && `${id}-hint`]
              .filter(Boolean)
              .join(' ') || undefined
          }
          aria-invalid={error ? true : undefined}
          {...rest}
        />

        {hint && !error && (
          <p id={`${id}-hint`} className="text-caption text-foreground-muted">
            {hint}
          </p>
        )}
        {error && (
          <p id={`${id}-error`} className="text-caption text-foreground-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
