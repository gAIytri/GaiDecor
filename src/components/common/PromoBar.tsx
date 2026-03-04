import { cn } from '@/lib/utils';

interface PromoBarProps {
  message: string;
  className?: string;
}

export function PromoBar({ message, className }: PromoBarProps) {
  return (
    <div className={cn('bg-primary text-primary-foreground py-2 text-center text-xs font-medium tracking-widest uppercase', className)}>
      {message}
    </div>
  );
}
