/**
 * cn — merges conditional class names (clsx) and then resolves any
 * conflicting Tailwind utility classes so the last one wins (tailwind-merge).
 * Used by every component in this project to combine its own default
 * classes with a caller-supplied `className` prop safely.
 *
 * Usage:
 *   <div className={cn("px-2 py-1", isActive && "bg-accent", className)} />
 *
 * Depends on: nothing else in this project (needs the `clsx` and
 * `tailwind-merge` npm packages).
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
