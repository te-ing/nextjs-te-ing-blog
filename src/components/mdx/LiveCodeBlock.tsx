'use client';

import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

interface LiveCodeBlockProps {
  code: string;
  language?: 'css' | 'jsx' | 'tsx';
  scope?: Record<string, unknown>;
  noInline?: boolean;
}

const theme = {
  plain: {
    color: '#e4e4e7',
    backgroundColor: '#18181b',
  },
  styles: [
    { types: ['comment', 'prolog', 'doctype', 'cdata'], style: { color: '#6b7280' } },
    { types: ['punctuation'], style: { color: '#a1a1aa' } },
    { types: ['property', 'tag', 'boolean', 'number', 'constant', 'symbol'], style: { color: '#f472b6' } },
    { types: ['selector', 'attr-name', 'string', 'char', 'builtin'], style: { color: '#a5f3fc' } },
    { types: ['operator', 'entity', 'url'], style: { color: '#fbbf24' } },
    { types: ['atrule', 'attr-value', 'keyword'], style: { color: '#c4b5fd' } },
    { types: ['function', 'class-name'], style: { color: '#60a5fa' } },
    { types: ['regex', 'important', 'variable'], style: { color: '#f97316' } },
  ],
};

export function LiveCodeBlock({
  code,
  language = 'jsx',
  scope = {},
  noInline = false,
}: LiveCodeBlockProps) {
  const isCssOnly = language === 'css';

  const wrappedCode = isCssOnly
    ? `<>
  <style>{\`${code}\`}</style>
  <div className="demo-container">
    <div className="demo-box">CSS Demo Box</div>
  </div>
</>`
    : code;

  return (
    <div className="my-6 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <LiveProvider
        code={wrappedCode}
        scope={scope}
        noInline={noInline}
        theme={theme}
      >
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 flex items-center justify-between">
            <span>코드 편집기</span>
            <span className="text-gray-400">{language.toUpperCase()}</span>
          </div>
          <div className="text-sm">
            <LiveEditor
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                fontSize: '14px',
                padding: '16px',
                backgroundColor: '#18181b',
              }}
            />
          </div>
        </div>

        <div>
          <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            미리보기
          </div>
          <div className="p-4 bg-white dark:bg-gray-900 min-h-[100px]">
            <LivePreview />
          </div>
        </div>

        <LiveError className="px-4 py-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-t border-red-200 dark:border-red-800" />
      </LiveProvider>
    </div>
  );
}
