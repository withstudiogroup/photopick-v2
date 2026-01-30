'use client';

import { useState } from 'react';

interface BookerFormProps {
  onBookerChange: (booker: BookerInfo) => void;
}

export interface BookerInfo {
  name: string;
  phone: string;
  email: string;
  smsAgree: boolean;
  request?: string;
}

export default function BookerForm({ onBookerChange }: BookerFormProps) {
  const [booker, setBooker] = useState<BookerInfo>({
    name: '',
    phone: '',
    email: '',
    smsAgree: true,
    request: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    const updated = { ...booker, [name]: newValue };
    setBooker(updated);
    onBookerChange(updated);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      <h2 className="text-lg font-bold text-gray-900 mb-4">예약자 정보</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            이름 <span className="text-[#0152CC]">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={booker.name}
            onChange={handleChange}
            placeholder="예약자 이름"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0152CC] transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            연락처 <span className="text-[#0152CC]">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={booker.phone}
            onChange={handleChange}
            placeholder="010-0000-0000"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0152CC] transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            이메일 <span className="text-[#0152CC]">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={booker.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0152CC] transition-colors"
          />
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="smsAgree"
            checked={booker.smsAgree}
            onChange={handleChange}
            className="w-5 h-5 rounded border-gray-300 text-[#0152CC] focus:ring-[#0152CC]"
          />
          <span className="text-sm text-gray-600">예약 확인 SMS 수신 동의</span>
        </label>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          요청사항 (선택)
        </label>
        <textarea
          name="request"
          value={booker.request}
          onChange={handleChange}
          placeholder="예: 안경 착용 촬영 희망"
          rows={3}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#0152CC] transition-colors resize-none"
        />
      </div>
    </div>
  );
}
