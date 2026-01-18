/**
 * Cart Page
 * Full cart view with split layout matching reference design:
 * - Left: Scrollable cart items
 * - Right: Fixed order summary
 */

import { Link } from 'react-router-dom';
import { Minus, Plus } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();

  const subtotal = getTotal();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-medium text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link
          to="/"
          className="px-8 py-3 bg-gray-900 text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 lg:py-12">
        {/* Page Title */}
        <h1 className="text-2xl lg:text-3xl font-medium text-gray-900 uppercase tracking-[0.15em] mb-10 lg:mb-14">
          Cart
          <span className="text-gray-500 ml-2">({itemCount})</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left Side - Cart Items */}
          <div className="flex-1">
            <div>
              {items.map((item, index) => (
                <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}>
                  <div className="flex gap-5 lg:gap-8 py-6">
                    {/* Product Image */}
                    <Link
                      to={`/product/${item.product.id}`}
                      className="flex-shrink-0 w-[100px] h-[120px] lg:w-[120px] lg:h-[140px] bg-white flex items-center justify-center"
                    >
                      {typeof item.product.images[0] === 'string' && item.product.images[0].length > 10 ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-4xl">{item.product.images[0]}</span>
                      )}
                    </Link>

                    {/* Product Info & Controls */}
                    <div className="flex-1 min-w-0 flex flex-col lg:flex-row lg:items-start lg:justify-between">
                      {/* Left: Name, Color, Remove */}
                      <div className="flex-1 pr-4">
                        <Link to={`/product/${item.product.id}`}>
                          <h3 className="text-sm lg:text-base text-gray-900 leading-relaxed hover:text-gray-600 transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>

                        {/* Variants */}
                        {item.selectedColor && (
                          <p className="text-sm text-gray-500 mt-2">
                            Color : <span className="text-gray-700">{item.selectedColor}</span>
                          </p>
                        )}

                        {/* Remove Link */}
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-sm text-gray-500 underline mt-4 hover:text-gray-900 transition-colors"
                        >
                          Remove
                        </button>
                      </div>

                      {/* Right: Price & Quantity */}
                      <div className="flex items-end lg:items-start justify-between lg:flex-col lg:items-end gap-4 mt-4 lg:mt-0">
                        {/* Price */}
                        <div className="text-right flex items-center gap-2">
                          {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                            <span className="text-sm text-gray-400 line-through">
                              ${item.product.originalPrice.toFixed(2)}
                            </span>
                          )}
                          <span className="text-base font-medium text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300">
                          <button
                            onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            disabled={item.quantity <= 1}
                            className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <input
                            type="text"
                            value={item.quantity}
                            readOnly
                            className="w-10 h-9 text-center text-sm font-medium border-x border-gray-300 bg-white"
                          />
                          <button
                            onClick={() => updateQuantity(item.product.id, Math.min(10, item.quantity + 1))}
                            disabled={item.quantity >= 10}
                            className="w-9 h-9 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Separator Line */}
                  {index !== items.length - 1 && (
                    <hr className="border-t border-gray-200" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:w-[420px] lg:flex-shrink-0">
            <div className="lg:sticky lg:top-28 bg-[#f8f8f8] p-6 lg:p-8">
              {/* Header */}
              <h2 className="text-base font-medium text-gray-900 uppercase tracking-[0.12em] mb-4">
                Order Summary
              </h2>

              <hr className="border-t border-gray-300 mb-5" />

              {/* Subtotal */}
              <div className="flex justify-between items-center mb-5">
                <span className="text-gray-700">Subtotal</span>
                <span className="text-gray-900 font-medium">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {/* Discount Code */}
              <div className="flex mb-5">
                <input
                  type="text"
                  placeholder="Discount Code"
                  className="flex-1 px-4 py-3 border border-gray-300 text-sm bg-white focus:outline-none focus:border-gray-500"
                />
                <button className="px-5 py-3 bg-gray-200 text-gray-900 text-sm font-medium uppercase tracking-wider hover:bg-gray-300 transition-colors border border-l-0 border-gray-300">
                  Apply
                </button>
              </div>

              <hr className="border-t border-gray-300 mb-5" />

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-base font-medium text-gray-900 uppercase tracking-wider">Total:</span>
                <span className="text-xl font-medium text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <button className="w-full py-4 bg-[#1a1f2e] text-white text-sm font-medium uppercase tracking-[0.15em] hover:bg-gray-800 transition-colors">
                Checkout
              </button>

              {/* Payment Methods */}
              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs text-gray-500">Available In Checkout</span>
                <div className="flex gap-2">
                  <div className="w-12 h-7 bg-black rounded flex items-center justify-center">
                    <span className="text-white text-[10px] font-medium">Pay</span>
                  </div>
                  <div className="w-12 h-7 bg-[#003087] rounded flex items-center justify-center">
                    <span className="text-white text-[9px] font-bold italic">PayPal</span>
                  </div>
                  <div className="w-12 h-7 bg-[#5a31f4] rounded flex items-center justify-center">
                    <span className="text-white text-[10px] font-medium">Shop</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
