import type { TopicWithProgress } from '@/shared/api';

export const groupByStage = (topics: TopicWithProgress[]): Record<number, TopicWithProgress[]> => {
  const grouped = topics.reduce<Record<number, TopicWithProgress[]>>((acc, topic) => {
    const stage = topic.stage;
    if (!acc[stage]) acc[stage] = [];
    (acc[stage] ??= []).push(topic);
    return acc;
  }, {});

  for (const stage in grouped) {
    grouped[stage].sort((a, b) => {
      const orderA = a.sort_order ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.sort_order ?? Number.MAX_SAFE_INTEGER;
      if (orderA !== orderB) return orderA - orderB;
      return a.title.localeCompare(b.title);
    });
  }

  return grouped;
};
