'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'premium' | 'discount' | 'coupon' | 'standard' | 'budget';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ variant = 'primary', size = 'sm', children, className }: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded whitespace-nowrap';

  const variants = {
    primary: 'bg-[#0152CC] text-white',
    secondary: 'bg-gray-500 text-white',
    premium: 'bg-gray-800 text-white',
    discount: 'bg-[#F87171] text-white',
    coupon: 'bg-[#F87171] text-white',
    standard: 'bg-gray-500 text-white',
    budget: 'bg-gray-500 text-white',
  };

  const sizes = {
    sm: 'px-1.5 py-0.5 text-[10px]',
    md: 'px-2 py-0.5 text-xs',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
}
