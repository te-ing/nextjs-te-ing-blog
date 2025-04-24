import {
  getArticleData,
  getAllArticleIds,
  getRecommendedArticles,
} from '@/lib/markdown';
import Layout from '@/components/Layout';
import MarkdownContent from '@/components/MarkdownContent';
import RecommendedPosts from '@/components/RecommendedPosts';

export async function generateStaticParams() {
  const paths = getAllArticleIds();
  return paths;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticleData(id);
  const recommendedArticles = getRecommendedArticles(id);

  return (
    <Layout>
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
        <MarkdownContent content={article.content} tags={article.tags} />
        <RecommendedPosts articles={recommendedArticles} />
      </article>
    </Layout>
  );
}
