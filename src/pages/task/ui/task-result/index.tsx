import { useNavigate } from 'react-router-dom';

import { TASK_RESULT } from '../../locales';

import { Button, Card, CardContent, CardHeader, CardTitle, ROUTES } from '@/shared';
import type { JudgeResult } from '@/shared/api';

interface TaskResultProps {
  result: JudgeResult;
  onNext: () => void;
  onRetry: () => void;
  isPassed: boolean;
  isLastTask: boolean;
}

export const TaskResult = ({ result, onNext, onRetry, isPassed, isLastTask }: TaskResultProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLastTask) {
      navigate(ROUTES.DASHBOARD);
    } else {
      onNext();
    }
  };

  return (
    <section className="pb-6">
      <Card className={`border-0 ${isPassed ? 'bg-success/10' : 'bg-destructive/10'}`}>
        <CardHeader>
          <CardTitle className={`text-lg ${isPassed ? 'text-success' : 'text-destructive'}`}>
            {result.score} / {result.maxScore}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {result.coveredPoints.length > 0 && (
            <div className="flex flex-col gap-1">
              {result.coveredPoints.map((point, i) => (
                <p key={i} className="text-sm text-success dark:text-success">
                  ✓ {point}
                </p>
              ))}
            </div>
          )}
          {result.missedPoints.length > 0 && (
            <div className="flex flex-col gap-1">
              {result.missedPoints.map((point, i) => (
                <p key={i} className="text-sm text-destructive dark:text-destructive">
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
              <Button className="cursor-pointer" onClick={onRetry} variant="outline">
                {TASK_RESULT.RETRY}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
