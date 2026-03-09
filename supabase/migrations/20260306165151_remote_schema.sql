alter table "public"."submissions" drop constraint "submissions_task_id_fkey";

alter table "public"."tasks" drop constraint "tasks_topic_id_fkey";

alter table "public"."submissions" add constraint "submissions_task_id_fkey" FOREIGN KEY (task_id) REFERENCES public.tasks(id) not valid;

alter table "public"."submissions" validate constraint "submissions_task_id_fkey";

alter table "public"."tasks" add constraint "tasks_topic_id_fkey" FOREIGN KEY (topic_id) REFERENCES public.topics(id) not valid;

alter table "public"."tasks" validate constraint "tasks_topic_id_fkey";

set check_function_bodies = off;

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

create or replace view "public"."public_tasks" as  SELECT id,
    topic_id,
    type,
    difficulty,
    title,
    question_text,
    code_template,
    rubric_items,
    max_score,
    created_at
   FROM public.tasks;


drop trigger if exists "on_auth_user_created" on "auth"."users";

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


