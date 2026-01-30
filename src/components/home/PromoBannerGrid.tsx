'use client';

import Link from 'next/link';

interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  backgroundColor: string;
  textColor: string;
  link: string;
}

const promoBanners: PromoBanner[] = [
  {
    id: '1',
    title: '새해 특가',
    subtitle: '증명사진 최대 50% 할인',
    backgroundColor: 'bg-gradient-to-br from-[#0152CC] to-[#3D7FE6]',
    textColor: 'text-white',
    link: '/event/new-year',
  },
  {
    id: '2',
    title: '프로필 패키지',
    subtitle: '헤어메이크업 무료',
    backgroundColor: 'bg-gradient-to-br from-[#2E6EB8] to-[#60A5FA]',
    textColor: 'text-white',
    link: '/event/profile',
  },
  {
    id: '3',
    title: '가족사진',
    subtitle: '신규회원 20% 할인',
    backgroundColor: 'bg-gradient-to-br from-[#4A90D9] to-[#93C5FD]',
    textColor: 'text-white',
    link: '/event/family',
  },
  {
    id: '4',
    title: '웨딩 시즌',
    subtitle: '드레스 무료 대여',
    backgroundColor: 'bg-gradient-to-br from-[#4ADE80] to-[#86EFAC]',
    textColor: 'text-white',
    link: '/event/wedding',
  },
];

export default function PromoBannerGrid() {
  return (
    <section className="py-4 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {promoBanners.map((banner) => (
            <Link
              key={banner.id}
              href={banner.link}
              className={`${banner.backgroundColor} ${banner.textColor} rounded-xl p-4 h-24 md:h-28 flex flex-col justify-between hover:opacity-90 transition-opacity hover:scale-[1.02] active:scale-[0.98]`}
            >
              <span className="text-xs font-medium opacity-90">{banner.subtitle}</span>
              <span className="text-lg md:text-xl font-bold">{banner.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
