import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

/**
 * Utility function to merge and conditionally join class names with Tailwind CSS support.
 * Combines the functionality of clsx and tailwind-merge.
 *
 * @param {...ClassValue[]} inputs - Class values to be merged
 * @returns {string} The merged class string
 *
 * @example
 * // Simple usage
 * cn('px-2 py-1', 'bg-red-500'); // 'px-2 py-1 bg-red-500'
 *
 * @example
 * // With conditionals
 * cn('btn', { 'btn-primary': isPrimary, 'btn-secondary': !isPrimary });
 *
 * @example
 * // With conflicting classes (tailwind-merge resolves conflicts)
 * cn('px-2 py-4', 'px-4'); // 'py-4 px-4'
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
