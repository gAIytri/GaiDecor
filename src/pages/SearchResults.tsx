/**
 * Search Results Page
 * Uses productService.searchProducts() for client-side search.
 */

import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { searchProducts } from '@/services/productService';
import ProductCard from '@/components/product/ProductCard';

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchProducts(query.trim());
  }, [query]);

  const handleClear = () => {
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 lg:py-12">
        {/* Header */}
        {query ? (
          <div className="mb-10 lg:mb-14">
            <h1 className="text-2xl lg:text-3xl font-medium text-gray-900 uppercase tracking-[0.15em]">
              Search Results
            </h1>
            <div className="flex items-center gap-3 mt-3">
              <p className="text-gray-500">
                {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;
                <span className="text-gray-900 font-medium">{query}</span>&rdquo;
              </p>
              <button
                onClick={handleClear}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-10 lg:mb-14">
            <h1 className="text-2xl lg:text-3xl font-medium text-gray-900 uppercase tracking-[0.15em]">
              Search
            </h1>
            <p className="text-gray-500 mt-2">Enter a search term to find products.</p>
          </div>
        )}

        {/* Results */}
        {query && results.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {query && results.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">No results found</h2>
            <p className="text-gray-500 mb-6">
              Try a different search term or browse our categories.
            </p>
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-gray-900 text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
