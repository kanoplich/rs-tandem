# Testing

Фреймворк: vitest

## Как запустить

```bash
npm test
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
