import { useCallback, useEffect, useRef, useState, type JSX } from 'react';

import { TASK_CHAT } from '../../locales';

import styles from './styles.module.css';

import type { Message } from '@/shared';
import type { Task } from '@/shared/api';
import { BotIcon, SendButton } from '@/shared/assets/icons';
import { cn } from '@/shared/lib/utils';

interface TaskChatProps {
  tasks: Task[];
  currentIndex: number;
  topicsCount: number;
}

export const TaskChat = ({ tasks, topicsCount, currentIndex }: TaskChatProps) => {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  const getCurrentTime = useCallback(() => {
    return new Date().toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }, []);

  const getId = useCallback(() => {
    return Date.now().toString();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0 && topicsCount > 0) {
      const helloMessage = `Привет! Я твой интервьюер для Stage 1. Мы будем тренироваться по ${topicsCount} выбранным
            темам. Готов начать? Отвечай развернуто и подробно. Давай начнем!`;

      const newMessage: Message = {
        id: getId(),
        text: helloMessage,
        time: getCurrentTime(),
        isBot: true,
      };

      const showHelloMessage = () => {
        setMessages((prev) => [...prev, newMessage]);
      };

      showHelloMessage();
    }
  }, [topicsCount]);

  useEffect(() => {
    if (tasks[currentIndex]) {
      const nextTask = (index: number) => {
        if (tasks[index]) {
          const newMessage: Message = {
            id: getId(),
            text: tasks[index].questionText,
            time: getCurrentTime(),
            isBot: true,
          };

          if (!messages.some((msg) => msg.text === newMessage.text)) {
            setMessages((prev) => [...prev, newMessage]);
          }
        }
      };
      nextTask(currentIndex);
    }
  }, [currentIndex, tasks]);

  const handleSendUserMessage = () => {
    if (userMessage.trim()) {
      const newMessage: Message = {
        id: getId(),
        text: userMessage,
        time: getCurrentTime(),
        isBot: false,
      };
      setMessages((prev) => [...prev, newMessage]);
      setUserMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendUserMessage();
    }
  };

  const showMessage = (message: Message) => {
    return (
      <div
        key={message.id}
        className={cn(message.isBot ? 'justify-start' : 'justify-end pl-12', 'flex gap-3 pb-4')}
      >
        {message.isBot && <BotIcon className="w-8 h-8" />}
        <div className="flex flex-col gap-1 max-w-[80%]">
          <p className="p-4 rounded-lg border border-border">{message.text}</p>
          <div className="text-xs pl-1">{message.time}</div>
        </div>
      </div>
    );
  };

  return (
    <section className="pb-6">
      <div
        ref={containerRef}
        className={cn(
          styles.customScrollbar,
          'mx-auto max-w-5xl h-[360px] p-6 rounded-t-xl bg-card border border-border overflow-y-auto'
        )}
      >
        {messages.map((msg) => showMessage(msg))}
      </div>
      <div className="mx-auto max-w-5xl p-6 rounded-b-xl bg-card border-x border-b border-border">
        <div className="flex items-end gap-2">
          <textarea
            className={cn(
              styles.customScrollbar,
              'w-full min-h-[80px] text-sm px-3 py-2 rounded-md bg-input focus:outline-none resize-none'
            )}
            name="task-message"
            id="task-chat"
            value={userMessage}
            onKeyDown={handleKeyDown}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder={TASK_CHAT.PLACEHOLDER}
          ></textarea>
          <SendButton
            className={cn(
              cn(
                'cursor-pointer transition-opacity',
                !userMessage.trim() && 'opacity-50 cursor-not-allowed'
              )
            )}
            onClick={handleSendUserMessage}
          />
        </div>
      </div>
    </section>
  );
};
