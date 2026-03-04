/**
 * Wishlist API Service
 * GET /wishlist, POST /wishlist, DELETE /wishlist/:productId
 */

import apiClient from './client';
import { mapApiWishlistItem } from './mappers';
import type { Product } from '@/types/product';
import type { ApiWishlistItem } from '@/types/api';

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: string;
}

export async function fetchWishlist(): Promise<WishlistItem[]> {
  const { data } = await apiClient.get<ApiWishlistItem[]>('/wishlist');
  return data.map(mapApiWishlistItem);
}

export async function addToWishlist(productId: string): Promise<WishlistItem> {
  const { data } = await apiClient.post<ApiWishlistItem>('/wishlist', {
    product_id: productId,
  });
  return mapApiWishlistItem(data);
}

export async function removeFromWishlist(productId: string): Promise<void> {
  await apiClient.delete(`/wishlist/${productId}`);
}
