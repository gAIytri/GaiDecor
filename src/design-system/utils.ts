/**
 * Design System Utilities
 *
 * BRUTAL TRUTH: This is where the magic happens.
 * These functions convert semantic props to Tailwind classes.
 *
 * Example: <Box p={4} m={2} /> → "p-4 m-2"
 */

import { spacing as _spacing } from './tokens';
import type {
  SpacingProps,
  LayoutProps,
  FlexProps,
  GridProps,
  BorderProps,
  TypographyProps,
  BackgroundProps,
  ShadowProps,
  InteractiveProps,
} from './types';

/**
 * Combines class names, filtering out falsy values
 * BRUTAL LESSON: clsx is better, but this works
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Convert spacing props to Tailwind classes
 */
export function getSpacingClasses(props: SpacingProps): string {
  const classes: string[] = [];

  // Margin
  if (props.m !== undefined) classes.push(`m-${props.m}`);
  if (props.mt !== undefined) classes.push(`mt-${props.mt}`);
  if (props.mr !== undefined) classes.push(`mr-${props.mr}`);
  if (props.mb !== undefined) classes.push(`mb-${props.mb}`);
  if (props.ml !== undefined) classes.push(`ml-${props.ml}`);
  if (props.mx !== undefined) classes.push(`mx-${props.mx}`);
  if (props.my !== undefined) classes.push(`my-${props.my}`);

  // Padding
  if (props.p !== undefined) classes.push(`p-${props.p}`);
  if (props.pt !== undefined) classes.push(`pt-${props.pt}`);
  if (props.pr !== undefined) classes.push(`pr-${props.pr}`);
  if (props.pb !== undefined) classes.push(`pb-${props.pb}`);
  if (props.pl !== undefined) classes.push(`pl-${props.pl}`);
  if (props.px !== undefined) classes.push(`px-${props.px}`);
  if (props.py !== undefined) classes.push(`py-${props.py}`);

  return classes.join(' ');
}

/**
 * Convert layout props to Tailwind classes
 */
export function getLayoutClasses(props: LayoutProps): string {
  const classes: string[] = [];

  if (props.w !== undefined) {
    classes.push(typeof props.w === 'number' ? `w-${props.w}` : props.w);
  }
  if (props.minW !== undefined) {
    classes.push(typeof props.minW === 'number' ? `min-w-${props.minW}` : props.minW);
  }
  if (props.maxW !== undefined) {
    classes.push(typeof props.maxW === 'number' ? `max-w-${props.maxW}` : props.maxW);
  }
  if (props.h !== undefined) {
    classes.push(typeof props.h === 'number' ? `h-${props.h}` : props.h);
  }
  if (props.minH !== undefined) {
    classes.push(typeof props.minH === 'number' ? `min-h-${props.minH}` : props.minH);
  }
  if (props.maxH !== undefined) {
    classes.push(typeof props.maxH === 'number' ? `max-h-${props.maxH}` : props.maxH);
  }
  if (props.display !== undefined) classes.push(props.display);
  if (props.position !== undefined) classes.push(props.position);
  if (props.zIndex !== undefined) classes.push(`z-${props.zIndex}`);
  if (props.overflow !== undefined) classes.push(`overflow-${props.overflow}`);
  if (props.overflowX !== undefined) classes.push(`overflow-x-${props.overflowX}`);
  if (props.overflowY !== undefined) classes.push(`overflow-y-${props.overflowY}`);

  return classes.join(' ');
}

/**
 * Convert flex props to Tailwind classes
 */
