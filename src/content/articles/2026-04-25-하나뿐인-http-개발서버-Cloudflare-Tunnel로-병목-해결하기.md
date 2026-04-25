---
title: '하나뿐인 http 개발서버, Cloudflare Tunnel로 병목 해결하기'
description: '단일 사내 개발 서버로 인한 배포 충돌과 HTTP-only 환경의 검수 차단 문제를 해소하기 위해, Docker와 Cloudflare Tunnel을 조합한 1인용 임시 HTTPS 배포 스크립트를 직접 만든 과정을 공유합니다.'
tags: [Docker, Cloudflare, Nginx, DX]
private: true
---

저희 회사에서는 개발자가 작업물을 개발 서버에 배포한 뒤, 기획자에게 링크를 공유하는 방식으로 개발이 진행되고 있습니다.

다만 이 방식에는 한 가지 불편함이 있었는데요. 개발 서버가 하나뿐이다 보니, 하나의 프로젝트를 여러 개발자가 동시에 진행할 경우 A 개발자의 작업이 검수되는 동안 B 개발자는 대기해야 하는 병목이 발생하였습니다. 뿐만아니라 검수 중인 상태에서 B 개발자의 작업이 함께 반영되면서 결과물이 뒤섞이는 문제도 종종 발생했어요.

여기에 한 가지 더 큰 문제가 있었는데, 사내 개발 서버는 HTTP로 운영되고 있었다는 점입니다. "안전하지 않은 사이트"라며 차단되는 것을 우회하도록 기획자에게 설명해주어야 했고, HTTP로 인해 아예 동작 자체가 막히는 경우도 있었습니다.

## Cloudflare Tunnel과 Docker를 선택한 이유

가장 근본적인 해결 방법은 역시 서버팀에 개발 서버 구조를 개선해 달라고 요청하는 것이었습니다. 하지만 이러한 방식을 지금까지 사용해온 이런 저런 사정과 이유로 인해, 다른 방식을 찾아야 했습니다.

그래서 “서버에서 지원해주지 않는다면, 내가 직접 배포 환경을 만들자”는 방향으로 접근하게 되었고, HTTPS 기반으로 개별 배포 환경을 구성하려고 했습니다. 그 과정에서 알게 된 것이 바로 **Cloudflare Tunnel**이었습니다.

### Cloudflare Tunnel이란

이전에 배포과정에서 HTTPS 인증서를 발급받고 갱신하는 과정이 꽤나 귀찮았었던 경험이 있었습니다. 이를 쉽게 할 수 있는 방법을 찾다 알게된 Cloudfare Tunnel은 인증서 없이도 아주 쉽게 HTTPS로 배포할 수 있게 해주는 도구였는데요.

쉽게 말하자면 **외부에서 접속할 수 있는 안전한 터널을 로컬 서버에 뚫어주는** 도구입니다.

내 컴퓨터(로컬 서버)에서 먼저 Cloudflare 쪽으로 터널을 만들어두고, 외부에서 접속하면, 요청이 터널을 따라 로컬 서버까지 전달됩니다. 덕분에 서버에 포트를 열거나 복잡한 네트워크 설정을 할 필요가 없습니다.

또한 HTTPS 설정도 자동으로 처리되는데요. Cloudflare 쪽에서 보안을 담당해주기 때문에, 별도로 인증서를 설정하지 않아도 안전하게 접속할 수 있습니다.

일반적인 사용법은 Cloudflare 계정과 도메인을 연결하고 영구적인 URL을 쓰는 것이지만, 임시링크로만 충분하다면 아무런 절차없이 무료로 사용할 수 있는 trycloudflare를 사용할 수 있기 때문에 최적의 도구였습니다.

## 쉘스크립트와 Docker를 통해 쉽게 사용할 수 있도록 만들기

