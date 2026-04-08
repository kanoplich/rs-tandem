# Edge Functions

Серверная логика на Supabase Edge Functions (Deno runtime). Расположены в `supabase/functions/`.

## judge

**Путь:** `supabase/functions/judge/`

AI-оценка ответов пользователя на задания.

### Что делает

1. Принимает `taskId` и `answer` от клиента
2. Проверяет авторизацию (JWT → `auth.getUser()`)
3. Загружает задание с `golden_answer` и `rubric_items` (service role)
4. Параллельно запускает два запроса к Groq LLM:
   - **Feedback** (streaming) — текстовый отзыв на русском языке
   - **Scoring** (tool call) — оценка по каждому rubric point (0/1/2)
5. Стримит feedback на клиент
6. Сохраняет submission в БД (score, covered, missed, feedback)

### Request

```json
POST /functions/v1/judge
Authorization: Bearer <jwt>

{
  "taskId": "closures-1",
  "answer": "Замыкание — это функция, которая..."
}
```

### Response

`text/plain` stream — текст feedback от LLM.

### Модель

Groq `llama-3.3-70b-versatile`, temperature 0.3 (feedback) / 0.1 (scoring).

### Утилиты (`utils/`)

| Файл               | Описание                                |
| ------------------ | --------------------------------------- |
| `cors/`            | CORS-заголовки                          |
| `error-response/`  | Формирование ответа с ошибкой           |
| `build-tools/`     | Генерация tool schema для scoring       |
| `extract-points/`  | Извлечение оценок из tool call response |
| `save-submission/` | Сохранение submission в БД              |

### Секреты

- `GROQ_API_KEY` — ключ Groq API

---

## chat-assistant

**Путь:** `supabase/functions/chat-assistant/`

RAG Chat Assistant — AI-помощник для подготовки к собеседованиям.

### Что делает

1. Принимает `message`, `taskId`, `history` от клиента
2. Проверяет авторизацию (`auth.getUser()`)
3. Векторизирует сообщение через OpenAI `text-embedding-3-small`
4. Ищет похожие задания через `match_tasks()` (pgvector, cosine similarity)
5. Гарантирует что текущее задание (`taskId`) попадёт в контекст
6. Формирует system prompt с `golden_answer` как скрытым контекстом
7. Отправляет в Groq LLM со стримингом
8. Стримит только текст LLM на клиент

### Request

```json
POST /functions/v1/chat-assistant
Authorization: Bearer <jwt>

{
  "message": "Как работают замыкания?",
  "taskId": "closures-1",
  "history": [
    { "role": "user", "content": "привет" },
    { "role": "assistant", "content": "Привет! Чем помочь?" }
  ]
}
```

### Response

`text/plain` stream — текст ответа от LLM на русском языке.

### Безопасность

- `golden_answer` остаётся внутри edge function — на клиент передаётся только текст LLM
- System prompt запрещает LLM цитировать эталонный ответ
- History ограничен `HISTORY_CHAR_BUDGET = 8000` символов (~2000 токенов)

### Модели

- OpenAI `text-embedding-3-small` (1536 dims) — embedding запроса
- Groq `llama-3.3-70b-versatile`, temperature 0.4 — генерация ответа

### Секреты

- `OPENAI_API_KEY` — ключ OpenAI API
- `GROQ_API_KEY` — ключ Groq API

---

## generate-embeddings

**Путь:** `supabase/functions/generate-embeddings/`

Одноразовая функция для генерации векторных embeddings для всех заданий.

### Что делает

1. Загружает все topics и tasks **без embedding** (фильтр `embedding IS NULL`)
2. Для каждого task формирует текст:
   ```
   Topic: {topic.title} - {topic.description}
   Task: {task.title} | Type: {task.type} | Difficulty: {difficulty}/5
   Question: {task.question_text}
   Answer: {task.golden_answer}
   ```
3. Отправляет текст в OpenAI → получает вектор (1536 чисел)
4. Сохраняет вектор в `tasks.embedding`

### Request

```json
POST /functions/v1/generate-embeddings
Authorization: Bearer <jwt>
```

Тело запроса не требуется.

### Response

```json
{
  "total": 157,
  "updated": 157,
  "failed": 0
}
```

### Когда запускать

- После первого деплоя (заполнить все задания)
- После добавления новых заданий (обработает только задания без embedding)
- После изменения `golden_answer` существующих заданий (нужно сбросить embedding и перезапустить)

### Модель

OpenAI `text-embedding-3-small` (1536 dims). Стоимость: ~$0.003 на 157 задач.

### Секреты

- `OPENAI_API_KEY` — ключ OpenAI API

---

## Деплой

```bash
# Деплой всех функций
supabase functions deploy judge
supabase functions deploy chat-assistant
supabase functions deploy generate-embeddings

# Добавить секреты
supabase secrets set GROQ_API_KEY=gsk_...
supabase secrets set OPENAI_API_KEY=sk-...

# Проверить секреты
supabase secrets list
```

## Локальная разработка

```bash
# Запустить все функции локально
supabase functions serve

# Запустить конкретную функцию
supabase functions serve judge
```

Для локальной работы edge functions используют переменные из `supabase/functions/.env`.
