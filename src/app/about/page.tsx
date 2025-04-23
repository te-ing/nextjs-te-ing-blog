import Layout from '@/components/Layout';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <Layout>
      <div className="max-w-[800px] mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">김태중</h1>
            <p className="text-2xl text-gray-600 mb-4">
              불편함을 해결하는 이펙티브 개발자
            </p>
            <div className="text-gray-600">
              주요 기술 · React · TypeScript · Next.js · React-Query · Zustand
            </div>
          </div>
          <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden">
            <Image
              src="/profile.png"
              alt="김태중 프로필"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">주요 강점</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700 mb-8">
            <li>
              재사용 가능한 코드를 작성하고, 반복적인 작업을 자동화하여
              복리적으로 생산성을 향상시킵니다
            </li>
            <li>
              팀의 생산성 향상과 업무환경 개선을 위해 주도적으로 문제를 해결하고
              개발합니다
            </li>
            <li>
              높은 응집도와 선형적인 흐름을 바탕으로 직관적인 코드를 작성하려
              노력합니다
            </li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 text-gray-900">About Me</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>
              불편함을 해결하는 이펙티브 개발자 김태중입니다. 광고기획자 인턴
              시절, 매일 고객기업의 뉴스와 커뮤니티 반응을 취합하여 보고하는
              업무를 크롤링 봇으로 자동화하면서 개발을 시작하게 되었습니다.
              인스타그램의 자모 분리 현상을 해결해주는 사이트를 배포했던 경험을
              바탕으로, 더 많은 사람들의 불편함을 해결해주고자 프론트엔드
              개발자가 되었습니다.
            </p>

            <p>
              업무환경에서의 불편함을 피하지 않고 주도적으로 해결합니다. 매번
              메신저로 출퇴근 시간을 기록하던 문제를 해결하기 위해 출퇴근 앱을
              직접 기획하고 만들었습니다. PWA를 사용하여 접근성을 향상시키고 앱
              배포과정을 생략하였습니다. 또한 Playwright를 사용하여 복잡한
              웹사이트 회의실 예약과정을 자동화하였습니다.
            </p>

            <p>
              공통컴포넌트와 커스텀 훅을 사용한 공통화를 즐기며, 유지보수 시점을
              고려하여 충분히 고민하고 개발합니다. 기획자 경험을 살려 타 직군과
              원활하게 소통할 수 있으며, 꾸준한 공부와 회고를 통해 더 나은
              개발자가 되기 위해 노력하고 있습니다.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
