import { supabase, type Public } from '../supabase-client';

import { MOCK_TASKS } from './mock';
import { DIFFICULTY, TASK_TYPE, type DifficultyLevel, type Task, type TaskType } from './types';

import { DEFAULT_MAX_SCORE } from '@/shared';
import { config } from '@/shared/config/supabase';
import { delay } from '@/shared/lib/delay';

type PublicTasksRow = Public['Views']['public_tasks']['Row'];

const { USE_MOCK_SUPABASE } = config;

const VALID_DIFFICULTY = new Set<number>(Object.values(DIFFICULTY));
const VALID_TASK_TYPE = new Set<string>(Object.values(TASK_TYPE));

const toDifficulty = (value: unknown): DifficultyLevel => {
  if (typeof value === 'number' && VALID_DIFFICULTY.has(value)) {
    return value as DifficultyLevel;
  }
  return DIFFICULTY.EASY;
};

const toTaskType = (value: unknown): TaskType => {
  if (typeof value === 'string' && VALID_TASK_TYPE.has(value)) {
    return value as TaskType;
  }
  return TASK_TYPE.THEORY_OPEN;
};

const mapToTask = (data: PublicTasksRow): Task => {
  if (!data.id || !data.topic_id) {
    throw new Error(`Invalid task data: ${data.id}`);
  }

  return {
    id: data.id,
    topicId: data.topic_id,
    title: data.title ?? '',
    difficulty: toDifficulty(data.difficulty),
    type: toTaskType(data.type),
    maxScore: DEFAULT_MAX_SCORE,
    questionText: data.question_text ?? '',
    rubricItems: data.rubric_items ?? [],
    codeTemplate: data.code_template ?? '',
  };
};

export const getTask = async (id: string): Promise<Task> => {
  if (USE_MOCK_SUPABASE) {
    await delay(300);

    const task = MOCK_TASKS.find((t) => t.id === id);
    if (!task) throw new Error(`Task not found: ${id}`);

    return task;
  }

  const { data: task } = await supabase
    .from('public_tasks')
    .select('*')
    .eq('id', id)
    .single()
    .throwOnError();

  return mapToTask(task);
};

export const getTasksByTopic = async (topicIds: string[]): Promise<Task[]> => {
  if (USE_MOCK_SUPABASE) {
    await delay(400);

    const tasks = MOCK_TASKS.filter((t) => topicIds.includes(t.topicId));
    if (!tasks) throw new Error(`Tasks not found`);

    return tasks;
  }

  const { data: tasks } = await supabase
    .from('public_tasks')
    .select('*')
    .in('topic_id', topicIds)
    .order('difficulty')
    .throwOnError();

  return tasks.map((t) => mapToTask(t));
};
