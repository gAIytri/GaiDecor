/**
 * Design System Type Definitions
 * Props interfaces for the SX-to-Tailwind utility functions.
 */

export interface SpacingProps {
  m?: number | string;
  mt?: number | string;
  mr?: number | string;
  mb?: number | string;
  ml?: number | string;
  mx?: number | string;
  my?: number | string;
  p?: number | string;
  pt?: number | string;
  pr?: number | string;
  pb?: number | string;
  pl?: number | string;
  px?: number | string;
  py?: number | string;
}

export interface LayoutProps {
  w?: number | string;
  minW?: number | string;
  maxW?: number | string;
  h?: number | string;
  minH?: number | string;
  maxH?: number | string;
  display?: string;
  position?: string;
  zIndex?: number | string;
  overflow?: string;
  overflowX?: string;
  overflowY?: string;
}

export interface FlexProps {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
  grow?: boolean | number;
  shrink?: boolean | number;
  basis?: string | number;
}

export interface GridProps {
  columns?: number | string;
  rows?: number | string;
  gap?: number | string;
  rowGap?: number | string;
  columnGap?: number | string;
  align?: 'start' | 'end' | 'center' | 'stretch';
  justify?: 'start' | 'end' | 'center' | 'stretch';
}

export interface BorderProps {
  border?: boolean | string;
  borderTop?: boolean | string;
  borderRight?: boolean | string;
  borderBottom?: boolean | string;
  borderLeft?: boolean | string;
  rounded?: string;
  roundedTop?: string;
  roundedBottom?: string;
  roundedLeft?: string;
  roundedRight?: string;
}

export interface TypographyProps {
  size?: string;
  weight?: string;
  lineHeight?: string;
  align?: string;
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  decoration?: 'none' | 'underline' | 'line-through';
  color?: string;
  truncate?: boolean;
  noOfLines?: number;
}

export interface BackgroundProps {
  bg?: string;
  bgGradient?: string;
  bgImage?: string;
  bgSize?: string;
  bgPosition?: string;
  bgRepeat?: string;
}

export interface ShadowProps {
  shadow?: string;
}

export interface InteractiveProps {
  cursor?: string;
  userSelect?: string;
  pointerEvents?: string;
}
