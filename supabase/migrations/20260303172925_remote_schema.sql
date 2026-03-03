


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."task_type" AS ENUM (
    'theory_open',
    'theory_choice',
    'coding'
);


ALTER TYPE "public"."task_type" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_topic_progress"() RETURNS json
    LANGUAGE "sql" SECURITY DEFINER
    SET "search_path" TO 'public', 'pg_temp'
    AS $$
  SELECT json_agg(row_to_json(t))
  FROM (
    SELECT
      t.id AS "topicId",
      t.title AS "topicTitle",
      COUNT(DISTINCT s.task_id) AS completed,
      COUNT(DISTINCT tk.id) AS total,
      COALESCE(AVG(s.score), 0)::INT AS "avgScore",
      MAX(s.submitted_at) AS "lastAttemptAt"
    FROM public.topics t
    LEFT JOIN public.tasks tk ON tk.topic_id = t.id
    LEFT JOIN public.submissions s ON s.task_id = tk.id AND s.user_id = auth.uid()
    GROUP BY t.id, t.title
    ORDER BY t.sort_order
  ) t;
$$;


ALTER FUNCTION "public"."get_topic_progress"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_user_stats"() RETURNS json
    LANGUAGE "sql" SECURITY DEFINER
    SET "search_path" TO 'public', 'pg_temp'
    AS $$
  SELECT json_build_object(
    'xp', COALESCE(SUM(s.score), 0),
    'streak', 0,  -- упрощено для MVP
    'completedTasks', COUNT(DISTINCT s.task_id),
    'totalTasks', (SELECT COUNT(*) FROM public.tasks),
    'rank', CASE
      WHEN COALESCE(SUM(s.score), 0) < 500 THEN 'Junior'
      WHEN COALESCE(SUM(s.score), 0) < 2000 THEN 'Middle'
      ELSE 'Senior'
    END
  )
  FROM public.submissions s
  WHERE s.user_id = auth.uid();
$$;


ALTER FUNCTION "public"."get_user_stats"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public', 'pg_temp'
    AS $$
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
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "email" character varying(255) NOT NULL,
    "name" character varying(100) NOT NULL,
    "avatar_url" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."tasks" (
    "id" character varying(50) NOT NULL,
    "topic_id" character varying(50),
    "type" character varying(20) NOT NULL,
    "difficulty" integer,
    "title" character varying(200) NOT NULL,
    "question_text" "text" NOT NULL,
    "code_template" "text",
    "test_code" "text",
    "rubric_items" "jsonb" NOT NULL,
    "golden_answer" "text" NOT NULL,
    "rubric_weights" "jsonb",
    "hints" "jsonb",
    "max_score" integer DEFAULT 100,
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "tasks_difficulty_check" CHECK ((("difficulty" >= 1) AND ("difficulty" <= 5)))
);


ALTER TABLE "public"."tasks" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."public_tasks" WITH ("security_invoker"='on') AS
 SELECT "id",
    "topic_id",
    "type",
    "difficulty",
    "title",
    "question_text",
    "code_template",
    "rubric_items",
    "max_score",
    "created_at"
   FROM "public"."tasks";


ALTER VIEW "public"."public_tasks" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."submissions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "task_id" character varying(50),
    "answer" "text" NOT NULL,
    "score" integer,
    "covered" "jsonb",
    "missed" "jsonb",
    "feedback" "text",
    "judge_level" integer DEFAULT 0,
    "submitted_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."submissions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."topics" (
    "id" character varying(50) NOT NULL,
    "title" character varying(200) NOT NULL,
    "description" "text",
    "icon" character varying(10),
    "sort_order" integer DEFAULT 0,
    "stage" integer DEFAULT 1 NOT NULL,
    "task_count" integer,
    CONSTRAINT "topics_stage_check" CHECK (("stage" = ANY (ARRAY[1, 2, 3])))
);


ALTER TABLE "public"."topics" OWNER TO "postgres";


ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."submissions"
    ADD CONSTRAINT "submissions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tasks"
    ADD CONSTRAINT "tasks_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."topics"
    ADD CONSTRAINT "topics_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_submissions_task" ON "public"."submissions" USING "btree" ("task_id");



CREATE INDEX "idx_submissions_user" ON "public"."submissions" USING "btree" ("user_id");



CREATE INDEX "idx_tasks_topic" ON "public"."tasks" USING "btree" ("topic_id");



CREATE INDEX "idx_topics_stage" ON "public"."topics" USING "btree" ("stage");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."submissions"
    ADD CONSTRAINT "submissions_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "public"."tasks"("id");



ALTER TABLE ONLY "public"."submissions"
    ADD CONSTRAINT "submissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id");



ALTER TABLE ONLY "public"."tasks"
    ADD CONSTRAINT "tasks_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id");



CREATE POLICY "Authenticated users see topics" ON "public"."topics" FOR SELECT TO "authenticated" USING (true);



CREATE POLICY "Users can insert submissions" ON "public"."submissions" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can update own profile" ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can view own profile" ON "public"."profiles" FOR SELECT USING (("auth"."uid"() = "id"));



CREATE POLICY "Users see own submissions" ON "public"."submissions" FOR SELECT USING (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."submissions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."tasks" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."topics" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."get_topic_progress"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_topic_progress"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_topic_progress"() TO "service_role";



GRANT ALL ON FUNCTION "public"."get_user_stats"() TO "anon";
GRANT ALL ON FUNCTION "public"."get_user_stats"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_user_stats"() TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";


















GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."tasks" TO "anon";
GRANT ALL ON TABLE "public"."tasks" TO "authenticated";
GRANT ALL ON TABLE "public"."tasks" TO "service_role";



GRANT ALL ON TABLE "public"."public_tasks" TO "anon";
GRANT ALL ON TABLE "public"."public_tasks" TO "authenticated";
GRANT ALL ON TABLE "public"."public_tasks" TO "service_role";



GRANT ALL ON TABLE "public"."submissions" TO "anon";
GRANT ALL ON TABLE "public"."submissions" TO "authenticated";
GRANT ALL ON TABLE "public"."submissions" TO "service_role";



GRANT ALL ON TABLE "public"."topics" TO "anon";
GRANT ALL ON TABLE "public"."topics" TO "authenticated";
GRANT ALL ON TABLE "public"."topics" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































