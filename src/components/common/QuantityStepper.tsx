import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: QuantityStepperProps) {
  return (
    <div className={cn('inline-flex items-center border border-border', className)}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>
      <span className="flex h-10 w-12 items-center justify-center border-x border-border text-sm font-medium">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
