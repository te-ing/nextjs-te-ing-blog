---
title: 빌드시간 개선을 위한 CRA to Vite Migration
description: CRA → Vite Migration 빌드시간과 함께 Vite보다 CRA가 더 빠를 수 있는 상황에 대해 공유합니다.
slug: cra-to-vite-migration
tags: [CRA, Vite]
---

현재 CRA를 기반으로 만들어진 패키지로 웹뷰 서비스를 배포하고 있는데요. 기존까지는 큰 문제가 없었지만, 클라우드 서버 내에서 빌드를 하게 되면서 빌드시간이 2~3배 증가하는 문제가 생겼습니다. 때문에 빌드시간 단축을 위해 CRA의 Webpack v5에서 Vite 로 Migration을 시도했는데요. CRA에서 Vite로 변경했을 때의 빌드시간과 함께 이때 발생한 문제점에 대해 공유드리려 합니다.

> **왜 Vite를 사용하나요?**
> Vite는 사전빌드를 거친 후 [Native ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)을 사용하여 배포하는데, 개발단계에서는 Go로 작성된 Esbuild를 사용해서 Webpack, Parcel과 같은 기존의 번들러 대비 10-100배 빠른 속도를 제공합니다. 다만, 확장성과 안정성을 위해 배포시에는 Rollup을 기반으로한 사전 빌드를 거칩니다.
> ⠀
> CommonJS를 통하여 빌드할 뿐만 아니라 필요하지 않은 설정까지 포함된 CRA에 비해 Vite는 더 가볍고 빠르기 때문에 최근 [CRA보다 Vite를 사용하는 추세](https://github.com/reactjs/react.dev/pull/5487)입니다.

 <br />

## **Vite를 사용하여 빌드한 결과**

기존 CRA의 환경변수와 플러그인을 Vite로 변경하고, Vite Migration을 위해 몇가지 수정을 거친 후 테스트를 진행하였습니다.

그 결과 꽤 극적인 결과가 나타났습니다.

>

- 기존 CRA의 Webpack을 사용한 빌드시간
  - 1 min 35 sec total from scheduled to completion.
- Vite 변경 후 빌드시간 (기존 대비 약 67% 빠름) - 31 sec total from scheduled to completion.
  ⠀
- 기존 CRA의 Webpack을 사용한 클라우드 서버 빌드시간
  - 4 min 8 sec total from scheduled to completion.
- Vite 변경 후 클라우드 서버 빌드시간 (기존 대비 약 57% 빠름)
  - 1 min 47 sec total from scheduled to completion.

<br />

## **구형 브라우저 지원이 필수적인 웹뷰 환경**

그러나 여기에는 한가지 간과한 부분이 있었습니다. Vite v5는 [네이티브 ES 모듈](https://caniuse.com/es6-module), [네이티브 ESM의 동적 Import](https://caniuse.com/es6-module-dynamic-import), 그리고 [`import.meta`](https://caniuse.com/?search=import_meta) 을 지원하는 브라우저를 타깃으로 하고 있습니다. ([Vite 브라우저 지원 현황](https://ko.vitejs.dev/guide/build.html#browser-compatibility))

하지만 웹뷰 특성상 여러 기기에서 사용하기 때문에 오래된 브라우저에 대한 지원이 필수적입니다. 실제로 간혹 Object.fromEntries 와 css gap 속성을 사용하지 못하는 기기로 인해 문제가 생기기도 했습니다.

때문에 [@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy) 를 사용하여 오래된 브라우저를 위해 폴리필 해줘야만 하는데요. last 2 versions and not dead, > 0.3% 으로 폴리필 한 결과 다음과 같은 결과가 나타났습니다.

>

- Vite 구형 브라우저 폴리필 지원 후 빌드시간 (기존 대비 약 24% 빠름)
  - 1 min 12 sec total from scheduled to completion.
- Vite 구형 브라우저 폴리필 지원 후 클라우드 서버 빌드시간 (기존 대비 약 79% 느림)
  - 7 min 24 sec total from scheduled to completion.

<br />

### 클라우드 서버에서 좋지 않은 결과를 보여주는 이유는?

Native ESM를 사용하는 Vite와는 달리, CRA의 Webpack은 CommonJS를 사용하고 있기 때문에 구형 브라우저에 대한 지원율이 높습니다. 하지만 Vite의 경우 더 많은 폴리필을 지원해야 하기 때문에 같은 커버리지를 지원하면서도 상대적으로 빌드 시간이 더 오래 걸리게 되는 것인데요.

그럼에도 로컬 빌드 시 조금 더 빠른 성능을 보여주는 이유는 Vite의 배포 빌드 시 사용하는 Rollup은 Rust로 쓰여진 SWC를 파서로 사용하고 있기 때문에([https://github.com/rollup/rollup/pull/5073](https://github.com/rollup/rollup/pull/5073))  성능이 좋은 멀티코어 환경에서는 조금 더 빠른 성능을 보여주지만, 성능이 좋지않은 클라우드 서버 환경에서는 매우 느린 결과를 보여주고 있다고 추측합니다.

<br />

## **결론**

구형 브라우저까지 지원할 필요가 없는 환경이거나,  멀티코어 성능이 좋은 환경에서 빌드를 해야 한다면 Vite는 좋은 선택이 될 것 입니다. 다만 웹뷰와 같이 많은 사용자에 대한 지원이 필요한 환경이라면 빌드속도를 위해 Vite를 선택하는 것은 그리 효과적이지 않을 수 있습니다.
