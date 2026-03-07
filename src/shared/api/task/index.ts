import { supabase, type Public } from '../supabase-client';

import { MOCK_TASKS } from './mock';
import {
  DEFAULT_MAX_SCORE,
  DIFFICULTY,
  type DifficultyLevel,
  type Task,
  type TaskType,
} from './types';

import { config } from '@/shared/config/supabase';
import { delay } from '@/shared/lib/delay';

type TaskRow = Public['Tables']['tasks']['Row'];

const { USE_MOCK_SUPABASE } = config;

const mapToTask = (data: TaskRow): Task => {
  return {
    id: data.id,
    topicId: data.topic_id ?? '',
    title: data.title,
    difficulty: (data.difficulty ?? DIFFICULTY.EASY) as DifficultyLevel,
    type: data.type as TaskType,
    maxScore: data.max_score ?? DEFAULT_MAX_SCORE,
    questionText: data.question_text,
    rubricItems: data.rubric_items,
    codeTemplate: data.code_template ?? '',
    testCode: data.test_code ?? '',
  };
};

export async function getTask(id: string): Promise<Task> {
  if (USE_MOCK_SUPABASE) {
    await delay(300);

    const task = MOCK_TASKS.find((t) => t.id === id);
    if (!task) throw new Error(`Task not found: ${id}`);

    return task;
  }

  const { data: task } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single()
    .throwOnError();

  return mapToTask(task);
}

export async function getTasksByTopic(topicId: string): Promise<Task[]> {
  if (USE_MOCK_SUPABASE) {
    await delay(400);

    const task = MOCK_TASKS.filter((t) => t.topicId === topicId);
    if (!task) throw new Error(`Task not found: ${topicId}`);

    return task;
  }

  const { data: tasks } = await supabase
    .from('tasks')
    .select('*')
    .eq('topic_id', topicId)
    .order('difficulty')
    .throwOnError();

  return tasks.map((t) => mapToTask(t));
}
