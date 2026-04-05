import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTopicsData } from './hooks/use-topics-data';
import { StageTabs, TopicHeader } from './ui';

import { groupByStage, Loader, ROUTES, TASK_MODES, type TaskMode } from '@/shared';

export const Topics = () => {
  const { topics, progress, isLoading } = useTopicsData();
  const [selectedTopicIds, setSelectedTopicIds] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const groupedTopics = useMemo(() => groupByStage(topics), [topics]);
  const groupedProgress = useMemo(() => groupByStage(progress), [progress]);

  const handleTopicToggle = useCallback((topicId: string, checked: boolean) => {
    setSelectedTopicIds((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(topicId);
      } else {
        next.delete(topicId);
      }
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(
    (stageId: number) => {
      const stageTopics = groupedTopics[stageId] ?? [];
      setSelectedTopicIds((prev) => {
        const next = new Set(prev);
        for (const t of stageTopics) {
          next.add(t.id);
        }
        return next;
      });
    },
    [groupedTopics]
  );

  const handleDeselectAll = useCallback(
    (stageId: number) => {
      const stageTopics = groupedTopics[stageId] ?? [];
      setSelectedTopicIds((prev) => {
        const next = new Set(prev);
        for (const t of stageTopics) {
          next.delete(t.id);
        }
        return next;
      });
    },
    [groupedTopics]
  );

  const handleStageChange = useCallback(() => {
    setSelectedTopicIds(new Set());
  }, []);

  const buildTaskUrl = useCallback(({ topicIds, mode }: { topicIds: string; mode: TaskMode }) => {
    const params = new URLSearchParams({ topics: topicIds, mode });
    return `${ROUTES.TASK}?${params.toString()}`;
  }, []);

  const handleStartTraining = useCallback(() => {
    const topicIds = Array.from(selectedTopicIds).join(',');
    navigate(buildTaskUrl({ topicIds, mode: TASK_MODES.continue }));
  }, [selectedTopicIds, navigate, buildTaskUrl]);

  const handleContinue = useCallback(
    (topicId: string) => {
      navigate(buildTaskUrl({ topicIds: topicId, mode: TASK_MODES.continue }));
    },
    [navigate, buildTaskUrl]
  );

  const handleRestart = useCallback(
    (topicId: string) => {
      navigate(buildTaskUrl({ topicIds: topicId, mode: TASK_MODES.restart }));
    },
    [navigate, buildTaskUrl]
  );

  if (isLoading) return <Loader />;

  return (
    <section className="container mx-auto max-w-7xl px-4 pt-6">
      <TopicHeader />
      <StageTabs
        groupedTopics={groupedTopics}
        groupedProgress={groupedProgress}
        selectedTopicIds={selectedTopicIds}
        onTopicToggle={handleTopicToggle}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
        onStartTraining={handleStartTraining}
        onContinue={handleContinue}
        onRestart={handleRestart}
        onStageChange={handleStageChange}
      />
    </section>
  );
};
