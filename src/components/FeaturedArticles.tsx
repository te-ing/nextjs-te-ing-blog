import Link from 'next/link';
import { getFeaturedArticles } from '@/lib/markdown';

export default function FeaturedArticles() {
  const featuredArticles = getFeaturedArticles();

  return (
    <section className="max-w-[1024px] mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Featured articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredArticles.map((article) => (
          <Link key={article.id} href={`/blog/${article.id}`} className="block">
            <article className="h-full border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-600 mb-4">{article.description}</p>
              <div className="text-sm text-gray-500">{article.date}</div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
