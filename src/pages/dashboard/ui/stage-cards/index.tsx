import { useMemo } from 'react';

import { getTopicStats } from '../../lib/get-topic-stats';
import { STAGE_CARDS_TEXT } from '../../locales';
import { StageCard } from '../stage-card';

import { groupByStage } from '@/shared';
import type { TopicProgress } from '@/shared/api';

interface StageCardsProps {
  topicProgress: TopicProgress[];
}

export const StageCards = ({ topicProgress }: StageCardsProps) => {
  const stagesWithStats = useMemo(() => {
    const stages = groupByStage(topicProgress);

    return Object.entries(stages).map(([stageId, stageTopics]) => {
      const { topicsCount, completedCount, progress, averageScore } = getTopicStats(stageTopics);

      return {
        id: Number(stageId),
        topicsCount,
        completedCount,
        progress,
        averageScore,
      };
    });
  }, [topicProgress]);

  return (
    <section className="mb-8 flex flex-col gap-4">
      <p className="text-light">{STAGE_CARDS_TEXT.HEADER}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stagesWithStats.map((stage) => (
          <StageCard
            key={stage.id}
            id={stage.id}
            topicsCount={stage.topicsCount}
            completedCount={stage.completedCount}
            progress={stage.progress}
            averageScore={stage.averageScore}
          />
        ))}
      </div>
    </section>
  );
};
