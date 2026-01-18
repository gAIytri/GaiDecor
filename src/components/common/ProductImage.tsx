import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackEmoji?: string;
  loading?: 'lazy' | 'eager';
}

export default function ProductImage({
  src,
  alt,
  className = '',
  fallbackEmoji,
  loading = 'lazy',
}: ProductImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Use the src directly - productService provides proper local image paths
  const imageSrc = src;

  return (
    <div className={`relative overflow-hidden bg-gray-100 dark:bg-gray-700 ${className}`}>
      {/* Loading skeleton */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-600" />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
          {fallbackEmoji ? (
            <span className="text-4xl">{fallbackEmoji}</span>
          ) : (
            <>
              <ImageOff className="w-8 h-8 mb-2" />
              <span className="text-xs">Image unavailable</span>
            </>
          )}
        </div>
      )}

      {/* Actual image */}
      {!hasError && (
        <img
          src={imageSrc}
          alt={alt}
          loading={loading}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
        />
      )}
    </div>
  );
}
