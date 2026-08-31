import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const ROOT = path.resolve(import.meta.dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'src/content/articles');
const README_PATH = path.join(ROOT, 'README.md');

const FALLBACK = '기타';
const ORDER = ['톺아보기', '회고', '구현/설계', '트러블슈팅', FALLBACK];

const START = '<!-- CATEGORY_STATS:START -->';
const END = '<!-- CATEGORY_STATS:END -->';

const counts = new Map();

for (const file of fs.readdirSync(ARTICLES_DIR)) {
  if (!/\.mdx?$/.test(file)) continue;
  const { data } = matter(fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8'));
  const category = String(data.category ?? '').trim() || FALLBACK;
  counts.set(category, (counts.get(category) ?? 0) + 1);
}

// 정의된 순서를 먼저 두고, 그 외 카테고리는 글 수 내림차순으로 기타 앞에 배치한다.
const unknown = [...counts.keys()]
  .filter((category) => !ORDER.includes(category))
  .sort((a, b) => counts.get(b) - counts.get(a));
const rows = [...ORDER.slice(0, -1), ...unknown, FALLBACK]
  .filter((category) => counts.has(category))
  .map((category) => `| ${category} | ${counts.get(category)} |`);

const total = [...counts.values()].reduce((sum, count) => sum + count, 0);
const table = ['| 카테고리 | 글 수 |', '| --- | --- |', ...rows, `| **합계** | **${total}** |`].join('\n');

const readme = fs.readFileSync(README_PATH, 'utf-8');
const block = `${START}\n\n${table}\n\n${END}`;
const pattern = new RegExp(`${START}[\\s\\S]*?${END}`);

if (!pattern.test(readme)) {
  console.error(`README.md에 ${START} ~ ${END} 마커가 없습니다.`);
  process.exit(1);
}

const updated = readme.replace(pattern, block);

if (updated === readme) {
  console.log('카테고리 통계 변경 없음');
} else {
  fs.writeFileSync(README_PATH, updated);
  console.log(`카테고리 통계 갱신 완료 (총 ${total}편)`);
}
