'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, X, Search } from 'lucide-react';
import Image from 'next/image';
import { studios } from '@/data/mock';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const suggestedKeywords = [
  '증명사진', '프로필 촬영', '가족사진', '웨딩 스냅', '돌잔치',
  '반려동물', '우정샷', '셀프 스튜디오', '자연광 스튜디오', '취업사진',
  '아기 사진', '커플 사진', '졸업 사진', '앨범 촬영', '화보 촬영',
];

const quickSearchChips = [
  { label: '지역', icon: '📍' },
  { label: '스튜디오', icon: '📸' },
  { label: '증명사진', icon: '🪪' },
  { label: '프로필', icon: '👤' },
  { label: '가족사진', icon: '👨‍👩‍👧' },
  { label: '우정샷', icon: '🤝' },
  { label: '웨딩', icon: '💒' },
  { label: '돌잔치', icon: '🎂' },
  { label: '펫', icon: '🐕' },
  { label: '취업사진', icon: '💼' },
];

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [currentKeywordIndex, setCurrentKeywordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || query) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentKeywordIndex((prev) => (prev + 1) % suggestedKeywords.length);
        setIsAnimating(false);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, [isOpen, query]);

  const filteredStudios = query.length >= 2
    ? studios.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.location.address.toLowerCase().includes(query.toLowerCase()) ||
          s.location.district.toLowerCase().includes(query.toLowerCase()) ||
          s.location.nearestStation.toLowerCase().includes(query.toLowerCase()) ||
          s.categories.some((c) => c.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 4)
    : [];

  const autocompleteSuggestions = query.length >= 1
    ? suggestedKeywords
        .filter((k) => k.includes(query))
        .slice(0, 3)
    : [];

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleChipClick = (label: string) => {
    setQuery(label);
    handleSearch(label);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>

          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-11 pl-4 pr-10 text-base bg-gray-50 border border-gray-200 rounded-full outline-none focus:border-[#0152CC] focus:bg-white transition-all"
              placeholder=""
            />

            {!query && (
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 overflow-hidden">
                <span
                  className={`inline-block transition-all duration-300 ${
                    isAnimating ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
                  }`}
                >
                  {suggestedKeywords[currentKeywordIndex]} 검색
                </span>
              </div>
            )}

            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={18} className="text-gray-400" />
              </button>
            )}
          </div>
        </form>

        <div className="px-4 py-6">
          {!query ? (
            <>
              <p className="text-center text-gray-600 mb-6">
                사진 촬영 서비스를 검색할 수 있어요
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {quickSearchChips.map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => handleChipClick(chip.label)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                  >
                    <Search size={14} className="text-gray-400" />
                    {chip.label}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div>
              {autocompleteSuggestions.length > 0 && (
                <div className="mb-4">
                  {autocompleteSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSearch(suggestion)}
                      className="flex items-center gap-3 w-full px-2 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Search size={18} className="text-gray-400" />
                      <span className="text-gray-900">
                        {suggestion.split(query).map((part, i, arr) => (
                          <span key={i}>
                            {part}
                            {i < arr.length - 1 && (
                              <span className="text-[#0152CC] font-medium">{query}</span>
                            )}
                          </span>
                        ))}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {filteredStudios.length > 0 && (
                <div className="border-t border-gray-100 pt-4">
                  {filteredStudios.map((studio) => (
                    <button
                      key={studio.id}
                      onClick={() => {
                        router.push(`/studio/${studio.id}`);
                        onClose();
                      }}
                      className="flex items-center gap-3 w-full px-2 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={studio.thumbnail}
                          alt={studio.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-gray-900 font-medium">
                          {studio.name.split(query).map((part, i, arr) => (
                            <span key={i}>
                              {part}
                              {i < arr.length - 1 && (
                                <span className="text-[#0152CC]">{query}</span>
                              )}
                            </span>
                          ))}
                        </p>
                        <p className="text-xs text-gray-500">
                          {studio.categories[0]} · {studio.location.nearestStation}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {autocompleteSuggestions.length === 0 && filteredStudios.length === 0 && query.length >= 2 && (
                <div className="text-center py-10">
                  <p className="text-gray-500">검색 결과가 없습니다</p>
                  <p className="text-sm text-gray-400 mt-1">다른 키워드로 검색해 보세요</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
