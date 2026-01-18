/**
 * Product Service
 * Centralized data access layer for all product operations.
 * Uses local images from the existing image mapping system.
 */

import type { Product } from '@/types/product';

// Import all category data
import furnitureData from '@/data/furniture.json';
import lightingData from '@/data/lighting.json';
import rugsData from '@/data/rugs.json';
import decorData from '@/data/decor.json';
import artData from '@/data/art.json';
import beddingData from '@/data/bedding.json';

// Import all image mappings from the existing system
import {
  furnitureImagesByFilename,
  rugsImagesByFilename,
  lightingImagesByFilename,
  decorImagesByFilename,
  artImagesByFilename,
  beddingImagesByFilename,
} from '@/data/images';

// Combined image mapping for all categories
const allImagesByFilename: Record<string, string> = {
  ...furnitureImagesByFilename,
  ...rugsImagesByFilename,
  ...lightingImagesByFilename,
  ...decorImagesByFilename,
  ...artImagesByFilename,
  ...beddingImagesByFilename,
};

/**
 * Get the imported image for a filename
 */
function getImageByFilename(filename: string): string {
  return allImagesByFilename[filename] || filename;
}

/**
 * Process raw product data and assign proper local image paths using imports
 */
function processProducts(rawProducts: any[]): Product[] {
  return rawProducts.map((product) => {
    const primaryImageFilename = product.primaryImage || product.images?.[0] || '';
    const primaryImage = getImageByFilename(primaryImageFilename);

    // Get all images from the product
    const imageFilenames = product.images || [];
    const images = imageFilenames.map((filename: string) => getImageByFilename(filename));

    // For gallery, create 5 images (repeat if needed)
    const galleryImages: string[] = [];
    for (let i = 0; i < 5; i++) {
      galleryImages.push(images[i % images.length] || primaryImage);
    }

    return {
      ...product,
      primaryImage,
      images: galleryImages,
    } as Product;
  });
}

// Process all products from all categories
const allRawProducts = [
  ...furnitureData,
  ...lightingData,
  ...rugsData,
  ...decorData,
  ...artData,
  ...beddingData,
];

// Create the processed products database with local image paths
const productsDB: Product[] = processProducts(allRawProducts);

// Create index by ID for fast lookups
const productsByIdIndex = new Map<string, Product>();
productsDB.forEach((product) => {
  productsByIdIndex.set(product.id, product);
});

// Create index by category for fast category queries
const productsByCategoryIndex = new Map<string, Product[]>();
productsDB.forEach((product) => {
  const categorySlug = product.taxonomy?.category?.slug;
  if (categorySlug) {
    const existing = productsByCategoryIndex.get(categorySlug) || [];
    existing.push(product);
    productsByCategoryIndex.set(categorySlug, existing);
  }
});

// ============= PUBLIC API =============

/**
 * Get all products
 */
export function getAllProducts(): Product[] {
  return productsDB;
}

/**
 * Get a single product by ID
 */
export function getProductById(id: string): Product | undefined {
  return productsByIdIndex.get(id);
}

/**
 * Get products by category slug
 */
export function getProductsByCategory(categorySlug: string): Product[] {
  return productsByCategoryIndex.get(categorySlug) || [];
}

/**
 * Get products by subcategory
 */
export function getProductsBySubcategory(
  categorySlug: string,
  subcategorySlug: string
): Product[] {
  const categoryProducts = getProductsByCategory(categorySlug);
  return categoryProducts.filter(
    (p) => p.taxonomy?.subcategory?.slug === subcategorySlug
  );
}

/**
 * Get featured products
 */
export function getFeaturedProducts(limit?: number): Product[] {
  const featured = productsDB.filter((p) => p.metadata?.featured);
  return limit ? featured.slice(0, limit) : featured;
}

/**
 * Get best seller products
 */
export function getBestSellerProducts(limit?: number): Product[] {
  const bestSellers = productsDB.filter((p) => p.metadata?.bestSeller);
  return limit ? bestSellers.slice(0, limit) : bestSellers;
}

/**
 * Get products on sale
 */
export function getOnSaleProducts(limit?: number): Product[] {
  const onSale = productsDB.filter((p) => p.metadata?.onSale);
  return limit ? onSale.slice(0, limit) : onSale;
}

/**
 * Get similar products (same category, different product)
 */
export function getSimilarProducts(productId: string, limit: number = 5): Product[] {
  const product = getProductById(productId);
  if (!product) return [];

  const categorySlug = product.taxonomy?.category?.slug;
  if (!categorySlug) return [];

  return getProductsByCategory(categorySlug)
    .filter((p) => p.id !== productId)
    .slice(0, limit);
}

