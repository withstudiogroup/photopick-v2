'use client';

import {
  Calendar,
  DollarSign,
  Star,
  TrendingUp,
  Users,
  Eye,
  Clock,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

// 임시 데이터
const stats = {
  todayReservations: 5,
  monthlyRevenue: 2450000,
  totalReviews: 2341,
  averageRating: 4.8,
};

const recentReservations = [
  {
    id: '1',
    customerName: '김민수',
    productName: '증명사진 베이직',
    date: '2024-01-20',
    time: '14:00',
    status: 'confirmed',
    price: 18000,
  },
  {
    id: '2',
    customerName: '이지영',
    productName: '프로필 프리미엄',
    date: '2024-01-20',
    time: '15:30',
    status: 'pending',
    price: 40000,
  },
  {
    id: '3',
    customerName: '박서준',
    productName: '증명사진 프리미엄',
    date: '2024-01-21',
    time: '10:00',
    status: 'confirmed',
    price: 40000,
  },
];

const todaySchedule = [
  { time: '10:00', customerName: '정예린', productName: '증명사진 베이직', status: 'completed' },
  { time: '11:30', customerName: '최동욱', productName: '프로필 프리미엄', status: 'completed' },
  { time: '14:00', customerName: '김민수', productName: '증명사진 베이직', status: 'upcoming' },
  { time: '15:30', customerName: '이지영', productName: '프로필 프리미엄', status: 'upcoming' },
  { time: '17:00', customerName: '한소희', productName: '증명사진 베이직', status: 'upcoming' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
        <p className="text-sm text-gray-500 mt-1">오늘의 현황을 확인하세요</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Calendar className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">오늘 예약</p>
              <p className="text-xl font-bold text-gray-900">{stats.todayReservations}건</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <DollarSign className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">이번 달 매출</p>
              <p className="text-xl font-bold text-gray-900">
                {stats.monthlyRevenue.toLocaleString()}원
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <Star className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">평균 평점</p>
              <p className="text-xl font-bold text-gray-900">{stats.averageRating}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Users className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">총 리뷰</p>
              <p className="text-xl font-bold text-gray-900">
                {stats.totalReviews.toLocaleString()}개
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">오늘 일정</h2>
            <span className="text-sm text-gray-500">
              {new Date().toLocaleDateString('ko-KR', {
                month: 'long',
                day: 'numeric',
                weekday: 'short',
              })}
            </span>
          </div>
          <div className="divide-y divide-gray-100">
            {todaySchedule.map((item, index) => (
              <div key={index} className="px-4 py-3 flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    item.status === 'completed'
                      ? 'bg-gray-300'
                      : 'bg-blue-500'
                  }`}
                />
                <span className="text-sm font-medium text-gray-500 w-12">
                  {item.time}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {item.customerName}
                  </p>
                  <p className="text-xs text-gray-500">{item.productName}</p>
                </div>
                {item.status === 'completed' ? (
                  <CheckCircle size={16} className="text-green-500" />
                ) : (
                  <Clock size={16} className="text-blue-500" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reservations */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">최근 예약</h2>
            <Link
              href="/admin/reservations"
              className="text-sm text-[#0152CC] font-medium"
            >
              전체보기
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentReservations.map((reservation) => (
              <div key={reservation.id} className="px-4 py-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">
                    {reservation.customerName}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      reservation.status === 'confirmed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {reservation.status === 'confirmed' ? '확정' : '대기'}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{reservation.productName}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-400">
                    {reservation.date} {reservation.time}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {reservation.price.toLocaleString()}원
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h2 className="font-bold text-gray-900 mb-4">빠른 작업</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            href="/admin/reservations/new"
            className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-[#0152CC] hover:bg-blue-50 transition-colors"
          >
            <Calendar size={24} className="text-[#0152CC]" />
            <span className="text-sm font-medium text-gray-700">예약 등록</span>
          </Link>
          <Link
            href="/admin/products/new"
            className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-[#0152CC] hover:bg-blue-50 transition-colors"
          >
            <TrendingUp size={24} className="text-[#0152CC]" />
            <span className="text-sm font-medium text-gray-700">상품 추가</span>
          </Link>
          <Link
            href="/admin/images"
            className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-[#0152CC] hover:bg-blue-50 transition-colors"
          >
            <Eye size={24} className="text-[#0152CC]" />
            <span className="text-sm font-medium text-gray-700">사진 관리</span>
          </Link>
          <Link
            href="/admin/studio"
            className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-[#0152CC] hover:bg-blue-50 transition-colors"
          >
            <Users size={24} className="text-[#0152CC]" />
            <span className="text-sm font-medium text-gray-700">정보 수정</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
