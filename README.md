# RS Tandem

**RS Tandem** — это интерактивная платформа для тренировки технических собеседований с AI-интервьюером.

**Цель** — создать MVP проекта с AI агентом.

## Технологический стек

- Frontend: React 19, TS 5 (Strict), Vite 5, pnpm,
- Styling: CSS Modules + shadcn/ui
- Backend: Supabase (Auth, RLS, Edge Functions)
- AI API: Groq API (LLM)
- Архитектура: FSD (Feature-Sliced Design)
- React-router V.6

## Наша команда

- Андрей (https://github.com/kanoplich)
- Валерий (https://github.com/rockabil)
- Сева (https://github.com/sevasmith)
- Фатима (https://github.com/sunyuna00)
- Артур (https://github.com/artkoro94)
- Вадим (https://github.com/vadim-troian)

## Менторы

- Михаил (https://github.com/Michael-JS-Bel)
- Ольга (https://github.com/HelgaZhizhka)
- Ирина (https://github.com/IrinaOsp)

## Deploy

https://rs-tandem.netlify.app/

## Локальная разработка с Supabase

### ✅ Предварительные требования

- **Node.js 18+**
- **Docker & Docker Compose**
- **pnpm**

### 🚀 Установка и запуск

```bash
# 1. Установить зависимости проекта
pnpm install

# 2. Запустить локальный Supabase
npx supabase start

# 3. ✅ Применить ВСЕ миграции (БД создастся автоматически)
npx supabase db reset

```

- **Studio: http://localhost:54323**

### ⚙️ Переменные окружения

После supabase start создастся .env.local:

- VITE_SUPABASE_URL=http://localhost:54321
- VITE_SUPABASE_ANON_KEY=[Ваш Publishable Authentication Keys]

### 📋 Основные команды

- 🎛️ **Управление Supabase**

| Команда         | Что делает                  |
| --------------- | --------------------------- |
| supabase start  | 🟢 Запустить локальный стек |
| supabase stop   | 🔴 Остановить               |
| supabase status | 📋 Показать URL + ключи     |

- 🗄️ **Миграции и БД**

| Команда                          | Что делает                  |
| -------------------------------- | --------------------------- |
| supabase migration new fix-table | 📝 Создать миграцию         |
| supabase migration up            | ⬆️ Применить новые миграции |
| supabase db reset                | 💥 Сброс + все миграции     |
| supabase db diff -f name         | 🎨 Studio → миграция        |
| supabase db push                 | ☁️ Push на remote           |
| pnpm types:db:local              | 🔤 Обновить TS типы         |
