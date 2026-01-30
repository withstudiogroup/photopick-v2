'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Heart, Star } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { Studio } from '@/types';
import Badge from './Badge';

interface StudioCardProps {
  studio: Studio;
  variant?: 'default' | 'horizontal' | 'compact' | 'ranking';
  rank?: number;
  className?: string;
}

export default function StudioCard({ studio, variant = 'default', rank, className }: StudioCardProps) {
  const lowestPrice = Math.min(...studio.products.map(p =>
    p.discountRate > 0 ? p.basePrice * (1 - p.discountRate / 100) : p.basePrice
  ));

  const maxDiscount = Math.max(...studio.products.map(p => p.discountRate));

  if (variant === 'horizontal') {
    return (
      <Link href={`/studio/${studio.id}`} className={cn('block', className)}>
        <div className="flex gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200">
          <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={studio.thumbnail}
              alt={studio.name}
              fill
              className="object-cover"
            />
            {rank && (
              <div className="absolute top-1 left-1 w-5 h-5 bg-[#0152CC] text-white rounded-md flex items-center justify-center text-xs font-bold">
                {rank}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0 py-0.5">
            <div className="flex items-start justify-between gap-2">
              <div>
                {studio.grade === 'premium' && (
                  <Badge variant="premium" size="sm" className="mb-0.5">프리미엄</Badge>
                )}
                <h3 className="font-semibold text-gray-900 truncate text-sm">{studio.name}</h3>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <Heart size={16} className="text-gray-400" />
              </button>
            </div>
            <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-500">
              <MapPin size={10} />
              <span>{studio.location.nearestStation} 도보 {studio.location.walkingMinutes}분</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-medium text-gray-700">{studio.rating}</span>
              <span className="text-xs text-gray-400">({studio.reviewCount})</span>
            </div>
            <div className="mt-1.5 flex items-center gap-1.5">
              {maxDiscount > 0 && (
                <span className="text-[#F87171] font-bold text-sm">{maxDiscount}%</span>
              )}
              <span className="font-bold text-gray-900 text-sm">{formatPrice(lowestPrice)}원~</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={`/studio/${studio.id}`} className={cn('block', className)}>
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-200">
          <div className="relative aspect-[4/3]">
            <Image
              src={studio.thumbnail}
              alt={studio.name}
              fill
              className="object-cover"
            />
            {rank && (
              <span
                className="absolute bottom-2 left-2 text-white font-black text-4xl drop-shadow-lg"
                style={{
                  WebkitTextStroke: '1px rgba(255,255,255,0.3)',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                }}
              >
                {rank}
              </span>
            )}
            <button className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full transition-colors">
              <Heart size={16} className="text-gray-600" />
            </button>
          </div>
          <div className="p-2.5">
            <h3 className="font-semibold text-gray-900 truncate text-sm">{studio.name}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-medium text-gray-700">{studio.rating}</span>
              <span className="text-xs text-gray-400">({studio.reviewCount})</span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate">{studio.categories.join(' · ')}</p>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'ranking') {
    return (
      <Link href={`/studio/${studio.id}`} className={cn('block', className)}>
        <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-2 group">
          <Image
            src={studio.thumbnail}
            alt={studio.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {rank && (
            <span
              className="absolute bottom-2 left-2 text-white font-black text-5xl drop-shadow-lg"
              style={{
                WebkitTextStroke: '1px rgba(255,255,255,0.3)',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              {rank}
            </span>
          )}
        </div>
        <div className="px-1">
          <h3 className="font-semibold text-gray-900 text-sm truncate">{studio.name}</h3>
          <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-500">
            <MapPin size={10} />
            <span className="truncate">{studio.location.nearestStation}</span>
            <span className="flex items-center gap-0.5 ml-auto">
              <Star size={10} className="text-yellow-400 fill-yellow-400" />
              {studio.rating}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1.5">
            {maxDiscount > 0 && (
              <span className="text-[#EF4444] font-bold text-sm">{maxDiscount}%</span>
            )}
            <span className="font-bold text-gray-900 text-sm">{formatPrice(lowestPrice)}원</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/studio/${studio.id}`} className={cn('block', className)}>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-200 group">
        <div className="relative aspect-[4/3]">
          <Image
            src={studio.thumbnail}
            alt={studio.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          {rank && (
            <span
              className="absolute bottom-3 left-3 text-white font-black text-5xl drop-shadow-lg"
              style={{
                WebkitTextStroke: '1px rgba(255,255,255,0.3)',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              {rank}
            </span>
          )}
          <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full transition-all">
            <Heart size={18} className="text-gray-600" />
          </button>
          <div className="absolute top-3 left-3 flex gap-1">
            {studio.grade === 'premium' && (
              <Badge variant="premium" size="sm">프리미엄</Badge>
            )}
            {studio.hasCoupon && (
              <Badge variant="coupon" size="sm">{studio.couponText}</Badge>
            )}
          </div>
        </div>
        <div className="p-3">
          <div className="flex items-start justify-between">
            <h3 className="font-bold text-gray-900">{studio.name}</h3>
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
            <MapPin size={12} />
            <span>{studio.location.nearestStation} 도보 {studio.location.walkingMinutes}분</span>
          </div>
          <div className="flex items-center gap-1 mt-1.5">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium text-gray-700">{studio.rating}</span>
            <span className="text-xs text-gray-400">({studio.reviewCount})</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            {maxDiscount > 0 && (
              <span className="text-[#F87171] font-bold">{maxDiscount}%</span>
            )}
            <span className="text-lg font-bold text-gray-900">{formatPrice(lowestPrice)}원</span>
            <span className="text-xs text-gray-500">~</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
