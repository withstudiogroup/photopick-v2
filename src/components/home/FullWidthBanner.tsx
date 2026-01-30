'use client';

import Link from 'next/link';

interface FullWidthBannerProps {
  title: string;
  subtitle: string;
  backgroundColor?: string;
  link?: string;
}

export default function FullWidthBanner({
  title,
  subtitle,
  backgroundColor = 'bg-gradient-to-r from-[#0152CC] to-[#4A90D9]',
  link = '/event',
}: FullWidthBannerProps) {
  return (
    <section className="py-2">
      <Link href={link} className="block">
        <div className={`${backgroundColor} py-4 px-4 text-white text-center hover:opacity-95 transition-opacity`}>
          <p className="text-sm opacity-90">{subtitle}</p>
          <p className="text-lg font-bold mt-0.5">{title}</p>
        </div>
      </Link>
    </section>
  );
}
