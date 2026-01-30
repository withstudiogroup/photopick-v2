'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { StudioCard } from '@/components/common';
import { seoulStudios, gyeonggiStudios, studios } from '@/data/mock';
import { cn } from '@/lib/utils';

const regions = [
  { id: 'seoul', label: '서울', studios: seoulStudios },
  { id: 'gyeonggi', label: '경기', studios: gyeonggiStudios },
  { id: 'busan', label: '부산', studios: studios.slice(0, 3) },
  { id: 'daegu', label: '대구', studios: studios.slice(1, 4) },
  { id: 'incheon', label: '인천', studios: studios.slice(2, 5) },
];

export default function RegionalRecommend() {
  const [activeRegion, setActiveRegion] = useState('seoul');

  const currentRegion = regions.find((r) => r.id === activeRegion) || regions[0];

  return (
    <section className="py-5 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">지역별 추천</h2>
          <Link
            href={`/search?region=${activeRegion}`}
            className="flex items-center gap-0.5 text-sm text-gray-500 hover:text-[#0152CC]"
          >
            전체보기
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto hide-scrollbar">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setActiveRegion(region.id)}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                activeRegion === region.id
                  ? 'bg-[#0152CC] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
            >
              {region.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {currentRegion.studios.slice(0, 6).map((studio) => (
            <StudioCard
              key={studio.id}
              studio={studio}
              variant="horizontal"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
