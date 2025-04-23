---
title: Virtual DOM이 무조건 빠른 것은 아닙니다.
description: 리액트는 Virtual DOM을 사용하기 때문에 빠르다 라는 말은 맞기도 하지만 틀리기도 합니다. 리액트는 왜 Virtual DOM을 사용하고, 스벨트나 SolidJS는 왜 Virtual DOM을 사용하지 않는가에 대해 작성하였습니다.
slug: virtualDOM
tags: [virtualDOM, 가상돔, 리액트]
---

## 리액트의 Virtual DOM 은 무엇인가요?

![https://old.million.dev/blog/virtual-dom](https://velog.velcdn.com/images/te-ing/post/f0b7ed30-a307-46fe-bdb5-da03fd24a880/image.png)

사용자가 클릭과 같은 이벤트를 발생해서 UI가 바뀌었다면, 바뀐 UI를 보여주기 위해 DOM이 리렌더링되어야 합니다. 이때 브라우저는 변경된 부분의 DOM 트리를 수정하고 리페인팅과 리플로우 과정을 거쳐 리렌더링 하게 됩니다.
이러한 과정은 많은 비용이 소모되기 때문에 DOM 변경을 최소화하여야 하는데요. 리액트는 Virtual DOM이라는 개념을 사용하여 이러한 과정을 최적화합니다.

리액트는 변경된 DOM이 반영된 자바스크립트로 된 Virtual DOM을 만들고 기존 DOM과 차이점을 비교하여 실제로 바뀐 부분만 교체합니다. 이때 만약 여러 번 DOM을 수정해야 한다면 React Fiber 엔진을 사용해서 한 번에 처리할 수 있도록 최적화를 진행합니다.

<br />

## SolidJS나 스벨트는 Vitrual DOM을 안 쓰는데 더 빠른데요?

### Virtual DOM이 무조건 빠른 것은 아닙니다.

"리액트는 Virtual DOM을 사용하기 때문에 빠르다" 라는 말은 맞기도 하지만 틀리기도 합니다.
Virtual DOM을 생성하고 비교하는 과정을 거치기 때문에 직접 DOM을 수정하는 것보다 빠를 수는 없습니다. 다만 Virtual DOM이 빠른 이유는 최적화를 통해 DOM 접근을 최소화하며, 필요한 부분만 DOM을 수정하기 때문입니다.

실제로 DOM 구조가 단순하고 변경 사항이 적은 경우, Virtual DOM의 Diffing 과정이 오히려 성능 부담이 될 수 있습니다. 브라우저 기본 렌더링만으로 충분히 효율적입니다.

스벨트나 SolidJS가 빠른 이유는 Virtual DOM을 사용하지 않는 대신에 컴파일 단계에서 최적화를 하기 때문입니다. 컴파일 단계에서 각 컴포넌트를 분석하여 정적 분석을 수행하고, 필요한 DOM 조작만 수행하도록 최적화해서 리액트보다 빠른 성능을 보여줄 수 있는 것이에요.

Vue.js도 Virtual DOM을 사용하고 있지만, 컴파일 과정에서 Virtual DOM의 최적화를 진행하는 하이브리드 접근 방식([Compiler-Informed Virtual DOM](https://ko.vuejs.org/guide/extras/rendering-mechanism?utm_source=chatgpt.com#compiler-informed-virtual-dom))을 사용하여 더 빠른 성능을 이끌어 냅니다.

<br />

### 그럼 리액트도 컴파일 단계에서 최적화를 하면 되는 거 아닌가요?

컴파일 단계에서 최적화하는 방식에도 단점이 있습니다. 컴파일 단계에서 코드가 변경되기 때문에 코드를 예측하기 힘들 뿐 아니라, 런타임에서 실행되는 코드에 대해서는 최적화를 할 수 없다는 단점이 있습니다. 또한 대부분의 라이브러리가 리액트를 포함한 Virtual DOM을 사용하는 주류 생태계에 맞춰져 있기 때문에 상대적으로 컴파일 단계의 최적화는 라이브러리 호환성이 떨어지게 됩니다.

---

자료 출처 \
https://yozm.wishket.com/magazine/detail/1176/ \
https://svelte.dev/blog/virtual-dom-is-pure-overhead \
https://old.million.dev/blog/virtual-dom \
https://ui.toast.com/posts/ko_20220331 \
https://itchallenger.tistory.com/822 \
