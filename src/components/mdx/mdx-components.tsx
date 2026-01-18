import type { MDXComponents } from 'mdx/types';
import { LiveCodeBlock } from './LiveCodeBlock';

// 전역 MDX 컴포넌트 (모든 MDX에서 사용 가능)
// 특정 글에서만 사용되는 컴포넌트는 해당 글 폴더의 components.tsx에 정의
export const mdxComponents: MDXComponents = {
  // 공통 컴포넌트를 여기에 추가
  LiveCodeBlock,
};
