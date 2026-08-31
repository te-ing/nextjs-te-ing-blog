import categoriesConfig from '@/config/categories.json';

/** 글의 성격을 나타내는 카테고리. 노출 순서를 겸한다. */
export const CATEGORY_ORDER: string[] = categoriesConfig.order;

/** category가 지정되지 않은 글이 들어갈 카테고리 */
export const FALLBACK_CATEGORY: string = categoriesConfig.fallback;

export interface CategoryCount {
  name: string;
  count: number;
}

export function resolveCategory(category?: string | null): string {
  return category?.trim() || FALLBACK_CATEGORY;
}

/** 정의된 순서를 먼저 두고, 그 외 카테고리는 글 수 내림차순으로 기타 앞에 배치한다. */
export function sortCategories(counts: Map<string, number>): string[] {
  const unknown = Array.from(counts.keys())
    .filter((name) => name !== FALLBACK_CATEGORY && !CATEGORY_ORDER.includes(name))
    .sort((a, b) => (counts.get(b) ?? 0) - (counts.get(a) ?? 0));

  return [...CATEGORY_ORDER, ...unknown, FALLBACK_CATEGORY].filter((name) =>
    counts.has(name)
  );
}
