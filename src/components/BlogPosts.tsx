'use client';

import { ArticlePreview } from '@/lib/markdown';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import TagBox from './TagBox';

interface BlogPostsProps {
  articles: ArticlePreview[];
  tags: string[];
}

export default function BlogPosts({ articles, tags }: BlogPostsProps) {
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get('tag');

  const filteredArticles = selectedTag
    ? articles.filter((article) => article.tags?.includes(selectedTag))
    : articles;

  return (
    <div className="max-w-[800px] mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>

      <TagBox tags={tags} />

      <div className="space-y-6">
        {filteredArticles.map((article) => (
          <Link
            key={article.id}
            href={`/blog/${article.id}`}
            className="block border-b pb-6 hover:bg-gray-50 transition-colors p-4"
          >
            <article>
              <h2 className="text-xl font-semibold text-gray-900">
                {article.title}
              </h2>
              <div className="text-gray-600 text-sm mt-2">{article.date}</div>
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
                      window.location.href = `/blog?${params.toString()}`;
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
      </div>
    </div>
  );
}
