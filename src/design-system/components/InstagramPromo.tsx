/**
 * InstagramPromo Component
 * Full-width Instagram promotion section with 4 images in a row
 * Images are joined end-to-end to create one continuous visual
 */

import { Box, Flex, Text } from '@/design-system/primitives';

export interface InstagramPromoProps {
  images: [string, string, string, string];
  instagramHandle: string;
  imageHeight?: string;
}

export function InstagramPromo({
  images,
  instagramHandle,
  imageHeight = '400px',
}: InstagramPromoProps) {
  return (
    <Box
      sx={{
        w: 'full',
   
      }}
    >
      {/* Images Row with Overlay */}
      <Box
        sx={{
          position: 'relative',
          w: 'full',
        }}
      >
        <Flex
          sx={{
            w: 'full',
            gap: 0,
          }}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              sx={{
                flex: 1,
                overflow: 'hidden',
              }}
              style={{ height: imageHeight }}
            >
              <Box
                as="img"
                src={image}
                alt={`Instagram ${index + 1}`}
                sx={{
                  w: 'full',
                  h: 'full',
                  transition: 'transform',
                  transitionDuration: 500,
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
                style={{ objectFit: 'cover' }}
              />
            </Box>
          ))}
        </Flex>

        {/* Instagram Handle Overlay - Centered on Images */}
        <Box
          sx={{
            position: 'absolute',
            bg: 'transparent',
            px: 10,
            py: 5,
            rounded: 'xl',
            shadow: '2xl',
          }}
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          }}
        >
          <Text
            sx={{
              fontSize: { base: '3xl', md: '4xl', lg: '5xl' },
              fontWeight: 'black',
              textAlign: 'center',
              letterSpacing: 'tight',
            }}
            style={{ color: '#f4f4f4' }}
          >
            {instagramHandle}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
