import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number as Rwandan Francs currency
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, options?: {
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}): string {
  const { minimumFractionDigits = 0, maximumFractionDigits = 2 } = options || {}

  return new Intl.NumberFormat('rw-RW', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount)
}
