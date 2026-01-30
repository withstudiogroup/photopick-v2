'use client';

import { useState } from 'react';
import { Save, MapPin, Phone, Mail, Clock, Car } from 'lucide-react';

// 임시 데이터
const initialData = {
  name: '스튜디오 루미에르',
  description:
    '스튜디오 루미에르는 자연광을 활용한 프리미엄 촬영 스튜디오입니다. 10년 이상의 경력을 가진 전문 포토그래퍼가 고객님의 가장 아름다운 순간을 담아드립니다.',
  shortDescription: '자연광 프리미엄 스튜디오',
  phone: '02-1234-5678',
  email: 'info@studio-lumiere.com',
  businessNumber: '123-45-67890',
  address: '서울특별시 강남구 테헤란로 123',
  addressDetail: '4층',
  nearestStation: '강남역 3번 출구 도보 3분',
  parkingInfo: '건물 내 주차장 이용 가능 (2시간 무료)',
  operatingHours: {
    mon: { open: '10:00', close: '20:00', closed: false },
    tue: { open: '10:00', close: '20:00', closed: false },
    wed: { open: '10:00', close: '20:00', closed: false },
    thu: { open: '10:00', close: '20:00', closed: false },
    fri: { open: '10:00', close: '20:00', closed: false },
    sat: { open: '10:00', close: '18:00', closed: false },
    sun: { open: '', close: '', closed: true },
  },
  facilities: ['natural-light', 'hair-makeup', 'costume-rental', 'parking', 'waiting-area'],
};

const facilityOptions = [
  { id: 'natural-light', label: '자연광' },
  { id: 'hair-makeup', label: '헤어메이크업' },
  { id: 'costume-rental', label: '의상대여' },
  { id: 'parking', label: '주차가능' },
  { id: 'waiting-area', label: '대기공간' },
  { id: 'wifi', label: '무선인터넷' },
  { id: 'air-conditioning', label: '에어컨' },
  { id: 'changing-room', label: '탈의실' },
  { id: 'props', label: '소품제공' },
  { id: 'instant-print', label: '즉석인화' },
];

const dayLabels: Record<string, string> = {
  mon: '월요일',
  tue: '화요일',
  wed: '수요일',
  thu: '목요일',
  fri: '금요일',
  sat: '토요일',
  sun: '일요일',
};

export default function StudioInfoPage() {
  const [data, setData] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // TODO: Supabase 연동
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('저장되었습니다.');
  };

  const toggleFacility = (facilityId: string) => {
    setData((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facilityId)
        ? prev.facilities.filter((f) => f !== facilityId)
        : [...prev.facilities, facilityId],
    }));
  };

  const updateOperatingHours = (
    day: string,
    field: 'open' | 'close' | 'closed',
    value: string | boolean
  ) => {
    setData((prev) => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day as keyof typeof prev.operatingHours],
          [field]: value,
        },
      },
    }));
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">스튜디오 정보</h1>
          <p className="text-sm text-gray-500 mt-1">
            스튜디오 기본 정보를 관리합니다
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-[#0152CC] text-white rounded-lg font-medium hover:bg-[#0141a3] disabled:opacity-50 transition-colors"
        >
          <Save size={18} />
          {isSaving ? '저장 중...' : '저장'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 기본 정보 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4">기본 정보</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                스튜디오명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                한줄 소개
              </label>
              <input
                type="text"
                value={data.shortDescription}
                onChange={(e) =>
                  setData({ ...data, shortDescription: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
                placeholder="스튜디오를 한 줄로 소개해주세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                상세 소개
              </label>
              <textarea
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent resize-none"
                placeholder="스튜디오에 대한 상세 설명을 입력해주세요"
              />
            </div>
          </div>
        </div>

        {/* 연락처 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4">연락처</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Phone size={14} className="inline mr-1" />
                전화번호 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Mail size={14} className="inline mr-1" />
                이메일
              </label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                사업자등록번호
              </label>
              <input
                type="text"
                value={data.businessNumber}
                onChange={(e) =>
                  setData({ ...data, businessNumber: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* 위치 정보 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4">
            <MapPin size={18} className="inline mr-1" />
            위치 정보
          </h2>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  주소 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={data.address}
                  onChange={(e) => setData({ ...data, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  상세주소
                </label>
                <input
                  type="text"
                  value={data.addressDetail}
                  onChange={(e) =>
                    setData({ ...data, addressDetail: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                가까운 역/정류장
              </label>
              <input
                type="text"
                value={data.nearestStation}
                onChange={(e) =>
                  setData({ ...data, nearestStation: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
                placeholder="예: 강남역 3번 출구 도보 3분"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Car size={14} className="inline mr-1" />
                주차 안내
              </label>
              <input
                type="text"
                value={data.parkingInfo}
                onChange={(e) =>
                  setData({ ...data, parkingInfo: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0152CC] focus:border-transparent"
                placeholder="주차 가능 여부 및 안내사항"
              />
            </div>
          </div>
        </div>

        {/* 운영 시간 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4">
            <Clock size={18} className="inline mr-1" />
            운영 시간
          </h2>
          <div className="space-y-3">
            {Object.entries(data.operatingHours).map(([day, hours]) => (
              <div
                key={day}
                className="flex items-center gap-4 py-2 border-b border-gray-100 last:border-0"
              >
                <span className="w-16 text-sm font-medium text-gray-700">
                  {dayLabels[day]}
                </span>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={hours.closed}
                    onChange={(e) =>
                      updateOperatingHours(day, 'closed', e.target.checked)
                    }
                    className="rounded border-gray-300 text-[#0152CC] focus:ring-[#0152CC]"
                  />
                  <span className="text-sm text-gray-600">휴무</span>
                </label>
                {!hours.closed && (
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={hours.open}
                      onChange={(e) =>
                        updateOperatingHours(day, 'open', e.target.value)
                      }
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <span className="text-gray-500">~</span>
                    <input
                      type="time"
                      value={hours.close}
                      onChange={(e) =>
                        updateOperatingHours(day, 'close', e.target.value)
                      }
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 시설/서비스 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-gray-900 mb-4">시설/서비스</h2>
          <div className="flex flex-wrap gap-2">
            {facilityOptions.map((facility) => (
              <button
                key={facility.id}
                type="button"
                onClick={() => toggleFacility(facility.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  data.facilities.includes(facility.id)
                    ? 'bg-[#0152CC] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {facility.label}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
