import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { ChevronRight, SlidersHorizontal } from 'lucide-react';
import ProductGrid from '@/components/product/ProductGrid';
import FilterSidebar from '@/components/product/FilterSidebar';
import { Button } from '@/components/ui/button';
import { useFilterStore } from '@/store/useFilterStore';
import { getCategoryConfig } from '@/data/categoryConfig';
import RugsHub from '@/pages/category/rugs/RugsHub';
import RugsCategory from '@/pages/category/rugs/RugsCategory';
import FurnitureHub from '@/pages/category/furniture/FurnitureHub';
import FurnitureCategory from '@/pages/category/furniture/FurnitureCategory';
import LightingHub from '@/pages/category/lighting/LightingHub';
import LightingCategory from '@/pages/category/lighting/LightingCategory';
import DecorHub from '@/pages/category/decor/DecorHub';
import DecorCategory from '@/pages/category/decor/DecorCategory';
import ArtHub from '@/pages/category/art/ArtHub';
import ArtCategory from '@/pages/category/art/ArtCategory';
import BeddingHub from '@/pages/category/bedding/BeddingHub';
import BeddingCategory from '@/pages/category/bedding/BeddingCategory';
import productsData from '@/data/products.json';
import type { Product } from '@/types';

// Import new schema data
import furnitureData from '@/data/furniture.json';
import type { Product as NewProduct } from '@/types/product';

const products = productsData as Product[];
const furnitureProducts = furnitureData as NewProduct[];

// Adapter function to convert new Product schema to old Product format
function adaptNewProductToOld(newProduct: NewProduct): any {
  return {
    id: newProduct.id,
    name: newProduct.name,
    brand: 'Gai Decor',
    category: newProduct.taxonomy.category.name as any,
    price: newProduct.price,
    originalPrice: newProduct.compareAtPrice,
    rating: newProduct.metadata.rating || 4.5,
    reviewCount: newProduct.metadata.reviewCount || 0,
    description: newProduct.description || newProduct.name,
    features: [
      `Material: ${newProduct.attributes.material?.join(', ') || 'Premium Quality'}`,
      `Style: ${newProduct.attributes.style?.join(', ') || 'Modern'}`,
      `Color Options: ${newProduct.attributes.color?.join(', ') || 'Multiple Colors'}`,
      newProduct.attributes.dimensions
        ? `Dimensions: ${newProduct.attributes.dimensions.width}W x ${newProduct.attributes.dimensions.depth}D x ${newProduct.attributes.dimensions.height}H ${newProduct.attributes.dimensions.unit}`
        : 'Standard Size',
    ],
    images: newProduct.images,
    colors: newProduct.attributes.color,
    inStock: newProduct.metadata.inStock,
    trending: newProduct.metadata.bestSeller,
    featured: newProduct.metadata.featured,
    // Additional fields for old category system
    image: newProduct.primaryImage,
    taxonomy: {
      room: {
        name: newProduct.taxonomy.subcategory.name,
        slug: newProduct.taxonomy.subcategory.slug,
      },
      subcategory: {
        name: newProduct.taxonomy.productType || newProduct.taxonomy.subcategory.name,
        slug: newProduct.taxonomy.subcategory.slug,
        imageFolder: '',
      },
      type: newProduct.taxonomy.productType || '',
    },
    material: newProduct.attributes.material?.join(', ') || '',
    style: newProduct.attributes.style?.[0] || '',
    dimensions: newProduct.attributes.dimensions
      ? `${newProduct.attributes.dimensions.width}W x ${newProduct.attributes.dimensions.depth}D x ${newProduct.attributes.dimensions.height}H`
      : '',
    keywords: newProduct.tags,
  };
}

