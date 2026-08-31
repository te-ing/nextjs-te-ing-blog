'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { CategoryCount } from '@/lib/categories';

interface CategoryBoxProps {
  categories: CategoryCount[];
  totalCount: number;
}

export default function CategoryBox({
  categories,
  totalCount,
}: CategoryBoxProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const handleCategoryClick = useCallback(
    (category: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (category) {
        params.set('category', category);
      } else {
        params.delete('category');
      }
      const query = params.toString();
      router.push(query ? `/post?${query}` : '/post');
    },
    [router, searchParams]
  );

  const buttonClass = (isSelected: boolean) =>
    `px-3 py-1 rounded-full text-sm transition-colors ${
      isSelected
        ? 'bg-blue-100 text-blue-800'
        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
    }`;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryClick(null)}
          className={buttonClass(!selectedCategory)}
        >
          All
          <span className="ml-1 text-xs opacity-60">{totalCount}</span>
        </button>
        {categories.map(({ name, count }) => (
          <button
            key={name}
            onClick={() => handleCategoryClick(name)}
            className={buttonClass(selectedCategory === name)}
          >
            {name}
            <span className="ml-1 text-xs opacity-60">{count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
