// ArtCategory configuration data
import type { FilterDefinition, ProductTypeTile } from './types';

// Import product type images - 2 categories
import art1 from '@/assets/art/wall-art/art-1.jpeg';
import mirror1 from '@/assets/art/mirrors/mirror-1.jpeg';

// Product Type Tiles - Quick navigation (2 categories)
export const artProductTypeTiles: ProductTypeTile[] = [
  { name: 'Wall Art', slug: 'wall-art', image: art1, description: 'Canvas, Prints & Paintings' },
  { name: 'Mirrors', slug: 'mirror', image: mirror1, description: 'Decorative & Statement Mirrors' },
];

// Filter Definitions
export const artFilters: FilterDefinition[] = [
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
      { value: 'Entryway', label: 'Entryway' },
      { value: 'Office', label: 'Office' },
      { value: 'Bathroom', label: 'Bathroom' },
    ],
  },
  {
    id: 'color',
    label: 'Color',
    type: 'color',
    options: [
      { value: 'black', label: 'Black', color: '#000000' },
      { value: 'white', label: 'White', color: '#FFFFFF' },
      { value: 'gold', label: 'Gold', color: '#FFD700' },
      { value: 'silver', label: 'Silver', color: '#C0C0C0' },
      { value: 'natural', label: 'Natural', color: '#D2B48C' },
      { value: 'blue', label: 'Blue', color: '#4169E1' },
      { value: 'green', label: 'Green', color: '#228B22' },
      { value: 'neutral', label: 'Neutral', color: '#C4B7A6' },
      { value: 'multicolor', label: 'Multicolor', color: 'linear-gradient(45deg, red, yellow, green, blue)' },
    ],
  },
  {
    id: 'style',
    label: 'Style',
    type: 'checkbox',
    options: [
      { value: 'Modern', label: 'Modern' },
      { value: 'Contemporary', label: 'Contemporary' },
      { value: 'Abstract', label: 'Abstract' },
      { value: 'Minimalist', label: 'Minimalist' },
      { value: 'Bohemian', label: 'Bohemian' },
      { value: 'Traditional', label: 'Traditional' },
      { value: 'Vintage', label: 'Vintage' },
      { value: 'Art Deco', label: 'Art Deco' },
    ],
  },
  {
    id: 'material',
    label: 'Material',
    type: 'checkbox',
    options: [
      { value: 'Canvas', label: 'Canvas' },
      { value: 'Glass', label: 'Glass' },
      { value: 'Metal', label: 'Metal' },
      { value: 'Wood', label: 'Wood' },
      { value: 'Acrylic', label: 'Acrylic' },
      { value: 'Paper', label: 'Paper' },
    ],
  },
  {
    id: 'size',
    label: 'Size',
    type: 'checkbox',
    options: [
      { value: 'Small', label: 'Small (Under 24")' },
      { value: 'Medium', label: 'Medium (24" - 36")' },
      { value: 'Large', label: 'Large (36" - 48")' },
      { value: 'Oversized', label: 'Oversized (Over 48")' },
    ],
  },
];
