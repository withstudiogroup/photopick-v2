'use client';

import { useState } from 'react';
import { Calendar, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  onOpenFilter: () => void;
  onOpenSort: () => void;
  selectedDate?: string;
  persons?: number;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const tabs = [
  { id: 'studio', label: '스튜디오' },
  { id: 'product', label: '인기상품' },
];

export default function FilterBar({
  onOpenFilter,
  onOpenSort,
  selectedDate,
  persons = 1,
  activeTab = 'studio',
  onTabChange,
}: FilterBarProps) {
  const [internalTab, setInternalTab] = useState(activeTab);
  const currentTab = onTabChange ? activeTab : internalTab;

  const handleTabClick = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId);
    } else {
      setInternalTab(tabId);
    }
  };

  return (
    <div className="sticky top-14 z-30 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                'flex-1 py-3 text-sm font-medium transition-colors relative',
                currentTab === tab.id
                  ? 'text-[#0152CC]'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              {tab.label}
              {currentTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0152CC]" />
              )}
            </button>
          ))}
        </div>

        <div className="px-4 py-3 flex items-center gap-2 overflow-x-auto hide-scrollbar border-b border-gray-100">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg text-sm whitespace-nowrap hover:border-gray-400 transition-colors">
            <Calendar size={14} className="text-gray-500" />
            <span className="text-gray-800">
              {selectedDate || '01.18~01.19'}
            </span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-800">{persons}명</span>
          </button>

          <button
            onClick={onOpenFilter}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg text-sm whitespace-nowrap hover:border-gray-400 transition-colors"
          >
            <SlidersHorizontal size={14} className="text-gray-500" />
            <span className="text-gray-800">필터</span>
          </button>

          <button
            onClick={onOpenSort}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg text-sm whitespace-nowrap hover:border-gray-400 transition-colors"
          >
            <ArrowUpDown size={14} className="text-gray-500" />
            <span className="text-gray-800">정렬</span>
          </button>
        </div>
      </div>
    </div>
  );
}
