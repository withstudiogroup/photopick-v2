'use client';

import { Bot, ThumbsUp, ThumbsDown, AlertCircle, ChevronRight } from 'lucide-react';
import { Studio } from '@/types';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ReviewSectionProps {
  studio: Studio;
}

export default function ReviewSection({ studio }: ReviewSectionProps) {
  const [activeTab, setActiveTab] = useState<'positive' | 'negative'>('positive');

  const positiveSummary = `친절한 스태프와 깔끔한 시설이 인상적입니다. ${studio.categories[0]} 퀄리티가 좋고 즉석인화 서비스가 빨라서 만족스럽습니다. 전반적으로 재방문 의사가 높은 스튜디오입니다.`;

  const negativeSummary = `일부 이용객은 주차 공간이 협소하다는 의견이 있었습니다. 주말에는 대기 시간이 길어질 수 있으니 여유롭게 방문하시는 것을 권장드립니다.`;

  return (
    <section id="review" className="py-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">리뷰 요약</h2>
          <button className="flex items-center gap-1 text-sm text-[#0152CC] font-medium">
            {studio.reviewCount.toLocaleString()}개 리뷰 전체보기
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 lg:p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <Bot size={18} className="text-gray-600" />
            </div>
            <span className="text-sm text-gray-700">
              <span className="font-medium">PhotoPick AI</span>로 최근 리뷰를 요약했어요
            </span>
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('positive')}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all',
                activeTab === 'positive'
                  ? 'bg-[#0152CC] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              )}
            >
              <ThumbsUp size={14} />
              높은 평점 리뷰
            </button>
            <button
              onClick={() => setActiveTab('negative')}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all',
                activeTab === 'negative'
                  ? 'bg-[#0152CC] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              )}
            >
              <ThumbsDown size={14} />
              낮은 평점 리뷰
            </button>
          </div>

          <div className="bg-white rounded-xl p-4">
            <p className="text-gray-700 leading-relaxed">
              {activeTab === 'positive' ? positiveSummary : negativeSummary}
            </p>
          </div>

          <div className="flex items-center gap-1.5 mt-4 text-xs text-gray-500">
            <AlertCircle size={12} />
            AI 요약은 일부 정확하지 않을 수 있습니다.
          </div>
        </div>
      </div>
    </section>
  );
}
