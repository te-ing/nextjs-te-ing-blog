import { getAllArticles, getAllTags } from '@/lib/markdown';
import Layout from '@/components/Layout';
import BlogPosts from '@/components/BlogPosts';
import { Suspense } from 'react';

export default function BlogPage() {
  const articles = getAllArticles();
  const tags = getAllTags();

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <BlogPosts articles={articles} tags={tags} />
      </Suspense>
    </Layout>
  );
}
