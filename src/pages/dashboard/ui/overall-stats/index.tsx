import { OVERALL_STATS_TEXT } from '../../locales';

import { ProgressIcon, StatisticIcon, TopicIcon } from '@/shared/assets/icons';

export const OverallStats = () => {
  const statsCards = [
    {
      id: 'general-progress',
      icon: <ProgressIcon />,
      description: OVERALL_STATS_TEXT.GENERAL_PROGRESS_CARD_TEXT,
      stats: '42%',
    },
    {
      id: 'average-score',
      icon: <TopicIcon />,
      description: OVERALL_STATS_TEXT.AVERAGE_SCORE_CARD_TEXT,
      stats: '6.5/10',
    },
    {
      id: 'topics-finished',
      icon: <StatisticIcon />,
      description: OVERALL_STATS_TEXT.TOPICS_FINISHED_CARD_TEXT,
      stats: '16/37',
    },
  ];

  return (
    <section className="mb-8 bg-card border border-border rounded-xl">
      <p className="pt-5 px-6 text-light">{OVERALL_STATS_TEXT.HEADER}</p>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 ">
        {statsCards.map((card) => {
          return (
            <div key={card.id} className="flex flex-row gap-4 items-start">
              <div className="flex flex-col justify-end">{card.icon}</div>
              <div className="flex flex-col justify-between h-full">
                <p className="text-sm">{card.description}</p>
                <p className="text-light text-2xl font-bold leading-8">{card.stats}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
