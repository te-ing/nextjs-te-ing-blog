# Write-ing Code

개인 기술 블로그입니다. 쉽게 읽을 수 있는 글과 코드를 작성합니다.

## 포스트 현황

<!-- CATEGORY_STATS:START -->

| 카테고리 | 글 수 |
| --- | --- |
| 톺아보기 | 18 |
| 회고 | 9 |
| 구현/설계 | 8 |
| 트러블슈팅 | 5 |
| 기타 | 3 |
| **합계** | **43** |

<!-- CATEGORY_STATS:END -->

> 이전에 작성한 130개의 포스트는 [Velog](https://velog.io/@te-ing)에서 보실 수 있습니다.

## 기술 스택

- Next.js 16.0.7
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
- 포스트 내 실시간 코드 편집기 (react-live)

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
category: '톺아보기'
---
```

`category`는 글의 성격을 나타냅니다. `톺아보기`(개념·원리 해설), `회고`, `구현/설계`, `트러블슈팅` 중 하나를 쓰고, 지정하지 않으면 `기타`로 집계됩니다.

포스트 현황 표는 커밋할 때 husky의 pre-commit 훅이 자동으로 갱신합니다. `npm install`을 하면 훅이 함께 설치되며, 수동으로 갱신하려면 아래 명령을 사용하세요.

```bash
npm run readme:categories
```

## 라이선스

MIT License
