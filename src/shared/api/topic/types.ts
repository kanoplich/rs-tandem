export interface Topic {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  taskCount: number;
  stage: number;
}
