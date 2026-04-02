# База данных

Проект использует **Supabase** (PostgreSQL) с расширениями pgvector, pgcrypto, uuid-ossp.

## Схема таблиц

```
topics (1) ──── (*) tasks (1) ──── (*) submissions
                                        │
auth.users (1) ──── (1) profiles        │
      │                                 │
      └─────────────────────────────────┘
                  user_id FK
```

---

## Таблицы

### profiles

Профили пользователей. Создаётся автоматически при регистрации через триггер `on_auth_user_created`.

| Колонка      | Тип                        | Описание                 |
| ------------ | -------------------------- | ------------------------ |
| `id`         | uuid (PK, FK → auth.users) | ID пользователя          |
| `email`      | varchar(255), UNIQUE       | Email                    |
| `name`       | varchar(100)               | Имя (из OAuth или email) |
| `avatar_url` | text                       | URL аватара (из OAuth)   |
| `created_at` | timestamptz                | Дата регистрации         |

### topics

Темы для тренировки собеседований.

| Колонка       | Тип               | Описание                             |
| ------------- | ----------------- | ------------------------------------ |
| `id`          | varchar(50) (PK)  | ID темы (например `javascript-core`) |
| `title`       | varchar(200)      | Название темы                        |
| `description` | text              | Описание                             |
| `icon`        | varchar(10)       | Эмодзи-иконка                        |
| `sort_order`  | integer           | Порядок сортировки                   |
| `stage`       | integer (1, 2, 3) | Этап (Junior / Middle / Senior)      |

### tasks

Задания для собеседований. Содержат вопрос, эталонный ответ и критерии оценки.

| Колонка          | Тип                       | Описание                                     |
| ---------------- | ------------------------- | -------------------------------------------- | -------------------------------------- |
| `id`             | varchar(50) (PK)          | ID задания                                   |
| `topic_id`       | varchar(50) (FK → topics) | Тема                                         |
| `type`           | varchar(20)               | Тип: open, code, multiple_choice             |
| `difficulty`     | integer (1-5)             | Сложность                                    |
| `title`          | varchar(200)              | Название                                     |
| `question_text`  | text                      | Текст вопроса                                |
| `code_template`  | text                      | Шаблон кода (для code-заданий)               |
| `test_code`      | text                      | Тестовый код                                 |
| `rubric_items`   | text[]                    | Критерии оценки                              |
| `golden_answer`  | text                      | Эталонный ответ (скрыт от клиента через RLS) |
| `rubric_weights` | jsonb                     | Веса критериев                               | (не используется в текущей реализации) |
| `hints`          | text[]                    | Подсказки                                    | (не используется в текущей реализации) |
| `max_score`      | integer (default 100)     | Максимальный балл                            |
| `embedding`      | vector(1536)              | Векторный embedding для semantic search      |
| `created_at`     | timestamptz               | Дата создания                                |

### submissions

Ответы пользователей с оценками от AI.

| Колонка        | Тип                      | Описание                 |
| -------------- | ------------------------ | ------------------------ |
| `id`           | uuid (PK)                | ID submission            |
| `user_id`      | uuid (FK → auth.users)   | Пользователь             |
| `task_id`      | varchar(50) (FK → tasks) | Задание                  |
| `answer`       | text                     | Ответ пользователя       |
| `score`        | integer                  | Оценка (0-100)           |
| `covered`      | text[]                   | Покрытые критерии        |
| `missed`       | text[]                   | Пропущенные критерии     |
| `feedback`     | text                     | Текстовый feedback от AI |
| `judge_level`  | integer (default 0)      | Уровень строгости оценки |
| `submitted_at` | timestamptz              | Дата отправки            |

---

## View

### public_tasks

Публичное представление таблицы tasks — **без** `golden_answer`, `test_code`, `rubric_weights`, `hints`.

