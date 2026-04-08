# Git Flow & Collaboration Standards

В этом проекте мы придерживаемся строгих стандартов RS School.

## Навигация

- [1. Naming Convention: Ветки](#1-naming-convention-ветки)
- [2. Commit Convention (Рабочие коммиты)](#2-commit-convention-рабочие-коммиты)
- [3. Pull Request Title & Squash Commit](#3-pull-request-title--squash-commit)
- [4. Pull Request Template](#4-pull-request-template)
- [5. Development Diary: Работа с дневниками](#5-development-diary-работа-с-дневниками)
- [6. Team code style](#6-team-code-style)

## 1. Naming Convention: Ветки

Мы используем формат веток, привязанный к ID задач в Linear.

**Формат:**
`Team42-ID/type/description`

- **Team42-ID**: ID задачи из доски (например, `RSS-TD-25`).
- **type**: Тип изменений (feat, fix, refactor и т.д.)
- **\_description**: Описание задачи

## 2. Commit Convention (Рабочие коммиты)

Названия обычных коммитов внутри ветки должны быть согласно [RS School Guideline](https://rs.school/ru/docs/git-convention).

### Основные правила:

1.  **Только нижний регистр** для типа с двоеточием (`feat:`, `fix:`, `refactor:` и т.д.).
2.  **Present Tense** ("add feature", NOT "added feature").
3.  **Imperative Mood** ("move cursor to...", NOT "moves cursor to...").

---

## 3. Pull Request Title & Squash Commit

При завершении задачи мы используем стратегию **Squash & Merge**, т.е. после того, как вы получили как минимум один апрув, вы можете заливать свою ветку на дев.

Для заголовков ПР придерживаться этого образца:

**Формат:**
`Team42-ID/Название как в линеаре`

---

## 4. Pull Request Template

Используется шаблон описания Pull Request:

```markdown
## 🚀 Type of change

- [ ] Feature
- [ ] Fix / Bugfix
- [ ] Refactor (no logic change)
- [ ] Chore / Maintenance
- [ ] Styling / UI
- [ ] Tests
- [ ] Documentation
- [x] Project settings / configs

## 📋 Summary

Briefly describe what this PR does.  
Explain **what** you added/changed and **why**. If relevant, mention related issues or context.

> Example:  
> Helps streamline UI development and supports visual review in PRs.

## 🧪 How to test

1. Run `pnpm run dev`
2. Open `http://localhost:5173`
3. Ensure components render correctly

## 📸 Screenshots / video (optional)

## 🔍 Checklist

- [x] PR title is clear and descriptive
- [x] Code follows project conventions and structure
- [x] No ESLint / Type errors
- [x] All new code is covered by tests (if applicable)
```

Шаблон редактируется согласно вашему Pull Request! Оставляется только то, что касается вашей реализации, все остальное или оформляется до конца, или удаляется. Галочки должны быть соотвествующие выделены, что делали.

## 5. Development Diary: Работа с дневниками

Для дневников создаем отдельные ветки, и мержим их в ветку дев с сохранением истории коммитов. **Commit and merge**

## 6. Team code style

1. **Имена файлов и папок в проекте:** Папки и файлы на проекте , все пишем маленькими буквами, и если из двух слов, то через дефис - **kebab-case.** А уже сам компонент уже как положено с большой буквы и **CamelCase.**

   `login-form.tsx` - имя файла

   `export const LoginForm = () => …` - имя компонента

2. **Иконки на проекте:** Иконки находятся в папке `shared/assets/icons` В этой папке все SVG экспортируются как React-компоненты в `index.ts` файле, то есть иконку можно использовать как обычный реакт компонент. Если нужно добавить иконку, то сам файл svg кладется в `shared/assets/icons` а затем, в `index.ts` добавляется ее экспорт:

   `export { default as LogoIcon } from './logo.svg?react';`

   и потом использовать на проекте как компонент:

   `<LogoIcon className={styles.logo} />`

   Если нужна иконка, то в первую очередь, она ищется в библиотеке, которая подключена в проекте - https://lucide.dev/icons/

   Если там нет, то тогда экспортируется из фигмы, придерживаясь инструкциям выше.

3. **CSS modules на проекте**

   В проекте используется Tailwind классы, но для кастмоных стилей разрешается использовать css modules. В файлах стилей используется стиль имен для классов: `.step-card { /* kebab-case */ }`, а в tsx файлах компонента доступ к именам классов через `camelCase` и через точку, вот таким образом: `import styles from './styles.module.css';` `styles.stepCard`

   Файл со стилями лежит в папке с компонентом, и имя файла `styles.module.css`

4. **Для работы с текстом:**

   Никакого “голого” текста в JSX В компоненте: **Плохо:**

   `<Button>Войти</Button>`

   `<p>Нет аккаунта? Зарегистрироваться</p>`

   **Хорошо:**

   `*Button>{AUTH_LOGIN_TEXT.SUBMIT_BUTTON}</Button>`

   `<p> {AUTH_LOGIN_TEXT.NO_ACCOUNT_TEXT}</p>`

   Исключение: совсем технический/временный текст для отладки, который потом всё равно убирается.
   1. Константа живёт на минимально возможном слое

   Если текст используется только внутри одной фичи → константа в этой фиче. Если он нужен на нескольких страницах одной фичи → всё равно в этой фиче (например, общие подсказки auth). Если текст реально используют разные фичи → выносим в `shared/config/ui-texts.ts` или `shared/const/*.` Маркетинговые / уникальные тексты страниц → рядом со страницей (`pages/.../config/texts.ts`).
   1. **Имена констант** `UPPER_SNAKE_CASE` для полей или объект с ключами: объект уровня “блока” (`AUTH_LOGIN_TEXT`) + внутри осмысленные ключи (`TITLE, SUBMIT_BUTTON`) отображают смысл: `AUTH_LOGIN_TEXT.NO_ACCOUNT_TEXT`, а не TEXT_1, TEXT_2.
   2. **Подготовка к мультиязычности** Сейчас разрешено ограничиться константами с русским текстом, но ключи уже должны быть стабильными. Когда будет i18n‑библиотека: текущие объекты `AUTH_LOGIN_TEXT`, `LOGIN_PAGE_TEXT` легко превратить в словарь по языкам или перенести в JSON. Компоненты поменяются с `AUTH_LOGIN_TEXT.SUBMIT_BUTTON` → `t('auth.login.submit')`, но структура ключей уже будет понятна.

   **Итог** Shared: название приложения, слоган, общие UI‑фразы, кросс‑фичевые константы. Features: все тексты и валидационные сообщения, связанные с конкретной фичей (auth, profile и т.д.). Pages: тексты конкретной страницы и её лейаута (заголовки экранов, маркетинг). Правило для всех: никакого текста прямо в JSX — всегда через константы на “своём” слое.
