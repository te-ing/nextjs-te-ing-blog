import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { featuredArticles } from '@/config/featured-articles';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

export interface Article {
  id: string;
  title: string;
  date: string;
  content: string;
  description: string;
  tags: string[];
}

export interface ArticlePreview {
  id: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
  fileDate?: string;
}

function sanitizeFileName(fileName: string): string {
  // 파일 확장자 제거
  const nameWithoutExt = fileName.replace(/\.md$/, '');
  // 한글과 특수문자를 URL에 안전한 형태로 변환
  return encodeURIComponent(nameWithoutExt);
}

function desanitizeFileName(sanitizedId: string): string {
  // URL에 안전한 형태를 원래 형태로 변환
  return decodeURIComponent(sanitizedId);
}

function extractDateFromFileName(fileName: string): string {
  // 파일명의 앞 10글자에서 날짜를 추출
  const dateStr = fileName.slice(0, 10);
  // YYYY-MM-DD 형식인지 확인
  if (!/^\d{4}-\d{2}-\d{2}/.test(dateStr)) return '';
  return dateStr;
}

export function getAllArticleIds() {
  const fileNames = fs.readdirSync(articlesDirectory);
  return fileNames.map((fileName) => {
    return { params: { id: sanitizeFileName(fileName) } };
  });
}

export async function getArticleData(id: string): Promise<Article> {
  const originalId = desanitizeFileName(id);
  const fullPath = path.join(articlesDirectory, `${originalId}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    id,
    content: contentHtml,
    ...(data as {
      title: string;
      date: string;
      description: string;
      tags: string[];
    }),
  };
}

export function getAllArticles(): ArticlePreview[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    const fileDate = extractDateFromFileName(fileName);

    return {
      id,
      fileDate,
      ...(data as {
        title: string;
        date: string;
        description: string;
        tags?: string[];
      }),
    };
  });

  return allArticlesData.sort((a, b) => b.id.localeCompare(a.id));
}

export function getFeaturedArticles(): ArticlePreview[] {
  const articles = getAllArticles();
  return articles.filter((article) => featuredArticles.includes(article.id));
}

export function getAllTags(): string[] {
  const articles = getAllArticles();
  const tags = new Set<string>();
  articles.forEach((article) => {
    article.tags?.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}
