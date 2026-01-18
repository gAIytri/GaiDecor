/**
 * Text Component - Typography
 *
 * <Text sx={{
 *   fontSize: 'lg',
 *   fontWeight: 'bold',
 *   color: 'text-gray-900'
 * }}>
 */

import { forwardRef } from 'react';
import { Box } from './Box';
import type { BoxProps } from './Box';

export interface TextProps extends Omit<BoxProps, 'as'> {
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'code' | 'pre';
}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ as = 'p', ...rest }, ref) => {
    return <Box ref={ref} as={as} {...rest} />;
  }
);

Text.displayName = 'Text';

/**
 * Heading Component
 */
export interface HeadingProps extends Omit<TextProps, 'as'> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const headingSizes = {
  h1: '5xl',
  h2: '4xl',
  h3: '3xl',
  h4: '2xl',
  h5: 'xl',
  h6: 'lg',
} as const;

export const Heading = forwardRef<HTMLElement, HeadingProps>(
  ({ as = 'h2', sx, ...rest }, ref) => {
    const defaultSize = headingSizes[as as keyof typeof headingSizes];
    return (
      <Text
        ref={ref}
        as={as}
        sx={{
          fontSize: defaultSize,
          fontWeight: 'bold',
          ...sx,
        }}
        {...rest}
      />
    );
  }
);

Heading.displayName = 'Heading';
