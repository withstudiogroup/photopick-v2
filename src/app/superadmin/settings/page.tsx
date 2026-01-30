'use client';

import { useState } from 'react';
import {
  Save,
  Globe,
  Bell,
  Shield,
  CreditCard,
  Percent,
  Mail,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SuperAdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'commission' | 'notification' | 'security'>('general');
  const [isSaving, setIsSaving] = useState(false);

  const [settings, setSettings] = useState({
    siteName: 'PhotoPick',
    siteDescription: '사진 스튜디오 예약 플랫폼',
    supportEmail: 'support@photopick.com',
    supportPhone: '1588-1234',
    commissionRate: 3.5,
    minWithdrawal: 10000,
    settlementDay: 'monday',
    newStudioNotification: true,
    newReservationNotification: true,
    reviewNotification: true,
    reportNotification: true,
    adminEmail: 'admin@photopick.com',
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('설정이 저장되었습니다.');
  };

  const tabs = [
    { id: 'general', label: '일반', icon: Globe },
    { id: 'commission', label: '수수료/정산', icon: Percent },
    { id: 'notification', label: '알림', icon: Bell },
    { id: 'security', label: '보안', icon: Shield },
  ] as const;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">설정</h1>
          <p className="text-sm text-gray-400 mt-1">
            플랫폼 전체 설정을 관리합니다
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 transition-colors"
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
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            )}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'general' && (
          <>
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <h2 className="font-bold text-white mb-4">사이트 정보</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    사이트명
                  </label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) =>
                      setSettings({ ...settings, siteName: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    사이트 설명
                  </label>
                  <input
                    type="text"
                    value={settings.siteDescription}
                    onChange={(e) =>
                      setSettings({ ...settings, siteDescription: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <h2 className="font-bold text-white mb-4">고객센터</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    고객센터 이메일
                  </label>
                  <input
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) =>
                      setSettings({ ...settings, supportEmail: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    고객센터 전화번호
                  </label>
                  <input
                    type="tel"
                    value={settings.supportPhone}
                    onChange={(e) =>
                      setSettings({ ...settings, supportPhone: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'commission' && (
          <>
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <h2 className="font-bold text-white mb-4">수수료 설정</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    기본 수수료율 (%)
                  </label>
                  <input
                    type="number"
                    value={settings.commissionRate}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        commissionRate: parseFloat(e.target.value) || 0,
                      })
                    }
                    step="0.1"
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    스튜디오 매출에서 공제되는 플랫폼 수수료율
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <h2 className="font-bold text-white mb-4">정산 설정</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    최소 출금 금액 (원)
                  </label>
                  <input
                    type="number"
                    value={settings.minWithdrawal}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        minWithdrawal: parseInt(e.target.value) || 0,
                      })
                    }
                    step="1000"
                    min="0"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    정산 요일
                  </label>
                  <select
                    value={settings.settlementDay}
                    onChange={(e) =>
                      setSettings({ ...settings, settlementDay: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="monday">매주 월요일</option>
                    <option value="wednesday">매주 수요일</option>
                    <option value="friday">매주 금요일</option>
                    <option value="daily">매일</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-purple-900/30 border border-purple-700 rounded-xl p-4">
              <h3 className="font-medium text-purple-300 mb-2">등급별 수수료</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>기본 등급</span>
                  <span>{settings.commissionRate}%</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>프리미엄 등급</span>
                  <span>{(settings.commissionRate - 0.5).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>VIP 등급</span>
                  <span>{(settings.commissionRate - 1.0).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'notification' && (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h2 className="font-bold text-white mb-4">관리자 알림 설정</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  알림 수신 이메일
                </label>
                <input
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) =>
                    setSettings({ ...settings, adminEmail: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="border-t border-gray-700 pt-4 space-y-3">
                <label className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-white">새 스튜디오 등록</p>
                    <p className="text-sm text-gray-400">
                      새 스튜디오가 등록되면 알림
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.newStudioNotification}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        newStudioNotification: e.target.checked,
                      })
                    }
                    className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
                  />
                </label>

                <label className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-white">예약 현황</p>
                    <p className="text-sm text-gray-400">
                      일일 예약 현황 요약 알림
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.newReservationNotification}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        newReservationNotification: e.target.checked,
                      })
                    }
                    className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
                  />
                </label>

                <label className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-white">리뷰 알림</p>
                    <p className="text-sm text-gray-400">
                      낮은 평점(3점 이하) 리뷰 알림
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.reviewNotification}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        reviewNotification: e.target.checked,
                      })
                    }
                    className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
                  />
                </label>

                <label className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-white">신고 알림</p>
                    <p className="text-sm text-gray-400">
                      스튜디오/리뷰 신고 접수 알림
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.reportNotification}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        reportNotification: e.target.checked,
                      })
                    }
                    className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-purple-500"
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <>
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <h2 className="font-bold text-white mb-4">관리자 계정</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-700">
                  <div>
                    <p className="font-medium text-white">admin@photopick.com</p>
                    <p className="text-sm text-gray-400">최고 관리자</p>
                  </div>
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs font-medium rounded">
                    SuperAdmin
                  </span>
                </div>
                <button className="w-full py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors">
                  관리자 계정 추가
                </button>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <h2 className="font-bold text-white mb-4">보안 설정</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-white">2단계 인증</p>
                    <p className="text-sm text-gray-400">
                      관리자 로그인 시 추가 인증 필요
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
                    설정
                  </button>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-gray-700">
                  <div>
                    <p className="font-medium text-white">IP 제한</p>
                    <p className="text-sm text-gray-400">
                      특정 IP에서만 관리자 접근 허용
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-gray-700 text-white text-sm font-medium rounded-lg hover:bg-gray-600 transition-colors">
                    설정
                  </button>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-gray-700">
                  <div>
                    <p className="font-medium text-white">세션 만료 시간</p>
                    <p className="text-sm text-gray-400">
                      현재: 8시간
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-gray-700 text-white text-sm font-medium rounded-lg hover:bg-gray-600 transition-colors">
                    변경
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-red-900/20 border border-red-700 rounded-xl p-6">
              <h2 className="font-bold text-red-400 mb-4">위험 구역</h2>
              <div className="space-y-3">
                <button className="w-full py-2 bg-red-600/20 text-red-400 rounded-lg font-medium hover:bg-red-600/30 transition-colors">
                  모든 캐시 삭제
                </button>
                <button className="w-full py-2 bg-red-600/20 text-red-400 rounded-lg font-medium hover:bg-red-600/30 transition-colors">
                  시스템 재시작
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
