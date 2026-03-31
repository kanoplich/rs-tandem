export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatParams {
  message: string;
  taskId?: string;
  history?: Pick<ChatMessage, 'role' | 'content'>[];
}
