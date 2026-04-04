import { logger } from '../../../_shared/logger.ts';

export const extractPoints = async (
  scoringPromise: Promise<Response>
): Promise<Record<string, number> | null> => {
  try {
    const scoringResponse = await scoringPromise;

    if (!scoringResponse.ok) {
      const errorText = await scoringResponse.text();
      logger.error('Scoring LLM request failed', { error: errorText });
      return null;
    }

    const scoringData = await scoringResponse.json();
    const toolCall = scoringData.choices?.[0]?.message?.tool_calls?.[0];

    if (toolCall?.function?.name === 'saveSubmission') {
      return JSON.parse(toolCall.function.arguments);
    } else {
      logger.error('Unexpected tool call or no tool call returned', { scoringData });
      return null;
    }
  } catch (error) {
    logger.error('Failed to parse scoring response', { error });
    return null;
  }
};
