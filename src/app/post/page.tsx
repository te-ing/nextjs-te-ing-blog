import { getAllArticles, getAllTags, getCategoryCounts } from '@/lib/markdown';
import Layout from '@/components/Layout';
import PostList from '@/components/PostList';
import { Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '전체 글',
  description: '개발 및 회고를 정리합니다.',
  alternates: {
    canonical: '/post',
  },
};

function LoadingFallback() {
  return (
    <div className="max-w-[800px] mx-auto py-8 px-4">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="pb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PostPage() {
  const articles = getAllArticles();
  const tags = getAllTags();
  const categories = getCategoryCounts();

  return (
    <Layout>
      <Suspense fallback={<LoadingFallback />}>
        <PostList articles={articles} tags={tags} categories={categories} />
      </Suspense>
    </Layout>
  );
}
