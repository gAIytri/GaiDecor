/**
 * Wishlist Page
 * Displays saved products in a grid; links to product detail.
 */

import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useCartStore } from '@/store/useCartStore';
import ProductImage from '@/components/common/ProductImage';

export default function Wishlist() {
  const { items, removeItem } = useWishlistStore();
  const addToCart = useCartStore((s) => s.addItem);

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <Heart className="w-12 h-12 text-gray-300 mb-4" />
        <h1 className="text-2xl font-medium text-gray-900 mb-2">Your wishlist is empty</h1>
        <p className="text-gray-500 mb-8">Save items you love for later.</p>
        <Link
          to="/"
          className="px-8 py-3 bg-gray-900 text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 lg:py-12">
        <h1 className="text-2xl lg:text-3xl font-medium text-gray-900 uppercase tracking-[0.15em] mb-10 lg:mb-14">
          Wishlist
          <span className="text-gray-500 ml-2">({items.length})</span>
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {items.map((product) => {
            const primaryImage =
              Array.isArray(product.images) && product.images.length > 0
                ? product.images[0]
                : '';
            const imageStr = typeof primaryImage === 'string' ? primaryImage : '';

            return (
              <div
                key={product.id}
                className="group bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <ProductImage
                      src={imageStr}
                      alt={product.name}
                      className="h-48 w-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                {/* Info */}
                <div className="p-3 space-y-2">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-lg font-bold text-emerald-600">
                    ${product.price.toFixed(2)}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => {
                        const color =
                          (product as any).attributes?.color?.[0] || 'Default';
                        addToCart(product, 1, color);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gray-900 text-white text-xs uppercase tracking-wider hover:bg-gray-800 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="w-10 flex items-center justify-center border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
