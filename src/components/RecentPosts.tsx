import Link from 'next/link';
import { getAllArticles } from '@/lib/markdown';

export default function RecentPosts() {
  const articles = getAllArticles().slice(0, 5); // 최근 5개 포스트만 표시

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
      <div className="space-y-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/blog/${article.id}`}
            className="block border-b pb-6 hover:bg-gray-50 transition-colors p-4"
          >
            <article>
              <h3 className="text-xl font-semibold text-gray-900">
                {article.title}
              </h3>
              <div className="text-gray-600 text-sm mt-2">{article.date}</div>
              <p className="mt-2 text-gray-700">{article.description}</p>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
