---
title: 전역상태를 사용하지 않고 props drilling을 없애보자::Observer Component
description: 섬세한 ISFP의 코드 가독성 개선 경험 을 보고 구현해본 Observer Component
tags: [bubbling, HOC, Observer]
---

> [섬세한 ISFP의 코드 가독성 개선 경험](https://if.kakao.com/2022/session/80)에서 가독성 향상을 위해 사용한 ObserverComponent을 통해 전역상태관리 라이브러리 의존 낮추기

<br />

요즘 개발을 할 때 편리함과 가독성이라는 이유로 recoil을 애용하고 있는데, 끝없이 늘어나는 atom과 리코일 import문을 보면서 전역상태관리 라이브러리에 너무 의존하고 있다는 생각이 들었다. 그러던 중 [섬세한 ISFP의 코드 가독성 개선 경험](https://if.kakao.com/2022/session/80)에서 ObserverComponent를 보게 되었는데 영상에서 나온 패턴에 어떤 장점을 가지고 있는지 궁금했기도 했고, 전역상태관리를 어느정도 대체할 수 있을거라 생각되어 직접 구현해보았다.

### Observer Component

Observer Component는 이벤트핸들러를 정의한 뒤, 하위 컴포넌트의 Observed Component에서 발생하는 이벤트 버블링을 캡쳐하여 정의한 이벤트핸들러를 실행하는 패턴이다.

<br />
구현내용은 다음과 같다.

- HOC패턴을 사용하여 obsevedComponent를 만드는 Observer Component를 구현한다.
- data-click-log와 data-click-param을 갖는 observered component를 생성한다.
- App 컴포넌트에서 이벤트핸들러를 정의한다.
- onClick 이벤트에서 id가 data-click인 경우, 해당 클릭이 일어난 components 정보와 이벤트 정보를 가져온다.
- 해당 컴포넌트의 데이터를 바탕으로 정의된 이벤트를 실행한다

여기서 HOC(higher-order-components)는 컴포넌트를 가져와 새 컴포넌트를 반환하는 함수이며, 현대 React에서는 주로 사용되지는 않는다고 한다. [higherOrderComponent](https://ko.legacy.reactjs.org/docs/higher-order-components.html)

<br />

직접 만들며 느낀 장점은 이벤트 버블링을 이용하기 때문에 props를 전달하지 않아도 된다는 점, 단점은 최상위 컴포넌트에서 이벤트를 정의, 관리 번거로움이 있다는 것이 있었다.

---

### 구현 코드

타입스크립트를 사용하였고, 영상에서 모든 코드가 나오지 않기 때문에 임의로 작성/수정한 코드가 많다.

### ObserberComponent

```tsx
export default function ObserberComponent<P extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<P>,
  handleEvent: (event: { [key: string]: string } | string) => void
) {
  function Observer(props: P) {
    return (
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          const target =
            ((e.target as HTMLElement)?.closest(
              '[data-click-log]'
            ) as HTMLElement) || null;
          if (!target) return;
          handleEvent(
            extractParams({
              el: target,
              paramTarget: 'data-click-log',
              paramLabel: 'data-click-param',
            })
          );
        }}
      >
        <Component {...props} />
      </div>
    );
  }
  return Observer;
}

interface ExtractParams {
  el: HTMLElement;
  paramTarget: string;
  paramLabel: string;
  depth?: number;
}

/** @description i번째의 부모 엘리먼트까지 paramTarget 있는지 체크한 뒤 paramLabel으로 구별하여 객체를 반환한다. */
const extractParams = ({
  el,
  paramTarget,
  paramLabel,
  depth,
}: ExtractParams): { [key: string]: string } => {
  if (!el) return {};
  let paramEl = el;
  const params = {};
  const param = `[${paramTarget}]`;

  for (let i = 0; i < (depth || 3); i++) {
    const paramsEl = paramEl.closest(param);
    if (!paramEl || !paramEl?.parentElement) break;
    const targetAttribute = paramsEl?.getAttribute(paramTarget);
    const labelAttribute = paramsEl?.getAttribute(paramLabel);
    if (!targetAttribute || !labelAttribute) break;
    Object.assign(params, { [labelAttribute]: targetAttribute });
    paramEl = paramsEl?.parentElement!;
  }
  return params;
};
```

<br />

### ObserverComponent를 정의하는 App 컴포넌트

```tsx
const ObservedFirstPage = ObserberComponent(FirstPage, arg => console.log(arg));

function App() {
  return (
    <div>
      <ObservedFirstPage />
    </div>
  );
}

export default App;
```

<br />

### data-click-param과 data-click-log 속성을 가진 FirstPage

```tsx
export default function FirstPage() {
  return (
    <div data-click-param="First Page Param" data-click-log="First Page Log">
      FirstPage
      <button type="button">Fist Page Button</button>
      <SecondPage />
    </div>
  );
}
```

버튼 클릭 시 `{ First Page Param ****: "First Page Log" }` console 출력

<br />

### data-click-param과 data-click-log 속성을 가진 FirstPage 내부의 SecondPage

```tsx
export default function SecondPage() {
  return (
    <div data-click-param="Second Page Param" data-click-log="Second Page Log">
      SecondPage
      <button type="button">Second Page Button</button>
    </div>
  );
}
```

버튼 클릭 시 `{Second Page Param: 'Second Page Log', First Page Param: 'First Page Log'}` console 출력
