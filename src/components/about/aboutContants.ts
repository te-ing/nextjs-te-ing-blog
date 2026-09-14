import type { StaticImageData } from 'next/image';
import bookingEngineDesktop from '../../../public/images/about/booking-engine-desktop.webp';
import bookingEngineMobile from '../../../public/images/about/booking-engine-mobile.webp';
import guestPageWestinParnas from '../../../public/images/about/guest-page-westin-parnas.webp';
import guestPageBanyanTree from '../../../public/images/about/guest-page-banyan-tree.webp';
import mydWebviewAttendance from '../../../public/images/about/myd-webview-attendance.webp';
import mydWebviewPointMall from '../../../public/images/about/myd-webview-point-mall.webp';
import commutePwaApp from '../../../public/images/about/commute-pwa-app.webp';
import commuteBackoffice from '../../../public/images/about/commute-backoffice.webp';
import commuteArchitecture from '../../../public/images/about/commute-architecture.webp';
import aiWorkflowReadme from '../../../public/images/about/ai-workflow-readme.webp';
import vibeCodingRetrospective from '../../../public/images/about/vibe-coding-retrospective.webp';
import howClaudeCodeWorks from '../../../public/images/about/how-claude-code-works.webp';
import llmParametersPost from '../../../public/images/about/llm-parameters-post.webp';
import highlightjsPr from '../../../public/images/about/highlightjs-pr.webp';
import wafflebasePr from '../../../public/images/about/wafflebase-pr.webp';
import blogWriteIngCode from '../../../public/images/about/blog-write-ing-code.webp';

export interface CareerProject {
  title: string;
  description: string;
}

export interface CareerItem {
  name: string;
  period: string;
  description: string;
  projects?: CareerProject[];
}

export const CAREER: CareerItem[] = [
  {
    name: 'DOWHAT',
    period: '2025.09 ~ 재직 중',
    description: '국내외 호텔 IT 솔루션',
    projects: [
      {
        title: '호텔 관리자 페이지 솔루션 개발',
        description:
          '체크인, 룸서비스, 청소, 컨텐츠 관리 등 호텔 운영 전반을 다루는 솔루션 개발 및 유지보수',
      },
      {
        title: '호텔 투숙객 페이지 솔루션 개발',
        description:
          '사전 체크인, 시설 예약 등 투숙객 대상 서비스 개발 및 유지보수',
      },
      {
        title: '객실 예약을 위한 부킹엔진 유저 페이지 개발',
        description:
          '외부 예약 플랫폼을 거치지 않고 호텔에서 직접 예약을 받는 부킹엔진 개발',
      },
      {
        title: '파르나스 호텔 투숙객 모바일 서비스 개발',
        description:
          '호텔 내 프로그램 예약 서비스와 빠른 체크인을 위한 모바일 사전 체크인 기능 개발',
      },
      {
        title: '롯데 시그니엘 호텔 현장 웨이팅 기능 개발',
        description:
          '호텔 시설 및 식당 웨이팅을 모바일로 신청하는 유저·관리자 기능 개발',
      },
      {
        title: 'KT 셋톱박스 연동 및 스마트TV 컨텐츠 관리 개발',
        description:
          '객실 스마트TV를 호텔 관리자와 연동해 룸서비스, OTT 로그아웃, 컨텐츠 관리 제공',
      },
    ],
  },
  {
    name: 'SNPLAB',
    period: '2022.08 ~ 2024.10',
    description: '마이데이터 거래 서비스',
    projects: [
      {
        title: '자사 서비스 앱 내 웹뷰 기능 개발',
        description:
          '포인트 거래, 거래 내역 조회, 투표 커뮤니티, 그룹 챌린지, 출석 등 주요 웹뷰 서비스 개발',
      },
      {
        title: '내부 백오피스 및 B2B 백오피스 개발',
        description:
          '공지·투표·챌린지 운영을 위한 내부 기능과 기업 간 데이터 거래를 위한 B2B 기능 개발',
      },
      {
        title: '출퇴근 서비스 앱 기획 및 개발',
        description:
          '사원 근태를 관리하는 PWA 앱과 백오피스를 기획·디자인·개발',
      },
    ],
  },
  {
    name: '프로그래머스 웹 데브코스 수료',
    period: '2021.07 ~ 2021.12',
    description: '프론트엔드 과정',
  },
  {
    name: '홍익대학교 세종캠퍼스 졸업',
    period: '2015.03 ~ 2021.08',
    description: '광고홍보학부 전공',
  },
];

