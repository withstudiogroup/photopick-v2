'use client';

import { useState } from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import { cn } from '@/lib/utils';

interface ProductSectionProps {
  products: Product[];
  onReserve: (product: Product) => void;
}

export default function ProductSection({ products, onReserve }: ProductSectionProps) {
  const categories = [...new Set(products.map(p => p.category))];
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredProducts = products.filter(p => p.category === activeCategory);

  return (
    <section id="products" className="bg-white">
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900">촬영 선택</h2>
        </div>
      </div>

      <div className="flex border-b border-gray-100">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              'flex-1 py-3 text-sm font-medium text-center border-b-2 transition-colors',
              activeCategory === category
                ? 'text-[#0152CC] border-[#0152CC]'
                : 'text-gray-500 border-transparent'
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onReserve={onReserve}
          />
        ))}
      </div>
    </section>
  );
}
