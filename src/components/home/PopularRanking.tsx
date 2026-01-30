'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react';
import type { Studio } from '@/types';
import { cn, formatPrice } from '@/lib/utils';

const tabs = [
  { id: 'all', label: '전체' },
  { id: 'id-photo', label: '증명사진' },
  { id: 'profile', label: '프로필' },
  { id: 'family', label: '가족사진' },
  { id: 'wedding', label: '웨딩' },
];

export default function PopularRanking() {
  const [activeTab, setActiveTab] = useState('all');
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchStudios() {
      try {
        const res = await fetch('/api/studios');
        const data = await res.json();
        setStudios(data);
      } catch (error) {
        console.error('Error fetching studios:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStudios();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 220;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const filteredStudios = studios
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 10);

  return (
    <section className="py-5 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">인기 스튜디오 TOP 10</h2>
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

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="text-gray-500 text-sm">스튜디오 불러오는 중...</div>
          </div>
        ) : filteredStudios.length === 0 ? (
          <div className="flex justify-center py-8">
            <div className="text-gray-500 text-sm">스튜디오가 없습니다</div>
          </div>
        ) : (
        <div
          ref={scrollRef}
          className="grid grid-cols-2 gap-3 sm:flex sm:overflow-x-auto sm:hide-scrollbar pb-2"
        >
          {filteredStudios.map((studio, index) => {
            const products = studio.products || [];
            const lowestPrice = products.length > 0
              ? Math.min(...products.map(p =>
                  p.discountRate > 0 ? p.basePrice * (1 - p.discountRate / 100) : p.basePrice
                ))
              : 0;
            const maxDiscount = products.length > 0
              ? Math.max(...products.map(p => p.discountRate || 0))
              : 0;

            return (
              <Link
                key={studio.id}
                href={`/studio/${studio.id}`}
                className="sm:w-[200px] sm:flex-shrink-0 group"
              >
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-2">
                  <Image
                    src={studio.thumbnail}
                    alt={studio.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span
                    className="absolute bottom-2 left-2 text-white font-black text-4xl sm:text-5xl drop-shadow-lg"
                    style={{
                      WebkitTextStroke: '1px rgba(255,255,255,0.3)',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    }}
                  >
                    {index + 1}
                  </span>
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
                      <span className="text-[#F87171] font-bold text-sm">{maxDiscount}%</span>
                    )}
                    <span className="font-bold text-gray-900 text-sm">{formatPrice(lowestPrice)}원</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        )}
      </div>
    </section>
  );
}
