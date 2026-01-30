'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { CheckCircle, Calendar, MapPin, CreditCard, MessageSquare, Navigation } from 'lucide-react';
import { studios } from '@/data/mock';
import { Button } from '@/components/common';
import { formatPrice } from '@/lib/utils';

function CompleteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const reservationId = searchParams.get('reservationId');
  const studioId = searchParams.get('studioId');
  const productId = searchParams.get('productId');
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  const totalPrice = Number(searchParams.get('totalPrice'));

  const studio = studios.find((s) => s.id === studioId);
  const product = studio?.products.find((p) => p.id === productId);

  if (!studio || !product || !reservationId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">예약 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const formattedDate = date
    ? new Date(date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short',
      })
    : '';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0F7FF] to-white">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#0152CC] rounded-full flex items-center justify-center mx-auto mb-4 animate-fadeIn">
            <CheckCircle size={48} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            예약이 완료되었습니다!
          </h1>
          <p className="text-gray-600">
            예약번호: <span className="font-semibold">{reservationId}</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-6">
            <div className="flex gap-4 pb-6 border-b border-gray-100">
              <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden">
                <Image
                  src={studio.thumbnail}
                  alt={studio.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="font-bold text-lg text-gray-900">{studio.name}</h2>
                <p className="text-sm text-gray-600">{product.name}</p>
              </div>
            </div>

            <div className="py-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Calendar size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">예약 일시</p>
                  <p className="font-medium text-gray-900">
                    {formattedDate} {time}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <MapPin size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">위치</p>
                  <p className="font-medium text-gray-900">
                    {studio.location.address}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <CreditCard size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">결제 금액</p>
                  <p className="font-bold text-lg text-[#0152CC]">
                    {formatPrice(totalPrice)}원
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl">
                <MessageSquare size={18} className="text-blue-500" />
                <p className="text-sm text-blue-700">
                  예약 확인 SMS가 발송되었습니다
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => router.push('/mypage/reservations')}
          >
            예약 상세보기
          </Button>
          <Button
            variant="secondary"
            size="lg"
            fullWidth
            onClick={() => {
              const encodedAddress = encodeURIComponent(studio.location.address);
              window.open(`https://map.kakao.com/link/search/${encodedAddress}`, '_blank');
            }}
          >
            <Navigation size={18} className="mr-2" />
            길찾기
          </Button>
        </div>

        <div className="mt-6">
          <Button
            fullWidth
            size="lg"
            onClick={() => router.push('/')}
          >
            홈으로
          </Button>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-3">예약 시 유의사항</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-[#0152CC]">•</span>
              예약 시간 10분 전까지 도착해 주세요.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0152CC]">•</span>
              예약 변경은 24시간 전까지 가능합니다.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#0152CC]">•</span>
              노쇼 시 예약금 환불이 불가합니다.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function BookingCompletePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">로딩중...</div>}>
      <CompleteContent />
    </Suspense>
  );
}
