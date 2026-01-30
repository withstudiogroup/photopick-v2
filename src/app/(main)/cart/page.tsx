'use client';

import { ChevronLeft, Trash2, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { studios } from '@/data/mock';
import { formatPrice } from '@/lib/utils';

const cartItems = [
  {
    id: '1',
    studio: studios[0],
    product: studios[0].products[1],
    quantity: 1,
    selectedDate: '2026-01-25',
    selectedTime: '14:00',
  },
  {
    id: '2',
    studio: studios[2],
    product: studios[2].products[0],
    quantity: 1,
    selectedDate: '2026-02-01',
    selectedTime: '11:00',
  },
];

export default function CartPage() {
  const router = useRouter();

  const totalPrice = cartItems.reduce((sum, item) => {
    const discountedPrice = item.product.discountRate > 0
      ? Math.floor(item.product.basePrice * (1 - item.product.discountRate / 100))
      : item.product.basePrice;
    return sum + discountedPrice * item.quantity;
  }, 0);

  const totalDiscount = cartItems.reduce((sum, item) => {
    return sum + (item.product.discountRate > 0
      ? Math.floor(item.product.basePrice * (item.product.discountRate / 100))
      : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-40">
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14">
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="flex-1 text-lg font-bold text-center mr-8">장바구니</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {cartItems.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded border-gray-300 text-[#0152CC] focus:ring-[#0152CC]"
                />
                <span className="text-sm text-gray-700">전체 선택 ({cartItems.length})</span>
              </label>
              <button className="text-sm text-gray-500 hover:text-gray-700">
                선택 삭제
              </button>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => {
                const discountedPrice = item.product.discountRate > 0
                  ? Math.floor(item.product.basePrice * (1 - item.product.discountRate / 100))
                  : item.product.basePrice;

                return (
                  <div key={item.id} className="bg-white rounded-2xl border border-gray-200 p-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="mt-1 w-5 h-5 rounded border-gray-300 text-[#0152CC] focus:ring-[#0152CC]"
                      />

                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs text-gray-500">{item.studio.name}</p>
                            <h3 className="font-bold text-gray-900 mt-0.5">{item.product.name}</h3>
                          </div>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <div className="mt-2 text-sm text-gray-600">
                          <p>{item.selectedDate} {item.selectedTime}</p>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div>
                            {item.product.discountRate > 0 && (
                              <span className="text-sm text-gray-400 line-through mr-2">
                                {formatPrice(item.product.basePrice)}원
                              </span>
                            )}
                            <span className="font-bold text-gray-900">
                              {formatPrice(discountedPrice)}원
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 z-30">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-600">총 상품금액</span>
                  <span className="text-gray-900">{formatPrice(totalPrice + totalDiscount)}원</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-600">할인금액</span>
                  <span className="text-[#0152CC]">-{formatPrice(totalDiscount)}원</span>
                </div>
                <div className="flex items-center justify-between mb-4 pt-3 border-t border-gray-100">
                  <span className="font-bold text-gray-900">결제 예정금액</span>
                  <span className="text-xl font-bold text-[#0152CC]">{formatPrice(totalPrice)}원</span>
                </div>
                <Link
                  href="/booking"
                  className="block w-full py-4 bg-[#0152CC] text-white text-center font-bold rounded-xl hover:bg-[#0141A3] transition-colors"
                >
                  {cartItems.length}개 상품 예약하기
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingCart size={40} className="text-gray-300" />
            </div>
            <p className="text-gray-500 mb-4">장바구니가 비어있습니다</p>
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
