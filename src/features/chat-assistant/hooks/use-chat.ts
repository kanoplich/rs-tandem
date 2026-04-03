import { useCallback, useState } from 'react';

import { sendChatMessage } from '../api/chat';
import { ROLES } from '../lib/constants';
import type { ChatMessage } from '../lib/types';
import { ERROR_CHAT_MESSAGE_TEXT } from '../locales';

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
        role: ROLES.user,
        content: text.trim(),
      };

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: ROLES.assistant,
        content: '',
      };

      setMessages((prev) => [...prev, userMessage, assistantMessage]);
      setIsStreaming(true);

      let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;

      try {
        const history = messages.map(({ role, content }) => ({ role, content }) as const);

        reader = await sendChatMessage({
          message: text.trim(),
          ...(taskId && { taskId }),
          history,
        });

        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id ? { ...msg, content: msg.content + chunk } : msg
            )
          );
        }
      } catch {
        reader?.cancel();
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessage.id ? { ...msg, content: ERROR_CHAT_MESSAGE_TEXT } : msg
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
