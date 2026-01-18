/**
 * Stack Component - Vertical or Horizontal Spacing
 *
 * BRUTAL TRUTH: You write "flex flex-col gap-4" 1000 times.
 * STOP IT. Use Stack.
 *
 * Before: <div className="flex flex-col gap-4">
 * After:  <Stack gap={4}>
 *
 * Before: <div className="flex flex-row gap-2">
 * After:  <Stack direction="row" gap={2}>
 */

import { forwardRef } from 'react';
import type { ElementType } from 'react';
import { Flex } from './Flex';
import type { FlexProps } from './Flex';
import React from 'react';
import { Box } from './Box';

export interface StackProps extends Omit<FlexProps, 'direction'> {
  /**
   * Stack direction
   * @default 'column'
   */
  direction?: 'row' | 'column';
  /**
   * Spacing between items
   * @default 4
   */
  spacing?: FlexProps['gap'];
  /**
   * Divider between items
   */
  divider?: React.ReactNode;
}

export const Stack = forwardRef<HTMLElement, StackProps>(
  (
    {
      direction = 'column',
      spacing,
      gap,
      divider,
      children,
      ...rest
    },
    ref
  ) => {
    const actualGap = spacing ?? gap ?? 4;

    // If divider is provided, wrap children
    const content = divider
      ? React.Children.toArray(children).reduce<React.ReactNode[]>(
          (acc, child, index, array) => {
            acc.push(child);
            if (index < array.length - 1) {
              acc.push(
                <Box key={`divider-${index}`}>{divider}</Box>
              );
            }
            return acc;
          },
          []
        )
      : children;

    return (
      <Flex
        ref={ref}
        direction={direction === 'row' ? 'row' : 'column'}
        gap={actualGap}
        {...rest}
      >
        {content}
      </Flex>
    );
  }
);

Stack.displayName = 'Stack';

/**
 * VStack - Vertical Stack (alias)
 */
export const VStack = forwardRef<HTMLElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="column" {...props} />
);

VStack.displayName = 'VStack';

/**
 * HStack - Horizontal Stack (alias)
 */
export const HStack = forwardRef<HTMLElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="row" {...props} />
);

HStack.displayName = 'HStack';
