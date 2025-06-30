import Layout from '@/components/Layout';
import Image from 'next/image';
import AboutStrengths from '@/components/about/AboutStrengths';
import AboutMe from '@/components/about/AboutMe';
import AboutExperience from '@/components/about/AboutExperience';
import AboutEducation from '@/components/about/AboutEducation';

export default function AboutPage() {
  return (
    <Layout>
      <div className="max-w-[800px] mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
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
        <div className="space-y-12">
          <AboutStrengths />
          <AboutExperience />
          <AboutEducation />
          <AboutMe />
        </div>
      </div>
    </Layout>
  );
}
