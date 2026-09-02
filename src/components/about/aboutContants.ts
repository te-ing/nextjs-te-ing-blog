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

export interface ProjectCase {
  title: string;
  problem: string;
  solution: string;
  /** 수치로 말할 수 있는 결과만 적습니다. 없으면 생략 */
  result?: string;
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
    lead: 'AI를 활용하여 기존 SPA 부킹엔진을 각 호텔별로 메타태그를 변경할 수 있도록 Next.js로 마이그레이션하였습니다.',
    role: '유저 페이지 Next.js 마이그레이션, 결제 모듈 연동, 코딩 컨벤션 · AI 마이그레이션 Skill 수립',
    overview:
      '4년 전 SPA로 만들어진 레거시 부킹엔진을 Next.js로 마이그레이션하였습니다. AI를 적극적으로 활용하여 기획자, 디자이너 없이 빠르게 개발하였고, AI 개발로 확보한 리소스를 QA에 집중하여 기존 프로젝트 대비 낮은 결함률을 이뤄냈습니다.',
    link: {
      label: '회고 포스팅',
      href: '/post/2026-06-30-바이브-코딩-프로젝트-회고',
    },
    cases: [
      {
        title: '호텔마다 다른 메타태그를 한 코드베이스에서',
        problem:
          'SPA에서는 index.html이 하나라 어느 호텔로 들어와도 같은 title·description·OG 이미지가 노출됐습니다. 호텔별 도메인과 브랜드가 다른 서비스에서 치명적이었습니다.',
        solution:
          '호텔 슬러그를 라우트 세그먼트로 두고 generateMetadata에서 호텔 정보를 조회해 메타태그를 서버에서 생성했습니다. 호텔 정보는 레이아웃 단위로 한 번만 가져와 하위 페이지가 공유합니다.',
        code: [
          {
            file: 'app/[hotel]/layout.tsx',
            language: 'typescript',
            source: `// 예시: 실제 코드로 교체 예정
// 호텔 슬러그로 메타태그를 결정한다. 하위 페이지는 이 레이아웃의 메타를 상속받는다.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hotel = await getHotel(params.hotel);

  return {
    title: \`\${hotel.name} 객실 예약\`,
    description: hotel.seo.description,
    openGraph: { images: [hotel.seo.ogImage], locale: hotel.locale },
    alternates: { canonical: \`https://\${hotel.domain}/booking\` },
  };
}`,
          },
        ],
      },
    ],
    images: [
      {
        src: bookingEngineDesktop,
        alt: '씨마크 호텔 부킹엔진 예약 화면',
      },
      {
        src: bookingEngineMobile,
        alt: '부킹엔진 모바일 화면',
      },
    ],
  },
  {
    company: 'DOWHAT',
    title: '호텔 관리자와 투숙객 모두를 위한 SaaS 개발',
    lead: '시그니엘, 조선 팰리스, 파르나스 등 5성급 호텔이 사용하는 운영 SaaS의 유저·관리자 페이지를 개발하고 있습니다.',
    role: '유저 · 관리자 페이지 개발, 공용 컴포넌트 및 모달 구조 설계, 차세대 플랫폼 사전 체크인 모듈 담당',
    overview:
      '사전 체크인, 현장 웨이팅, 룸서비스, KT 셋톱박스 연동을 다뤘습니다. 요구사항 외에 기존 컴포넌트와 구조가 가진 문제를 해결하기도 하였습니다. 호텔마다 다른 커스텀을 쉽게 관리하기 위해 호텔별 커스텀 기능과 스타일은 객체로 분리해 공통 로직을 건드리지 않고 확장하도록 했습니다. 또한 잦은 UI 오류와 복잡한 구조로 만들어진 모달을 렌더링 로직과 UI 계층으로 나눠 문제를 해결했습니다.',
    link: {
      label: '관련 포스팅',
      href: '/post/2025-11-16-기존-문제를-해결하기-위한-새로운-리액트-모달-구현',
    },
    cases: [
      {
        title: '호텔마다 다른 커스텀 요구가 공통 로직을 잠식한다',
        problem:
          "같은 사전 체크인 화면이라도 호텔마다 필수 입력, 노출 기능, 스타일이 다릅니다. 이를 if (hotel === 'A') 분기로 처리하면 호텔이 늘 때마다 공통 로직을 건드려야 하고 회귀가 생깁니다.",
        solution:
          '호텔별 차이를 설정 객체로 분리했습니다. 공통 컴포넌트는 호텔 이름을 모른 채 설정만 읽고, 새 호텔은 객체 하나를 추가하는 것으로 끝납니다.',
        code: [
          {
            file: 'entities/hotel/config.ts',
            language: 'typescript',
            source: `// 예시: 실제 코드로 교체 예정
// 호텔별 차이는 이 객체에만 존재한다. 공통 로직은 config를 읽을 뿐 호텔 코드를 비교하지 않는다.
export const hotelConfigs: Record<HotelCode, HotelConfig> = {
  SIGNIEL: {
    theme: signielTheme,
    features: { waiting: true, preCheckIn: true, roomService: false },
    preCheckIn: { requireIdCard: true, minGuestAge: 19 },
  },
  PARNAS: {
    theme: parnasTheme,
    features: { waiting: false, preCheckIn: true, roomService: true },
    preCheckIn: { requireIdCard: false },
  },
};

function PreCheckInForm() {
  const { preCheckIn } = useHotelConfig();

  return (
    <Form>
      <GuestFields />
      {preCheckIn.requireIdCard && <IdCardField />}
    </Form>
  );
}`,
          },
        ],
      },
      {
        title: 'UI 오류가 잦고 겹치면 overlay가 두 겹 뜨던 모달',
        problem:
          'Context API + react-modal 기반 모달은 렌더링 로직과 UI가 뒤섞여 UI 수정이 어려웠고, 모달이 겹칠 때 overlay가 중첩됐으며, 열 때마다 불필요한 payload를 넘겨야 했습니다.',
        solution:
          '책임을 세 층으로 나눴습니다. Zustand 스토어가 열린 모달 목록만 관리하고, ModalRenderer가 Portal과 overlay까지만 담당하며, BaseModal은 컴파운드 패턴으로 Header·Footer를 갈아 끼울 수 있는 순수 UI로 남겼습니다. react-modal은 제거했습니다.',
        code: [
          {
            file: 'ModalRenderer.jsx',
            note: '포스팅 실제 코드 · 일부 축약',
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
            source: `open(CleaningRequestModal, { roomNo: '1203' });

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
        title: '웹뷰 첫 화면이 뜨기까지 1.1초',
        problem:
          '모든 화면이 하나의 번들에 묶여 있어, 출석 한 번 확인하려 해도 포인트 거래·투표·챌린지 코드까지 전부 내려받은 뒤에야 화면이 그려졌습니다.',
        solution:
          '페이지 단위로 코드를 분리해 진입한 화면의 코드만 먼저 받도록 했습니다. 이어서 공통 청크 분리와 리소스 우선순위 조정으로 초기 로딩을 줄였습니다.',
        result: 'LCP 1,100ms에서 400ms로, 약 63% 단축',
        code: [
          {
            file: 'app/routes.tsx',
            language: 'typescript',
            source: `// 예시: 실제 코드로 교체 예정
// 진입한 화면의 코드만 내려받는다. 나머지는 이동 시점에 로드.
const Attendance = lazy(() => import('@/pages/attendance'));
const PointTrade = lazy(() => import('@/pages/point-trade'));
const Vote = lazy(() => import('@/pages/vote'));
const Challenge = lazy(() => import('@/pages/challenge'));

export function AppRoutes() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/point" element={<PointTrade />} />
        <Route path="/vote/*" element={<Vote />} />
        <Route path="/challenge/*" element={<Challenge />} />
      </Routes>
    </Suspense>
  );
}`,
          },
        ],
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
      'GPS와 IP로 출퇴근 위치를 판별합니다. 설치 없이 쓸 수 있도록 PWA로 배포했습니다. 사원은 앱에서 출퇴근을 기록하고 관리자는 백오피스에서 근태를 확인합니다. 사내 서비스로 시작했지만 NIPA 사업에 선정되어 7개 기업에 SaaS 형태로 판매한 성과를 이뤄냈습니다.',
    highlights: [
      'Geolocation API와 ipify로 출퇴근 시 GPS와 IP를 검증하는 기능 개발',
      'LDAP를 활용해 별도 회원가입 없이 사내 계정으로 로그인하는 기능 개발',
      '공식 프로젝트 제안을 위한 초기 기획안 작성 및 기술 검증 진행',
    ],
    cases: [
      {
        title: '사무실 밖에서 찍는 출근을 어떻게 막을까',
        problem:
          '버튼만 누르면 되는 출퇴근은 사무실 밖에서도 기록됩니다. GPS만 쓰면 실내에서 오차가 크고, IP만 쓰면 VPN이나 테더링에 취약합니다.',
        solution:
          'Geolocation API로 사무실 반경을 검증하고, ipify로 얻은 공인 IP가 사내망인지 함께 확인했습니다. 두 근거 중 하나라도 확실하면 기록하고, 어떤 근거로 통과했는지 남겨 관리자가 사후 확인할 수 있게 했습니다.',
        result: 'NIPA 사업 선정, 7개 기업에 SaaS 형태로 판매',
        code: [
          {
            file: 'server/attendance/verify.ts',
            language: 'typescript',
            source: `// 예시: 실제 코드로 교체 예정
// GPS 반경과 사내망 IP를 함께 검증한다. 통과 근거를 기록해 관리자가 사후 확인할 수 있게 한다.
export async function verifyCheckIn({ coords, ip }: CheckInInput) {
  const office = await getOfficeLocation();

  const distance = haversine(coords, office.coords); // m
  const inRadius = distance <= office.radiusMeters; // 예: 150m
  const inOfficeNetwork = office.allowedIps.includes(ip); // ipify로 얻은 공인 IP

  if (!inRadius && !inOfficeNetwork) {
    throw new CheckInError('사무실 위치에서만 출근 기록이 가능합니다.');
  }

  return { distance, verifiedBy: inRadius ? 'gps' : 'ip' };
}`,
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