export default function Category() {
  const { category, subcategory } = useParams();
  const [searchParams] = useSearchParams();

  // ALL HOOKS MUST BE AT THE TOP - before any conditional returns
  const [showFilters, setShowFilters] = useState(false);
  const { sortBy, setSortBy, applyFilters } = useFilterStore();

  // Format category name
  const categoryName: string | undefined = category
    ?.split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Format subcategory name from search params (for breadcrumb)
  const subcategoryParam = searchParams.get('subcategory');
  const subcategoryName: string | undefined = subcategoryParam
    ?.split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Check for search params (new filtering system)
  const hasSearchParams = searchParams.toString().length > 0;

  // NEW: Filter furniture products using new schema and URL params
  const filteredFurnitureProducts = useMemo(() => {
    if (category !== 'furniture' || !hasSearchParams) return [];

    let filtered = [...furnitureProducts];

    // Filter by subcategory from URL
    const subcategoryParam = searchParams.get('subcategory');
    if (subcategoryParam) {
      filtered = filtered.filter(
        (p) => p.taxonomy.subcategory.slug === subcategoryParam
      );
    }

    // Filter by tags (for specific product types like sofa, chair, etc.)
    const tagsParam = searchParams.get('tags');
    if (tagsParam) {
      const tags = tagsParam.split(',');
      filtered = filtered.filter((p) =>
        tags.some((tag) => p.tags.includes(tag))
      );
    }

    // Filter by color
    const colorParam = searchParams.get('color');
    if (colorParam) {
      const colors = colorParam.split(',');
      filtered = filtered.filter((p) =>
        p.attributes.color?.some((c) =>
          colors.includes(c.toLowerCase())
        )
      );
    }

    // Filter by material
    const materialParam = searchParams.get('material');
    if (materialParam) {
      const materials = materialParam.split(',');
      filtered = filtered.filter((p) =>
        p.attributes.material?.some((m) =>
          materials.includes(m.toLowerCase())
        )
      );
    }

    // Filter by style
    const styleParam = searchParams.get('style');
    if (styleParam) {
      const styles = styleParam.split(',');
      filtered = filtered.filter((p) =>
        p.attributes.style?.some((s) =>
          styles.includes(s.toLowerCase())
        )
      );
    }

    // Filter by in stock
    const inStockParam = searchParams.get('inStock');
    if (inStockParam === 'true') {
      filtered = filtered.filter((p) => p.metadata.inStock);
    }

    // Filter by on sale
    const onSaleParam = searchParams.get('onSale');
    if (onSaleParam === 'true') {
      filtered = filtered.filter((p) => p.metadata.onSale);
    }

    return filtered;
  }, [category, hasSearchParams, searchParams]);

  // OLD: Filter products by category (for categories not migrated yet)
  const categoryProducts = useMemo(() => {
    if (!category || category === 'all') return products;
    const formattedCategory = categoryName?.replace(' & ', ' ');
    return products.filter(
      (p) => p.category.toLowerCase().replace('&', '').trim() === formattedCategory?.toLowerCase().replace('&', '').trim()
    );
  }, [category, categoryName]);

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    try {
      // If furniture with search params, use new filtered data and convert to old format
      if (category === 'furniture' && hasSearchParams) {
        console.log('Filtering furniture with params:', searchParams.toString());
        console.log('Filtered furniture products:', filteredFurnitureProducts.length);
        const adapted = filteredFurnitureProducts.map(adaptNewProductToOld);
        console.log('Adapted products:', adapted.length, adapted[0]);
        return adapted;
      }
      // Otherwise use old system
      return applyFilters(categoryProducts);
    } catch (error) {
      console.error('Error filtering products:', error);
      return [];
    }
  }, [category, hasSearchParams, searchParams, filteredFurnitureProducts, categoryProducts, applyFilters]);

  // ROUTING LOGIC - After all hooks
  const categoryConfig = getCategoryConfig(category || '');

  if (categoryConfig) {
    switch (categoryConfig.id) {
      case 'rugs':
        // If there are search params OR view=all, show RugsCategory with filters
        if (hasSearchParams || searchParams.get('view') === 'all') {
          return <RugsCategory />;
        }
        // No params = show hub
        return <RugsHub />;
      case 'furniture':
        // If there are search params OR view=all, show FurnitureCategory with filters
        if (hasSearchParams || searchParams.get('view') === 'all') {
          return <FurnitureCategory />;
        }
        // No params = show hub
        return <FurnitureHub />;
      case 'lighting':
        // If there are search params OR view=all, show LightingCategory with filters
        if (hasSearchParams || searchParams.get('view') === 'all') {
          return <LightingCategory />;
        }
        // No params = show hub
        return <LightingHub />;
      case 'decor':
        // If there are search params OR view=all, show DecorCategory with filters
        if (hasSearchParams || searchParams.get('view') === 'all') {
          return <DecorCategory />;
        }
        // No params = show hub
        return <DecorHub />;
      case 'bedding':
        // If there are search params OR view=all, show BeddingCategory with filters
        if (hasSearchParams || searchParams.get('view') === 'all') {
          return <BeddingCategory />;
        }
        // No params = show hub
        return <BeddingHub />;
      case 'art':
        // If there are search params OR view=all, show ArtCategory with filters
        if (hasSearchParams || searchParams.get('view') === 'all') {
          return <ArtCategory />;
        }
        // No params = show hub
        return <ArtHub />;
      default:
        break;
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 -mt-14 pt-14">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="max-w-screen-2xl mx-auto px-2 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link
              to={`/category/${category}`}
              className="text-gray-600 dark:text-gray-400 hover:text-primary"
            >
              {categoryName}
            </Link>
            {subcategoryName && (
              <>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900 dark:text-white font-medium">
                  {subcategoryName}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Category Header */}
      <div className="border-b bg-white dark:bg-gray-950">
        <div className="max-w-screen-2xl mx-auto px-2 py-8">
          <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-2">
            {subcategoryName || categoryName}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {filteredProducts.length} products found
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-2 py-6">
        <div className="flex gap-6">
          {/* Filters - Desktop */}
          <aside className="hidden lg:block flex-shrink-0">
            <div className="sticky top-20">
              <FilterSidebar products={categoryProducts} />
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>

              {/* Sort Dropdown */}
              <div className="ml-auto flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-sm border rounded px-2 py-1 bg-white dark:bg-gray-800 dark:border-gray-700"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden mb-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-950">
                <FilterSidebar products={categoryProducts} />
              </div>
            )}

            {/* Product Grid */}
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
