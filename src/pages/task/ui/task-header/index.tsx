import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { TASK_HEADER } from '@/pages/task/locales';
import { ROUTES, STAGES } from '@/shared';
import type { Task } from '@/shared/api';

interface TaskHeaderProps {
  stageNumber: number;
  tasks: Task[];
}

export const TaskHeader = ({ stageNumber, tasks }: TaskHeaderProps) => {
  const navigate = useNavigate();
  const stage = STAGES.find((stage) => stage.id === stageNumber);
  const questionCount = tasks.length;

  return (
    <section className="pt-8 pb-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-4">
          <ArrowLeft className="cursor-pointer" onClick={() => navigate(ROUTES.TOPICS)} />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h2 className="text-base">{TASK_HEADER.TITLE}</h2>
              <div className="text-xs px-1 py-1.5 rounded bg-input">{stage?.title}</div>
            </div>
            <div>
              {TASK_HEADER.QUESTION} 1 {TASK_HEADER.FROM} {questionCount}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
