import Link from 'next/link';
import { getFeaturedArticles } from '@/lib/markdown';

function formatMonth(date?: string) {
  if (!date) return '';
  return date.slice(0, 7).replace('-', '.');
}

export default function AboutFeaturedPosts() {
  const articles = getFeaturedArticles();

  return (
    <div className="flex flex-col">
      {articles.map((article) => (
        <Link
          key={article.id}
          href={`/post/${article.id}`}
          className="flex justify-between items-baseline gap-6 py-4 border-b border-gray-100 last:border-b-0"
        >
          <span className="text-lg text-gray-900">{article.title}</span>
          <span className="font-mono text-[13px] text-gray-400 shrink-0">
            {formatMonth(article.fileDate ?? article.date)}
          </span>
        </Link>
      ))}
    </div>
  );
}
