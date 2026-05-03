import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/markdown';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  const latestArticleDate = articles.reduce<Date>((latest, article) => {
    const candidate = new Date(article.date ?? article.fileDate);
    return candidate > latest ? candidate : latest;
  }, new Date(0));

  const postUrls = articles.map((article) => ({
    url: `https://te-ing.dev/post/${article.id}`,
    lastModified: new Date(article.date ?? article.fileDate),
    priority: 0.9,
  }));

  return [
    {
      url: 'https://te-ing.dev',
      lastModified: latestArticleDate,
      priority: 1,
    },
    {
      url: 'https://te-ing.dev/post',
      lastModified: latestArticleDate,
      priority: 0.8,
    },
    {
      url: 'https://te-ing.dev/about',
      priority: 0.5,
    },
    ...postUrls,
  ];
}
