import { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PromoBarProps {
  message: string;
  className?: string;
}

export function PromoBar({ message, className }: PromoBarProps) {
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem('promoBarDismissed') === 'true'
  );

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('promoBarDismissed', 'true');
  };

  return (
    <div
      className={cn(
        'relative bg-gray-900 text-white py-2 text-center text-xs font-medium tracking-widest uppercase',
        className
      )}
    >
      {message}
      <button
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-sm hover:bg-white/20 transition-colors"
        aria-label="Dismiss promo bar"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
