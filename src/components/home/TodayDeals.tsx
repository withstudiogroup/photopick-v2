'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { StudioCard } from '@/components/common';
import type { Studio } from '@/types';

export default function TodayDeals() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudios() {
      try {
        const res = await fetch('/api/studios');
        const data = await res.json();
        // 할인이 있는 스튜디오만 필터링 (현재는 전체)
        setStudios(data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching studios:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStudios();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const formatTime = (num: number) => String(num).padStart(2, '0');

  return (
    <section className="py-5 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-900">오늘의 특가</h2>
            <div className="flex items-center gap-1 px-2 py-1 bg-[#F87171] text-white rounded-md text-xs font-semibold">
              <Clock size={12} />
              <span>{formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}</span>
            </div>
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

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="text-gray-500 text-sm">스튜디오 불러오는 중...</div>
          </div>
        ) : studios.length === 0 ? (
          <div className="flex justify-center py-8">
            <div className="text-gray-500 text-sm">특가 스튜디오가 없습니다</div>
          </div>
        ) : (
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto hide-scrollbar pb-2"
        >
          {studios.map((studio) => (
            <StudioCard
              key={studio.id}
              studio={studio}
              className="w-[220px] flex-shrink-0"
            />
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
