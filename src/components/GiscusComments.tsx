'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export default function GiscusComments() {
  const { theme } = useTheme();

  return (
    <Giscus
      id="comments"
      repo="te-ing/nextjs-te-ing-blog"
      repoId="R_kgDOOeQi_A"
      category="Post"
      categoryId="DIC_kwDOOeQi_M4CplKk"
      mapping="pathname"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={theme === 'dark' ? 'dark' : 'light'}
      lang="ko"
      loading="lazy"
    />
  );
}
