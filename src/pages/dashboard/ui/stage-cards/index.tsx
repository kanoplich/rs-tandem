import { STAGE_CARDS_TEXT } from '../../locales';
import { StageCard } from '../stage-card';

export const StageCards = () => {
  const cards = [
    {
      id: 1,
      progress: 65,
      topicsFinished: '8/12',
      averageScore: '7.8/10',
    },
    {
      id: 2,
      progress: 42,
      topicsFinished: '6/15',
      averageScore: '6.5/10',
    },
    {
      id: 3,
      progress: 20,
      topicsFinished: '2/10',
      averageScore: '5.2/10',
    },
  ];

  return (
    <section className="mb-8 flex flex-col gap-4">
      <p className="text-light">{STAGE_CARDS_TEXT.HEADER}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => {
          return (
            <StageCard
              key={card.id}
              id={card.id}
              progress={card.progress}
              topicsFinished={card.topicsFinished}
              averageScore={card.averageScore}
            />
          );
        })}
      </div>
    </section>
  );
};
