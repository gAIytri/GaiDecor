/**
 * Search API Service
 * GET /search, GET /search/suggestions
 */

import apiClient from './client';
import { mapApiProduct } from './mappers';
import type { Product } from '@/types/product';
import type { ApiSearchResponse } from '@/types/api';

export interface SearchResult {
  products: Product[];
  total: number;
  facets: Record<string, Array<{ value: string; count: number }>>;
}

export interface SearchSuggestion {
  text: string;
  type: 'product' | 'category' | 'query';
}

export async function search(
  query: string,
  page = 1,
  perPage = 20
): Promise<SearchResult> {
  const { data } = await apiClient.get<ApiSearchResponse>('/search', {
    params: { q: query, page, per_page: perPage },
  });
  return {
    products: data.products.map(mapApiProduct),
    total: data.total,
    facets: data.facets,
  };
}

export async function fetchSuggestions(query: string): Promise<SearchSuggestion[]> {
  const { data } = await apiClient.get<SearchSuggestion[]>('/search/suggestions', {
    params: { q: query },
  });
  return data;
}
