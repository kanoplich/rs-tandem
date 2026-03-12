export interface LLMResponse {
  score: number;
  covered_points: string[];
  missed_points: string[];
  feedback: string;
}
