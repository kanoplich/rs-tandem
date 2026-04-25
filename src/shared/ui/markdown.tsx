import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { useTheme } from '../hooks';

SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('js', javascript);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('html', markup);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('ts', typescript);

interface MarkdownProps {
  children: string;
}

export const Markdown = ({ children }: MarkdownProps) => {
  const { theme } = useTheme();

  return (
    <ReactMarkdown
      components={{
        code({ children: codeChildren, className }) {
          const match = /language-(\w+)/.exec(className || '');

          return match ? (
            <SyntaxHighlighter
              language={match[1]}
              PreTag="div"
              wrapLines={true}
              wrapLongLines={true}
              style={theme === 'light' ? oneLight : oneDark}
            >
              {String(codeChildren).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className}>{codeChildren}</code>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
