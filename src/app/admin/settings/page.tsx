'use client';

import { useState } from 'react';
import {
  Bell,
  Shield,
  CreditCard,
  User,
  Lock,
  Mail,
  Phone,
  Save,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationSettings {
  newReservation: boolean;
  reservationReminder: boolean;
  newReview: boolean;
  marketing: boolean;
  email: boolean;
  sms: boolean;
  push: boolean;
}

interface AccountInfo {
  email: string;
  phone: string;
  name: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'notifications' | 'account' | 'payment' | 'security'>('notifications');
  const [notifications, setNotifications] = useState<NotificationSettings>({
    newReservation: true,
    reservationReminder: true,
    newReview: true,
    marketing: false,
    email: true,
    sms: true,
    push: true,
  });
  const [account, setAccount] = useState<AccountInfo>({
    email: 'studio@lumiere.com',
    phone: '02-1234-5678',
    name: '스튜디오 루미에르',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Supabase 연동
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('설정이 저장되었습니다.');
  };

  const tabs = [
    { id: 'notifications', label: '알림 설정', icon: Bell },
    { id: 'account', label: '계정 정보', icon: User },
    { id: 'payment', label: '정산 정보', icon: CreditCard },
    { id: 'security', label: '보안', icon: Shield },
  ] as const;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">설정</h1>
          <p className="text-sm text-gray-500 mt-1">
            알림, 계정, 결제 설정을 관리합니다
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-[#0152CC] text-white rounded-lg font-medium hover:bg-[#0141a3] disabled:opacity-50 transition-colors"
        >
          <Save size={18} />
          {isSaving ? '저장 중...' : '저장'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
              activeTab === tab.id
                ? 'bg-[#0152CC] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'notifications' && (
          <>
            {/* Notification Types */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4">알림 유형</h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-gray-900">새 예약 알림</p>
                    <p className="text-sm text-gray-500">
                      새로운 예약이 들어오면 알림을 받습니다
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.newReservation}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        newReservation: e.target.checked,
                      })
                    }
                    className="w-5 h-5 rounded border-gray-300 text-[#0152CC] focus:ring-[#0152CC]"
                  />
                </label>

                <label className="flex items-center justify-between py-2 border-t border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">예약 리마인더</p>
                    <p className="text-sm text-gray-500">
                      예약 1시간 전에 알림을 받습니다
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.reservationReminder}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        reservationReminder: e.target.checked,
                      })
                    }
                    className="w-5 h-5 rounded border-gray-300 text-[#0152CC] focus:ring-[#0152CC]"
                  />
                </label>

                <label className="flex items-center justify-between py-2 border-t border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">새 리뷰 알림</p>
                    <p className="text-sm text-gray-500">
                      고객이 리뷰를 작성하면 알림을 받습니다
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.newReview}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        newReview: e.target.checked,
                      })
                    }
                    className="w-5 h-5 rounded border-gray-300 text-[#0152CC] focus:ring-[#0152CC]"
                  />
                </label>

                <label className="flex items-center justify-between py-2 border-t border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">마케팅 알림</p>
                    <p className="text-sm text-gray-500">
                      프로모션 및 이벤트 정보를 받습니다
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.marketing}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        marketing: e.target.checked,
                      })
                    }
                    className="w-5 h-5 rounded border-gray-300 text-[#0152CC] focus:ring-[#0152CC]"
                  />
                </label>
              </div>
            </div>

            {/* Notification Channels */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4">알림 수신 방법</h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Mail size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">이메일</p>
                      <p className="text-sm text-gray-500">{account.email}</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        email: e.target.checked,
                      })
                    }
                    className="w-5 h-5 rounded border-gray-300 text-[#0152CC] focus:ring-[#0152CC]"
                  />
                </label>

                <label className="flex items-center justify-between py-2 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Phone size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">SMS</p>
                      <p className="text-sm text-gray-500">{account.phone}</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.sms}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        sms: e.target.checked,
                      })
                    }
                    className="w-5 h-5 rounded border-gray-300 text-[#0152CC] focus:ring-[#0152CC]"
                  />
                </label>

                <label className="flex items-center justify-between py-2 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Bell size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">푸시 알림</p>
                      <p className="text-sm text-gray-500">앱 푸시 알림</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.push}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        push: e.target.checked,
                      })
                    }
                    className="w-5 h-5 rounded border-gray-300 text-[#0152CC] focus:ring-[#0152CC]"
                  />
                </label>
              </div>
            </div>
          </>
        )}

        {activeTab === 'account' && (
          <>
            {/* Profile Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4">기본 정보</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    업체명
                  </label>
                  <input
                    type="text"
                    value={account.name}
                    onChange={(e) =>
                      setAccount({ ...account, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이메일
                  </label>
                  <input
                    type="email"
                    value={account.email}
                    onChange={(e) =>
                      setAccount({ ...account, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    연락처
                  </label>
                  <input
                    type="tel"
                    value={account.phone}
                    onChange={(e) =>
                      setAccount({ ...account, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-xl border border-red-200 p-6">
              <h2 className="font-bold text-red-600 mb-4">위험 구역</h2>
              <div className="space-y-4">
                <button className="flex items-center justify-between w-full py-3 text-left hover:bg-red-50 rounded-lg px-3 -mx-3 transition-colors">
                  <div>
                    <p className="font-medium text-gray-900">계정 비활성화</p>
                    <p className="text-sm text-gray-500">
                      계정을 일시적으로 비활성화합니다
                    </p>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>

                <button className="flex items-center justify-between w-full py-3 text-left hover:bg-red-50 rounded-lg px-3 -mx-3 transition-colors">
                  <div>
                    <p className="font-medium text-red-600">계정 삭제</p>
                    <p className="text-sm text-gray-500">
                      계정과 모든 데이터를 영구 삭제합니다
                    </p>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'payment' && (
          <>
            {/* Bank Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4">정산 계좌</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    은행
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent">
                    <option>신한은행</option>
                    <option>국민은행</option>
                    <option>우리은행</option>
                    <option>하나은행</option>
                    <option>농협</option>
                    <option>기업은행</option>
                    <option>카카오뱅크</option>
                    <option>토스뱅크</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    계좌번호
                  </label>
                  <input
                    type="text"
                    placeholder="'-' 없이 입력"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    예금주
                  </label>
                  <input
                    type="text"
                    placeholder="예금주명"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Settlement Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4">정산 정보</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">정산 주기</span>
                  <span className="font-medium text-gray-900">주 1회 (매주 월요일)</span>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                  <span className="text-gray-600">수수료율</span>
                  <span className="font-medium text-gray-900">3.5%</span>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                  <span className="text-gray-600">이번 달 예상 정산</span>
                  <span className="font-medium text-[#0152CC]">₩2,450,000</span>
                </div>
              </div>
            </div>

            {/* Settlement History Link */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <button className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <CreditCard size={20} className="text-gray-600" />
                  </div>
                  <span className="font-medium text-gray-900">정산 내역 보기</span>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            </div>
          </>
        )}

        {activeTab === 'security' && (
          <>
            {/* Password */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4">비밀번호 변경</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    현재 비밀번호
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    새 비밀번호
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    8자 이상, 영문/숫자/특수문자 조합
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    새 비밀번호 확인
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
                  />
                </div>

                <button className="w-full py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                  비밀번호 변경
                </button>
              </div>
            </div>

            {/* Two-Factor Auth */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900">2단계 인증</h2>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                  비활성화
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                계정 보안을 강화하려면 2단계 인증을 활성화하세요. 로그인 시 추가 인증 코드가 필요합니다.
              </p>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Shield size={18} />
                2단계 인증 설정
              </button>
            </div>

            {/* Login History */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4">로그인 기록</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-gray-900">Chrome / Windows</p>
                    <p className="text-sm text-gray-500">서울, 대한민국 · 현재 세션</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                    활성
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Safari / iOS</p>
                    <p className="text-sm text-gray-500">서울, 대한민국 · 2일 전</p>
                  </div>
                  <button className="text-sm text-red-600 font-medium hover:underline">
                    로그아웃
                  </button>
                </div>
              </div>
            </div>

            {/* Logout All */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <button className="flex items-center justify-between w-full text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <LogOut size={20} className="text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">모든 기기에서 로그아웃</p>
                    <p className="text-sm text-gray-500">현재 기기를 포함한 모든 세션을 종료합니다</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
