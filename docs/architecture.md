# Архитектура проекта

Проект построен на основе **Feature-Sliced Design (FSD)** — методологии организации фронтенд-кода по слоям и слайсам.

## Структура слоёв

```
src/
├── app/            # Инициализация приложения, провайдеры, роутинг
├── pages/          # Страницы приложения (по одной на роут)
├── features/       # Бизнес-фичи (авторизация, чат, тема)
├── entities/       # Бизнес-сущности (сессия пользователя)
└── shared/         # Переиспользуемый код (UI, API, утилиты, конфиг)
```

Зависимости строго сверху вниз: `app → pages → features → entities → shared`. Нижний слой не импортирует из верхнего.

---

## App (`src/app/`)

Точка входа приложения. Содержит инфраструктурный код, который оборачивает всё приложение.

```
app/
├── router/
│   ├── index.tsx              # Конфигурация всех роутов (createBrowserRouter)
│   └── protected-route.tsx    # Компонент защиты роутов (авторизация)
├── public-layout/             # Layout для публичных страниц (landing, login, register)
├── private-layout/            # Layout для защищённых страниц (dashboard, topics, task)
├── app-layout/                # Корневой layout приложения
├── header/                    # Шапка сайта
├── footer/                    # Подвал сайта
├── auth-provider.tsx          # Провайдер авторизации (контекст сессии)
├── theme-provider.tsx         # Провайдер темы (dark/light через next-themes)
├── error-boundary/            # Обработка ошибок с локализацией
└── styles/                    # Глобальные стили (Tailwind)
```

---

## Pages (`src/pages/`)

Каждая страница — отдельная папка с компонентом, хуками, UI и локализацией.

### Публичные страницы

| Роут        | Страница    | Описание                                                                  |
| ----------- | ----------- | ------------------------------------------------------------------------- |
| `/`         | `landing/`  | Лендинг с секциями: training, how-it-works, why-choose-us, ready-to-start |
| `/login`    | `login/`    | Вход в аккаунт                                                            |
| `/register` | `register/` | Регистрация                                                               |
| `/forgot`   | `forgot/`   | Восстановление пароля                                                     |

### Защищённые страницы (требуют авторизации)

| Роут            | Страница     | Описание                                              |
| --------------- | ------------ | ----------------------------------------------------- |
| `/dashboard`    | `dashboard/` | Дашборд: статистика, XP, streak, карточки этапов      |
| `/topics`       | `topics/`    | Список тем для тренировки                             |
| `/task/session` | `task/`      | Страница задания: вопрос, ввод ответа, оценка, AI-чат |
| `/history`      | `history/`   | История сданных заданий                               |
| `/profile`      | `profile/`   | Профиль пользователя                                  |
| `/reset`        | `reset/`     | Сброс пароля (по ссылке из email)                     |

### Страница 404

| Роут | Страница     | Описание            |
| ---- | ------------ | ------------------- |
| `*`  | `not-found/` | Страница не найдена |

### Защита роутов

`ProtectedRoute` работает в двух режимах:

- **Обычный** — если пользователь не авторизован, редирект на `/login`
- **Reverse** (`<ProtectedRoute reverse>`) — если авторизован, редирект на `/dashboard` (чтобы залогиненный не видел landing/login)

---

## Features (`src/features/`)

Бизнес-фичи — самостоятельные модули с UI, логикой и API.

### auth (`src/features/auth/`)

Авторизация и регистрация пользователей.

```
auth/
├── ui/
│   ├── login-form/        # Форма входа
│   ├── register-form/     # Форма регистрации
│   ├── forgot-form/       # Форма восстановления пароля
│   ├── reset-form/        # Форма сброса пароля
│   └── oauth-buttons/     # Кнопки OAuth (Google, GitHub)
├── hooks/                 # Хуки для форм
├── schemas/               # Zod-схемы валидации
├── locales/               # Тексты ошибок и сообщений
└── __tests__/             # Тесты форм, хуков, схем
```

### chat-assistant (`src/features/chat-assistant/`)

AI-чат помощник на основе RAG (vector search + LLM).

