/**
 * InteriorStylesSection Component
 * Showcases 3 interior design styles with alternating text/image layout
 * - Bohemian, Modern Minimal, Coastal
 * - Left/right alternating design
 * - 2 images per style
 */

import { Box, Flex, Text, Heading } from '@/design-system';
import { motion } from 'framer-motion';

// Bohemian images
import bohemian1 from '@/assets/designs/bohemian/julien-lanoy-jV5Jqlgp4h0-unsplash.jpg';
import bohemian2 from '@/assets/designs/bohemian/micheile-henderson-MG4G0congO0-unsplash.jpg';

// Coastal images
import coastal1 from '@/assets/designs/coastal/Coastal-Outdoor-Furniture-Chairs-Chat-Set-5781.jpg';
import coastal2 from '@/assets/designs/coastal/hutomo-abrianto-X5BWooeO4Cw-unsplash.jpg';

// Minimalist images
import minimalist1 from '@/assets/designs/minimalist/alexandra-gorn-W5dsm9n6e3g-unsplash.jpg';
import minimalist2 from '@/assets/designs/minimalist/behnam-norouzi-phXwnWWz-BM-unsplash.jpg';

interface DesignStyle {
  id: string;
  title: string;
  description: string;
  images: [string, string];
}

const designStyles: DesignStyle[] = [
  {
    id: 'bohemian',
    title: 'Bohemian Interior',
    description:
      'Embrace the art of layered living with bohemian design. Rich textures, global patterns, and warm earth tones come together to create spaces that feel deeply personal and inviting. Mix vintage finds with handcrafted pieces, natural materials with vibrant textiles—every element tells a story of creative freedom and collected beauty.',
    images: [bohemian1, bohemian2],
  },
  {
    id: 'minimalist',
    title: 'Modern Minimal Interior',
    description:
      'Less is more in modern minimalist spaces. Clean architectural lines, curated furnishings, and a refined neutral palette create environments of quiet sophistication. Each piece serves a purpose, each surface breathes. The result is a home that feels open, intentional, and effortlessly elegant.',
    images: [minimalist1, minimalist2],
  },
  {
    id: 'coastal',
    title: 'Coastal Interior',
    description:
      'Bring the serenity of the shore into your home. Coastal interiors blend soft blues, sandy neutrals, and crisp whites with natural textures like linen, rattan, and weathered wood. Light-filled rooms, breezy fabrics, and ocean-inspired accents create a relaxed atmosphere that feels like an endless summer retreat.',
    images: [coastal1, coastal2],
  },
];

export default function InteriorStylesSection() {
  return (
    <Box
      sx={{
        w: 'full',
        py: { base: 12, md: 16, lg: 20 },
        bg: 'bg-white',
      }}
    >
      {/* Section Header */}
      <Box sx={{ textAlign: 'center', mb: 12, px: { base: 4, md: 6 } }}>
        <Heading
          as="h2"
          sx={{
            fontSize: { base: '3xl', md: '4xl', lg: '5xl' },
            fontWeight: 'light',
            color: 'text-gray-900',
            mb: 4,
          }}
        >
          Design Your Style
        </Heading>

      </Box>

      {/* Design Styles */}
      <Box sx={{ maxW: 'screen-2xl', mx: 'auto', px: { base: 2, md: 4, lg: 6 } }}>
        {designStyles.map((style, index) => {
          const isReversed = index % 2 !== 0;

          return (
            <Box
              key={style.id}
              sx={{
                mb: { base: 16, md: 20, lg: 24 },
                '&:last-child': {
                  mb: 0,
                },
              }}
            >
              <Flex
                sx={{
                  flexDirection: isReversed ? 'row-reverse' : 'row',
                  gap: 8,
                  alignItems: 'center',
                }}
              >
                {/* Text Content - 50% */}
                <Box
                  sx={{
                    flex: '0 0 50%',
                    maxW: '50%',
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <Text
                      sx={{
                        fontSize: 'xs',
                        fontWeight: 'semibold',
                        letterSpacing: 'widest',
                        textTransform: 'uppercase',
                        color: 'text-gray-500',
                        mb: 4,
                      }}
                    >
                      {style.id}
                    </Text>
                    <Heading
                      as="h3"
                      sx={{
                        fontSize: { base: '2xl', md: '3xl', lg: '4xl' },
                        fontWeight: 'light',
                        color: 'text-gray-900',
                        mb: 6,
                        lineHeight: 'tight',
                      }}
                    >
                      {style.title}
                    </Heading>
                    <Text
                      sx={{
                        fontSize: { base: 'base', md: 'lg' },
                        color: 'text-gray-600',
                        lineHeight: 'relaxed',
                      }}
                    >
                      {style.description}
                    </Text>
                  </motion.div>
                </Box>

                {/* Images - 50% - Two images side by side */}
                <Box
                  sx={{
                    flex: '0 0 50%',
                    maxW: '50%',
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <Flex
                      sx={{
                        gap: 4,
                        height: '400px',
                        alignItems: 'center',
                      }}
                    >
                      {/* First Image */}
                      <Box
                        sx={{
                          flex: '1',
                          overflow: 'hidden',
                          rounded: 'lg',
                          h: 'full',
                        }}
                      >
                        <Box
                          as="img"
                          src={style.images[0]}
                          alt={`${style.title} 1`}
                          sx={{
                            w: 'full',
                            h: 'full',
                            transition: 'transform',
                            transitionDuration: 500,
                            '&:hover': {
                              transform: 'scale(1.05)',
                            },
                          }}
                          style={{
                            objectFit: 'cover',
                          }}
                        />
                      </Box>

                      {/* Second Image */}
                      <Box
                        sx={{
                          flex: '1',
                          overflow: 'hidden',
                          rounded: 'lg',
                          shadow: 'xl',
                          h: 'full',
                        }}
                      >
                        <Box
                          as="img"
                          src={style.images[1]}
                          alt={`${style.title} 2`}
                          sx={{
                            w: 'full',
                            h: 'full',
                            transition: 'transform',
                            transitionDuration: 500,
                            '&:hover': {
                              transform: 'scale(1.05)',
                            },
                          }}
                          style={{
                            objectFit: 'cover',
                          }}
                        />
                      </Box>
                    </Flex>
                  </motion.div>
                </Box>
              </Flex>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
