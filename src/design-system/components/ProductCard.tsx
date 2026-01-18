/**
 * ProductCard Component
 * Displays product information with image, colors, name, and price
 * Features:
 * - Aspect square image with hover scale effect
 * - Optional badge overlay
 * - Color swatches
 * - Product name (line-clamp-2)
 * - Price display
 * - Pure sx styling
 */

import { Box, Flex, Text } from '@/design-system';
import { Link } from 'react-router-dom';

export interface ProductCardProps {
  id: string | number;
  image: string;
  name: string;
  price: number;
  colors?: string[];
  badge?: string;
  href?: string;
  onClick?: () => void;
}

// Helper function to convert color names to hex values
const getColorHex = (color: string): string => {
  const colorMap: { [key: string]: string } = {
    beige: '#F5F5DC',
    blue: '#3B82F6',
    gray: '#6B7280',
    green: '#10B981',
    navy: '#1E3A8A',
    black: '#000000',
    white: '#FFFFFF',
    brown: '#92400E',
    cream: '#FFFDD0',
    ivory: '#FFFFF0',
    red: '#EF4444',
    pink: '#EC4899',
    yellow: '#FCD34D',
    orange: '#F97316',
    purple: '#A855F7',
    teal: '#14B8A6'
  };

  return colorMap[color.toLowerCase()] || '#9CA3AF';
};

export default function ProductCard({
  id,
  image,
  name,
  price,
  colors = [],
  badge,
  href,
  onClick
}: ProductCardProps) {
  const productLink = href || `/product/${id}`;

  const CardContent = (
    <Box
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        '&:hover img': {
          transform: 'scale(1.1)'
        },
        '&:hover .badge': {
          opacity: 100
        },
        '&:hover .product-name': {
          color: 'text-gray-600'
        }
      }}
    >
      {/* Product Image */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          bg: 'bg-gray-100'
        }}
        style={{
          aspectRatio: '1/1',
          marginBottom: '0.75rem'
        }}
      >
        <Box
          as="img"
          src={image}
          alt={name}
          sx={{
            w: 'full',
            h: 'full',
            transition: 'transform',
            transitionDuration: 500
          }}
          style={{
            objectFit: 'cover'
          }}
        />

        {/* Badge Overlay */}
        {badge && (
          <Box
            className="badge"
            sx={{
              position: 'absolute',
              bg: 'bg-white',
              color: 'text-gray-900',
              fontSize: 'xs',
              fontWeight: 'medium',
              opacity: 0,
              transition: 'opacity',
              transitionDuration: 300
            }}
            style={{
              top: '0.5rem',
              right: '0.5rem',
              padding: '0.25rem 0.5rem'
            }}
          >
            {badge}
          </Box>
        )}
      </Box>

      {/* Color Swatches */}
      {colors.length > 0 && (
        <Flex
          sx={{
            gap: 1.5
          }}
          style={{
            marginBottom: '0.5rem'
          }}
        >
          {colors.slice(0, 4).map((color, i) => (
            <Box
              key={i}
              sx={{
                w: 5,
                h: 5,
                rounded: 'full',
                border: '1px',
                borderColor: 'border-gray-300'
              }}
              style={{
                backgroundColor: getColorHex(color)
              }}
            />
          ))}
        </Flex>
      )}

      {/* Product Name */}
      <Text
        className="product-name"
        sx={{
          fontSize: 'sm',
          color: 'text-gray-900',
          transition: 'color',
          transitionDuration: 300
        }}
        style={{
          marginBottom: '0.25rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {name}
      </Text>

      {/* Price */}
      <Text
        sx={{
          fontSize: 'base',
          fontWeight: 'semibold',
          color: 'text-gray-900'
        }}
      >
        ${price.toFixed(2)}
      </Text>
    </Box>
  );

  return (
    <Link to={productLink} style={{ display: 'block' }}>
      {CardContent}
    </Link>
  );
}
