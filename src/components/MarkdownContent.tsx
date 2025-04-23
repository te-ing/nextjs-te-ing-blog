import { markdownStyles } from '@/styles/markdown';
import Link from 'next/link';

interface MarkdownContentProps {
  content: string;
  tags?: string[];
}

export default function MarkdownContent({
  content,
  tags,
}: MarkdownContentProps) {
  return (
    <div>
      <div
        className={markdownStyles.content}
        dangerouslySetInnerHTML={{ __html: processMarkdownContent(content) }}
      />
      {tags && tags.length > 0 && (
        <div className="mt-8 pt-4 border-t">
          <h3 className="text-lg font-semibold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${tag}`}
                className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function processMarkdownContent(content: string): string {
  // HTML 문자열에서 각 태그에 Tailwind 클래스를 추가
  return content
    .replace(/<h1/g, `<h1 class="${markdownStyles.h1}"`)
    .replace(/<h2/g, `<h2 class="${markdownStyles.h2}"`)
    .replace(/<h3/g, `<h3 class="${markdownStyles.h3}"`)
    .replace(/<h4/g, `<h4 class="${markdownStyles.h4}"`)
    .replace(/<p>/g, `<p class="${markdownStyles.p}">`)
    .replace(/<ul>/g, `<ul class="${markdownStyles.ul}">`)
    .replace(/<ol>/g, `<ol class="${markdownStyles.ol}">`)
    .replace(/<li>/g, `<li class="${markdownStyles.li}">`)
    .replace(/<a /g, `<a class="${markdownStyles.a}" `)
    .replace(/<pre>/g, `<pre class="${markdownStyles.pre}">`)
    .replace(/<code>/g, `<code class="${markdownStyles.code}">`)
    .replace(
      /<blockquote>/g,
      `<blockquote class="${markdownStyles.blockquote}">`
    )
    .replace(/<img /g, `<img class="${markdownStyles.img}" `)
    .replace(/<hr>/g, `<hr class="${markdownStyles.hr}">`)
    .replace(/<table>/g, `<table class="${markdownStyles.table}">`)
    .replace(/<th>/g, `<th class="${markdownStyles.th}">`)
    .replace(/<td>/g, `<td class="${markdownStyles.td}">`);
}
