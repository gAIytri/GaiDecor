/**
 * Product API Service
 * GET /products, GET /products/:slug, GET /products/:id/reviews
 * GET /categories, GET /categories/:slug/products
 */

import apiClient from './client';
import { mapApiProduct, mapApiCategory, mapApiReview } from './mappers';
import type { Product, Category } from '@/types/product';
import type { Review } from '@/types';
import type { ApiProduct, ApiCategory, ApiReview, PaginatedResponse } from '@/types/api';

export interface ProductListParams {
  category?: string;
  price_min?: number;
  price_max?: number;
  tags?: string;
  sort?: string;
  page?: number;
  per_page?: number;
  search?: string;
  is_featured?: boolean;
  is_bestseller?: boolean;
  is_new?: boolean;
}

export interface ProductListResult {
  products: Product[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export async function fetchProducts(
  params: ProductListParams = {}
): Promise<ProductListResult> {
  const { data } = await apiClient.get<PaginatedResponse<ApiProduct>>('/products', { params });
  return {
    products: data.items.map(mapApiProduct),
    total: data.total,
    page: data.page,
    perPage: data.per_page,
    pages: data.pages,
  };
}

export async function fetchProductBySlug(slug: string): Promise<Product> {
  const { data } = await apiClient.get<ApiProduct>(`/products/${slug}`);
  return mapApiProduct(data);
}

export async function fetchProductReviews(
  productId: string,
  page = 1,
  perPage = 10
): Promise<{ reviews: Review[]; total: number; pages: number }> {
  const { data } = await apiClient.get<PaginatedResponse<ApiReview>>(
    `/products/${productId}/reviews`,
    { params: { page, per_page: perPage } }
  );
  return {
    reviews: data.items.map(mapApiReview),
    total: data.total,
    pages: data.pages,
  };
}

export async function fetchRelatedProducts(productId: string): Promise<Product[]> {
  const { data } = await apiClient.get<ApiProduct[]>(`/products/${productId}/related`);
  return data.map(mapApiProduct);
}

export async function fetchCategories(): Promise<Category[]> {
  const { data } = await apiClient.get<ApiCategory[]>('/categories');
  return data.map(mapApiCategory);
}

export async function fetchCategoryBySlug(slug: string): Promise<Category> {
  const { data } = await apiClient.get<ApiCategory>(`/categories/${slug}`);
  return mapApiCategory(data);
}

export async function fetchCategoryProducts(
  slug: string,
  params: Omit<ProductListParams, 'category'> = {}
): Promise<ProductListResult> {
  const { data } = await apiClient.get<PaginatedResponse<ApiProduct>>(
    `/categories/${slug}/products`,
    { params }
  );
  return {
    products: data.items.map(mapApiProduct),
    total: data.total,
    page: data.page,
    perPage: data.per_page,
    pages: data.pages,
  };
}
