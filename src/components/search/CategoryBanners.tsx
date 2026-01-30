'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  badge?: string;
}

interface CategoryBannersProps {
  categorySlug?: string;
}

const bannersByCategory: Record<string, Banner[]> = {
  'id-photo': [
    {
      id: '1',
      title: '증명사진 최대 50% 할인',
      subtitle: '새해 특가 이벤트',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
      link: '/event/id-photo-sale',
      badge: '특가',
    },
    {
      id: '2',
      title: '취업 시즌 프로모션',
      subtitle: '이력서 사진 + 증명사진 패키지',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600',
      link: '/event/job-season',
    },
  ],
  'profile': [
    {
      id: '1',
      title: '프로필 촬영 특가',
      subtitle: '헤어메이크업 무료 제공',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600',
      link: '/event/profile-sale',
      badge: 'HOT',
    },
    {
      id: '2',
      title: 'SNS 프로필 패키지',
      subtitle: '보정본 10장 + 원본 전체',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600',
      link: '/event/sns-profile',
    },
  ],
  'family': [
    {
      id: '1',
      title: '가족사진 20% 할인',
      subtitle: '4인 가족 기준 최대 5만원 할인',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600',
      link: '/event/family-sale',
      badge: '인기',
    },
    {
      id: '2',
      title: '3대 가족사진 특별전',
      subtitle: '조부모님과 함께하는 특별한 순간',
      image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600',
      link: '/event/three-gen',
    },
  ],
  default: [
    {
      id: '1',
      title: '신규 회원 30% 할인',
      subtitle: '첫 예약 고객 한정',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600',
      link: '/event/new-member',
      badge: 'NEW',
    },
    {
      id: '2',
      title: '리뷰 이벤트',
      subtitle: '포토리뷰 작성시 5,000원 적립',
      image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=600',
      link: '/event/review',
    },
  ],
};

export default function CategoryBanners({ categorySlug }: CategoryBannersProps) {
  const banners = bannersByCategory[categorySlug || ''] || bannersByCategory.default;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {banners.map((banner) => (
          <Link
            key={banner.id}
            href={banner.link}
            className="relative rounded-xl overflow-hidden aspect-[2/1] group"
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <div className="absolute inset-0 p-4 flex flex-col justify-center">
              {banner.badge && (
                <span className="inline-block w-fit px-2 py-0.5 bg-[#0152CC] text-white text-xs font-bold rounded mb-2">
                  {banner.badge}
                </span>
              )}
              <p className="text-white/90 text-sm mb-1">{banner.subtitle}</p>
              <h3 className="text-white text-lg sm:text-xl font-bold">{banner.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
