CREATE OR REPLACE FUNCTION public.get_topic_progress()
RETURNS TABLE(topic_id text, topic_title text, stage integer, completed integer, total integer, avg_score integer, last_attempt_at timestamptz)
LANGUAGE sql SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $$
  WITH best_scores AS (
    SELECT
      s.task_id,
      MAX(s.score) AS best_score,
      MAX(s.submitted_at) AS last_at
    FROM public.submissions s
    WHERE s.user_id = auth.uid()
    GROUP BY s.task_id
  )
  SELECT
    t.id AS topic_id,
    t.title AS topic_title,
    t.stage AS stage,
    COUNT(DISTINCT CASE WHEN bs.best_score >= 70 THEN bs.task_id END)::integer AS completed,
    COUNT(DISTINCT tk.id)::integer AS total,
    COALESCE(AVG(bs.best_score), 0)::integer AS avg_score,
    MAX(bs.last_at) AS last_attempt_at
  FROM public.topics t
  LEFT JOIN public.tasks tk ON tk.topic_id = t.id
  LEFT JOIN best_scores bs ON bs.task_id = tk.id
  GROUP BY t.id, t.title, t.stage
  ORDER BY t.sort_order;
$$;