export interface ContactLink {
  label: string;
  href: string;
}

export const CONTACT_LINKS: ContactLink[] = [
  { label: 'GitHub', href: 'https://github.com/te-ing' },
  { label: 'Email', href: 'mailto:hi2177@naver.com' },
];

/** 포트폴리오 이미지는 public/images/about/ 에 두고 정적 import로 참조합니다. */
export interface PortfolioImage {
  src: StaticImageData;
  alt: string;
  href?: string;
}

export interface ProjectCode {
  file: string;
  note?: string;
  language: 'typescript' | 'javascript';
  source: string;
}

export interface DiagramEndpoint {
  label: string;
  sub: string;
}

export interface DiagramBranch {
  title: string;
  items: string[];
}

export interface DiagramStep {
  title: string;
  description?: string;
  tag?: string;
  /** 한 단계 안에서 갈라지는 선택지. 2~3개일 때만 사용 */
  branches?: DiagramBranch[];
}

/** 절차형 워크플로우 도식. FlowDiagram이 렌더링합니다. */
export interface ProjectDiagram {
  title: string;
  note?: string;
  from: DiagramEndpoint;
  to: DiagramEndpoint;
  steps: DiagramStep[];
  rules?: string[];
}

export interface ProjectCase {
  title: string;
  problem: string;
  solution: string;
  /** 수치로 말할 수 있는 결과만 적습니다. 없으면 생략 */
  result?: string;
  diagram?: ProjectDiagram;
  code?: ProjectCode[];
}

export interface Project {
  company: string;
  title: string;
  lead: string;
  role: string;
  overview: string;
  link?: { label: string; href: string };
  highlights?: string[];
  cases?: ProjectCase[];
  images: PortfolioImage[];
}

