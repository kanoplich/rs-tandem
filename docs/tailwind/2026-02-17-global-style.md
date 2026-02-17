# Документация Tailwind CSS

## Общая информация

В этой папке описаны все глобальные стили Tailwind CSS и переменные темы, используемые в проекте.  
Это включает базовые цвета, радиусы, фокусные кольца и стили для компонентов (кнопки, сайдбар и др.).

## Переменные

### Цвета

- `--primary` / `--primary-foreground` — основной цвет интерфейса и цвет текста на нём
- `--secondary` / `--secondary-foreground` — второстепенные элементы
- `--accent` / `--accent-foreground` — акцентные элементы
- `--destructive` — для ошибок
- `--success` / `--success-foreground` — для успешных действий
- `--light` / `--light-foreground` — светлая тема текста и фона
- `--muted` / `--muted-foreground` — приглушённые цвета для вспомогательных элементов
- `--border` — стандартные границы
- `--input` — фон инпутов
- `--ring` — цвет фокусного кольца для инпутов и кнопок

### Сайдбар

- `--sidebar` — основной фон сайдбара
- `--sidebar-foreground` — цвет текста сайдбара
- `--sidebar-primary` / `--sidebar-primary-foreground` — основной активный элемент
- `--sidebar-accent` / `--sidebar-accent-foreground` — акцентные элементы
- `--sidebar-border` — границы сайдбара
- `--sidebar-ring` — фокусное кольцо для элементов сайдбара

### Чарты

- `--chart-1` … `--chart-5` — цвета для графиков и диаграмм

### Радиусы

- `--radius` — основной радиус скругления
- `--radius-sm`, `--radius-md`, `--radius-lg` … — дополнительные варианты для компонентов

## Использование

1. Компоненты используют эти переменные через Tailwind классы.
2. Пример использования на элементе сайдбара:

<div className="sidebar-item p-2 rounded bg-[var(--sidebar-primary)] text-[var(--sidebar-primary-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--sidebar-ring)]">
  Активный элемент
</div>
