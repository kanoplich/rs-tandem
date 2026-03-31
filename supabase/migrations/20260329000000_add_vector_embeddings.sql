-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;

-- Add embedding column to tasks (1536 dims for OpenAI text-embedding-3-small)
ALTER TABLE public.tasks ADD COLUMN embedding extensions.vector(1536);

-- HNSW index for fast cosine similarity search
CREATE INDEX idx_tasks_embedding ON public.tasks
  USING hnsw (embedding extensions.vector_cosine_ops);

-- Similarity search function (called via service role from edge functions)
CREATE OR REPLACE FUNCTION public.match_tasks(
  query_embedding extensions.vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5
) RETURNS TABLE (
  id varchar(50),
  title varchar(200),
  question_text text,
  golden_answer text,
  similarity float
) LANGUAGE sql STABLE AS $$
  SELECT
    t.id,
    t.title,
    t.question_text,
    t.golden_answer,
    1 - (t.embedding <=> query_embedding) AS similarity
  FROM public.tasks t
  WHERE 1 - (t.embedding <=> query_embedding) > match_threshold
  ORDER BY t.embedding <=> query_embedding
  LIMIT match_count;
$$;
