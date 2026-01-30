'use client';

import { useMemo, Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Studio, Category } from '@/types';
import {
  CategoryBanners,
  HorizontalSection,
} from '@/components/search';

function SearchContent() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get('category');
  const searchQuery = searchParams.get('q') || '';

  const [studios, setStudios] = useState<Studio[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // 데이터 fetch
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // 카테고리 fetch
        const categoriesRes = await fetch('/api/categories');
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);

        // 스튜디오 fetch
        const params = new URLSearchParams();
        if (searchQuery) params.set('q', searchQuery);
        if (categorySlug) params.set('category', categorySlug);

        const studiosRes = await fetch(`/api/studios?${params.toString()}`);
        const studiosData = await studiosRes.json();
        setStudios(studiosData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [categorySlug, searchQuery]);

  const category = categories.find((c) => c.slug === categorySlug);
  const categoryName = category?.name || '전체';

  const filteredStudios = useMemo(() => {
    return studios;
  }, [studios]);

  const popularStudios = useMemo(() => {
    return [...filteredStudios].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 10);
  }, [filteredStudios]);

  const highRatedStudios = useMemo(() => {
    return [...filteredStudios].sort((a, b) => b.rating - a.rating).slice(0, 10);
  }, [filteredStudios]);

  const discountStudios = useMemo(() => {
    return [...filteredStudios]
      .filter((s) => s.products?.some((p) => p.discountRate > 0))
      .sort((a, b) => {
        const aMax = Math.max(...(a.products || []).map((p) => p.discountRate || 0), 0);
        const bMax = Math.max(...(b.products || []).map((p) => p.discountRate || 0), 0);
        return bMax - aMax;
      })
      .slice(0, 10);
  }, [filteredStudios]);

  const premiumStudios = useMemo(() => {
    return filteredStudios.filter((s) => s.grade === 'premium').slice(0, 10);
  }, [filteredStudios]);

  const highRatedByRegion = useMemo(() => {
    return [...filteredStudios]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10);
  }, [filteredStudios]);

  const regionTabs = [
    { id: 'all', label: '전체' },
    { id: 'gangnam', label: '강남/서초' },
    { id: 'hongdae', label: '홍대/마포' },
    { id: 'jamsil', label: '잠실/송파' },
    { id: 'sinchon', label: '신촌/이대' },
  ];

  const priceTabs = [
    { id: 'all', label: '전체' },
    { id: 'under-3', label: '3만원 이하' },
    { id: '3-5', label: '3~5만원' },
    { id: '5-10', label: '5~10만원' },
    { id: 'over-10', label: '10만원 이상' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">스튜디오 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32 md:pb-20">
      {/* Category Title */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">{categoryName}</h1>
          <p className="text-sm text-gray-500 mt-1">{studios.length}개의 스튜디오</p>
        </div>
      </div>

      {/* Promo Banners */}
      <CategoryBanners categorySlug={categorySlug || undefined} />

      {/* Popular Studios Section */}
      {popularStudios.length > 0 && (
        <HorizontalSection
          title={`인기 ${categoryName} 스튜디오`}
          subtitle="예약이 많은 순"
          link={`/search?category=${categorySlug}&sort=popular`}
          studios={popularStudios}
          showViewAllCard
        />
      )}

      {/* Discount Section */}
      {discountStudios.length > 0 && (
        <div className="border-t-8 border-gray-100">
          <HorizontalSection
            title="지금 할인 중"
            subtitle="최대 50% 할인"
            link={`/search?category=${categorySlug}&filter=discount`}
            studios={discountStudios}
            tabs={priceTabs}
            showViewAllCard
          />
        </div>
      )}

      {/* Premium Studios */}
      {premiumStudios.length > 0 && (
        <div className="border-t-8 border-gray-100">
          <HorizontalSection
            title="프리미엄 스튜디오"
            subtitle="최고의 퀄리티"
            link={`/search?category=${categorySlug}&grade=premium`}
            studios={premiumStudios}
            showViewAllCard
          />
        </div>
      )}

      {/* High Rated Studios by Region */}
      {highRatedByRegion.length > 0 && (
        <div className="border-t-8 border-gray-100">
          <HorizontalSection
            title="지역별 평점 높은 스튜디오"
            subtitle="4.5점 이상"
            link={`/search?category=${categorySlug}&sort=rating`}
            studios={highRatedByRegion}
            tabs={regionTabs}
            showViewAllCard
          />
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-500">로딩중...</div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
