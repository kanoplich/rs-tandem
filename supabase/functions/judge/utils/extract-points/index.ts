import type { LLMChatResponse } from '../../../_shared/llm-client/index.ts';
import { logger } from '../../../_shared/logger.ts';

export const extractPoints = (
  scoringResponse: LLMChatResponse,
  rubricItems: string[]
): Record<string, number> | null => {
  try {
    const toolCall = scoringResponse.toolCalls?.[0];

    if (toolCall?.name !== 'saveSubmission') {
      logger.error('Unexpected tool call or no tool call returned', {
        toolCalls: scoringResponse.toolCalls,
      });
      return null;
    }

    const indexed: Record<string, number> = JSON.parse(toolCall.arguments);
    const mapped: Record<string, number> = {};

    for (let i = 0; i < rubricItems.length; i++) {
      const key = `rubric_${i}`;
      const score = indexed[key];

      if (score === undefined) {
        logger.warn(`Missing score for ${key} ("${rubricItems[i]}"), defaulting to 0`);
        mapped[rubricItems[i]] = 0;
      } else {
        const rounded = Math.round(Number(score));
        mapped[rubricItems[i]] = Math.min(2, Math.max(0, rounded));
      }
    }

    return mapped;
  } catch (error) {
    logger.error('Failed to parse scoring response', { error });
    return null;
  }
};
