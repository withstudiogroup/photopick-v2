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
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  studioCount: number;
  isActive: boolean;
  order: number;
}

const initialCategories: Category[] = [
  {
    id: '1',
    name: '증명사진',
    slug: 'id-photo',
    description: '취업, 여권, 비자용 증명사진 촬영',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    studioCount: 234,
    isActive: true,
    order: 0,
  },
  {
    id: '2',
    name: '프로필',
    slug: 'profile',
    description: '비즈니스, SNS, 배우 프로필 촬영',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    studioCount: 189,
    isActive: true,
    order: 1,
  },
  {
    id: '3',
    name: '가족사진',
    slug: 'family',
    description: '돌잔치, 가족 기념 촬영',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400',
    studioCount: 156,
    isActive: true,
    order: 2,
  },
  {
    id: '4',
    name: '웨딩',
    slug: 'wedding',
    description: '웨딩 본식, 스냅, 리허설 촬영',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
    studioCount: 98,
    isActive: true,
    order: 3,
  },
  {
    id: '5',
    name: '우정사진',
    slug: 'friendship',
    description: '친구, 커플 기념 촬영',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400',
    studioCount: 145,
    isActive: true,
    order: 4,
  },
  {
    id: '6',
    name: '반려동물',
    slug: 'pet',
    description: '반려동물 단독 및 가족 촬영',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
    studioCount: 67,
    isActive: false,
    order: 5,
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
  });

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description,
        image: category.image,
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: '', slug: '', description: '', image: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({ name: '', slug: '', description: '', image: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingCategory.id ? { ...cat, ...formData } : cat
        )
      );
    } else {
      const newCategory: Category = {
        id: Date.now().toString(),
        ...formData,
        studioCount: 0,
        isActive: true,
        order: categories.length,
      };
      setCategories((prev) => [...prev, newCategory]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (!confirm('이 카테고리를 삭제하시겠습니까?')) return;
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const handleToggleActive = (id: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, isActive: !cat.isActive } : cat
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">카테고리 관리</h1>
          <p className="text-sm text-gray-400 mt-1">
            사진 촬영 카테고리를 관리합니다
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          <Plus size={18} />
          카테고리 추가
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className={cn(
              'bg-gray-800 rounded-xl border overflow-hidden',
              category.isActive ? 'border-gray-700' : 'border-red-900/50'
            )}
          >
            <div className="relative h-32">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className={cn(
                  'object-cover',
                  !category.isActive && 'opacity-50'
                )}
              />
              {!category.isActive && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded">
                    비활성
                  </span>
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-1">
                <button
                  onClick={() => handleToggleActive(category.id)}
                  className="p-1.5 bg-gray-900/80 rounded hover:bg-gray-900"
                >
                  {category.isActive ? (
                    <Eye size={16} className="text-green-400" />
                  ) : (
                    <EyeOff size={16} className="text-red-400" />
                  )}
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-white">{category.name}</h3>
                  <p className="text-xs text-gray-500">/{category.slug}</p>
                </div>
                <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs font-medium rounded">
                  {category.studioCount}개 스튜디오
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                {category.description}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenModal(category)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-700 text-white text-sm font-medium rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <Edit2 size={14} />
                  수정
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={handleCloseModal}
          />
          <div className="relative bg-gray-800 rounded-xl w-full max-w-md p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">
                {editingCategory ? '카테고리 수정' : '카테고리 추가'}
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
                  카테고리명 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  슬러그 (URL) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="예: id-photo"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  설명
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  이미지 URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://..."
                />
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
                  {editingCategory ? '수정' : '추가'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
