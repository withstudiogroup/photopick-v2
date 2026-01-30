'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

const purposes = [
  {
    id: '1',
    title: '증명사진 전문',
    badge: 'BEST',
    badgeColor: 'bg-gray-800',
    href: '/search?purpose=id-photo-expert',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  },
  {
    id: '2',
    title: '비즈니스 프로필',
    badge: 'HOT',
    badgeColor: 'bg-gray-800',
    href: '/search?purpose=profile-expert',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
  },
  {
    id: '3',
    title: '자연광 스튜디오',
    badge: 'NEW',
    badgeColor: 'bg-gray-800',
    href: '/search?purpose=natural-light',
    image: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=400',
  },
  {
    id: '4',
    title: '아기/돌잔치',
    badge: '인기',
    badgeColor: 'bg-gray-800',
    href: '/search?purpose=baby-expert',
    image: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=400',
  },
];

export default function PurposeRecommend() {
  return (
    <section className="py-5 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">목적별 추천</h2>
          <Link
            href="/search"
            className="flex items-center gap-0.5 text-sm text-gray-500 hover:text-[#0152CC]"
          >
            전체보기
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {purposes.map((purpose) => (
            <Link
              key={purpose.id}
              href={purpose.href}
              className="group relative overflow-hidden rounded-xl aspect-[4/5]"
            >
              <Image
                src={purpose.image}
                alt={purpose.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <span className={`absolute top-2 left-2 ${purpose.badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded`}>
                {purpose.badge}
              </span>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white font-bold text-base">
                  {purpose.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
