import { StageOverview } from '../stage-overview';
import { TopicGrid } from '../topic-grid';
import { TopicToolbar } from '../topic-toolbar';

import { DEFAULT_STAGES_VALUE, STAGES, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared';
import type { Topic, TopicProgress } from '@/shared/api';

interface StageTabsProps {
  groupedTopics: Record<number, Topic[]>;
  groupedProgress: Record<number, TopicProgress[]>;
  selectedTopicIds: Set<string>;
  onTopicToggle: (topicId: string, checked: boolean) => void;
  onSelectAll: (stageId: number) => void;
  onDeselectAll: (stageId: number) => void;
  onStartTraining: () => void;
  onContinue: (topicId: string) => void;
  onRestart: (topicId: string) => void;
  onStageChange: () => void;
}

export const StageTabs = ({
  groupedTopics,
  groupedProgress,
  selectedTopicIds,
  onTopicToggle,
  onSelectAll,
  onDeselectAll,
  onStartTraining,
  onContinue,
  onRestart,
  onStageChange,
}: StageTabsProps) => {
  return (
    <Tabs defaultValue={String(DEFAULT_STAGES_VALUE)} onValueChange={onStageChange}>
      <TabsList variant="stages">
        {STAGES.map((stage) => (
          <TabsTrigger key={stage.id} value={String(stage.id)} variant="stages">
            {stage.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {STAGES.map((stage) => {
        const stageTopics = groupedTopics[stage.id] ?? [];
        const stageProgress = groupedProgress[stage.id] ?? [];
        const stageSelectedCount = stageTopics.filter((t) => selectedTopicIds.has(t.id)).length;

        return (
          <TabsContent key={stage.id} value={String(stage.id)} className="space-y-6">
            <StageOverview
              stageId={stage.id}
              totalTopics={stageTopics.length}
              progress={stageProgress}
            />
            <TopicToolbar
              selectedCount={stageSelectedCount}
              onSelectAll={() => onSelectAll(stage.id)}
              onDeselectAll={() => onDeselectAll(stage.id)}
              onStartTraining={() => onStartTraining()}
            />
            <TopicGrid
              topics={stageTopics}
              progress={stageProgress}
              selectedTopicIds={selectedTopicIds}
              onTopicToggle={onTopicToggle}
              onContinue={onContinue}
              onRestart={onRestart}
            />
          </TabsContent>
        );
      })}
    </Tabs>
  );
};
