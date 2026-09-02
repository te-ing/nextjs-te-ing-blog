import { WAY_OF_WORKING } from './aboutContants';
import PortfolioImage from './PortfolioImage';

const EXTERNAL_LINK_CLASS =
  'text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-900 transition-colors';

export default function AboutWayOfWorking() {
  return (
    <div className="flex flex-col gap-14">
      {WAY_OF_WORKING.map(({ title, paragraphs, contributions, images }) => (
        <div key={title} className="flex flex-col gap-5">
          <h3 className="text-2xl font-bold text-gray-900 tracking-[-0.02em] leading-[1.4] text-pretty print:break-after-avoid">
            {title}
          </h3>

          <div className="flex flex-col gap-3">
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-[1.85] text-gray-600 text-pretty"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {contributions && contributions.length > 0 && (
            <ul className="flex flex-col gap-4 py-4 border-y border-gray-100 print:break-inside-avoid">
              {contributions.map(({ name, href, items }) => (
                <li
                  key={name}
                  className="flex flex-col gap-1 print:break-inside-avoid"
                >
                  <p className="font-semibold text-gray-900">
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={EXTERNAL_LINK_CLASS}
                      >
                        {name}
                      </a>
                    ) : (
                      name
                    )}
                  </p>
                  <ul className="flex flex-col gap-1 text-[15px] leading-[1.7] text-gray-600">
                    {items.map(({ description, pr }) => (
                      <li key={pr.href}>
                        {description}{' '}
                        <a
                          href={pr.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[13px] text-gray-400 hover:text-gray-900 transition-colors"
                        >
                          {pr.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}

          {images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {images.map((image) => (
                <PortfolioImage
                  key={image.src.src}
                  image={image}
                  fit="width"
                  caption
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
