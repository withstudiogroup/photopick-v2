'use client';

import { X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSort: string;
  onSelectSort: (sort: string) => void;
}

const sortOptions = [
  { value: 'recommended', label: '추천순' },
  { value: 'popular', label: '인기순' },
  { value: 'review', label: '리뷰 많은 순' },
  { value: 'rating', label: '별점 높은 순' },
  { value: 'price-low', label: '가격 낮은 순' },
  { value: 'price-high', label: '가격 높은 순' },
  { value: 'distance', label: '거리 가까운 순' },
];

export default function SortModal({
  isOpen,
  onClose,
  currentSort,
  onSelectSort,
}: SortModalProps) {
  if (!isOpen) return null;

  const handleSelect = (sort: string) => {
    onSelectSort(sort);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl overflow-hidden animate-slideUp">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold">정렬</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="py-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={cn(
                'w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors',
                currentSort === option.value && 'bg-[#F0F7FF]'
              )}
            >
              <span
                className={cn(
                  'text-gray-700',
                  currentSort === option.value && 'text-[#0152CC] font-medium'
                )}
              >
                {option.label}
              </span>
              {currentSort === option.value && (
                <Check size={20} className="text-[#0152CC]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
