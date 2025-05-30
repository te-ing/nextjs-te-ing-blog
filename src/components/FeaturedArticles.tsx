import Link from 'next/link';
import { getFeaturedArticles } from '@/lib/markdown';

export default function FeaturedArticles() {
  const featuredArticles = getFeaturedArticles();

  return (
    <section className="max-w-[1024px] mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Featured articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredArticles.map((article) => (
          <Link key={article.id} href={`/post/${article.id}`} className="block">
            <article className="h-full border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 line-clamp-3 overflow-hidden text-ellipsis">
                {article.title}
              </h3>
              <p className="text-gray-600 line-clamp-3 overflow-hidden text-ellipsis">
                {article.description}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
