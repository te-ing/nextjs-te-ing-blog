---
title: Vite에 대한 간단한 소개::CRA 대신 Vite를 사용해보는 것은 어떤가요?
description: 기존 번들러보다 10배에서 100배까지 빠른 Vite의 배경과 장단점을 소개합니다.
tags: [번들러, CRA, Vite]
---

## Vite 개요

빠르다는 의미의 프랑스어 vite는 바이트가 아닌 비트라고 읽는다. 이름과 같이 vite는 매우 빠른 속도를 보여주는데, Vite의 사전 번들링 기능은 Go 언어로 작성된 Esbuild을 사용하여 기존 Webpack, Parcel과 같은 번들러 대비 10-100배 빠른 속도를 가진다.

<br />

## Vite가 생겨나게 된 배경

vite를 비롯하여 이렇게 빠른 속도를 가진 도구들이 출시될 수 있는 배경에는 메이저 브라우저 엔진들이 네이티브 자바스크립트 모듈을 지원하기 시작하면서이다.

브라우저에서 네이티브 자바스크립트 모듈을 지원하기 전까지는, JavaScript 모듈화를 네이티브 레벨에서 진행할 수 밖에 없었다. 때문의 개발자들은 번들링(Bundling)이라는 우회적인 방법을 사용할 수 밖에 없었다.

때문에 개발 서버를 실행할 때 오랜 시간이 걸릴 수 있으며, 편집한 코드가 브라우저에 반영되기 까지 수 초 이상의 시간이 소요되기도 했다.

<br />

## Vite는 어떻게 빠른 속도를 가질 수 있는가?

vite는 이를 해결하기 위해 내용이 바뀌지 않을 Plain JavaScript 소스 코드를 Go로 작성된 Esbuild를 사용하여 사전번들링하고, JSX, CSS와 같이 컴파일이 필요하고 수정이 잦은 Non-plain JavaScript 소스 코드에 대해서는 Native ESM을 이용하여 코드를 편집하자마자 브라우저가 변경될 수 있도록 만들었다. (하지만 사전번들링 시 Esbuild는 아직 불안정하기 때문에 Rollup을 사용하고 있다.)

![](https://velog.velcdn.com/images/te-ing/post/3953e6c3-87a8-430a-aa0a-5c5c5b15e524/image.png)

Native ESM은 소스코드를 제공하는 방식을 사용하는데, 개발 서버를 구동할 때, 애플리케이션 내 모든 소스 코드에 대해 크롤링 및 빌드 작업을 마쳐야지만이 실제 페이지를 제공할 수 있었던 번들러 기반의 도구와 달리, 브라우저가 삽입 구문을 찾고 HTTP로 해당 모듈을 요청하고, 요청된 모듈과 모듈의 가져오기 트리에 있는 모든 잎 노드에 변환을 적용한 다음 이를 브라우저에 제공하는 방식이다.

<br />

## 그렇다면 Vite에는 장점만 있는 것일까?

일반적으로 자주 사용하는 번들러인 CRA의 경우, jest, svg-loader 등이 기본적으로 설치되어 있으며 eslint, prettier 등을 바로 설치해서 사용할 수 있다.

하지만 Vite의 경우 jest, svg-loader 등을 하나하나 설치해줘야 하며 eslint, prettier, favicon 등을 사용할 때 플러그인을 별도로 설치해줘야 한다.

하지만 웹팩에 추가 설정을 하기 위해 craco와 같은 라이브러리로 조작해야하는 CRA에 비해 자체적으로 config를 수정할 수 있도록 지원하여 손쉬운 절대경로 설정이 가능하며 CRA의 대부분의 기능을 대체할 수 있으므로, 다음 프로젝트를 기획하고 있다면 CRA 대신 Vite를 사용해보는 것을 적극 권장한다.

<br />

---

## 참고자료:

[vitejs-kr](https://vitejs-kr.github.io/guide/why.html), [TOAST UI](https://ui.toast.com/weekly-pick/ko_20220127) [https://wonillism.tistory.com/271](https://wonillism.tistory.com/271)
