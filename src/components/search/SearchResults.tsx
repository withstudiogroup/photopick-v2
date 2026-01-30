'use client';

import { MapPin, Star, Sparkles, Map } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Studio } from '@/types';

interface SearchResultsProps {
  studios: Studio[];
  viewMode?: 'grid' | 'list';
}

function SearchResultCard({ studio }: { studio: Studio }) {
  const minPrice = Math.min(...studio.products.map((p) =>
    p.discountRate > 0 ? Math.floor(p.basePrice * (1 - p.discountRate / 100)) : p.basePrice
  ));
  const maxDiscount = Math.max(...studio.products.map((p) => p.discountRate || 0));
  const originalPrice = Math.min(...studio.products.map((p) => p.basePrice));

  return (
    <Link
      href={`/studio/${studio.id}`}
      className="block bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={studio.thumbnail}
          alt={studio.name}
          fill
          className="object-cover"
        />
        {studio.hasCoupon && (
          <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-[#0152CC] text-white text-[10px] font-bold rounded">
            쿠폰
          </span>
        )}
      </div>

      <div className="p-3">
        <div className="flex items-center gap-1 mb-1">
          <span className="text-[11px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
            {studio.categories[0]}
          </span>
        </div>

        <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2 leading-tight">
          {studio.name}
        </h3>

        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
          <MapPin size={12} />
          <span className="truncate">{studio.location.nearestStation}</span>
        </div>

        <div className="flex items-center gap-1 mb-2">
          <Star size={12} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-medium text-gray-900">{studio.rating}</span>
          <span className="text-xs text-gray-400">({studio.reviewCount.toLocaleString()})</span>
        </div>

        {studio.hasCoupon && (
          <div className="mb-2">
            <span className="text-xs text-[#0152CC] font-medium">선착순쿠폰</span>
          </div>
        )}

        <div className="space-y-0.5">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>촬영 30분</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-gray-900">
              {minPrice.toLocaleString()}원~
            </span>
          </div>
          {maxDiscount > 0 && (
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-400 line-through">
                {originalPrice.toLocaleString()}원
              </span>
              <span className="text-xs font-bold text-[#F87171]">
                {maxDiscount}%
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function SearchResults({ studios, viewMode = 'grid' }: SearchResultsProps) {
  if (studios.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500 mb-2">검색 결과가 없습니다</p>
        <p className="text-sm text-gray-400">다른 조건으로 검색해 보세요</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1 text-[#0152CC] text-sm font-medium">
          <Sparkles size={14} />
          <span>PHOTO 초이스+</span>
        </div>
        <span className="text-xs text-gray-400">광고</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {studios.map((studio) => (
          <SearchResultCard key={studio.id} studio={studio} />
        ))}
      </div>

      <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <button className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 rounded-full shadow-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <Sparkles size={16} className="text-[#0152CC]" />
          AI 검색
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-200 rounded-full shadow-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <Map size={16} />
          지도
        </button>
      </div>
    </div>
  );
}
