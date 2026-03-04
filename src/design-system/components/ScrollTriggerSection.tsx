/**
 * ScrollTriggerSection Component
 * Left side: Scrolling images column
 * Right side: Sticky text that changes based on which image is in view
 *
 * Features:
 * - Images scroll normally on the left
 * - Text content sticks on the right and changes smoothly as images scroll into view
 * - Uses Intersection Observer to detect active image
 * - Smooth text transitions with Framer Motion
 */

import { useEffect, useRef, useState } from 'react';
import { Box, Text, Heading } from '@/design-system/primitives';
import { motion, AnimatePresence } from 'framer-motion';

export interface ScrollTriggerItem {
  image: string;
  label?: string;
  title: string;
  description: string;
}

export interface ScrollTriggerSectionProps {
  items: ScrollTriggerItem[];
  imageHeight?: string;
}

export function ScrollTriggerSection({
  items,
  imageHeight = '600px',
}: ScrollTriggerSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight / 2;

      // Find which image is closest to the trigger point (middle of screen)
      let closestIndex = 0;
      let closestDistance = Infinity;

      imageRefs.current.forEach((ref, index) => {
        if (!ref) return;

        const rect = ref.getBoundingClientRect();
        const imageCenter = rect.top + rect.height / 2;
        const distance = Math.abs(imageCenter - triggerPoint);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeIndex) {
        console.log('Switching to index:', closestIndex);
        setActiveIndex(closestIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeIndex]);

  const activeItem = items[activeIndex];

  return (
    <Box
      ref={containerRef}
      sx={{
        w: 'full',
        py: { base: 12, md: 16, lg: 20 },
      }}
    >
      <Box
        sx={{
          w: 'full',
          maxW: '7xl',
          mx: 'auto',
          px: { base: 4, md: 6, lg: 8 },
        }}
      >
        <Box
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
          }}
        >
          {/* Left: Scrolling Images Column */}
          <Box
            sx={{
              w: 'full',
            }}
          >
            {items.map((item, index) => (
              <Box
                key={index}
                ref={(el) => {
                  imageRefs.current[index] = el;
                }}
                sx={{
                  w: 'full',
                  overflow: 'hidden',
                  rounded: 'lg',
                  mb: index === items.length - 1 ? 0 : 6,
                }}
                style={{ height: imageHeight }}
              >
                <Box
                  as="img"
                  src={item.image}
                  alt={item.title}
                  sx={{
                    w: 'full',
                    h: 'full',
                  }}
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            ))}
          </Box>

          {/* Right: Sticky Text Column */}
          <Box
            sx={{
              w: 'full',
            }}
          >
            <Box
              sx={{
                position: 'sticky',
                display: 'flex',
                alignItems: 'center',
                px: { base: 6, md: 8, lg: 12 },
              }}
              style={{
                top: '120px',
                height: imageHeight,
              }}
            >
              <Box sx={{ w: 'full' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ width: '100%' }}
                  >
              <Box>
                {/* Label */}
                {activeItem.label && (
                  <Text
                    sx={{
                      fontSize: 'xs',
                      fontWeight: 'bold',
                      letterSpacing: 'widest',
                      textTransform: 'uppercase',
                      color: 'text-gray-500',
                      mb: 4,
                    }}
                  >
                    {activeItem.label}
                  </Text>
                )}

                {/* Title */}
                <Heading
                  as="h2"
                  sx={{
                    fontSize: { base: '3xl', md: '4xl', lg: '5xl' },
                    fontWeight: 'light',
                    color: 'text-gray-900',
                    mb: 6,
                    lineHeight: 'tight',
                  }}
                >
                  {activeItem.title}
                </Heading>

                {/* Description */}
                <Text
                  sx={{
                    fontSize: { base: 'base', md: 'lg' },
                    color: 'text-gray-600',
                    lineHeight: 'relaxed',
                  }}
                >
                  {activeItem.description}
                </Text>
              </Box>
                  </motion.div>
                </AnimatePresence>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
