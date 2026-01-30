'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Share2, Heart, Home } from 'lucide-react';
import { useState } from 'react';

interface StudioDetailHeaderProps {
  studioName: string;
  onShare?: () => void;
}

export default function StudioDetailHeader({ studioName, onShare }: StudioDetailHeaderProps) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);

  const handleShare = async () => {
    if (onShare) {
      onShare();
    } else if (navigator.share) {
      try {
        await navigator.share({
          title: studioName,
          text: `${studioName} - PhotoPick`,
          url: window.location.href,
        });
      } catch {
        console.log('공유 취소됨');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 복사되었습니다!');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <button
              onClick={() => router.back()}
              className="p-1.5 -ml-1.5 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            >
              <ChevronLeft size={24} className="text-gray-700" />
            </button>
            <h1 className="font-medium text-gray-900 truncate">
              {studioName}
            </h1>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleShare}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Share2 size={20} className="text-gray-600" />
            </button>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart
                size={20}
                className={isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'}
              />
            </button>
            <button
              onClick={() => router.push('/')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Home size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
