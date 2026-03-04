/**
 * Design System Main Export
 *
 * USAGE:
 * import { Box, Flex, Stack, Grid, Text, Heading } from '@/design-system';
 * import type { SxProps } from '@/design-system';
 *
 * See SX-STYLING-GUIDE.md for complete documentation
 */

// Primitives
export * from './primitives';

// Components
export { default as ImageGrid } from './components/ImageGrid';
export type { ImageGridProps, ImageGridItem } from './components/ImageGrid';
export { default as VideoHero } from './components/VideoHero';
export type { VideoHeroProps } from './components/VideoHero';
export { default as ProductCard } from './components/ProductCard';
export type { ProductCardProps } from './components/ProductCard';
export { MediaHeroWithCard } from './components/MediaHeroWithCard';
export type { MediaHeroWithCardProps, MediaHeroProduct } from './components/MediaHeroWithCard';
export { InstagramPromo } from './components/InstagramPromo';
export type { InstagramPromoProps } from './components/InstagramPromo';
export { ScrollTriggerSection } from './components/ScrollTriggerSection';
export type { ScrollTriggerSectionProps, ScrollTriggerItem } from './components/ScrollTriggerSection';
export { FloatingNewsletter } from './components/FloatingNewsletter';
export type { FloatingNewsletterProps } from './components/FloatingNewsletter';

// SX System (THE CORE)
export { sx } from './sx';
export type { SxProps, ResponsiveValue } from './sx';

// Tokens (for advanced usage)
export * from './tokens';

// Types (for TypeScript users) — omit FlexProps/GridProps already exported from primitives
export type {
  SpacingProps,
  LayoutProps,
  BorderProps,
  TypographyProps,
  BackgroundProps,
  ShadowProps,
  InteractiveProps,
} from './types';

// Utils (for creating custom components)
export * from './utils';
