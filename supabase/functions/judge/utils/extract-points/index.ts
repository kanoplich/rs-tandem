export const extractPoints = async (
  scoringPromise: Promise<Response>
): Promise<Record<string, number> | null> => {
  try {
    const scoringResponse = await scoringPromise;

    if (!scoringResponse.ok) {
      const errorText = await scoringResponse.text();
      console.error('Scoring LLM request failed:', errorText);
      return null;
    }

    const scoringData = await scoringResponse.json();
    const toolCall = scoringData.choices?.[0]?.message?.tool_calls?.[0];

    if (toolCall?.function?.name === 'saveSubmission') {
      return JSON.parse(toolCall.function.arguments);
    } else {
      console.error('Unexpected tool call or no tool call returned:', scoringData);
      return null;
    }
  } catch (err) {
    console.error('Failed to parse scoring response:', err);
    return null;
  }
};
