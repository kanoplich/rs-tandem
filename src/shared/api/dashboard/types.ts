export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface UserStats {
  xp: number;
  streak: number;
  completedTasks: number;
  totalTasks: number;
  rank: string;
}

export interface TopicProgress {
  topicId: string;
  topicTitle: string;
  completed: number;
  total: number;
  avgScore: number;
  lastAttemptAt?: string;
}
