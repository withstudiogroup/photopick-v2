'use client';

import Image from 'next/image';
import { Calendar, Users, MapPin } from 'lucide-react';
import { Studio, Product } from '@/types';

interface BookingInfoProps {
  studio: Studio;
  product: Product;
  date: string;
  time: string;
  persons?: number;
}

export default function BookingInfo({
  studio,
  product,
  date,
  time,
  persons = 1,
}: BookingInfoProps) {
  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      <h2 className="text-lg font-bold text-gray-900 mb-4">예약 정보</h2>

      <div className="flex gap-4">
        <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
          <Image
            src={studio.thumbnail}
            alt={studio.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900">{studio.name}</h3>
          <p className="text-sm text-gray-600 mt-0.5">{product.name}</p>

          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={14} />
              <span>{formattedDate} {time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users size={14} />
              <span>성인 {persons}명</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={14} />
              <span className="truncate">{studio.location.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
