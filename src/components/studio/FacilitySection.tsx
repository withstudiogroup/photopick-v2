'use client';

import {
  Sun,
  Lightbulb,
  Scissors,
  Shirt,
  Package,
  Car,
  Wifi,
  Coffee,
  Sofa,
  Baby,
  PawPrint,
  Accessibility,
  Clock,
  CalendarOff,
  type LucideIcon,
} from 'lucide-react';
import { Studio } from '@/types';

interface FacilitySectionProps {
  studio: Studio;
}

const facilityIcons: Record<string, { icon: LucideIcon }> = {
  '자연광': { icon: Sun },
  '인공조명': { icon: Lightbulb },
  '헤어메이크업': { icon: Scissors },
  '의상대여': { icon: Shirt },
  '소품제공': { icon: Package },
  '주차가능': { icon: Car },
  'WiFi': { icon: Wifi },
  '음료제공': { icon: Coffee },
  '대기공간': { icon: Sofa },
  '유아용품': { icon: Baby },
  '반려동물가능': { icon: PawPrint },
  '장애인편의': { icon: Accessibility },
};

export default function FacilitySection({ studio }: FacilitySectionProps) {
  return (
    <section id="facility" className="py-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">시설/서비스</h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          {studio.facilities.map((facility) => {
            const config = facilityIcons[facility] || { icon: Package };
            const Icon = config.icon;

            return (
              <div
                key={facility}
                className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <span className="text-xs text-gray-700 text-center">{facility}</span>
              </div>
            );
          })}
        </div>

        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-gray-500" />
            <div>
              <span className="text-sm text-gray-500">운영시간</span>
              <p className="font-medium text-gray-900">{studio.operatingHours}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CalendarOff size={18} className="text-gray-500" />
            <div>
              <span className="text-sm text-gray-500">휴무일</span>
              <p className="font-medium text-gray-900">{studio.closedDays}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
