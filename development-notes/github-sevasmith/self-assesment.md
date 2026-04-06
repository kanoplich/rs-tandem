# Self-Assessment

## 1. Таблица фич

| Категория            | Фича                                                             | PR                                                                                                                                                                                | Баллы |
| -------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **My Components**    | Complex Backend Service (AI Edge Function – judge)               | [PR #77](https://github.com/kanoplich/rs-tandem/pull/77)                                                                                                                          | +30   |
|                      | Rich UI Screen (Dashboard)                                       | [PR #203](https://github.com/kanoplich/rs-tandem/pull/203), [PR #216](https://github.com/kanoplich/rs-tandem/pull/216)                                                            | +20   |
| **AI**               | AI Streaming (stream ответа LLM)                                 | [PR #109](https://github.com/kanoplich/rs-tandem/pull/109)                                                                                                                        | +10   |
|                      | Raw LLM API (fetch + ReadableStream + Groq API)                  | [PR #35](https://github.com/kanoplich/rs-tandem/pull/35)                                                                                                                          | +10   |
|                      | Tool Use (Function Calling для оценки)                           | [PR #232](https://github.com/kanoplich/rs-tandem/pull/232)                                                                                                                        | +15   |
| **UI & Interaction** | Responsive (Dashboard адаптив)                                   | [PR #203](https://github.com/kanoplich/rs-tandem/pull/203)                                                                                                                        | +5    |
|                      | Unit Tests (Basic)                                               | [PR #256](https://github.com/kanoplich/rs-tandem/pull/256)                                                                                                                        | +10   |
|                      | Unit Tests (Full)                                                | [PR #256](https://github.com/kanoplich/rs-tandem/pull/256)                                                                                                                        | +10   |
|                      | E2E Tests: (Cypress)                                             | [PR #266](https://github.com/kanoplich/rs-tandem/pull/266)                                                                                                                        | +10   |
|                      | Accessibility: Оптимизация доступности (keyboard navigation)     | [PR #203](https://github.com/kanoplich/rs-tandem/pull/203)                                                                                                                        | +10   |
| **DevOps & Role**    | Docker (локальный запуск Supabase + Edge Functions)              | [PR #35](https://github.com/kanoplich/rs-tandem/pull/35)                                                                                                                          | +10   |
|                      | Prompt Engineering (итерации улучшения промптов)                 | [PR #77](https://github.com/kanoplich/rs-tandem/pull/77), [PR #109](https://github.com/kanoplich/rs-tandem/pull/109), [PR #232](https://github.com/kanoplich/rs-tandem/pull/232), | +15   |
| **Architecture**     | API Layer (выделенный слой работы с API)                         | [PR #35](https://github.com/kanoplich/rs-tandem/pull/35)                                                                                                                          | +10   |
|                      | Design Patterns (валидация, разделение ответственности, helpers) | [PR #109](https://github.com/kanoplich/rs-tandem/pull/109), [PR #35](https://github.com/kanoplich/rs-tandem/pull/35), [PR #216](https://github.com/kanoplich/rs-tandem/pull/216)  | +10   |
| **Framework**        | React: Использование библиотеки React                            | [PR #216](https://github.com/kanoplich/rs-tandem/pull/216)                                                                                                                        | +5    |

### Итого: **180 баллов**

---

## 2. Описание моей работы

В рамках проекта я отвечал за разработку **AI-компонента** (Edge Function, LLM Answer Streaming, Tool Use / Functional Calling) и **Dashboard**. Также я создал Unit тесты и e2e тесты, был в течение одной недели тим-лидом, и записал видео-презентацию проекта.

### AI Edge Function (judge)

Я разработал Edge Function `judge`, которая:

- принимает ответ пользователя
- получает задачу и рубрики из базы
- отправляет запрос к LLM (Groq)
- валидирует ответ модели
- рассчитывает итоговый score на бэкенде
- сохраняет результат в базу данных

Реализовано:

- проверка входных данных и авторизации
- защита от некорректных ответов LLM
- строгая JSON-валидация
- система рубрик для оценки
- обработка ошибок

---

### AI Integration

Работа с AI была одной из самых сложных частей проекта.

Я реализовал:

- интеграцию с Groq API без SDK (через fetch)
- стриминг ответа LLM (ReadableStream)
- разделение фидбека и JSON-данных
- несколько итераций улучшения промптов

Позже я участвовал в рефакторинге с использованием **function calling**, где:

- LLM генерирует фидбек
- отдельная функция рассчитывает score
- логика оценки перенесена с LLM на backend

---

### Основные технические сложности

**1. CORS и авторизация**

- ошибки 401 и проблемы с JWT
- решение через настройку Edge Function и Supabase

**2. Стриминг**

- сложность отделения JSON от текста
- работа с буфером и частичным чтением ответа

**3. Архитектура AI**

- выбор между одним и двумя запросами
- компромисс между простотой и консистентностью

**4. Function Calling**

- LLM завышала оценки
- потребовалась доработка промптов и логики

---

### Dashboard

Я также реализовал страницу Dashboard:

- верстка (TailwindCSS)
- ксоздание кастомного хука для загрузки данных
- расчет статистики:
  - общий прогресс
  - средний score
  - завершенные темы
- адаптивность под разные устройства

Дополнительно:

- useMemo для оптимизации
- интеграция с API
- работа с существующей архитектурой

---

### Code Review и Backend

Я выполнил следующее:

- разобрался в Supabase (таблицы, RLS, auth)
- делал code review backend-кода
- предложил улучшения:
  - использование auth.uid()
  - уникальность email
- изучил API слой

---

## 3. Мои 2 личных Feature Component

### 1. AI Edge Function (judge)

Это мой основной и самый сложный компонент.

Почему он важен:

- реализует core-логику продукта
- объединяет backend + AI + validation
- содержит сложную бизнес-логику оценки

Что я могу объяснить:

- как работает запрос к LLM
- как валидируется ответ
- как рассчитывается score
- как устроен streaming
- как устроен function calling

---

### 2. Dashboard

Полностью реализованный мной экран.

Почему выбрал:

- полностью реализован мной
- включает UI + бизнес-логику + API
- демонстрирует работу с состоянием

Что я могу объяснить:

- как устроен кастомный хук
- как считается статистика
- как организованы компоненты
- как работает адаптивность

---

**Ссылка на PR c Self-Assesment: https://github.com/kanoplich/rs-tandem/pull/295**
