/**
 * Box Component - The Most Fundamental Building Block
 *
 * BRUTAL TRUTH: 90% of your divs should be <Box>
 *
 * NEW sx prop syntax (NO MORE className on pages!):
 *
 * <Box sx={{
 *   p: 4,
 *   m: 2,
 *   bg: 'bg-white',
 *   rounded: 'lg',
 *   display: { base: 'block', md: 'flex' },
 *   '&:hover': { bg: 'bg-gray-100' }
 * }}>
 *   Content
 * </Box>
 */

import { forwardRef } from 'react';
import type { ElementType } from 'react';
import { cn } from '../utils';
import { sx as sxParser } from '../sx/parser';
import type { SxProps } from '../sx/mappings';

export interface BoxProps {
  /** React children */
  children?: React.ReactNode;
  /**
   * Style props using sx system
   * NO MORE className strings!
   */
  sx?: SxProps;
  /**
   * Optional className for edge cases
   * (try to avoid, use sx instead)
   */
  className?: string;
  /**
   * Render as different HTML element
   * @default 'div'
   */
  as?: ElementType;
  /** HTML id */
  id?: string;
  /** Accessibility label */
  'aria-label'?: string;
  /** Test ID */
  'data-testid'?: string;
  /** Click handler */
  onClick?: (e: React.MouseEvent) => void;
  /** Mouse enter */
  onMouseEnter?: (e: React.MouseEvent) => void;
  /** Mouse leave */
  onMouseLeave?: (e: React.MouseEvent) => void;
  /** Any other HTML props */
  [key: string]: any;
}

export const Box = forwardRef<HTMLElement, BoxProps>(
  (
    {
      as: Component = 'div',
      children,
      sx,
      className,
      ...rest
    },
    ref
  ) => {
    // Convert sx to classes
    const sxClasses = sx ? sxParser(sx) : '';

    return (
      <Component
        ref={ref}
        className={cn(sxClasses, className)}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

Box.displayName = 'Box';
