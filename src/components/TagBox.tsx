'use client';

import { useCallback, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface TagBoxProps {
  tags: string[];
}

export default function TagBox({ tags }: TagBoxProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get('tag');
  const [showAllTags, setShowAllTags] = useState(false);

  const handleTagClick = useCallback(
    (tag: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (tag) {
        params.set('tag', tag);
      } else {
        params.delete('tag');
      }
      router.push(`/blog?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Tags</h2>
      <div className="relative">
        <div
          className={`flex flex-wrap gap-2 ${
            !showAllTags ? 'max-h-[4.5rem] overflow-hidden' : ''
          }`}
        >
          <button
            onClick={() => handleTagClick(null)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              !selectedTag
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTag === tag
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        {tags.length > 6 && (
          <div className="flex justify-end">
            <button
              onClick={() => setShowAllTags(!showAllTags)}
              className="mt-2 mr-5 text-sm text-gray-700 hover:text-gray-900"
            >
              {showAllTags ? '접기' : '더보기'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