export function getFlexClasses(props: FlexProps): string {
  const classes: string[] = [];

  if (props.direction !== undefined) {
    const dirMap = {
      row: 'flex-row',
      'row-reverse': 'flex-row-reverse',
      column: 'flex-col',
      'column-reverse': 'flex-col-reverse',
    };
    classes.push(dirMap[props.direction]);
  }

  if (props.justify !== undefined) {
    const justifyMap = {
      start: 'justify-start',
      end: 'justify-end',
      center: 'justify-center',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    };
    classes.push(justifyMap[props.justify]);
  }

  if (props.align !== undefined) {
    const alignMap = {
      start: 'items-start',
      end: 'items-end',
      center: 'items-center',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    };
    classes.push(alignMap[props.align]);
  }

  if (props.wrap !== undefined) {
    const wrapMap = {
      nowrap: 'flex-nowrap',
      wrap: 'flex-wrap',
      'wrap-reverse': 'flex-wrap-reverse',
    };
    classes.push(wrapMap[props.wrap]);
  }

  if (props.gap !== undefined) classes.push(`gap-${props.gap}`);
  if (props.rowGap !== undefined) classes.push(`gap-y-${props.rowGap}`);
  if (props.columnGap !== undefined) classes.push(`gap-x-${props.columnGap}`);

  if (props.grow !== undefined) {
    classes.push(props.grow === true ? 'flex-grow' : `flex-grow-${props.grow}`);
  }
  if (props.shrink !== undefined) {
    classes.push(props.shrink === true ? 'flex-shrink' : `flex-shrink-${props.shrink}`);
  }
  if (props.basis !== undefined) {
    classes.push(typeof props.basis === 'string' ? props.basis : `basis-${props.basis}`);
  }

  return classes.join(' ');
}

/**
 * Convert grid props to Tailwind classes
 */
export function getGridClasses(props: GridProps): string {
  const classes: string[] = [];

  if (props.columns !== undefined) {
    classes.push(
      typeof props.columns === 'number'
        ? `grid-cols-${props.columns}`
        : props.columns
    );
  }
  if (props.rows !== undefined) {
    classes.push(
      typeof props.rows === 'number' ? `grid-rows-${props.rows}` : props.rows
    );
  }

  if (props.gap !== undefined) classes.push(`gap-${props.gap}`);
  if (props.rowGap !== undefined) classes.push(`gap-y-${props.rowGap}`);
  if (props.columnGap !== undefined) classes.push(`gap-x-${props.columnGap}`);

  if (props.align !== undefined) {
    const alignMap = {
      start: 'items-start',
      end: 'items-end',
      center: 'items-center',
      stretch: 'items-stretch',
    };
    classes.push(alignMap[props.align]);
  }

  if (props.justify !== undefined) {
    const justifyMap = {
      start: 'justify-items-start',
      end: 'justify-items-end',
      center: 'justify-items-center',
      stretch: 'justify-items-stretch',
    };
    classes.push(justifyMap[props.justify]);
  }

  return classes.join(' ');
}

/**
 * Convert border props to Tailwind classes
 */
export function getBorderClasses(props: BorderProps): string {
  const classes: string[] = [];

  if (props.border !== undefined) {
    classes.push(props.border === true ? 'border' : `border-${props.border}`);
  }
  if (props.borderTop !== undefined) {
    classes.push(props.borderTop === true ? 'border-t' : `border-t-${props.borderTop}`);
  }
  if (props.borderRight !== undefined) {
    classes.push(
      props.borderRight === true ? 'border-r' : `border-r-${props.borderRight}`
    );
  }
  if (props.borderBottom !== undefined) {
    classes.push(
      props.borderBottom === true ? 'border-b' : `border-b-${props.borderBottom}`
    );
  }
  if (props.borderLeft !== undefined) {
    classes.push(
      props.borderLeft === true ? 'border-l' : `border-l-${props.borderLeft}`
    );
  }

  if (props.rounded !== undefined) classes.push(`rounded-${props.rounded}`);
  if (props.roundedTop !== undefined) classes.push(`rounded-t-${props.roundedTop}`);
  if (props.roundedBottom !== undefined)
    classes.push(`rounded-b-${props.roundedBottom}`);
  if (props.roundedLeft !== undefined) classes.push(`rounded-l-${props.roundedLeft}`);
  if (props.roundedRight !== undefined) classes.push(`rounded-r-${props.roundedRight}`);

  return classes.join(' ');
}

