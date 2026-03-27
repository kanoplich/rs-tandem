import { useNavigate } from 'react-router-dom';

import { TASK_RESULT } from '../../locales';

import { Button, Card, CardContent, CardHeader, CardTitle, ROUTES } from '@/shared';
import type { JudgeResult } from '@/shared/api';

interface TaskResultProps {
  result: JudgeResult;
  handleNext: () => void;
  handleRetry: () => void;
  isPassed: boolean;
  isLastTask: boolean;
}

export const TaskResult = ({
  result,
  handleNext,
  handleRetry,
  isPassed,
  isLastTask,
}: TaskResultProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLastTask) {
      navigate(ROUTES.DASHBOARD);
    } else {
      handleNext();
    }
  };

  return (
    <section className="pb-6">
      <Card className={`border-0 ${isPassed ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
        <CardHeader>
          <CardTitle className={`text-lg ${isPassed ? 'text-green-500' : 'text-red-500'}`}>
            {result.score} / {result.maxScore}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {result.coveredPoints.length > 0 && (
            <div className="flex flex-col gap-1">
              {result.coveredPoints.map((point, i) => (
                <p key={i} className="text-sm text-green-600 dark:text-green-400">
                  ✓ {point}
                </p>
              ))}
            </div>
          )}
          {result.missedPoints.length > 0 && (
            <div className="flex flex-col gap-1">
              {result.missedPoints.map((point, i) => (
                <p key={i} className="text-sm text-red-600 dark:text-red-400">
                  ✗ {point}
                </p>
              ))}
            </div>
          )}
          <div className="flex gap-3">
            {isPassed ? (
              <Button className="cursor-pointer" onClick={handleClick}>
                {isLastTask ? TASK_RESULT.FINISH : TASK_RESULT.NEXT}
              </Button>
            ) : (
              <Button className="cursor-pointer" onClick={handleRetry} variant="outline">
                {TASK_RESULT.RETRY}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
