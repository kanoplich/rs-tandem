import { useMemo } from 'react';

import { getTopicStats } from '../../lib/get-topic-stats';
import { OVERALL_STATS_TEXT } from '../../locales';
import { StatCard } from '../stat-card';

import type { TopicProgress } from '@/shared/api';
import { ProgressIcon, StatisticIcon, TopicIcon } from '@/shared/assets/icons';

interface OverallStatsProps {
  topicProgress: TopicProgress[];
}

export const OverallStats = ({ topicProgress }: OverallStatsProps) => {
  const { topicsCount, completedCount, progress, averageScore } = useMemo(
    () => getTopicStats(topicProgress),
    [topicProgress]
  );

  return (
    <section className="mb-8 bg-card border border-border rounded-xl">
      <p className="pt-5 px-6 text-light">{OVERALL_STATS_TEXT.HEADER}</p>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 ">
        <StatCard
          icon={<ProgressIcon />}
          description={OVERALL_STATS_TEXT.GENERAL_PROGRESS_CARD_TEXT}
          stats={`${progress}%`}
        />
        <StatCard
          icon={<TopicIcon />}
          description={OVERALL_STATS_TEXT.AVERAGE_SCORE_CARD_TEXT}
          stats={`${averageScore}/10`}
        />
        <StatCard
          icon={<StatisticIcon />}
          description={OVERALL_STATS_TEXT.TOPICS_FINISHED_CARD_TEXT}
          stats={`${completedCount}/${topicsCount}`}
        />
      </div>
    </section>
  );
};
