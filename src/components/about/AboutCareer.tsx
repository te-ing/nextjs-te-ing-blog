import { CAREER } from './aboutContants';

export default function AboutCareer() {
  return (
    <div className="flex flex-col gap-12">
      {CAREER.map(({ name, period, description, projects }) => (
        <div key={name} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-[19px] font-bold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">
              {period} · {description}
            </p>
          </div>
          {projects && projects.length > 0 && (
            <ul className="flex flex-col gap-5">
              {projects.map(({ title, description }) => (
                <li key={title} className="flex flex-col gap-1">
                  <h4 className="text-[17px] font-semibold text-gray-900">
                    {title}
                  </h4>
                  <p className="text-base leading-[1.85] text-gray-600 text-pretty">
                    {description}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
