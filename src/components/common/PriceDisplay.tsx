import { cn } from '@/lib/utils';

interface PriceDisplayProps {
  price: number;
  compareAtPrice?: number | null;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function formatPrice(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function PriceDisplay({
  price,
  compareAtPrice,
  currency = 'USD',
  size = 'md',
  className,
}: PriceDisplayProps) {
  const isOnSale = compareAtPrice != null && compareAtPrice > price;

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span
        className={cn(
          'font-semibold',
          sizeClasses[size],
          isOnSale && 'text-destructive'
        )}
      >
        {formatPrice(price, currency)}
      </span>
      {isOnSale && (
        <span
          className={cn(
            'text-muted-foreground line-through',
            size === 'lg' ? 'text-base' : 'text-sm'
          )}
        >
          {formatPrice(compareAtPrice, currency)}
        </span>
      )}
    </div>
  );
}