```
chat-assistant/
├── api/
│   └── chat.ts            # Fetch к edge function + streaming + mock mode
├── hooks/
│   └── use-chat.ts        # Состояние чата: messages[], isStreaming, isOpen
├── ui/
│   ├── chat-button.tsx    # Круглая кнопка (FAB) в правом нижнем углу
│   ├── chat-panel.tsx     # Боковая панель 400px с анимацией (framer-motion)
│   ├── chat-message.tsx   # Пузыри сообщений с markdown-рендерингом
│   └── chat-input.tsx     # Поле ввода с авторесайзом
├── lib/
│   └── types.ts           # ChatMessage, ChatParams
└── index.ts               # Публичные экспорты
```

### theme (`src/features/theme/`)

Переключение темы (dark/light) через `next-themes`.

---

## Entities (`src/entities/`)

Бизнес-сущности — данные и логика, не привязанная к конкретной фиче.

### session (`src/entities/session/`)

```
session/
├── auth-context.ts    # React Context для сессии пользователя
└── use-auth.ts        # Хук useAuth — доступ к текущему пользователю
```

---

## Shared (`src/shared/`)

Переиспользуемый код без бизнес-логики.

### API (`shared/api/`)

7 модулей, каждый содержит: `index.ts` (функции), `types.ts`, `mock.ts`.

| Модуль               | Функции                                                                              | Описание                           |
| -------------------- | ------------------------------------------------------------------------------------ | ---------------------------------- |
| `auth/`              | `signIn`, `signUp`, `signOut`, `signInWithOAuth`, `getSession`, `onAuthStateChange`  | Авторизация через Supabase Auth    |
| `topic/`             | `getTopics`                                                                          | Получение списка тем               |
| `task/`              | `getTask`, `getTasksByTopic`                                                         | Получение заданий                  |
| `dashboard/`         | `getDashboardStats`, `getTopicProgress`                                              | Статистика и прогресс              |
| `submissions/`       | `getSubmissionHistory`, `getSubmissionHistoryByTaskId`, `getPassedSubmissionHistory` | История ответов                    |
| `judge/`             | `evaluateTheory`                                                                     | Оценка ответа через AI (streaming) |
| `supabase-client.ts` | `supabase`                                                                           | Инициализация Supabase клиента     |

### UI (`shared/ui/`)

Компоненты на основе shadcn/ui:

| Компонент     | Файл                 | Описание                                                    |
| ------------- | -------------------- | ----------------------------------------------------------- |
| Button        | `button.tsx`         | Кнопка с вариантами (default, ghost, outline и т.д.)        |
| Badge         | `badge.tsx`          | Бейдж/метка                                                 |
| Card          | `card.tsx`           | Карточка с header, content, footer                          |
| Input         | `input.tsx`          | Текстовое поле                                              |
| PasswordInput | `password-input.tsx` | Поле пароля с toggle видимости                              |
| Label         | `label.tsx`          | Лейбл для полей формы                                       |
| Progress      | `progress.tsx`       | Полоса прогресса                                            |
| Tabs          | `tabs.tsx`           | Вкладки                                                     |
| Textarea      | `textarea.tsx`       | Многострочное поле ввода                                    |
| Form          | `form/`              | Компоненты формы (Field, Item, Label, Message, Description) |
| Loader        | `loader/`            | Индикатор загрузки                                          |
| Sonner        | `sonner.tsx`         | Toast-уведомления                                           |

### Config (`shared/config/`)

- `routes.ts` — константы роутов
- `supabase.ts` — конфигурация Supabase (URL, ключи, флаги mock mode)

### Lib (`shared/lib/`)

| Утилита                | Описание                               |
| ---------------------- | -------------------------------------- |
| `format-score`         | Форматирование оценки для отображения  |
| `group-by-stage`       | Группировка тем по этапам              |
| `get-topic-stats`      | Статистика по теме                     |
| `get-progress-percent` | Процент прогресса                      |
| `is-topic-completed`   | Проверка завершённости темы            |
| `delay`                | Async delay (для mock mode)            |
| `utils`                | Утилита `cn()` (clsx + tailwind-merge) |
| `constants`            | Общие константы (PASSING_SCORE и т.д.) |
| `locales/`             | Тексты для локализации                 |

### Types (`shared/types/`)

- `database.types.ts` — автогенерированные типы из Supabase (команда `pnpm types:db:local`)
