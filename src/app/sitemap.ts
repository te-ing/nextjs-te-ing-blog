import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/markdown';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const postUrls = articles.map((article) => ({
    url: `https://te-ing.dev/post/${article.id}`,
    lastModified: new Date(article.date ?? article.fileDate),
    priority: 0.9,
  }));

  return [
    {
      url: 'https://te-ing.dev',
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: 'https://te-ing.dev/post',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://te-ing.dev/about',
      lastModified: new Date(),
      priority: 0.5,
    },
    ...postUrls,
  ];
}