```sql
SELECT t.id, t.topic_id, t.type, t.difficulty, t.title,
       t.question_text, t.code_template, t.rubric_items,
       t.max_score, t.created_at, tp.stage
FROM tasks t LEFT JOIN topics tp ON tp.id = t.topic_id;
```

---

## Индексы

| Индекс                 | Таблица     | Колонка   | Тип           |
| ---------------------- | ----------- | --------- | ------------- |
| `idx_submissions_task` | submissions | task_id   | btree         |
| `idx_submissions_user` | submissions | user_id   | btree         |
| `idx_tasks_topic`      | tasks       | topic_id  | btree         |
| `idx_topics_stage`     | topics      | stage     | btree         |
| `idx_tasks_embedding`  | tasks       | embedding | HNSW (cosine) |

---

## Row Level Security (RLS)

RLS включён на всех таблицах. Политики:

| Таблица       | Политика                       | Действие | Правило                                           |
| ------------- | ------------------------------ | -------- | ------------------------------------------------- |
| `topics`      | Authenticated users see topics | SELECT   | Все авторизованные пользователи видят все темы    |
| `profiles`    | Users can view own profile     | SELECT   | `auth.uid() = id`                                 |
| `profiles`    | Users can update own profile   | UPDATE   | `auth.uid() = id`                                 |
| `submissions` | Users see own submissions      | SELECT   | `auth.uid() = user_id`                            |
| `submissions` | Users can insert submissions   | INSERT   | `auth.uid() = user_id`                            |
| `tasks`       | (нет SELECT политики)          | —        | Доступ через view `public_tasks` или service role |

`golden_answer` защищён: таблица `tasks` имеет RLS без SELECT политики для `authenticated`. Клиент получает задания через view `public_tasks`, который не включает `golden_answer`. Edge functions используют service role key для доступа к `golden_answer`.

---

## Stored Functions

### get_user_stats()

Возвращает статистику пользователя.

| Поле              | Тип     | Описание                                     |
| ----------------- | ------- | -------------------------------------------- |
| `xp`              | bigint  | Сумма всех оценок                            |
| `streak`          | integer | Серия дней (пока 0)                          |
| `completed_tasks` | integer | Уникальных сданных заданий                   |
| `total_tasks`     | integer | Всего заданий в системе                      |
| `rank`            | text    | Junior (< 500 XP) / Middle (< 2000) / Senior |

Использует `SECURITY DEFINER` — выполняется от имени создателя, видит только submissions текущего пользователя через `auth.uid()`.

### get_topic_progress()

Возвращает прогресс по каждой теме.

| Поле              | Тип         | Описание             |
| ----------------- | ----------- | -------------------- |
| `topic_id`        | text        | ID темы              |
| `topic_title`     | text        | Название             |
| `stage`           | integer     | Этап                 |
| `completed`       | integer     | Сдано заданий        |
| `total`           | integer     | Всего заданий в теме |
| `avg_score`       | integer     | Средний балл         |
| `last_attempt_at` | timestamptz | Последняя попытка    |

### match_tasks()

Векторный поиск по заданиям (для RAG чата).

| Параметр          | Тип          | Default | Описание                      |
| ----------------- | ------------ | ------- | ----------------------------- |
| `query_embedding` | vector(1536) | —       | Вектор запроса                |
| `match_threshold` | float        | 0.7     | Минимальный cosine similarity |
| `match_count`     | int          | 5       | Максимум результатов          |

Возвращает: `id`, `title`, `question_text`, `golden_answer`, `similarity`. Вызывается только из edge functions через service role.

### handle_new_user()

Триггер-функция. Срабатывает при INSERT в `auth.users` — автоматически создаёт запись в `profiles` с email, name и avatar_url из OAuth метаданных.

---

## pgvector

Расширение для векторного поиска. Используется для RAG Chat Assistant.

- **Колонка:** `tasks.embedding` — vector(1536) для OpenAI text-embedding-3-small
- **Индекс:** HNSW с cosine distance (`vector_cosine_ops`)
