'use client';

import Link from 'next/link';
import { Gift, Ticket, Tag, PartyPopper } from 'lucide-react';

const actions = [
  {
    icon: Gift,
    label: 'PhotoPick 드로우',
    href: '/event/draw',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
  },
  {
    icon: Ticket,
    label: '포인트 혜택',
    href: '/point',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
  },
  {
    icon: Tag,
    label: '이번달 쿠폰팩',
    href: '/coupon',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
  },
  {
    icon: PartyPopper,
    label: '이벤트 더보기',
    href: '/event',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
  },
];

export default function QuickActions() {
  return (
    <section className="py-4 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-4 gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 hover:border-[#0152CC] hover:shadow-md transition-all group"
              >
                <div className={`w-8 h-8 rounded-lg ${action.bgColor} flex items-center justify-center`}>
                  <Icon size={18} className={action.color} />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-[#0152CC] transition-colors hidden sm:block">
                  {action.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
