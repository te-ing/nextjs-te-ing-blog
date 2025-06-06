import Link from 'next/link';
import { getAllArticles } from '@/lib/markdown';

export default function RecentPosts() {
  const articles = getAllArticles().slice(0, 5); // 최근 5개 포스트만 표시

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-2">Recent Posts</h2>
      <div>
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/post/${article.id}`}
            className="block border-b py-6 hover:bg-gray-50 transition-colors p-4"
          >
            <article>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {article.title}
                </h3>
                <div className="text-gray-600 text-sm">
                  {article.fileDate && (
                    <span className="mr-2">{article.fileDate}</span>
                  )}
                  {article.date}
                </div>
              </div>
              <p className="mt-2 text-gray-700">{article.description}</p>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
