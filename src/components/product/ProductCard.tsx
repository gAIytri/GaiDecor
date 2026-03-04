import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import type { Product } from '@/types';
import { Badge } from '@/components/ui/badge';
import ProductImage from '@/components/common/ProductImage';
import { useWishlistStore } from '@/store/useWishlistStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, toggleItem } = useWishlistStore();
  const wishlisted = isInWishlist(product.id);

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-white dark:bg-gray-800 border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          {/* Product Image */}
          <ProductImage
            src={product.images[0]}
            alt={product.name}
            className="h-48 w-full group-hover:scale-110 transition-transform duration-300"
          />

          {/* Wishlist Heart - Top Right */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors"
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                wishlisted
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-600 hover:text-red-500'
              }`}
            />
          </button>

          {/* Brand Badge - Top Left */}
          <Badge className="absolute top-2 left-2 text-[10px] px-2 py-0.5 bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white border">
            {product.taxonomy?.subcategory?.name || product.taxonomy?.category?.name}
          </Badge>

          {/* Badges - Below wishlist heart */}
          <div className="absolute top-12 right-2 flex flex-col gap-1">
            {product.metadata?.bestSeller && (
              <Badge className="text-[10px] px-2 py-0.5 bg-orange-500 text-white border-0">
                Hot
              </Badge>
            )}
            {discount > 0 && (
              <Badge className="text-[10px] px-2 py-0.5 bg-red-500 text-white border-0">
                -{discount}%
              </Badge>
            )}
            {product.metadata?.featured && (
              <Badge className="text-[10px] px-2 py-0.5 bg-primary text-white border-0">
                Featured
              </Badge>
            )}
          </div>

          {/* Out of Stock Overlay */}
          {!product.metadata?.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge className="text-xs px-3 py-1 bg-gray-900 text-white">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-3 space-y-1.5">
          {/* Product Name */}
          <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.metadata?.rating || 0)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {(product.metadata?.rating || 0).toFixed(1)}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              ({product.metadata?.reviewCount || 0})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary-emerald dark:text-primary-emerald">
              ${product.price.toFixed(2)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-gray-500 dark:text-gray-400 line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          {product.metadata?.inStock && (
            <p className="text-[10px] text-green-600 dark:text-green-400">
              In Stock
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
