import { DEFAULT_VALUE } from '../../lib/constants';
import { STAGE_TEXT } from '../../locales';
import { StageOverview } from '../stage-overview';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared';

type StageId = 'Stage1' | 'Stage2' | 'Stage3';

export const StageTabs = () => {
  const mockProgress = {
    Stage1: { completed: 5, total: 12 },
    Stage2: { completed: 3, total: 10 },
    Stage3: { completed: 7, total: 15 },
  };

  return (
    <section className="container mx-auto max-w-7xl px-4 pt-6">
      <Tabs defaultValue={DEFAULT_VALUE} className="w-full max-w-312 mx-auto">
        <TabsList variant="stages">
          {STAGE_TEXT.map((stage) => (
            <TabsTrigger key={stage.ID} value={stage.ID} variant="stages">
              {stage.TITLE}
            </TabsTrigger>
          ))}
        </TabsList>
        {STAGE_TEXT.map((stage) => {
          const progress = mockProgress[stage.ID as StageId] || { completed: 0, total: 0 };
          return (
            <TabsContent key={stage.ID} value={stage.ID} className="mt-4 w-full mx-auto">
              <StageOverview
                title={stage.TITLE}
                completedTopics={progress.completed}
                totalTopics={progress.total}
              />
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
};
