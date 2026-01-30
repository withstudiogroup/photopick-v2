'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

const slides: BannerSlide[] = [
  {
    id: '1',
    title: '새해 특가',
    subtitle: '증명사진 최대 50% 할인',
    image: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=1200&h=400&fit=crop',
    link: '/event/new-year',
  },
  {
    id: '2',
    title: '프로필 촬영',
    subtitle: '헤어메이크업 무료 제공',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=400&fit=crop',
    link: '/event/profile',
  },
  {
    id: '3',
    title: '가족사진 이벤트',
    subtitle: '신규 회원 20% 추가 할인',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&h=400&fit=crop',
    link: '/event/family',
  },
];

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  const currentSlide = slides[currentIndex];

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="relative">
          <Link href={currentSlide.link} className="block">
            <div className="relative aspect-[3/1] sm:aspect-[4/1] rounded-xl overflow-hidden">
              <Image
                src={currentSlide.image}
                alt={currentSlide.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
              <div className="absolute inset-0 flex items-center px-14 sm:px-20">
                <div className="text-white">
                  <p className="text-sm sm:text-base font-medium mb-1 opacity-90">
                    {currentSlide.title}
                  </p>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                    {currentSlide.subtitle}
                  </h2>
                </div>
              </div>
            </div>
          </Link>

          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all"
            aria-label="이전"
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all"
            aria-label="다음"
          >
            <ChevronRight size={20} className="text-gray-700" />
          </button>
        </div>

        <div className="flex justify-center gap-1.5 mt-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                index === currentIndex
                  ? 'bg-[#0152CC] w-5'
                  : 'bg-gray-300 hover:bg-gray-400'
              )}
              aria-label={`슬라이드 ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
