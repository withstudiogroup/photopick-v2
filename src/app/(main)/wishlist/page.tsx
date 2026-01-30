'use client';

import { ChevronLeft, Heart, MapPin, Star, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { studios } from '@/data/mock';

const wishlistStudios = studios.slice(0, 5);

export default function WishlistPage() {
  const router = useRouter();

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
            <h1 className="flex-1 text-lg font-bold text-center mr-8">찜 목록</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-sm text-gray-500 mb-4">총 {wishlistStudios.length}개의 스튜디오</p>

        <div className="space-y-4">
          {wishlistStudios.map((studio) => (
            <div
              key={studio.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <Link href={`/studio/${studio.id}`} className="flex">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0">
                  <Image
                    src={studio.thumbnail}
                    alt={studio.name}
                    fill
                    className="object-cover"
                  />
                  {studio.discountRate && studio.discountRate > 0 && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#F87171] text-white text-xs font-bold rounded">
                      {studio.discountRate}%
                    </div>
                  )}
                </div>

                <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        {studio.grade === 'premium' && (
                          <span className="inline-block px-2 py-0.5 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-[10px] font-bold rounded mb-1">
                            PREMIUM
                          </span>
                        )}
                        <h3 className="font-bold text-gray-900">{studio.name}</h3>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        className="p-1 text-[#F87171] hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Heart size={20} fill="currentColor" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <MapPin size={12} />
                      <span>{studio.location.district}</span>
                      <span className="mx-1">|</span>
                      <span>{studio.location.nearestStation}역 도보 {studio.location.walkingMinutes}분</span>
                    </div>

                    <div className="flex items-center gap-1 mt-1">
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                      <span className="text-sm font-medium text-gray-900">{studio.rating}</span>
                      <span className="text-sm text-gray-400">({studio.reviewCount.toLocaleString()})</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {studio.categories.slice(0, 3).map((category) => (
                      <span
                        key={category}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {wishlistStudios.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Heart size={40} className="text-gray-300" />
            </div>
            <p className="text-gray-500 mb-4">찜한 스튜디오가 없습니다</p>
            <Link
              href="/search"
              className="inline-block px-6 py-2 bg-[#0152CC] text-white rounded-lg font-medium hover:bg-[#0141A3] transition-colors"
            >
              스튜디오 찾아보기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
