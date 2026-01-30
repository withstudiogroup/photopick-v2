'use client';

import { CalendarCheck } from 'lucide-react';
import { Button } from '@/components/common';
import { formatPrice } from '@/lib/utils';

interface FloatingReserveButtonProps {
  lowestPrice: number;
  maxDiscount: number;
  onReserve: () => void;
}

export default function FloatingReserveButton({
  lowestPrice,
  maxDiscount,
  onReserve,
}: FloatingReserveButtonProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 p-4 pb-safe md:hidden">
      <div className="flex items-center justify-between gap-4">
        <div>
          {maxDiscount > 0 && (
            <span className="text-red-500 font-bold text-sm mr-2">{maxDiscount}%</span>
          )}
          <span className="font-bold text-xl text-gray-900">{formatPrice(lowestPrice)}원</span>
          <span className="text-gray-500 text-sm">~</span>
        </div>
        <Button size="lg" onClick={onReserve} className="flex-1 max-w-[180px]">
          <CalendarCheck size={18} className="mr-2" />
          예약하기
        </Button>
      </div>
    </div>
  );
}
