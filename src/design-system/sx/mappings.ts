/**
 * SX Prop - Comprehensive Style Mappings
 *
 * Maps CSS-like property names to Tailwind classes
 *
 * BRUTAL ARCHITECTURE:
 * - Every CSS property you need
 * - Smart defaults
 * - Token-based values
 * - Extensible
 */

import type { Spacing, FontSize, FontWeight, Radius, ZIndex, Shadow } from '../tokens';

// ============================================================================
// TYPES
// ============================================================================

export type ResponsiveValue<T> = T | {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
};

export type PseudoProps = {
  '&:hover'?: SxProps;
  '&:focus'?: SxProps;
  '&:active'?: SxProps;
  '&:disabled'?: SxProps;
  '&:visited'?: SxProps;
  '&:first-child'?: SxProps;
  '&:last-child'?: SxProps;
  '&::before'?: SxProps;
  '&::after'?: SxProps;
};

// ============================================================================
// LAYOUT
// ============================================================================

export type DisplayValue =
  | 'block' | 'inline-block' | 'inline' | 'flex' | 'inline-flex'
  | 'grid' | 'inline-grid' | 'table' | 'hidden' | 'none';

export type PositionValue = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

export type OverflowValue = 'auto' | 'hidden' | 'visible' | 'scroll' | 'clip';

// ============================================================================
// FLEXBOX
// ============================================================================

export type FlexDirectionValue = 'row' | 'row-reverse' | 'col' | 'column' | 'column-reverse';
export type JustifyValue = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
export type AlignValue = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
export type FlexWrapValue = 'wrap' | 'wrap-reverse' | 'nowrap';

// ============================================================================
// GRID
// ============================================================================

export type GridTemplateValue = number | string | 'none';

// ============================================================================
// SPACING (uses tokens)
// ============================================================================

export type SpacingValue = Spacing | 'auto' | number | string;

// ============================================================================
// SIZING
// ============================================================================

export type SizeValue =
  | number
  | string
  | 'auto'
  | 'full'
  | 'screen'
  | 'min'
  | 'max'
  | 'fit';

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export type FontSizeValue = FontSize | string;
export type FontWeightValue = FontWeight | number;
export type TextAlignValue = 'left' | 'center' | 'right' | 'justify' | 'start' | 'end';
export type TextTransformValue = 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case';
export type TextDecorationValue = 'underline' | 'overline' | 'line-through' | 'no-underline';
export type LineHeightValue = 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose' | number | string;
export type WhiteSpaceValue = 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap' | 'break-spaces';

// ============================================================================
// COLORS
// ============================================================================

// Tailwind color values (bg-red-500, text-blue-600, etc)
export type ColorValue = string;

// ============================================================================
// BORDERS
// ============================================================================

export type BorderWidthValue = 0 | 1 | 2 | 4 | 8 | number | boolean | string;
export type BorderStyleValue = 'solid' | 'dashed' | 'dotted' | 'double' | 'none';
export type BorderRadiusValue = Radius | number | string;

// ============================================================================
// EFFECTS
// ============================================================================

export type ShadowValue = Shadow | 'none' | string;
export type OpacityValue = 0 | 5 | 10 | 20 | 25 | 30 | 40 | 50 | 60 | 70 | 75 | 80 | 90 | 95 | 100 | number;
export type CursorValue =
  | 'auto' | 'default' | 'pointer' | 'wait' | 'text' | 'move'
  | 'help' | 'not-allowed' | 'none' | 'context-menu' | 'progress'
  | 'cell' | 'crosshair' | 'vertical-text' | 'alias' | 'copy'
  | 'no-drop' | 'grab' | 'grabbing' | 'all-scroll' | 'col-resize'
  | 'row-resize' | 'n-resize' | 's-resize' | 'e-resize' | 'w-resize'
  | 'ne-resize' | 'nw-resize' | 'se-resize' | 'sw-resize'
  | 'ew-resize' | 'ns-resize' | 'nesw-resize' | 'nwse-resize' | 'zoom-in' | 'zoom-out';

// ============================================================================
// TRANSITIONS & ANIMATIONS
// ============================================================================

export type TransitionPropertyValue = 'none' | 'all' | 'colors' | 'opacity' | 'shadow' | 'transform';
export type TransitionDurationValue = 75 | 100 | 150 | 200 | 300 | 500 | 700 | 1000 | number;
export type TransitionTimingValue = 'linear' | 'in' | 'out' | 'in-out';

// ============================================================================
// SX PROPS INTERFACE
// ============================================================================

