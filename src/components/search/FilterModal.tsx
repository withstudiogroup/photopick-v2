'use client';

import { useState } from 'react';
import { X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/common';
import { cn } from '@/lib/utils';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  initialFilters: FilterState;
}

export interface FilterState {
  priceRange: [number, number];
  categories: string[];
  grades: string[];
  facilities: string[];
}

const categoryOptions = [
  '증명사진',
  '프로필/이력서',
  '가족사진',
  '아기/돌스냅',
  '웨딩/스냅',
  '컨셉촬영',
  '반려동물',
];

const gradeOptions = ['프리미엄', '스탠다드', '가성비'];

const facilityOptions = [
  '자연광',
  '인공조명',
  '헤어메이크업',
  '의상대여',
  '소품제공',
  '주차가능',
  '반려동물가능',
  '즉석인화',
];

export default function FilterModal({
  isOpen,
  onClose,
  onApply,
  initialFilters,
}: FilterModalProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  if (!isOpen) return null;

  const toggleOption = (
    key: keyof Pick<FilterState, 'categories' | 'grades' | 'facilities'>,
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const handleReset = () => {
    setFilters({
      priceRange: [0, 500000],
      categories: [],
      grades: [],
      facilities: [],
    });
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const activeCount =
    filters.categories.length + filters.grades.length + filters.facilities.length;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-hidden flex flex-col animate-slideUp">
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold">필터</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">가격 범위</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">최소</label>
                <input
                  type="number"
                  value={filters.priceRange[0]}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      priceRange: [Number(e.target.value), prev.priceRange[1]],
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0152CC]"
                  step={10000}
                />
              </div>
              <span className="text-gray-400 mt-5">~</span>
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">최대</label>
                <input
                  type="number"
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], Number(e.target.value)],
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0152CC]"
                  step={10000}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">촬영 유형</h3>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleOption('categories', option)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm transition-all',
                    filters.categories.includes(option)
                      ? 'bg-[#0152CC] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">스튜디오 등급</h3>
            <div className="flex flex-wrap gap-2">
              {gradeOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleOption('grades', option)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm transition-all',
                    filters.grades.includes(option)
                      ? 'bg-[#0152CC] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">시설/서비스</h3>
            <div className="flex flex-wrap gap-2">
              {facilityOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleOption('facilities', option)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-sm transition-all',
                    filters.facilities.includes(option)
                      ? 'bg-[#0152CC] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 flex gap-3">
          <Button variant="outline" onClick={handleReset} className="flex items-center gap-2">
            <RotateCcw size={16} />
            초기화
          </Button>
          <Button fullWidth onClick={handleApply}>
            {activeCount > 0 ? `${activeCount}개 필터 적용하기` : '적용하기'}
          </Button>
        </div>
      </div>
    </div>
  );
}
