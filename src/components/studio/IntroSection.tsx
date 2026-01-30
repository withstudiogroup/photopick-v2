'use client';

import { Camera, Award, ChevronDown } from 'lucide-react';
import { Studio } from '@/types';
import { useState } from 'react';

interface IntroSectionProps {
  studio: Studio;
}

export default function IntroSection({ studio }: IntroSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="intro" className="py-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">스튜디오 소개</h2>

        <div className="bg-gray-50 rounded-2xl p-4 lg:p-6">
          <p className={`text-gray-700 leading-relaxed ${!isExpanded && 'line-clamp-3'}`}>
            {studio.description}
          </p>

          {studio.description.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 flex items-center gap-1 text-sm text-[#0152CC] font-medium"
            >
              {isExpanded ? '접기' : '더보기'}
              <ChevronDown size={16} className={`transition-transform ${isExpanded && 'rotate-180'}`} />
            </button>
          )}

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Camera size={20} className="text-gray-500" />
              </div>
              <div>
                <span className="text-sm text-gray-500">전문 분야</span>
                <p className="font-medium text-gray-900">{studio.categories.join(', ')}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Award size={20} className="text-gray-500" />
              </div>
              <div>
                <span className="text-sm text-gray-500">수상 이력</span>
                <p className="font-medium text-gray-900">2024 대한민국 사진대전 금상</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
