# E2E-Testing

Фреймворк: cypress .

## Как запустить

### Предварительно

1. `pnpm install` — установить Cypress и зависимости
2. `pnpm dev` — запустить dev-сервер (тесты ходят на localhost:5173)
3. `VITE_MOCK_SUPABASE = true` в .env файле — включить моковый режим

### Запуск тестов

- Интерактивный режим: `pnpm cypress:open`
- Headless (терминал): `pnpm cypress:run`

### @sevasmith

Что тестирую: Страницы лендинга, логина, регистрации, дашборд, хедер

| Файл                          | Описание                     |
| ----------------------------- | ---------------------------- |
| `cypress/e2e/dashboard.cy.ts` | Переход к странице тем       |
| `cypress/e2e/header.cy.ts`    | Переключение страниц         |
| `cypress/e2e/landing.cy.ts`   | Переход к регистрации/логину |
| `cypress/e2e/login.cy.ts`     | Процесс логина               |
| `cypress/e2e/register.cy.ts`  | Процесс регистрации          |