export const PROJECTS: Project[] = [
  {
    company: 'DOWHAT',
    title: '부킹엔진 Next.js 마이그레이션',
    lead: '각 호텔별로 메타태그를 변경할 수 있도록 기존 SPA 부킹엔진을 Next.js로 마이그레이션하였습니다.',
    role: '유저 페이지 Next.js 마이그레이션, 결제 모듈 연동, 코딩 컨벤션 · AI 마이그레이션 Skill 수립',
    overview:
      'SPA로 만들어진 레거시 부킹엔진을 Next.js로 마이그레이션하였습니다. AI를 적극적으로 활용하여 기획자, 디자이너 없이 빠르게 개발하였고, AI 개발로 확보한 리소스를 QA에 집중하여 기존 프로젝트 대비 낮은 결함률을 이뤄냈습니다.',
    link: {
      label: '회고 포스팅',
      href: '/post/2026-06-30-바이브-코딩-프로젝트-회고',
    },
    cases: [
      {
        title: '호텔별 메타태그 노출 문제 해결',
        problem:
          '많은 호텔들이 예약을 공유할 때 객실 이미지 및 호텔 설명이 보여지길 바랬습니다. 하지만 기존 부킹엔진은 SPA로 개발되어, 어느 호텔로 접속해도 같은 메타태그를 노출할 수 밖에 없었습니다.',
        solution:
          '호텔명을 바탕으로 동적 라우팅을 설계하고, 레이아웃의 generateMetadata에서 호텔 정보를 조회해 메타태그를 5분 간격으로 서버에서 생성하도록 했습니다.',
        code: [
          {
            file: 'app/[hotelName]/layout.tsx',
            language: 'typescript',
            source: `// 호텔 정보는 자주 바뀌지 않으니 5분간 ISR 캐시.
async function fetchHotelInfo(hotelCode: string) {
  const res = await fetch(
    \`\${apiUrl}/api/hotel?hotel_code=\${hotelCode}\`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) return null;
  return ((await res.json()) as ApiResponse<HotelRaw>).data;
}

export async function generateMetadata({ params }: Props) {
  const hotelCode = resolveHotelName(params.hotelName);
  if (!hotelCode) return {};

  const hotel = await fetchHotelInfo(hotelCode);
  if (!hotel) return {};
 
  ...

  return {
    title,
    description,
    openGraph: { title, description, images: image ? [image] : undefined },
  };
}`,
          },
        ],
      },
      {
        title: 'AI SKILL을 사용한 점진적 마이그레이션',
        problem:
          '이 프로젝트는 자바스크립트 SPA를 타입스크립트 Next.js로 마이그레이션 하는 것과 동시에, 서버도 함께 전반적인 리뉴얼 하는 작업이었습니다. 때문에 서버 작업에 맞춰 점진적으로 수정이 필요했습니다.',
        solution:
          '원본 반영 절차를 mirror-from-reference Skill로 정리했습니다. 원본은 읽기 전용으로 두고 같은 경로의 파일을 기준으로 삼아, 그대로 복사할 부분과 새로운 구조에 맞게 치환할 부분을 먼저 구분합니다.',
        diagram: {
          title: 'mirror-from-reference Skill 절차',
          note: 'SKILL.md 도식화',
          from: {
            label: '원본 저장소',
            sub: '원본 · Vite SPA(CSR) · 읽기 전용',
          },
          to: {
            label: '호텔 전용 저장소',
            sub: '포크 버전 · Next.js App Router(SSR)',
          },
          steps: [
            {
              title: '대상 파일 식별',
              description:
                '요청에서 건드릴 파일을 특정합니다. 경로가 불확실하면 이 프로젝트에서 먼저 검색합니다.',
            },
            {
              title: '원본의 같은 경로 파일 읽기',
              tag: '원본은 읽기 전용',
              description:
                '있으면 그 구조를 기준선으로 삼고, 없으면 가장 비슷한 페이지·컴포넌트를 찾아 참고합니다. 원본이 쓰는 공용 컴포넌트·훅·스토어까지 함께 읽습니다.',
            },
            {
              title: '이 프로젝트의 현재 상태 확인',
              description:
                '같은 경로의 파일을 읽어 이미 들어간 호텔 전용 커스터마이징을 파악합니다. 이 변경을 지우지 않는 것이 목표입니다.',
            },
            {
              title: '차이 설계',
              description: '원본에서 옮길 때 두 가지로 나눕니다.',
              branches: [
                {
                  title: '그대로 복사',
                  items: [
                    'UI 구조 · 레이아웃 · 컴포넌트 호출',
                    '상태 관리 흐름 · 훅 사용',
                    '라우팅 로직',
                  ],
                },
                {
                  title: 'Next.js 구조에 맞춰 치환',
                  items: [
                    'API 호출 → docs 스펙 기준',
                    '테마 · 컬러 변수 → 기존 코드 사용',
                    '이미지 · 아이콘 → 사용자에게 요청',
                  ],
                },
              ],
            },
            {
              title: 'API 스펙 검증',
              description:
                'API가 포함된 작업이면 원본이 아니라 문서를 기준으로 봅니다. 요청 · 응답이 원본과 다르면 문서를 따르고, 추측해서 구현하지 않습니다.',
            },
            {
              title: '리뷰',
              description:
                '차이만 반영하고 원본의 구조·네이밍을 유지합니다. 기준으로 삼은 원본 파일, 수정한 파일, 치환한 항목, API 문서 확인 결과를 한 줄씩 보고합니다.',
            },
          ],
        },
      },
    ],
    images: [
      {
        src: bookingEngineDesktop,
        alt: '호텔 부킹엔진 예약 화면',
      },
      {
        src: bookingEngineMobile,
        alt: '부킹엔진 모바일 화면',
      },
    ],
  },
  {
    company: 'DOWHAT',
    title: '호텔 관리자 및 투숙객을 위한 호텔 대상 서비스 개발',
    lead: '시그니엘, 조선 팰리스, 파르나스 등 국내외 최정상급 5성급 호텔이 사용하는 유저·관리자 페이지를 개발하고 있습니다.',
    role: '유저 · 관리자 페이지 개발, 공용 컴포넌트 및 모달 구조 설계, 리뉴얼 유저페이지 개발',
    overview:
      '사전 체크인, 현장 웨이팅, 룸서비스, KT 셋톱박스 연동을 다뤘습니다. 요구사항 외에 기존 컴포넌트와 구조가 가진 문제를 해결하기도 하였습니다. 호텔마다 다른 커스텀을 쉽게 관리하기 위해 호텔별 커스텀 기능과 스타일은 객체로 분리해 공통 로직을 건드리지 않고 확장하도록 했습니다. 또한 잦은 UI 오류와 복잡한 구조로 만들어진 모달을 렌더링 로직과 UI 계층으로 나눠 문제를 해결했습니다.',
    link: {
      label: '관련 포스팅',
      href: '/post/2025-11-16-기존-문제를-해결하기-위한-새로운-리액트-모달-구현',
    },
    cases: [
      {
        title: '호텔별 커스텀 분기 문제 해결',
        problem:
          "같은 사전 체크인 화면이라도 호텔마다 필수 입력, 노출 기능, 스타일이 다릅니다. 이를 if (hotel === 'A') 분기로 처리하면 호텔이 추가될 때마다 공통 로직을 수정해야 하고 회귀 오류가 발생합니다.",
        solution:
          '호텔별 차이를 brand.config 객체로 분리하고, default 설정 위에 호텔별 값만 덮어쓰는 방식으로 병합했습니다. 서버에서 받은 권한 정보와 합쳐 하나의 ViewModel로 전달하므로, 화면은 호텔을 비교하지 않고 설정 값만 읽습니다. 새 호텔은 객체 하나를 추가하면 됩니다.',
        code: [
          {
            file: 'brand.config.ts',
            language: 'typescript',
            source: `// 호텔별 차이는 이 객체에만 둔다. 적지 않은 키는 default를 따른다.
const HOTEL_CONFIGS = {
  default: {
    authorizationFields: ['name', 'checkInDate'],
    isConsult: false,
    useMembership: false,
    useCheckout: true,
    hotel_language: 'kr, en',
    brandColor: '#ffffff',
    brandFont: 'Pretendard, sans-serif',
    specialFont: 'Libre BaskerVille, sans-serif',
  },
  A: {
    authorizationFields: ['name'],
    isConsult: true,
    customSplash: 'splashImage',
    customLogo: true,
    brandColor: '#aaaaaa',
    specialFont: 'Optima, sans-serif',
  },
  B: {
    authorizationFields: ['name'],
    isConsult: true,
    hotel_language: 'kr, en, jp, chs',
    useCheckout: false,
    brandColor: '#bbbbbb',
    brandFont: 'Noto Sans KR, sans-serif',
    specialFont: 'Georgia, serif',
  },
};`,
          },
          {
            file: 'PermissionService.ts · useAuthorizationViewModel.ts',
            language: 'typescript',
            source: `// default 위에 호텔별 값만 덮어쓴다.
const getHotelConfig = (hotelSeq: number): BrandDefaultConfig => {
  const config =
    HOTEL_CONFIGS[hotelSeq as keyof typeof HOTEL_CONFIGS];
  return config
    ? { ...HOTEL_CONFIGS.default, ...config }
    : HOTEL_CONFIGS.default;
};

// 서버 권한(permission)과 호텔 설정을 합쳐 하나의 ViewModel로 내려준다.
const permissionService = () => {
  const { hotelSeq } = useHotelParams();
  const { data } = usePermissions();

  const permission = useMemo(() => {
    if (!data?.permission || !hotelSeq) return null;
    const brandCustom = getHotelConfig(Number(hotelSeq));
    return {
      permissionWithBrand: { ...data.permission, ...brandCustom },
    };
  }, [data?.permission, hotelSeq]);

  return { permission };
};

// 인증 폼의 입력란 구성은 설정의 authorizationFields만 보고 결정한다.
const { permissionWithBrand } = useHotelData();

const inputFields = useMemo(() => {
  const fields = permissionWithBrand?.authorizationFields ?? [];
  return [
    { type: 'text', label: '객실 번호' },
    ...(fields.includes('phone')
      ? [{ type: 'tel', label: '전화번호' }]
      : []),
    ...(fields.includes('checkInDate')
      ? [{ type: 'datePicker', label: '체크인 날짜' }]
      : []),
    { type: 'text', label: '예약자 이름' },
  ];
}, [permissionWithBrand?.authorizationFields]);`,
          },
        ],
      },
      {
        title: '모달 구조 및 overlay 중첩 문제 해결',
        problem:
          'Context API와 react-modal 기반 모달은 렌더링 로직과 UI가 한 곳에 섞여 있어 UI 수정이 어려웠습니다. 모달이 겹치면 overlay가 중첩되었고, 열 때마다 불필요한 payload를 넘겨야 했습니다.',
        solution:
          '책임을 세 층으로 나눴습니다. Zustand 스토어는 열린 모달 목록만 관리하고, ModalRenderer는 Portal과 overlay를 담당하며, BaseModal은 컴파운드 패턴으로 Header와 Footer를 교체할 수 있는 순수 UI로 분리했습니다. react-modal은 제거했습니다.',
        code: [
          {
            file: 'ModalRenderer.jsx',
            language: 'javascript',
            source: `export const ModalRenderer = () => {
  const modals = useModalStore((s) => s.modals);
  const close = useModalStore((s) => s.close);
  useBodyScrollLock(modals.length > 0);

  return modals.map(({ Component, props, id }, index) => {
    const { dimStyle, onBeforeClose, ...rest } = props;
    const onModalClose = () => close(id, onBeforeClose);

    return (
      <ModalProvider key={id} value={{ id, onModalClose }}>
        <Suspense fallback={null}>
          {/* overlay는 맨 위 모달에만 적용 — 겹침 버그를 여기서 끊는다 */}
          <div className={cx(styles.modal_overlay, {
            [dimStyle || styles.dim]: index === modals.length - 1,
          })}>
            <Component id={id} onModalClose={onModalClose} {...rest} />
          </div>
        </Suspense>
      </ModalProvider>
    );
  });
};`,
          },
          {
            file: '사용 예',
            note: 'BaseModal 컴파운드 패턴',
            language: 'javascript',
            source: `open(CleaningRequestModal, { roomNo: '1000' });

function CleaningRequestModal({ roomNo }) {
  return (
    <BaseModal size="large" onSubmit={requestCleaning}>
      <BaseModal.Header title={\`\${roomNo}호 청소 요청\`} />
      <CleaningForm />
      <BaseModal.Footer cancelText="닫기" submitText="요청" />
    </BaseModal>
  );
}`,
          },
        ],
      },
    ],
    images: [
      {
        src: guestPageWestinParnas,
        alt: '웨스틴 서울 파르나스 투숙객 페이지',
      },
      {
        src: guestPageBanyanTree,
        alt: '반얀트리 클럽 앤 스파 서울 투숙객 페이지',
      },
    ],
  },
  {
    company: 'SNPLAB',
    title: 'MyD 앱 내 웹뷰 개발',
    lead: '포인트 거래, 투표 커뮤니티, 그룹 챌린지 등 앱의 주요 화면을 웹뷰로 개발했습니다.',
    role: '웹뷰 초기 개발환경 구축, 포인트 거래 · 투표 · 챌린지 · 출석 기능 개발, 에러 처리 공통화',
    overview:
      '코드 스플리팅을 포함한 초기 로딩 개선으로 LCP를 1,100ms에서 400ms까지 줄였습니다. 크로스 플랫폼 웹뷰에서만 재현되는 오류를 추적해 해결하고 Query Client와 Error Boundary로 에러 처리를 공통화했습니다. 웹 앱 인터페이스를 모킹해 브라우저에서도 웹뷰를 디버깅했습니다.',
    highlights: [
      '웹뷰 프로젝트 리더로서 AWS 상용 배포와 일정 관리 담당',
      '웹앱 인터페이스 로직을 공통화하는 커스텀 훅 개발',
    ],
    cases: [
      {
        title: '웹뷰 초기 로딩 지연 문제 해결',
        problem:
          '모든 화면이 하나의 번들에 묶여 있어, 출석 확인 화면에 진입해도 포인트 거래, 투표 등 모든 데이터를 내려받은 뒤에 렌더링되어 초기 로딩시간이 길어졌습니다.',
        solution:
          '페이지 단위로 코드를 분리해 진입한 화면의 코드만 먼저 받도록 했습니다. 이어서 공통 청크 분리와 리소스 우선순위 조정으로 초기 로딩 시간을 줄였습니다. 그 외 gzip, 이미지 지연 로딩 등을 적용하였습니다.',
        result: 'LCP 1,100ms에서 400ms로, 약 63% 단축',
      },
    ],
    images: [
      {
        src: mydWebviewAttendance,
        alt: '출석 체크 웹뷰',
      },
      {
        src: mydWebviewPointMall,
        alt: '포인트몰 웹뷰',
      },
    ],
  },
  {
    company: 'SNPLAB',
    title: '출퇴근 서비스 앱 · 관리자 개발',
    lead: '사내 출퇴근 시스템 부재를 해결하기 위해 기획부터 프론트엔드, 서버까지 직접 개발하였습니다.',
    role: '서비스 기획 · 디자인, Next.js 기반 서버/프론트엔드 통합 개발, LDAP 로그인, 근태 관리 백오피스',
    overview:
      'GPS와 IP로 출퇴근 위치를 판별하며, PWA로 배포하여 앱의 사용성을 구현했습니다. 앱은 출퇴근을 기록하고 백오피스는 근태를 관리할 수 있습니다. 사내 서비스로 시작했지만 NIPA 사업에 선정되어 7개 기업에 판매하는 성과를 이뤄냈습니다.',
    highlights: [
      'Geolocation API와 ipify로 출퇴근 시 GPS와 IP를 검증하는 기능 개발',
      'LDAP를 활용해 별도 회원가입 없이 사내 계정으로 로그인하는 기능 개발',
      '공식 프로젝트 제안을 위한 초기 기획안 작성 및 기술 검증 진행',
    ],
    cases: [
      {
        title: '사무실 외부 출퇴근 기록 문제 해결',
        problem:
          '출퇴근 기록에 대한 신뢰도가 필요했습니다. 버튼만 누르면 기록되는 출퇴근은 악용될 우려가 있었습니다.',
        solution:
          'Geolocation API로 관리자가 등록한 사무실 좌표와 반경 안에 있는지 검증하고, ipify로 얻은 공인 IP가 사내망 목록에 있는지 함께 확인했습니다. 두 검증 상태를 화면에 각각 표시하고, 하나라도 통과하면 출퇴근 버튼을 활성화했습니다.',
        code: [
          {
            file: 'useCheckGps.tsx · useCheckWifi.tsx · Commute.tsx',
            language: 'typescript',
            source: `// 두 좌표 사이 거리(m)를 haversine으로 구해 반경 안인지 판단한다.
function isWithinDistance(
  base: number[],
  target: number[],
  scope: number
) {
  return haversine(base[0], base[1], target[0], target[1]) <= scope;
}

// GPS: 위치가 바뀔 때마다 등록된 사무실 반경(scope) 안인지 확인한다.
const id = navigator.geolocation.watchPosition(
  ({ coords: { latitude, longitude } }) => {
    const isWithin = commuteInfo.gps.some((office) =>
      isWithinDistance(
        [latitude, longitude],
        office.gps.split(',').map(Number),
        office.scope
      )
    );
    setIsGps(isWithin);
  },
  () => console.log('위치 가져오기 실패'),
  { enableHighAccuracy: true }
);

// IP: 5초마다 ipify로 공인 IP를 받아 사내망 IP 목록과 비교한다.
const timer = setInterval(() => {
  fetchWiFiPublicIp().then(({ ip }) => {
    setIsWifi(commuteInfo.ip.some((item) => item.ip === ip));
  });
}, 5000);

// 두 근거를 각각 표시하고, 하나라도 통과하면 출퇴근 버튼을 연다.
<ul className={S.status_box}>
  <li>
    <span className={S.title}>WiFi</span>
    <span className={cx(S.status, { [S.active]: isWifi })} />
  </li>
  <li>
    <span className={S.title}>GPS</span>
    <span className={cx(S.status, { [S.active]: isGps })} />
  </li>
</ul>
<CommuteBtn
  employeeId={employee.employee_id}
  isPermit={isWifi || isGps}
/>`,
          },
        ],
      },
    ],
    images: [
      {
        src: commutePwaApp,
        alt: '출퇴근 PWA 앱 화면',
      },
      {
        src: commuteBackoffice,
        alt: '출퇴근 기록 관리 백오피스',
      },
      {
        src: commuteArchitecture,
        alt: '서비스 아키텍처 구성도',
      },
    ],
  },
  {
    company: 'SNPLAB',
    title: '내부 백오피스 및 B2B 백오피스 개발',
    lead: '데이터 거래, 이벤트 관리 등 사내 서비스를 관리하는 백오피스 시스템을 개발했으며 AWS 상용 배포를 담당했습니다.',
    role: '공지 · 투표 · 챌린지 운영 기능, 기업 간 데이터 거래 B2B 기능, 공통 컴포넌트 및 레이아웃 개발',
    overview:
      '관리자 페이지 안에서 기획자가 스타일을 자유롭게 수정할 수 있도록 WYSIWYG 텍스트 에디터를 제안하고 개발했습니다. 대용량 데이터로 오래 걸리던 API 응답을 Protobuf로 전환해 소요 시간을 87% 줄였고, UI/UX 통일성과 생산성을 위해 공통 컴포넌트와 레이아웃을 개발했습니다.',
    images: [],
  },
];

