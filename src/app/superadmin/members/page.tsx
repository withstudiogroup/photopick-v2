'use client';

import { useState } from 'react';
import {
  Search,
  User,
  Crown,
  CheckCircle,
  Ban,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Member {
  id: string;
  memberNo: string;
  name: string;
  role: 'user' | 'admin';
  status: 'active' | 'suspended';
  joinDate: string;
  lastLogin: string;
  reservationCount: number;
  isVip: boolean;
}

const initialMembers: Member[] = [
  {
    id: '1',
    memberNo: 'U20230315001',
    name: '김**',
    role: 'user',
    status: 'active',
    joinDate: '2023-03-15',
    lastLogin: '2024-01-15',
    reservationCount: 12,
    isVip: true,
  },
  {
    id: '2',
    memberNo: 'U20230620002',
    name: '이**',
    role: 'user',
    status: 'active',
    joinDate: '2023-06-20',
    lastLogin: '2024-01-14',
    reservationCount: 5,
    isVip: false,
  },
  {
    id: '3',
    memberNo: 'U20230910003',
    name: '박**',
    role: 'user',
    status: 'suspended',
    joinDate: '2023-09-10',
    lastLogin: '2023-12-20',
    reservationCount: 2,
    isVip: false,
  },
  {
    id: '4',
    memberNo: 'A20221105001',
    name: '최**',
    role: 'admin',
    status: 'active',
    joinDate: '2022-11-05',
    lastLogin: '2024-01-15',
    reservationCount: 0,
    isVip: false,
  },
  {
    id: '5',
    memberNo: 'U20240110004',
    name: '정**',
    role: 'user',
    status: 'active',
    joinDate: '2024-01-10',
    lastLogin: '2024-01-15',
    reservationCount: 1,
    isVip: false,
  },
];

const roleConfig = {
  user: { label: '일반', color: 'bg-gray-500' },
  admin: { label: '스튜디오', color: 'bg-blue-500' },
};

const statusConfig = {
  active: { label: '활성', color: 'bg-green-500/20 text-green-400' },
  suspended: { label: '정지', color: 'bg-red-500/20 text-red-400' },
};

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'reservations'>('recent');

  const filteredMembers = members
    .filter((member) => {
      const matchesSearch =
        member.memberNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.name.includes(searchTerm);
      const matchesRole = filterRole === 'all' || member.role === filterRole;
      const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'reservations') return b.reservationCount - a.reservationCount;
      return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
    });

  const handleToggleStatus = (id: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: m.status === 'active' ? 'suspended' : 'active' }
          : m
      )
    );
  };

  const handleToggleVip = (id: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isVip: !m.isVip } : m))
    );
  };

  const stats = {
    total: members.length,
    active: members.filter((m) => m.status === 'active').length,
    vip: members.filter((m) => m.isVip).length,
    studios: members.filter((m) => m.role === 'admin').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">회원 관리</h1>
        <p className="text-sm text-gray-400 mt-1">
          회원번호로 회원을 조회하고 관리합니다
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <p className="text-sm text-gray-400">전체 회원</p>
          <p className="text-xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <p className="text-sm text-gray-400">활성 회원</p>
          <p className="text-xl font-bold text-white">{stats.active}</p>
        </div>
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <p className="text-sm text-gray-400">VIP 회원</p>
          <p className="text-xl font-bold text-white">{stats.vip}</p>
        </div>
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <p className="text-sm text-gray-400">스튜디오</p>
          <p className="text-xl font-bold text-white">{stats.studios}</p>
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
              placeholder="회원번호 검색 (예: U20230315001)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">모든 유형</option>
            <option value="user">일반 회원</option>
            <option value="admin">스튜디오</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">모든 상태</option>
            <option value="active">활성</option>
            <option value="suspended">정지</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
          >
            <option value="recent">최근 가입순</option>
            <option value="reservations">예약횟수순</option>
          </select>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  회원번호
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  이름
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  유형
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  상태
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  예약
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  가입일
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-700/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-white">
                        {member.memberNo}
                      </span>
                      {member.isVip && (
                        <Crown size={14} className="text-yellow-400" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white">{member.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        'px-2 py-1 text-xs font-medium rounded text-white',
                        roleConfig[member.role].color
                      )}
                    >
                      {roleConfig[member.role].label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        'px-2 py-1 text-xs font-medium rounded',
                        statusConfig[member.status].color
                      )}
                    >
                      {statusConfig[member.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {member.reservationCount}회
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">
                    {member.joinDate}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleVip(member.id)}
                        className={cn(
                          'p-1.5 rounded',
                          member.isVip
                            ? 'text-yellow-400 bg-yellow-500/20'
                            : 'text-gray-400 hover:bg-gray-600'
                        )}
                        title={member.isVip ? 'VIP 해제' : 'VIP 지정'}
                      >
                        <Crown size={16} />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(member.id)}
                        className={cn(
                          'p-1.5 rounded',
                          member.status === 'suspended'
                            ? 'text-green-400 hover:bg-green-500/20'
                            : 'text-red-400 hover:bg-red-500/20'
                        )}
                        title={member.status === 'suspended' ? '정지 해제' : '정지'}
                      >
                        {member.status === 'suspended' ? (
                          <CheckCircle size={16} />
                        ) : (
                          <Ban size={16} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMembers.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-400">조건에 맞는 회원이 없습니다</p>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="bg-purple-900/20 border border-purple-700 rounded-xl p-4">
        <p className="text-sm text-purple-300">
          개인정보 보호를 위해 회원 상세 정보(이메일, 연락처 등)는 회원번호로 별도 조회해야 합니다.
        </p>
      </div>
    </div>
  );
}
