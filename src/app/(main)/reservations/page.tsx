'use client';

import { ChevronLeft, Calendar, MapPin, Clock, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { studios } from '@/data/mock';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type ReservationStatus = 'upcoming' | 'completed' | 'cancelled';

interface Reservation {
  id: string;
  studio: typeof studios[0];
  product: typeof studios[0]['products'][0];
  date: string;
  time: string;
  status: ReservationStatus;
  price: number;
}

const mockReservations: Reservation[] = [
  {
    id: '1',
    studio: studios[0],
    product: studios[0].products[1],
    date: '2026-01-25',
    time: '14:00',
    status: 'upcoming',
    price: 40000,
  },
  {
    id: '2',
    studio: studios[2],
    product: studios[2].products[0],
    date: '2026-02-10',
    time: '11:00',
    status: 'upcoming',
    price: 135000,
  },
  {
    id: '3',
    studio: studios[1],
    product: studios[1].products[0],
    date: '2025-12-20',
    time: '15:00',
    status: 'completed',
    price: 15000,
  },
  {
    id: '4',
    studio: studios[4],
    product: studios[4].products[1],
    date: '2025-11-15',
    time: '10:00',
    status: 'cancelled',
    price: 90000,
  },
];

const statusConfig: Record<ReservationStatus, { label: string; className: string }> = {
  upcoming: { label: '예약 확정', className: 'bg-[#0152CC] text-white' },
  completed: { label: '촬영 완료', className: 'bg-gray-500 text-white' },
  cancelled: { label: '취소됨', className: 'bg-gray-200 text-gray-500' },
};

const tabs: { value: ReservationStatus | 'all'; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'upcoming', label: '예약중' },
  { value: 'completed', label: '완료' },
  { value: 'cancelled', label: '취소' },
];

export default function ReservationsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ReservationStatus | 'all'>('all');

  const filteredReservations = activeTab === 'all'
    ? mockReservations
    : mockReservations.filter((r) => r.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14">
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="flex-1 text-lg font-bold text-center mr-8">예약 내역</h1>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 py-3 overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                  activeTab === tab.value
                    ? 'bg-[#0152CC] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {filteredReservations.length > 0 ? (
          <div className="space-y-4">
            {filteredReservations.map((reservation) => {
              const config = statusConfig[reservation.status];

              return (
                <div
                  key={reservation.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className={cn('px-2 py-0.5 text-xs font-medium rounded', config.className)}>
                        {config.label}
                      </span>
                      <span className="text-sm text-gray-500">예약번호: {reservation.id}</span>
                    </div>

                    <Link href={`/studio/${reservation.studio.id}`} className="flex gap-3">
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={reservation.product.images[0]}
                          alt={reservation.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900">{reservation.studio.name}</h3>
                        <p className="text-sm text-gray-600 mt-0.5">{reservation.product.name}</p>

                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                          <Calendar size={14} />
                          <span>{reservation.date}</span>
                          <Clock size={14} className="ml-1" />
                          <span>{reservation.time}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-gray-900">{formatPrice(reservation.price)}원</p>
                        <ChevronRight size={18} className="text-gray-400 mt-1 ml-auto" />
                      </div>
                    </Link>
                  </div>

                  {reservation.status === 'upcoming' && (
                    <div className="flex border-t border-gray-100">
                      <button className="flex-1 py-3 text-sm text-gray-600 hover:bg-gray-50 transition-colors border-r border-gray-100">
                        예약 변경
                      </button>
                      <button className="flex-1 py-3 text-sm text-[#F87171] hover:bg-red-50 transition-colors">
                        예약 취소
                      </button>
                    </div>
                  )}

                  {reservation.status === 'completed' && (
                    <div className="flex border-t border-gray-100">
                      <button className="flex-1 py-3 text-sm text-[#0152CC] font-medium hover:bg-[#F0F7FF] transition-colors border-r border-gray-100">
                        리뷰 작성
                      </button>
                      <button className="flex-1 py-3 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                        다시 예약
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Calendar size={40} className="text-gray-300" />
            </div>
            <p className="text-gray-500 mb-4">예약 내역이 없습니다</p>
            <Link
              href="/search"
              className="inline-block px-6 py-2 bg-[#0152CC] text-white rounded-lg font-medium hover:bg-[#0141A3] transition-colors"
            >
              스튜디오 예약하기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
