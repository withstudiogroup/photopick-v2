'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Search,
  Filter,
  Star,
  MapPin,
  Phone,
  Eye,
  Ban,
  Award,
  ChevronDown,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Studio {
  id: string;
  name: string;
  image: string;
  ownerName: string;
  phone: string;
  address: string;
  grade: 'basic' | 'premium' | 'vip';
  status: 'active' | 'pending' | 'suspended';
  rating: number;
  reviewCount: number;
  reservationCount: number;
  joinDate: string;
}

const initialStudios: Studio[] = [
  {
    id: '1',
    name: '스튜디오 루미에르',
    image: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?w=400',
    ownerName: '김민수',
    phone: '02-1234-5678',
    address: '서울시 강남구 테헤란로 123',
    grade: 'premium',
    status: 'active',
    rating: 4.8,
    reviewCount: 234,
    reservationCount: 1256,
    joinDate: '2023-03-15',
  },
  {
    id: '2',
    name: '포토랩 강남',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
    ownerName: '이영희',
    phone: '02-2345-6789',
    address: '서울시 강남구 역삼로 456',
    grade: 'basic',
    status: 'pending',
    rating: 0,
    reviewCount: 0,
    reservationCount: 0,
    joinDate: '2024-01-14',
  },
  {
    id: '3',
    name: '더스튜디오',
    image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=400',
    ownerName: '박철수',
    phone: '02-3456-7890',
    address: '서울시 마포구 홍대입구로 789',
    grade: 'basic',
    status: 'active',
    rating: 4.5,
    reviewCount: 156,
    reservationCount: 892,
    joinDate: '2023-06-20',
  },
  {
    id: '4',
    name: '라이트룸 사진관',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
    ownerName: '정수진',
    phone: '02-4567-8901',
    address: '서울시 서초구 서초대로 321',
    grade: 'vip',
    status: 'active',
    rating: 4.9,
    reviewCount: 412,
    reservationCount: 2341,
    joinDate: '2022-11-10',
  },
  {
    id: '5',
    name: '모멘트 스튜디오',
    image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=400',
    ownerName: '최지원',
    phone: '02-5678-9012',
    address: '서울시 송파구 올림픽로 654',
    grade: 'basic',
    status: 'suspended',
    rating: 3.2,
    reviewCount: 45,
    reservationCount: 234,
    joinDate: '2023-09-05',
  },
];

const gradeConfig = {
  basic: { label: '기본', color: 'bg-gray-500', textColor: 'text-gray-400' },
  premium: { label: '프리미엄', color: 'bg-purple-500', textColor: 'text-purple-400' },
  vip: { label: 'VIP', color: 'bg-yellow-500', textColor: 'text-yellow-400' },
};

const statusConfig = {
  active: { label: '활성', color: 'bg-green-500/20 text-green-400' },
  pending: { label: '심사중', color: 'bg-yellow-500/20 text-yellow-400' },
  suspended: { label: '정지', color: 'bg-red-500/20 text-red-400' },
};

