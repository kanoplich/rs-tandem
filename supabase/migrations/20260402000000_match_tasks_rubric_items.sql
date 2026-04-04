CREATE OR REPLACE FUNCTION public.match_tasks(
  query_embedding extensions.vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5
) RETURNS TABLE (
  id varchar(50),
  title varchar(200),
  question_text text,
  rubric_items text[],
  similarity float
) LANGUAGE sql STABLE
SET search_path = public, extensions
AS $$
  SELECT
    t.id,
    t.title,
    t.question_text,
    t.rubric_items,
    1 - (t.embedding <=> query_embedding) AS similarity
  FROM public.tasks t
  WHERE 1 - (t.embedding <=> query_embedding) > match_threshold
  ORDER BY t.embedding <=> query_embedding
  LIMIT match_count;
$$;
