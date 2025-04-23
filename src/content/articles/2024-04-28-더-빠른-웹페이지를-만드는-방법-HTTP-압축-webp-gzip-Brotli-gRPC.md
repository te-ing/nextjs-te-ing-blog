---
title: 더 빠른 웹페이지를 만드는 방법::HTTP 압축 - webp, gzip, Brotli, gRPC
description: 최적화를 덮어놓고 개발을 하다보면 위에서 말한 임계치가 넘어서곤 하는데, 이때 웹페이지를 더 빠르게 할 수 있는 방법을 공유하려 한다. 어떻게하면 더 빠르게 만들 수 있을까?
tags: [HTTP, grpc, gzip, brotli, protobuf, webp]
---

좋은 사용자경험을 위해서는 가장 큰 요소(LCP)가 2.5초 이내 혹은, 의미있는 콘텐츠(FMP)가 1.8초 이내에 일어날 수 있도록 권장하고 있다.
최적화를 덮어놓고 개발을 하다보면 위에서 말한 임계치가 넘어서곤 하는데, 이때 웹페이지를 더 빠르게 할 수 있는 방법을 공유하려 한다.

어떻게 하면 더 빠르게 만들 수 있을까?

# HTTP 압축

# 파일 포맷 압축

<img src="https://www.gstatic.com/webp/gallery/1.sm.jpg" />

JPEG 파일 크기: 43.84KB

<img src="https://www.gstatic.com/webp/gallery/1.webp" />

WebP 파일 크기: 29.61KB

### webp

가끔 이미지를 다운받으면 볼 수 있는 webp 확장자는 2010년 구글에서 만든 이미지포맷으로, JPEG, PNG, GIF를 대체할 수 있도록 손실, 무손실 압축 방식을 모두 지원하며, 기존 포맷대비 약 30% 정도 압축률이 좋다. 때문에 자주 사용하는 이미지들은 webp 포맷을 사용하면 네트워크 속도를 높일 수 있다.

<br />

> 손실, 무손실 압축에 대해 짧게 설명하자면, JPEG와 같은 포맷은 사용자가 알아채기 힘들 정도의 데이터를 버리면서 압축하며, PNG와 같은 포맷은 데이터를 버리지 않고 압축한다. 오래된 고전 짤들이 여기저기 옮겨다니며 손실 압축이 반복되어 디지털 풍화가 생기기도 한다.

(디지털풍화 예시)

![](https://velog.velcdn.com/images/te-ing/post/f412948a-9941-4e14-9ab8-d6f51a8b3a15/image.png)

<br />

## 종단간 압축

웹서버에서 압축된 리소스를 보낸 후 브라우저에서 압축을 풀어 사용하는 방식이다. 압축된 더 작은 크기의 데이터를 보내면서 네트워크 요청과정을 빠르게 하는 것이다.

### gzip

가장 흔히 사용하는 것은 gzip 방식으로, 최대 70%까지 데이터를 압축할 수 있다. 중복되고 필요없는 코드를 압축하여 동작하며, 압축단계를 조절할 수도 있다.
사용방식은 서버에서 nginx 혹은 apache 설정을 통해 비교적 간편하게 사용할 수 있다.

### Brotli

구글에서 만든 압축 알고리즘인 Brotli은 gzip에 비해 최대 20% 더 압축할 수 있다고 한다. gzip과 마찬가지로 서버에서 nginx 혹은 apache 설정을 통해 사용할 수 있으며, ie에서는 동작하지 않는다.

### gRPC

![](https://velog.velcdn.com/images/te-ing/post/66b63725-867d-4480-a0bf-b63e4b519744/image.png)

gRPC는 HTTP/2, Protocol Buffers를 사용하여 데이터를 압축하여 통신한다. HTTP/2 프로토콜을 통해 여러 요청을 동시에 처리할 수 있으며 ProtoBuf는 xml보다 3~10배 작다고 할 정도로 Protocol Buffers를 통해 데이터를 압축할 수 있다.

드라마틱하게 압축할 수 있는 이유는 위처럼 이진 데이터 구조를 사용하기 때문인데, 우리가 주로 사용하는 방식인 REST에서는 데이터를 주고받는 포맷으로 xml, json을 사용한다.
하지만 ProtoBuf는 '00001...'과 같이 이진 데이터 구조로 만들어 전달하고, 이진 데이터를 다시 변환하여 사용한다.

때문에 gRPC를 사용하기 위해서는 아래처럼 이진 데이터를 만들고 해제할 수 있는 포맷을 만들어야 하며, 데이터를 주고받는 동안 이진데이터 형식이기 때문에 사람이 읽을 수 없다는 단점이 있다.

```
message Person {
    required string user_name        = 1;
    optional int64  favourite_number = 2;
    repeated string interests        = 3;
}
```

---

## 참고자료:

[Compression in HTTP](https://developer.mozilla.org/ko/docs/Web/HTTP/Compression), [google webp](https://developers.google.com/speed/webp/gallery1?hl=ko), [Protocol Buffer 원리로 배우는 고성능 직렬화, 역직렬화 전략](https://jeong-pro.tistory.com/190), [[네이버클라우드 기술&경험] 시대의 흐름, gRPC 깊게 파고들기](https://medium.com/naver-cloud-platform/nbp-%EA%B8%B0%EC%88%A0-%EA%B2%BD%ED%97%98-%EC%8B%9C%EB%8C%80%EC%9D%98-%ED%9D%90%EB%A6%84-grpc-%EA%B9%8A%EA%B2%8C-%ED%8C%8C%EA%B3%A0%EB%93%A4%EA%B8%B0-1-39e97cb3460)
