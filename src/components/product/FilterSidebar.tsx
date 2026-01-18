import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { useFilterStore } from '@/store/useFilterStore';
import type { Product } from '@/types';

interface FilterSidebarProps {
  products: Product[];
}

export default function FilterSidebar({ products }: FilterSidebarProps) {
  const {
    priceRange,
    selectedBrands,
    minRating,
    setPriceRange,
    toggleBrand,
    setMinRating,
    resetFilters,
  } = useFilterStore();

  // Get unique brands from products
  const brands = Array.from(new Set(products.map((p) => p.brand))).sort();

  // Get max price for slider
  const maxPrice = Math.max(...products.map((p) => p.price));

  return (
    <div className="w-full lg:w-72 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
          Filters
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="h-7 text-xs text-primary hover:text-primary"
        >
          Reset
        </Button>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
          Price Range
        </h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            min={0}
            max={Math.ceil(maxPrice / 100) * 100}
            step={10}
            className="w-full"
          />
        </div>
        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
          Brands
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.slice(0, 10).map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <span className="text-xs">{brand}</span>
            </label>
          ))}
        </div>
        {brands.length > 10 && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            +{brands.length - 10} more brands
          </p>
        )}
      </div>

      {/* Rating */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
          Minimum Rating
        </h3>
        <div className="space-y-2">
          {[4, 3, 2, 1, 0].map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-2 cursor-pointer text-sm hover:text-primary dark:hover:text-primary transition-colors"
            >
              <input
                type="radio"
                name="rating"
                checked={minRating === rating}
                onChange={() => setMinRating(rating)}
                className="w-3.5 h-3.5 text-primary focus:ring-primary"
              />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
                {rating > 0 ? (
                  <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
                    & up
                  </span>
                ) : (
                  <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
                    All
                  </span>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Stock Status */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
          Availability
        </h3>
        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
          <Checkbox defaultChecked />
          <span className="text-xs">In Stock Only</span>
        </label>
      </div>

      {/* Apply Filters Button - Mobile */}
      <div className="lg:hidden">
        <Button className="w-full" size="sm">
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
