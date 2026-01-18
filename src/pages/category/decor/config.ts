// DecorCategory configuration data
import type { FilterDefinition, ProductTypeTile } from './types';

// Import product type images - 4 categories
import vase1 from '@/assets/decor/vases/vase-1.jpeg';
import candle1 from '@/assets/decor/candles/candle-1.jpeg';
import object1 from '@/assets/decor/decorative-objects/object-1.jpeg';
import pillow1 from '@/assets/decor/throw-pillows/pillow-1.jpeg';

// Product Type Tiles - Quick navigation (4 categories)
export const decorProductTypeTiles: ProductTypeTile[] = [
  { name: 'Vases', slug: 'vase', image: vase1, description: 'Ceramic, Glass & Artisan Vases' },
  { name: 'Candles', slug: 'candle', image: candle1, description: 'Scented & Decorative Candles' },
  { name: 'Decorative Objects', slug: 'decorative-object', image: object1, description: 'Sculptures, Bowls & Accents' },
  { name: 'Throw Pillows', slug: 'throw-pillow', image: pillow1, description: 'Cushions & Pillow Covers' },
];

// Filter Definitions
export const decorFilters: FilterDefinition[] = [
  {
    id: 'productType',
    label: 'Product Type',
    type: 'checkbox',
  },
  {
    id: 'room',
    label: 'Room',
    type: 'checkbox',
    options: [
      { value: 'Living Room', label: 'Living Room' },
      { value: 'Bedroom', label: 'Bedroom' },
      { value: 'Dining Room', label: 'Dining Room' },
      { value: 'Bathroom', label: 'Bathroom' },
      { value: 'Office', label: 'Office' },
      { value: 'Entryway', label: 'Entryway' },
    ],
  },
  {
    id: 'color',
    label: 'Color',
    type: 'color',
    options: [
      { value: 'white', label: 'White', color: '#FFFFFF' },
      { value: 'black', label: 'Black', color: '#000000' },
      { value: 'cream', label: 'Cream', color: '#FFFDD0' },
      { value: 'beige', label: 'Beige', color: '#F5F5DC' },
      { value: 'terracotta', label: 'Terracotta', color: '#E2725B' },
      { value: 'sage', label: 'Sage', color: '#9DC183' },
      { value: 'navy', label: 'Navy', color: '#000080' },
      { value: 'blush', label: 'Blush', color: '#DE5D83' },
      { value: 'gold', label: 'Gold', color: '#FFD700' },
      { value: 'natural', label: 'Natural', color: '#D2B48C' },
      { value: 'gray', label: 'Gray', color: '#808080' },
      { value: 'green', label: 'Green', color: '#228B22' },
    ],
  },
  {
    id: 'style',
    label: 'Style',
    type: 'checkbox',
    options: [
      { value: 'Modern', label: 'Modern' },
      { value: 'Minimalist', label: 'Minimalist' },
      { value: 'Bohemian', label: 'Bohemian' },
      { value: 'Contemporary', label: 'Contemporary' },
      { value: 'Scandinavian', label: 'Scandinavian' },
      { value: 'Traditional', label: 'Traditional' },
      { value: 'Organic', label: 'Organic' },
      { value: 'Rustic', label: 'Rustic' },
    ],
  },
  {
    id: 'material',
    label: 'Material',
    type: 'checkbox',
    options: [
      { value: 'Ceramic', label: 'Ceramic' },
      { value: 'Glass', label: 'Glass' },
      { value: 'Porcelain', label: 'Porcelain' },
      { value: 'Stone', label: 'Stone' },
      { value: 'Wood', label: 'Wood' },
      { value: 'Metal', label: 'Metal' },
      { value: 'Fabric', label: 'Fabric' },
      { value: 'Linen', label: 'Linen' },
      { value: 'Velvet', label: 'Velvet' },
      { value: 'Cotton', label: 'Cotton' },
      { value: 'Wax', label: 'Wax' },
    ],
  },
];
