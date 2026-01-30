'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'products', label: '촬영상품' },
  { id: 'location', label: '위치/교통' },
  { id: 'review', label: '리뷰요약' },
  { id: 'intro', label: '스튜디오소개' },
  { id: 'facility', label: '시설/서비스' },
  { id: 'notice', label: '이용안내' },
];

interface StudioTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function StudioTabs({ activeTab, onTabChange }: StudioTabsProps) {
  const [isSticky, setIsSticky] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (tabsRef.current) {
        const rect = tabsRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 64);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const activeButton = document.querySelector(`[data-tab="${activeTab}"]`) as HTMLButtonElement;
    if (activeButton && indicatorRef.current) {
      indicatorRef.current.style.width = `${activeButton.offsetWidth}px`;
      indicatorRef.current.style.left = `${activeButton.offsetLeft}px`;
    }
  }, [activeTab]);

  return (
    <div
      ref={tabsRef}
      className={cn(
        'bg-white border-b border-gray-200 transition-all duration-200',
        isSticky && 'sticky top-16 z-40 shadow-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-tab={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'px-4 py-4 text-sm font-medium whitespace-nowrap transition-colors',
                activeTab === tab.id
                  ? 'text-[#0152CC]'
                  : 'text-gray-500 hover:text-gray-900'
              )}
            >
              {tab.label}
            </button>
          ))}
          <div
            ref={indicatorRef}
            className="absolute bottom-0 h-0.5 bg-[#0152CC] transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
}
