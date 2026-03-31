import { useCallback, useState } from 'react';

import { sendChatMessage } from '../api/chat';
import type { ChatMessage } from '../lib/types';

export const useChat = (taskId?: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isStreaming) return;

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content: text.trim(),
      };

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: '',
      };

      setMessages((prev) => [...prev, userMessage, assistantMessage]);
      setIsStreaming(true);

      try {
        const history = messages.map(({ role, content }) => ({ role, content }) as const);

        const reader = await sendChatMessage({
          message: text.trim(),
          ...(taskId && { taskId }),
          history,
        });

        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id ? { ...msg, content: msg.content + chunk } : msg
            )
          );
        }
      } catch {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessage.id
              ? { ...msg, content: 'Произошла ошибка. Попробуйте ещё раз.' }
              : msg
          )
        );
      } finally {
        setIsStreaming(false);
      }
    },
    [isStreaming, messages, taskId]
  );

  return { messages, isStreaming, isOpen, toggleOpen, sendMessage };
};
