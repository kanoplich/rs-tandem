-- Insert topic first
INSERT INTO topics (
  id,
  title,
  description,
  icon,
  task_count
) VALUES (
  'closures',                           -- must match task.topic_id
  'Core JavaScript',                    -- title of the topic
  'Замыкания, прототипы, Event Loop...',-- description
  '',                                 -- icon, can be emoji or URL
  0                                    -- initial task count
);