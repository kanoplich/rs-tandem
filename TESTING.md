# Testing

Фреймворк: vitest / jest / другой

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
