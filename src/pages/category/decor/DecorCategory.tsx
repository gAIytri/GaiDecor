import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import decorData from '@/data/decor.json';
import { decorImagesByFilename } from '@/data/images';
import { decorFilters } from './config';

// Decor product type
interface DecorProduct {
  id: string;
  name: string;
  description?: string;
  price: number;
  compareAtPrice?: number | null;
  images: string[];
  primaryImage: string;
  taxonomy: {
    category: { name: string; slug: string };
    subcategory: { name: string; slug: string };
    productType?: string;
  };
  attributes: {
    color?: string[];
    material?: string[];
    style?: string[];
    dimensions?: { width: number; depth: number; height: number; unit: string };
    scent?: string;
    burnTime?: string;
  };
  tags: string[];
  metadata: {
    featured?: boolean;
    bestSeller?: boolean;
    onSale?: boolean;
    inStock: boolean;
    rating?: number;
    reviewCount?: number;
  };
}

export default function DecorCategory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [expandedFilters, setExpandedFilters] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [sortBy, setSortBy] = useState<string>('popularity');

  const products = decorData as DecorProduct[];

  // Initialize filters from URL params on mount
  useEffect(() => {
    const initialFilters: Record<string, string[]> = {};

    const productType = searchParams.get('productType');
    if (productType) {
      initialFilters['productType'] = productType.split(',');
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

  // Get unique product types from data
  const availableProductTypes = useMemo(() => {
    const typesMap = new Map<string, { slug: string; name: string }>();
    products.forEach(p => {
      const productType = p.taxonomy.productType;
      const subcategoryName = p.taxonomy.subcategory?.name;
      if (productType && subcategoryName && !typesMap.has(productType)) {
        typesMap.set(productType, { slug: productType, name: subcategoryName });
      }
    });
    return Array.from(typesMap.values());
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedFilters['productType']?.length > 0) {
      filtered = filtered.filter(p =>
        selectedFilters['productType'].some(type => {
          const typeSlug = type.toLowerCase();
          const productType = p.taxonomy.productType?.toLowerCase() || '';
          return productType === typeSlug;
        })
      );
    }

    if (selectedFilters['room']?.length > 0) {
      filtered = filtered.filter(p =>
        selectedFilters['room'].some(room => p.tags.includes(room))
      );
    }

    if (selectedFilters['color']?.length > 0) {
      filtered = filtered.filter(p =>
        p.attributes.color?.some(c =>
          selectedFilters['color'].some(filterColor =>
            c.toLowerCase() === filterColor.toLowerCase()
          )
        )
      );
    }

    if (selectedFilters['material']?.length > 0) {
      filtered = filtered.filter(p =>
        p.attributes.material?.some(m =>
          selectedFilters['material'].includes(m)
        )
      );
    }

    if (selectedFilters['style']?.length > 0) {
      filtered = filtered.filter(p =>
        p.attributes.style?.some(s =>
          selectedFilters['style'].includes(s)
        )
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return (b.metadata.rating || 0) - (a.metadata.rating || 0);
        default:
          return (b.metadata.reviewCount || 0) - (a.metadata.reviewCount || 0);
      }
    });

    return filtered;
  }, [products, selectedFilters, sortBy]);

  // Get active filter count
  const activeFilterCount = Object.values(selectedFilters).reduce((acc, arr) => acc + arr.length, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* MAIN CONTENT - Sidebar + Products */}
      <div className="w-full">
        <div className="flex">
          {/* LEFT SIDEBAR - Always Visible Filters */}
          <aside className="hidden md:block w-[345px] flex-shrink-0 pr-6 py-6 pl-4 border-r border-gray-100">
            <div className="sticky top-24">
              {/* Breadcrumb inside sidebar */}
              <nav className="text-xs text-gray-500 mb-4">
                <Link to="/" className="hover:text-gray-900">HOME</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900">DECOR</span>
              </nav>

              {decorFilters.map((filter) => (
                <div key={filter.id} className="border-b border-gray-200 py-3">
                  <button
                    onClick={() => toggleFilter(filter.id)}
                    className="w-full flex items-center justify-between text-sm font-medium text-gray-900"
                  >
                    <span className="uppercase tracking-wide">{filter.label}</span>
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
                                  backgroundColor: option.color || '#CCCCCC',
                                }}
                              />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* All other filters as square pills */}
                      {filter.type === 'checkbox' && (
                        <div className="flex flex-wrap gap-2">
                          {filter.id === 'productType' ? (
                            availableProductTypes.map((typeObj) => (
                              <button
                                key={typeObj.slug}
                                onClick={() => handleFilterChange('productType', typeObj.slug)}
                                className={`px-3 py-1.5 text-xs border transition-all ${
                                  selectedFilters['productType']?.includes(typeObj.slug)
                                    ? 'bg-gray-900 text-white border-gray-900'
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                                }`}
                              >
                                {typeObj.name}
                              </button>
                            ))
                          ) : (
                            filter.options?.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => handleFilterChange(filter.id, option.value)}
                                className={`px-3 py-1.5 text-xs border transition-all ${
                                  selectedFilters[filter.id]?.includes(option.value)
                                    ? 'bg-gray-900 text-white border-gray-900'
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                                }`}
                              >
                                {option.label}
                              </button>
                            ))
                          )}
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
          <main className="flex-1 py-6 px-4 md:pl-6 md:pr-4">
            {/* Header Row - Title + Sort */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-medium text-gray-900 tracking-wide">
                  DECOR
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
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 md:gap-x-6 md:gap-y-8">
                {filteredProducts.map((product, index) => (
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
                          src={decorImagesByFilename[product.primaryImage]}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
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
                        <p className="text-sm font-medium text-gray-900">
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
                ))}
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
    'cream': '#FFFDD0',
    'beige': '#F5F5DC',
    'terracotta': '#E2725B',
    'sage': '#9DC183',
    'navy': '#000080',
    'blush': '#DE5D83',
    'gold': '#FFD700',
    'natural': '#D2B48C',
    'gray': '#808080',
    'grey': '#808080',
    'green': '#228B22',
  };
  return colorMap[colorName.toLowerCase()] || '#CCCCCC';
}
