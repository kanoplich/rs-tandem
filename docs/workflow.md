# Development Workflow

## Содержание

- [Стек и инфраструктура](#стек-и-инфраструктура)
- [Ветки и Git Flow](#ветки-и-git-flow)
- [Linear и задачи](#linear-и-задачи)
- [Именование веток](#именование-веток)
- [Коммиты](#коммиты)
- [Pull Requests](#pull-requests)
- [CI/CD Pipeline](#cicd-pipeline)
- [GitHub Actions](#github-actions)
- [Git Hooks](#git-hooks)
- [Деплой](#деплой)
- [Нотификации](#нотификации)
- [Код-стайл и линтинг](#код-стайл-и-линтинг)

---

## Стек и инфраструктура

| Компонент         | Технология                                |
| ----------------- | ----------------------------------------- |
| Frontend          | React 19, TypeScript, Vite                |
| Стилизация        | Tailwind CSS 4, CSS Modules               |
| Бэкенд            | Supabase (Auth, Database, Edge Functions) |
| Тестирование      | Vitest (unit), Cypress (e2e)              |
| Линтинг           | ESLint 9 (flat config), Prettier          |
| Пакетный менеджер | pnpm 9                                    |
| CI/CD             | GitHub Actions                            |
| Хостинг           | Netlify                                   |
| Трекер задач      | Linear (синхронизация с GitHub)           |
| Коммуникация      | Telegram (уведомления о PR)               |

---

## Ветки и Git Flow

Проект использует модель **Git Flow** с двумя основными ветками:

```
main ← develop ← feature branches
```

| Ветка       | Назначение                                                |
| ----------- | --------------------------------------------------------- |
| `main`      | Production-ready код. Мерж только из `develop` при релизе |
| `develop`   | Интеграционная ветка. Все фичи мержатся сюда через PR     |
| `team42-*/` | Рабочие ветки задач (создаются от `develop`)              |

### Правила

- **`main`** — прямые коммиты запрещены; мерж только из `develop` при готовности к релизу
- **`develop`** — прямые коммиты запрещены; изменения только через Pull Request
- **Рабочие ветки** — не удаляются после мержа (сохраняются для трекинга истории)

---

## Linear и задачи

Задачи ведутся в **Linear** (проект Team42), синхронизированы с GitHub.

### Жизненный цикл задачи

```
Linear: Backlog → Todo → In Progress → In Review → Done
                    ↓
            Создание ветки → Разработка → PR → Code Review → Merge
```

### Linear-шаблон задачи

Каждая задача в Linear содержит:

- **ID** — уникальный идентификатор (например, `Team42-192`)
- **Title** — название задачи (используется в заголовке PR)
- **Label** — тип задачи (`feature`, `bugfix`, `refactor`, `test`, `documentation`, `configuration`, `style`)
- **Assignee** — ответственный разработчик
- **Priority** — приоритет (Urgent / High / Medium / Low)

ID задачи из Linear является ключом, связывающим ветку, коммиты и PR.

---

## Именование веток

**Формат:** `Team42-{ID}/{type}/{description}`

- `Team42-{ID}` — ID задачи из Linear
- `type` — тип изменений
- `description` — краткое описание (kebab-case)

### Типы веток

| Тип        | Описание                         | Пример                                    |
| ---------- | -------------------------------- | ----------------------------------------- |
| `feat`     | Новая функциональность           | `team42-112/feat/topics`                  |
| `fix`      | Исправление бага                 | `team42-114/fix/rename-locales-constants` |
| `refactor` | Рефакторинг без изменения логики | `team42-138/refactor/transfer-loader`     |
| `test`     | Тесты                            | `team42-118/test/login-test`              |
| `docs`     | Документация                     | `team42-191/docs/readme-docs`             |
| `doc`      | Документация (сокращённая форма) | `team42-204/doc/self-assesment`           |

> Для дневников команды допускается упрощённый формат: `team42-{ID}/diary-week-{N}` или `team42-{ID}/docs/diary`.

---

## Коммиты

Используется **Conventional Commits** по стандарту RS School.

### Формат

```
<тип>: <описание>
```

### Типы коммитов

| Тип        | Описание                            |
| ---------- | ----------------------------------- |
| `feat`     | Новая функциональность              |
| `fix`      | Исправление бага                    |
| `refactor` | Рефакторинг без изменения поведения |
| `docs`     | Изменения в документации            |
| `test`     | Добавление или изменение тестов     |
| `chore`    | Обслуживание (зависимости, конфиги) |
| `style`    | Изменения стилей/форматирования     |
| `init`     | Инициализация проекта или модуля    |

### Правила

1. Тип коммита — **только нижний регистр** (`feat:`, не `Feat:`)
2. Описание в **Present Tense** — `add feature`, не `added feature`
3. **Imperative Mood** — `move cursor to...`, не `moves cursor to...`
4. Описание с **маленькой буквы** после двоеточия

### Примеры

```
feat: add OAuth login via Google
fix: correct progress bar calculation
refactor: extract CORS config to shared
docs: update README with setup instructions
test: add unit tests for dashboard API
chore: update dependencies
```

Формат проверяется автоматически хуком `commitlint` (см. [Git Hooks](#git-hooks)).

> Справка: [RS School Git Convention](https://rs.school/ru/docs/git-convention)

---

## Pull Requests

### Стратегия мержа

**Squash & Merge** — все коммиты ветки сжимаются в один при мерже в `develop`.

Исключение: дневники команды мержатся через **Merge Commit** (сохранение истории коммитов).

### Заголовок PR

**Формат:** `Team42-{ID}/{Название задачи из Linear}`

Примеры:

- `Team42-192/Create e2e tests`
- `Team42-201/Привести импорты в порядок`
- `Team42-198/Fix UI feedback color and data fetching issues`

### Шаблон PR

Файл: `.github/pull_request_template.md`

```markdown
## Type of change

- [ ] Feature
- [ ] Fix / Bugfix
- [ ] Refactor (no logic change)
- [ ] Chore / Maintenance
- [ ] Styling / UI
- [ ] Tests
- [ ] Documentation
- [ ] Project settings / configs

## Summary

Описание: что сделано и зачем.

## How to test

1. Run `pnpm run dev`
2. Open `http://localhost:5173`
3. ...

## Screenshots / video (optional)

## Checklist

- [ ] PR title is clear and descriptive
- [ ] Code follows project conventions and structure
- [ ] No ESLint / Type errors
- [ ] All new code is covered by tests (if applicable)
```

Шаблон заполняется по задаче: отмечаются нужные чекбоксы, неактуальные секции удаляются.

### Code Review

При открытии PR автоматически (через GitHub Action `assignee.yml`):

- **Assignee** — автор PR
- **Reviewers** — 2 случайных участника из команды

Для мержа необходимо:

- Минимум **1 апрув** от ревьюера
- Прохождение всех **CI checks** (lint, types, tests, build)

---

## CI/CD Pipeline

Файл: `.github/workflows/ci.yml`

### Триггеры

- Каждый **push** в любую ветку
- Каждый **pull request** в любую ветку

### Этапы

```
push / PR
    ├── Lint          (ESLint)
    ├── Type check    (tsc --noEmit)
    ├── Test          (Vitest --run)
    └── Build         (Vite build + preview + curl health check)
                          │
                    [все 4 прошли]
                          │
                    Deploy to Netlify
                  (только main / develop)
```

### Jobs

| Job               | Команда                         | Описание                                              |
| ----------------- | ------------------------------- | ----------------------------------------------------- |
| **lint-code**     | `pnpm run lint`                 | ESLint проверка (`--max-warnings=0`)                  |
| **check-types**   | `pnpm exec tsc --noEmit`        | TypeScript проверка типов                             |
| **test**          | `pnpm run test -- --run`        | Unit-тесты (Vitest, single run)                       |
| **preview-check** | `pnpm run build` + `curl :4173` | Сборка + проверка, что приложение запускается         |
| **deploy**        | Netlify action                  | Деплой (production для `main`, preview для `develop`) |

### Окружение CI

- **Runner:** `ubuntu-latest`
- **Node.js:** 20
- **pnpm:** 9
- **Кэширование:** pnpm store

---

## GitHub Actions

| Workflow                  | Файл                 | Триггер                           | Описание                               |
| ------------------------- | -------------------- | --------------------------------- | -------------------------------------- |
| **CI**                    | `ci.yml`             | push, pull_request                | Lint, types, tests, build, deploy      |
| **Review Assign**         | `assignee.yml`       | PR opened, ready_for_review       | Авто-назначение assignee и 2 ревьюеров |
| **Notify PR in Telegram** | `pr-to-telegram.yml` | PR opened, ready, closed, updated | Уведомление в Telegram-чат команды     |

---

## Git Hooks

Настроены через **Husky**. Выполняются автоматически.

### pre-commit

```bash
pnpx lint-staged
```

Запускает **lint-staged** на изменённых файлах:

- `*.ts, *.tsx` → ESLint fix + Prettier
- `*.css, *.json, *.md` → Prettier

### commit-msg

```bash
pnpm commitlint --edit $1
```

Проверяет формат коммита по Conventional Commits. Коммит с неправильным форматом не пройдёт.

### pre-push

```bash
pnpm vitest run
```

Запускает все unit-тесты перед push. Если тесты падают — push блокируется.

---

## Деплой

| Окружение  | Ветка     | URL                  | Тип           |
| ---------- | --------- | -------------------- | ------------- |
| Production | `main`    | Netlify (production) | Ручной мерж   |
| Staging    | `develop` | Netlify (preview)    | Автоматически |

Деплой выполняется через **Netlify** (`nwtgck/actions-netlify@v3`):

- Запускается только после успешного прохождения всех CI jobs
- `main` → production deploy
- `develop` → preview deploy
- Результат деплоя публикуется комментарием в коммит

### Секреты (GitHub Secrets)

| Secret               | Назначение                |
| -------------------- | ------------------------- |
| `NETLIFY_AUTH_TOKEN` | Токен авторизации Netlify |
| `NETLIFY_SITE_ID`    | ID сайта на Netlify       |
| `TG_BOT_TOKEN`       | Токен Telegram-бота       |
| `TG_CHAT_ID`         | ID чата команды           |

---

## Нотификации

При событиях с PR бот отправляет уведомление в **Telegram-чат команды**:

| Событие           | Сообщение                              |
| ----------------- | -------------------------------------- |
| PR создан         | `New PR created` + автор + ссылка      |
| PR готов к ревью  | `PR ready for review` + автор + ссылка |
| PR закрыт/мержен  | `PR closed or merged` + автор + ссылка |
| Новый коммит в PR | `PR updated` + автор + ссылка          |

---

## Код-стайл и линтинг

### ESLint

Конфигурация: `eslint.config.js` (ESLint 9, flat config)

Ключевые правила:

| Правило                              | Значение | Описание                         |
| ------------------------------------ | -------- | -------------------------------- |
| `@typescript-eslint/no-explicit-any` | error    | Запрет `any`                     |
| `no-console`                         | warn     | Предупреждение при `console.log` |
| `prefer-const`                       | error    | `const` вместо `let`             |
| `eqeqeq`                             | error    | Строгое сравнение `===`          |
| `no-var`                             | error    | Запрет `var`                     |

Плагины: `react`, `react-hooks`, `react-refresh`, `jsx-a11y`, `import`, `prettier`

### Prettier

Конфигурация: `.prettierrc`

| Параметр        | Значение  |
| --------------- | --------- |
| Print width     | 100       |
| Tab width       | 2         |
| Кавычки         | Одинарные |
| Trailing comma  | ES5       |
| Точка с запятой | Да        |
| Перенос строк   | LF        |

### TypeScript

Конфигурация: `tsconfig.app.json` (исходный код), `tsconfig.node.json` (Vite config)

Включены строгие проверки:

- `strict: true`
- `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`
- `noImplicitReturns`, `noUncheckedIndexedAccess`
- `exactOptionalPropertyTypes`
- `noUnusedLocals`, `noUnusedParameters`

---

## Командные соглашения по коду

### Именование файлов и папок

- Файлы и папки — **kebab-case**: `login-form.tsx`, `reset-page/`
- Компоненты внутри — **PascalCase**: `export const LoginForm = () => …`

### Иконки

Иконки находятся в `shared/assets/icons`. Все SVG экспортируются как React-компоненты в `index.ts`:

```ts
// shared/assets/icons/index.ts
export { default as LogoIcon } from './logo.svg?react';
```

```tsx
// использование
<LogoIcon className={styles.logo} />
```

Порядок поиска иконок:

1. Библиотека [Lucide](https://lucide.dev/icons/) (уже подключена в проекте)
2. Экспорт из Figma → добавить в `shared/assets/icons`

### CSS Modules

В проекте используется **Tailwind CSS** для основной стилизации. Для кастомных стилей допускаются **CSS Modules**:

- Файл стилей лежит рядом с компонентом: `styles.module.css`
- Имена классов в CSS — **kebab-case**: `.step-card { }`
- Доступ в TSX — **camelCase** через точку: `styles.stepCard`

### Текстовые константы

Запрещён «голый» текст в JSX. Весь текст выносится в константы:

```tsx
// Плохо
<Button>Войти</Button>

// Хорошо
<Button>{AUTH_LOGIN_TEXT.SUBMIT_BUTTON}</Button>
```

Правила размещения:

- Текст одной фичи → константы внутри этой фичи (`features/.../locales/`)
- Текст нескольких фич → `shared/config/ui-texts.ts` или `shared/const/`
- Маркетинговые тексты страниц → `pages/.../config/texts.ts`

Имена констант — `UPPER_SNAKE_CASE` с осмысленными ключами:

- `AUTH_LOGIN_TEXT.SUBMIT_BUTTON` — да
- `TEXT_1`, `TEXT_2` — нет

> Структура ключей подготовлена к будущей мультиязычности (i18n).

---

## Labels (GitHub)

| Label           | Цвет    | Описание               |
| --------------- | ------- | ---------------------- |
| `feature`       | #BB87FC | Новая функциональность |
| `bugfix`        | #ededed | Исправление бага       |
| `refactor`      | #ededed | Рефакторинг            |
| `test`          | #bec2c8 | Тесты                  |
| `style`         | #4EA7FC | Стилизация / UI        |
| `documentation` | #0075ca | Документация           |
| `configuration` | #ededed | Настройки проекта      |
| `bug`           | #d73a4a | Баг (GitHub default)   |
| `enhancement`   | #a2eeef | Улучшение              |
