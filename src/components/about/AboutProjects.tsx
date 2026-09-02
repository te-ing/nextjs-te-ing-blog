import Link from 'next/link';
import { PROJECTS } from './aboutContants';
import PortfolioImage from './PortfolioImage';
import CodeBlock from './CodeBlock';

const EYEBROW_CLASS =
  'font-mono text-xs tracking-[0.16em] uppercase text-gray-500';
const SPEC_LABEL_CLASS =
  'font-mono text-[11px] tracking-[0.14em] uppercase text-gray-400 pt-0.5';

export default function AboutProjects() {
  return (
    <div className="flex flex-col gap-16">
      {PROJECTS.map((project) => {
        return (
          <article key={project.title} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2 print:break-after-avoid">
              <p className={EYEBROW_CLASS}>{project.company}</p>
              <h3 className="text-2xl font-bold text-gray-900 tracking-[-0.02em] leading-[1.4] text-pretty">
                {project.title}
              </h3>
              <p className="text-lg leading-[1.7] text-gray-700 text-pretty">
                {project.lead}
              </p>
            </div>

            <dl className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-x-4 py-4 border-y border-gray-100 text-sm">
              <dt className={SPEC_LABEL_CLASS}>Role</dt>
              <dd className="text-gray-700 leading-relaxed">{project.role}</dd>
            </dl>

            <p className="text-base leading-[1.85] text-gray-600 text-pretty">
              {project.overview}
              {project.link && (
                <>
                  {' '}
                  <Link
                    href={project.link.href}
                    className="text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-900 transition-colors"
                  >
                    {project.link.label}
                  </Link>
                </>
              )}
            </p>

            {project.highlights && project.highlights.length > 0 && (
              <ul className="list-disc pl-5 space-y-1 text-[15px] leading-[1.7] text-gray-600">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}

            {project.cases && project.cases.length > 0 && (
              <div className="flex flex-col gap-8 pt-2">
                <p className={EYEBROW_CLASS}>Problem &amp; Solution</p>
                {project.cases.map((item) => (
                  <div key={item.title} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3 print:break-inside-avoid">
                      <h4 className="text-[17px] font-semibold text-gray-900 text-pretty">
                        {item.title}
                      </h4>
                      <dl className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-x-4 gap-y-3 text-[15px] leading-[1.75]">
                        <dt className={SPEC_LABEL_CLASS}>Problem</dt>
                        <dd className="text-gray-600 text-pretty">
                          {item.problem}
                        </dd>
                        <dt className={SPEC_LABEL_CLASS}>Solution</dt>
                        <dd className="text-gray-600 text-pretty">
                          {item.solution}
                        </dd>
                        {item.result && (
                          <>
                            <dt className={SPEC_LABEL_CLASS}>Result</dt>
                            <dd className="font-semibold text-gray-900 text-pretty">
                              {item.result}
                            </dd>
                          </>
                        )}
                      </dl>
                    </div>
                    {item.code?.map((code) => (
                      <CodeBlock key={`${item.title}-${code.file}`} {...code} />
                    ))}
                  </div>
                ))}
              </div>
            )}

            {project.images.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-2 print:overflow-visible print:flex-wrap print:break-inside-avoid">
                {project.images.map((image) => (
                  <PortfolioImage
                    key={image.src.src}
                    image={image}
                    fit="height"
                    className="h-52 md:h-64 shrink-0 print:h-44"
                  />
                ))}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
