'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ChevronLeft, Check } from 'lucide-react';
import { studios } from '@/data/mock';
import { Button } from '@/components/common';
import {
  BookingInfo,
  BookerForm,
  BookerInfo,
  CouponSection,
  Coupon,
  PointSection,
  PaymentMethod,
  PaymentSummary,
} from '@/components/booking';
import { formatPrice } from '@/lib/utils';

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const studioId = searchParams.get('studioId');
  const productId = searchParams.get('productId');
  const date = searchParams.get('date') || new Date().toISOString();
  const time = searchParams.get('time') || '14:00';

  const studio = studios.find((s) => s.id === studioId);
  const product = studio?.products.find((p) => p.id === productId);

  const [booker, setBooker] = useState<BookerInfo | null>(null);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [pointUsed, setPointUsed] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!studio || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">예약 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const productPrice = product.basePrice;
  const discount = product.discountRate > 0
    ? Math.floor(productPrice * (product.discountRate / 100))
    : 0;
  const couponDiscount = selectedCoupon
    ? selectedCoupon.discountType === 'percent'
      ? Math.min(
          Math.floor(productPrice * (selectedCoupon.discount / 100)),
          selectedCoupon.maxDiscount || Infinity
        )
      : selectedCoupon.discount
    : 0;
  const totalPrice = Math.max(0, productPrice - discount - couponDiscount - pointUsed);

  const isFormValid =
    booker?.name &&
    booker?.phone &&
    booker?.email &&
    agreedToTerms;

  const handlePayment = async () => {
    if (!isFormValid) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const reservationId = `PH-${new Date().getFullYear()}${String(
      new Date().getMonth() + 1
    ).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}${String(
      Math.floor(Math.random() * 100000)
    ).padStart(5, '0')}`;

    router.push(
      `/booking/complete?reservationId=${reservationId}&studioId=${studioId}&productId=${productId}&date=${date}&time=${time}&totalPrice=${totalPrice}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center h-14">
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="flex-1 text-center font-semibold text-gray-900 pr-10">
              예약하기
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 pb-32 space-y-4">
        <BookingInfo
          studio={studio}
          product={product}
          date={date}
          time={time}
        />

        <BookerForm onBookerChange={setBooker} />

        <CouponSection
          availableCoupons={[]}
          selectedCoupon={selectedCoupon}
          onCouponSelect={setSelectedCoupon}
        />

        <PointSection
          availablePoints={2500}
          maxUsablePoints={Math.floor(totalPrice * 0.1)}
          onPointUse={setPointUsed}
        />

        <PaymentMethod
          selectedMethod={paymentMethod}
          onMethodChange={setPaymentMethod}
        />

        <PaymentSummary
          productPrice={productPrice}
          discount={discount}
          couponDiscount={couponDiscount}
          pointUsed={pointUsed}
        />

        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-5 h-5 mt-0.5 rounded border-gray-300 text-[#0152CC] focus:ring-[#0152CC]"
            />
            <div>
              <p className="font-medium text-gray-900">
                결제 진행에 동의합니다 <span className="text-[#0152CC]">(필수)</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                <button className="text-[#0152CC] hover:underline">이용약관</button>,{' '}
                <button className="text-[#0152CC] hover:underline">개인정보처리방침</button>
              </p>
            </div>
          </label>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 pb-safe">
        <div className="max-w-3xl mx-auto">
          <Button
            fullWidth
            size="xl"
            disabled={!isFormValid}
            isLoading={isLoading}
            onClick={handlePayment}
          >
            {isFormValid ? (
              <span className="flex items-center gap-2">
                <Check size={20} />
                {formatPrice(totalPrice)}원 결제하기
              </span>
            ) : (
              '필수 정보를 입력해주세요'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">로딩중...</div>}>
      <BookingContent />
    </Suspense>
  );
}
