/**
 * QuoteSection Component
 * Displays an inspirational quote
 * Pure sx styling
 */

import { Box, Text } from '@/design-system';

interface QuoteSectionProps {
  quote: string;
}

export default function QuoteSection({ quote }: QuoteSectionProps) {
  return (
    <Box
      sx={{
        w: 'full',
        py: { base: 16, md: 24 },
        px: { base: 6, md: 12 },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box sx={{ maxW: '4xl', textAlign: 'center' }}>
        <Text
          as="blockquote"
          sx={{
            fontSize: { base: '2xl', md: '3xl', lg: '4xl' },
            fontWeight: 'light',
            lineHeight: 'relaxed',
            color: 'text-gray-800',
            letterSpacing: 'wide'
          }}
        >
          "{quote}"
        </Text>
      </Box>
    </Box>
  );
}
