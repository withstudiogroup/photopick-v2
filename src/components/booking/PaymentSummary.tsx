'use client';

import { formatPrice } from '@/lib/utils';

interface PaymentSummaryProps {
  productPrice: number;
  discount: number;
  couponDiscount: number;
  pointUsed: number;
}

export default function PaymentSummary({
  productPrice,
  discount,
  couponDiscount,
  pointUsed,
}: PaymentSummaryProps) {
  const totalDiscount = discount + couponDiscount + pointUsed;
  const totalPrice = Math.max(0, productPrice - totalDiscount);
  const earnedPoints = Math.floor(totalPrice * 0.02);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      <h2 className="text-lg font-bold text-gray-900 mb-4">결제 금액</h2>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">상품 금액</span>
          <span className="text-gray-900">{formatPrice(productPrice)}원</span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">할인</span>
            <span className="text-[#0152CC]">-{formatPrice(discount)}원</span>
          </div>
        )}

        {couponDiscount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">쿠폰 할인</span>
            <span className="text-[#0152CC]">-{formatPrice(couponDiscount)}원</span>
          </div>
        )}

        {pointUsed > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">포인트 사용</span>
            <span className="text-[#0152CC]">-{formatPrice(pointUsed)}원</span>
          </div>
        )}

        <div className="h-px bg-gray-200 my-4" />

        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-900">총 결제 금액</span>
          <span className="text-2xl font-bold text-[#0152CC]">
            {formatPrice(totalPrice)}원
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">적립 예정 포인트</span>
          <span className="text-gray-700">{formatPrice(earnedPoints)}P</span>
        </div>
      </div>
    </div>
  );
}
