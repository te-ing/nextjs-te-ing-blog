import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/markdown';
import { SITE_URL } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  const latestArticleDate = articles.reduce<Date>((latest, article) => {
    const candidate = new Date(article.date ?? article.fileDate);
    return candidate > latest ? candidate : latest;
  }, new Date(0));

  const postUrls = articles.map((article) => ({
    url: `${SITE_URL}/post/${article.id}`,
    lastModified: new Date(article.date ?? article.fileDate),
    priority: 0.9,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: latestArticleDate,
      priority: 1,
    },
    {
      url: `${SITE_URL}/post`,
      lastModified: latestArticleDate,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      priority: 0.5,
    },
    ...postUrls,
  ];
}
