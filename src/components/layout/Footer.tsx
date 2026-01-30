'use client';

import Link from 'next/link';
import { Instagram, Youtube, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-4">PhotoPick</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-[#0152CC] transition-colors">
                  회사 소개
                </Link>
              </li>
              <li>
                <Link href="/partnership" className="text-sm text-gray-600 hover:text-[#0152CC] transition-colors">
                  제휴 문의
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-gray-600 hover:text-[#0152CC] transition-colors">
                  채용 안내
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">고객센터</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm text-gray-600 hover:text-[#0152CC] transition-colors">
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link href="/inquiry" className="text-sm text-gray-600 hover:text-[#0152CC] transition-colors">
                  1:1 문의
                </Link>
              </li>
              <li>
                <span className="text-sm text-gray-600">
                  고객센터: 1588-0000
                </span>
              </li>
              <li>
                <span className="text-xs text-gray-500">
                  평일 09:00 - 18:00
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">이용안내</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-[#0152CC] transition-colors">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-[#0152CC] transition-colors">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-sm text-gray-600 hover:text-[#0152CC] transition-colors">
                  취소/환불 정책
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-4">SNS</h3>
            <div className="flex gap-3">
              <Link
                href="https://instagram.com"
                target="_blank"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-[#0152CC] hover:text-white transition-all"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-[#0152CC] hover:text-white transition-all"
              >
                <Youtube size={20} />
              </Link>
              <Link
                href="https://pf.kakao.com"
                target="_blank"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-[#0152CC] hover:text-white transition-all"
              >
                <MessageCircle size={20} />
              </Link>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-sm text-gray-900 mb-2">앱 다운로드</h4>
              <div className="flex gap-2">
                <Link
                  href="#"
                  className="px-3 py-2 bg-gray-900 text-white text-xs rounded-lg hover:bg-gray-800 transition-colors"
                >
                  App Store
                </Link>
                <Link
                  href="#"
                  className="px-3 py-2 bg-gray-900 text-white text-xs rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Play Store
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-xs text-gray-500 space-y-1">
            <p>(주)포토픽 | 대표이사: 홍길동</p>
            <p>사업자등록번호: 123-45-67890 | 통신판매업신고: 제2024-서울강남-0001호</p>
            <p>서울특별시 강남구 테헤란로 123, 5층</p>
            <p className="pt-2">Copyright 2024 PhotoPick. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