export interface SxProps extends PseudoProps {
  // DISPLAY & LAYOUT
  display?: ResponsiveValue<DisplayValue>;
  position?: ResponsiveValue<PositionValue>;
  top?: ResponsiveValue<SpacingValue>;
  right?: ResponsiveValue<SpacingValue>;
  bottom?: ResponsiveValue<SpacingValue>;
  left?: ResponsiveValue<SpacingValue>;
  inset?: ResponsiveValue<SpacingValue>;
  zIndex?: ResponsiveValue<ZIndex | number>;
  overflow?: ResponsiveValue<OverflowValue>;
  overflowX?: ResponsiveValue<OverflowValue>;
  overflowY?: ResponsiveValue<OverflowValue>;

  // FLEXBOX
  flex?: ResponsiveValue<string | number>;
  flexDirection?: ResponsiveValue<FlexDirectionValue>;
  flexWrap?: ResponsiveValue<FlexWrapValue>;
  flexGrow?: ResponsiveValue<number>;
  flexShrink?: ResponsiveValue<number>;
  flexBasis?: ResponsiveValue<SizeValue>;
  justifyContent?: ResponsiveValue<JustifyValue>;
  alignItems?: ResponsiveValue<AlignValue>;
  alignContent?: ResponsiveValue<AlignValue>;
  alignSelf?: ResponsiveValue<AlignValue>;
  gap?: ResponsiveValue<SpacingValue>;
  rowGap?: ResponsiveValue<SpacingValue>;
  columnGap?: ResponsiveValue<SpacingValue>;

  // GRID
  gridTemplateColumns?: ResponsiveValue<GridTemplateValue>;
  gridTemplateRows?: ResponsiveValue<GridTemplateValue>;
  gridColumn?: ResponsiveValue<string>;
  gridRow?: ResponsiveValue<string>;
  gridAutoFlow?: ResponsiveValue<'row' | 'col' | 'dense' | 'row-dense' | 'col-dense'>;

  // SPACING
  m?: ResponsiveValue<SpacingValue>;
  mt?: ResponsiveValue<SpacingValue>;
  mr?: ResponsiveValue<SpacingValue>;
  mb?: ResponsiveValue<SpacingValue>;
  ml?: ResponsiveValue<SpacingValue>;
  mx?: ResponsiveValue<SpacingValue>;
  my?: ResponsiveValue<SpacingValue>;
  margin?: ResponsiveValue<SpacingValue>;
  marginTop?: ResponsiveValue<SpacingValue>;
  marginRight?: ResponsiveValue<SpacingValue>;
  marginBottom?: ResponsiveValue<SpacingValue>;
  marginLeft?: ResponsiveValue<SpacingValue>;

  p?: ResponsiveValue<SpacingValue>;
  pt?: ResponsiveValue<SpacingValue>;
  pr?: ResponsiveValue<SpacingValue>;
  pb?: ResponsiveValue<SpacingValue>;
  pl?: ResponsiveValue<SpacingValue>;
  px?: ResponsiveValue<SpacingValue>;
  py?: ResponsiveValue<SpacingValue>;
  padding?: ResponsiveValue<SpacingValue>;
  paddingTop?: ResponsiveValue<SpacingValue>;
  paddingRight?: ResponsiveValue<SpacingValue>;
  paddingBottom?: ResponsiveValue<SpacingValue>;
  paddingLeft?: ResponsiveValue<SpacingValue>;

  // SIZING
  w?: ResponsiveValue<SizeValue>;
  h?: ResponsiveValue<SizeValue>;
  width?: ResponsiveValue<SizeValue>;
  height?: ResponsiveValue<SizeValue>;
  minW?: ResponsiveValue<SizeValue>;
  minH?: ResponsiveValue<SizeValue>;
  maxW?: ResponsiveValue<SizeValue>;
  maxH?: ResponsiveValue<SizeValue>;
  minWidth?: ResponsiveValue<SizeValue>;
  minHeight?: ResponsiveValue<SizeValue>;
  maxWidth?: ResponsiveValue<SizeValue>;
  maxHeight?: ResponsiveValue<SizeValue>;

  // TYPOGRAPHY
  fontSize?: ResponsiveValue<FontSizeValue>;
  fontWeight?: ResponsiveValue<FontWeightValue>;
  fontFamily?: ResponsiveValue<string>;
  lineHeight?: ResponsiveValue<LineHeightValue>;
  letterSpacing?: ResponsiveValue<string>;
  textAlign?: ResponsiveValue<TextAlignValue>;
  textTransform?: ResponsiveValue<TextTransformValue>;
  textDecoration?: ResponsiveValue<TextDecorationValue>;
  textColor?: ResponsiveValue<ColorValue>;
  color?: ResponsiveValue<ColorValue>;
  whiteSpace?: ResponsiveValue<WhiteSpaceValue>;
  wordBreak?: ResponsiveValue<'normal' | 'words' | 'all' | 'keep'>;

