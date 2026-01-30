'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Plus,
  Edit2,
  Trash2,
  GripVertical,
  Eye,
  EyeOff,
  X,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Banner {
  id: string;
  title: string;
  image: string;
  mobileImage?: string;
  linkUrl: string;
  position: 'main' | 'sub' | 'popup';
  isActive: boolean;
  order: number;
  startDate: string;
  endDate: string;
  clicks: number;
  impressions: number;
}

const initialBanners: Banner[] = [
  {
    id: '1',
    title: '신년 특별 할인 이벤트',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=1200',
    linkUrl: '/events/new-year',
    position: 'main',
    isActive: true,
    order: 0,
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    clicks: 3456,
    impressions: 45678,
  },
  {
    id: '2',
    title: '프리미엄 스튜디오 특별전',
    image: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=1200',
    linkUrl: '/events/premium',
    position: 'main',
    isActive: true,
    order: 1,
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    clicks: 1234,
    impressions: 23456,
  },
  {
    id: '3',
    title: '앱 다운로드 이벤트',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200',
    linkUrl: '/app-download',
    position: 'popup',
    isActive: true,
    order: 0,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    clicks: 5678,
    impressions: 67890,
  },
  {
    id: '4',
    title: '증명사진 베스트 스튜디오',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
    linkUrl: '/category/id-photo',
    position: 'sub',
    isActive: true,
    order: 0,
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    clicks: 890,
    impressions: 12345,
  },
];

const positionConfig = {
  main: { label: '메인', color: 'bg-purple-500' },
  sub: { label: '서브', color: 'bg-blue-500' },
  popup: { label: '팝업', color: 'bg-orange-500' },
};

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [filterPosition, setFilterPosition] = useState<string>('all');
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    mobileImage: '',
    linkUrl: '',
    position: 'main' as 'main' | 'sub' | 'popup',
    startDate: '',
    endDate: '',
  });

  const handleOpenModal = (banner?: Banner) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        title: banner.title,
        image: banner.image,
        mobileImage: banner.mobileImage || '',
        linkUrl: banner.linkUrl,
        position: banner.position,
        startDate: banner.startDate,
        endDate: banner.endDate,
      });
    } else {
      setEditingBanner(null);
      setFormData({
        title: '',
        image: '',
        mobileImage: '',
        linkUrl: '',
        position: 'main',
        startDate: '',
        endDate: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBanner(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBanner) {
      setBanners((prev) =>
        prev.map((b) =>
          b.id === editingBanner.id ? { ...b, ...formData } : b
        )
      );
    } else {
      const newBanner: Banner = {
        id: Date.now().toString(),
        ...formData,
        isActive: true,
        order: banners.filter((b) => b.position === formData.position).length,
        clicks: 0,
        impressions: 0,
      };
      setBanners((prev) => [...prev, newBanner]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (!confirm('이 배너를 삭제하시겠습니까?')) return;
    setBanners((prev) => prev.filter((b) => b.id !== id));
  };

  const handleToggleActive = (id: string) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b))
    );
  };

  const filteredBanners = banners.filter(
    (b) => filterPosition === 'all' || b.position === filterPosition
  );

  const getCTR = (clicks: number, impressions: number) => {
    if (impressions === 0) return '0.00';
    return ((clicks / impressions) * 100).toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">배너 관리</h1>
          <p className="text-sm text-gray-400 mt-1">
            메인, 서브, 팝업 배너를 관리합니다
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          <Plus size={18} />
          배너 등록
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {[
          { value: 'all', label: '전체' },
          { value: 'main', label: '메인 배너' },
          { value: 'sub', label: '서브 배너' },
          { value: 'popup', label: '팝업' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilterPosition(tab.value)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              filterPosition === tab.value
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            )}
          >
            {tab.label}
            <span className="ml-2 text-xs">
              ({tab.value === 'all'
                ? banners.length
                : banners.filter((b) => b.position === tab.value).length})
            </span>
          </button>
        ))}
      </div>

      {/* Banners Grid */}
      <div className="space-y-4">
        {filteredBanners.map((banner) => (
          <div
            key={banner.id}
            className={cn(
              'bg-gray-800 rounded-xl border overflow-hidden',
              banner.isActive ? 'border-gray-700' : 'border-gray-700/50 opacity-60'
            )}
          >
            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              <div className="relative lg:w-80 h-40 lg:h-auto flex-shrink-0">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span
                    className={cn(
                      'px-2 py-1 text-xs font-medium rounded text-white',
                      positionConfig[banner.position].color
                    )}
                  >
                    {positionConfig[banner.position].label}
                  </span>
                </div>
                {!banner.isActive && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded">
                      비활성
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-white mb-1">{banner.title}</h3>
                    <a
                      href={banner.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-purple-400 hover:underline"
                    >
                      {banner.linkUrl}
                      <ExternalLink size={12} />
                    </a>
                  </div>
                  <button
                    onClick={() => handleToggleActive(banner.id)}
                    className="p-2 rounded-lg hover:bg-gray-700"
                  >
                    {banner.isActive ? (
                      <Eye size={20} className="text-green-400" />
                    ) : (
                      <EyeOff size={20} className="text-red-400" />
                    )}
                  </button>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                  <span>기간: {banner.startDate} ~ {banner.endDate}</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">노출수</p>
                    <p className="font-bold text-white">
                      {banner.impressions.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">클릭수</p>
                    <p className="font-bold text-white">
                      {banner.clicks.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">CTR</p>
                    <p className="font-bold text-purple-400">
                      {getCTR(banner.clicks, banner.impressions)}%
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenModal(banner)}
                    className="flex items-center gap-1 px-4 py-2 bg-gray-700 text-white text-sm font-medium rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <Edit2 size={14} />
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(banner.id)}
                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredBanners.length === 0 && (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-12 text-center">
            <p className="text-gray-400">등록된 배너가 없습니다</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={handleCloseModal}
          />
          <div className="relative bg-gray-800 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">
                {editingBanner ? '배너 수정' : '배너 등록'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  배너명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  위치 <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  {(['main', 'sub', 'popup'] as const).map((pos) => (
                    <button
                      key={pos}
                      type="button"
                      onClick={() => setFormData({ ...formData, position: pos })}
                      className={cn(
                        'flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                        formData.position === pos
                          ? `${positionConfig[pos].color} text-white`
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      )}
                    >
                      {positionConfig[pos].label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  이미지 URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  모바일 이미지 URL (선택)
                </label>
                <input
                  type="url"
                  value={formData.mobileImage}
                  onChange={(e) =>
                    setFormData({ ...formData, mobileImage: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  링크 URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.linkUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, linkUrl: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="/events/..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    시작일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    종료일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  {editingBanner ? '수정' : '등록'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
