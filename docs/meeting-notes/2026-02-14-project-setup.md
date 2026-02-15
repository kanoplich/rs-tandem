# Meeting Notes #1 - Project Setup

**Дата:** 14 февраля 2026

**Длительность:** ~3.5 часа

# Цель встречи

Настроить базовую конфигурацию проекта RS Tandem с современным стеком технологий для командной разработки.

# Выполненные задачи

### 1. GitHub Repository Setup

- Создан репозиторий проекта
- Добавлены все участники команды
- Настроена защита ветки `main` (требуется PR + 1 approval)
- Создана ветка `develop` (установлена как default)
- Добавлен PR template (`.github/pull_request_template.md`)

### 2. Проект инициализирован

- Vite + React 19 + TypeScript 5
- pnpm как package manager
- Настроен Node.js версия (22.15.0) в `.nvmrc`
- Созданы `.editorconfig` и `.gitattributes`

### 3. Зависимости установлены

- React Router v6
- React Hook Form + Zod
- Supabase client
- shadcn/ui + Tailwind CSS
- Vitest + Testing Library
- Lucide React (иконки)

### 4. Code Quality Setup

- ESLint (упрощённая конфигурация без unicorn)
- Prettier
- Husky (pre-commit, pre-push, commit-msg)
- lint-staged
- Commitlint (conventional commits)

### 5. TypeScript Configuration

- Строгие настройки включены
- Path aliases настроены (`@/*`)

### 6. Тестирование

- Vitest + jsdom
- Testing Library (React, Jest-DOM, User Event)
- Скрипты: `test`, `test:ui`, `test:coverage`

### 7. shadcn/ui для FSD

- Кастомная конфигурация `components.json` для FSD структуры
- Компоненты устанавливаются в `src/shared/ui`
- Утилиты в `src/shared/lib`
- Установлены `clsx` и `tailwind-merge`

### 8. Linear Project Management

- Создан проект в Linear
- Настроена интеграция с GitHub
- Добавлены все участники
- Созданы циклы (Sprints)
- Настроены доски (Backlog, In Progress, Review, Done)
- Определён идентификатор для веток: TEAM42
- Добавлены метки (labels)
- Созданы первые задачи по конфигурации

### 9. Environment Variables

- Создан `.env.example`
- `.env` в `.gitignore`
- TypeScript типы для env (`vite-env.d.ts`)

# Принятые решения

- Использовать ESLint без unicorn для ускорения разработки MVP;
- Tailwind + CSS Modules (гибрид). shadcn компоненты на Tailwind, кастомные стили на CSS Modules;
- FSD архитектура для масштабируемости и структурированности;
- Pre-push запускает lint + тесты. Защита от плохого кода в репозитории;
