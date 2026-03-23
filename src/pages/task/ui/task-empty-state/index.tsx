import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { TASK_EMPTY_STATE } from '../../locales';

import { Button, ROUTES } from '@/shared';

export const TaskEmptyState = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <h2 className="text-lg sm:text-xl font-semibold text-light tracking-wide">
        {TASK_EMPTY_STATE.TITLE}
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground">{TASK_EMPTY_STATE.DESCRIPTION}</p>
      <Button type="button" className="mt-8 cursor-pointer" onClick={() => navigate(ROUTES.TOPICS)}>
        <ArrowLeft />
        {TASK_EMPTY_STATE.BUTTON_TEXT}
      </Button>
    </div>
  );
};
