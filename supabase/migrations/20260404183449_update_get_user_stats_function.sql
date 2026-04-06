CREATE OR REPLACE FUNCTION public.get_user_stats()
RETURNS TABLE(xp bigint, streak integer, completed_tasks integer, total_tasks integer, rank text)
LANGUAGE sql SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $$
  WITH best_scores AS (
    SELECT
      s.task_id,
      MAX(s.score) AS best_score
    FROM public.submissions s
    WHERE s.user_id = auth.uid()
    GROUP BY s.task_id
  )
  SELECT
    COALESCE(SUM(bs.best_score) FILTER (WHERE bs.best_score >= 70), 0)::bigint AS xp,
    0::integer AS streak,
    COUNT(*) FILTER (WHERE bs.best_score >= 70)::integer AS completed_tasks,
    (SELECT COUNT(*) FROM public.tasks)::integer AS total_tasks,
    CASE
      WHEN COALESCE(SUM(bs.best_score) FILTER (WHERE bs.best_score >= 70), 0) < 500 THEN 'Junior'
      WHEN COALESCE(SUM(bs.best_score) FILTER (WHERE bs.best_score >= 70), 0) < 2000 THEN 'Middle'
      ELSE 'Senior'
    END AS rank
  FROM best_scores bs;
$$;
