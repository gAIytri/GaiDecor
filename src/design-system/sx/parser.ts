/**
 * SX Parser - Converts sx props to Tailwind classes
 *
 * BRUTAL TRUTH: This is where the magic happens.
 *
 * Takes: { display: 'flex', gap: 4, bg: 'bg-white' }
 * Returns: "flex gap-4 bg-white"
 *
 * Supports:
 * - Responsive: { display: { base: 'block', md: 'flex' } }
 * - Pseudo: { '&:hover': { bg: 'bg-blue-500' } }
 * - Dark mode: { _dark: { bg: 'bg-gray-900' } }
 */

import type { SxProps, ResponsiveValue } from './mappings';
import { PROPERTY_ALIASES } from './mappings';

// ============================================================================
// HELPER: Check if value is responsive object
// ============================================================================

function isResponsiveValue<T>(value: any): value is { base?: T; sm?: T; md?: T; lg?: T; xl?: T; '2xl'?: T } {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    (value.base !== undefined ||
      value.sm !== undefined ||
      value.md !== undefined ||
      value.lg !== undefined ||
      value.xl !== undefined ||
      value['2xl'] !== undefined)
  );
}

// ============================================================================
// PROPERTY MAPPERS
// ============================================================================

/**
 * Map CSS property + value to Tailwind class
 */
