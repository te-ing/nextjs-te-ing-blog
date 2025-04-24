import Layout from '@/components/Layout';
import RecentPosts from '@/components/RecentPosts';
import FeaturedArticles from '@/components/FeaturedArticles';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Write-ing Code',
  description: '쉽게 읽을 수 있는 글과 코드를 씁니다.',
  openGraph: {
    title: 'Write-ing Code',
    description: '쉽게 읽을 수 있는 글과 코드를 씁니다.',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Write-ing Code',
  },
};

export default function Home() {
  return (
    <Layout>
      <div className="max-w-[1024px] mx-auto px-4">
        <div className="space-y-8">
          <section className="text-center">
            <h1 className="text-4xl font-bold mb-4">Write-ing Code</h1>
            <p className="text-xl text-gray-600">
              쉽게 읽을 수 있는 글과 코드를 씁니다.
            </p>
          </section>

          <FeaturedArticles />
          <RecentPosts />
        </div>
      </div>
    </Layout>
  );
}
