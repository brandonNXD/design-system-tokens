import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind classes safely, resolving conflicts via tailwind-merge
 * and handling conditional classes via clsx.
 *
 * @example
 * cn('px-xl text-small', isActive && 'bg-surface-brand-bold-static')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
