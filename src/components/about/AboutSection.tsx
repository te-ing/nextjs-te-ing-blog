import { ReactNode } from 'react';

interface AboutSectionProps {
  label: string;
  children: ReactNode;
}

export default function AboutSection({ label, children }: AboutSectionProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[200px_minmax(0,1fr)] gap-4 md:gap-14 pt-10 border-t border-gray-200 print:grid-cols-[130px_minmax(0,1fr)] print:gap-8 print:pt-8">
      <h2 className="font-mono text-xs tracking-[0.16em] uppercase text-gray-500 print:break-after-avoid">
        {label}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
