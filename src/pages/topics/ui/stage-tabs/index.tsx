import { StageOverview } from '../stage-overview';

import { STAGES, DEFAULT_STAGES_VALUE, Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared';
import type { Topic, TopicProgress } from '@/shared/api';

interface StageTabsProps {
  groupedByStage: Record<number, (Topic & Partial<TopicProgress>)[]>;
}

export const StageTabs = ({ groupedByStage }: StageTabsProps) => {
  return (
    <section className="container mx-auto max-w-7xl px-4 pt-6">
      <Tabs defaultValue={String(DEFAULT_STAGES_VALUE)} className="w-full mx-auto max-w-312">
        <TabsList variant="stages">
          {STAGES.map((stage) => (
            <TabsTrigger key={stage.id} value={String(stage.id)} variant="stages">
              {stage.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {STAGES.map((stage) => {
          const topics = groupedByStage[stage.id] ?? [];
          return (
            <TabsContent key={stage.id} value={String(stage.id)} className="mt-4 w-full mx-auto">
              <StageOverview stageId={stage.id} topics={topics} />
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
};
