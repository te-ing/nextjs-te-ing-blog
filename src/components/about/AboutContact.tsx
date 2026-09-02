import { Fragment } from 'react';
import Link from 'next/link';
import { CONTACT_LINKS, type ContactLink } from './aboutContants';

interface AboutContactProps {
  links?: ContactLink[];
}

const LINK_CLASS = 'text-gray-600 hover:text-gray-900 transition-colors';

export default function AboutContact({
  links = CONTACT_LINKS,
}: AboutContactProps) {
  return (
    <div className="flex items-center gap-3.5 text-lg">
      {links.map(({ label, href }, index) => (
        <Fragment key={href}>
          {index > 0 && <span className="text-gray-300">·</span>}
          {href.startsWith('/') ? (
            <Link href={href} className={LINK_CLASS}>
              {label}
            </Link>
          ) : (
            <a
              href={href}
              className={LINK_CLASS}
              {...(href.startsWith('http') && {
                target: '_blank',
                rel: 'noopener noreferrer',
              })}
            >
              {label}
            </a>
          )}
        </Fragment>
      ))}
    </div>
  );
}
