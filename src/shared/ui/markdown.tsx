import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { useTheme } from '../hooks';

interface MarkdownProps {
  children: string;
}

export const Markdown = ({ children }: MarkdownProps) => {
  const { theme } = useTheme();

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ children: codeChildren, className, node, style: _, ref: __, ...rest }) {
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : 'javascript';

          const isInline =
            !node?.position ||
            node.position.start.column !== 1 ||
            node.position.start.line === node.position.end.line;

          return isInline ? (
            <code className={className} {...rest}>
              {codeChildren}
            </code>
          ) : (
            <SyntaxHighlighter
              language={language}
              PreTag="div"
              showLineNumbers
              wrapLines={true}
              wrapLongLines={true}
              style={theme === 'light' ? oneLight : oneDark}
              {...rest}
            >
              {String(codeChildren).replace(/\n$/, '')}
            </SyntaxHighlighter>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
