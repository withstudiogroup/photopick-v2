'use client';

import { useState } from 'react';
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Reservation {
  id: string;
  reservationNo: string;
  studioName: string;
  studioId: string;
  memberNo: string;
  memberName: string;
  productName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  amount: number;
  createdAt: string;
}

const initialReservations: Reservation[] = [
  {
    id: '1',
    reservationNo: 'R20240115001',
    studioName: '스튜디오 루미에르',
    studioId: 'S001',
    memberNo: 'U20230315001',
    memberName: '김**',
    productName: '증명사진 스탠다드',
    date: '2024-01-20',
    time: '14:00',
    status: 'confirmed',
    amount: 45000,
    createdAt: '2024-01-15 10:30',
  },
  {
    id: '2',
    reservationNo: 'R20240115002',
    studioName: '포토랩 강남',
    studioId: 'S002',
    memberNo: 'U20230620002',
    memberName: '이**',
    productName: '프로필 프리미엄',
    date: '2024-01-18',
    time: '11:00',
    status: 'pending',
    amount: 89000,
    createdAt: '2024-01-15 11:45',
  },
  {
    id: '3',
    reservationNo: 'R20240114001',
    studioName: '더스튜디오',
    studioId: 'S003',
    memberNo: 'U20230910003',
    memberName: '박**',
    productName: '가족사진 베이직',
    date: '2024-01-14',
    time: '15:00',
    status: 'completed',
    amount: 150000,
    createdAt: '2024-01-10 09:20',
  },
  {
    id: '4',
    reservationNo: 'R20240114002',
    studioName: '라이트룸 사진관',
    studioId: 'S004',
    memberNo: 'U20240110004',
    memberName: '정**',
    productName: '증명사진 프리미엄',
    date: '2024-01-16',
    time: '10:00',
    status: 'cancelled',
    amount: 55000,
    createdAt: '2024-01-14 16:00',
  },
  {
    id: '5',
    reservationNo: 'R20240113001',
    studioName: '스튜디오 루미에르',
    studioId: 'S001',
    memberNo: 'U20230315001',
    memberName: '김**',
    productName: '프로필 베이직',
    date: '2024-01-13',
    time: '16:00',
    status: 'completed',
    amount: 65000,
    createdAt: '2024-01-10 14:30',
  },
];

const statusConfig = {
  pending: { label: '대기', color: 'bg-yellow-500/20 text-yellow-400', icon: AlertCircle },
  confirmed: { label: '확정', color: 'bg-blue-500/20 text-blue-400', icon: CheckCircle },
  completed: { label: '완료', color: 'bg-green-500/20 text-green-400', icon: CheckCircle },
  cancelled: { label: '취소', color: 'bg-red-500/20 text-red-400', icon: XCircle },
};

export default function ReservationsPage() {
  const [reservations] = useState<Reservation[]>(initialReservations);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDate, setFilterDate] = useState('');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const filteredReservations = reservations.filter((r) => {
    const matchesSearch =
      r.reservationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.studioName.includes(searchTerm) ||
      r.memberNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
    const matchesDate = !filterDate || r.date === filterDate;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const stats = {
    total: reservations.length,
    pending: reservations.filter((r) => r.status === 'pending').length,
    confirmed: reservations.filter((r) => r.status === 'confirmed').length,
    completed: reservations.filter((r) => r.status === 'completed').length,
    cancelled: reservations.filter((r) => r.status === 'cancelled').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">전체 예약 관리</h1>
        <p className="text-sm text-gray-400 mt-1">
          플랫폼 전체 예약 현황을 조회하고 관리합니다
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <p className="text-sm text-gray-400">전체</p>
          <p className="text-xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <p className="text-sm text-yellow-400">대기</p>
          <p className="text-xl font-bold text-white">{stats.pending}</p>
        </div>
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <p className="text-sm text-blue-400">확정</p>
          <p className="text-xl font-bold text-white">{stats.confirmed}</p>
        </div>
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <p className="text-sm text-green-400">완료</p>
          <p className="text-xl font-bold text-white">{stats.completed}</p>
        </div>
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <p className="text-sm text-red-400">취소</p>
          <p className="text-xl font-bold text-white">{stats.cancelled}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="예약번호, 스튜디오명, 회원번호 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">모든 상태</option>
            <option value="pending">대기</option>
            <option value="confirmed">확정</option>
            <option value="completed">완료</option>
            <option value="cancelled">취소</option>
          </select>

          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Reservations Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  예약번호
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  스튜디오
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  회원번호
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  상품
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  예약일시
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  상태
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase">
                  금액
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase">
                  상세
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredReservations.map((reservation) => {
                const StatusIcon = statusConfig[reservation.status].icon;
                return (
                  <tr key={reservation.id} className="hover:bg-gray-700/50">
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm text-white">
                        {reservation.reservationNo}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white">
                      {reservation.studioName}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm text-gray-400">
                        {reservation.memberNo}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {reservation.productName}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar size={14} className="text-gray-400" />
                        <span className="text-white">{reservation.date}</span>
                        <Clock size={14} className="text-gray-400 ml-2" />
                        <span className="text-gray-400">{reservation.time}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded',
                          statusConfig[reservation.status].color
                        )}
                      >
                        <StatusIcon size={12} />
                        {statusConfig[reservation.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-white">
                      ₩{reservation.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => setSelectedReservation(reservation)}
                        className="p-1.5 text-purple-400 hover:bg-purple-500/20 rounded"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredReservations.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-400">조건에 맞는 예약이 없습니다</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedReservation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setSelectedReservation(null)}
          />
          <div className="relative bg-gray-800 rounded-xl w-full max-w-md p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">예약 상세</h2>
              <button
                onClick={() => setSelectedReservation(null)}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">예약번호</span>
                <span className="font-mono text-white">
                  {selectedReservation.reservationNo}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">스튜디오</span>
                <span className="text-white">{selectedReservation.studioName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">회원번호</span>
                <span className="font-mono text-white">
                  {selectedReservation.memberNo}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">상품</span>
                <span className="text-white">{selectedReservation.productName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">예약일시</span>
                <span className="text-white">
                  {selectedReservation.date} {selectedReservation.time}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">상태</span>
                <span
                  className={cn(
                    'px-2 py-1 text-xs font-medium rounded',
                    statusConfig[selectedReservation.status].color
                  )}
                >
                  {statusConfig[selectedReservation.status].label}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">결제금액</span>
                <span className="text-purple-400 font-bold">
                  ₩{selectedReservation.amount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-400">예약생성</span>
                <span className="text-gray-300">{selectedReservation.createdAt}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
