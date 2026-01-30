'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function PromoBanner() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/membership" className="block">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0152CC] to-[#4A90D9] p-6 lg:p-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative flex items-center justify-between">
              <div>
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-white text-sm font-medium mb-3">
                  가입하고 쿠폰 받으세요!
                </span>
                <h3 className="text-white text-xl lg:text-2xl font-bold mb-1">
                  신규회원 전용 혜택
                </h3>
                <p className="text-white/90 text-sm lg:text-base">
                  가입 즉시 20% 할인 쿠폰 증정
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-white rounded-full text-[#0152CC] font-semibold hover:bg-gray-50 transition-colors">
                로그인/가입하기
                <ArrowRight size={18} />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
