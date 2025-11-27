/**
 * Utility classes for consistent styling
 * This file provides reusable Tailwind class combinations
 */

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const utils = {
  // Layout utilities
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-20 relative z-20',

  // Typography utilities
  heading: {
    h1: 'text-4xl sm:text-5xl md:text-6xl font-bold',
    h2: 'text-3xl font-bold mb-4',
    h3: 'text-2xl font-semibold',
    h4: 'text-xl font-semibold',
    subtitle: 'text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto',
  },

  // Component utilities
  card: 'bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg',

  // Button utilities
  button: {
    primary: 'px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all',
    secondary: 'px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all',
    outline: 'px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 font-medium rounded-lg transition-all',
    icon: 'p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
  },

  // Form utilities
  form: {
    input: 'w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white',
    label: 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1',
    error: 'mt-1 text-sm text-red-600 dark:text-red-400',
  },

  // Flex utilities
  flex: {
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    col: 'flex flex-col',
    colCenter: 'flex flex-col items-center',
  },

  // Grid utilities
  grid: {
    responsive: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
    responsive2: 'grid grid-cols-1 lg:grid-cols-2 gap-12',
    responsive4: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8',
  },

  // Transition utilities
  transition: 'transition-all duration-300 ease-in-out',

  // Text utilities
  text: {
    primary: 'text-gray-900 dark:text-white',
    secondary: 'text-gray-600 dark:text-gray-300',
    accent: 'text-blue-600 dark:text-blue-400',
  },
};