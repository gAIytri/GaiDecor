/**
 * Universal Product Schema
 * Works for all product categories: Furniture, Rugs, Lighting, Decor, Art, Bedding
 */

export interface Product {
  // Core Identity
  id: string;
  sku: string;
  name: string;
  description?: string;

  // Pricing
  price: number;
  compareAtPrice?: number; // For showing discounts
  currency: string; // "USD"

  // Media
  images: string[];
  primaryImage: string;

  // Taxonomy (Category Structure)
  taxonomy: {
    category: {
      name: string; // "Furniture"
      slug: string; // "furniture"
    };
    subcategory: {
      name: string; // "Living Room" or "Sofas"
      slug: string; // "living-room" or "sofas"
    };
    productType?: string; // More specific: "3-Seater Sofa"
  };

  // Filterable Attributes
  attributes: {
    // Universal
    color?: string[];
    material?: string[];
    style?: string[];

    // Dimensions
    dimensions?: {
      width?: number;
      height?: number;
      depth?: number;
      diameter?: number; // For round items
      unit: 'cm' | 'in';
    };

    // Furniture-specific
    seatingCapacity?: number;
    numberOfDoors?: number;
    numberOfDrawers?: number;

    // Lighting-specific
    bulbType?: string;
    wattage?: number;
    dimmable?: boolean;
    lightColor?: string; // "Warm", "Cool", "Daylight"

    // Bedding-specific
    size?: string; // "Queen", "King", "Twin"
    threadCount?: number;
    fabricType?: string;

    // Rug-specific
    shape?: string; // "Rectangle", "Round", "Runner"
    pile?: string; // "Low", "Medium", "High"

    // Art-specific
    artMedium?: string; // "Canvas", "Print", "Original"
    orientation?: string; // "Landscape", "Portrait", "Square"
    frame?: boolean;

    // Extensible for any attribute
    [key: string]: any;
  };

  // Tags for filtering (room type, features, collections, etc.)
  tags: string[]; // ["living-room", "bedroom", "modern", "luxury", "sale"]

  // Metadata
  metadata: {
    featured?: boolean;
    new?: boolean;
    bestSeller?: boolean;
    onSale?: boolean;
    inStock: boolean;
    stockQuantity?: number;
    rating?: number;
    reviewCount?: number;
    createdAt: string;
    updatedAt?: string;
  };
}

/**
 * Filter Configuration
 */

export interface FilterOption {
  label: string;
  value: string | null;
  count?: number; // Number of products with this value
}

export type FilterType = 'select' | 'multiselect' | 'range' | 'toggle' | 'color';
export type FilterSource = 'taxonomy' | 'attributes' | 'tags' | 'metadata';

export interface FilterDefinition {
  label: string;
  type: FilterType;
  source: FilterSource;
  field: string; // Dot notation path to field (e.g., "taxonomy.subcategory.slug")
  options?: FilterOption[]; // Predefined options (optional)
  enabled: boolean;
  showCount?: boolean; // Show product count for each option
  multipleValues?: boolean; // Allow multiple selections
}

export interface CategoryFilterConfig {
  categorySlug: string;
  categoryName: string;

  // Available filters for this category
  filters: {
    [filterKey: string]: FilterDefinition;
  };

  // Default sort options
  sortOptions: SortOption[];

  // Default values
  defaultSort?: string;
}

export interface SortOption {
  label: string;
  value: string;
  field?: string;
  order?: 'asc' | 'desc';
}

/**
 * Filter State (used in URL and component state)
 */
export interface FilterState {
  subcategory?: string | null;
  color?: string[];
  material?: string[];
  style?: string[];
  room?: string[];
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  onSale?: boolean;
  [key: string]: any;
}

/**
 * Utility Types
 */

export interface ProductFilters {
  category?: string;
  subcategory?: string;
  colors?: string[];
  materials?: string[];
  tags?: string[];
  priceRange?: [number, number];
  inStock?: boolean;
  sort?: string;
}

export interface ProductSearchResult {
  products: Product[];
  total: number;
  filters: {
    [key: string]: FilterOption[];
  };
}
