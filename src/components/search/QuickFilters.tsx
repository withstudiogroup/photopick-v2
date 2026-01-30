'use client';

import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickFiltersProps {
  activeFilters: string[];
  onToggleFilter: (filter: string) => void;
}

const dropdownFilters = [
  { id: 'category', label: '촬영유형', hasDropdown: true },
];

const quickFilters = [
  '예약가능',
  '스튜디오쿠폰',
  '오늘촬영',
  '자연광',
  '헤어메이크업',
  '주차가능',
];

export default function QuickFilters({ activeFilters, onToggleFilter }: QuickFiltersProps) {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-2.5">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {dropdownFilters.map((filter) => (
            <button
              key={filter.id}
              className="flex items-center gap-0.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 whitespace-nowrap transition-colors"
            >
              {filter.label}
              {filter.hasDropdown && <ChevronDown size={14} />}
            </button>
          ))}

          {quickFilters.map((filter) => {
            const isActive = activeFilters.includes(filter);
            return (
              <button
                key={filter}
                onClick={() => onToggleFilter(filter)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all',
                  isActive
                    ? 'bg-[#0152CC] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
