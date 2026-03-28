import { SupabaseClient, User } from 'https://esm.sh/@supabase/supabase-js@2';

export const saveSubmission = async (
  taskId: string,
  answer: string,
  supabaseClient: SupabaseClient,
  user: User,
  feedback: string,
  rubricItems: string[],
  pointsData: Record<string, number>
) => {
  const maxPerItem = rubricItems.length > 0 ? 100 / rubricItems.length : 100;

  const coveredPoints: string[] = [];
  const missedPoints: string[] = [];
  let totalScore = 0;

  for (const item of rubricItems) {
    const itemScore = Number(pointsData[item] ?? 0);
    const clampedScore = Math.min(2, Math.max(0, itemScore));

    totalScore += (clampedScore / 2) * maxPerItem;

    if (clampedScore > 0) {
      coveredPoints.push(item);
    } else {
      missedPoints.push(item);
    }
  }

  const finalScore = Math.round(totalScore);

  try {
    await supabaseClient.from('submissions').insert({
      user_id: user.id,
      task_id: taskId,
      answer,
      score: finalScore,
      covered: coveredPoints,
      missed: missedPoints,
      feedback: feedback.trim(),
      judge_level: 1,
    });
  } catch (err) {
    console.error('Failed to save submission:', err);
  }
};
