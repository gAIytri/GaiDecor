// FurnitureCategory configuration data
import type { FilterDefinition, ProductTypeTile } from './types';

// Import product type images - 4 categories only
import sofa1 from '@/assets/furniture/sofa/sofa-1.jpg';
import accentChair1 from '@/assets/furniture/accent chairs/accent-chair-1.jpg';
import coffeeTable1 from '@/assets/furniture/coffee table/coffee-table-1.jpg';
import tvStand1 from '@/assets/furniture/tvstand/tv-stand-1.jpg';

// Product Type Tiles - Quick navigation (4 categories)
export const productTypeTiles: ProductTypeTile[] = [
  { name: 'Sofas', slug: 'sofa', image: sofa1 },
  { name: 'Accent Chairs', slug: 'accent-chair', image: accentChair1 },
  { name: 'Coffee Tables', slug: 'coffee-table', image: coffeeTable1 },
  { name: 'TV Stands', slug: 'tv-stand', image: tvStand1 },
];

// Filter Definitions
export const furnitureFilters: FilterDefinition[] = [
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
      { value: 'office', label: 'Office' },
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
      { value: 'emerald', label: 'Emerald', color: '#50C878' },
      { value: 'walnut', label: 'Walnut', color: '#773F1A' },
      { value: 'oak', label: 'Oak', color: '#C19A6B' },
      { value: 'gold', label: 'Gold', color: '#FFD700' },
      { value: 'silver', label: 'Silver', color: '#C0C0C0' },
    ],
  },
  {
    id: 'material',
    label: 'Material',
    type: 'checkbox',
    options: [
      { value: 'Wood', label: 'Wood' },
      { value: 'Metal', label: 'Metal' },
      { value: 'Velvet', label: 'Velvet' },
      { value: 'Linen', label: 'Linen' },
      { value: 'Upholstered Fabric', label: 'Upholstered' },
      { value: 'Mesh', label: 'Mesh & Fabric' },
      { value: 'Glass', label: 'Glass' },
    ],
  },
  {
    id: 'style',
    label: 'Style',
    type: 'checkbox',
    options: [
      { value: 'Modern', label: 'Modern' },
      { value: 'Mid-Century', label: 'Mid-Century' },
      { value: 'Contemporary', label: 'Contemporary' },
      { value: 'Industrial', label: 'Industrial' },
      { value: 'Scandinavian', label: 'Scandinavian' },
      { value: 'Rustic', label: 'Rustic' },
      { value: 'Traditional', label: 'Traditional' },
    ],
  },
];
