import { Circle, CircleCheckBig } from 'lucide-react';

import { TOPICS_CARD_TEXT, TOPICS_SUCCESS_TEXT } from '../../locales';

import { isTopicCompleted, getProgressPercent, formatScore } from '@/shared';
import type { TopicProgress } from '@/shared/api';
import { cn } from '@/shared/lib/utils';
import {
  Checkbox,
  Progress,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui';

interface TopicCardProps {
  topic: TopicProgress;
  checked?: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const TopicCard = ({ topic, checked = false, onCheckedChange }: TopicCardProps) => {
  const completed = isTopicCompleted(topic);
  const inProgress = !completed && topic.completed > 0;
  const progressPercent = getProgressPercent(topic.completed, topic.total);

  const attempts = topic.completed;

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-3">
          <Checkbox
            id={`topic-${topic.topicId}`}
            checked={checked}
            onCheckedChange={(state) => onCheckedChange(state === true)}
          />
          <CardTitle className="text-base font-medium leading-none">{topic.topicTitle}</CardTitle>
        </div>
        {completed && (
          <div className="flex items-center gap-1">
            <CircleCheckBig className="h-5 w-5" />
            <span className="text-sm text-success">{TOPICS_SUCCESS_TEXT.COMPLETED}</span>
          </div>
        )}
        {inProgress && (
          <div className="flex items-center gap-1">
            <Circle className="h-5 w-5" />
            <span className="text-sm">{TOPICS_SUCCESS_TEXT.INPROGRESS}</span>
          </div>
        )}
      </CardHeader>

      {(completed || inProgress) && (
        <CardContent className="space-y-3 pb-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{TOPICS_CARD_TEXT.SCORE}</span>
            <span className={cn('font-medium', completed && 'text-success')}>
              {formatScore(topic.avgScore)}/{topic.total}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{TOPICS_CARD_TEXT.PROGRESS}</span>
              <span className="font-medium">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </CardContent>
      )}

      {(completed || inProgress) && (
        <CardFooter className="pt-2 text-sm text-muted-foreground">
          <div>
            {TOPICS_CARD_TEXT.ATTEMPTS} {attempts}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
