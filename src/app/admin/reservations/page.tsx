'use client';

import { useState } from 'react';
import {
  Search,
  Filter,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Phone,
  Mail,
  MoreVertical,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type ReservationStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'noshow';

interface Reservation {
  id: string;
  reservationNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  productName: string;
  date: string;
  time: string;
  status: ReservationStatus;
  price: number;
  memo?: string;
  createdAt: string;
}

// 임시 데이터
const reservations: Reservation[] = [
  {
    id: '1',
    reservationNumber: 'PP20240120-12345',
    customerName: '김민수',
    customerPhone: '010-1234-5678',
    customerEmail: 'kim@email.com',
    productName: '증명사진 베이직',
    date: '2024-01-20',
    time: '14:00',
    status: 'confirmed',
    price: 18000,
    memo: '밝은 분위기로 촬영 부탁드립니다',
    createdAt: '2024-01-18',
  },
  {
    id: '2',
    reservationNumber: 'PP20240120-12346',
    customerName: '이지영',
    customerPhone: '010-2345-6789',
    customerEmail: 'lee@email.com',
    productName: '프로필 프리미엄',
    date: '2024-01-20',
    time: '15:30',
    status: 'pending',
    price: 40000,
    createdAt: '2024-01-19',
  },
  {
    id: '3',
    reservationNumber: 'PP20240121-12347',
    customerName: '박서준',
    customerPhone: '010-3456-7890',
    customerEmail: 'park@email.com',
    productName: '증명사진 프리미엄',
    date: '2024-01-21',
    time: '10:00',
    status: 'confirmed',
    price: 40000,
    createdAt: '2024-01-19',
  },
  {
    id: '4',
    reservationNumber: 'PP20240119-12340',
    customerName: '정예린',
    customerPhone: '010-4567-8901',
    customerEmail: 'jung@email.com',
    productName: '증명사진 베이직',
    date: '2024-01-19',
    time: '11:00',
    status: 'completed',
    price: 18000,
    createdAt: '2024-01-17',
  },
  {
    id: '5',
    reservationNumber: 'PP20240118-12339',
    customerName: '최동욱',
    customerPhone: '010-5678-9012',
    customerEmail: 'choi@email.com',
    productName: '가족사진',
    date: '2024-01-18',
    time: '14:00',
    status: 'cancelled',
    price: 150000,
    createdAt: '2024-01-15',
  },
];

const statusConfig: Record<
  ReservationStatus,
  { label: string; color: string; bgColor: string }
> = {
  pending: { label: '대기', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  confirmed: { label: '확정', color: 'text-green-700', bgColor: 'bg-green-100' },
  completed: { label: '완료', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  cancelled: { label: '취소', color: 'text-red-700', bgColor: 'bg-red-100' },
  noshow: { label: '노쇼', color: 'text-gray-700', bgColor: 'bg-gray-100' },
};

const filterTabs = [
  { id: 'all', label: '전체' },
  { id: 'pending', label: '대기' },
  { id: 'confirmed', label: '확정' },
  { id: 'completed', label: '완료' },
  { id: 'cancelled', label: '취소' },
];

export default function ReservationsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  const filteredReservations = reservations.filter((r) => {
    if (activeTab !== 'all' && r.status !== activeTab) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        r.customerName.toLowerCase().includes(query) ||
        r.reservationNumber.toLowerCase().includes(query) ||
        r.customerPhone.includes(query)
      );
    }
    return true;
  });

  const handleStatusChange = (
    reservationId: string,
    newStatus: ReservationStatus
  ) => {
    // TODO: Supabase 연동
    console.log('Status change:', reservationId, newStatus);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">예약 관리</h1>
        <p className="text-sm text-gray-500 mt-1">
          고객 예약을 확인하고 관리합니다
        </p>
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
            placeholder="고객명, 예약번호, 전화번호 검색"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Calendar size={18} />
          날짜 선택
        </button>
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

      {/* Reservations List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  예약번호
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  고객정보
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  상품
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  예약일시
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  금액
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  상태
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-gray-900">
                      {reservation.reservationNumber}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {reservation.customerName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {reservation.customerPhone}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-700">
                      {reservation.productName}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm text-gray-900">
                        {reservation.date}
                      </p>
                      <p className="text-xs text-gray-500">
                        {reservation.time}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-gray-900">
                      {reservation.price.toLocaleString()}원
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        'inline-block px-2 py-1 rounded-full text-xs font-medium',
                        statusConfig[reservation.status].bgColor,
                        statusConfig[reservation.status].color
                      )}
                    >
                      {statusConfig[reservation.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {reservation.status === 'pending' && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusChange(reservation.id, 'confirmed')
                            }
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                            title="확정"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(reservation.id, 'cancelled')
                            }
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                            title="취소"
                          >
                            <X size={16} />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => setSelectedReservation(reservation)}
                        className="p-1.5 text-gray-600 hover:bg-gray-100 rounded"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-gray-100">
          {filteredReservations.map((reservation) => (
            <div
              key={reservation.id}
              className="p-4"
              onClick={() => setSelectedReservation(reservation)}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {reservation.customerName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {reservation.reservationNumber}
                  </p>
                </div>
                <span
                  className={cn(
                    'px-2 py-1 rounded-full text-xs font-medium',
                    statusConfig[reservation.status].bgColor,
                    statusConfig[reservation.status].color
                  )}
                >
                  {statusConfig[reservation.status].label}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-1">
                {reservation.productName}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {reservation.date} {reservation.time}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {reservation.price.toLocaleString()}원
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredReservations.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
            <p>예약이 없습니다</p>
          </div>
        )}
      </div>

      {/* Reservation Detail Modal */}
      {selectedReservation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedReservation(null)}
        >
          <div
            className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">예약 상세</h3>
              <button
                onClick={() => setSelectedReservation(null)}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    'px-3 py-1 rounded-full text-sm font-medium',
                    statusConfig[selectedReservation.status].bgColor,
                    statusConfig[selectedReservation.status].color
                  )}
                >
                  {statusConfig[selectedReservation.status].label}
                </span>
                <span className="text-sm text-gray-500">
                  {selectedReservation.reservationNumber}
                </span>
              </div>

              {/* Customer Info */}
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  고객 정보
                </h4>
                <p className="font-medium text-gray-900 mb-1">
                  {selectedReservation.customerName}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Phone size={14} />
                  <a href={`tel:${selectedReservation.customerPhone}`}>
                    {selectedReservation.customerPhone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={14} />
                  <a href={`mailto:${selectedReservation.customerEmail}`}>
                    {selectedReservation.customerEmail}
                  </a>
                </div>
              </div>

              {/* Reservation Info */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">상품</span>
                  <span className="text-gray-900">
                    {selectedReservation.productName}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">예약일시</span>
                  <span className="text-gray-900">
                    {selectedReservation.date} {selectedReservation.time}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">결제금액</span>
                  <span className="font-medium text-gray-900">
                    {selectedReservation.price.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">예약일</span>
                  <span className="text-gray-900">
                    {selectedReservation.createdAt}
                  </span>
                </div>
              </div>

              {/* Memo */}
              {selectedReservation.memo && (
                <div className="bg-yellow-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-yellow-800 mb-1">
                    고객 요청사항
                  </h4>
                  <p className="text-sm text-yellow-700">
                    {selectedReservation.memo}
                  </p>
                </div>
              )}

              {/* Actions */}
              {selectedReservation.status === 'pending' && (
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      handleStatusChange(selectedReservation.id, 'confirmed');
                      setSelectedReservation(null);
                    }}
                    className="flex-1 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
                  >
                    예약 확정
                  </button>
                  <button
                    onClick={() => {
                      handleStatusChange(selectedReservation.id, 'cancelled');
                      setSelectedReservation(null);
                    }}
                    className="flex-1 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
                  >
                    예약 취소
                  </button>
                </div>
              )}

              {selectedReservation.status === 'confirmed' && (
                <button
                  onClick={() => {
                    handleStatusChange(selectedReservation.id, 'completed');
                    setSelectedReservation(null);
                  }}
                  className="w-full py-2 bg-[#0152CC] text-white rounded-lg font-medium hover:bg-[#0141a3]"
                >
                  촬영 완료 처리
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
