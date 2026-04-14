set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_user_stats()
 RETURNS TABLE(xp bigint, streak integer, completed_tasks integer, total_tasks integer, rank text)
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
  WITH best_scores AS (
    SELECT
      s.task_id,
      t.topic_id,
      MAX(s.score) AS best_score
    FROM public.submissions s
    JOIN public.tasks t ON t.id = s.task_id
    WHERE s.user_id = auth.uid()
    GROUP BY s.task_id, t.topic_id
  ),
  stats AS (
    SELECT
      COALESCE(SUM(bs.best_score) FILTER (WHERE bs.best_score >= 70), 0) AS total_xp,
      COUNT(*) FILTER (WHERE bs.best_score >= 70) AS done_tasks,
      COUNT(DISTINCT bs.topic_id) FILTER (WHERE bs.best_score >= 70) AS topics_covered
    FROM best_scores bs
  )
  SELECT
    s.total_xp::bigint AS xp,
    0::integer AS streak,
    s.done_tasks::integer AS completed_tasks,
    (SELECT COUNT(*) FROM public.tasks)::integer AS total_tasks,
    CASE
      WHEN s.total_xp < 500  OR s.topics_covered < 3 THEN 'Junior'
      WHEN s.total_xp < 2000 OR s.topics_covered < 8 THEN 'Middle'
      ELSE 'Senior'
    END AS rank
  FROM stats s;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NULL)
  );
  RETURN NEW;
END;
$function$
;


