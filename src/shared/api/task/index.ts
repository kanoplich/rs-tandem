import { supabase, type Public } from '../supabase-client';

import { MOCK_TASKS } from './mock';
import type { Task, TaskType } from './types';

import { config } from '@/shared/config/supabase';
import { delay } from '@/shared/lib/delay';

const { USE_MOCK_SUPABASE } = config;

type TaskRow = Public['Tables']['tasks']['Row'];

const mapToTask = (data: TaskRow): Task => {
  const type = data.type as TaskType;
  if (!['theory_open', 'theory_choice', 'coding'].includes(type)) {
    throw new Error(`Invalid task type: ${data.type}`);
  }

  const difficulty = data.difficulty as 1 | 2 | 3 | 4 | 5;
  if (![1, 2, 3, 4, 5].includes(difficulty)) {
    throw new Error(`Invalid difficulty: ${data.difficulty}`);
  }

  let rubricItems: string[] = [];
  if (data.rubric_items) {
    if (typeof data.rubric_items === 'string') {
      rubricItems = JSON.parse(data.rubric_items);
    }
  }

  return {
    id: data.id,
    topicId: data.topic_id ?? '',
    type,
    difficulty,
    title: data.title,
    questionText: data.question_text,
    codeTemplate: data.code_template ?? '',
    testCode: data.test_code ?? '',
    rubricItems,
    maxScore: data.max_score ?? 100,
  };
};

export async function getTask(id: string): Promise<Task> {
  if (USE_MOCK_SUPABASE) {
    await delay(300);
    return MOCK_TASKS.find((t) => t.id === id)!;
  }

  const { data: task, error } = await supabase.from('tasks').select('*').eq('id', id).single();

  if (error || !task) {
    throw error || new Error('Task error');
  }

  return mapToTask(task);
}

export async function getTasksByTopic(topicId: string): Promise<Task[]> {
  if (USE_MOCK_SUPABASE) {
    await delay(400);
    return MOCK_TASKS.filter((t) => t.topicId === topicId);
  }

  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('topic_id', topicId)
    .order('difficulty');

  if (error || !tasks) {
    throw error || new Error('Task error');
  }

  return tasks.map((t) => mapToTask(t));
}
