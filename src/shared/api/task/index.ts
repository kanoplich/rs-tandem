import { MOCK_TASKS } from './mock';
import type { Task } from './types';

import { config } from '@/shared/config/supabase';
import { delay } from '@/shared/lib/delay';

const { USE_MOCK_SUPABASE } = config;

export async function getTask(id: string): Promise<Task | void> {
  if (USE_MOCK_SUPABASE) {
    await delay(300);

    const task = MOCK_TASKS.find((t) => t.id === id);
    if (!task) throw new Error(`Task not found: ${id}`);

    return task;
  }
}

export async function getTasksByTopic(topicId: string): Promise<Task[] | void> {
  if (USE_MOCK_SUPABASE) {
    await delay(400);

    const task = MOCK_TASKS.filter((t) => t.topicId === topicId);
    if (!task) throw new Error(`Task not found: ${topicId}`);

    return task;
  }
}
