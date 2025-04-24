import { getAllArticles, getAllTags } from '@/lib/markdown';
import Layout from '@/components/Layout';
import PostList from '@/components/PostList';

export default function PostPage() {
  const articles = getAllArticles();
  const tags = getAllTags();

  return (
    <Layout>
      <PostList articles={articles} tags={tags} />
    </Layout>
  );
}