function mapPropertyToClass(property: string, value: any): string[] {
  // Resolve aliases
  const resolvedProp = PROPERTY_ALIASES[property] || property;

  // Handle special cases
  switch (resolvedProp) {
    // DISPLAY
    case 'display':
      return [value === 'none' ? 'hidden' : value];

    // POSITION
    case 'position':
      return [value];

    // POSITIONING
    case 'top':
    case 'right':
    case 'bottom':
    case 'left':
      return [`${resolvedProp}-${value}`];

    case 'inset':
      return [`inset-${value}`];

    case 'zIndex':
      return [`z-${value}`];

    // OVERFLOW
    case 'overflow':
      return [`overflow-${value}`];
    case 'overflowX':
      return [`overflow-x-${value}`];
    case 'overflowY':
      return [`overflow-y-${value}`];

    // FLEXBOX
    case 'flex':
      return typeof value === 'number' ? [`flex-${value}`] : [value];

    case 'flexDirection':
      const dirMap: Record<string, string> = {
        row: 'flex-row',
        'row-reverse': 'flex-row-reverse',
        col: 'flex-col',
        column: 'flex-col',
        'column-reverse': 'flex-col-reverse',
      };
      return [dirMap[value] || `flex-${value}`];

    case 'flexWrap':
      return value === 'nowrap' ? ['flex-nowrap'] : [`flex-${value}`];

    case 'flexGrow':
      return value === 0 ? ['flex-grow-0'] : ['flex-grow'];

    case 'flexShrink':
      return value === 0 ? ['flex-shrink-0'] : ['flex-shrink'];

    case 'flexBasis':
      return [`basis-${value}`];

    case 'justifyContent':
      return [`justify-${value}`];

    case 'alignItems':
      return [`items-${value}`];

    case 'alignContent':
      return [`content-${value}`];

    case 'alignSelf':
      return [`self-${value}`];

    case 'gap':
      return [`gap-${value}`];

    case 'rowGap':
      return [`gap-y-${value}`];

    case 'columnGap':
      return [`gap-x-${value}`];

    // GRID
    case 'gridTemplateColumns':
      return typeof value === 'number' ? [`grid-cols-${value}`] : [value];

    case 'gridTemplateRows':
      return typeof value === 'number' ? [`grid-rows-${value}`] : [value];

    case 'gridColumn':
      return [`col-${value}`];

    case 'gridRow':
      return [`row-${value}`];

    case 'gridAutoFlow':
      return [`grid-flow-${value}`];

    // SPACING
    case 'margin':
      return [`m-${value}`];
    case 'marginTop':
      return [`mt-${value}`];
    case 'marginRight':
      return [`mr-${value}`];
    case 'marginBottom':
      return [`mb-${value}`];
    case 'marginLeft':
      return [`ml-${value}`];
    case 'marginX':
      return [`mx-${value}`];
    case 'marginY':
      return [`my-${value}`];

    case 'padding':
      return [`p-${value}`];
    case 'paddingTop':
      return [`pt-${value}`];
    case 'paddingRight':
      return [`pr-${value}`];
    case 'paddingBottom':
      return [`pb-${value}`];
    case 'paddingLeft':
      return [`pl-${value}`];
    case 'paddingX':
      return [`px-${value}`];
    case 'paddingY':
      return [`py-${value}`];

    // SIZING
    case 'width':
      return typeof value === 'number' ? [`w-${value}`] : [`w-${value}`];
    case 'height':
      return typeof value === 'number' ? [`h-${value}`] : [`h-${value}`];
    case 'minWidth':
      return [`min-w-${value}`];
    case 'maxWidth':
      return [`max-w-${value}`];
    case 'minHeight':
      return [`min-h-${value}`];
    case 'maxHeight':
      return [`max-h-${value}`];

    // TYPOGRAPHY
    case 'fontSize':
      return [`text-${value}`];

    case 'fontWeight':
      return [`font-${value}`];

    case 'fontFamily':
      return [`font-${value}`];

    case 'lineHeight':
      return [`leading-${value}`];

    case 'letterSpacing':
      return [`tracking-${value}`];

    case 'textAlign':
      return [`text-${value}`];

    case 'textTransform':
      const transformMap: Record<string, string> = {
        uppercase: 'uppercase',
        lowercase: 'lowercase',
        capitalize: 'capitalize',
        'normal-case': 'normal-case',
      };
      return [transformMap[value] || value];

    case 'textDecoration':
      const decorationMap: Record<string, string> = {
        underline: 'underline',
        overline: 'overline',
        'line-through': 'line-through',
        'no-underline': 'no-underline',
      };
      return [decorationMap[value] || value];

    case 'textColor':
    case 'color':
      // Value is already like "text-gray-600", use as-is
      return [value];

    case 'whiteSpace':
      return [`whitespace-${value}`];

    case 'wordBreak':
      return [`break-${value}`];

    // COLORS
    case 'backgroundColor':
      // Value is already like "bg-white", use as-is
      return [value];

    case 'bgGradient':
      return [value];

    // BORDERS
    case 'border':
      return value === true ? ['border'] : value === 0 ? ['border-0'] : [`border-${value}`];

    case 'borderTop':
      return value === true ? ['border-t'] : [`border-t-${value}`];

    case 'borderRight':
      return value === true ? ['border-r'] : [`border-r-${value}`];

    case 'borderBottom':
      return value === true ? ['border-b'] : [`border-b-${value}`];

    case 'borderLeft':
      return value === true ? ['border-l'] : [`border-l-${value}`];

    case 'borderX':
      return value === true ? ['border-x'] : [`border-x-${value}`];

    case 'borderY':
      return value === true ? ['border-y'] : [`border-y-${value}`];

    case 'borderWidth':
      return [`border-${value}`];

    case 'borderStyle':
      return [`border-${value}`];

    case 'borderColor':
      return [value];

    case 'borderRadius':
    case 'rounded':
      return [`rounded-${value}`];

    case 'roundedTop':
      return [`rounded-t-${value}`];

    case 'roundedRight':
      return [`rounded-r-${value}`];

    case 'roundedBottom':
      return [`rounded-b-${value}`];

    case 'roundedLeft':
      return [`rounded-l-${value}`];

    // EFFECTS
    case 'shadow':
    case 'boxShadow':
      return value === 'none' ? ['shadow-none'] : [`shadow-${value}`];

    case 'opacity':
      return [`opacity-${value}`];

    case 'cursor':
      return [`cursor-${value}`];

    case 'pointerEvents':
      return value === 'none' ? ['pointer-events-none'] : ['pointer-events-auto'];

    case 'userSelect':
      return [`select-${value}`];

    // BACKGROUNDS
    case 'bgImage':
      return [value];

    case 'bgSize':
      return [`bg-${value}`];

    case 'bgPosition':
      return [`bg-${value}`];

    case 'bgRepeat':
      return [`bg-${value}`];

    // TRANSITIONS
    case 'transition':
      return value === 'none' ? ['transition-none'] : [`transition-${value}`];

    case 'transitionDuration':
      return [`duration-${value}`];

    case 'transitionTiming':
      const timingMap: Record<string, string> = {
        linear: 'ease-linear',
        in: 'ease-in',
        out: 'ease-out',
        'in-out': 'ease-in-out',
      };
      return [timingMap[value] || value];

    case 'transitionDelay':
      return [`delay-${value}`];

    // TRANSFORMS
    case 'transform':
      return [value];

    case 'scale':
      return [`scale-${value}`];

    case 'rotate':
      return [`rotate-${value}`];

    case 'translateX':
      return [`translate-x-${value}`];

    case 'translateY':
      return [`translate-y-${value}`];

    // FILTERS
    case 'blur':
      return value === 'none' ? ['blur-none'] : [`blur-${value}`];

    case 'brightness':
      return [`brightness-${value}`];

    case 'contrast':
      return [`contrast-${value}`];

    case 'grayscale':
      return value === true ? ['grayscale'] : [`grayscale-${value}`];

    case 'backdropBlur':
      return value === 'none' ? ['backdrop-blur-none'] : [`backdrop-blur-${value}`];

    default:
      // Unknown property, return as-is (might be custom Tailwind class)
      return [value];
  }
}

