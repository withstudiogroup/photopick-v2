'use client';

import { MapPin, Train, Car, Copy, ExternalLink } from 'lucide-react';
import { Studio } from '@/types';

interface LocationSectionProps {
  studio: Studio;
}

export default function LocationSection({ studio }: LocationSectionProps) {
  const copyAddress = () => {
    navigator.clipboard.writeText(studio.location.address);
    alert('주소가 복사되었습니다!');
  };

  const openMap = () => {
    const encodedAddress = encodeURIComponent(studio.location.address);
    window.open(`https://map.kakao.com/link/search/${encodedAddress}`, '_blank');
  };

  return (
    <section id="location" className="py-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">위치/교통</h2>

        <div className="bg-gray-50 rounded-2xl p-4 lg:p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-[#0152CC] mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">{studio.location.address}</p>
              </div>
            </div>
            <button
              onClick={copyAddress}
              className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <Copy size={14} />
              주소복사
            </button>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-3">
              <Train size={18} className="text-gray-500" />
              <span className="text-sm text-gray-700">
                {studio.location.nearestStation}역 도보 {studio.location.walkingMinutes}분
              </span>
            </div>
            {studio.facilities.includes('주차가능') && (
              <div className="flex items-center gap-3">
                <Car size={18} className="text-gray-500" />
                <span className="text-sm text-gray-700">주차 가능 (2시간 무료)</span>
              </div>
            )}
          </div>

          <button
            onClick={openMap}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            <ExternalLink size={18} />
            지도에서 보기
          </button>

          <div className="mt-4 aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
            <span className="text-gray-500 text-sm">지도 영역</span>
          </div>
        </div>
      </div>
    </section>
  );
}
