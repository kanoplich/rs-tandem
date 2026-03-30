import { StageOverview } from '../stage-overview';
import { TopicGrid } from '../topics-grid';

import { STAGES, DEFAULT_STAGES_VALUE, Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared';
import type { Topic, TopicProgress } from '@/shared/api';

interface StageTabsProps {
  groupedTopics: Record<number, Topic[]>;
  groupedProgress: Record<number, TopicProgress[]>;
  selectedTopicIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
}

export const StageTabs = ({
  groupedTopics,
  groupedProgress,
  selectedTopicIds,
  onSelectionChange,
}: StageTabsProps) => {
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
          <TabsContent key={stage.id} value={String(stage.id)} className="space-y-4">
            <StageOverview
              stageId={stage.id}
              totalTopics={groupedTopics[stage.id]?.length ?? 0}
              progress={groupedProgress[stage.id] ?? []}
            />
            <TopicGrid
              topics={groupedProgress[stage.id] ?? []}
              selectedTopicIds={selectedTopicIds}
              onSelectionChange={onSelectionChange}
            />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};
