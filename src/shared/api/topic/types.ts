export interface Topic {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  taskCount: number;
  stage: number;
  sort_order?: undefined;
}

export interface TopicWithProgress extends Topic {
  completed: number;
  total: number;
  avgScore: number;
}
