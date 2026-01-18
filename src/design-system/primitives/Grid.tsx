/**
 * Grid Component - CSS Grid Made Easy
 *
 * <Grid sx={{
 *   gridTemplateColumns: 4,  // or { base: 1, md: 2, lg: 4 }
 *   gap: 6
 * }}>
 */

import { forwardRef } from 'react';
import { Box } from './Box';
import type { BoxProps } from './Box';

export type GridProps = BoxProps;

export const Grid = forwardRef<HTMLElement, GridProps>(
  ({ sx, ...rest }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          display: 'grid',
          ...sx,
        }}
        {...rest}
      />
    );
  }
);

Grid.displayName = 'Grid';
