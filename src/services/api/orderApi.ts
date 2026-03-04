/**
 * Order API Service
 * GET /orders, POST /orders, GET /orders/:orderNumber,
 * POST /orders/:orderNumber/cancel, POST /orders/:orderNumber/return
 */

import apiClient from './client';
import { mapApiOrder } from './mappers';
import type { Order } from '@/types';
import type { ApiOrder, ApiPlaceOrderRequest, PaginatedResponse } from '@/types/api';

export interface OrderListResult {
  orders: Order[];
  total: number;
  page: number;
  pages: number;
}

export async function fetchOrders(
  page = 1,
  perPage = 10
): Promise<OrderListResult> {
  const { data } = await apiClient.get<PaginatedResponse<ApiOrder>>('/orders', {
    params: { page, per_page: perPage },
  });
  return {
    orders: data.items.map(mapApiOrder),
    total: data.total,
    page: data.page,
    pages: data.pages,
  };
}

export async function fetchOrderByNumber(orderNumber: string): Promise<Order> {
  const { data } = await apiClient.get<ApiOrder>(`/orders/${orderNumber}`);
  return mapApiOrder(data);
}

export async function placeOrder(request: ApiPlaceOrderRequest): Promise<Order> {
  const { data } = await apiClient.post<ApiOrder>('/orders', request);
  return mapApiOrder(data);
}

export async function cancelOrder(orderNumber: string): Promise<Order> {
  const { data } = await apiClient.post<ApiOrder>(`/orders/${orderNumber}/cancel`);
  return mapApiOrder(data);
}

export async function returnOrder(
  orderNumber: string,
  reason: string,
  itemIds?: string[]
): Promise<Order> {
  const { data } = await apiClient.post<ApiOrder>(`/orders/${orderNumber}/return`, {
    reason,
    item_ids: itemIds,
  });
  return mapApiOrder(data);
}
