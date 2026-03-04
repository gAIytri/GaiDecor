import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1 text-xs text-muted-foreground', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={index} className="flex items-center gap-1">
            {index > 0 && <ChevronRight size={12} />}
            {isLast || !item.href ? (
              <span className={cn(isLast && 'text-foreground')}>{item.label}</span>
            ) : (
              <Link to={item.href} className="hover:text-foreground transition-colors uppercase tracking-wide">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
