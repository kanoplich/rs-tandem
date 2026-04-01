import { describe, it, expect } from 'vitest';

import type { TopicProgress } from '../api';

import { getTopicStats } from './get-topic-stats';

describe('getTopicStats', () => {
  it('returns zero value for empty array', () => {
    const result = getTopicStats([]);

    expect(result).toEqual({
      totalCount: 0,
      completedCount: 0,
      progressPercent: 0,
      averageScore: '0',
    });
  });

  it('calculates stats correctly', () => {
    const createTopic = (overrides: Partial<TopicProgress> = {}): TopicProgress => ({
      topicId: '1',
      topicTitle: 'title',
      completed: 0,
      total: 10,
      avgScore: 50,
      stage: 1,
      ...overrides,
    });

    const topics = [
      createTopic({ avgScore: 80, completed: 10, total: 10 }),
      createTopic({ avgScore: 100, completed: 12, total: 12 }),
      createTopic({ avgScore: 50, completed: 5, total: 9 }),
    ];

    const result = getTopicStats(topics as TopicProgress[]);

    expect(result.totalCount).toBe(3);
    expect(result.completedCount).toBe(2);
    expect(result.progressPercent).toBe(67);
    expect(result.averageScore).toBe('9');
  });
});
