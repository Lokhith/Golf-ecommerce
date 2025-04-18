import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number as Indian Rupees
 * @param amount - The amount to format
 * @returns Formatted string with ₹ symbol
 */
export function formatIndianRupees(amount: number): string {
  // Convert to Indian format (e.g., ₹1,23,456.00)
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return formatter.format(amount)
}

/**
 * Convert USD to INR
 * @param usdAmount - Amount in USD
 * @returns Equivalent amount in INR (using fixed conversion rate)
 */
export function convertUSDtoINR(usdAmount: number): number {
  // Using a fixed conversion rate of 1 USD = 83 INR
  // In a production app, you would use an API to get the current rate
  const conversionRate = 83
  return Math.round(usdAmount * conversionRate)
}
