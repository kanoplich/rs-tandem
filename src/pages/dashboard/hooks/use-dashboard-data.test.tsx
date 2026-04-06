import { renderHook, waitFor } from '@testing-library/react';
import { toast } from 'sonner';
import { describe, it, expect } from 'vitest';

import { DASHBOARD_ERRORS } from '../locales';

import { useDashboardData } from './use-dashboard-data';

import * as api from '@/shared/api';
import { type TopicProgress } from '@/shared/api';

describe('useDashboardData', () => {
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

  beforeEach(() => vi.resetAllMocks());

  it('sets initial state', () => {
    const { result } = renderHook(() => useDashboardData());
    expect(result.current.topicProgress).toEqual([]);
    expect(result.current.isLoading).toBe(true);
  });

  it('fetches topicsProgress successfully', async () => {
    vi.spyOn(api, 'getTopicProgress').mockResolvedValue(topicProgress);

    const { result } = renderHook(() => useDashboardData());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.topicProgress).toEqual(topicProgress);
  });

  it('throws error using toast', async () => {
    vi.spyOn(api, 'getTopicProgress').mockRejectedValue(new Error('Test error message'));
    const toastSpy = vi.spyOn(toast, 'error');

    const { result } = renderHook(() => useDashboardData());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(toastSpy).toHaveBeenCalledWith('Test error message');
    expect(result.current.topicProgress).toEqual([]);
  });

  it('shows default error if thrown value in not an Error', async () => {
    vi.spyOn(api, 'getTopicProgress').mockRejectedValue('test error string');
    const toastSpy = vi.spyOn(toast, 'error');

    const { result } = renderHook(() => useDashboardData());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(toastSpy).toHaveBeenCalledWith(DASHBOARD_ERRORS.TOPICS_DATA);
    expect(result.current.topicProgress).toEqual([]);
  });

  it('calls getTopicProgress only once', async () => {
    const getSpy = vi.spyOn(api, 'getTopicProgress').mockResolvedValue(topicProgress);

    renderHook(() => useDashboardData());

    await waitFor(() => expect(getSpy).toHaveBeenCalledOnce());

    expect(getSpy).toHaveBeenCalledTimes(1);
  });
});
