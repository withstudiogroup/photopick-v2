'use client';

import { useState } from 'react';
import { ChevronDown, Ticket, X } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';

interface CouponSectionProps {
  availableCoupons: Coupon[];
  onCouponSelect: (coupon: Coupon | null) => void;
  selectedCoupon: Coupon | null;
}

export interface Coupon {
  id: string;
  name: string;
  discount: number;
  discountType: 'percent' | 'fixed';
  minOrderAmount: number;
  maxDiscount?: number;
  expiresAt: string;
}

const mockCoupons: Coupon[] = [
  {
    id: '1',
    name: '신규회원 20% 할인',
    discount: 20,
    discountType: 'percent',
    minOrderAmount: 20000,
    maxDiscount: 10000,
    expiresAt: '2026-02-28',
  },
  {
    id: '2',
    name: '첫 예약 5,000원 할인',
    discount: 5000,
    discountType: 'fixed',
    minOrderAmount: 30000,
    expiresAt: '2026-01-31',
  },
  {
    id: '3',
    name: '웰컴 쿠폰 3,000원',
    discount: 3000,
    discountType: 'fixed',
    minOrderAmount: 10000,
    expiresAt: '2026-03-31',
  },
];

export default function CouponSection({
  onCouponSelect,
  selectedCoupon,
}: CouponSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectCoupon = (coupon: Coupon) => {
    onCouponSelect(coupon);
    setIsOpen(false);
  };

  const handleRemoveCoupon = () => {
    onCouponSelect(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      <h2 className="text-lg font-bold text-gray-900 mb-4">쿠폰 할인</h2>

      {selectedCoupon ? (
        <div className="flex items-center justify-between p-3 bg-[#F0F7FF] border border-[#B3D4FF] rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0152CC] rounded-lg flex items-center justify-center">
              <Ticket size={20} className="text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{selectedCoupon.name}</p>
              <p className="text-sm text-[#0152CC] font-semibold">
                {selectedCoupon.discountType === 'percent'
                  ? `-${selectedCoupon.discount}%`
                  : `-${formatPrice(selectedCoupon.discount)}원`}
              </p>
            </div>
          </div>
          <button
            onClick={handleRemoveCoupon}
            className="p-2 hover:bg-white rounded-full transition-colors"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:border-[#0152CC] transition-colors"
        >
          <span className="text-gray-500">쿠폰 선택</span>
          <ChevronDown
            size={20}
            className={cn(
              'text-gray-400 transition-transform',
              isOpen && 'rotate-180'
            )}
          />
        </button>
      )}

      {isOpen && !selectedCoupon && (
        <div className="mt-3 space-y-2">
          {mockCoupons.map((coupon) => (
            <button
              key={coupon.id}
              onClick={() => handleSelectCoupon(coupon)}
              className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-[#0152CC] hover:bg-[#F0F7FF] transition-colors text-left"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Ticket size={20} className="text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{coupon.name}</p>
                <p className="text-xs text-gray-500">
                  {formatPrice(coupon.minOrderAmount)}원 이상 구매 시 |{' '}
                  {new Date(coupon.expiresAt).toLocaleDateString('ko-KR')}까지
                </p>
              </div>
              <span className="text-[#0152CC] font-semibold">
                {coupon.discountType === 'percent'
                  ? `-${coupon.discount}%`
                  : `-${formatPrice(coupon.discount)}원`}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
