import Layout from '@/components/Layout';
import AboutSection from '@/components/about/AboutSection';
import AboutCareer from '@/components/about/AboutCareer';
import AboutProjects from '@/components/about/AboutProjects';
import AboutWayOfWorking from '@/components/about/AboutWayOfWorking';
import AboutContact from '@/components/about/AboutContact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '포트폴리오',
  description: '프론트엔드 개발자 김태중 포트폴리오',
  alternates: {
    canonical: '/about/detail',
  },
};

export default function PortfolioPage() {
  return (
    <Layout>
      <div className="max-w-[1024px] mx-auto px-4 md:px-8 pt-8 md:pt-16 pb-20 flex flex-col gap-12 md:gap-16 break-keep print:px-0 print:pt-0 print:pb-0 print:gap-10">
        <section className="flex flex-col gap-5  print:break-inside-avoid">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-[-0.03em] leading-[1.4] text-pretty">
            프론트엔드 개발자 김태중
          </h1>
          <div className="flex flex-col gap-3 text-lg leading-[1.85] text-gray-700 text-pretty pre-w">
            <p>
              {`유저 페이지, 관리자 페이지, 앱 내 웹뷰 등 다양한 서비스를
개발했습니다. \nReact, Next.js를 사용하여 주로 개발하였으며, \n화면 개발에 그치지 않고 구조 설계와 배포 환경 등 기술과 영역을 가리지않고 개발하였습니다.`}
            </p>
            <p>
              개발 과정에서는 공통 컴포넌트를 개발하고 코딩 컨벤션을 제안하며
              지속 가능한 구조를 만들기 위해 노력했습니다.
            </p>
            <p>
              최근에는 AI를 활용하면서 일관성 있는 개발을 할 수 있도록
              CLAUDE.md와 Agent를 다루는 것에 관심을 갖고 있습니다.
            </p>
          </div>
        </section>

        <AboutSection label="Experience">
          <AboutCareer />
        </AboutSection>

        <AboutSection label="Projects">
          <AboutProjects />
        </AboutSection>

        <AboutSection label="Way of Working">
          <AboutWayOfWorking />
        </AboutSection>

        <AboutSection label="Contact">
          <AboutContact />
        </AboutSection>
      </div>
    </Layout>
  );
}
