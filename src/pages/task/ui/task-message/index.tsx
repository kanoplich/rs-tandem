import { useState } from 'react';

import { TASK_MESSAGE } from '../../locales';

import { Button, Textarea } from '@/shared';

interface TaskMessageProps {
  onSubmit: (message: string) => Promise<void>;
}

export const TaskMessage = ({ onSubmit }: TaskMessageProps) => {
  const [userMessage, setUserMessage] = useState('');

  const isEmptyMessage = !userMessage.trim();

  const sendMessage = () => {
    if (userMessage) {
      onSubmit(userMessage);
      setUserMessage('');
    }
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && userMessage.trim()) {
      e.preventDefault();
      sendMessage();
    }
  };
  return (
    <section className="pb-6">
      <div className="p-3 sm:p-6 rounded-xl bg-card border border-border">
        <form onSubmit={handleSubmit}>
          <Textarea
            className="[scrollbar-width:none] min-h-[120px]"
            value={userMessage}
            onKeyDown={handleKeyDown}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder={TASK_MESSAGE.PLACEHOLDER}
          ></Textarea>
          <Button
            className="cursor-pointer transition-opacity w-full mt-2"
            disabled={isEmptyMessage}
          >
            {TASK_MESSAGE.BUTTON_TEXT}
          </Button>
        </form>
      </div>
    </section>
  );
};