/**
 * Convert typography props to Tailwind classes
 */
export function getTypographyClasses(props: TypographyProps): string {
  const classes: string[] = [];

  if (props.size !== undefined) classes.push(`text-${props.size}`);
  if (props.weight !== undefined) classes.push(`font-${props.weight}`);
  if (props.lineHeight !== undefined) classes.push(`leading-${props.lineHeight}`);
  if (props.align !== undefined) classes.push(`text-${props.align}`);
  if (props.transform !== undefined) {
    const transformMap = {
      none: 'normal-case',
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
    };
    classes.push(transformMap[props.transform]);
  }
  if (props.decoration !== undefined) {
    const decorationMap = {
      none: 'no-underline',
      underline: 'underline',
      'line-through': 'line-through',
    };
    classes.push(decorationMap[props.decoration]);
  }
  if (props.color !== undefined) classes.push(props.color);
  if (props.truncate) classes.push('truncate');
  if (props.noOfLines !== undefined) {
    classes.push(`line-clamp-${props.noOfLines}`);
  }

  return classes.join(' ');
}

/**
 * Convert background props to Tailwind classes
 */
export function getBackgroundClasses(props: BackgroundProps): string {
  const classes: string[] = [];

  if (props.bg !== undefined) classes.push(props.bg);
  if (props.bgGradient !== undefined) classes.push(props.bgGradient);
  if (props.bgImage !== undefined) classes.push(props.bgImage);
  if (props.bgSize !== undefined) classes.push(`bg-${props.bgSize}`);
  if (props.bgPosition !== undefined) classes.push(`bg-${props.bgPosition}`);
  if (props.bgRepeat !== undefined) classes.push(`bg-${props.bgRepeat}`);

  return classes.join(' ');
}

/**
 * Convert shadow props to Tailwind classes
 */
export function getShadowClasses(props: ShadowProps): string {
  const classes: string[] = [];

  if (props.shadow !== undefined) {
    classes.push(props.shadow === 'none' ? 'shadow-none' : `shadow-${props.shadow}`);
  }

  return classes.join(' ');
}

/**
 * Convert interactive props to Tailwind classes
 */
export function getInteractiveClasses(props: InteractiveProps): string {
  const classes: string[] = [];

  if (props.cursor !== undefined) classes.push(`cursor-${props.cursor}`);
  if (props.userSelect !== undefined) classes.push(`select-${props.userSelect}`);
  if (props.pointerEvents !== undefined) {
    classes.push(props.pointerEvents === 'none' ? 'pointer-events-none' : '');
  }

  return classes.join(' ');
}

/**
 * MASTER FUNCTION: Combine all style props
 */
export function getStyleClasses(props: any): string {
  return cn(
    getSpacingClasses(props),
    getLayoutClasses(props),
    getBorderClasses(props),
    getBackgroundClasses(props),
    getShadowClasses(props),
    getInteractiveClasses(props)
  );
}

/**
 * Helper to extract only valid HTML attributes from props
 * BRUTAL LESSON: Don't pass custom props to DOM elements
 */
export function filterDOMProps<T extends Record<string, any>>(
  props: T,
  exclude: string[] = []
): Partial<T> {
  const validHTMLProps = [
    'id',
    'className',
    'style',
    'onClick',
    'onMouseEnter',
    'onMouseLeave',
    'onFocus',
    'onBlur',
    'aria-label',
    'aria-describedby',
    'data-testid',
    'role',
    'tabIndex',
  ];

  const filtered: any = {};
  Object.keys(props).forEach((key) => {
    if (validHTMLProps.includes(key) && !exclude.includes(key)) {
      filtered[key] = props[key];
    }
  });

  return filtered;
}
