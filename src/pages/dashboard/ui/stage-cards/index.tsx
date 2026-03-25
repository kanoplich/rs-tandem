import { STAGE_CARDS_TEXT } from '../../locales';

import { Progress } from '@/shared';

export const StageCards = () => {
  const cards = [
    {
      id: 'stage_1',
      name: STAGE_CARDS_TEXT.STAGE_1_NAME,
      description: STAGE_CARDS_TEXT.STAGE_1_DESCRIPTION,
      progress: 65,
      topics_finished: '8/12',
      average_score: '7.8/10',
    },
    {
      id: 'stage_2',
      name: STAGE_CARDS_TEXT.STAGE_2_NAME,
      description: STAGE_CARDS_TEXT.STAGE_2_DESCRIPTION,
      progress: 42,
      topics_finished: '6/15',
      average_score: '6.5/10',
    },
    {
      id: 'stage_3',
      name: STAGE_CARDS_TEXT.STAGE_3_NAME,
      description: STAGE_CARDS_TEXT.STAGE_3_DESCRIPTION,
      progress: 20,
      topics_finished: '2/10',
      average_score: '5.2/10',
    },
  ];

  return (
    <section className="mb-8 flex flex-col gap-4">
      <p className="text-light">{STAGE_CARDS_TEXT.HEADER}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => {
          return (
            <div
              key={card.id}
              className="bg-card border border-border rounded-xl flex flex-col justify-between gap-6"
            >
              <div className="p-6 pb-1.5 flex flex-row justify-between">
                <div className="flex flex-col gap-2">
                  <p className="text-light">{card.name}</p>
                  <p>{card.description}</p>
                </div>
                <div className="ml-3 mb-3 px-3 py-1 bg-primary h-fit rounded-full">
                  <p className="text-light-foreground font-bold">{card.progress}%</p>
                </div>
              </div>
              <div className="px-6 pb-6 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row justify-between">
                    <p>{STAGE_CARDS_TEXT.PROGRESS_TITLE}</p>
                    <div className="flex flex-row font-bold gap-1">
                      <p className="text-light">{card.topics_finished}</p>
                      <p className="text-light">{STAGE_CARDS_TEXT.PROGRESS_ITEM}</p>
                    </div>
                  </div>
                  <div>
                    <Progress value={card.progress} />
                  </div>
                </div>
                <div>
                  <div className="pt-2 flex flex-row justify-between border-t border-border items-center">
                    <p>{STAGE_CARDS_TEXT.AVERAGE_SCORE_TITLE}</p>
                    <p className="text-primary text-2xl font-bold">{card.average_score}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
