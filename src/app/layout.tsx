import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PhotoPick - 사진 스튜디오 예약 플랫폼',
  description: '당신의 특별한 순간을 담을 완벽한 스튜디오를 찾아드립니다. 증명사진, 프로필, 가족사진, 웨딩 촬영까지!',
  keywords: ['사진 스튜디오', '증명사진', '프로필 사진', '가족사진', '웨딩 촬영', '스튜디오 예약'],
  openGraph: {
    title: 'PhotoPick - 사진 스튜디오 예약 플랫폼',
    description: '당신의 특별한 순간을 담을 완벽한 스튜디오를 찾아드립니다.',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
