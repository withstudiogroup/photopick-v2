'use client';

import { ChevronLeft, Clock, MapPin, Star, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { studios } from '@/data/mock';

const recentStudios = [
  { studio: studios[0], viewedAt: '오늘 14:30' },
  { studio: studios[2], viewedAt: '오늘 11:20' },
  { studio: studios[1], viewedAt: '어제 18:45' },
  { studio: studios[4], viewedAt: '어제 15:10' },
  { studio: studios[3], viewedAt: '2일 전' },
  { studio: studios[5], viewedAt: '3일 전' },
];

export default function RecentPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-lg font-bold">최근 본 스튜디오</h1>
            <button className="text-sm text-gray-500 hover:text-gray-700">
              전체 삭제
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {recentStudios.length > 0 ? (
          <>
            <p className="text-sm text-gray-500 mb-4">최근 30일 동안 본 스튜디오입니다.</p>

            <div className="space-y-3">
              {recentStudios.map(({ studio, viewedAt }, index) => (
                <div
                  key={`${studio.id}-${index}`}
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <Link href={`/studio/${studio.id}`} className="flex items-center p-3">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={studio.thumbnail}
                        alt={studio.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 ml-3 min-w-0">
                      <div className="flex items-center gap-2">
                        {studio.grade === 'premium' && (
                          <span className="px-1.5 py-0.5 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-[10px] font-bold rounded">
                            PREMIUM
                          </span>
                        )}
                        <h3 className="font-bold text-gray-900 truncate">{studio.name}</h3>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
                        <div className="flex items-center gap-0.5">
                          <MapPin size={12} />
                          <span>{studio.location.district}</span>
                        </div>
                        <span>|</span>
                        <div className="flex items-center gap-0.5">
                          <Star size={12} className="text-amber-400 fill-amber-400" />
                          <span>{studio.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                        <Clock size={12} />
                        <span>{viewedAt}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Clock size={40} className="text-gray-300" />
            </div>
            <p className="text-gray-500 mb-4">최근 본 스튜디오가 없습니다</p>
            <Link
              href="/search"
              className="inline-block px-6 py-2 bg-[#0152CC] text-white rounded-lg font-medium hover:bg-[#0141A3] transition-colors"
            >
              스튜디오 둘러보기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
