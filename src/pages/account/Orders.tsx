/**
 * Orders Page — account sub-page
 * Displays order history from useOrderStore (with mock fallback).
 */

import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { useOrderStore } from '@/store/useOrderStore';
import { cn } from '@/lib/utils';
import type { Order } from '@/types';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-red-100 text-red-800',
  returned: 'bg-gray-100 text-gray-600',
};

const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-1',
    orderNumber: 'ORD-2026-00042',
    items: [
      {
        id: 'oi-1',
        productId: 'sofa-3',
        productName: 'Mid-Century Tufted Sofa',
        productImage: '',
        selectedColor: 'Terracotta',
        quantity: 1,
        unitPrice: 749.99,
      },
    ],
    status: 'shipped',
    subtotal: 749.99,
    shipping: 0,
    tax: 60.0,
    discount: 0,
    total: 809.99,
    shippingAddress: {
      id: 'addr-1',
      label: 'Home',
      firstName: 'Sarah',
      lastName: 'Johnson',
      street1: '742 Evergreen Terrace',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      country: 'US',
      phone: '(555) 123-4567',
      isDefault: true,
    },
    trackingNumber: 'TRK-9876543210',
    createdAt: '2026-02-15T10:30:00Z',
    updatedAt: '2026-02-18T14:00:00Z',
  },
  {
    id: 'ord-2',
    orderNumber: 'ORD-2026-00038',
    items: [
      {
        id: 'oi-2',
        productId: 'lamp-1',
        productName: 'Arc Floor Lamp',
        productImage: '',
        selectedColor: 'Brushed Gold',
        quantity: 2,
        unitPrice: 189.99,
      },
    ],
    status: 'delivered',
    subtotal: 379.98,
    shipping: 0,
    tax: 30.4,
    discount: 0,
    total: 410.38,
    shippingAddress: {
      id: 'addr-1',
      label: 'Home',
      firstName: 'Sarah',
      lastName: 'Johnson',
      street1: '742 Evergreen Terrace',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      country: 'US',
      phone: '(555) 123-4567',
      isDefault: true,
    },
    createdAt: '2026-01-22T09:15:00Z',
    updatedAt: '2026-01-28T16:30:00Z',
  },
];

export default function Orders() {
  const storeOrders = useOrderStore((s) => s.orders);
  const orders = storeOrders.length > 0 ? storeOrders : MOCK_ORDERS;

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No orders yet.</p>
        <Link
          to="/"
          className="text-sm text-emerald-600 underline mt-2 inline-block hover:text-emerald-700"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-6">Order History</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/account/orders/${order.orderNumber}`}
            className="block border border-gray-200 p-5 hover:border-emerald-300 transition-colors"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-sm font-medium text-gray-900">{order.orderNumber}</span>
              <span
                className={cn(
                  'text-[10px] px-2 py-0.5 font-semibold uppercase tracking-wide rounded-sm',
                  STATUS_COLORS[order.status] ?? 'bg-gray-100 text-gray-600'
                )}
              >
                {order.status}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-gray-500">
              <span>
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="font-medium text-gray-900">${order.total.toFixed(2)}</span>
            </div>
            <div className="flex gap-2 mt-3">
              {order.items.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="w-12 h-12 bg-gray-100 flex-shrink-0 flex items-center justify-center text-xs text-gray-400"
                >
                  {item.productImage ? (
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package className="w-5 h-5" />
                  )}
                </div>
              ))}
              {order.items.length > 4 && (
                <div className="w-12 h-12 bg-gray-100 flex-shrink-0 flex items-center justify-center text-xs text-gray-500">
                  +{order.items.length - 4}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
