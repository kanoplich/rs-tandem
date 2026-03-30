import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { TASK_HEADER } from '@/pages/task/locales';
import { Badge, ROUTES, STAGES } from '@/shared';

interface TaskHeaderProps {
  currentTaskNumber: number;
  stageNumber: number;
  tasksCount: number;
}

export const TaskHeader = ({ currentTaskNumber, stageNumber, tasksCount }: TaskHeaderProps) => {
  const navigate = useNavigate();
  const stage = STAGES.find((stage) => stage.id === stageNumber);

  return (
    <section className="pt-8 pb-6">
      <div className="flex items-center gap-4">
        <ArrowLeft className="cursor-pointer" onClick={() => navigate(ROUTES.TOPICS)} />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h1 className="text-base">{TASK_HEADER.TITLE}</h1>
            <Badge variant="active">{stage?.title}</Badge>
          </div>
          <div>
            {TASK_HEADER.QUESTION} {currentTaskNumber} {TASK_HEADER.FROM} {tasksCount}
          </div>
        </div>
      </div>
    </section>
  );
};