export default function StudiosPage() {
  const [studios, setStudios] = useState<Studio[]>(initialStudios);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterGrade, setFilterGrade] = useState<string>('all');
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);

  const filteredStudios = studios.filter((studio) => {
    const matchesSearch =
      studio.name.includes(searchTerm) ||
      studio.ownerName.includes(searchTerm) ||
      studio.address.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || studio.status === filterStatus;
    const matchesGrade = filterGrade === 'all' || studio.grade === filterGrade;
    return matchesSearch && matchesStatus && matchesGrade;
  });

  const handleApprove = (id: string) => {
    setStudios((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'active' as const } : s))
    );
  };

  const handleSuspend = (id: string) => {
    if (!confirm('이 스튜디오를 정지하시겠습니까?')) return;
    setStudios((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'suspended' as const } : s))
    );
  };

  const handleChangeGrade = (id: string, grade: 'basic' | 'premium' | 'vip') => {
    setStudios((prev) =>
      prev.map((s) => (s.id === id ? { ...s, grade } : s))
    );
    setIsGradeModalOpen(false);
    setSelectedStudio(null);
  };

  const pendingCount = studios.filter((s) => s.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">스튜디오 관리</h1>
          <p className="text-sm text-gray-400 mt-1">
            등록된 스튜디오를 관리하고 등급을 설정합니다
          </p>
        </div>
        {pendingCount > 0 && (
          <div className="px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm font-medium">
            심사 대기 {pendingCount}건
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="스튜디오명, 대표자명, 주소 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">모든 상태</option>
            <option value="active">활성</option>
            <option value="pending">심사중</option>
            <option value="suspended">정지</option>
          </select>

          {/* Grade Filter */}
          <select
            value={filterGrade}
            onChange={(e) => setFilterGrade(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">모든 등급</option>
            <option value="basic">기본</option>
            <option value="premium">프리미엄</option>
            <option value="vip">VIP</option>
          </select>
        </div>
      </div>

      {/* Studios List */}
      <div className="space-y-4">
        {filteredStudios.map((studio) => (
          <div
            key={studio.id}
            className="bg-gray-800 rounded-xl border border-gray-700 p-4"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Image */}
              <div className="relative w-full sm:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={studio.image}
                  alt={studio.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-white">{studio.name}</h3>
                      <span
                        className={cn(
                          'px-2 py-0.5 text-xs font-medium rounded',
                          gradeConfig[studio.grade].color,
                          'text-white'
                        )}
                      >
                        {gradeConfig[studio.grade].label}
                      </span>
                      <span
                        className={cn(
                          'px-2 py-0.5 text-xs font-medium rounded',
                          statusConfig[studio.status].color
                        )}
                      >
                        {statusConfig[studio.status].label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">
                      대표: {studio.ownerName}
                    </p>
                  </div>
                  {studio.status === 'active' && (
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="font-medium text-white">
                        {studio.rating}
                      </span>
                      <span className="text-gray-400 text-sm">
                        ({studio.reviewCount})
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {studio.address}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone size={14} />
                    {studio.phone}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="text-gray-400">
                    가입일: {studio.joinDate}
                  </span>
                  {studio.status === 'active' && (
                    <span className="text-purple-400">
                      총 예약: {studio.reservationCount.toLocaleString()}건
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex sm:flex-col gap-2">
                {studio.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(studio.id)}
                      className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                    >
                      승인
                    </button>
                    <button
                      onClick={() => handleSuspend(studio.id)}
                      className="flex-1 sm:flex-none px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                    >
                      거절
                    </button>
                  </>
                )}
                {studio.status === 'active' && (
                  <>
                    <button
                      onClick={() => {
                        setSelectedStudio(studio);
                        setIsGradeModalOpen(true);
                      }}
                      className="flex items-center justify-center gap-1 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Award size={16} />
                      등급 변경
                    </button>
                    <button
                      onClick={() => handleSuspend(studio.id)}
                      className="flex items-center justify-center gap-1 px-4 py-2 bg-gray-700 text-red-400 text-sm font-medium rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <Ban size={16} />
                      정지
                    </button>
                  </>
                )}
                {studio.status === 'suspended' && (
                  <button
                    onClick={() => handleApprove(studio.id)}
                    className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    정지 해제
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredStudios.length === 0 && (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-12 text-center">
            <p className="text-gray-400">조건에 맞는 스튜디오가 없습니다</p>
          </div>
        )}
      </div>

      {/* Grade Modal */}
      {isGradeModalOpen && selectedStudio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => {
              setIsGradeModalOpen(false);
              setSelectedStudio(null);
            }}
          />
          <div className="relative bg-gray-800 rounded-xl w-full max-w-sm p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">등급 변경</h2>
              <button
                onClick={() => {
                  setIsGradeModalOpen(false);
                  setSelectedStudio(null);
                }}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              {selectedStudio.name}의 등급을 변경합니다
            </p>
            <div className="space-y-2">
              {(['basic', 'premium', 'vip'] as const).map((grade) => (
                <button
                  key={grade}
                  onClick={() => handleChangeGrade(selectedStudio.id, grade)}
                  className={cn(
                    'w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-colors',
                    selectedStudio.grade === grade
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-gray-600 hover:border-gray-500'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        'w-3 h-3 rounded-full',
                        gradeConfig[grade].color
                      )}
                    />
                    <span className="text-white font-medium">
                      {gradeConfig[grade].label}
                    </span>
                  </div>
                  {selectedStudio.grade === grade && (
                    <span className="text-xs text-purple-400">현재</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
