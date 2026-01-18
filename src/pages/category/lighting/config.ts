// LightingCategory configuration data
import type { FilterDefinition, ProductTypeTile } from './types';

// Import product type images - 4 categories
import ceilingLight1 from '@/assets/lighting/ceiling-lights/ceiling-light-1.jpeg';
import floorLamp1 from '@/assets/lighting/floor-lamps/floor-lamp-1.jpeg';
import tableLamp1 from '@/assets/lighting/table-lamps/table-lamp-1.jpeg';
import wallSconce1 from '@/assets/lighting/wall-sconces/wall-sconce-1.jpeg';

// Product Type Tiles - Quick navigation (4 categories)
export const lightingProductTypeTiles: ProductTypeTile[] = [
  { name: 'Ceiling Lights', slug: 'ceiling-light', image: ceilingLight1, description: 'Chandeliers, Pendants & Flush Mounts' },
  { name: 'Floor Lamps', slug: 'floor-lamp', image: floorLamp1, description: 'Arc, Tripod & Task Lamps' },
  { name: 'Table Lamps', slug: 'table-lamp', image: tableLamp1, description: 'Desk & Accent Lamps' },
  { name: 'Wall Sconces', slug: 'wall-sconce', image: wallSconce1, description: 'Modern & Vintage Wall Lights' },
];

// Filter Definitions
export const lightingFilters: FilterDefinition[] = [
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
      { value: 'Kitchen', label: 'Kitchen' },
      { value: 'Office', label: 'Office' },
      { value: 'Hallway', label: 'Hallway' },
    ],
  },
  {
    id: 'color',
    label: 'Color',
    type: 'color',
    options: [
      { value: 'white', label: 'White', color: '#FFFFFF' },
      { value: 'black', label: 'Black', color: '#000000' },
      { value: 'gold', label: 'Gold', color: '#FFD700' },
      { value: 'brass', label: 'Brass', color: '#B5A642' },
      { value: 'silver', label: 'Silver', color: '#C0C0C0' },
      { value: 'copper', label: 'Copper', color: '#B87333' },
      { value: 'natural', label: 'Natural', color: '#D2B48C' },
      { value: 'beige', label: 'Beige', color: '#F5F5DC' },
      { value: 'crystal', label: 'Crystal', color: '#E8E8E8' },
      { value: 'blue', label: 'Blue', color: '#4169E1' },
      { value: 'purple', label: 'Purple', color: '#9370DB' },
      { value: 'green', label: 'Green', color: '#228B22' },
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
      { value: 'Traditional', label: 'Traditional' },
      { value: 'Vintage', label: 'Vintage' },
      { value: 'Minimalist', label: 'Minimalist' },
      { value: 'Organic', label: 'Organic' },
    ],
  },
  {
    id: 'material',
    label: 'Material',
    type: 'checkbox',
    options: [
      { value: 'Metal', label: 'Metal' },
      { value: 'Glass', label: 'Glass' },
      { value: 'Crystal', label: 'Crystal' },
      { value: 'Wood', label: 'Wood' },
      { value: 'Fabric', label: 'Fabric' },
      { value: 'Ceramic', label: 'Ceramic' },
      { value: 'Marble', label: 'Marble' },
      { value: 'Acrylic', label: 'Acrylic' },
      { value: 'Linen', label: 'Linen' },
    ],
  },
  {
    id: 'bulbType',
    label: 'Bulb Type',
    type: 'checkbox',
    options: [
      { value: 'E12', label: 'E12 (Candelabra)' },
      { value: 'E26', label: 'E26 (Standard)' },
      { value: 'LED', label: 'LED' },
    ],
  },
];