이 방식을 팀원들도 쉽게 사용할 수 있도록 하고 싶었습니다. 다만, 인프라에 익숙치 않은 팀원들에게 cloudflared, nginx 같은 생소한 개념을 설명하기보다는, 쉘스크립트로 명령어 한번으로 배포되는 간단한 구조를 만드려 했습니다. 또한 도커를 통해 배포하는 것이 이런저런 환경적인 문제를 겪지 않고 쉽게 사용할 수 있을거라 생각했습니다.

### Docker에 익숙하지 않은 팀원을 위한 가이드

스크립트를 잘 만들어도, 그걸 사용해야 하는 팀원이 진입 장벽을 느끼면 결국 1인용 도구로 끝나버립니다. README는 "Docker가 뭔지 몰라도 따라할 수 있도록" 작성하는 데 신경을 썼습니다.

### 도커를 몰라도 쓸 수 있도록, 이미지 자동 정리

```sh
# deploy.sh
cleanup() {
  docker stop "$CONTAINER_NAME" 2>/dev/null || true
  docker rm "$CONTAINER_NAME" 2>/dev/null || true
  docker rmi "$IMAGE_NAME" 2>/dev/null || true
  docker image prune -f --filter "label=project=westin-ird-user-tunnel" 2>/dev/null || true
}

trap cleanup EXIT
```

```Dockerfile
# Dockerfile
FROM nginx:alpine
LABEL project=westin-ird-user-tunnel
```

처음 Docker를 잘 모르던 시절, 작업이 끝난 뒤에도 이미지와 컨테이너를 정리하지 않아 용량이 가득 차던 경험이 있었습니다. 때문에 같은 일을 팀원들이 겪지 않도록, 스크립트가 종료되는 순간 컨테이너와 이미지가 알아서 정리되게 만들었습니다.

## 링크가 안열려요!

해당 배포과정을 시도하면서 문제도 물론 있었습니다. `trycloudflare`는 임시링크이기 때문에 링크가 계속 바뀌거나 닫히곤 했는데요. 이를 방지하기 위해 다음과 같은 것들을 고려하며 보완해나갔습니다.

### 유휴 타임아웃 방지를 위한 Keep-alive

```sh
# entrypoint.sh
keepalive() {
  while true; do
    sleep 180
    curl -s -o /dev/null http://localhost:80/ || true
  done
}
```

배포 후에 점심을 먹고 돌아오면 가끔 503 오류가 뜨는 문제가 있었는데요. 처음에는 원인을 몰라서 한참 헤맸습니다. 이 문제의 원인은 `trycloudflare`은 트래픽이 일정 시간 없으면 터널을 끊어버리기 때문에 발생한 문제였는데요.

이를 해결하기 위해 3분 간격으로 컨테이너 내부에서 `localhost`로 핑을 보내 터널이 닫히지 않도록 조치했습니다.

### 배포없이 업데이트 할 수 있도록

```sh
# update.sh
docker cp build/. "$CONTAINER_NAME":/usr/share/nginx/html/
```

작업 검수과정에서는 "여기만 살짝 고쳐주실 수 있을까요?"라는 요청을 심심치않게 받게 됩니다. 이때 수정 후, 배포 스크립트를 다시 실행하면 컨테이너를 재시작해버려 새로 발급된 URL을 공유해야만 했습니다. 때문에 이 번거로운 과정을 해결하고자 별도의 업데이트 스크립트를 추가했습니다.

`docker cp`로 컨테이너 안의 정적 파일만 교체하기 때문에 nginx는 다음 요청부터 새 빌드를 서빙하고, 터널 URL은 그대로 유지됩니다. 기획자는 새로고침만 하면 됩니다.

## 포스팅을 정리하며 알아본, 더 가벼운 길

지금까지 설명한 구조는 잘 동작하고, 실제로 팀의 검수 동선을 풀어내는 데 부족함이 없었습니다. 다만 이 글을 쓰며 다시 들여다보니 **Docker도 nginx도 빼고 더 가볍게 만들 수 있는 길**이 있었다는 사실을 알게 되었습니다.

