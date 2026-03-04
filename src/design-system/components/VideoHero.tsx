/**
 * VideoHero Component
 * Single video display with optional text and button overlay
 * Features:
 * - Configurable video source
 * - Configurable size/aspect ratio
 * - Optional text overlay (top)
 * - Optional button text
 * - Pure sx styling
 */

import { Box, Text } from '@/design-system';
import { Button } from '@/components/ui/button';
import type { ResponsiveValue } from '@/design-system';

export interface VideoHeroProps {
  src: string;
  alt?: string;
  text?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  aspectRatio?: string; // e.g., "16/9", "4/3", "21/9"
  height?: string; // e.g., "60vh", "500px"
  width?: ResponsiveValue<string>; // e.g., "full", "90%"
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

export default function VideoHero({
  src,
  alt: _alt = 'Video',
  text,
  buttonText,
  onButtonClick,
  aspectRatio = '16/9',
  height,
  width = 'full',
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false
}: VideoHeroProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        w: width
      }}
      style={{
        aspectRatio: height ? undefined : aspectRatio,
        height: height || undefined
      }}
    >
      {/* Video */}
      <Box
        as="video"
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        controls={controls}
        playsInline
        sx={{
          w: 'full',
          h: 'full'
        }}
        style={{
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />

      {/* Overlay for better text readability */}
      {(text || buttonText) && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            bg: 'bg-black/30'
          }}
          style={{ pointerEvents: 'none' }}
        />
      )}

      {/* Text and Button Overlay (centered) */}
      {(text || buttonText) && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
            px: { base: 6, md: 12 },
            zIndex: 10
          }}
        >
          {text && (
            <Text
              sx={{
                fontSize: { base: '3xl', md: '5xl', lg: '6xl' },
                fontWeight: 'light',
                color: 'text-white',
                textAlign: 'center',
                letterSpacing: 'wide',
                maxW: '4xl'
              }}
              style={{
                textShadow: '0 2px 20px rgba(0,0,0,0.5)'
              }}
            >
              {text}
            </Text>
          )}

          {buttonText && (
            <Box>
              <Button
                size="lg"
                onClick={onButtonClick}
                style={{
                  backgroundColor: 'white',
                  color: '#111827',
                  padding: '1.5rem 2.5rem',
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  borderRadius: '0',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                  transition: 'all 0.2s'
                }}
              >
                {buttonText}
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
