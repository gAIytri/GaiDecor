/**
 * HeroCarousel Component
 * Auto-scrolling carousel with 3 slides
 * Features:
 * - 10-second auto-scroll
 * - Smooth transitions
 * - Progress circle dots
 * - Slide-in animations from bottom
 * - Left-aligned text
 * - Pure sx styling
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Flex, Text } from '@/design-system';
import { Button } from '@/components/ui/button';
import furnitureImg from '@/assets/landingbg/1.jpg'
import lightingImg from '@/assets/landingbg/3.jpg';
import vaseImg from '@/assets/landingbg/4.jpg';

interface Slide {
  id: number;
  image: string;
  title: string;
  buttonText: string;
  link: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: furnitureImg,
    title: 'Where design meets\ncomfort',
    buttonText: 'Shop Furniture',
    link: '/category/furniture',
  },
  {
    id: 2,
    image: lightingImg,
    title: 'Lights that brighten\nyour life',
    buttonText: 'Shop Lighting',
    link: '/category/lighting',
  },
  {
    id: 3,
    image: vaseImg,
    title: 'Art that defines\nyour space',
    buttonText: 'Shop Decor',
    link: '/category/decor',
  },
];

const SLIDE_DURATION = 5000; // 10 seconds

export default function HeroCarousel() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  // Auto-scroll every 10 seconds with progress tracking
  useEffect(() => {
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (SLIDE_DURATION / 100));
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 300);

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => {
      clearInterval(progressInterval);
      clearInterval(slideInterval);
    };
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        w: 'full',
        overflow: 'hidden'
      }}
      style={{ height: '100vh' }}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <Box
          key={slide.id}
          sx={{
            position: 'absolute',
            inset: 0,
            w: 'full',
            h: 'full',
            opacity: currentSlide === index ? 100 : 0,
            transition: 'opacity',
            transitionDuration: 1000
          }}
        >
          {/* Background Image */}
          <Box
            as="img"
            src={slide.image}
            alt={slide.title}
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
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              bg: 'bg-black/30'
            }}
          />

          {/* Content - Left aligned with slide-in animation */}
          <Flex
            sx={{
              position: 'absolute',
              inset: 0,
              alignItems: 'center',
              px: { base: 6, md: 12, lg: 20 }
            }}
            style={{ paddingTop: '15%', paddingLeft:'5%', zIndex: 10 }}
          >
            <Box sx={{ maxW: 'xl' }}>
              <AnimatePresence mode="wait">
                {currentSlide === index && (
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  >
                    {/* Title - Always 2 lines */}
                    <Text
                      as="h1"
                      sx={{
                        fontSize: { base: '4xl', md: '6xl', lg: '7xl' },
                        fontWeight: 'light',
                        color: 'text-white',
                        mb: 8,
                        lineHeight: 'tight'
                      }}
                      style={{
                        textShadow: '0 2px 20px rgba(0,0,0,0.3)',
                        whiteSpace: 'pre-line'
                      }}
                    >
                      {slide.title}
                    </Text>

                    {/* Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                    >
                      <Button
                        size="lg"
                        onClick={() => navigate(slide.link)}
                        style={{
                          backgroundColor: 'white',
                          color: '#111827',
                          padding: '1.5rem 2.5rem',
                          fontSize: '1.125rem',
                          fontWeight: '500',
                          borderRadius: '0',
                          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                          transition: 'all 0.2s',
                          cursor: 'pointer'
                        }}
                      >
                        {slide.buttonText}
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          </Flex>
        </Box>
      ))}

      {/* Progress Circle Indicators */}
      <Flex
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          justifyContent: 'center',
          gap: 4
        }}
        style={{
          bottom: '3rem',
          zIndex: 50
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => goToSlide(index)}
            sx={{
              position: 'relative',
              cursor: 'pointer'
            }}
            style={{
              width: '9px',
              height: '9px'
            }}
          >
            {/* SVG Circle Progress */}
            <svg
              width="9"
              height="9"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                transform: 'rotate(-90deg)',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
              }}
            >
              {/* Background circle */}
              <circle
                cx="4.5"
                cy="4.5"
                r="3"
                stroke="rgba(255, 255, 255, 0.4)"
                strokeWidth="4"
                fill="rgba(0, 0, 0, 0.2)"
              />
              {/* Progress circle - only for active slide */}
              {currentSlide === index && (
                <circle
                  cx="4.5"
                  cy="4.5"
                  r="5"
                  stroke="white"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 18}`}
                  strokeDashoffset={`${2 * Math.PI * 18 * (1 - progress / 100)}`}
                  style={{
                    transition: 'stroke-dashoffset 0.1s linear'
                  }}
                />
              )}
            </svg>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
