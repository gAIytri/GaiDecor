/**
 * Cart API Service
 * GET /cart, POST /cart/items, PATCH /cart/items/:id,
 * DELETE /cart/items/:id, DELETE /cart,
 * POST /cart/apply-coupon, DELETE /cart/coupon, POST /cart/merge
 */

import apiClient from './client';
import { mapApiCart } from './mappers';
import type { ApiCart, ApiAddCartItemRequest } from '@/types/api';

export type MappedCart = ReturnType<typeof mapApiCart>;

export async function fetchCart(): Promise<MappedCart> {
  const { data } = await apiClient.get<ApiCart>('/cart');
  return mapApiCart(data);
}

export async function addCartItem(item: ApiAddCartItemRequest): Promise<MappedCart> {
  const { data } = await apiClient.post<ApiCart>('/cart/items', item);
  return mapApiCart(data);
}

export async function updateCartItem(
  itemId: string,
  quantity: number
): Promise<MappedCart> {
  const { data } = await apiClient.patch<ApiCart>(`/cart/items/${itemId}`, { quantity });
  return mapApiCart(data);
}

export async function removeCartItem(itemId: string): Promise<MappedCart> {
  const { data } = await apiClient.delete<ApiCart>(`/cart/items/${itemId}`);
  return mapApiCart(data);
}

export async function clearCart(): Promise<MappedCart> {
  const { data } = await apiClient.delete<ApiCart>('/cart');
  return mapApiCart(data);
}

export async function applyCoupon(code: string): Promise<MappedCart> {
  const { data } = await apiClient.post<ApiCart>('/cart/apply-coupon', { code });
  return mapApiCart(data);
}

export async function removeCoupon(): Promise<MappedCart> {
  const { data } = await apiClient.delete<ApiCart>('/cart/coupon');
  return mapApiCart(data);
}

export async function mergeCart(sessionId: string): Promise<MappedCart> {
  const { data } = await apiClient.post<ApiCart>('/cart/merge', {
    session_id: sessionId,
  });
  return mapApiCart(data);
}
