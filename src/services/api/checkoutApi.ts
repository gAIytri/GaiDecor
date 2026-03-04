/**
 * Checkout API Service
 * GET /checkout/shipping-methods
 * POST /checkout/calculate-tax
 * POST /checkout/create-payment-intent
 */

import apiClient from './client';
import { mapApiShippingMethod } from './mappers';
import type { ShippingMethod } from '@/types';
import type { ApiShippingMethod, ApiPaymentIntent } from '@/types/api';

export interface TaxCalculation {
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
}

export async function fetchShippingMethods(): Promise<ShippingMethod[]> {
  const { data } = await apiClient.get<ApiShippingMethod[]>('/checkout/shipping-methods');
  return data.map(mapApiShippingMethod);
}

export async function calculateTax(
  shippingAddressId: string,
  shippingMethodId: string
): Promise<TaxCalculation> {
  const { data } = await apiClient.post<{
    subtotal: number;
    tax_rate: number;
    tax_amount: number;
    total: number;
  }>('/checkout/calculate-tax', {
    shipping_address_id: shippingAddressId,
    shipping_method_id: shippingMethodId,
  });
  return {
    subtotal: data.subtotal,
    taxRate: data.tax_rate,
    taxAmount: data.tax_amount,
    total: data.total,
  };
}

export async function createPaymentIntent(
  orderId: string,
  amount: number,
  currency = 'usd'
): Promise<{ clientSecret: string; amount: number; currency: string }> {
  const { data } = await apiClient.post<ApiPaymentIntent>(
    '/checkout/create-payment-intent',
    { order_id: orderId, amount, currency }
  );
  return {
    clientSecret: data.client_secret,
    amount: data.amount,
    currency: data.currency,
  };
}
