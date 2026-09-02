import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import { markdownStyles } from '@/styles/markdown';
import type { ProjectCode } from './aboutContants';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);

export default function CodeBlock({
  file,
  note,
  language,
  source,
}: ProjectCode) {
  const { value } = hljs.highlight(source, { language });

  return (
    <figure className="flex flex-col gap-1.5 print:break-inside-avoid">
      <figcaption className="font-mono text-[12px] text-gray-500">
        {file}
        {note && <span className="text-gray-400"> · {note}</span>}
      </figcaption>
      <pre
        className={`${markdownStyles.pre} mb-0 text-[13px] leading-relaxed print:text-[11px] print:leading-snug print:whitespace-pre-wrap print:break-words`}
      >
        <code
          className={`hljs language-${language}`}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </pre>
    </figure>
  );
}
