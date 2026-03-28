export interface StageInfo {
  stage: number;
  totalTopics: number;
  completedTopics: number;
  avgScore: number;
}

export interface StageStatsItem {
  stage: number;
  total: number;
  avg: number;
}

export interface HistoryCardProps {
  stage: number;
  completedTopics: number;
  totalTopics: number;
  percent: number;
  avgScore: number;
}

export interface HistoryItem {
  id: string;
  title: string;
  stage: number;
  date: string;
  score: number;
}

export interface HistoryStatsProps {
  total: number;
  avg: number;
  best: number;
}

export interface StageStatsProps {
  items: StageStatsItem[];
}
