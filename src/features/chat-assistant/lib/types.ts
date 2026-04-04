import { ROLES } from './constants';

export type Role = keyof typeof ROLES;
export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
}

export interface ChatParams {
  message: string;
  taskId?: string;
  history?: Pick<ChatMessage, 'role' | 'content'>[];
}
