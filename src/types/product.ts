/**
 * Universal Product Schema
 * Matches the actual JSON data shape used by productService.ts
 * Works for all product categories: Furniture, Rugs, Lighting, Decor, Art, Bedding
 */

// ---------------------------------------------------------------------------
// Product Image (for API use — future)
// ---------------------------------------------------------------------------

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  displayOrder: number;
}

// ---------------------------------------------------------------------------
// Product Attributes (JSONB from backend / JSON data)
// ---------------------------------------------------------------------------

export interface ProductAttributes {
  color: string[];
  material: string[];
  style: string[];
  room: string[];
  occasion?: string[];

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
// Taxonomy (nested structure matching JSON data)
// ---------------------------------------------------------------------------

export interface ProductTaxonomy {
  category: {
    name: string;
    slug: string;
  };
  subcategory: {
    name: string;
    slug: string;
  };
  productType: string;
}

// ---------------------------------------------------------------------------
// Metadata (nested structure matching JSON data)
// ---------------------------------------------------------------------------

export interface ProductMetadata {
  featured: boolean;
  bestSeller: boolean;
  onSale: boolean;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Visual Attributes
// ---------------------------------------------------------------------------

export interface VisualAttributes {
  primaryColors: Array<{
    name: string;
    hex: string;
    category: string;
  }>;
  pattern: string;
  texture: string;
  finish: string;
  shape: string;
  silhouette: string;
}

// ---------------------------------------------------------------------------
// Core Product Type (matches JSON data shape — used everywhere)
// ---------------------------------------------------------------------------

export interface Product {
  // Core identity
  id: string;
  sku: string;
  name: string;
  description: string;

  // Pricing
  price: number;
  compareAtPrice?: number;
  currency: string;

  // Images (strings after processProducts transforms them)
  primaryImage: string;
  images: string[];

  // Nested structures (match JSON data)
  taxonomy: ProductTaxonomy;
  attributes: ProductAttributes;
  metadata: ProductMetadata;
  enrichedDescription: EnrichedDescription;
  visualAttributes?: VisualAttributes;

  // Tags
  tags: string[];

  // SEO
  seo?: {
    metaTitle: string;
    metaDescription: string;
    altText: string;
    keywords: string[];
  };

  // Enrichment metadata
  enrichmentMeta?: {
    enrichedAt: string;
    version: string;
    confidence: number;
    source: string;
  };
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
