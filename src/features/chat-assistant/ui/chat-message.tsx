import Markdown from 'react-markdown';

import { ROLES } from '../lib/constants';
import type { ChatMessage as ChatMessageType } from '../lib/types';

import { cn } from '@/shared/lib/utils';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === ROLES.user;

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm',
          isUser ? 'bg-primary rounded-br-md' : 'bg-muted rounded-bl-md'
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap text-primary-foreground">{message.content}</p>
        ) : (
          <Markdown
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              ol: ({ children }) => (
                <ol className="list-decimal pl-5 mb-2 last:mb-0">{children}</ol>
              ),
              ul: ({ children }) => <ul className="list-disc pl-5 mb-2 last:mb-0">{children}</ul>,
              li: ({ children }) => <li className="mb-1 last:mb-0">{children}</li>,
              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
              code: ({ children }) => (
                <code className="bg-background/50 rounded px-1 py-0.5 text-[0.8em]">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-background/50 rounded p-2 my-2 overflow-x-auto text-[0.85em]">
                  {children}
                </pre>
              ),
            }}
          >
            {message.content || '...'}
          </Markdown>
        )}
      </div>
    </div>
  );
};
