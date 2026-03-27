import { StageOverview } from '../stage-overview';

import { STAGES, DEFAULT_STAGES_VALUE, Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared';
import type { Topic, TopicProgress } from '@/shared/api';

interface StageTabsProps {
  groupedTopics: Record<number, Topic[]>;
  groupedProgress: Record<number, TopicProgress[]>;
}

export const StageTabs = ({ groupedTopics, groupedProgress }: StageTabsProps) => {
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
        {STAGES.map((stage) => (
          <TabsContent key={stage.id} value={String(stage.id)}>
            <StageOverview
              stageId={stage.id}
              topics={groupedTopics[stage.id] ?? []}
              progress={groupedProgress[stage.id] ?? []}
            />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};
