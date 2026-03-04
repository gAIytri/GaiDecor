/**
 * Data Source Facade
 * Routes to local JSON data (productService.ts) or real API services
 * based on the VITE_USE_API environment variable.
 *
 * Drop-in replacement — exports the SAME function signatures as productService.ts.
 */

import type { Product } from '@/types/product';
import type { ProductFilterOptions } from './productService';

// Re-export the filter options type
export type { ProductFilterOptions } from './productService';

const USE_API = import.meta.env.VITE_USE_API === 'true';

// ---------------------------------------------------------------------------
// Local data source (default) — delegate to existing productService
// ---------------------------------------------------------------------------

import * as local from './productService';

// ---------------------------------------------------------------------------
// API data source — wraps async API calls into sync-compatible interface
// For the API path, we return async functions. Consumers that need API mode
// should use the *Async variants. The sync variants always use local data
// as a fallback, ensuring backward compatibility.
// ---------------------------------------------------------------------------

import { productApi, searchApi } from './api';

// ========================= SYNC API (always local data) ==================

export function getAllProducts(): Product[] {
  return local.getAllProducts();
}

export function getProductById(id: string): Product | undefined {
  return local.getProductById(id);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return local.getProductsByCategory(categorySlug);
}

export function getProductsBySubcategory(
  categorySlug: string,
  subcategorySlug: string
): Product[] {
  return local.getProductsBySubcategory(categorySlug, subcategorySlug);
}

export function getFeaturedProducts(limit?: number): Product[] {
  return local.getFeaturedProducts(limit);
}

export function getBestSellerProducts(limit?: number): Product[] {
  return local.getBestSellerProducts(limit);
}

export function getOnSaleProducts(limit?: number): Product[] {
  return local.getOnSaleProducts(limit);
}

export function getSimilarProducts(productId: string, limit = 5): Product[] {
  return local.getSimilarProducts(productId, limit);
}

export function searchProducts(query: string): Product[] {
  return local.searchProducts(query);
}

export function filterProducts(options: ProductFilterOptions): Product[] {
  return local.filterProducts(options);
}

export function getDefaultRecentlyViewed(limit = 5): Product[] {
  return local.getDefaultRecentlyViewed(limit);
}

export function getProductsByIds(ids: string[]): Product[] {
  return local.getProductsByIds(ids);
}

export function getFilterOptions(categorySlug?: string) {
  return local.getFilterOptions(categorySlug);
}

// ========================= ASYNC API (uses real backend when enabled) =====

export async function getAllProductsAsync(
  params?: { page?: number; perPage?: number; sort?: string }
): Promise<{ products: Product[]; total: number }> {
  if (!USE_API) {
    const products = local.getAllProducts();
    return { products, total: products.length };
  }
  const result = await productApi.fetchProducts({
    page: params?.page,
    per_page: params?.perPage,
    sort: params?.sort,
  });
  return { products: result.products, total: result.total };
}

export async function getProductBySlugAsync(slug: string): Promise<Product | undefined> {
  if (!USE_API) {
    // Local data doesn't have slugs in the same way — fall back to ID match
    return local.getProductById(slug);
  }
  try {
    return await productApi.fetchProductBySlug(slug);
  } catch {
    return undefined;
  }
}

export async function getProductsByCategoryAsync(
  categorySlug: string,
  params?: { page?: number; perPage?: number; sort?: string }
): Promise<{ products: Product[]; total: number }> {
  if (!USE_API) {
    const products = local.getProductsByCategory(categorySlug);
    return { products, total: products.length };
  }
  const result = await productApi.fetchCategoryProducts(categorySlug, {
    page: params?.page,
    per_page: params?.perPage,
    sort: params?.sort,
  });
  return { products: result.products, total: result.total };
}

export async function searchProductsAsync(
  query: string,
  page = 1,
  perPage = 20
): Promise<{ products: Product[]; total: number }> {
  if (!USE_API) {
    const products = local.searchProducts(query);
    return { products, total: products.length };
  }
  const result = await searchApi.search(query, page, perPage);
  return { products: result.products, total: result.total };
}

export async function getSimilarProductsAsync(
  productId: string,
  limit = 5
): Promise<Product[]> {
  if (!USE_API) {
    return local.getSimilarProducts(productId, limit);
  }
  try {
    return await productApi.fetchRelatedProducts(productId);
  } catch {
    return local.getSimilarProducts(productId, limit);
  }
}
