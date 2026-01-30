'use client';

import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onReserve: (product: Product) => void;
}

export default function ProductCard({ product, onReserve }: ProductCardProps) {
  const discountedPrice = product.discountRate > 0
    ? Math.floor(product.basePrice * (1 - product.discountRate / 100))
    : product.basePrice;

  return (
    <div className="bg-white border-b border-gray-100 last:border-b-0">
      <div className="flex p-4 gap-3">
        <div className="relative w-[100px] h-[100px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
          {product.images.length > 1 && (
            <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/50 rounded text-white text-[10px]">
              1/{product.images.length}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-gray-900 text-[15px]">
              {product.name}
            </h3>
            <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
          </div>

          <p className="text-xs text-gray-500 mt-1">
            {product.includes.slice(0, 3).join(', ')}
          </p>

          <p className="text-xs text-gray-400 mt-0.5">
            촬영 {product.duration}분 · 최대 {product.maxPersons}인
          </p>

          {product.availableSlots && product.availableSlots < 5 && (
            <p className="text-xs text-red-500 mt-1">
              남은자리 {product.availableSlots}개
            </p>
          )}

          <div className="flex items-end justify-between mt-auto pt-2">
            <div>
              {product.discountRate > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-red-500 font-bold text-xs">
                    {product.discountRate}%
                  </span>
                  <span className="text-gray-400 line-through text-xs">
                    {formatPrice(product.basePrice)}원
                  </span>
                </div>
              )}
              <p className="text-base font-bold text-gray-900">
                {formatPrice(discountedPrice)}원
              </p>
            </div>

            <button
              onClick={() => onReserve(product)}
              className="px-4 py-2 bg-[#0152CC] text-white text-sm font-medium rounded-lg"
            >
              예약
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
