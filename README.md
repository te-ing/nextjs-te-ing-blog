# Write-ing Code

개인 기술 블로그입니다. 쉽게 읽을 수 있는 글과 코드를 작성합니다. 

## 기술 스택

- Next.js 15.3.1
- TypeScript
- Tailwind CSS
- Cursor IDE

## 주요 기능

- 마크다운 기반 블로그 포스트
- 태그 기반 포스트 필터링
- 추천 포스팅 (태그 유사도 + 날짜 기반)
- 반응형 디자인
- SEO 최적화 (메타데이터, OpenGraph, Twitter Cards)
- Giscus 댓글

## 포스트 작성 방법

1. `src/content/articles` 디렉토리에 마크다운 파일 생성
2. 파일명 형식: `YYYY-MM-DD-제목.md`
3. 마크다운 파일의 frontmatter에 다음 정보 포함:

```yaml
---
title: '포스트 제목'
date: 'YYYY-MM-DD'
description: '포스트 설명'
tags: ['태그1', '태그2']
---
```

## 라이선스

MIT License
