import { useMemo } from 'react';

import { STAGE_CARDS_TEXT } from '../../locales';
import { StageCard } from '../stage-card';

import { getTopicStats, groupByStage } from '@/shared';
import type { TopicProgress } from '@/shared/api';

interface StageCardsProps {
  topicProgress: TopicProgress[];
}

export const StageCards = ({ topicProgress }: StageCardsProps) => {
  const stagesWithStats = useMemo(() => {
    const stages = groupByStage(topicProgress);

    return Object.entries(stages).map(([stageId, stageTopics]) => {
      const { totalCount, completedCount, progressPercent, averageScore } =
        getTopicStats(stageTopics);

      return {
        id: Number(stageId),
        totalCount,
        completedCount,
        progressPercent,
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
            totalCount={stage.totalCount}
            completedCount={stage.completedCount}
            progressPercent={stage.progressPercent}
            averageScore={stage.averageScore}
          />
        ))}
      </div>
    </section>
  );
};
