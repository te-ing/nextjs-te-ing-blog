---
title: http에서의 안전한 통신을 위한 payload 암호화
description: HTTP를 사용하는 Node.js, React에서 HTTPS를 모방한 로직을 통해 보안성을 높인 개발과정
tags: [http]
category: 구현/설계
---

> 💡 현재 개발중인 블로그 페이지에서 회원가입 기능을 넣으려 하는데, 아직 HTTPS를 사용하지 않아 payload에서 중요정보들이 그대로 노출될 수 밖에 없었다.
> 따라서 HTTPS를 모방한 아래와 같은 로직을 통해 보안성을 높이려 하였다.

1. 로그인 시도 시 비대칭키 암호화키를 받는다.
2. 해당 암호키로 중요한 정보(패스워드)를 암호화한다.
3. 암호화된 payload를 서버로 보낸다.
4. 서버는 암호화를 복호화하여 아이디와 비밀번호를 확인한다.
5. 아이디와 비밀번호를 검증한 후 대칭키로 암호화 한 토큰과 리프레쉬 토큰을 보낸다.
6. 해당 토큰을 통해 서버와 주고 받는다.

<br >

## 사전지식

### HTTPS

HTTP는 암호화되지 않은 통신이며, 변조 가능하고 통신 상대를 확인하지 않아 위험하다. 보통 이를 보완하기 위해 SSL 인증서를 이용한 HTTPS 프로토콜을 사용하는데, HTTPS는 암호화와 복호화를 할 수 있는 서로 다른 키(공개키, 개인키)를 이용한 암호화 방법이다.
사용자의 데이터를 공개키로 암호화 한 후 서버로 전송하는데, 이 과정에서 데이터를 가로채도 개인키가 없다면 복호화를 할 수 없다. 전송받으려는 서버는 개인키를 통해 복호화하여 요청을 처리한다.

**HTTPS 통신과정**

서버의 공개키가 담긴 암호화된 SSL 인증서를 클라이언트에게 보내면 브라우저는 내장된 CA 공개키로 암호화된 인증서를 복호화하여 인증서가 믿을만 한지 확인하고 서버의 공개키를 획득한다.

브라우저는 공개키로 대칭키를 암호화하여 서버로 전송하고, 서버는 서버의 비밀키로 이 값을 복호화하여 연결에 사용하는 고유한 세션키를 생성한다.

이렇게 만들어진 세션키로 브라우저 간 대칭키 암호화 통신을 진행하고, HTTPS 통신이 완료되는 시점에서 서로 공유된 세션 키를 폐기한다.

### 비대칭키 암호화

암호로 만들어주는 암호키와 암호를 풀어주는 복호화키가 있을 때, 비대칭키 암호화는 암호키와 복호화키가 다른 암호화 방식이다. 암호화와 복호화를 하나의 키로 사용하는 대칭키와 달리, 비대칭키는 암호화와 복호화키가 다르기 때문에 암호화키가 유출되어도 암호화된 값이 유출되지 않는다.

### 단방향 암호화

단방향 암호화는 암호로 만들어주는 암호키가 존재하지만, 암호를 풀어주는 복호화키가 존재하지 않는 암호화 방식이다. 따라서 어떤 값인지 파악할 필요없이 해당 값이 존재하는지 확인할 때 사용된다.

2011년 이전까지 권장 해시 표준이던 SHA-1은 암호화 알고리즘은 중간에 데이터를 가로채 파일을 위변조 할 수 있는 보안취약점이 발견되어 현재 사용되지 않으며 지양해야 한다.

<br >

## Node.js(서버)에서 비대칭키(RSA)를 이용한 암호화 기능 구현

```tsx
import crypto, { createPrivateKey, createPublicKey } from 'crypto';
import bcrypt from 'bcryptjs';

const privateKey = createPrivateKey(
  process.env.RSA_PRIVATE_KEY.replace(/\\n/g, '\n')
);
const publicKey = createPublicKey(
  process.env.RSA_PUBLIC_KEY.replace(/\\n/g, '\n')
);

export const encodeRSA = (text: string) => {
  const buffer = Buffer.from(text);
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString('hex');
};

export const decodeRSA = (text: string) => {
  const buffer = Buffer.from(text, 'hex');
  const decrypted = crypto.privateDecrypt(privateKey, buffer);
  return decrypted.toString('utf8');
};

export const encodeHash = (text: string, saltLength = 10) => {
  const salt = bcrypt.genSaltSync(saltLength);
  const hashedText = bcrypt.hashSync(text, salt);
  return hashedText;
};
```

**[Oline RSA Key Generator](https://travistidwell.com/jsencrypt/demo/) 에서 RSA키를 생성한 후,** crypto, bcryptjs를 이용하여 비대칭키 암호화 기능을 구현하였다. crypto는 node에 내장되어 있는 기능이지만 bcryptjs는 별도로 설치하여야 한다.`$ npm i bcryptjs`(타입스크립트`npm i -D @types/bcryptjs`)

또한 비밀번호를 단방향 암호화하기 위해 encodeHash 함수로 만들었는데, 만약에 데이터베이스가 해커에게 털리더라도, 원래의 비밀번호 값을 알 수 없기하기 위함이다. 요새 사이트에서 비밀번호 찾기를 하면 기존 비밀번호를 알려주는 것이 아닌 새로운 비밀번호 값을 입력하라고 하는데, 비밀번호를 단방향 암호화해서 저장하기 때문이다.

<br >

## React(클라이언트)에서 비대칭키(RSA)를 이용한 암호화 기능 구현

```tsx
import { getPublicKey } from 'api/auth.api';
import { publicEncrypt } from 'crypto';

export const rsaEncode = async (text: string): Promise<string> => {
  const publicKey = await getPublicKey();
  const buffer = Buffer.from(text);
  const encodedText = publicEncrypt(publicKey, buffer).toString('hex');
  return encodedText;
};
```

리액트에서는 crypto 라이브러리를 사용하여 비대칭 암호화 기능을 구현했다. 클라이언트에서는 crypto가 내장되어있지 않으므로 crypto-js와 같은 별도의 라이브러리를 설치해줘야 한다. `$ npm i crypto-js`(타입스크립트`npm i -D @types/crypto-js`)

또한 암호키는 언제든 변동될 수 있어야 하기 때문에 암호화 할 때 마다 `getPublicKey API`를 통해 서버에서 받아오도록 구현하였다.

<br >

## 구현 결과

![](https://velog.velcdn.com/images/te-ing/post/bbd9ad25-9364-4156-b985-f327d5916907/image.jpg)

API 통신시 보내는 password는 RSA로 암호화되어 보내지고 있고, 데이터베이스에는 해시값으로 단방향 암호화되어 보관되어 있다. 로그인 시에는 RSA 복호화를 통해 해시값으로 변환한 후, bcrypt 라이브러리로 데이터베이스의 비밀번호와 일치하는지 확인하여 로그인 성공 여부를 반환한다.

따라서 서버의 복호화키가 유출되지 않는다면 유저의 비밀번호는 알 수 없고, 복호화키가 유출되더라도 해당 사이트 외에는 유저의 비밀번호를 사용할 수 없도록 하여 상대적으로 안전한 로그인을 구현하였다.

<br>

---

참고사이트: https://charming-kyu.tistory.com/9
