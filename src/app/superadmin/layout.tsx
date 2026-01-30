'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Grid3X3,
  Store,
  Calendar,
  Image,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  CalendarCheck,
  MessageSquare,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const menuItems = [
  { href: '/superadmin', icon: LayoutDashboard, label: '대시보드' },
  { href: '/superadmin/categories', icon: Grid3X3, label: '카테고리 관리' },
  { href: '/superadmin/studios', icon: Store, label: '스튜디오 관리' },
  { href: '/superadmin/events', icon: Calendar, label: '이벤트 관리' },
  { href: '/superadmin/reservations', icon: CalendarCheck, label: '전체 예약' },
  { href: '/superadmin/reviews', icon: MessageSquare, label: '전체 후기' },
  { href: '/superadmin/banners', icon: Image, label: '배너 관리' },
  { href: '/superadmin/members', icon: Users, label: '회원 관리' },
  { href: '/superadmin/settings', icon: Settings, label: '설정' },
];

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-gray-400"
          >
            <Menu size={24} />
          </button>
          <h1 className="font-bold text-white flex items-center gap-2">
            <Shield size={20} className="text-purple-400" />
            SuperAdmin
          </h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/70"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-gray-800 border-r border-gray-700 transform transition-transform lg:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
            <Link href="/superadmin" className="font-bold text-lg text-white flex items-center gap-2">
              <Shield size={24} className="text-purple-400" />
              SuperAdmin
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 -mr-2 text-gray-400"
            >
              <X size={20} />
            </button>
          </div>

          {/* Admin Info */}
          <div className="px-4 py-3 border-b border-gray-700 bg-gray-900/50">
            <p className="text-sm font-medium text-white">운영자</p>
            <p className="text-xs text-gray-400">admin@photopick.com</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {menuItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/superadmin' && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      )}
                    >
                      <item.icon size={20} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <LogOut size={20} />
              사이트로 돌아가기
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 pt-14 lg:pt-0 min-h-screen">
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
