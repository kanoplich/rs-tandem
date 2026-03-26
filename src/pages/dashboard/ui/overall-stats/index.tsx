import { OVERALL_STATS_TEXT } from '../../locales';
import { StatCard } from '../stat-card/stat-card';

import { ProgressIcon, StatisticIcon, TopicIcon } from '@/shared/assets/icons';

export const OverallStats = () => {
  return (
    <section className="mb-8 bg-card border border-border rounded-xl">
      <p className="pt-5 px-6 text-light">{OVERALL_STATS_TEXT.HEADER}</p>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 ">
        <StatCard
          icon={<ProgressIcon />}
          description={OVERALL_STATS_TEXT.GENERAL_PROGRESS_CARD_TEXT}
          stats={'42%'}
        />
        <StatCard
          icon={<TopicIcon />}
          description={OVERALL_STATS_TEXT.AVERAGE_SCORE_CARD_TEXT}
          stats={'6.5/10'}
        />
        <StatCard
          icon={<StatisticIcon />}
          description={OVERALL_STATS_TEXT.TOPICS_FINISHED_CARD_TEXT}
          stats={'16/37'}
        />
      </div>
    </section>
  );
};
