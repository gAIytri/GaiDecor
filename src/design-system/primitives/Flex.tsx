/**
 * Flex Component - Flexbox Made Easy
 *
 * <Flex sx={{
 *   align: 'center',
 *   justify: 'between',
 *   gap: 4,
 *   p: 6
 * }}>
 */

import { forwardRef } from 'react';
import { Box } from './Box';
import type { BoxProps } from './Box';

export type FlexProps = BoxProps;

export const Flex = forwardRef<HTMLElement, FlexProps>(
  ({ sx, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          ...sx,
        }}
        {...rest}
      />
    );
  }
);

Flex.displayName = 'Flex';
