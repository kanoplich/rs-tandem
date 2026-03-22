import { useState } from 'react';

import { TASK_MESSAGE } from '../../locales';

import { Button } from '@/shared';
import { cn } from '@/shared/lib/utils';

interface TaskMessageProps {
  setUserAnswer: (message: string) => void;
}

export const TaskMessage = ({ setUserAnswer }: TaskMessageProps) => {
  const [userMessage, setUserMessage] = useState('');

  const handleSendUserMessage = () => {
    if (userMessage.trim()) {
      setUserAnswer(userMessage);
      setUserMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendUserMessage();
    }
  };
  return (
    <section className="pb-6">
      <div className="mx-auto max-w-5xl">
        <textarea
          className="[scrollbar-width:thin] w-full min-h-[120px] text-sm px-3 py-2 rounded-md bg-input focus:outline-none"
          name="task-message"
          id="task-message"
          value={userMessage}
          onKeyDown={handleKeyDown}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder={TASK_MESSAGE.PLACEHOLDER}
        ></textarea>
        <Button
          className={cn(
            cn(
              'cursor-pointer transition-opacity w-full',
              !userMessage.trim() && 'opacity-50 cursor-not-allowed'
            )
          )}
          onClick={handleSendUserMessage}
        >
          {TASK_MESSAGE.BUTTON_TEXT}
        </Button>
      </div>
    </section>
  );
};
