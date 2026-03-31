import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

import type { ChatMessage as ChatMessageType } from '../lib/types';

import { ChatInput } from './chat-input';
import { ChatMessage } from './chat-message';

import { Button } from '@/shared/ui/button';

interface ChatPanelProps {
  isOpen: boolean;
  messages: ChatMessageType[];
  isStreaming: boolean;
  onClose: () => void;
  onSend: (message: string) => void;
}

export const ChatPanel = ({ isOpen, messages, isStreaming, onClose, onSend }: ChatPanelProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed right-0 top-0 h-full w-[400px] max-w-[90vw] bg-background border-l shadow-xl z-50 flex flex-col"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-sm">AI Assistant</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <p className="text-muted-foreground text-sm text-center mt-8">
                Задайте вопрос по текущему заданию, и я помогу разобраться.
              </p>
            )}
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
          </div>

          <ChatInput onSend={onSend} disabled={isStreaming} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
