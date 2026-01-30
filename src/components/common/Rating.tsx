'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
}

export default function Rating({ rating, reviewCount, size = 'md', showCount = true, className }: RatingProps) {
  const sizes = {
    sm: { star: 12, text: 'text-xs' },
    md: { star: 14, text: 'text-sm' },
    lg: { star: 18, text: 'text-base' },
  };

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toLocaleString();
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Star
        size={sizes[size].star}
        className="text-amber-400 fill-amber-400"
      />
      <span className={cn('font-semibold text-gray-900', sizes[size].text)}>
        {rating.toFixed(1)}
      </span>
      {showCount && reviewCount !== undefined && (
        <span className={cn('text-gray-500', sizes[size].text)}>
          ({formatCount(reviewCount)})
        </span>
      )}
    </div>
  );
}
