export type { AuthSession, AuthUser, AuthCredentials, RegisterCredentials } from './auth/types';
export type { UserStats, TopicProgress } from './dashboard/types';
export type { Submission } from './submissions/types';
export type { Task, DifficultyLevel, TaskType } from './task/types';
export type { Topic } from './topic/types';
export type { JudgeResult } from './judge/types';
export { getSession, onAuthStateChange, signUp, signIn, signOut, signInWithOAuth } from './auth';
export { getDashboardStats, getTopicProgress } from './dashboard/';
export {
  getSubmissionHistory,
  getSubmissionHistoryByTaskId,
  getPassedSubmissionHistory,
} from './submissions';
export { getTask, getTasksByTopic } from './task';
export { getTopics } from './topic';
export { evaluateTheory } from './judge';
