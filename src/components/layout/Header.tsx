'use client';

import Link from 'next/link';
import { Search, Heart, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { SearchOverlay } from '@/components/search';

interface HeaderProps {
  className?: string;
}

const placeholderTexts = [
  '증명사진',
  '프로필 촬영',
  '가족사진',
  '웨딩 스냅',
  '강남 스튜디오',
  '자연광 스튜디오',
];

export default function Header({ className }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPlaceholder((prev) => (prev + 1) % placeholderTexts.length);
        setIsAnimating(false);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 bg-white',
          className
        )}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Mobile Layout */}
          <div className="sm:hidden">
            <div className="py-3 flex justify-center">
              <Link href="/" className="text-base font-semibold tracking-tight">
                <span className="bg-gradient-to-r from-[#0152CC] to-[#3D7FE6] bg-clip-text text-transparent">Photo</span>
                <span className="text-[#0152CC]">Pick</span>
              </Link>
            </div>
            <div className="pb-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <Search size={20} className="text-gray-400 flex-shrink-0" />
                <div className="flex-1 text-left overflow-hidden">
                  <span
                    className={cn(
                      'inline-block text-sm text-gray-500 transition-all duration-300 whitespace-nowrap',
                      isAnimating ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
                    )}
                  >
                    {placeholderTexts[currentPlaceholder]} 검색
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center justify-between py-4">
            <Link href="/" className="text-xl font-bold tracking-tight w-32">
              <span className="bg-gradient-to-r from-[#0152CC] to-[#3D7FE6] bg-clip-text text-transparent">Photo</span>
              <span className="text-[#0152CC]">Pick</span>
            </Link>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex-1 max-w-2xl mx-8 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <Search size={18} className="text-gray-400 flex-shrink-0" />
              <div className="flex-1 text-left overflow-hidden">
                <span
                  className={cn(
                    'inline-block text-sm text-gray-500 transition-all duration-300 whitespace-nowrap',
                    isAnimating ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
                  )}
                >
                  {placeholderTexts[currentPlaceholder]} 검색
                </span>
              </div>
            </button>

            <div className="flex items-center gap-5 justify-end">
              <Link
                href="/wishlist"
                className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-[#0152CC] transition-colors"
              >
                <Heart size={22} />
                <span className="text-xs">찜</span>
              </Link>
              <Link
                href="/cart"
                className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-[#0152CC] transition-colors"
              >
                <ShoppingCart size={22} />
                <span className="text-xs">장바구니</span>
              </Link>
              <Link
                href="/mypage"
                className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-[#0152CC] transition-colors"
              >
                <User size={22} />
                <span className="text-xs">마이</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
