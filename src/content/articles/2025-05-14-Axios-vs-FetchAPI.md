---
title: Axios와 Fetch API, 어떤 것을 선택해야 할까요?
description: API 요청을 할 때 가장 많이 사용하는 Axios와 Fetch API, 어떤 것을 선택해야 할까요? 어떻게 등장하고 구현되어 있는지, 그리고 각각의 차이점에 대해 소개합니다.
tags: [fetch, axios, XHR]
---

API 요청을 개발할 때, 우리는 대부분 Axios 혹은 Fetch API를 사용해서 개발하고 있는데요. 각각 어떻게 등장하고 구현되어 있는지, 그리고 각각의 차이점은 무엇인지 알고 계신가요?

![Axios와 Fetch 캐릭터 비교](/images/axiosfetch.png)

## **Axios 파헤치기**

### **XHR과 http 기반의 Axios**

먼저 Axios의 공식 홈페이지를 찾아보면 다음과 같이 나와있습니다.

> **Axios란?**  
> Axios는 node.js와 브라우저를 위한 *[Promise 기반](https://javascript.info/promise-basics)* HTTP 클라이언트 입니다. 그것은 *[동형](https://www.lullabot.com/articles/what-is-an-isomorphic-application)* 입니다(동일한 코드베이스로 브라우저와 node.js에서 실행할 수 있습니다). 서버 사이드에서는 네이티브 node.js의 `http` 모듈을 사용하고, 클라이언트(브라우저)에서는 XMLHttpRequests를 사용합니다.

이 말을 풀어서 말씀드리면, **브라우저와 node.js에서 동일한 라이브러리(코드베이스)를 사용할 수 있다는 뜻**인데요. Fetch API가 등장하기 전까지 브라우저는 **XMLHttpRequest(XHR)**, node.js에서는 **http 모듈**을 사용해야 했습니다. 즉, Axios는 **Fetch API가 아닌 XHR 혹은 http 모듈에 기반한 라이브러리**이고, **노드와 브라우저 두 환경 모두에서 사용할 수 있다는 뜻**입니다.

### **Adapter 패턴으로 구현된 Axios**

그런데 어떻게 같은 코드로 Node와 브라우저에서 동작할 수 있을까요?  
[Axios의 구현부](https://github.com/Axios/Axios/tree/v1.x/lib/adapters)를 살펴보면 **adapter 방식을 사용해서 구현한 것을 볼 수 있습니다.** `lib/adapters`에서 Axios가 요청을 어떻게 보낼지를 결정하기 때문에 각각의 환경에 맞춰 동작할 수 있는 것입니다. 브라우저, 노드뿐만 아니라 Axios v1.7부터는 **Next.js에서 사용하는 fetch의 캐싱 기능을 fetch adapter를 통해서 사용할 수도 있게 되었습니다.**

### **Axios를 사용하는 이유**

Axios를 사용하는 이유에 대해서는 다양합니다. 하지만 가장 큰 이유는 **API 요청을 쉽고 편하게 하기 위해서**인데요. XHR 혹은 http 모듈을 사용하여 API를 요청하는 일은 Axios에 비하면 **꽤나 불편하고 번거로운 일**이었습니다. Fetch API가 자리잡기 전까지, 이러한 번거로움을 해결하기 위해 많은 사람들은 Axios를 사용했습니다. **Fetch API는 브라우저에서는 2015년(ES6), Node.js에서는 2023년(v20)에 정식으로 도입된** 비교적 최신 기술이었거든요.

---

## **Fetch API vs Axios**

Fetch API가 있음에도 왜 사람들은 Axios를 사용하는 걸까요? 먼저 Fetch API의 등장배경에 대해 알아보도록 하겠습니다.

### **Fetch API의 등장배경**

Fetch API는 ES6에서 Promise가 도입된 후 얼마 지나지 않아 등장했는데요. 기존의 복잡한 콜백을 사용해야 하는 **XMLHttpRequest(XHR)**과 달리, **Promise에 기반한 Fetch API는 편리하게 API 요청을 구현할 수 있었습니다.**  
즉, Fetch API가 등장하게 된 이유는 **2000년대 초반에 등장했던 오래되고 불편한 XHR을 대체**하고, 앞으로의 기술 트렌드인 **Promise를 사용하여 개발 생태계의 기준점을 잡으려 한 것**이죠.

### **그런데 왜 Axios는 fetch가 아닌 XHR을 기반으로 동작할까요?**

이미 예측하신 분들도 있겠지만, **최신 기술이 받아들여지기까지는 시간이 걸립니다.** 현재까지도 **구형 브라우저(익스플로러 등)에서는 Fetch API가 지원되지 않았고**, 2015년보다 오래전에 작성되어 동작하는 코드도 매우 많습니다. 따라서 **안정성을 위해 fetch가 아닌 XHR을 기반으로 동작**하는 것입니다.

### **Fetch API가 아닌 Axios를 써야하는 이유**

근데 왜 최근에 만들어진 코드에서도 Fetch API가 아닌 Axios를 쓰고 있을까요? 이 글의 초반부에서 말씀드린 것처럼, 역시나 **Axios의 편의성 덕분**이지 않을까 싶습니다. `Response.json()`와 같은 메서드를 거쳐서 응답을 다뤄야 한다던가, `Response.ok`를 거쳐서 에러를 반환해야 하는 작업들은 **추상화된 Axios에 비하면 꽤나 번거로운 일입니다.** 뿐만 아니라 **XHR에서 기본적으로 지원하는 `timeout`이나 `progress(다운로드 진행률)`도 직접 구현해야 합니다.**

### **왜 Fetch API는 사용성을 고려하지 않았나?**

`timeout`과 같은 기능들은 흔히 사용되는 기능인데 **왜 Fetch API에서는 기본적으로 지원하지 않았을까요?**  
이 부분은 개발자 사이에서도 [뜨거운 논쟁](https://github.com/whatwg/fetch/issues/951)을 일으켰습니다. 그럼에도 Fetch API가 Axios만큼의 사용성을 추가하지 않은 이유는, **Fetch API의 설계 의도가 사용성보다는 확장성과 안정성에 초점이 맞춰져있기 때문입니다.** 옵션을 추가하여 사용성을 향상시키고 강제하는 것보다, **사용자가 필요에 맞춰 확장하고 활용할 수 있도록 한 것**입니다.

더욱이 현재의 timeout은 **요청 자체를 중지하는 것이 아니라**, 요청 후에 응답이 반환되고 있더라도 **단순히 응답을 거부하는 방식**인데요. 때문에 timeout은 아직까지 **불완전한 기능으로 볼 수 있고**, 아직까지 Promise에는 **취소 가능한 표준이 없기 때문에** timeout이 기본적으로 지원되지 않는 것입니다.
[timeout 추가에 대한 Fetch API 개발자의 답변](https://github.com/whatwg/fetch/issues/20)

---

## **그래서 Fetch와 Axios, 어떤 걸 사용해야 하나요?**

어쩌면 이 글에서 **가장 궁금했던 점**이 아닐까 싶은데요. 아쉽게도 **뻔하고 재미없는 답변**을 드려야 할 것 같습니다.

Axios는 현재 **매우 높은 사용률**을 보이고 있고, 추상화뿐만이 아니라 **인스턴스를 포함한 편리한 기능들**을 제공하고 있습니다. 때문에 **안정적인 라이브러리**라고 할 수 있으며, **개발 효율성을 높여주는 최고의 API 라이브러리** 중 하나입니다.

다만 라이브러리를 사용한다는 것 자체가 Axios에 **의존성을 가진다는 점**과, **Promise로 표준화된 앞으로의 개발 생태계**를 생각하면 **Fetch API를 사용하는 것이 최적의 선택일지도** 모르겠습니다.

또한, **Next.js에서 캐싱 기능을 사용하기 위해서는 Axios의 adapter를 사용할 수도 있지만**, 아직까지 Axios의 버전 변경점을 보면 **fetch adapter에 대한 버그 수정의 내용이 많기도** 하고, **Next.js 역시 지속적으로 변화하고 있기 때문에 안정성 측면에서 조심스러운 선택**이기도 합니다.

즉, 여느 vs 포스팅의 결론처럼 **Fetch API와 Axios는 상황에 맞춰서 선택해야 한다고** 말씀드리고 싶습니다. 😅

---

출처

- [https://Axios-http.com/kr/docs/intro](https://Axios-http.com/kr/docs/intro)
- [https://developer.mozilla.org/ko/docs/Web/API/XMLHttpRequest](https://developer.mozilla.org/ko/docs/Web/API/XMLHttpRequest)
- [https://developer.mozilla.org/ko/docs/Web/API/Fetch_API](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API)
- [https://javascript.info/promise-basics](https://javascript.info/promise-basics)
- [the xhr history lesson you never wanted](https://medium.com/hackernoon/the-xhr-history-lesson-you-never-wanted-2c892678f78d)
- [https://nextjs.org/docs/app/api-reference/functions/fetch](https://nextjs.org/docs/app/api-reference/functions/fetch)
- [https://github.com/whatwg/fetch/issues/951](https://github.com/whatwg/fetch/issues/951)
- [https://github.com/whatwg/fetch/issues/20](https://github.com/whatwg/fetch/issues/20)
