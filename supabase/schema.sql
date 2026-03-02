CREATE TABLE topics (
  id          VARCHAR(50) PRIMARY KEY,
  title       VARCHAR(200) NOT NULL,
  description TEXT,
  icon        VARCHAR(10),
  sort_order  INT DEFAULT 0
);

CREATE TABLE tasks (
  id              VARCHAR(50) PRIMARY KEY,
  topic_id        VARCHAR(50) REFERENCES topics(id),
  type            VARCHAR(20) NOT NULL,
  difficulty      INT CHECK (difficulty BETWEEN 1 AND 5),
  title           VARCHAR(200) NOT NULL,
  question_text   TEXT NOT NULL,
  code_template   TEXT,
  test_code       TEXT,
  rubric_items    JSONB NOT NULL,
  golden_answer   TEXT NOT NULL,       -- Скрыто через RLS!
  rubric_weights  JSONB,
  hints           JSONB,
  max_score       INT DEFAULT 100,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE submissions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES auth.users(id),  -- Supabase Auth!
  task_id     VARCHAR(50) REFERENCES tasks(id),
  answer      TEXT NOT NULL,
  score       INT,
  covered     JSONB,
  missed      JSONB,
  feedback    TEXT,
  judge_level INT DEFAULT 0,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_submissions_user ON submissions(user_id);
CREATE INDEX idx_submissions_task ON submissions(task_id);
CREATE INDEX idx_tasks_topic ON tasks(topic_id);

-- Включаем RLS
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Tasks: пользователи видят все задачи, но БЕЗ секретных полей
-- Вместо RLS на уровне строк, создаём VIEW
CREATE VIEW public_tasks AS
SELECT
  id, topic_id, type, difficulty, title,
  question_text, code_template,
  rubric_items, max_score, created_at
FROM tasks;
-- golden_answer, rubric_weights, hints — НЕ в VIEW

-- Submissions: пользователь видит только свои
CREATE POLICY "Users see own submissions"
  ON submissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert submissions"
  ON submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Topics: доступны всем аутентифицированным
CREATE POLICY "Authenticated users see topics"
  ON topics FOR SELECT
  TO authenticated
  USING (true);

  -- Статистика пользователя (вызывается через supabase.rpc())
CREATE OR REPLACE FUNCTION public.get_user_stats()
RETURNS json
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, pg_temp
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

-- Прогресс по темам
CREATE OR REPLACE FUNCTION public.get_topic_progress()
RETURNS json
LANGUAGE sql
SECURITY DEFINER
SET search_path = public, pg_temp
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

CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       VARCHAR(255) NOT NULL,
  name        VARCHAR(100) NOT NULL,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);


CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
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

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


ALTER TABLE public.topics
  ADD COLUMN stage INTEGER NOT NULL DEFAULT 1
  CONSTRAINT topics_stage_check CHECK (stage IN (1, 2, 3));

CREATE INDEX idx_topics_stage ON public.topics (stage);
