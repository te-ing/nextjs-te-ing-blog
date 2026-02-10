---
title: 클로드는 어떻게 동작하는가(How Claude Code Works)
description: Jared Zoneraich(PromptLayer CEO)가 Claude Code의 아키텍처를 해부하며, 어떻게 동작하는지를 발표한 유튜브 영상을 정리하였습니다.
tags: [AI, Claude]
private: true
---

> 본 포스팅은 AI Engineer 채널의 [How Claude Code Works - Jared Zoneraich, PromptLayer](https://youtu.be/RFKCzGlAU6Q?si=w0L2qWPnJv7Fv7hB) 유튜브 영상을 보고 정리한 글입니다. 본 영상은 Anthropic과의 제휴관계가 없으며 Anthropic을 대변하지 않습니다. AI 엔지니어링 회사의 CEO 이자 Claude의 열렬한 사용자로서 자신의 의견을 발표하는 것입니다.

## Core Philosophy: Simple Architecture & Better Models (핵심 철학: 단순한 아키텍처 & 더 나은 모델)

![HowClaudeCodeWorks06:18](/images/HowClaudeCodeWorks06:18.png)

오늘날 모델의 결함을 과도하게 엔지니어링 하지 마세요. 많은 것들이 그냥 나아지고 시간낭비가 될 것입니다.

> \*RAG(Retrieval-Augmented Generation: 검색증강생성으로, 답변을 생성하기 전, 검색을 통해 답변을 보강하는 프로세스)
> grep: 문자열을 찾아내는 리눅스 명령어

Cursors는 RAG를 가져와서 섞고 있긴합니다. 하지만 Claude Code는 이 모든걸 긁어내고 “그냥 더 나은 모델을 만들고 맡기자” 라는 철학을 갖고 있다고 생각해요. 도구 호출을 사용하고 도구 호출을 단순화하는 것. 이게 매우 중요한 점입니다.

> *도구: 여기서 자주 등장하는 “도구“는 AI가 코드를 읽고 쓰고 터미널에 접근하는 것(read, grep, bash)과 같이 외부와 상호작용하는 인터페이스를 말합니다. \
> \
> *스캐폴딩(scaffolding): 스캐폴딩은 건설현장의 임시발판이라는 사전적 의미가 있지만, 보통 어떤 것을 시작할 때 도움이나 안내를 제공하는 것을 뜻합니다. 이 영상에서는 AI에게 스캐폴딩을 줄이고, 모델에 의존하라 라고 말하는데, 불필요한 프롬프트로 이것저것 AI를 통제하려 하지말고, 단순한 루프를 쓰고 AI와 모델에 의존하라고 말합니다.

마스터 프롬프트가 세 가지 다른 분기로 나뉘고 다시 네 가지 분기로 나뉘는 워크플로우 대신, 정말 몇 개의 단순한 도구 호출만 있어요. RAG 대신 grep을 포함해서요. 네, 그리고 그게 훈련된 내용이에요. 매우 최적화된 도구 호출 모델들이에요.

![HowClaudeCodeWorks09:34](/images/HowClaudeCodeWorks09:34.png)

이건 파이썬의 선(Zen of Python)인데, 파이썬에서 `import this`를 하면 나오는 거예요. 시스템을 만들 때 이 철학을 정말 좋아하고, Claude Code가 만들어진 방식에 정말 적절하다고 생각해요. 정말: **단순함이 복잡함보다 낫고, 복잡함이 난해함보다 낫고, 평평함이 중첩보다 낫다.** 이게 발표를 관통하는 것이에요. Claude Code가 어떻게 작동하고 왜 작동하는지 알아야 할 전부예요. 단순한 설계가 좋은 설계라는 엔지니어링 원칙으로 돌아가는 거죠.

## The Constitution: Claude.md (헌법: Claude.md)

라이브러리에 대한 지시사항을 넣는 곳이에요. 흥미로운 건, 기본적으로 팀이 "모델이 먼저 레포를 조사하는 시스템을 과도하게 엔지니어링할 필요 없다"고 말하는 거예요. Cursor 1.0이 아시다시피 로컬에서 벡터 DB를 만들어서 레포를 이해하잖아요. 그들은 그냥 "아, 마크다운 파일 하나 넣어. 사용자가 필요할 때 바꾸게 해. 에이전트가 필요할 때 바꾸게 해"라고 하는 거예요. 매우 단순하죠.

## The Core Master Loop (핵심 마스터 루프)

![HowClaudeCodeWorks12:39](/images/HowClaudeCodeWorks12:39.png)

우리가 예전에 에이전트를 만들던 방식을 생각하면 이건 사실 혁명적이에요. 오늘날 모든 코딩 에이전트, Codex, Cursor, Amp 등 전부 도구 호출을 가진 하나의 while 루프예요. 마스터 while 루프를 실행하고, 도구를 호출하고, 다시 마스터 while 루프로 돌아가는 거죠.

기본적으로 네 줄의 코드예요. 도구 호출이 있는 동안 도구를 실행하고, 도구 결과를 모델에 주고, 도구 호출이 없을 때까지 다시 하고, 그러면 사용자에게 뭘 할지 물어보는 거예요.

처음 도구 호출을 사용했을 때, 모델이 언제 도구를 계속 호출해야 하는지, 언제 실수를 고쳐야 하는지를 너무 잘 아는 게 정말 충격이었어요. LLM의 가장 흥미로운 점 중 하나가 실수를 고치고 유연하게 대처하는 것을 정말 잘해요. 모델이 탐색하고 알아내도록 더 맡길수록, 더 나은 모델이 나왔을 때 시스템이 더 좋고 더 견고해질 거예요.
