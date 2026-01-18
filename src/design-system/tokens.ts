/**
 * Design Tokens
 *
 * BRUTAL TRUTH: Your current code has magic numbers everywhere.
 * This file centralizes ALL spacing, sizing, colors, etc.
 *
 * Rules:
 * 1. NEVER use arbitrary values like "px-4" directly in components
 * 2. ALWAYS reference tokens
 * 3. If you need a new size, ADD IT HERE FIRST
 */

// Spacing Scale (rem-based for accessibility)
// Maps directly to Tailwind: space-1 = 0.25rem = 4px
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
} as const;

// Typography Scale
export const fontSize = {
  xs: '0.75rem',     // 12px
  sm: '0.875rem',    // 14px
  base: '1rem',      // 16px
  lg: '1.125rem',    // 18px
  xl: '1.25rem',     // 20px
  '2xl': '1.5rem',   // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px
} as const;

export const fontWeight = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const;

export const lineHeight = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} as const;

// Border Radius
export const radius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',
} as const;

// Component Sizes (for buttons, inputs, etc.)
export const sizes = {
  xs: {
    height: '1.5rem',    // 24px
    px: spacing[2],
    py: spacing[1],
    fontSize: fontSize.xs,
  },
  sm: {
    height: '2rem',      // 32px
    px: spacing[3],
    py: spacing[1],
    fontSize: fontSize.sm,
  },
  md: {
    height: '2.5rem',    // 40px
    px: spacing[4],
    py: spacing[2],
    fontSize: fontSize.base,
  },
  lg: {
    height: '3rem',      // 48px
    px: spacing[6],
    py: spacing[3],
    fontSize: fontSize.lg,
  },
  xl: {
    height: '3.5rem',    // 56px
    px: spacing[8],
    py: spacing[4],
    fontSize: fontSize.xl,
  },
} as const;

// Z-Index Scale (avoid z-index hell)
export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  toast: 80,
} as const;

// Breakpoints (mobile-first)
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Container Widths
export const containerWidth = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  full: '100%',
} as const;

// Transitions
export const transition = {
  fast: '150ms',
  base: '200ms',
  slow: '300ms',
  slower: '500ms',
} as const;

// Animation Easings
export const easing = {
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// Shadows
export const shadow = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const;

// Colors (semantic naming - YOUR CURRENT COLORS SUCK because they're not semantic)
export const colors = {
  // Primary
  primary: {
    dark: '#072D1F',
    main: '#29B770',      // primary-emerald
    light: '#98C7AC',     // secondary-mint
    lighter: '#E0E9CC',   // secondary-mint-light
  },
  // Neutrals
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#030712',
  },
  // Semantic colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  // Background
  bg: {
    primary: '#FFFFFF',
    secondary: '#F4F4F4',
    dark: '#111111',
  },
} as const;

// Export type helpers
export type Spacing = keyof typeof spacing;
export type FontSize = keyof typeof fontSize;
export type FontWeight = keyof typeof fontWeight;
export type Radius = keyof typeof radius;
export type Size = keyof typeof sizes;
export type ZIndex = keyof typeof zIndex;
export type Shadow = keyof typeof shadow;
