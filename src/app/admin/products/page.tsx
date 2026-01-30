'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Package,
  DollarSign,
  Clock,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  basePrice: number;
  discountRate: number;
  duration: number;
  maxPeople: number;
  includes: string[];
  thumbnail: string;
  isActive: boolean;
}

// 임시 데이터
const initialProducts: Product[] = [
  {
    id: '1',
    name: '증명사진 베이직',
    description: '증명사진 8컷, 즉석인화, 데이터 제공',
    category: '증명사진',
    basePrice: 20000,
    discountRate: 10,
    duration: 10,
    maxPeople: 1,
    includes: ['증명사진 8컷', '즉석인화', '데이터 제공'],
    thumbnail:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    isActive: true,
  },
  {
    id: '2',
    name: '증명사진 프리미엄',
    description: '증명사진 8컷, 보정 2컷, 헤어메이크업',
    category: '증명사진',
    basePrice: 50000,
    discountRate: 20,
    duration: 30,
    maxPeople: 1,
    includes: ['증명사진 8컷', '보정 2컷', '헤어메이크업', '데이터 제공'],
    thumbnail:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    isActive: true,
  },
  {
    id: '3',
    name: '프로필 스탠다드',
    description: '프로필 촬영 20컷, 보정 5컷',
    category: '프로필/이력서',
    basePrice: 80000,
    discountRate: 0,
    duration: 60,
    maxPeople: 1,
    includes: ['프로필 촬영 20컷', '보정 5컷', '원본 제공'],
    thumbnail:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    isActive: true,
  },
  {
    id: '4',
    name: '가족사진 패키지',
    description: '가족사진 촬영 1시간, 보정 10컷',
    category: '가족사진',
    basePrice: 200000,
    discountRate: 15,
    duration: 60,
    maxPeople: 6,
    includes: ['가족사진 촬영 1시간', '보정 10컷', '원본 전체 제공', '액자 1개'],
    thumbnail:
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400',
    isActive: false,
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleDelete = (productId: string) => {
    if (!confirm('이 상품을 삭제하시겠습니까?')) return;
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleToggleActive = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, isActive: !p.isActive } : p
      )
    );
  };

  const calculateDiscountedPrice = (basePrice: number, discountRate: number) => {
    return Math.floor(basePrice * (1 - discountRate / 100));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">상품 관리</h1>
          <p className="text-sm text-gray-500 mt-1">
            촬영 상품을 등록하고 관리합니다
          </p>
        </div>
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#0152CC] text-white rounded-lg font-medium hover:bg-[#0141a3] transition-colors"
        >
          <Plus size={18} />
          상품 추가
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Package className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">전체 상품</p>
              <p className="text-xl font-bold text-gray-900">{products.length}개</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Package className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">판매 중</p>
              <p className="text-xl font-bold text-gray-900">
                {products.filter((p) => p.isActive).length}개
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className={cn(
              'bg-white rounded-xl border overflow-hidden',
              product.isActive ? 'border-gray-200' : 'border-gray-200 opacity-60'
            )}
          >
            {/* Thumbnail */}
            <div className="relative aspect-[16/9]">
              <Image
                src={product.thumbnail}
                alt={product.name}
                fill
                className="object-cover"
              />
              {!product.isActive && (
                <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                  <span className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full">
                    판매 중지
                  </span>
                </div>
              )}
              {product.discountRate > 0 && product.isActive && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                  {product.discountRate}% 할인
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-xs text-gray-500">{product.category}</span>
                  <h3 className="font-bold text-gray-900">{product.name}</h3>
                </div>
                <div className="relative group">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <MoreVertical size={18} />
                  </button>
                  <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setShowForm(true);
                      }}
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Edit size={14} />
                      수정
                    </button>
                    <button
                      onClick={() => handleToggleActive(product.id)}
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {product.isActive ? '판매 중지' : '판매 시작'}
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <Trash2 size={14} />
                      삭제
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                {product.description}
              </p>

              {/* Info */}
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {product.duration}분
                </span>
                <span className="flex items-center gap-1">
                  <Users size={12} />
                  최대 {product.maxPeople}인
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                {product.discountRate > 0 && (
                  <span className="text-sm text-gray-400 line-through">
                    {product.basePrice.toLocaleString()}원
                  </span>
                )}
                <span className="text-lg font-bold text-gray-900">
                  {calculateDiscountedPrice(
                    product.basePrice,
                    product.discountRate
                  ).toLocaleString()}
                  원
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Card */}
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
          className="aspect-[4/3] rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:border-[#0152CC] hover:bg-blue-50 transition-colors"
        >
          <Plus size={32} className="text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">새 상품 추가</span>
        </button>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
          onSave={(product) => {
            if (editingProduct) {
              setProducts((prev) =>
                prev.map((p) => (p.id === product.id ? product : p))
              );
            } else {
              setProducts((prev) => [
                ...prev,
                { ...product, id: `new-${Date.now()}` },
              ]);
            }
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}

// Product Form Modal Component
function ProductFormModal({
  product,
  onClose,
  onSave,
}: {
  product: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
}) {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      name: '',
      description: '',
      category: '증명사진',
      basePrice: 0,
      discountRate: 0,
      duration: 30,
      maxPeople: 1,
      includes: [],
      thumbnail: '',
      isActive: true,
    }
  );
  const [includeInput, setIncludeInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Product);
  };

  const addInclude = () => {
    if (!includeInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      includes: [...(prev.includes || []), includeInput.trim()],
    }));
    setIncludeInput('');
  };

  const removeInclude = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      includes: prev.includes?.filter((_, i) => i !== index),
    }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-bold text-gray-900">
            {product ? '상품 수정' : '새 상품 등록'}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              상품명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              카테고리
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
            >
              <option value="증명사진">증명사진</option>
              <option value="프로필/이력서">프로필/이력서</option>
              <option value="가족사진">가족사진</option>
              <option value="웨딩/스냅">웨딩/스냅</option>
              <option value="아기/돌스냅">아기/돌스냅</option>
              <option value="컨셉촬영">컨셉촬영</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              설명
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                기본 가격 <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.basePrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    basePrice: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                할인율 (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.discountRate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discountRate: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                소요 시간 (분)
              </label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                최대 인원
              </label>
              <input
                type="number"
                min="1"
                value={formData.maxPeople}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxPeople: parseInt(e.target.value) || 1,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              포함 내역
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={includeInput}
                onChange={(e) => setIncludeInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInclude())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
                placeholder="예: 보정 5컷"
              />
              <button
                type="button"
                onClick={addInclude}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                추가
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.includes?.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-sm"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeInclude(index)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-[#0152CC] text-white rounded-lg font-medium hover:bg-[#0141a3]"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
