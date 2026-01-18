/**
 * MediaHeroWithCard Component
 * Full-width hero section with background media (image/video) and floating product card
 *
 * Features:
 * - Background can be image or video
 * - Left: Text content with label, heading, description
 * - Right: Floating product card with image, price, colors
 * - Navigation arrows (optional)
 */

import { Box, Flex, Text, Heading } from '@/design-system/primitives';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export interface MediaHeroProduct {
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  colors?: string[];
  moreColorsCount?: number;
  productId?: string;
  href?: string;
}

export interface MediaHeroWithCardProps {
  // Background Media
  backgroundType: 'image' | 'video';
  backgroundSrc: string;

  // Text Content
  label: string;
  heading: string;
  description: string;

  // Product Card
  product: MediaHeroProduct;

  // Navigation (optional)
  showNavigation?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;

  // Optional styling
  height?: string;
  overlayOpacity?: number;
}

export function MediaHeroWithCard({
  backgroundType,
  backgroundSrc,
  label,
  heading,
  description,
  product,
  showNavigation = false,
  onPrevious,
  onNext,
  height = '600px',
  overlayOpacity = 0.3,
}: MediaHeroWithCardProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        w: 'full',
        overflow: 'hidden',
      }}
      style={{ height }}
    >
      {/* Background Media */}
      {backgroundType === 'video' ? (
        <Box
          as="video"
          autoPlay
          muted
          loop
          playsInline
          sx={{
            position: 'absolute',
            inset: 0,
            w: 'full',
            h: 'full',
          }}
          style={{ objectFit: 'cover' }}
        >
          <source src={backgroundSrc} type="video/mp4" />
        </Box>
      ) : (
        <Box
          as="img"
          src={backgroundSrc}
          alt="Background"
          sx={{
            position: 'absolute',
            inset: 0,
            w: 'full',
            h: 'full',
          }}
          style={{ objectFit: 'cover' }}
        />
      )}

      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
        }}
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
      />

      {/* Content Container */}
      <Box
        sx={{
          position: 'relative',
          maxW: '7xl',
          mx: 'auto',
          h: 'full',
          px: { base: 4, md: 6, lg: 8 },
        }}
      >
        {/* Left: Text Content */}
        <Box
          sx={{
            position: 'relative',
            h: 'full',
            display: 'flex',
            alignItems: 'center',
            maxW: '60%',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Label */}
            <Text
              sx={{
                fontSize: 'xs',
                fontWeight: 'bold',
                letterSpacing: 'widest',
                textTransform: 'uppercase',
                mb: 4,
                color: 'text-white',
              }}
            >
              {label}
            </Text>

            {/* Heading */}
            <Heading
              as="h2"
              sx={{
                fontSize: { base: '4xl', md: '5xl', lg: '6xl' },
                fontWeight: 'light',
                mb: 6,
                lineHeight: 'tight',
                color: 'text-white',
              }}
            >
              {heading}
            </Heading>

            {/* Description */}
            <Text
              sx={{
                fontSize: { base: 'base', md: 'lg' },
                mb: 8,
                maxW: 'md',
                color: 'text-white',
              }}
            >
              {description}
            </Text>

          </motion.div>
        </Box>

        {/* Right Bottom: Stacked Product Cards */}
        <Box
          sx={{
            position: 'absolute',
          }}
          style={{ bottom: '40px', right: '32px' }}
        >
          {/* Navigation Arrows - Above the card */}
          {showNavigation && (
            <Flex
              sx={{
                gap: 3,
                mb: 3,
                justifyContent: 'center',
              }}
            >
              <Box
                onClick={onPrevious}
                sx={{
                  w: 10,
                  h: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bg: 'bg-white',
                  rounded: 'full',
                  cursor: 'pointer',
                  transition: 'all',
                  transitionDuration: 200,
                  shadow: 'lg',
                  '&:hover': {
                    bg: 'bg-gray-100',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <ChevronLeft className="w-5 h-5 text-gray-900" />
              </Box>
              <Box
                onClick={onNext}
                sx={{
                  w: 10,
                  h: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bg: 'bg-white',
                  rounded: 'full',
                  cursor: 'pointer',
                  transition: 'all',
                  transitionDuration: 200,
                  shadow: 'lg',
                  '&:hover': {
                    bg: 'bg-gray-100',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <ChevronRight className="w-5 h-5 text-gray-900" />
              </Box>
            </Flex>
          )}

          {/* Stack effect - Background cards (2 cards behind) */}
          <Box
            sx={{
              position: 'absolute',
              bg: 'bg-white',
              rounded: 'md',
              shadow: 'lg',
            }}
            style={{
              width: '240px',
              height: '280px',
              bottom: '-8px',
              right: '-8px',
              zIndex: 1,
              opacity: 0.4,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bg: 'bg-white',
              rounded: 'md',
              shadow: 'xl',
            }}
            style={{
              width: '240px',
              height: '280px',
              bottom: '-4px',
              right: '-4px',
              zIndex: 2,
              opacity: 0.7,
            }}
          />

          {/* Top card - No animation key to prevent remounting */}
          {(() => {
            const productLink = product.href || (product.productId ? `/product/${product.productId}` : null);
            const CardContent = (
              <Box
                sx={{
                  position: 'relative',
                  bg: 'bg-white',
                  rounded: 'md',
                  overflow: 'hidden',
                  shadow: '2xl',
                  cursor: productLink ? 'pointer' : 'default',
                }}
                style={{ width: '240px', zIndex: 3 }}
              >
                {/* Product Image */}
                <Box
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  style={{ height: '280px', width: '240px' }}
                >
                  <motion.img
                    key={product.image}
                    src={product.image}
                    alt={product.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />

                  {/* Text Overlay on Image - Bottom */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 3,
                    }}
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.4), transparent)',
                    }}
                  >
                    {/* Product Name */}
                    <Text
                      sx={{
                        fontSize: 'sm',
                        fontWeight: 'semibold',
                        color: 'text-white',
                        mb: 1,
                        lineHeight: 'tight',
                      }}
                    >
                      {product.name}
                    </Text>

                    {/* Price */}
                    <Flex sx={{ alignItems: 'center', gap: 2, mb: 1.5 }}>
                      <Text
                        sx={{
                          fontSize: 'sm',
                          fontWeight: 'bold',
                          color: 'text-white',
                        }}
                      >
                        ${product.price.toFixed(2)}
                      </Text>
                      {product.originalPrice && (
                        <Text
                          sx={{
                            fontSize: 'xs',
                            color: 'text-gray-300',
                            textDecoration: 'line-through',
                          }}
                        >
                          ${product.originalPrice.toFixed(2)}
                        </Text>
                      )}
                    </Flex>

                    {/* Color Swatches */}
                    {product.colors && product.colors.length > 0 && (
                      <Flex sx={{ alignItems: 'center', gap: 1.5 }}>
                        {product.colors.slice(0, 4).map((color, index) => (
                          <Box
                            key={index}
                            sx={{
                              w: 4,
                              h: 4,
                              rounded: 'full',
                              border: true,
                              borderColor: 'border-white',
                              cursor: 'pointer',
                              transition: 'transform',
                              transitionDuration: 200,
                              '&:hover': {
                                transform: 'scale(1.15)',
                              },
                            }}
                            style={{
                              backgroundColor: color,
                              borderWidth: '2px',
                            }}
                          />
                        ))}
                        {product.moreColorsCount && product.moreColorsCount > 0 && (
                          <Text
                            sx={{
                              fontSize: 'xs',
                              color: 'text-white',
                              fontWeight: 'medium',
                            }}
                          >
                            +{product.moreColorsCount}
                          </Text>
                        )}
                      </Flex>
                    )}
                  </Box>
                </Box>
              </Box>
            );

            return productLink ? (
              <Link to={productLink} style={{ display: 'block' }}>
                {CardContent}
              </Link>
            ) : CardContent;
          })()}
        </Box>
      </Box>
    </Box>
  );
}
