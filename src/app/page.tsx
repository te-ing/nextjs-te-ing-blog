import Layout from '@/components/Layout';
import RecentPosts from '@/components/RecentPosts';
import FeaturedArticles from '@/components/FeaturedArticles';

export default function Home() {
  return (
    <Layout>
      <div className="max-w-[1024px] mx-auto px-4">
        <div className="space-y-8">
          <section className="text-center">
            <h1 className="text-4xl font-bold mb-4">Write-ing Code</h1>
            <p className="text-xl text-gray-600">
              효율성을 높여 행복한 시간을 더 많이 만들고 싶습니다.
            </p>
          </section>

          <FeaturedArticles />
          <RecentPosts />
        </div>
      </div>
    </Layout>
  );
}
