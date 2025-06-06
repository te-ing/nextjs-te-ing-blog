import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { featuredArticles } from '@/config/featured-articles';
import gfm from 'remark-gfm';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

export interface Article {
  id: string;
  title: string;
  date: string;
  content: string;
  description: string;
  tags: string[];
  fileDate?: string;
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
  const processedContent = await remark()
    .use(gfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();
  const fileDate = extractDateFromFileName(originalId);

  return {
    id,
    content: contentHtml,
    fileDate,
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

export function getRecommendedArticles(
  currentArticleId: string,
  count: number = 4
): ArticlePreview[] {
  const allArticles = getAllArticles();

  // URL 디코딩된 ID로 비교
  const decodedCurrentId = desanitizeFileName(currentArticleId);
  const currentArticle = allArticles.find(
    (article) => article.id === decodedCurrentId
  );

  if (!currentArticle) {
    console.log('Current article not found');
    return [];
  }

  // 현재 포스트를 제외한 나머지 포스트들
  const otherArticles = allArticles.filter(
    (article) => article.id !== decodedCurrentId
  );

  if (otherArticles.length === 0) {
    console.log('No other articles found');
    return [];
  }

  // 태그 유사도와 날짜 차이를 기준으로 점수 계산
  const scoredArticles = otherArticles.map((article) => {
    // 태그 유사도 점수 계산 (0~1 사이 값)
    const commonTags =
      currentArticle.tags?.filter((tag) => article.tags?.includes(tag)) || [];
    const tagScore = commonTags.length / (currentArticle.tags?.length || 1);

    // 날짜 차이 계산 (0~1 사이 값)
    const currentDate = new Date(
      currentArticle.fileDate || currentArticle.date
    );
    const articleDate = new Date(article.fileDate || article.date);
    const dateDiff = Math.abs(currentDate.getTime() - articleDate.getTime());
    const dateScore = 1 / (1 + dateDiff / (1000 * 60 * 60 * 24 * 30)); // 30일 단위로 정규화

    // 최종 점수 계산 (태그 유사도 70%, 날짜 30% 가중치)
    const finalScore = tagScore * 0.7 + dateScore * 0.3;

    return {
      article,
      score: finalScore,
    };
  });

  // 점수 기준으로 정렬하고 상위 N개 반환
  const recommendedArticles = scoredArticles
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(({ article }) => article);

  return recommendedArticles;
}
