/**
 * Universal Product Schema
 * Canonical Product type aligned with backend API.
 * Works for all product categories: Furniture, Rugs, Lighting, Decor, Art, Bedding
 */

// ---------------------------------------------------------------------------
// Product Image
// ---------------------------------------------------------------------------

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  displayOrder: number;
}

// ---------------------------------------------------------------------------
// Product Attributes (JSONB from backend)
// ---------------------------------------------------------------------------

export interface ProductAttributes {
  color: string[];
  material: string[];
  style: string[];
  room: string[];

  // Dimensions
  dimensions?: {
    width?: number;
    height?: number;
    depth?: number;
    diameter?: number;
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
  lightColor?: string;

  // Bedding-specific
  size?: string;
  threadCount?: number;
  fabricType?: string;

  // Rug-specific
  shape?: string;
  pile?: string;

  // Art-specific
  artMedium?: string;
  orientation?: string;
  frame?: boolean;

  // Extensible for any attribute
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Enriched Description (from AI-generated backend content)
// ---------------------------------------------------------------------------

export interface EnrichedDescription {
  short: string;
  long: string;
  features: string[];
  careInstructions: string;
}

// ---------------------------------------------------------------------------
// Core Product Type (canonical — used everywhere)
// ---------------------------------------------------------------------------

export interface Product {
  // Core identity
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;

  // Pricing
  price: number;
  compareAtPrice: number | null;
  currency: string;

  // Taxonomy
  categoryId: string;
  categorySlug: string;
  categoryName: string;
  productTypeId: string;
  productTypeName: string;

  // Stock
  stockQuantity: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock' | 'pre_order';

  // Structured data
  attributes: ProductAttributes;
  images: ProductImage[];
  enrichedDescription: EnrichedDescription;

  // Metadata
  isFeatured: boolean;
  isBestseller: boolean;
  avgRating: number;
  reviewCount: number;
  tags: string[];
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Category & Product Type
// ---------------------------------------------------------------------------

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  displayOrder: number;
  productTypes: ProductType[];
  productCount: number;
}

export interface ProductType {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
}

// ---------------------------------------------------------------------------
// Filter Configuration (for dynamic filter sidebar)
// ---------------------------------------------------------------------------

export interface FilterOption {
  label: string;
  value: string | null;
  count?: number;
}

export type FilterType = 'select' | 'multiselect' | 'range' | 'toggle' | 'color';
export type FilterSource = 'taxonomy' | 'attributes' | 'tags' | 'metadata';

export interface FilterDefinition {
  label: string;
  type: FilterType;
  source: FilterSource;
  field: string;
  options?: FilterOption[];
  enabled: boolean;
  showCount?: boolean;
  multipleValues?: boolean;
}

export interface CategoryFilterConfig {
  categorySlug: string;
  categoryName: string;
  filters: Record<string, FilterDefinition>;
  sortOptions: SortOption[];
  defaultSort?: string;
}

export type SortOption = 'best-selling' | 'price-asc' | 'price-desc' | 'newest' | 'top-rated';

// ---------------------------------------------------------------------------
// Filter State (used in URL and component state)
// ---------------------------------------------------------------------------

export interface FilterState {
  colors: string[];
  materials: string[];
  styles: string[];
  rooms: string[];
  priceRange: [number, number];
  sort: SortOption;
  page: number;
  perPage: number;
}

// ---------------------------------------------------------------------------
// Product Search / Listing
// ---------------------------------------------------------------------------

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
  filters: Record<string, FilterOption[]>;
}