### "별도 설치 없이"라는 표현의 함정

당시에는 "팀원이 nginx, cloudflared를 일일이 설치할 필요 없이 Docker 하나로 묶이는 게 낫다"라고 생각했습니다. 하지만 그 전제 자체에 빈틈이 있었는데, **Docker Desktop이라는 더 큰 설치를 묵시적으로 깔고 있었다**는 점을 간과한 것입니다.

같은 목표는 brew 한 줄로도 충분히 달성 가능했습니다.

```sh
brew install cloudflared
```

리소스 측면에서도 차이가 큽니다.

- Docker Desktop: 1GB 이상의 디스크, 상시 백그라운드 VM, 수 GB 단위의 RAM 점유
- cloudflared 단일 바이너리: 수십 MB, 필요한 순간에만 프로세스 점유

팀이 모두 macOS였고 Homebrew도 일상적으로 쓰는 환경이었기 때문에, "한 번 설치 후 스크립트 한 번이면 끝"이라는 목표는 brew 쪽으로도 동일하게 만족시킬 수 있었습니다.

### nginx도 사실은 대체 가능했다

CORS를 회피하기 위해 리버스 프록시가 필요했고, 그 역할을 nginx가 맡고 있었습니다. 그런데 프로젝트가 이미 Vite 기반이었기 때문에 `vite preview`의 `preview.proxy` 설정으로 정적 서빙과 프록시를 동시에 처리할 수 있었습니다.

```ts
// vite.config.ts
export default defineConfig({
  preview: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://backend.internal',
        changeOrigin: true,
      },
    },
  },
});
```

이렇게 두면 전체 흐름이 다음 세 줄로 줄어듭니다.

```sh
vite build --base=/
vite preview &
cloudflared tunnel --url http://localhost:8080
```

Dockerfile, entrypoint, nginx.conf, 이미지 정리 로직이 통째로 사라집니다. 게다가 dev 모드에서 쓰던 `server.proxy` 설정과 거의 동일한 문법이라 **개발 환경과 검수 환경의 프록시 설정을 동기화하기도 쉬워집니다**.

### 그럼에도 당시 결정을 후회하지는 않습니다

당시에는 cloudflared와 nginx, base path 빌드 옵션처럼 팀원에게 생소한 개념들이 한꺼번에 묶여 있었기 때문에, 그것들을 **Docker라는 익숙한 박스 안에 숨기는 쪽이 더 자연스럽다**고 판단했습니다. 그리고 그 판단대로 도구는 잘 동작했고 팀의 검수 동선은 실제로 풀렸으니, 목적은 충분히 달성된 셈입니다.

다만 같은 문제를 지금 다시 만난다면, **`brew install cloudflared` + `vite preview` 조합으로 가볍게 시작**할 것 같습니다. Docker가 주는 깔끔한 정리감과 격리는 분명한 장점이지만, 이 1인용 검수 도구라는 맥락에서는 "꼭 필요한 무게"보다는 "익숙해서 선택한 무게"에 가까웠다는 것을, 글을 쓰며 비로소 명확히 알게 되었습니다.

## 마무리

대단한 기술적 발견이 있었던 작업은 아니었지만, 단일 서버 + HTTP 환경에 묶여 있던 팀의 검수 동선을 풀어낸 경험으로서 의미가 있었습니다. 그리고 글로 정리하는 과정에서 "당시에는 최선이라고 생각했던 선택에 알고 보니 더 가벼운 길이 있었다"는 사실을 함께 발견할 수 있었는데, 이 또한 회고를 글로 남기는 일의 가치라고 느꼈습니다.

링크 하나 공유하는 데 드는 비용이 줄어드니, 의외로 협업의 결도 가벼워졌습니다.

ㅤ

---

참고 및 출처

- https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/do-more-with-tunnels/trycloudflare/
- https://vite.dev/config/preview-options.html
