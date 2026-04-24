import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

import { ROLES } from '../lib/constants';
import type { ChatMessage as ChatMessageType } from '../lib/types';
import { CHAT_MESSAGE_TEXT } from '../locales';

import { Markdown } from '@/shared';
import { Button, cn } from '@/shared';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === ROLES.user;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm',
          isUser ? 'bg-primary rounded-br-md' : 'bg-muted rounded-bl-md group'
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap text-primary-foreground">{message.content}</p>
        ) : (
          <>
            <Markdown>{message.content || '...'}</Markdown>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="mt-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
              title={CHAT_MESSAGE_TEXT.COPY}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
