// BeddingCategory configuration data
import type { FilterDefinition, ProductTypeTile } from './types';

// Import product type images - 3 categories
import bedding1 from '@/assets/bedding/bedding-sets/bedding-1.jpeg';
import curtain1 from '@/assets/bedding/curtains/curtain-1.jpeg';
import blanket1 from '@/assets/bedding/throw-blankets/blanket-1.jpeg';

// Product Type Tiles - Quick navigation (3 categories)
export const beddingProductTypeTiles: ProductTypeTile[] = [
  { name: 'Bedding Sets', slug: 'bedding-set', image: bedding1, description: 'Complete Bed Ensembles' },
  { name: 'Curtains', slug: 'curtain', image: curtain1, description: 'Window Treatments' },
  { name: 'Throw Blankets', slug: 'throw-blanket', image: blanket1, description: 'Cozy Layers' },
];

// Filter Definitions
export const beddingFilters: FilterDefinition[] = [
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
      { value: 'Bedroom', label: 'Bedroom' },
      { value: 'Living Room', label: 'Living Room' },
      { value: 'Guest Room', label: 'Guest Room' },
      { value: 'Kids Room', label: 'Kids Room' },
    ],
  },
  {
    id: 'color',
    label: 'Color',
    type: 'color',
    options: [
      { value: 'white', label: 'White', color: '#FFFFFF' },
      { value: 'cream', label: 'Cream', color: '#FFFDD0' },
      { value: 'beige', label: 'Beige', color: '#F5F5DC' },
      { value: 'gray', label: 'Gray', color: '#808080' },
      { value: 'charcoal', label: 'Charcoal', color: '#36454F' },
      { value: 'navy', label: 'Navy', color: '#000080' },
      { value: 'sage', label: 'Sage', color: '#9DC183' },
      { value: 'blush', label: 'Blush', color: '#DE5D83' },
      { value: 'terracotta', label: 'Terracotta', color: '#E2725B' },
      { value: 'natural', label: 'Natural', color: '#D2B48C' },
    ],
  },
  {
    id: 'style',
    label: 'Style',
    type: 'checkbox',
    options: [
      { value: 'Modern', label: 'Modern' },
      { value: 'Contemporary', label: 'Contemporary' },
      { value: 'Minimalist', label: 'Minimalist' },
      { value: 'Bohemian', label: 'Bohemian' },
      { value: 'Classic', label: 'Classic' },
      { value: 'Scandinavian', label: 'Scandinavian' },
      { value: 'Farmhouse', label: 'Farmhouse' },
    ],
  },
  {
    id: 'material',
    label: 'Material',
    type: 'checkbox',
    options: [
      { value: 'Cotton', label: 'Cotton' },
      { value: 'Linen', label: 'Linen' },
      { value: 'Silk', label: 'Silk' },
      { value: 'Velvet', label: 'Velvet' },
      { value: 'Wool', label: 'Wool' },
      { value: 'Cashmere', label: 'Cashmere' },
      { value: 'Polyester', label: 'Polyester' },
      { value: 'Blend', label: 'Blend' },
    ],
  },
  {
    id: 'size',
    label: 'Size',
    type: 'checkbox',
    options: [
      { value: 'Twin', label: 'Twin' },
      { value: 'Full', label: 'Full' },
      { value: 'Queen', label: 'Queen' },
      { value: 'King', label: 'King' },
      { value: 'California King', label: 'California King' },
    ],
  },
];
