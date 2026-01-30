'use client';

import { AlertTriangle, Phone, Mail, ChevronDown } from 'lucide-react';
import { Studio } from '@/types';
import { useState } from 'react';

interface NoticeSectionProps {
  studio: Studio;
}

export default function NoticeSection({ studio }: NoticeSectionProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('reservation');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <section id="notice" className="py-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">이용 안내</h2>

        <div className="space-y-3">
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection('reservation')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-gray-900">예약 관련</span>
              <ChevronDown
                size={20}
                className={`text-gray-500 transition-transform ${expandedSection === 'reservation' && 'rotate-180'}`}
              />
            </button>
            {expandedSection === 'reservation' && (
              <div className="p-4 space-y-2 text-sm text-gray-600">
                <p>• 예약 시간 10분 전 도착을 권장합니다</p>
                <p>• 노쇼 시 예약금 환불이 불가합니다</p>
                <p>• 예약 변경은 24시간 전까지 가능합니다</p>
              </div>
            )}
          </div>

          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection('preparation')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-gray-900">촬영 준비</span>
              <ChevronDown
                size={20}
                className={`text-gray-500 transition-transform ${expandedSection === 'preparation' && 'rotate-180'}`}
              />
            </button>
            {expandedSection === 'preparation' && (
              <div className="p-4 space-y-2 text-sm text-gray-600">
                <p>• 메이크업 포함 상품은 깨끗한 피부 상태로 방문해주세요</p>
                <p>• 의상은 2벌까지 지참 가능합니다</p>
                <p>• 소품은 사전 협의 후 지참 가능합니다</p>
              </div>
            )}
          </div>

          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection('delivery')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-gray-900">촬영 결과물</span>
              <ChevronDown
                size={20}
                className={`text-gray-500 transition-transform ${expandedSection === 'delivery' && 'rotate-180'}`}
              />
            </button>
            {expandedSection === 'delivery' && (
              <div className="p-4 space-y-2 text-sm text-gray-600">
                <p>• 원본 데이터는 촬영 후 3일 이내 전달됩니다</p>
                <p>• 보정 요청은 1회 무료입니다</p>
                <p>• 추가 보정은 별도 비용이 발생합니다</p>
              </div>
            )}
          </div>

          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection('refund')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle size={18} className="text-gray-500" />
                <span className="font-medium text-gray-900">취소/환불 규정</span>
              </div>
              <ChevronDown
                size={20}
                className={`text-gray-500 transition-transform ${expandedSection === 'refund' && 'rotate-180'}`}
              />
            </button>
            {expandedSection === 'refund' && (
              <div className="p-4 space-y-2 text-sm text-gray-600">
                <p>• 7일 전: 전액 환불</p>
                <p>• 3~6일 전: 50% 환불</p>
                <p>• 2일 전~당일: 환불 불가</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <h3 className="font-medium text-gray-900 mb-3">문의하기</h3>
          <div className="space-y-2">
            <a
              href={`tel:${studio.phone}`}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#0152CC] transition-colors"
            >
              <Phone size={16} />
              {studio.phone}
            </a>
            <a
              href="mailto:info@studio.com"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#0152CC] transition-colors"
            >
              <Mail size={16} />
              info@studio.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
