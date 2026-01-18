/**
 * ImageGrid Component
 * Responsive image grid that maintains aspect ratios
 * Features:
 * - Configurable items per row (responsive)
 * - Auto-flows to next row based on space
 * - Maintains aspect ratio
 * - Optional text overlay (top)
 * - Optional button text
 * - Pure sx styling
 */

import { Box, Grid, Text } from '@/design-system';
import { Button } from '@/components/ui/button';
import type { ResponsiveValue } from '@/design-system';

export interface ImageGridItem {
  id?: string | number;
  src: string;
  alt: string;
  text?: string;
  buttonText?: string;
  onClick?: () => void;
  aspectRatio?: string; // e.g., "16/9", "4/3", "1/1"
}

export interface ImageGridProps {
  items: ImageGridItem[];
  columns?: ResponsiveValue<number>; // Items per row (responsive)
  gap?: number; // Spacing between items
  defaultAspectRatio?: string; // Default aspect ratio for all items
}

export default function ImageGrid({
  items,
  columns = { base: 1, sm: 2, md: 3, lg: 4 },
  gap = 4,
  defaultAspectRatio = '4/3'
}: ImageGridProps) {
  return (
    <Grid
      sx={{
        gridTemplateColumns: columns,
        gap: gap,
        w: 'full'
      }}
    >
      {items.map((item, index) => {
        const itemId = item.id || index;
        const aspectRatio = item.aspectRatio || defaultAspectRatio;

        return (
          <Box
            key={itemId}
            onClick={item.onClick}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              cursor: item.onClick ? 'pointer' : 'default',
              transition: 'transform',
              transitionDuration: 300,
              '&:hover': item.onClick ? {
                transform: 'scale(1.02)'
              } : {}
            }}
            style={{
              aspectRatio: aspectRatio
            }}
          >
            {/* Image */}
            <Box
              as="img"
              src={item.src}
              alt={item.alt}
              sx={{
                w: 'full',
                h: 'full',
                transition: 'transform',
                transitionDuration: 500
              }}
              style={{
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />

            {/* Overlay on hover (if clickable) - pointer-events-none so clicks pass through */}
            {item.onClick && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  bg: 'bg-black/0',
                  transition: 'background-color',
                  transitionDuration: 300,
                  '&:hover': {
                    bg: 'bg-black/20'
                  }
                }}
                style={{ pointerEvents: 'none' }}
              />
            )}

            {/* Text Overlay (top) */}
            {item.text && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 6,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                  zIndex: 10
                }}
              >
                <Text
                  sx={{
                    fontSize: { base: 'xl', md: '2xl', lg: '3xl' },
                    fontWeight: 'semibold',
                    color: 'text-white',
                    letterSpacing: 'wide'
                  }}
                  style={{
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                  }}
                >
                  {item.text}
                </Text>

                {/* Button (if provided) */}
                {item.buttonText && (
                  <Box>
                    <Button
                      size="sm"
                      style={{
                        backgroundColor: 'white',
                        color: '#111827',
                        padding: '0.75rem 1.5rem',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        borderRadius: '0',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    >
                      {item.buttonText}
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        );
      })}
    </Grid>
  );
}
