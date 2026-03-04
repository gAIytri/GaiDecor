/**
 * Order Confirmation Page
 * Shown after successful checkout.
 */

import { Link, useParams } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

export default function OrderConfirmation() {
  const { orderNumber } = useParams<{ orderNumber: string }>();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-6" />

        <h1 className="text-2xl lg:text-3xl font-medium text-gray-900 mb-3">
          Thank you for your order!
        </h1>
        <p className="text-gray-500 mb-2">
          Your order has been placed successfully.
        </p>
        <p className="text-lg font-medium text-gray-900 mb-8">
          Order Number: {orderNumber || 'ORD-2026-00099'}
        </p>
        <p className="text-sm text-gray-500 mb-10">
          We&apos;ll send you a confirmation email with tracking details once your order ships.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-gray-300 text-sm text-gray-700 uppercase tracking-wider hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            to="/account/orders"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gray-900 text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            <Package className="w-4 h-4" />
            Track Order
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
