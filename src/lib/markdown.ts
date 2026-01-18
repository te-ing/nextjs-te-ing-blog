import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { featuredArticles } from '@/config/featured-articles';
import gfm from 'remark-gfm';
import { compileMDX } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/mdx/mdx-components';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

interface ArticleFile {
  id: string;
  fullPath: string;
  isMdx: boolean;
  isFolder: boolean;
}

function getArticleFiles(): ArticleFile[] {
  const entries = fs.readdirSync(articlesDirectory, { withFileTypes: true });
  const articles: ArticleFile[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      // 폴더 기반 아티클 (index.mdx 또는 index.md)
      const folderPath = path.join(articlesDirectory, entry.name);
      const mdxPath = path.join(folderPath, 'index.mdx');
      const mdPath = path.join(folderPath, 'index.md');

      if (fs.existsSync(mdxPath)) {
        articles.push({
          id: entry.name,
          fullPath: mdxPath,
          isMdx: true,
          isFolder: true,
        });
      } else if (fs.existsSync(mdPath)) {
        articles.push({
          id: entry.name,
          fullPath: mdPath,
          isMdx: false,
          isFolder: true,
        });
      }
    } else if (/\.mdx?$/.test(entry.name)) {
      // 단일 파일 아티클
      const id = entry.name.replace(/\.mdx?$/, '');
      const isMdx = entry.name.endsWith('.mdx');
      articles.push({
        id,
        fullPath: path.join(articlesDirectory, entry.name),
        isMdx,
        isFolder: false,
      });
    }
  }

  return articles;
}

async function getArticleComponents(articleId: string): Promise<Record<string, React.ComponentType<unknown>>> {
  const folderPath = path.join(articlesDirectory, articleId);
  const componentsPath = path.join(folderPath, 'components.tsx');

  if (fs.existsSync(componentsPath)) {
    try {
      // 동적으로 컴포넌트 import
      const components = await import(`@/content/articles/${articleId}/components`);
      return components;
    } catch {
      return {};
    }
  }
  return {};
}

export interface Article {
  id: string;
  title: string;
  date: string;
  content: string | React.ReactElement;
  description: string;
  tags: string[];
  fileDate?: string;
  private?: boolean;
  isMdx?: boolean;
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
  // 한글과 특수문자를 URL에 안전한 형태로 변환
  return encodeURIComponent(fileName);
}

function findArticleFile(baseName: string): { fullPath: string; isMdx: boolean; isFolder: boolean } | null {
  // 1. 폴더 기반 구조 확인
  const folderPath = path.join(articlesDirectory, baseName);
  if (fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory()) {
    const mdxPath = path.join(folderPath, 'index.mdx');
    const mdPath = path.join(folderPath, 'index.md');

    if (fs.existsSync(mdxPath)) {
      return { fullPath: mdxPath, isMdx: true, isFolder: true };
    }
    if (fs.existsSync(mdPath)) {
      return { fullPath: mdPath, isMdx: false, isFolder: true };
    }
  }

  // 2. 단일 파일 구조 확인
  const mdxPath = path.join(articlesDirectory, `${baseName}.mdx`);
  const mdPath = path.join(articlesDirectory, `${baseName}.md`);

  if (fs.existsSync(mdxPath)) {
    return { fullPath: mdxPath, isMdx: true, isFolder: false };
  }
  if (fs.existsSync(mdPath)) {
    return { fullPath: mdPath, isMdx: false, isFolder: false };
  }
  return null;
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
  const articles = getArticleFiles();
  return articles.map((article) => {
    return { params: { id: sanitizeFileName(article.id) } };
  });
}

export async function getArticleData(id: string): Promise<Article> {
  const originalId = desanitizeFileName(id);
  const fileInfo = findArticleFile(originalId);

  if (!fileInfo) {
    throw new Error(`Article not found: ${originalId}`);
  }

  const { fullPath, isMdx, isFolder } = fileInfo;
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const fileDate = extractDateFromFileName(originalId);

  if (isMdx) {
    // 폴더 기반이면 로컬 컴포넌트 로드
    const localComponents = isFolder ? await getArticleComponents(originalId) : {};
    const allComponents = { ...mdxComponents, ...localComponents };

    const { content: mdxContent } = await compileMDX({
      source: content,
      components: allComponents,
      options: {
        mdxOptions: {
          remarkPlugins: [gfm],
          rehypePlugins: [rehypeHighlight],
        },
      },
    });

    return {
      id,
      content: mdxContent,
      fileDate,
      isMdx: true,
      ...(data as {
        title: string;
        date: string;
        description: string;
        tags: string[];
      }),
    };
  }

  const processedContent = await remark()
    .use(gfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    id,
    content: contentHtml,
    fileDate,
    isMdx: false,
    ...(data as {
      title: string;
      date: string;
      description: string;
      tags: string[];
    }),
  };
}

export function getAllArticles(): ArticlePreview[] {
  const articles = getArticleFiles();
  const allArticlesData = articles.map((article) => {
    const fileContents = fs.readFileSync(article.fullPath, 'utf8');
    const { data } = matter(fileContents);
    const fileDate = extractDateFromFileName(article.id);
    return {
      id: article.id,
      fileDate,
      ...(data as {
        title: string;
        date: string;
        description: string;
        tags?: string[];
        private?: boolean;
      }),
    };
  });
  return allArticlesData
    .filter((data) => !data?.private)
    .sort((a, b) => b.id.localeCompare(a.id));
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
