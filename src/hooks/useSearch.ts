import { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';
import productsData from '@/data/products.json';
import type { Product } from '@/types';

const products = productsData as Product[];

export function useSearch(query: string) {
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Search products by name, brand, category, description
    const searchTerm = debouncedQuery.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );

    setResults(filtered);
    setIsSearching(false);
  }, [debouncedQuery]);

  return { results, isSearching, hasQuery: !!debouncedQuery.trim() };
}
