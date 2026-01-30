'use client';

import { useState } from 'react';
import {
  Search,
  Phone,
  Mail,
  Calendar,
  Star,
  Heart,
  ShoppingCart,
  ChevronDown,
  MoreVertical,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalReservations: number;
  completedReservations: number;
  totalSpent: number;
  lastVisit: string;
  hasWishlisted: boolean;
  inCart: boolean;
  averageRating?: number;
  reviewCount: number;
  registeredAt: string;
}

// 임시 데이터
const customers: Customer[] = [
  {
    id: '1',
    name: '김민수',
    email: 'kim@email.com',
    phone: '010-1234-5678',
    totalReservations: 5,
    completedReservations: 4,
    totalSpent: 180000,
    lastVisit: '2024-01-20',
    hasWishlisted: true,
    inCart: false,
    averageRating: 5,
    reviewCount: 3,
    registeredAt: '2023-06-15',
  },
  {
    id: '2',
    name: '이지영',
    email: 'lee@email.com',
    phone: '010-2345-6789',
    totalReservations: 2,
    completedReservations: 1,
    totalSpent: 58000,
    lastVisit: '2024-01-15',
    hasWishlisted: true,
    inCart: true,
    averageRating: 4,
    reviewCount: 1,
    registeredAt: '2023-11-20',
  },
  {
    id: '3',
    name: '박서준',
    email: 'park@email.com',
    phone: '010-3456-7890',
    totalReservations: 1,
    completedReservations: 0,
    totalSpent: 0,
    lastVisit: '-',
    hasWishlisted: false,
    inCart: true,
    reviewCount: 0,
    registeredAt: '2024-01-10',
  },
  {
    id: '4',
    name: '정예린',
    email: 'jung@email.com',
    phone: '010-4567-8901',
    totalReservations: 8,
    completedReservations: 8,
    totalSpent: 520000,
    lastVisit: '2024-01-19',
    hasWishlisted: true,
    inCart: false,
    averageRating: 5,
    reviewCount: 6,
    registeredAt: '2022-08-01',
  },
  {
    id: '5',
    name: '최동욱',
    email: 'choi@email.com',
    phone: '010-5678-9012',
    totalReservations: 3,
    completedReservations: 2,
    totalSpent: 96000,
    lastVisit: '2024-01-10',
    hasWishlisted: false,
    inCart: false,
    averageRating: 4.5,
    reviewCount: 2,
    registeredAt: '2023-09-05',
  },
];

const filterTabs = [
  { id: 'all', label: '전체 고객' },
  { id: 'wishlisted', label: '찜한 고객' },
  { id: 'in-cart', label: '장바구니' },
  { id: 'vip', label: 'VIP 고객' },
];

