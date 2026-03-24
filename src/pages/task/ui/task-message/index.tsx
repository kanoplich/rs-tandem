import { useState } from 'react';
import Markdown from 'react-markdown';

import { TASK_MESSAGE } from '../../locales';

import { Button } from '@/shared';

interface TaskMessageProps {
  onSubmit: (value: string) => void;
}

export const TaskMessage = ({ onSubmit }: TaskMessageProps) => {
  const [showUserMessage, setShowUserMessage] = useState('');
  const [userMessage, setUserMessage] = useState('');

  const isEmptyMessage = !userMessage.trim();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (userMessage) {
      setShowUserMessage(userMessage);
      onSubmit(userMessage);
      setUserMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && userMessage.trim()) {
      e.preventDefault();
      if (userMessage) {
        setShowUserMessage(userMessage);
        onSubmit(userMessage);
        setUserMessage('');
      }
    }
  };
  return (
    <section className="pb-6">
      <div className="p-3 sm:p-6 rounded-xl bg-card border border-border">
        {showUserMessage ? (
          <Markdown>{showUserMessage}</Markdown>
        ) : (
          <form onSubmit={handleSubmit}>
            <textarea
              className="[scrollbar-width:none] w-full min-h-[120px] text-sm px-3 py-2 rounded-md bg-input focus:outline-none"
              name="task-message"
              id="task-message"
              value={userMessage}
              onKeyDown={handleKeyDown}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder={TASK_MESSAGE.PLACEHOLDER}
            ></textarea>
            <Button className="cursor-pointer transition-opacity w-full" disabled={isEmptyMessage}>
              {TASK_MESSAGE.BUTTON_TEXT}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};
