'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Upload,
  Trash2,
  Star,
  GripVertical,
  Plus,
  ImageIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StudioImage {
  id: string;
  url: string;
  alt: string;
  isMain: boolean;
  order: number;
}

// 임시 데이터
const initialImages: StudioImage[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=800',
    alt: '스튜디오 메인 이미지',
    isMain: true,
    order: 0,
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    alt: '촬영 공간 1',
    isMain: false,
    order: 1,
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800',
    alt: '촬영 공간 2',
    isMain: false,
    order: 2,
  },
];

export default function ImagesPage() {
  const [images, setImages] = useState<StudioImage[]>(initialImages);
  const [isUploading, setIsUploading] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    // TODO: Supabase Storage 연동
    // 임시로 미리보기 URL 생성
    const newImages: StudioImage[] = Array.from(files).map((file, index) => ({
      id: `new-${Date.now()}-${index}`,
      url: URL.createObjectURL(file),
      alt: file.name,
      isMain: false,
      order: images.length + index,
    }));

    setImages((prev) => [...prev, ...newImages]);
    setIsUploading(false);
    e.target.value = '';
  };

  const handleDelete = (imageId: string) => {
    if (!confirm('이 이미지를 삭제하시겠습니까?')) return;
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const handleSetMain = (imageId: string) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isMain: img.id === imageId,
      }))
    );
  };

  const handleDragStart = (imageId: string) => {
    setDraggedItem(imageId);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = images.findIndex((img) => img.id === draggedItem);
    const targetIndex = images.findIndex((img) => img.id === targetId);

    const newImages = [...images];
    const [removed] = newImages.splice(draggedIndex, 1);
    newImages.splice(targetIndex, 0, removed);

    setImages(
      newImages.map((img, index) => ({
        ...img,
        order: index,
      }))
    );
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">사진 관리</h1>
          <p className="text-sm text-gray-500 mt-1">
            스튜디오 사진을 업로드하고 관리합니다
          </p>
        </div>
        <label className="flex items-center gap-2 px-4 py-2 bg-[#0152CC] text-white rounded-lg font-medium hover:bg-[#0141a3] cursor-pointer transition-colors">
          <Upload size={18} />
          사진 업로드
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Upload Zone */}
      <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-8">
        <label className="flex flex-col items-center cursor-pointer">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <ImageIcon size={32} className="text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-700 mb-1">
            이미지를 드래그하거나 클릭하여 업로드
          </p>
          <p className="text-xs text-gray-500">
            JPG, PNG, WEBP (최대 10MB, 최대 20장)
          </p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Images Grid */}
      {images.length > 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">
              등록된 사진 ({images.length}장)
            </h2>
            <p className="text-xs text-gray-500">
              드래그하여 순서를 변경하세요
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                draggable
                onDragStart={() => handleDragStart(image.id)}
                onDragOver={(e) => handleDragOver(e, image.id)}
                onDragEnd={handleDragEnd}
                className={cn(
                  'relative aspect-[4/3] rounded-lg overflow-hidden border-2 group cursor-move',
                  image.isMain ? 'border-[#0152CC]' : 'border-gray-200',
                  draggedItem === image.id && 'opacity-50'
                )}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />

                {/* Main Badge */}
                {image.isMain && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-[#0152CC] text-white text-xs font-medium rounded">
                    대표
                  </div>
                )}

                {/* Drag Handle */}
                <div className="absolute top-2 right-2 p-1 bg-white/80 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical size={16} className="text-gray-600" />
                </div>

                {/* Actions */}
                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-between">
                    {!image.isMain && (
                      <button
                        onClick={() => handleSetMain(image.id)}
                        className="flex items-center gap-1 px-2 py-1 bg-white/90 text-gray-700 text-xs font-medium rounded hover:bg-white"
                      >
                        <Star size={12} />
                        대표 설정
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 ml-auto"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Add More */}
            <label className="aspect-[4/3] rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-[#0152CC] hover:bg-blue-50 transition-colors">
              <Plus size={24} className="text-gray-400 mb-1" />
              <span className="text-xs text-gray-500">추가</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <ImageIcon size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">등록된 사진이 없습니다</p>
          <p className="text-sm text-gray-400 mt-1">
            스튜디오 사진을 업로드해주세요
          </p>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 rounded-xl p-4">
        <h3 className="font-medium text-blue-900 mb-2">사진 업로드 팁</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• 밝고 선명한 고화질 이미지를 사용하세요</li>
          <li>• 대표 이미지는 스튜디오 전체 분위기를 보여주는 사진이 좋습니다</li>
          <li>• 촬영 공간, 대기실, 장비 등 다양한 사진을 업로드하세요</li>
          <li>• 가로 비율(4:3 또는 16:9) 이미지를 권장합니다</li>
        </ul>
      </div>
    </div>
  );
}
