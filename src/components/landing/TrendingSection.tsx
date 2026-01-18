/**
 * TrendingSection Component
 * Displays trending products in a horizontal scrolling grid (4 items per row)
 * Features:
 * - Touch scrolling enabled
 * - No arrow controls
 * - Pure sx styling
 */

import { Box, Flex, Text, ProductCard } from '@/design-system';
import type { ProductCardProps } from '@/design-system';

interface TrendingSectionProps {
  title?: string;
  subtitle?: string;
  products: ProductCardProps[];
}

export default function TrendingSection({
  title = 'TRENDING NOW',
  subtitle = 'Most Popular This Week',
  products
}: TrendingSectionProps) {
  return (
    <Box
      sx={{
        w: 'full',
        bg: 'bg-white'
      }}
      style={{
        padding: '4rem 3rem'
      }}
    >
      {/* Header */}
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
        style={{
          marginBottom: '3rem'
        }}
      >
        <Text
          sx={{
            fontSize: { base: 'xl', md: '2xl' },
            fontWeight: 'semibold',
            color: 'text-gray-900',
            letterSpacing: 'widest'
          }}
          style={{
            marginBottom: '0.5rem'
          }}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            sx={{
              fontSize: { base: 'sm', md: 'base' },
              fontWeight: 'light',
              color: 'text-gray-600',
              letterSpacing: 'wide'
            }}
          >
            {subtitle}
          </Text>
        )}
      </Flex>

      {/* Horizontal Scrolling Grid - 4 items per row */}
      <Box
        sx={{
          w: 'full',
          overflowX: 'auto'
        }}
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'thin',
          scrollbarColor: '#D1D5DB transparent',
          paddingBottom: '1rem'
        }}
      >
        <Flex
          sx={{
            gap: 6
          }}
          style={{
            minWidth: 'max-content'
          }}
        >
          {products.map((product) => (
            <Box
              key={product.id}
              style={{
                width: '280px',
                flexShrink: 0
              }}
            >
              <ProductCard {...product} />
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}
