// RugsCategory configuration data
import type { FilterDefinition, ProductTypeTile } from './types';

// Import product type images - 4 categories
import rug1 from '@/assets/rugs/rug-1.jpeg';
import rug8 from '@/assets/rugs/rug-8.jpeg';
import rug15 from '@/assets/rugs/rug-15.jpeg';
import rug20 from '@/assets/rugs/rug-20.jpg';

// Product Type Tiles - Quick navigation (4 categories)
export const rugProductTypeTiles: ProductTypeTile[] = [
  { name: 'Indoor Rugs', slug: 'indoor-rug', image: rug1 },
  { name: 'Indoor/Outdoor Rugs', slug: 'indoor-outdoor-rug', image: rug8 },
  { name: 'Reversible Rugs', slug: 'reversible-rug', image: rug15 },
  { name: 'Natural Fiber Rugs', slug: 'natural-fiber-rug', image: rug20 },
];

// Filter Definitions
export const rugsFilters: FilterDefinition[] = [
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
      { value: 'living-room', label: 'Living Room' },
      { value: 'bedroom', label: 'Bedroom' },
      { value: 'dining-room', label: 'Dining Room' },
      { value: 'entryway', label: 'Entryway' },
      { value: 'outdoor', label: 'Outdoor' },
    ],
  },
  {
    id: 'color',
    label: 'Color',
    type: 'color',
    options: [
      { value: 'white', label: 'White', color: '#FFFFFF' },
      { value: 'black', label: 'Black', color: '#000000' },
      { value: 'gray', label: 'Gray', color: '#808080' },
      { value: 'beige', label: 'Beige', color: '#F5F5DC' },
      { value: 'brown', label: 'Brown', color: '#8B4513' },
      { value: 'blue', label: 'Blue', color: '#4169E1' },
      { value: 'navy', label: 'Navy', color: '#000080' },
      { value: 'cream', label: 'Cream', color: '#FFFDD0' },
      { value: 'terracotta', label: 'Terracotta', color: '#E2725B' },
      { value: 'green', label: 'Green', color: '#228B22' },
      { value: 'rust', label: 'Rust', color: '#B7410E' },
      { value: 'gold', label: 'Gold', color: '#FFD700' },
    ],
  },
  {
    id: 'material',
    label: 'Material',
    type: 'checkbox',
    options: [
      { value: 'Wool', label: 'Wool' },
      { value: 'Cotton', label: 'Cotton' },
      { value: 'Jute', label: 'Jute' },
      { value: 'Polypropylene', label: 'Polypropylene' },
      { value: 'Polyester', label: 'Polyester' },
      { value: 'Sisal', label: 'Sisal' },
      { value: 'Seagrass', label: 'Seagrass' },
    ],
  },
  {
    id: 'style',
    label: 'Style',
    type: 'checkbox',
    options: [
      { value: 'Modern', label: 'Modern' },
      { value: 'Traditional', label: 'Traditional' },
      { value: 'Bohemian', label: 'Bohemian' },
      { value: 'Moroccan', label: 'Moroccan' },
      { value: 'Coastal', label: 'Coastal' },
      { value: 'Farmhouse', label: 'Farmhouse' },
      { value: 'Minimalist', label: 'Minimalist' },
    ],
  },
];