export interface Contribution {
  name: string;
  href?: string;
  items: { description: string; pr: { label: string; href: string } }[];
}

export interface WorkingPrinciple {
  title: string;
  paragraphs: string[];
  contributions?: Contribution[];
  images: PortfolioImage[];
}

export const WAY_OF_WORKING: WorkingPrinciple[] = [
  {
    title: '적극적으로 AI를 활용합니다.',
    paragraphs: [
      'AI를 더 잘 쓰기 위해 국내외 포스팅과 오픈소스를 조사하며 여러 방식을 시도하고 있습니다.',
      'CLAUDE.md와 Skill로 검증 기준을 코드화해 팀 차원에서 AI 코드 품질을 관리하고, 사람과 AI가 함께 읽을 수 있는 코드를 씁니다.',
      'Agent와 Skill로 반복 작업을 자동화합니다. 기획과 문서화, 커뮤니케이션 등 개발뿐만 아니라 워크플로우 전체에 AI를 활용합니다.',
    ],
    images: [
      {
        src: aiWorkflowReadme,
        alt: 'AI가 개발하는 방식을 정리한 저장소 README',
      },
      {
        src: vibeCodingRetrospective,
        alt: '기획자 없이 개발자로만 진행한 바이브 코딩 프로젝트 회고',
        href: '/post/2026-06-30-바이브-코딩-프로젝트-회고',
      },
      {
        src: howClaudeCodeWorks,
        alt: '클로드는 어떻게 동작하는가 포스팅',
        href: '/post/2026-02-10-How-Claude-Code-Works',
      },
      {
        src: llmParametersPost,
        alt: 'AI 모델(LLM) 파라미터 이해하기 번역 포스팅',
        href: '/post/2026-02-03-AI-Model-이해하기',
      },
    ],
  },
  {
    title: '꾸준히 기록하고, 조금씩 기여합니다.',
    paragraphs: [
      '개발 블로그를 꾸준히 운영하며 경험과 회고, 기술을 글로 정리합니다. 글로 옮기는 과정에서 알고 있다고 착각했던 부분이 드러납니다. 그때 다시 배웁니다.',
      '더 많은 개발자와 소통하고 깊이 있는 개발을 경험하고 싶어 작게나마 오픈소스에 기여하고 있습니다.',
    ],
    contributions: [
      {
        name: 'highlight.js',
        href: 'https://github.com/highlightjs/highlight.js',
        items: [
          {
            description: '언더바가 포함된 숫자 리터럴 인식 문법 수정',
            pr: {
              label: '#4280',
              href: 'https://github.com/highlightjs/highlight.js/pull/4280',
            },
          },
        ],
      },
      {
        name: 'wafflebase',
        href: 'https://github.com/wafflebase/wafflebase',
        items: [
          {
            description: '체크박스 클릭 영역 확대로 조작 실패율 개선',
            pr: {
              label: '#623',
              href: 'https://github.com/wafflebase/wafflebase/pull/623',
            },
          },
          {
            description: '하이퍼링크 중복 삽입 수정',
            pr: {
              label: '#580',
              href: 'https://github.com/wafflebase/wafflebase/pull/580',
            },
          },
          {
            description: 'Test Connection 커넥션 생성 문제 해결',
            pr: {
              label: '#699',
              href: 'https://github.com/wafflebase/wafflebase/pull/699',
            },
          },
        ],
      },
      {
        name: '문서 · 번역',
        items: [
          {
            description: 'ko.react.dev 누락 번역 보완',
            pr: {
              label: '#1147',
              href: 'https://github.com/reactjs/ko.react.dev/pull/1147',
            },
          },
          {
            description: 'MDN 한국어 문서 정보 수정',
            pr: {
              label: '#19623',
              href: 'https://github.com/mdn/translated-content/pull/19623',
            },
          },
          {
            description: 'react-datepicker 문서 최신화',
            pr: {
              label: '#6133',
              href: 'https://github.com/Hacker0x01/react-datepicker/pull/6133',
            },
          },
        ],
      },
    ],
    images: [
      {
        src: highlightjsPr,
        alt: 'highlight.js 기여 PR',
        href: 'https://github.com/highlightjs/highlight.js/pull/4280',
      },
      {
        src: wafflebasePr,
        alt: 'wafflebase 기여 PR',
        href: 'https://github.com/wafflebase/wafflebase/pull/623',
      },
    ],
  },
];
