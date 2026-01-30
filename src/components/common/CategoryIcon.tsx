'use client';

import Link from 'next/link';
import {
  IdCard,
  User,
  Users,
  Baby,
  Heart,
  Sparkles,
  PawPrint,
  HeartHandshake,
  Smile,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Category } from '@/types';

interface CategoryIconProps {
  category: Category;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'id-card': IdCard,
  'user': User,
  'users': Users,
  'baby': Baby,
  'heart': Heart,
  'sparkles': Sparkles,
  'paw-print': PawPrint,
  'heart-handshake': HeartHandshake,
  'smile': Smile,
};

const colorMap: Record<string, string> = {
  'id-card': 'bg-gray-100 text-gray-600 hover:bg-gray-200',
  'user': 'bg-gray-100 text-gray-600 hover:bg-gray-200',
  'users': 'bg-gray-100 text-gray-600 hover:bg-gray-200',
  'baby': 'bg-gray-100 text-gray-600 hover:bg-gray-200',
  'heart': 'bg-gray-100 text-gray-600 hover:bg-gray-200',
  'sparkles': 'bg-gray-100 text-gray-600 hover:bg-gray-200',
  'paw-print': 'bg-gray-100 text-gray-600 hover:bg-gray-200',
  'heart-handshake': 'bg-gray-100 text-gray-600 hover:bg-gray-200',
  'smile': 'bg-gray-100 text-gray-600 hover:bg-gray-200',
};

export default function CategoryIcon({ category, size = 'md', className }: CategoryIconProps) {
  const Icon = iconMap[category.icon] || Sparkles;

  const sizes = {
    sm: { container: 'w-12 h-12', icon: 20, text: 'text-xs' },
    md: { container: 'w-16 h-16', icon: 28, text: 'text-sm' },
    lg: { container: 'w-20 h-20', icon: 36, text: 'text-base' },
  };

  return (
    <Link
      href={`/search?category=${category.slug}`}
      className={cn('flex flex-col items-center gap-2 group', className)}
    >
      <div
        className={cn(
          'rounded-2xl flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-active:scale-95',
          sizes[size].container,
          colorMap[category.icon] || 'bg-gray-50 text-gray-500 hover:bg-gray-100'
        )}
      >
        <Icon size={sizes[size].icon} />
      </div>
      <span className={cn('font-medium text-gray-700 whitespace-nowrap', sizes[size].text)}>
        {category.name}
      </span>
    </Link>
  );
}
