/**
 * Order Detail Page — account sub-page
 * Shows order timeline, items, and summary.
 */

import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Package } from 'lucide-react';
import { useOrderStore } from '@/store/useOrderStore';
import { cn } from '@/lib/utils';
import type { Order } from '@/types';

const STATUS_STEPS = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-red-100 text-red-800',
  returned: 'bg-gray-100 text-gray-600',
};

// Mock order fallback (same as Orders page)
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

export default function OrderDetail() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const storeOrders = useOrderStore((s) => s.orders);
  const allOrders = storeOrders.length > 0 ? storeOrders : MOCK_ORDERS;
  const order = allOrders.find((o) => o.orderNumber === orderNumber);

  if (!order) {
    return (
      <div className="py-10 text-center">
        <p className="text-gray-500 mb-3">Order not found.</p>
        <Link
          to="/account/orders"
          className="text-sm text-emerald-600 underline hover:text-emerald-700"
        >
          Back to orders
        </Link>
      </div>
    );
  }

  const currentStepIndex = STATUS_STEPS.indexOf(order.status);

  return (
    <div>
      {/* Back link */}
      <Link
        to="/account/orders"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Orders
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <h2 className="text-lg font-medium text-gray-900">{order.orderNumber}</h2>
        <span
          className={cn(
            'text-[10px] px-2 py-0.5 font-semibold uppercase tracking-wide rounded-sm',
            STATUS_COLORS[order.status] ?? 'bg-gray-100 text-gray-600'
          )}
        >
          {order.status}
        </span>
      </div>

      {/* Status timeline */}
      {!['cancelled', 'returned'].includes(order.status) && (
        <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
          {STATUS_STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-1">
              <div
                className={cn(
                  'w-3 h-3 rounded-full flex-shrink-0',
                  i <= currentStepIndex ? 'bg-emerald-600' : 'bg-gray-200'
                )}
              />
              <span
                className={cn(
                  'text-[10px] uppercase tracking-wide whitespace-nowrap',
                  i <= currentStepIndex ? 'text-gray-900' : 'text-gray-400'
                )}
              >
                {step}
              </span>
              {i < STATUS_STEPS.length - 1 && (
                <div
                  className={cn(
                    'w-8 h-0.5 flex-shrink-0',
                    i < currentStepIndex ? 'bg-emerald-600' : 'bg-gray-200'
                  )}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tracking */}
      {order.trackingNumber && (
        <div className="bg-gray-50 p-4 mb-6 text-sm">
          <span className="text-gray-500">Tracking Number:</span>{' '}
          <span className="text-gray-900 font-medium">{order.trackingNumber}</span>
        </div>
      )}

      {/* Items */}
      <h3 className="text-sm font-medium text-gray-900 mb-3">Items</h3>
      <div className="space-y-3 mb-6">
        {order.items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="w-16 h-16 bg-gray-100 flex-shrink-0 flex items-center justify-center">
              {item.productImage ? (
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Package className="w-6 h-6 text-gray-300" />
              )}
            </div>
            <div className="flex-1 text-sm min-w-0">
              <p className="font-medium text-gray-900">{item.productName}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {item.selectedColor}
                {item.selectedSize && ` · ${item.selectedSize}`}
                {' · '}Qty {item.quantity}
              </p>
            </div>
            <span className="text-sm font-medium text-gray-900">
              ${(item.unitPrice * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <hr className="border-t border-gray-200 mb-6" />

      {/* Summary grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Shipping address */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Shipping Address</h3>
          <div className="text-sm text-gray-500 leading-relaxed">
            <p>
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </p>
            <p>{order.shippingAddress.street1}</p>
            {order.shippingAddress.street2 && <p>{order.shippingAddress.street2}</p>}
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
              {order.shippingAddress.zipCode}
            </p>
          </div>
        </div>

        {/* Order summary */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Order Summary</h3>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-900">${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping</span>
              <span className="text-gray-900">
                {order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tax</span>
              <span className="text-gray-900">${order.tax.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount</span>
                <span>-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <hr className="border-t border-gray-200 my-2" />
            <div className="flex justify-between font-medium text-gray-900">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
