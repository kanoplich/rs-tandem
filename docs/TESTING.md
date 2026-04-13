# Testing

Фреймворк: vitest .

## Как запустить

```bash
pnpm test
```

## Участники

### @sunyuna00

Что тестирую: header и footer

| Файл                                | Описание                                                                             |
| ----------------------------------- | ------------------------------------------------------------------------------------ |
| `src/app/ui/header/header.test.tsx` | Рендер заголовка, кнопки навигации, logout и ссылки на dashboard                     |
| `src/app/ui/footer/footer.test.tsx` | Проверка текста футера: описание, "powered by", разработчики, copyright и сам footer |

PR с тестами: https://github.com/kanoplich/rs-tandem/pull/123

### @artkoro94

Что тестирую: компонент формы входа (LoginForm)

| Файл                                       | Описание                                                                       |
| ------------------------------------------ | ------------------------------------------------------------------------------ |
| `src/features/auth/ui/login-form.test.tsx` | тест рендера компонента LoginForm и проверка отображения заголовка формы входа |

PR с тестами: https://github.com/kanoplich/rs-tandem/pull/120

### @rockabil

Что тестирую: роутер

| Файл                                      | Описание                                                              |
| ----------------------------------------- | --------------------------------------------------------------------- |
| `src/app/router/protected-route.test.tsx` | показывает Loader, редиректа на Login, Dashboard, показывает children |

PR с тестами: https://github.com/kanoplich/rs-tandem/pull/128

### @kanoplich

Что тестирую: API-сервис

| Файл                                             | Описание                   |
| ------------------------------------------------ | -------------------------- |
| `src/shared/api/auth/auth.test.ts`               | Получение сессии           |
| `src/shared/api/dashboard/dashboard.test.ts`     | Получение статистики юзера |
| `src/shared/api/submissions/submissions.test.ts` | Получение истории          |
| `src/shared/api/task/task.test.ts`               | Получение задач            |
| `src/shared/api/topic/topic.test.ts`             | Получение тем              |

PR с тестами: https://github.com/kanoplich/rs-tandem/pull/121

### @vadim-troian

Что тестирую: формы регистрации и сброса пароля

| Файл                                                | Описание                                                                                                                          |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `src/features/auth/hooks/use-forgot-form.test.ts`   | Тестирование логики сброса пароля: инициализация, успешный вызов API, обработка серверных и неизвестных ошибок через toast.       |
| `src/features/auth/hooks/use-register-form.test.ts` | Тестирование логики регистрации: отправка данных в `signUp`, обработка ошибок, состояние загрузки (`isSubmitting`) и уведомления. |
| `src/features/auth/hooks/use-reset-form.test.ts`    | Тестирование логики обновления пароля: вызов API, редирект на Dashboard после успеха и обработка ошибок валидации.                |
| `src/features/auth/model/forgot-schema.test.ts`     | Валидация Zod-схемы для забытого пароля: проверка корректности формата email.                                                     |
| `src/features/auth/model/register-schema.test.ts`   | Тестирование схемы регистрации: совпадение паролей, сложность пароля, обязательность имени и формат email.                        |
| `src/features/auth/model/reset-schema.test.ts`      | Валидация схемы нового пароля: проверка требований к надежности и идентичности двух полей пароля.                                 |
| `src/features/auth/ui/forgot-form.test.tsx`         | Рендер формы восстановления: наличие заголовков, инпутов, кнопки отправки, лоадера и ссылки на логин.                             |
| `src/features/auth/ui/register-form.test.tsx`       | Отрисовка формы регистрации: проверка всех полей ввода, кнопок соцсетей (OAuth) и навигационных ссылок.                           |
| `src/features/auth/ui/reset-form.test.tsx`          | Рендер формы установки нового пароля: проверка полей, лейблов, кнопки сабмита и отображения ошибок API.                           |

PR с тестами: https://github.com/kanoplich/rs-tandem/pull/193

### @sevasmith

Что тестирую: Dashboard

| Файл                                                                | Описание                                           |
| ------------------------------------------------------------------- | -------------------------------------------------- |
| `src/shared/lib/get-topic-stats.test.ts`                            | Проверка подсчета статистики                       |
| `src/pages/dashboard/ui/overall-stats/overall-stats.test.tsx`       | Проверка отбражения статистики                     |
| `src/pages/dashboard/ui/stat-card/stat-card.test.tsx`               | Проверка отбражения статистики                     |
| `src/pages/dashboard/ui/dashboard-header/dashboard-header.test.tsx` | Проверка отображения заголовка                     |
| `src/pages/dashboard/hooks/use-dashboard-data.test.tsx`             | Проверка работы хука для получения данных дашборда |

PR с тестами: https://github.com/kanoplich/rs-tandem/pull/256

## E2E-Tests

Как запустить: [инструкция по запуску](docs/e2e-testing/e2e-testing.md)
