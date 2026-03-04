import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  count?: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function Rating({ value, count, size = 'sm', className }: RatingProps) {
  const starSize = size === 'sm' ? 14 : 16;

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={starSize}
            className={cn(
              star <= Math.round(value)
                ? 'fill-amber-400 text-amber-400'
                : 'fill-none text-border'
            )}
          />
        ))}
      </div>
      {value > 0 && (
        <span className="text-xs text-muted-foreground">
          {value.toFixed(1)}
        </span>
      )}
      {count !== undefined && (
        <span className="text-xs text-muted-foreground">
          ({count})
        </span>
      )}
    </div>
  );
}
