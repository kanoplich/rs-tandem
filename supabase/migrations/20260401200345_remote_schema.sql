drop extension if exists "vector";

drop function if exists "public"."match_tasks"(query_embedding extensions.vector, match_threshold double precision, match_count integer);

drop view if exists "public"."public_tasks";

drop index if exists "public"."idx_tasks_embedding";

alter table "public"."tasks" drop column "embedding";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_topic_progress()
 RETURNS TABLE(topic_id text, topic_title text, stage integer, completed integer, total integer, avg_score integer, last_attempt_at timestamp with time zone)
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
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

create or replace view "public"."public_tasks" as  SELECT t.id,
    t.topic_id,
    t.type,
    t.difficulty,
    t.title,
    t.question_text,
    t.code_template,
    t.rubric_items,
    t.max_score,
    t.created_at,
    tp.stage
   FROM (public.tasks t
     LEFT JOIN public.topics tp ON (((tp.id)::text = (t.topic_id)::text)));