/**
 * Search products by name or description
 */
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return productsDB.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description?.toLowerCase().includes(lowerQuery) ||
      p.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Filter products with multiple criteria
 */
export interface ProductFilterOptions {
  categorySlug?: string;
  subcategorySlug?: string;
  colors?: string[];
  materials?: string[];
  styles?: string[];
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  onSale?: boolean;
  featured?: boolean;
}

export function filterProducts(options: ProductFilterOptions): Product[] {
  let results = productsDB;

  if (options.categorySlug) {
    results = results.filter(
      (p) => p.taxonomy?.category?.slug === options.categorySlug
    );
  }

  if (options.subcategorySlug) {
    results = results.filter(
      (p) => p.taxonomy?.subcategory?.slug === options.subcategorySlug
    );
  }

  if (options.colors && options.colors.length > 0) {
    results = results.filter((p) =>
      options.colors!.some((color) => p.attributes?.color?.includes(color))
    );
  }

  if (options.materials && options.materials.length > 0) {
    results = results.filter((p) =>
      options.materials!.some((material) =>
        p.attributes?.material?.includes(material)
      )
    );
  }

  if (options.styles && options.styles.length > 0) {
    results = results.filter((p) =>
      options.styles!.some((style) => p.attributes?.style?.includes(style))
    );
  }

  if (options.priceMin !== undefined) {
    results = results.filter((p) => p.price >= options.priceMin!);
  }

  if (options.priceMax !== undefined) {
    results = results.filter((p) => p.price <= options.priceMax!);
  }

  if (options.inStock !== undefined) {
    results = results.filter((p) => p.metadata?.inStock === options.inStock);
  }

  if (options.onSale !== undefined) {
    results = results.filter((p) => p.metadata?.onSale === options.onSale);
  }

  if (options.featured !== undefined) {
    results = results.filter((p) => p.metadata?.featured === options.featured);
  }

  return results;
}

/**
 * Get default products for "Recently Viewed" section (for new users)
 * Returns a curated mix of products from different categories
 */
export function getDefaultRecentlyViewed(limit: number = 5): Product[] {
  // Pick products from each category for variety
  const categories = ['furniture', 'lighting', 'rugs', 'decor', 'art', 'bedding'];
  const defaultProducts: Product[] = [];

  // First pass: get one featured/first product from each category
  for (const category of categories) {
    if (defaultProducts.length >= limit) break;
    const products = getProductsByCategory(category);
    if (products.length > 0) {
      const featured = products.find((p) => p.metadata?.featured);
      defaultProducts.push(featured || products[0]);
    }
  }

  // Second pass: if we don't have enough, get more from categories with products
  if (defaultProducts.length < limit) {
    const existingIds = new Set(defaultProducts.map((p) => p.id));
    for (const category of categories) {
      if (defaultProducts.length >= limit) break;
      const products = getProductsByCategory(category);
      for (const product of products) {
        if (!existingIds.has(product.id)) {
          defaultProducts.push(product);
          existingIds.add(product.id);
          if (defaultProducts.length >= limit) break;
        }
      }
    }
  }

  return defaultProducts.slice(0, limit);
}

/**
 * Get products by their IDs (for recently viewed)
 */
export function getProductsByIds(ids: string[]): Product[] {
  return ids
    .map((id) => productsByIdIndex.get(id))
    .filter((p): p is Product => p !== undefined);
}

/**
 * Get unique filter values for a category
 */
export function getFilterOptions(categorySlug?: string) {
  const products = categorySlug
    ? getProductsByCategory(categorySlug)
    : productsDB;

  const colors = new Set<string>();
  const materials = new Set<string>();
  const styles = new Set<string>();
  const subcategories = new Map<string, string>();

  products.forEach((p) => {
    p.attributes?.color?.forEach((c) => colors.add(c));
    p.attributes?.material?.forEach((m) => materials.add(m));
    p.attributes?.style?.forEach((s) => styles.add(s));
    if (p.taxonomy?.subcategory?.slug && p.taxonomy?.subcategory?.name) {
      subcategories.set(p.taxonomy.subcategory.slug, p.taxonomy.subcategory.name);
    }
  });

  return {
    colors: Array.from(colors).sort(),
    materials: Array.from(materials).sort(),
    styles: Array.from(styles).sort(),
    subcategories: Array.from(subcategories.entries()).map(([slug, name]) => ({
      slug,
      name,
    })),
  };
}
