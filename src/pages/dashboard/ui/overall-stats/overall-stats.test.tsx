import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { OVERALL_STATS_TEXT } from '../../locales';

import { OverallStats } from '.';

import type { TopicProgress } from '@/shared/api';

describe('OverallStats', () => {
  const createTopic = (overrides: Partial<TopicProgress> = {}): TopicProgress => ({
    topicId: '1',
    topicTitle: 'title',
    completed: 0,
    total: 10,
    avgScore: 50,
    stage: 1,
    ...overrides,
  });

  const topicProgress = [
    createTopic({ avgScore: 80, completed: 10, total: 10 }),
    createTopic({ avgScore: 100, completed: 12, total: 12 }),
    createTopic({ avgScore: 50, completed: 5, total: 9 }),
  ];

  it('renders the header', () => {
    render(<OverallStats topicProgress={topicProgress} />);

    const title = screen.getByText(OVERALL_STATS_TEXT.HEADER);

    expect(title).toBeInTheDocument();
  });

  it('renders three StatCards', () => {
    const cards = [
      OVERALL_STATS_TEXT.GENERAL_PROGRESS_CARD_TEXT,
      OVERALL_STATS_TEXT.AVERAGE_SCORE_CARD_TEXT,
      OVERALL_STATS_TEXT.TOPICS_FINISHED_CARD_TEXT,
    ];

    render(<OverallStats topicProgress={topicProgress} />);

    cards.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });

    expect(screen.getByText('67%')).toBeInTheDocument();
    expect(screen.getByText('9/10')).toBeInTheDocument();
    expect(screen.getByText('2/3')).toBeInTheDocument();
  });

  it('correctly renders empty results', () => {
    const topicProgress = [
      createTopic({ avgScore: 0, completed: 0, total: 0 }),
      createTopic({ avgScore: 0, completed: 0, total: 0 }),
      createTopic({ avgScore: 0, completed: 0, total: 0 }),
    ];

    render(<OverallStats topicProgress={topicProgress} />);

    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.getByText('0/10')).toBeInTheDocument();
    expect(screen.getByText('0/3')).toBeInTheDocument();
  });
});
