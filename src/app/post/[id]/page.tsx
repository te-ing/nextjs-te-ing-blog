import {
  getArticleData,
  getAllArticleIds,
  getRecommendedArticles,
} from '@/lib/markdown';
import Layout from '@/components/Layout';
import MarkdownContent from '@/components/MarkdownContent';
import RecommendedPosts from '@/components/RecommendedPosts';
import { Metadata } from 'next';
import GiscusComments from '@/components/GiscusComments';

export async function generateStaticParams() {
  const paths = getAllArticleIds();
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleData(id);

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags?.join(', '),
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.fileDate || article.date,
      authors: ['te-ing'],
      locale: 'ko_KR',
      siteName: 'Write-ing Code',
    },
    alternates: {
      canonical: `https://te-ing.dev/post/${id}`,
    },
    robots: article.private
      ? { index: false, follow: false }
      : undefined,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticleData(id);
  const recommendedArticles = getRecommendedArticles(id);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    datePublished: article.fileDate || article.date,
    dateModified: article.date || article.fileDate,
    author: {
      '@type': 'Person',
      name: '김태중',
      url: 'https://te-ing.dev/about',
    },
    publisher: {
      '@type': 'Person',
      name: '김태중',
      url: 'https://te-ing.dev',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://te-ing.dev/post/${id}`,
    },
    keywords: article.tags?.join(', '),
    inLanguage: 'ko-KR',
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-[800px] mx-auto py-8 px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <div className="text-gray-600 text-base">
            {article.fileDate && (
              <span className="mr-2">{article.fileDate}</span>
            )}
            {article.date}
          </div>
        </header>
        <MarkdownContent content={article.content} tags={article.tags} isMdx={article.isMdx} />
        <GiscusComments />
        <RecommendedPosts articles={recommendedArticles} />
      </article>
    </Layout>
  );
}
