import { useCallback, useEffect, useRef, useState } from 'react';

import { sendChatMessage } from '../api/chat';
import { ROLES } from '../lib/constants';
import type { ChatMessage } from '../lib/types';

import { getErrorMessage } from '@/shared/api/judge/api-error';

export const useChat = (taskId?: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesRef = useRef<ChatMessage[]>([]);
  const isStreamingRef = useRef(false);

  messagesRef.current = messages;

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isStreamingRef.current) return;

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
      isStreamingRef.current = true;

      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;

      try {
        const history = messagesRef.current.map(
          ({ role, content }) => ({ role, content }) as const
        );

        reader = await sendChatMessage(
          {
            message: text.trim(),
            ...(taskId && { taskId }),
            history,
          },
          controller.signal
        );

        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            const remaining = decoder.decode();
            if (remaining) {
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMessage.id
                    ? { ...msg, content: msg.content + remaining }
                    : msg
                )
              );
            }
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          if (chunk.includes('[ERROR]')) break;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id ? { ...msg, content: msg.content + chunk } : msg
            )
          );
        }
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          const errorMsg = getErrorMessage(error);
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id ? { ...msg, content: errorMsg } : msg
            )
          );
        }
      } finally {
        reader?.cancel().catch(() => {});
        setIsStreaming(false);
        isStreamingRef.current = false;
      }
    },
    [taskId]
  );

  return { messages, isStreaming, isOpen, toggleOpen, sendMessage };
};
