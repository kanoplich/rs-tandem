# Скрипты и инструменты

## Скрипты package.json

### Разработка

| Команда        | Описание                                                                 |
| -------------- | ------------------------------------------------------------------------ |
| `pnpm dev`     | Запуск dev-сервера (Vite, http://localhost:5173, авто-открытие браузера) |
| `pnpm build`   | Сборка для продакшена (TypeScript check + Vite build → `dist/`)          |
| `pnpm preview` | Предпросмотр продакшен-сборки (http://localhost:4173)                    |

### Качество кода

| Команда          | Описание                                                            |
| ---------------- | ------------------------------------------------------------------- |
| `pnpm lint`      | Проверка ESLint (все файлы, `--max-warnings=0` — ни одного warning) |
| `pnpm lint:fix`  | Автоисправление ESLint                                              |
| `pnpm format`    | Форматирование Prettier (ts, tsx, css, html, json, md)              |
| `pnpm ci:format` | Проверка форматирования (для CI, без изменений)                     |

### Тестирование

| Команда              | Описание                            |
| -------------------- | ----------------------------------- |
| `pnpm test`          | Запуск тестов (Vitest, watch-режим) |
| `pnpm test:ui`       | Тесты с UI-интерфейсом Vitest       |
| `pnpm test:coverage` | Тесты с отчётом покрытия            |

### База данных

| Команда               | Описание                                                                  |
| --------------------- | ------------------------------------------------------------------------- |
| `pnpm types:db:local` | Генерация TS типов из локальной БД → `src/shared/types/database.types.ts` |
| `pnpm types:db`       | Генерация TS типов из удалённой БД                                        |

### Supabase

| Команда                                | Описание                               |
| -------------------------------------- | -------------------------------------- |
| `npx supabase start`                   | Запуск локального Supabase (Docker)    |
| `npx supabase stop`                    | Остановка локального Supabase          |
| `npx supabase status`                  | Показать URL и ключи                   |
| `npx supabase db reset`                | Сброс БД + применение всех миграций    |
| `npx supabase db push`                 | Применить миграции к удалённой БД      |
| `npx supabase migration new <name>`    | Создать новую миграцию                 |
| `npx supabase functions serve`         | Запуск edge functions локально         |
| `npx supabase functions deploy <name>` | Деплой edge function                   |
| `npx supabase secrets set KEY=value`   | Установить секрет на удалённом сервере |
| `npx supabase secrets list`            | Показать секреты                       |

---

## Git Hooks (Husky)

Хуки настроены через Husky и выполняются автоматически.

### pre-commit

```bash
pnpx lint-staged
```

Запускает lint-staged на изменённых файлах:

- `*.ts, *.tsx` → ESLint fix + Prettier
- `*.css, *.json, *.md` → Prettier

### commit-msg

```bash
pnpm commitlint --edit $1
```

Проверяет формат commit message по [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: добавить авторизацию через Google
fix: исправить отображение прогресса
refactor: вынести CORS в shared
docs: обновить README
test: добавить тесты для dashboard API
chore: обновить зависимости
```

Формат: `<тип>: <описание>`. Тип обязателен, описание с маленькой буквы.

### pre-push

```bash
pnpm vitest run
```

Запускает все тесты перед push. Если тесты падают — push блокируется.

---

## CI/CD (GitHub Actions)

Файл: `.github/workflows/ci.yml`

Запускается на каждый push и pull request во все ветки.

### Pipeline

```
push/PR → lint → type-check → test → build & preview → deploy
                                                          │
                                              только main/develop
                                              после успеха всех шагов
```

### Jobs

| Job               | Что делает                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------ |
| **lint-code**     | `pnpm run lint` — ESLint проверка                                                          |
| **check-types**   | `tsc --noEmit` — TypeScript проверка типов                                                 |
| **test**          | `pnpm run test -- --run` — запуск тестов (не watch)                                        |
| **preview-check** | `pnpm run build` + `pnpm run preview` + `curl` — сборка и проверка что приложение стартует |
| **deploy**        | Деплой на Netlify (только main/develop, после успеха всех предыдущих jobs)                 |

### Другие workflows

| Файл                 | Описание                                      |
| -------------------- | --------------------------------------------- |
| `assignee.yml`       | Авто-назначение исполнителя PR по имени ветки |
| `pr-to-telegram.yml` | Отправка уведомлений о PR в Telegram          |

---

## ESLint

Конфигурация: `eslint.config.js` (ESLint 9, flat config).

### Основные правила

| Правило                              | Значение                | Описание                          |
| ------------------------------------ | ----------------------- | --------------------------------- |
| `@typescript-eslint/no-explicit-any` | error                   | Запрет `any`                      |
| `no-console`                         | warn (кроме warn/error) | Предупреждение при `console.log`  |
| `prefer-const`                       | error                   | Использовать `const` вместо `let` |
| `eqeqeq`                             | error                   | Строгое сравнение `===`           |
| `no-var`                             | error                   | Запрет `var`                      |

### Плагины

- `react` — правила для React
- `react-hooks` — правила хуков (deps, rules of hooks)
- `react-refresh` — проверка HMR совместимости
- `jsx-a11y` — доступность
- `import` — порядок импортов
- `prettier` — интеграция с Prettier

---

## Prettier

Конфигурация: `.prettierrc`

| Параметр        | Значение  |
| --------------- | --------- |
| Print width     | 100       |
| Tab width       | 2         |
| Кавычки         | Одинарные |
| Trailing comma  | ES5       |
| Точка с запятой | Да        |
| Перенос строк   | LF        |
