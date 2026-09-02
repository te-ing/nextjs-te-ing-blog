import Layout from '@/components/Layout';
import AboutSection from '@/components/about/AboutSection';
import AboutCareer from '@/components/about/AboutCareer';
import AboutFeaturedPosts from '@/components/about/AboutFeaturedPosts';
import AboutContact from '@/components/about/AboutContact';
import { CONTACT_LINKS } from '@/components/about/aboutContants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '소개',
  description: '프론트엔드 개발자 김태중',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <Layout>
      <div className="max-w-[1024px] mx-auto px-4 md:px-8 pt-8 md:pt-16 pb-20 flex flex-col gap-12 md:gap-16 break-keep">
        <section className="flex flex-col gap-5 max-w-[600px]">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-[-0.03em] leading-[1.4] text-pretty">
            프론트엔드 개발자 김태중입니다.
          </h1>
          <p className="text-lg leading-[1.85] text-gray-700 text-pretty">
            개발 블로그를 꾸준히 운영하며 경험과 회고, 기술을 글로 정리하고
            있습니다.
            <br />
            지금은 호텔 도메인에서 투숙객과 호텔 관리자를 위한 서비스를 만들고
            있습니다.
          </p>
        </section>

        <AboutSection label="Interests">
          <p className="text-[17px] leading-[1.85] text-gray-600 text-pretty">
            카페와 음악, 수영을 좋아합니다.
          </p>
        </AboutSection>

        <AboutSection label="Experience">
          <AboutCareer />
        </AboutSection>

        <AboutSection label="Post">
          <AboutFeaturedPosts />
        </AboutSection>

        <AboutSection label="Contact">
          <AboutContact
            links={[
              ...CONTACT_LINKS,
              { label: 'Portfolio', href: '/about/detail' },
            ]}
          />
        </AboutSection>
      </div>
    </Layout>
  );
}
