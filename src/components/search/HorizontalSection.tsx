'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react';
import { Studio } from '@/types';
import { cn } from '@/lib/utils';

interface HorizontalSectionProps {
  title: string;
  subtitle?: string;
  link?: string;
  studios: Studio[];
  tabs?: { id: string; label: string }[];
  showViewAllCard?: boolean;
}

function StudioCard({ studio }: { studio: Studio }) {
  const minPrice = Math.min(
    ...studio.products.map((p) =>
      p.discountRate > 0
        ? Math.floor(p.basePrice * (1 - p.discountRate / 100))
        : p.basePrice
    )
  );
  const maxDiscount = Math.max(...studio.products.map((p) => p.discountRate || 0));

  return (
    <Link
      href={`/studio/${studio.id}`}
      className="flex-shrink-0 w-[110px] sm:w-[200px] group"
    >
      <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-2">
        <Image
          src={studio.thumbnail}
          alt={studio.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {studio.hasCoupon && (
          <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-[#0152CC] text-white text-[10px] font-bold rounded">
            쿠폰
          </span>
        )}
        {studio.grade === 'premium' && (
          <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-yellow-500 text-white text-[10px] font-bold rounded">
            프리미엄
          </span>
        )}
      </div>
      <div className="px-0.5">
        <h3 className="font-medium text-gray-900 text-sm truncate mb-0.5">
          {studio.name}
        </h3>
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
          <MapPin size={10} />
          <span className="truncate">{studio.location.nearestStation}</span>
        </div>
        <div className="flex items-center gap-1 mb-1">
          <Star size={10} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-medium text-gray-700">{studio.rating}</span>
          <span className="text-xs text-gray-400">({studio.reviewCount.toLocaleString()})</span>
        </div>
        <div className="flex items-center gap-1.5">
          {maxDiscount > 0 && (
            <span className="text-[#F87171] font-bold text-sm">{maxDiscount}%</span>
          )}
          <span className="font-bold text-gray-900 text-sm">
            {minPrice.toLocaleString()}원~
          </span>
        </div>
      </div>
    </Link>
  );
}

function ViewAllCard({ link, title }: { link: string; title: string }) {
  return (
    <Link
      href={link}
      className="flex-shrink-0 w-[60px] sm:w-[200px] flex flex-col items-center justify-center aspect-[2/5] sm:aspect-[4/5] rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-[#0152CC] transition-all group"
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-2 sm:mb-3 group-hover:border-[#0152CC] transition-colors">
        <ChevronRight size={20} className="sm:hidden text-gray-400 group-hover:text-[#0152CC] transition-colors" />
        <ChevronRight size={24} className="hidden sm:block text-gray-400 group-hover:text-[#0152CC] transition-colors" />
      </div>
      <span className="text-xs sm:text-sm font-medium text-gray-600 group-hover:text-[#0152CC] transition-colors text-center">전체보기</span>
      <span className="hidden sm:block text-xs text-gray-400 mt-1">{title}</span>
    </Link>
  );
}

export default function HorizontalSection({
  title,
  subtitle,
  link,
  studios,
  tabs,
  showViewAllCard = false,
}: HorizontalSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.id || '');

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-5 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">{title}</h2>
            {subtitle && (
              <span className="text-xs sm:text-sm text-gray-500">{subtitle}</span>
            )}
          </div>
          <div className="hidden sm:flex gap-1">
            <button
              onClick={() => scroll('left')}
              className="w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:border-[#0152CC] hover:text-[#0152CC] transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:border-[#0152CC] hover:text-[#0152CC] transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {tabs && tabs.length > 0 && (
          <div className="flex gap-2 mb-4 overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                  activeTab === tab.id
                    ? 'bg-[#0152CC] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto hide-scrollbar pb-2"
        >
          {studios.map((studio) => (
            <StudioCard key={studio.id} studio={studio} />
          ))}
          {showViewAllCard && link && (
            <ViewAllCard link={link} title={title} />
          )}
        </div>
      </div>
    </section>
  );
}
