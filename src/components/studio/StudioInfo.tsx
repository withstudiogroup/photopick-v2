'use client';

import { MapPin, Star, ChevronRight, Heart } from 'lucide-react';
import { Studio } from '@/types';

interface StudioInfoProps {
  studio: Studio;
}

export default function StudioInfo({ studio }: StudioInfoProps) {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="px-4 py-3">
        <div className="flex items-start justify-between mb-1">
          <h1 className="text-lg font-bold text-gray-900">
            {studio.name}
          </h1>
          <button className="p-1">
            <Heart size={20} className="text-gray-300" />
          </button>
        </div>

        <button className="flex items-center gap-1 text-gray-500 text-sm mb-2">
          <MapPin size={12} />
          <span>{studio.location.address}</span>
          <ChevronRight size={12} />
        </button>

        <div className="flex items-center gap-2 text-sm mb-3">
          <div className="flex items-center gap-1">
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span className="font-medium text-gray-900">{studio.rating}</span>
            <span className="text-gray-400">({studio.reviewCount.toLocaleString()})</span>
          </div>
          {studio.grade === 'premium' && (
            <span className="text-xs text-gray-500">프리미엄</span>
          )}
        </div>

        {studio.hasCoupon && (
          <p className="text-sm text-red-500 mb-3">
            {studio.couponText || '선착순 쿠폰 발급 중'}
          </p>
        )}

        <div className="flex flex-wrap gap-1">
          {studio.facilities.slice(0, 5).map((facility) => (
            <span
              key={facility}
              className="text-xs text-gray-500"
            >
              {facility}
              {studio.facilities.indexOf(facility) < Math.min(studio.facilities.length, 5) - 1 && ' · '}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
