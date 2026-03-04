/**
 * CartDrawer Component
 * Slide-in cart drawer from the right side
 */

import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';
import { useCartDrawerStore } from '@/store/useCartDrawerStore';

export default function CartDrawer() {
  const { isOpen, closeDrawer } = useCartDrawerStore();
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const navigate = useNavigate();

  const subtotal = getTotal();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeDrawer]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-[9998]"
            onClick={closeDrawer}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[9999] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-lg font-medium text-gray-900">
                Your cart {itemCount > 0 && <span className="text-gray-500">({itemCount})</span>}
              </h2>
              <button
                onClick={closeDrawer}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                /* Empty State */
                <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                  <div className="mb-6">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-2xl font-light text-gray-900 mb-2">
                      It's a little
                    </h3>
                    <h3 className="text-2xl font-light mb-4">
                      <span className="text-gray-400 line-through">empty</span>{' '}
                      <span className="text-gray-900">here</span>
                    </h3>
                    <p className="text-sm text-gray-500">
                      Your cart is currently empty.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={closeDrawer}
                    className="uppercase tracking-wider text-xs px-8 py-3 rounded-full border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
                  >
                    Start Shopping
                  </Button>
                </div>
              ) : (
                /* Cart Items */
                <div className="px-6 py-4 space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                      className="flex gap-4 pb-4 border-b border-gray-100"
                    >
                      {/* Product Image */}
                      <Link
                        to={`/product/${item.product.id}`}
                        onClick={closeDrawer}
                        className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden"
                      >
                        {typeof item.product.images[0] === 'string' && item.product.images[0].length > 10 ? (
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-3xl">{item.product.images[0]}</span>
                        )}
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.product.id}`}
                          onClick={closeDrawer}
                          className="block"
                        >
                          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-gray-600 transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>

                        {/* Variants */}
                        {(item.selectedColor || item.selectedSize) && (
                          <p className="text-xs text-gray-500 mt-1">
                            {item.selectedColor && <span>{item.selectedColor}</span>}
                            {item.selectedColor && item.selectedSize && <span> / </span>}
                            {item.selectedSize && <span>{item.selectedSize}</span>}
                          </p>
                        )}

                        {/* Price */}
                        <p className="text-sm font-medium text-gray-900 mt-2">
                          ${item.product.price.toFixed(2)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center border border-gray-200 rounded">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="p-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-sm font-medium min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= 10}
                              className="p-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer - Only show if cart has items */}
            {items.length > 0 && (
              <div className="border-t px-6 py-4 space-y-4 bg-white">
                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-lg font-medium text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <p className="text-xs text-gray-500">
                  Shipping and taxes calculated at checkout
                </p>

                {/* Checkout Button */}
                <Button
                  className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white uppercase tracking-wider text-sm"
                  onClick={() => {
                    closeDrawer();
                    navigate('/checkout');
                  }}
                >
                  Checkout
                </Button>

                {/* View Cart Link */}
                <Link
                  to="/cart"
                  onClick={closeDrawer}
                  className="block text-center text-sm text-gray-600 hover:text-gray-900 underline transition-colors"
                >
                  View full cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
