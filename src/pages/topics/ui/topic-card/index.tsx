import { Circle, CircleCheckBig, Play, RotateCcw } from 'lucide-react';

import { TOPIC_CARD_TEXT } from '../../locales';

import {
  isTopicCompleted,
  getProgressPercent,
  formatScore,
  Checkbox,
  Progress,
  Card,
  Button,
} from '@/shared';
import { cn } from '@/shared';
import type { Topic, TopicProgress } from '@/shared/api';

interface TopicCardProps {
  topic: Topic;
  progress: TopicProgress | undefined;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onContinue: (topicId: string) => void;
  onRestart: (topicId: string) => void;
}

export const TopicCard = ({
  topic,
  progress,
  checked,
  onCheckedChange,
  onContinue,
  onRestart,
}: TopicCardProps) => {
  const completed = progress ? isTopicCompleted(progress) : false;
  const inProgress = !completed && (progress?.completed ?? 0) > 0;
  const progressPercent = progress ? getProgressPercent(progress.completed, progress.total) : 0;

  return (
    <Card
      role="button"
      tabIndex={0}
      aria-pressed={checked}
      className="p-4 space-y-3 cursor-pointer transition-colors hover:bg-accent/50"
      onClick={() => onCheckedChange(!checked)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onCheckedChange(!checked);
        }
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={checked}
            onCheckedChange={(state) => onCheckedChange(state === true)}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="space-y-1">
            <p className="font-medium text-light leading-none">{topic.title}</p>
            {topic.description && (
              <p className="text-xs text-muted-foreground">{topic.description}</p>
            )}
            {completed && (
              <div className="flex items-center gap-1">
                <CircleCheckBig className="h-4 w-4 text-success" />
                <span className="text-xs text-success">{TOPIC_CARD_TEXT.COMPLETED}</span>
              </div>
            )}
            {inProgress && (
              <div className="flex items-center gap-1">
                <Circle className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{TOPIC_CARD_TEXT.IN_PROGRESS}</span>
              </div>
            )}
          </div>
        </div>

        {progress && progress.avgScore > 0 && (
          <div className="text-right">
            <span
              className={cn('text-lg font-semibold', completed ? 'text-success' : 'text-primary')}
            >
              {formatScore(progress.avgScore)}
            </span>
            <p className="text-xs text-muted-foreground">{TOPIC_CARD_TEXT.SCORE}</p>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{TOPIC_CARD_TEXT.PROGRESS}</span>
          <span className="font-medium">{progressPercent}%</span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      <div className="flex items-center gap-2">
        {!completed && (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onContinue(topic.id);
            }}
          >
            <Play className="h-3.5 w-3.5 mr-1" />
            {inProgress ? TOPIC_CARD_TEXT.CONTINUE : TOPIC_CARD_TEXT.START}
          </Button>
        )}
        {(completed || inProgress) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onRestart(topic.id);
            }}
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            {TOPIC_CARD_TEXT.RESTART}
          </Button>
        )}
      </div>
    </Card>
  );
};
