/**
 * FlashSaleSection Component
 * Displays flash sale announcement banner with countdown timer
 * Pure sx styling
 */

import { useState, useEffect } from 'react';
import { Box, Flex, Text } from '@/design-system';
import { Button } from '@/components/ui/button';

interface FlashSaleSectionProps {
  title: string;
  endTime?: Date;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function FlashSaleSection({
  title,
  endTime,
  buttonText,
  onButtonClick
}: FlashSaleSectionProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    if (!endTime) return;

    const calculateTimeLeft = () => {
      const difference = endTime.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor(difference / (1000 * 60 * 60)),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <Box
      sx={{
        w: 'full',
        bg: 'bg-gray-100'
      }}
      style={{
        padding: '2.5rem 3rem'
      }}
    >
      <Box
        sx={{
          maxW: '7xl',
          mx: 'auto',
        }}
      >
        <Box
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            gap: '48px',
          }}
        >
          {/* Title - Left */}
          <Box>
            <Text
              sx={{
                fontSize: { base: '2xl', md: '3xl' },
                fontWeight: 'bold',
                color: 'text-gray-900',
                letterSpacing: 'wide',
              }}
            >
              {title}
            </Text>
          </Box>

          {/* Countdown Timer - Center */}
          {endTime && (
            <Flex
              sx={{
                alignItems: 'center',
              }}
              style={{
                gap: '1rem',
              }}
            >
            {/* Hours */}
            <Box sx={{ textAlign: 'center' }}>
              <Text
                sx={{
                  fontSize: { base: '3xl', md: '4xl' },
                  fontWeight: 'light',
                  color: 'text-gray-900',
                  letterSpacing: 'wide'
                }}
              >
                {String(timeLeft.hours).padStart(2, '0')}
              </Text>
              <Text
                sx={{
                  fontSize: 'xs',
                  fontWeight: 'medium',
                  color: 'text-gray-600',
                  letterSpacing: 'wider'
                }}
                style={{ marginTop: '0.25rem' }}
              >
                HOUR
              </Text>
            </Box>

            <Text
              sx={{
                fontSize: { base: '3xl', md: '4xl' },
                fontWeight: 'light',
                color: 'text-gray-900'
              }}
            >
              :
            </Text>

            {/* Minutes */}
            <Box sx={{ textAlign: 'center' }}>
              <Text
                sx={{
                  fontSize: { base: '3xl', md: '4xl' },
                  fontWeight: 'light',
                  color: 'text-gray-900',
                  letterSpacing: 'wide'
                }}
              >
                {String(timeLeft.minutes).padStart(2, '0')}
              </Text>
              <Text
                sx={{
                  fontSize: 'xs',
                  fontWeight: 'medium',
                  color: 'text-gray-600',
                  letterSpacing: 'wider'
                }}
                style={{ marginTop: '0.25rem' }}
              >
                MIN
              </Text>
            </Box>

            <Text
              sx={{
                fontSize: { base: '3xl', md: '4xl' },
                fontWeight: 'light',
                color: 'text-gray-900'
              }}
            >
              :
            </Text>

            {/* Seconds */}
            <Box sx={{ textAlign: 'center' }}>
              <Text
                sx={{
                  fontSize: { base: '3xl', md: '4xl' },
                  fontWeight: 'light',
                  color: 'text-gray-900',
                  letterSpacing: 'wide'
                }}
              >
                {String(timeLeft.seconds).padStart(2, '0')}
              </Text>
              <Text
                sx={{
                  fontSize: 'xs',
                  fontWeight: 'medium',
                  color: 'text-gray-600',
                  letterSpacing: 'wider'
                }}
                style={{ marginTop: '0.25rem' }}
              >
                SEC
              </Text>
            </Box>
          </Flex>
        )}

          {/* Button - Right End */}
          <Box
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            {buttonText && (
              <Button
                size="lg"
                onClick={onButtonClick}
                style={{
                  backgroundColor: '#111827',
                  color: 'white',
                  padding: '1rem 2.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  borderRadius: '0',
                  letterSpacing: '0.1em',
                }}
              >
                {buttonText}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
