'use client';

import { useState } from 'react';
import { formatPrice } from '@/lib/utils';

interface PointSectionProps {
  availablePoints: number;
  onPointUse: (points: number) => void;
  maxUsablePoints: number;
}

export default function PointSection({
  availablePoints,
  onPointUse,
  maxUsablePoints,
}: PointSectionProps) {
  const [inputPoints, setInputPoints] = useState<string>('0');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const numValue = Math.min(
      Number(value),
      availablePoints,
      maxUsablePoints
    );
    setInputPoints(String(numValue));
    onPointUse(numValue);
  };

  const handleUseAll = () => {
    const maxUse = Math.min(availablePoints, maxUsablePoints);
    setInputPoints(String(maxUse));
    onPointUse(maxUse);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">포인트 사용</h2>
        <span className="text-sm text-gray-500">
          보유 포인트:{' '}
          <span className="font-semibold text-gray-900">
            {formatPrice(availablePoints)}P
          </span>
        </span>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={inputPoints}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0152CC] transition-colors text-right pr-8"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
            P
          </span>
        </div>
        <button
          onClick={handleUseAll}
          className="px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
        >
          전액 사용
        </button>
      </div>

      <p className="mt-2 text-xs text-gray-500">
        최대 {formatPrice(maxUsablePoints)}P 사용 가능
      </p>
    </div>
  );
}
