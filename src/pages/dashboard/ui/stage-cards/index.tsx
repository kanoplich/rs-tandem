import { STAGE_CARDS_TEXT } from '../../locales';
import { getTopicStats } from '../../model/get-topic-stats';
import { StageCard } from '../stage-card';

import { groupByStage } from '@/shared';
import type { TopicProgress } from '@/shared/api';

interface StageCardsProps {
  topicProgress: TopicProgress[];
}

export const StageCards = ({ topicProgress }: StageCardsProps) => {
  const stages = groupByStage(topicProgress);

  return (
    <section className="mb-8 flex flex-col gap-4">
      <p className="text-light">{STAGE_CARDS_TEXT.HEADER}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(stages).map(([stageId, topics]) => {
          const { completedTopics, progress, averageScore } = getTopicStats(topics);
          return (
            <StageCard
              key={stageId}
              id={Number(stageId)}
              allTopics={topics}
              completedTopics={completedTopics}
              progress={progress}
              averageScore={averageScore}
            />
          );
        })}
      </div>
    </section>
  );
};
