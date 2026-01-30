'use client';

import {
  Store,
  Users,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  CreditCard,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// 임시 데이터
const stats = [
  {
    label: '총 스튜디오',
    value: '1,234',
    change: '+12%',
    trend: 'up',
    icon: Store,
    color: 'purple',
  },
  {
    label: '총 회원',
    value: '45,678',
    change: '+8%',
    trend: 'up',
    icon: Users,
    color: 'blue',
  },
  {
    label: '이번 달 예약',
    value: '8,901',
    change: '+23%',
    trend: 'up',
    icon: Calendar,
    color: 'green',
  },
  {
    label: '이번 달 매출',
    value: '₩2.3억',
    change: '+15%',
    trend: 'up',
    icon: CreditCard,
    color: 'yellow',
  },
];

const recentStudios = [
  { id: 1, name: '스튜디오 루미에르', grade: 'premium', status: '활성', joinDate: '2024-01-15' },
  { id: 2, name: '포토랩 강남', grade: 'basic', status: '심사중', joinDate: '2024-01-14' },
  { id: 3, name: '더스튜디오', grade: 'basic', status: '활성', joinDate: '2024-01-13' },
  { id: 4, name: '라이트룸 사진관', grade: 'premium', status: '활성', joinDate: '2024-01-12' },
  { id: 5, name: '모멘트 스튜디오', grade: 'basic', status: '비활성', joinDate: '2024-01-11' },
];

const topStudios = [
  { rank: 1, name: '스튜디오 루미에르', reservations: 456, revenue: '₩45,600,000' },
  { rank: 2, name: '라이트룸 사진관', reservations: 389, revenue: '₩38,900,000' },
  { rank: 3, name: '포토랩 강남', reservations: 312, revenue: '₩31,200,000' },
  { rank: 4, name: '더스튜디오', reservations: 287, revenue: '₩28,700,000' },
  { rank: 5, name: '모멘트 스튜디오', reservations: 234, revenue: '₩23,400,000' },
];

const gradeColors: Record<string, string> = {
  premium: 'bg-purple-100 text-purple-700',
  basic: 'bg-gray-100 text-gray-700',
};

const statusColors: Record<string, string> = {
  '활성': 'bg-green-100 text-green-700',
  '심사중': 'bg-yellow-100 text-yellow-700',
  '비활성': 'bg-red-100 text-red-700',
};

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">대시보드</h1>
        <p className="text-sm text-gray-400 mt-1">
          PhotoPick 플랫폼 전체 현황을 확인합니다
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-800 rounded-xl border border-gray-700 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center',
                  stat.color === 'purple' && 'bg-purple-500/20',
                  stat.color === 'blue' && 'bg-blue-500/20',
                  stat.color === 'green' && 'bg-green-500/20',
                  stat.color === 'yellow' && 'bg-yellow-500/20'
                )}
              >
                <stat.icon
                  size={20}
                  className={cn(
                    stat.color === 'purple' && 'text-purple-400',
                    stat.color === 'blue' && 'text-blue-400',
                    stat.color === 'green' && 'text-green-400',
                    stat.color === 'yellow' && 'text-yellow-400'
                  )}
                />
              </div>
              <div
                className={cn(
                  'flex items-center gap-1 text-xs font-medium',
                  stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                )}
              >
                {stat.trend === 'up' ? (
                  <ArrowUpRight size={14} />
                ) : (
                  <ArrowDownRight size={14} />
                )}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Studios */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white">최근 등록 스튜디오</h2>
            <button className="text-sm text-purple-400 hover:underline">
              전체보기
            </button>
          </div>
          <div className="space-y-3">
            {recentStudios.map((studio) => (
              <div
                key={studio.id}
                className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0"
              >
                <div>
                  <p className="font-medium text-white">{studio.name}</p>
                  <p className="text-xs text-gray-400">{studio.joinDate}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'px-2 py-0.5 text-xs font-medium rounded',
                      gradeColors[studio.grade]
                    )}
                  >
                    {studio.grade === 'premium' ? '프리미엄' : '기본'}
                  </span>
                  <span
                    className={cn(
                      'px-2 py-0.5 text-xs font-medium rounded',
                      statusColors[studio.status]
                    )}
                  >
                    {studio.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Studios */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white">이달의 TOP 스튜디오</h2>
            <button className="text-sm text-purple-400 hover:underline">
              전체보기
            </button>
          </div>
          <div className="space-y-3">
            {topStudios.map((studio) => (
              <div
                key={studio.rank}
                className="flex items-center gap-4 py-2 border-b border-gray-700 last:border-0"
              >
                <span
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                    studio.rank === 1 && 'bg-yellow-500 text-black',
                    studio.rank === 2 && 'bg-gray-400 text-black',
                    studio.rank === 3 && 'bg-orange-600 text-white',
                    studio.rank > 3 && 'bg-gray-700 text-gray-300'
                  )}
                >
                  {studio.rank}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-white">{studio.name}</p>
                  <p className="text-xs text-gray-400">
                    예약 {studio.reservations}건
                  </p>
                </div>
                <span className="text-sm font-medium text-purple-400">
                  {studio.revenue}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
        <h2 className="font-bold text-white mb-4">빠른 작업</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors">
            <Store size={24} className="text-purple-400" />
            <span className="text-sm text-white">스튜디오 심사</span>
            <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full">
              3
            </span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors">
            <Calendar size={24} className="text-blue-400" />
            <span className="text-sm text-white">이벤트 등록</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors">
            <Eye size={24} className="text-green-400" />
            <span className="text-sm text-white">배너 관리</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors">
            <TrendingUp size={24} className="text-yellow-400" />
            <span className="text-sm text-white">매출 리포트</span>
          </button>
        </div>
      </div>
    </div>
  );
}
