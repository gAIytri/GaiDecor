// AllProducts configuration - Merged filters from all categories

export interface FilterOption {
  value: string;
  label: string;
  color?: string;
}

export interface FilterDefinition {
  id: string;
  label: string;
  type: 'checkbox' | 'color';
  options?: FilterOption[];
}

// Category filter for filtering by product category
export const categoryFilter: FilterDefinition = {
  id: 'category',
  label: 'Category',
  type: 'checkbox',
  options: [
    { value: 'furniture', label: 'Furniture' },
    { value: 'rugs', label: 'Rugs' },
    { value: 'lighting', label: 'Lighting' },
    { value: 'decor', label: 'Decor' },
    { value: 'bedding', label: 'Bedding' },
    { value: 'art', label: 'Art & Mirrors' },
  ],
};

// Sale filter for clearance items
export const saleFilter: FilterDefinition = {
  id: 'sale',
  label: 'Sale',
  type: 'checkbox',
  options: [
    { value: '10-20', label: '10-20% Off' },
    { value: '20-30', label: '20-30% Off' },
    { value: '30-40', label: '30-40% Off' },
    { value: '40+', label: '40%+ Off' },
  ],
};

// Merged Room filter - deduplicated from all categories
export const roomFilter: FilterDefinition = {
  id: 'room',
  label: 'Room',
  type: 'checkbox',
  options: [
    { value: 'living-room', label: 'Living Room' },
    { value: 'bedroom', label: 'Bedroom' },
    { value: 'dining-room', label: 'Dining Room' },
    { value: 'office', label: 'Office' },
    { value: 'entryway', label: 'Entryway' },
    { value: 'outdoor', label: 'Outdoor' },
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'hallway', label: 'Hallway' },
    { value: 'bathroom', label: 'Bathroom' },
    { value: 'guest-room', label: 'Guest Room' },
    { value: 'kids-room', label: 'Kids Room' },
  ],
};

// Merged Color filter - deduplicated from all categories
export const colorFilter: FilterDefinition = {
  id: 'color',
  label: 'Color',
  type: 'color',
  options: [
    { value: 'white', label: 'White', color: '#FFFFFF' },
    { value: 'black', label: 'Black', color: '#000000' },
    { value: 'gray', label: 'Gray', color: '#808080' },
    { value: 'beige', label: 'Beige', color: '#F5F5DC' },
    { value: 'brown', label: 'Brown', color: '#8B4513' },
    { value: 'cream', label: 'Cream', color: '#FFFDD0' },
    { value: 'blue', label: 'Blue', color: '#4169E1' },
    { value: 'navy', label: 'Navy', color: '#000080' },
    { value: 'green', label: 'Green', color: '#228B22' },
    { value: 'emerald', label: 'Emerald', color: '#50C878' },
    { value: 'sage', label: 'Sage', color: '#9DC183' },
    { value: 'gold', label: 'Gold', color: '#FFD700' },
    { value: 'silver', label: 'Silver', color: '#C0C0C0' },
    { value: 'brass', label: 'Brass', color: '#B5A642' },
    { value: 'copper', label: 'Copper', color: '#B87333' },
    { value: 'walnut', label: 'Walnut', color: '#773F1A' },
    { value: 'oak', label: 'Oak', color: '#C19A6B' },
    { value: 'natural', label: 'Natural', color: '#D2B48C' },
    { value: 'terracotta', label: 'Terracotta', color: '#E2725B' },
    { value: 'rust', label: 'Rust', color: '#B7410E' },
    { value: 'blush', label: 'Blush', color: '#DE5D83' },
    { value: 'charcoal', label: 'Charcoal', color: '#36454F' },
    { value: 'neutral', label: 'Neutral', color: '#C4B7A6' },
    { value: 'multicolor', label: 'Multicolor', color: 'linear-gradient(45deg, red, yellow, green, blue)' },
  ],
};

// Merged Material filter - deduplicated from all categories
export const materialFilter: FilterDefinition = {
  id: 'material',
  label: 'Material',
  type: 'checkbox',
  options: [
    { value: 'Wood', label: 'Wood' },
    { value: 'Metal', label: 'Metal' },
    { value: 'Glass', label: 'Glass' },
    { value: 'Velvet', label: 'Velvet' },
    { value: 'Linen', label: 'Linen' },
    { value: 'Cotton', label: 'Cotton' },
    { value: 'Leather', label: 'Leather' },
    { value: 'Fabric', label: 'Fabric' },
    { value: 'Ceramic', label: 'Ceramic' },
    { value: 'Porcelain', label: 'Porcelain' },
    { value: 'Stone', label: 'Stone' },
    { value: 'Marble', label: 'Marble' },
    { value: 'Crystal', label: 'Crystal' },
    { value: 'Wool', label: 'Wool' },
    { value: 'Jute', label: 'Jute' },
    { value: 'Polypropylene', label: 'Polypropylene' },
    { value: 'Polyester', label: 'Polyester' },
    { value: 'Sisal', label: 'Sisal' },
    { value: 'Seagrass', label: 'Seagrass' },
    { value: 'Silk', label: 'Silk' },
    { value: 'Cashmere', label: 'Cashmere' },
    { value: 'Acrylic', label: 'Acrylic' },
    { value: 'Canvas', label: 'Canvas' },
    { value: 'Paper', label: 'Paper' },
    { value: 'Wax', label: 'Wax' },
  ],
};

// Merged Style filter - deduplicated from all categories
export const styleFilter: FilterDefinition = {
  id: 'style',
  label: 'Style',
  type: 'checkbox',
  options: [
    { value: 'Modern', label: 'Modern' },
    { value: 'Contemporary', label: 'Contemporary' },
    { value: 'Mid-Century', label: 'Mid-Century' },
    { value: 'Minimalist', label: 'Minimalist' },
    { value: 'Scandinavian', label: 'Scandinavian' },
    { value: 'Industrial', label: 'Industrial' },
    { value: 'Rustic', label: 'Rustic' },
    { value: 'Traditional', label: 'Traditional' },
    { value: 'Bohemian', label: 'Bohemian' },
    { value: 'Farmhouse', label: 'Farmhouse' },
    { value: 'Coastal', label: 'Coastal' },
    { value: 'Moroccan', label: 'Moroccan' },
    { value: 'Vintage', label: 'Vintage' },
    { value: 'Organic', label: 'Organic' },
    { value: 'Abstract', label: 'Abstract' },
    { value: 'Art Deco', label: 'Art Deco' },
    { value: 'Classic', label: 'Classic' },
  ],
};

// All filters combined in order
export const allProductsFilters: FilterDefinition[] = [
  categoryFilter,
  saleFilter,
  roomFilter,
  colorFilter,
  materialFilter,
  styleFilter,
];