  // COLORS
  bg?: ResponsiveValue<ColorValue>;
  bgColor?: ResponsiveValue<ColorValue>;
  backgroundColor?: ResponsiveValue<ColorValue>;
  bgGradient?: ResponsiveValue<string>;

  // BORDERS
  border?: ResponsiveValue<BorderWidthValue>;
  borderTop?: ResponsiveValue<BorderWidthValue>;
  borderRight?: ResponsiveValue<BorderWidthValue>;
  borderBottom?: ResponsiveValue<BorderWidthValue>;
  borderLeft?: ResponsiveValue<BorderWidthValue>;
  borderX?: ResponsiveValue<BorderWidthValue>;
  borderY?: ResponsiveValue<BorderWidthValue>;
  borderWidth?: ResponsiveValue<BorderWidthValue>;
  borderStyle?: ResponsiveValue<BorderStyleValue>;
  borderColor?: ResponsiveValue<ColorValue>;

  borderRadius?: ResponsiveValue<BorderRadiusValue>;
  rounded?: ResponsiveValue<BorderRadiusValue>;
  roundedTop?: ResponsiveValue<BorderRadiusValue>;
  roundedRight?: ResponsiveValue<BorderRadiusValue>;
  roundedBottom?: ResponsiveValue<BorderRadiusValue>;
  roundedLeft?: ResponsiveValue<BorderRadiusValue>;

  // EFFECTS
  shadow?: ResponsiveValue<ShadowValue>;
  boxShadow?: ResponsiveValue<ShadowValue>;
  opacity?: ResponsiveValue<OpacityValue>;
  cursor?: ResponsiveValue<CursorValue>;
  pointerEvents?: ResponsiveValue<'none' | 'auto'>;
  userSelect?: ResponsiveValue<'none' | 'text' | 'all' | 'auto'>;

  // BACKGROUNDS
  bgImage?: ResponsiveValue<string>;
  bgSize?: ResponsiveValue<'auto' | 'cover' | 'contain'>;
  bgPosition?: ResponsiveValue<'center' | 'top' | 'right' | 'bottom' | 'left' | string>;
  bgRepeat?: ResponsiveValue<'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y' | 'round' | 'space'>;

  // TRANSITIONS
  transition?: ResponsiveValue<TransitionPropertyValue>;
  transitionDuration?: ResponsiveValue<TransitionDurationValue>;
  transitionTiming?: ResponsiveValue<TransitionTimingValue>;
  transitionDelay?: ResponsiveValue<number>;

  // TRANSFORMS
  transform?: ResponsiveValue<string>;
  scale?: ResponsiveValue<number>;
  rotate?: ResponsiveValue<number>;
  translateX?: ResponsiveValue<SpacingValue>;
  translateY?: ResponsiveValue<SpacingValue>;

  // FILTERS
  blur?: ResponsiveValue<'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | string>;
  brightness?: ResponsiveValue<number>;
  contrast?: ResponsiveValue<number>;
  grayscale?: ResponsiveValue<boolean | number>;
  backdropBlur?: ResponsiveValue<'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | string>;

  // DARK MODE (prefix with dark:)
  _dark?: Omit<SxProps, '_dark' | keyof PseudoProps>;
}

// ============================================================================
// PROPERTY ALIASES (for convenience)
// ============================================================================

export const PROPERTY_ALIASES: Record<string, string> = {
  // Spacing shortcuts
  'm': 'margin',
  'mt': 'marginTop',
  'mr': 'marginRight',
  'mb': 'marginBottom',
  'ml': 'marginLeft',
  'mx': 'marginX',
  'my': 'marginY',
  'p': 'padding',
  'pt': 'paddingTop',
  'pr': 'paddingRight',
  'pb': 'paddingBottom',
  'pl': 'paddingLeft',
  'px': 'paddingX',
  'py': 'paddingY',

  // Sizing shortcuts
  'w': 'width',
  'h': 'height',
  'minW': 'minWidth',
  'maxW': 'maxWidth',
  'minH': 'minHeight',
  'maxH': 'maxHeight',

  // Color shortcuts
  'bg': 'backgroundColor',
  'bgColor': 'backgroundColor',
  'color': 'textColor',

  // Border shortcuts
  'rounded': 'borderRadius',
};
