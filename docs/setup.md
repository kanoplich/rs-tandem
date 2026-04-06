# Установка и настройка

## Требования

- **Node.js 20+**
- **pnpm** (менеджер пакетов)
- **Docker & Docker Compose** (для локального Supabase)
- **Supabase CLI** (`npm install -g supabase`)

---

## Быстрый старт

```bash
# 1. Клонировать репозиторий
git clone https://github.com/<org>/rs-tandem.git
cd rs-tandem

# 2. Установить зависимости
pnpm install

# 3. Запустить локальный Supabase (Docker должен быть запущен)
npx supabase start

# 4. Применить миграции и заполнить БД
npx supabase db reset

# 5. Запустить dev-сервер
pnpm dev
```

После `supabase start` будут доступны:

- **Приложение:** http://localhost:5173
- **Supabase Studio:** http://localhost:54323
- **Supabase API:** http://localhost:54321

---

## Переменные окружения

### Frontend (`.env.local`)

Создаётся вручную или копируется из `.env.example`.

| Переменная               | Обязательно | Описание                                                             |
| ------------------------ | ----------- | -------------------------------------------------------------------- |
| `VITE_SUPABASE_URL`      | Да          | URL Supabase API (`http://localhost:54321` для локальной разработки) |
| `VITE_SUPABASE_ANON_KEY` | Да          | Публичный ключ Supabase (из `supabase status`)                       |
| `VITE_HOST`              | Нет         | Хост приложения (`http://localhost:5173/`)                           |
| `VITE_USE_MOCK_AI`       | Нет         | `true` — mock режим для AI (без реальных API ключей)                 |
| `VITE_USE_MOCK_SUPABASE` | Нет         | `true` — mock режим для Supabase                                     |
| `VITE_JUDGE_LEVEL`       | Нет         | Уровень строгости оценки (default: `0`)                              |

### Edge Functions (`supabase/functions/.env`)

Для локальной разработки edge functions.

| Переменная                  | Описание                                                   |
| --------------------------- | ---------------------------------------------------------- |
| `SUPABASE_URL`              | URL Supabase API                                           |
| `SUPABASE_ANON_KEY`         | Публичный ключ                                             |
| `SUPABASE_SERVICE_ROLE_KEY` | Сервисный ключ (полный доступ, обходит RLS)                |
| `GROQ_API_KEY`              | Ключ Groq API (для judge и chat-assistant)                 |
| `OPENAI_API_KEY`            | Ключ OpenAI API (для chat-assistant и generate-embeddings) |

### OAuth провайдеры

Настраиваются в Supabase Dashboard → Auth → Providers:

| Провайдер | Переменные                                 |
| --------- | ------------------------------------------ |
| Google    | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` |
| GitHub    | `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` |

---

## Получение API ключей

### Groq API

1. Зарегистрируйся на https://console.groq.com
2. Создай API key в разделе API Keys
3. Бесплатный tier покрывает потребности разработки

### OpenAI API

1. Зарегистрируйся на https://platform.openai.com
2. Создай API key в разделе API Keys
3. Embedding (text-embedding-3-small) стоит ~$0.02 за 1M токенов

### Supabase ключи (локальные)

После `supabase start` выполни:

```bash
supabase status
```

В выводе будут `anon key` и `service_role key`.

---

## Mock режим

Для разработки без API ключей установи в `.env.local`:

```
VITE_USE_MOCK_AI=true
```

Mock mode эмулирует:

- Ответы от judge (оценка и feedback)
- Ответы от chat-assistant (текстовый ответ)

---

## Деплой

### Frontend (Netlify)

Деплой автоматический через GitHub Actions при push в `main` или `develop`.

Секреты для CI (настраиваются в GitHub → Settings → Secrets):

- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`

### Edge Functions (Supabase)

```bash
# Деплой функций
supabase functions deploy judge
supabase functions deploy chat-assistant
supabase functions deploy generate-embeddings

# Добавить секреты на удалённый сервер
supabase secrets set GROQ_API_KEY=gsk_...
supabase secrets set OPENAI_API_KEY=sk-...
```

### Миграции (Supabase)

```bash
# Применить миграции к удалённой БД
supabase db push
```

### Генерация embeddings (после деплоя)

После первого деплоя миграции и функции `generate-embeddings` нужно запустить генерацию:

```bash
curl -i --request POST \
  'https://<project-ref>.supabase.co/functions/v1/generate-embeddings' \
  --header 'Authorization: Bearer <access_token>'
```

---

## Генерация типов БД

После изменения схемы базы данных нужно обновить TypeScript типы:

```bash
# Из локальной базы
pnpm types:db:local

# Из удалённой базы
pnpm types:db
```

Типы сохраняются в `src/shared/types/database.types.ts`.