export default function CustomersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'spent' | 'visits'>('recent');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers
    .filter((c) => {
      if (activeTab === 'wishlisted') return c.hasWishlisted;
      if (activeTab === 'in-cart') return c.inCart;
      if (activeTab === 'vip') return c.totalSpent >= 300000;
      return true;
    })
    .filter((c) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        c.phone.includes(query)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'spent') return b.totalSpent - a.totalSpent;
      if (sortBy === 'visits') return b.completedReservations - a.completedReservations;
      return new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime();
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">고객 관리</h1>
        <p className="text-sm text-gray-500 mt-1">
          스튜디오를 이용한 고객 정보를 확인합니다
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <User className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">전체 고객</p>
              <p className="text-xl font-bold text-gray-900">{customers.length}명</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
              <Heart className="text-pink-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">찜한 고객</p>
              <p className="text-xl font-bold text-gray-900">
                {customers.filter((c) => c.hasWishlisted).length}명
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <ShoppingCart className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">장바구니</p>
              <p className="text-xl font-bold text-gray-900">
                {customers.filter((c) => c.inCart).length}명
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
              <p className="text-sm text-gray-500">VIP 고객</p>
              <p className="text-xl font-bold text-gray-900">
                {customers.filter((c) => c.totalSpent >= 300000).length}명
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="이름, 이메일, 전화번호 검색"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
          />
        </div>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
          >
            <option value="recent">최근 등록순</option>
            <option value="spent">결제금액순</option>
            <option value="visits">방문횟수순</option>
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
              activeTab === tab.id
                ? 'bg-[#0152CC] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Customers List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  고객정보
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  예약/방문
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  총 결제금액
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  리뷰
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  상태
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  마지막 방문
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedCustomer(customer)}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User size={20} className="text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {customer.name}
                          {customer.totalSpent >= 300000 && (
                            <span className="ml-1.5 px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded">
                              VIP
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500">{customer.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-900">
                      {customer.completedReservations}/{customer.totalReservations}회
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-gray-900">
                      {customer.totalSpent.toLocaleString()}원
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    {customer.reviewCount > 0 ? (
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-sm text-gray-900">
                          {customer.averageRating}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({customer.reviewCount})
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {customer.hasWishlisted && (
                        <Heart size={16} className="text-pink-500 fill-pink-500" />
                      )}
                      {customer.inCart && (
                        <ShoppingCart size={16} className="text-green-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-500">{customer.lastVisit}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-gray-100">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="p-4"
              onClick={() => setSelectedCustomer(customer)}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User size={20} className="text-gray-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {customer.name}
                    {customer.totalSpent >= 300000 && (
                      <span className="ml-1.5 px-1.5 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded">
                        VIP
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">{customer.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  {customer.hasWishlisted && (
                    <Heart size={16} className="text-pink-500 fill-pink-500" />
                  )}
                  {customer.inCart && (
                    <ShoppingCart size={16} className="text-green-500" />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  방문 {customer.completedReservations}회 · 결제{' '}
                  {customer.totalSpent.toLocaleString()}원
                </span>
                {customer.reviewCount > 0 && (
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span>{customer.averageRating}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            <User size={48} className="mx-auto mb-4 text-gray-300" />
            <p>고객이 없습니다</p>
          </div>
        )}
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-900">고객 상세</h3>
            </div>

            <div className="p-4 space-y-4">
              {/* Profile */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <User size={32} className="text-gray-500" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    {selectedCustomer.name}
                    {selectedCustomer.totalSpent >= 300000 && (
                      <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded">
                        VIP
                      </span>
                    )}
                  </h4>
                  <p className="text-sm text-gray-500">
                    가입일: {selectedCustomer.registeredAt}
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={14} className="text-gray-500" />
                  <a
                    href={`tel:${selectedCustomer.phone}`}
                    className="text-gray-700"
                  >
                    {selectedCustomer.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail size={14} className="text-gray-500" />
                  <a
                    href={`mailto:${selectedCustomer.email}`}
                    className="text-gray-700"
                  >
                    {selectedCustomer.email}
                  </a>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {selectedCustomer.completedReservations}
                  </p>
                  <p className="text-xs text-blue-600">방문 횟수</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {selectedCustomer.totalSpent.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600">총 결제금액</p>
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <h5 className="font-medium text-gray-700">상태</h5>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'flex items-center gap-1 px-2 py-1 rounded text-sm',
                      selectedCustomer.hasWishlisted
                        ? 'bg-pink-100 text-pink-700'
                        : 'bg-gray-100 text-gray-500'
                    )}
                  >
                    <Heart size={14} />
                    {selectedCustomer.hasWishlisted ? '찜함' : '찜 안함'}
                  </span>
                  <span
                    className={cn(
                      'flex items-center gap-1 px-2 py-1 rounded text-sm',
                      selectedCustomer.inCart
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    )}
                  >
                    <ShoppingCart size={14} />
                    {selectedCustomer.inCart ? '장바구니에 있음' : '장바구니 없음'}
                  </span>
                </div>
              </div>

              {/* Review */}
              {selectedCustomer.reviewCount > 0 && (
                <div className="space-y-2">
                  <h5 className="font-medium text-gray-700">리뷰</h5>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={cn(
                            star <= (selectedCustomer.averageRating || 0)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {selectedCustomer.averageRating}점 ({selectedCustomer.reviewCount}개 리뷰)
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-2">
                <p className="text-xs text-gray-400">
                  마지막 방문: {selectedCustomer.lastVisit}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
