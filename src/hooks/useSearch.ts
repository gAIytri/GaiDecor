import { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';
import { searchProducts } from '@/services/productService';
import type { Product } from '@/types';

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
    const filtered = searchProducts(debouncedQuery);
    setResults(filtered);
    setIsSearching(false);
  }, [debouncedQuery]);

  return { results, isSearching, hasQuery: !!debouncedQuery.trim() };
}
