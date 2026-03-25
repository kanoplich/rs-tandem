import { STAGES } from './constants';

export const groupByStage = <T extends { stage: number }>(items: T[]): Record<number, T[]> => {
  const result: Record<number, T[]> = {};
  for (const { id } of STAGES) {
    result[id] = items.filter((t) => t.stage === id);
  }
  return result;
};
