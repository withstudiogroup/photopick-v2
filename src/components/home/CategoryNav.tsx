'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  IdCard,
  User,
  Users,
  Baby,
  Heart,
  Sparkles,
  PawPrint,
  HeartHandshake,
  Smile,
  Camera,
  Image,
  Star,
  Music,
  Dumbbell,
} from 'lucide-react';
import type { Category } from '@/types';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'id-card': IdCard,
  'camera': Camera,
  'user': User,
  'users': Users,
  'baby': Baby,
  'heart': Heart,
  'sparkles': Sparkles,
  'paw-print': PawPrint,
  'heart-handshake': HeartHandshake,
  'smile': Smile,
  'image': Image,
  'star': Star,
  'music': Music,
  'group': Users,
  'child': Baby,
  'fitness': Dumbbell,
};

export default function CategoryNav() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <section className="py-3 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-5 gap-y-3 sm:flex sm:justify-center sm:gap-6">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Sparkles;
            return (
              <Link
                key={category.id}
                href={`/search?category=${category.slug}`}
                className="flex flex-col items-center gap-1 group"
              >
                <div className="w-10 h-10 flex items-center justify-center text-gray-500 group-hover:text-[#0152CC] transition-colors">
                  <Icon size={24} />
                </div>
                <span className="text-[11px] sm:text-xs text-gray-600 group-hover:text-[#0152CC] whitespace-nowrap transition-colors">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
