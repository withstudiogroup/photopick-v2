'use client';

import { ChevronLeft, Home, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SearchOverlay } from '@/components/search';

interface SearchHeaderProps {
  query?: string;
}

export default function SearchHeader({ query = '' }: SearchHeaderProps) {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 h-14">
            <button
              onClick={() => router.back()}
              className="p-1.5 -ml-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft size={24} className="text-gray-700" />
            </button>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex-1 flex items-center h-10 px-4 bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors"
            >
              <span className="flex-1 text-left text-sm text-gray-900 truncate">
                {query || '검색어를 입력하세요'}
              </span>
              {query && (
                <X size={18} className="text-gray-400 ml-2" />
              )}
            </button>

            <button
              onClick={() => router.push('/')}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Home size={22} className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