// ============================================================================
// RESPONSIVE HANDLER
// ============================================================================

function handleResponsiveValue(property: string, value: ResponsiveValue<any>): string[] {
  if (!isResponsiveValue(value)) {
    // Simple value, map directly
    return mapPropertyToClass(property, value);
  }

  // Responsive value - generate classes for each breakpoint
  const classes: string[] = [];
  const breakpoints = ['base', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

  for (const bp of breakpoints) {
    const bpValue = value[bp];
    if (bpValue !== undefined) {
      const baseClasses = mapPropertyToClass(property, bpValue);
      if (bp === 'base') {
        classes.push(...baseClasses);
      } else {
        classes.push(...baseClasses.map((cls) => `${bp}:${cls}`));
      }
    }
  }

  return classes;
}

// ============================================================================
// PSEUDO-CLASS HANDLER
// ============================================================================

function handlePseudoClass(pseudo: string, styles: SxProps): string[] {
  const classes: string[] = [];

  // Map pseudo syntax to Tailwind prefix
  const pseudoMap: Record<string, string> = {
    '&:hover': 'hover',
    '&:focus': 'focus',
    '&:active': 'active',
    '&:disabled': 'disabled',
    '&:visited': 'visited',
    '&:first-child': 'first',
    '&:last-child': 'last',
    '&::before': 'before',
    '&::after': 'after',
  };

  const prefix = pseudoMap[pseudo];
  if (!prefix) return classes;

  // Parse nested styles
  const nestedClasses = parseSxToClasses(styles);

  // Add prefix to each class
  classes.push(...nestedClasses.map((cls) => `${prefix}:${cls}`));

  return classes;
}

// ============================================================================
// DARK MODE HANDLER
// ============================================================================

function handleDarkMode(styles: SxProps): string[] {
  const classes: string[] = [];
  const darkClasses = parseSxToClasses(styles);
  classes.push(...darkClasses.map((cls) => `dark:${cls}`));
  return classes;
}

// ============================================================================
// MAIN PARSER
// ============================================================================

export function parseSxToClasses(sx: SxProps): string[] {
  const classes: string[] = [];

  for (const [key, value] of Object.entries(sx)) {
    if (value === undefined || value === null) continue;

    // Handle pseudo-classes
    if (key.startsWith('&:') || key.startsWith('&::')) {
      classes.push(...handlePseudoClass(key, value as SxProps));
      continue;
    }

    // Handle dark mode
    if (key === '_dark') {
      classes.push(...handleDarkMode(value as SxProps));
      continue;
    }

    // Handle normal properties (with responsive support)
    classes.push(...handleResponsiveValue(key, value));
  }

  return classes;
}

/**
 * Main export: Convert sx object to className string
 */
export function sx(styles: SxProps): string {
  const classes = parseSxToClasses(styles);
  return classes.join(' ');
}
