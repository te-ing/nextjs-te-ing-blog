import type { DiagramEndpoint, ProjectDiagram } from './aboutContants';

const LABEL_CLASS = 'text-[11px] tracking-wider uppercase text-gray-400';

function Endpoint({ label, sub }: DiagramEndpoint) {
  return (
    <div className="rounded-md border border-gray-200 px-4 py-3">
      <p className="text-[14px] font-semibold text-gray-900">{label}</p>
      <p className="mt-0.5 text-[12px] leading-[1.6] text-gray-500 text-pretty">
        {sub}
      </p>
    </div>
  );
}

export default function FlowDiagram({
  title,
  note,
  from,
  to,
  steps,
  rules,
}: ProjectDiagram) {
  return (
    <figure className="flex flex-col gap-5 rounded-lg border border-gray-200 bg-white p-5 md:p-6 print:p-4">
      <figcaption className="text-[12px] text-gray-500">
        {title}
        {note && <span className="text-gray-400"> · {note}</span>}
      </figcaption>

      {/* 원본 → SEAMARQ: 어디서 어디로 옮기는 작업인지 먼저 보여준다 */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-2 sm:gap-3 print:grid-cols-[1fr_auto_1fr] print:break-inside-avoid">
        <Endpoint {...from} />
        <div
          className="flex items-center justify-center text-gray-400"
          aria-hidden
        >
          <svg
            width="28"
            height="16"
            viewBox="0 0 28 16"
            fill="none"
            className="rotate-90 sm:rotate-0 print:rotate-0"
          >
            <path
              d="M0 8h24M18 2l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <Endpoint {...to} />
      </div>

      <ol className="relative flex flex-col gap-5 pl-9">
        <span
          className="absolute left-[11.5px] top-3 bottom-3 w-px bg-gray-200"
          aria-hidden
        />
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="relative flex flex-col gap-2 print:break-inside-avoid"
          >
            <span className="absolute -left-9 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white text-[11px] font-semibold text-gray-600">
              {index + 1}
            </span>
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <p className="text-[15px] font-semibold leading-6 text-gray-900">
                {step.title}
              </p>
              {step.tag && (
                <span className="rounded border border-gray-200 px-1.5 py-0.5 text-[11px] text-gray-500">
                  {step.tag}
                </span>
              )}
            </div>
            {step.description && (
              <p className="text-[14px] leading-[1.7] text-gray-600 text-pretty">
                {step.description}
              </p>
            )}
            {step.branches && step.branches.length > 0 && (
              <div
                className={`grid grid-cols-1 gap-2 ${
                  step.branches.length === 2
                    ? 'sm:grid-cols-2 print:grid-cols-2'
                    : ''
                }`}
              >
                {step.branches.map((branch) => (
                  <div
                    key={branch.title}
                    className="rounded-md bg-gray-50 px-3 py-2.5"
                  >
                    <p className={LABEL_CLASS}>{branch.title}</p>
                    <ul className="mt-1.5 space-y-1 text-[13px] leading-[1.6] text-gray-700">
                      {branch.items.map((item) => (
                        <li key={item} className="flex gap-1.5">
                          <span className="text-gray-400">·</span>
                          <span className="text-pretty">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>

      {rules && rules.length > 0 && (
        <div className="rounded-md border border-dashed border-gray-300 px-4 py-3 print:break-inside-avoid">
          <p className={LABEL_CLASS}>금지</p>
          <ul className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-[13px] leading-[1.6] text-gray-700">
            {rules.map((rule) => (
              <li key={rule} className="flex gap-1.5">
                <span className="text-gray-400">·</span>
                <span className="text-pretty">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </figure>
  );
}
