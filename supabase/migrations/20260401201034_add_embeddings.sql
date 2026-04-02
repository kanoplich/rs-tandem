SET search_path TO public, extensions;

CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;

ALTER TABLE public.tasks ADD COLUMN embedding extensions.vector(1536);

CREATE INDEX idx_tasks_embedding ON public.tasks
  USING hnsw (embedding extensions.vector_cosine_ops);
