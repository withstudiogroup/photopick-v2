'use client';

import { ChevronLeft, ChevronRight, User, Calendar, Heart, Clock, Ticket, Gift, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MyPage() {
  const router = useRouter();

  const menuItems = [
    { icon: Calendar, label: '예약 내역', href: '/reservations', badge: '2' },
    { icon: Heart, label: '찜 목록', href: '/wishlist', badge: '5' },
    { icon: Clock, label: '최근 본 스튜디오', href: '/recent' },
    { icon: Ticket, label: '쿠폰함', href: '/coupons', badge: '3' },
    { icon: Gift, label: '포인트', href: '/points', value: '12,500P' },
  ];

  const settingItems = [
    { icon: Settings, label: '설정', href: '/settings' },
    { icon: HelpCircle, label: '고객센터', href: '/help' },
  ];

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
            <h1 className="flex-1 text-lg font-bold text-center mr-8">마이페이지</h1>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 mb-3">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#0152CC]/10 rounded-full flex items-center justify-center">
            <User size={32} className="text-[#0152CC]" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">홍길동 님</h2>
            <p className="text-sm text-gray-500">photopick@email.com</p>
          </div>
          <button className="px-4 py-2 border border-[#0152CC] text-[#0152CC] rounded-lg text-sm font-medium hover:bg-[#F0F7FF] transition-colors">
            프로필 수정
          </button>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-[#F0F7FF] rounded-xl">
            <p className="text-2xl font-bold text-[#0152CC]">12</p>
            <p className="text-xs text-gray-600">촬영 완료</p>
          </div>
          <div className="text-center p-3 bg-[#F0F7FF] rounded-xl">
            <p className="text-2xl font-bold text-[#0152CC]">2</p>
            <p className="text-xs text-gray-600">예약 중</p>
          </div>
          <div className="text-center p-3 bg-[#F0F7FF] rounded-xl">
            <p className="text-2xl font-bold text-[#0152CC]">8</p>
            <p className="text-xs text-gray-600">리뷰 작성</p>
          </div>
        </div>
      </div>

      <div className="bg-white mb-3">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors ${
                index < menuItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className="text-gray-500" />
                <span className="text-gray-900">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="px-2 py-0.5 bg-[#F87171] text-white text-xs font-medium rounded-full">
                    {item.badge}
                  </span>
                )}
                {item.value && (
                  <span className="text-[#0152CC] font-semibold">{item.value}</span>
                )}
                <ChevronRight size={18} className="text-gray-400" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="bg-white">
        {settingItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors ${
                index < settingItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className="text-gray-500" />
                <span className="text-gray-900">{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </Link>
          );
        })}
        <button className="w-full flex items-center gap-3 px-6 py-4 text-gray-500 hover:bg-gray-50 transition-colors border-t border-gray-100">
          <LogOut size={20} />
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
}
