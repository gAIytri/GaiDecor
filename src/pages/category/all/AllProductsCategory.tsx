import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Product as NewProduct } from '@/types/product';

// Import all product data
import furnitureData from '@/data/furniture.json';
import rugsData from '@/data/rugs.json';
import lightingData from '@/data/lighting.json';
import decorData from '@/data/decor.json';
import artData from '@/data/art.json';
import beddingData from '@/data/bedding.json';

// Import all image mappings
import {
  furnitureImagesByFilename,
  rugsImagesByFilename,
  lightingImagesByFilename,
  decorImagesByFilename,
  artImagesByFilename,
  beddingImagesByFilename,
} from '@/data/images';

import { allProductsFilters } from './config';

// Combined image mapping
const allImagesByFilename: Record<string, string> = {
  ...furnitureImagesByFilename,
  ...rugsImagesByFilename,
  ...lightingImagesByFilename,
  ...decorImagesByFilename,
  ...artImagesByFilename,
  ...beddingImagesByFilename,
};

export default function AllProductsCategory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [expandedFilters, setExpandedFilters] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [sortBy, setSortBy] = useState<string>('popularity');

  // Combine all products with category info
  const allProducts = useMemo(() => {
    const furniture = (furnitureData as unknown as NewProduct[]).map(p => ({ ...p, categorySlug: 'furniture' }));
    const rugs = (rugsData as unknown as NewProduct[]).map(p => ({ ...p, categorySlug: 'rugs' }));
    const lighting = (lightingData as unknown as NewProduct[]).map(p => ({ ...p, categorySlug: 'lighting' }));
    const decor = (decorData as unknown as NewProduct[]).map(p => ({ ...p, categorySlug: 'decor' }));
    const art = (artData as unknown as NewProduct[]).map(p => ({ ...p, categorySlug: 'art' }));
    const bedding = (beddingData as unknown as NewProduct[]).map(p => ({ ...p, categorySlug: 'bedding' }));

    return [...furniture, ...rugs, ...lighting, ...decor, ...art, ...bedding];
  }, []);

  // Initialize filters from URL params on mount
  useEffect(() => {
    const initialFilters: Record<string, string[]> = {};

    const category = searchParams.get('category');
    if (category) {
      initialFilters['category'] = category.split(',');
    }

    const sale = searchParams.get('sale');
    if (sale) {
      initialFilters['sale'] = sale.split(',');
      // Auto-expand sale filter if it has values
      setExpandedFilters(prev => prev.includes('sale') ? prev : [...prev, 'sale']);
    }

    const tags = searchParams.get('tags');
    if (tags) {
      initialFilters['room'] = tags.split(',');
    }

    const color = searchParams.get('color');
    if (color) {
      initialFilters['color'] = color.split(',');
    }

    const material = searchParams.get('material');
    if (material) {
      initialFilters['material'] = material.split(',');
    }

    const style = searchParams.get('style');
    if (style) {
      initialFilters['style'] = style.split(',');
    }

    setSelectedFilters(initialFilters);
  }, []);

  // Toggle filter expansion
  const toggleFilter = (filterId: string) => {
    setExpandedFilters(prev =>
      prev.includes(filterId) ? prev.filter(id => id !== filterId) : [...prev, filterId]
    );
  };

  // Handle filter selection
  const handleFilterChange = (filterId: string, value: string) => {
    setSelectedFilters(prev => {
      const current = prev[filterId] || [];
      const newValues = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];

      const newParams = new URLSearchParams(searchParams);
      if (newValues.length > 0) {
        newParams.set(filterId === 'room' ? 'tags' : filterId, newValues.join(','));
      } else {
        newParams.delete(filterId === 'room' ? 'tags' : filterId);
      }

      const updatedFilters = { ...prev, [filterId]: newValues };
      const hasAnyFilters = Object.values(updatedFilters).some(arr => arr.length > 0);
      if (!hasAnyFilters) {
        newParams.set('view', 'all');
      } else {
        newParams.delete('view');
      }

      setSearchParams(newParams);
      return updatedFilters;
    });
  };

  // Calculate discount percentage
  const getDiscountPercentage = (product: NewProduct): number => {
    if (!product.compareAtPrice || product.compareAtPrice <= product.price) return 0;
    return Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100);
  };

  // Check if product matches sale filter
  const matchesSaleFilter = (product: NewProduct, saleFilters: string[]): boolean => {
    if (!saleFilters || saleFilters.length === 0) return true;

    const discount = getDiscountPercentage(product);
    if (discount === 0) return false;

    return saleFilters.some(range => {
      if (range === '10-20') return discount >= 10 && discount < 20;
      if (range === '20-30') return discount >= 20 && discount < 30;
      if (range === '30-40') return discount >= 30 && discount < 40;
      if (range === '40+') return discount >= 40;
      return false;
    });
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Category filter
    if (selectedFilters['category']?.length > 0) {
      filtered = filtered.filter(p =>
        selectedFilters['category'].includes(p.categorySlug)
      );
    }

    // Sale filter
    if (selectedFilters['sale']?.length > 0) {
      filtered = filtered.filter(p => matchesSaleFilter(p, selectedFilters['sale']));
    }

    // Room filter
    if (selectedFilters['room']?.length > 0) {
      filtered = filtered.filter(p =>
        selectedFilters['room'].some(room => {
          const roomLower = room.toLowerCase();
          return p.tags.some(tag => tag.toLowerCase().includes(roomLower.replace('-', '')));
        })
      );
    }

    // Color filter
    if (selectedFilters['color']?.length > 0) {
      filtered = filtered.filter(p =>
        p.attributes.color?.some(c =>
          selectedFilters['color'].some(filterColor =>
            c.toLowerCase() === filterColor.toLowerCase()
          )
        )
      );
    }

    // Material filter
    if (selectedFilters['material']?.length > 0) {
      filtered = filtered.filter(p =>
        p.attributes.material?.some(m =>
          selectedFilters['material'].includes(m)
        )
      );
    }

    // Style filter
    if (selectedFilters['style']?.length > 0) {
      filtered = filtered.filter(p =>
        p.attributes.style?.some(s =>
          selectedFilters['style'].includes(s)
        )
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return (b.metadata.rating || 0) - (a.metadata.rating || 0);
        case 'newest':
          return new Date(b.metadata.createdAt).getTime() - new Date(a.metadata.createdAt).getTime();
        case 'discount':
          return getDiscountPercentage(b) - getDiscountPercentage(a);
        default:
          return (b.metadata.reviewCount || 0) - (a.metadata.reviewCount || 0);
      }
    });

    return filtered;
  }, [allProducts, selectedFilters, sortBy]);

  // Get active filter count
  const activeFilterCount = Object.values(selectedFilters).reduce((acc, arr) => acc + arr.length, 0);

  // Check if we're in clearance mode (sale filter active)
  const isClearanceMode = selectedFilters['sale']?.length > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* MAIN CONTENT - Sidebar + Products */}
      <div className="w-full">
        <div className="flex">
          {/* LEFT SIDEBAR - Always Visible Filters */}
          <aside className="w-[345px] flex-shrink-0 pr-6 py-6 pl-4 border-r border-gray-100">
            <div className="sticky top-24">
              {/* Breadcrumb inside sidebar */}
              <nav className="text-xs text-gray-500 mb-4">
                <Link to="/" className="hover:text-gray-900">HOME</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900">{isClearanceMode ? 'CLEARANCE' : 'ALL PRODUCTS'}</span>
              </nav>

              {allProductsFilters.map((filter) => (
                <div key={filter.id} className="border-b border-gray-200 py-3">
                  <button
                    onClick={() => toggleFilter(filter.id)}
                    className="w-full flex items-center justify-between text-sm font-medium text-gray-900"
                  >
                    <span className="uppercase tracking-wide">
                      {filter.label}
                      {filter.id === 'sale' && selectedFilters['sale']?.length > 0 && (
                        <span className="ml-2 text-red-600">({selectedFilters['sale'].length})</span>
                      )}
                    </span>
                    {expandedFilters.includes(filter.id) ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </button>

                  {/* Filter Options */}
                  {expandedFilters.includes(filter.id) && (
                    <div className="mt-3">
                      {/* Color Swatches - Square */}
                      {filter.type === 'color' && filter.options && (
                        <div className="grid grid-cols-4 gap-2">
                          {filter.options.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => handleFilterChange('color', option.value)}
                              className="group relative"
                              title={option.label}
                            >
                              <div
                                className={`w-10 h-10 border-2 transition-all ${
                                  selectedFilters['color']?.includes(option.value)
                                    ? 'border-gray-900 ring-1 ring-gray-400'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                                style={{
                                  backgroundColor: option.color?.startsWith('linear') ? undefined : option.color || '#CCCCCC',
                                  background: option.color?.startsWith('linear') ? option.color : undefined,
                                }}
                              />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* All other filters as square pills */}
                      {filter.type === 'checkbox' && (
                        <div className="flex flex-wrap gap-2">
                          {filter.options?.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => handleFilterChange(filter.id, option.value)}
                              className={`px-3 py-1.5 text-xs border transition-all ${
                                selectedFilters[filter.id]?.includes(option.value)
                                  ? filter.id === 'sale'
                                    ? 'bg-red-600 text-white border-red-600'
                                    : 'bg-gray-900 text-white border-gray-900'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Clear Filters */}
              {activeFilterCount > 0 && (
                <button
                  onClick={() => {
                    setSelectedFilters({});
                    setSearchParams(new URLSearchParams('view=all'));
                  }}
                  className="mt-4 text-sm text-gray-500 hover:text-gray-900 underline"
                >
                  Clear all filters ({activeFilterCount})
                </button>
              )}
            </div>
          </aside>

          {/* RIGHT SIDE - Product Grid */}
          <main className="flex-1 py-6 pl-6 pr-4">
            {/* Header Row - Title + Sort */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-medium text-gray-900 tracking-wide">
                  {isClearanceMode ? 'CLEARANCE SALE' : 'ALL PRODUCTS'}
                </h1>
                <span className="text-sm text-gray-500">
                  {filteredProducts.length} Products
                </span>
              </div>

              {/* Sort Dropdown - Styled like collapsed filter */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none text-sm font-medium text-gray-900 uppercase tracking-wide bg-white border-b border-gray-200 py-3 pr-8 pl-0 focus:outline-none cursor-pointer"
                >
                  <option value="popularity">Sort by: Popularity</option>
                  <option value="price-asc">Sort by: Price Low to High</option>
                  <option value="price-desc">Sort by: Price High to Low</option>
                  <option value="rating">Sort by: Top Rated</option>
                  <option value="newest">Sort by: Newest</option>
                  {isClearanceMode && <option value="discount">Sort by: Biggest Discount</option>}
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-4 gap-x-6 gap-y-8">
                {filteredProducts.map((product, index) => {
                  const discount = getDiscountPercentage(product);
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <Link to={`/product/${product.id}`} className="group block">
                        {/* Product Image */}
                        <div className="relative aspect-square bg-gray-50 mb-3 overflow-hidden">
                          <img
                            src={allImagesByFilename[product.primaryImage]}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {/* Discount Badge */}
                          {discount > 0 && (
                            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-medium px-2 py-1">
                              -{discount}%
                            </div>
                          )}
                        </div>

                        {/* Color Swatches */}
                        {product.attributes.color && product.attributes.color.length > 0 && (
                          <div className="flex gap-1 mb-2">
                            {product.attributes.color.slice(0, 4).map((color, i) => (
                              <div
                                key={i}
                                className="w-4 h-4 border border-gray-200"
                                style={{ backgroundColor: getColorHex(color) }}
                                title={color}
                              />
                            ))}
                            {product.attributes.color.length > 4 && (
                              <span className="text-xs text-gray-500 ml-1">
                                +{product.attributes.color.length - 4}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Product Name */}
                        <h3 className="text-sm text-gray-900 mb-1 line-clamp-2 group-hover:text-gray-600">
                          {product.name}
                        </h3>

                        {/* Price */}
                        <div className="flex items-center gap-2">
                          <p className={`text-sm font-medium ${discount > 0 ? 'text-red-600' : 'text-gray-900'}`}>
                            ${product.price.toFixed(2)}
                          </p>
                          {product.compareAtPrice && (
                            <p className="text-sm text-gray-400 line-through">
                              ${product.compareAtPrice.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-600 mb-4">No products found matching your filters.</p>
                <button
                  onClick={() => {
                    setSelectedFilters({});
                    setSearchParams(new URLSearchParams('view=all'));
                  }}
                  className="text-sm font-medium text-gray-900 underline hover:no-underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// Helper function to get hex color from color name
function getColorHex(colorName: string): string {
  const colorMap: Record<string, string> = {
    'white': '#FFFFFF',
    'black': '#000000',
    'gray': '#808080',
    'grey': '#808080',
    'beige': '#F5F5DC',
    'brown': '#8B4513',
    'blue': '#4169E1',
    'navy': '#000080',
    'emerald': '#50C878',
    'green': '#228B22',
    'walnut': '#773F1A',
    'oak': '#C19A6B',
    'gold': '#FFD700',
    'silver': '#C0C0C0',
    'cream': '#FFFDD0',
    'tan': '#D2B48C',
    'charcoal': '#36454F',
    'natural': '#F5DEB3',
    'brass': '#B5A642',
    'copper': '#B87333',
    'terracotta': '#E2725B',
    'rust': '#B7410E',
    'sage': '#9DC183',
    'blush': '#DE5D83',
    'neutral': '#C4B7A6',
    'crystal': '#E8E8E8',
    'purple': '#9370DB',
    'pink': '#FFC0CB',
    'cognac': '#9A463D',
    'bronze': '#CD7F32',
    'espresso': '#3C2415',
  };
  return colorMap[colorName.toLowerCase()] || '#CCCCCC';
}
