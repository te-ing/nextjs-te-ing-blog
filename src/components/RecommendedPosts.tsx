import Link from 'next/link';
import { ArticlePreview } from '@/lib/markdown';

interface RecommendedPostsProps {
  articles: ArticlePreview[];
}

export default function RecommendedPosts({ articles }: RecommendedPostsProps) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">이런 포스팅은 어떤가요?</h2>
      <div className="space-y-4">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/post/${article.id}`}
            className="block hover:bg-gray-50 transition-colors p-2"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {article.title}
              </h3>
              <div className="text-gray-600 text-sm">
                {article.fileDate && (
                  <span className="mr-2">{article.fileDate}</span>
                )}
                {article.date}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
