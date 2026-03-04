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
    colors,
    materials,
    styles,
    rooms,
    priceRange,
    toggleColor,
    toggleMaterial,
    toggleStyle,
    toggleRoom,
    setPriceRange,
    resetFilters,
  } = useFilterStore();

  // Extract unique filter options from products
  const allColors = Array.from(
    new Set(products.flatMap((p) => p.attributes?.color || []))
  ).sort();
  const allMaterials = Array.from(
    new Set(products.flatMap((p) => p.attributes?.material || []))
  ).sort();
  const allStyles = Array.from(
    new Set(products.flatMap((p) => p.attributes?.style || []))
  ).sort();
  const allRooms = Array.from(
    new Set(products.flatMap((p) => p.attributes?.room || []))
  ).sort();

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

      {/* Colors */}
      {allColors.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            Color
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {allColors.slice(0, 12).map((color) => (
              <label
                key={color}
                className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <Checkbox
                  checked={colors.includes(color)}
                  onCheckedChange={() => toggleColor(color)}
                />
                <span className="text-xs">{color}</span>
              </label>
            ))}
          </div>
          {allColors.length > 12 && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              +{allColors.length - 12} more
            </p>
          )}
        </div>
      )}

      {/* Materials */}
      {allMaterials.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            Material
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {allMaterials.slice(0, 10).map((material) => (
              <label
                key={material}
                className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <Checkbox
                  checked={materials.includes(material)}
                  onCheckedChange={() => toggleMaterial(material)}
                />
                <span className="text-xs">{material}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Styles */}
      {allStyles.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            Style
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {allStyles.slice(0, 10).map((style) => (
              <label
                key={style}
                className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <Checkbox
                  checked={styles.includes(style)}
                  onCheckedChange={() => toggleStyle(style)}
                />
                <span className="text-xs">{style}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Rooms */}
      {allRooms.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            Room
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {allRooms.slice(0, 10).map((room) => (
              <label
                key={room}
                className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <Checkbox
                  checked={rooms.includes(room)}
                  onCheckedChange={() => toggleRoom(room)}
                />
                <span className="text-xs">{room}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Apply Filters Button - Mobile */}
      <div className="lg:hidden">
        <Button className="w-full" size="sm">
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
