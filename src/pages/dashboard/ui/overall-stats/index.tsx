import { OVERALL_STATS_TEXT } from '../../locales';
import { getTopicStats } from '../../model/get-topic-stats';
import { StatCard } from '../stat-card';

import type { TopicProgress } from '@/shared/api';
import { ProgressIcon, StatisticIcon, TopicIcon } from '@/shared/assets/icons';

interface OverallStatsProps {
  topicProgress: TopicProgress[];
}

export const OverallStats = ({ topicProgress: allTopics }: OverallStatsProps) => {
  const { completedTopics, progress, averageScore } = getTopicStats(allTopics);

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
          stats={`${completedTopics.length}/${allTopics.length}`}
        />
      </div>
    </section>
  );
};
