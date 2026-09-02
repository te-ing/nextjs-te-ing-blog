import Image from 'next/image';
import Link from 'next/link';
import type { PortfolioImage as PortfolioImageData } from './aboutContants';

interface PortfolioImageProps {
  image: PortfolioImageData;
  /** height: 고정 높이 행에 자연 너비로 배치, width: 컨테이너 너비를 채움 */
  fit: 'height' | 'width';
  caption?: boolean;
  className?: string;
}

export default function PortfolioImage({
  image,
  fit,
  caption = false,
  className = '',
}: PortfolioImageProps) {
  const { src, alt, href } = image;
  const sizeClass = fit === 'height' ? 'h-full w-auto' : 'w-full h-auto';

  const figure = (
    <figure
      className={`flex flex-col gap-2 print:break-inside-avoid ${className}`}
    >
      <div className={fit === 'height' ? 'h-full' : 'w-full'}>
        <Image
          src={src}
          alt={alt}
          loading="eager"
          sizes={
            fit === 'height'
              ? '(min-width: 768px) 600px, 100vw'
              : '(min-width: 640px) 360px, 100vw'
          }
          className={`${sizeClass} rounded-md border border-gray-200 bg-white object-contain`}
        />
      </div>
      {caption && (
        <figcaption className="text-[13px] leading-snug text-gray-500 text-pretty">
          {alt}
        </figcaption>
      )}
    </figure>
  );

  if (!href) return figure;

  const linkClass = 'group block hover:opacity-80 transition-opacity';

  if (href.startsWith('/')) {
    return (
      <Link href={href} className={linkClass}>
        {figure}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClass}
    >
      {figure}
    </a>
  );
}
