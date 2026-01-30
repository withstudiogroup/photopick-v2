'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { studios } from '@/data/mock';
import { Product } from '@/types';
import {
  StudioDetailHeader,
  ImageGallery,
  StudioInfo,
  StudioTabs,
  ProductSection,
  LocationSection,
  FacilitySection,
  IntroSection,
  NoticeSection,
  ReviewSection,
  ReservationModal,
  FloatingReserveButton,
} from '@/components/studio';

export default function StudioDetailClient() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('products');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const studio = studios.find((s) => s.id === params.id);

  useEffect(() => {
    if (!studio) {
      router.push('/');
    }
  }, [studio, router]);

  if (!studio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">로딩중...</div>
      </div>
    );
  }

  const lowestPrice = Math.min(
    ...studio.products.map((p) =>
      p.discountRate > 0 ? p.basePrice * (1 - p.discountRate / 100) : p.basePrice
    )
  );
  const maxDiscount = Math.max(...studio.products.map((p) => p.discountRate));

  const handleReserve = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      const offset = 120;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleReservationConfirm = (date: Date, time: string) => {
    setIsModalOpen(false);
    router.push(
      `/booking?studioId=${studio.id}&productId=${selectedProduct?.id}&date=${date.toISOString()}&time=${time}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-0">
      <div className="max-w-3xl mx-auto bg-white min-h-screen">
        <StudioDetailHeader studioName={studio.name} />
        <ImageGallery images={studio.images} studioName={studio.name} />
        <StudioInfo studio={studio} />
        <StudioTabs activeTab={activeTab} onTabChange={handleTabChange} />
        <ProductSection products={studio.products} onReserve={handleReserve} />
        <LocationSection studio={studio} />
        <ReviewSection studio={studio} />
        <IntroSection studio={studio} />
        <FacilitySection studio={studio} />
        <NoticeSection studio={studio} />
      </div>

      <FloatingReserveButton
        lowestPrice={lowestPrice}
        maxDiscount={maxDiscount}
        onReserve={() => handleReserve(studio.products[0])}
      />

      {selectedProduct && (
        <ReservationModal
          studio={studio}
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleReservationConfirm}
        />
      )}
    </div>
  );
}
