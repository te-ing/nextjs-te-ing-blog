'use client';

import { ArticlePreview } from '@/lib/markdown';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import TagBox from './TagBox';
import { useEffect, useRef } from 'react';
import { usePostContext } from '@/app/post/postContext';

interface PostListProps {
  articles: ArticlePreview[];
  tags: string[];
}

export default function PostList({ articles, tags }: PostListProps) {
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get('tag');
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { visibleCount, setVisibleCount } = usePostContext();

  const filteredArticles = selectedTag
    ? articles.filter((article) => article.tags?.includes(selectedTag))
    : articles;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisibleCount((prev) => prev + 10);
      },
      { threshold: 1 }
    );

    const el = loadMoreRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-[800px] mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Posts</h1>

      <TagBox tags={tags} />

      <div>
        {filteredArticles.slice(0, visibleCount).map((article) => (
          <Link
            key={article.id}
            href={`/post/${article.id}`}
            className="block border-b py-6 hover:bg-gray-50 transition-colors p-4"
          >
            <article>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 truncate ">
                  {article.title}
                </h2>
                <div className="text-gray-600 text-sm whitespace-nowrap">
                  {article.fileDate && (
                    <span className="mr-2">{article.fileDate}</span>
                  )}
                  {article.date}
                </div>
              </div>
              <p className="mt-2 text-gray-700">{article.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {article.tags?.map((tag) => (
                  <button
                    key={tag}
                    onClick={(e) => {
                      e.preventDefault();
                      const params = new URLSearchParams(
                        searchParams.toString()
                      );
                      params.set('tag', tag);
                      window.location.href = `/post?${params.toString()}`;
                    }}
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </article>
          </Link>
        ))}
        {visibleCount < articles.length && (
          <div ref={loadMoreRef} className="h-10"></div>
        )}
      </div>
    </div>
  );
}
