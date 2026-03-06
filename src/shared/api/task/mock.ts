import { type Task } from './types';

export const MOCK_TASKS: Task[] = [
  {
    id: 'closures-1',
    topicId: 'closures',
    type: 'theory_open',
    difficulty: 2,
    title: 'Что такое замыкание?',
    questionText:
      'Объясните концепцию замыкания в JavaScript. Что происходит с переменными внешней функции после её выполнения?',
    rubricItems: [
      'Упомянул лексическое окружение',
      'Объяснил сохранение переменных во внешней области видимости',
      'Привёл корректный пример кода',
    ],
    maxScore: 100,
  },
  {
    id: 'closures-2',
    topicId: 'closures',
    type: 'theory_choice',
    difficulty: 1,
    title: 'Замыкание в цикле',
    questionText:
      'Что выведет следующий код?\n```js\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}\n```\n\nA) 0 1 2  \nB) 3 3 3  \nC) undefined undefined undefined  \nD) 0 0 0',
    rubricItems: ['Правильный ответ: B', 'Объяснение причины (var + замыкание)'],
    maxScore: 100,
  },
  {
    id: 'closures-3',
    topicId: 'closures',
    type: 'coding',
    difficulty: 3,
    title: 'Счётчик с замыканием',
    questionText:
      'Напишите функцию `makeCounter()`, которая возвращает объект с методами `increment()`, `decrement()` и `getCount()`. Внутреннее состояние должно быть скрыто (замыкание).',
    codeTemplate:
      'function makeCounter() {\n  // твой код\n}\n\nconst counter = makeCounter();\ncounter.increment();\ncounter.increment();\ncounter.decrement();\nconsole.log(counter.getCount()); // 1',
    testCode:
      'const c = makeCounter();\nassert(c.getCount() === 0);\nc.increment();\nc.increment();\nassert(c.getCount() === 2);\nc.decrement();\nassert(c.getCount() === 1);',
    rubricItems: [
      'Функция возвращает объект с тремя методами',
      'Состояние не доступно снаружи (нет прямого обращения к переменной)',
      'Все тесты проходят',
    ],
    maxScore: 100,
  },

  {
    id: 'event-loop-1',
    topicId: 'event-loop',
    type: 'theory_open',
    difficulty: 3,
    title: 'Порядок выполнения промисов',
    questionText:
      'Объясните разницу между микрозадачами (microtasks) и макрозадачами (macrotasks). В каком порядке они выполняются относительно друг друга?',
    rubricItems: [
      'Упомянул call stack',
      'Корректно описал очередь микрозадач (Promise.then, queueMicrotask)',
      'Корректно описал очередь макрозадач (setTimeout, setInterval)',
      'Правильный порядок: call stack → microtasks → macrotasks',
    ],
    maxScore: 100,
  },
  {
    id: 'event-loop-2',
    topicId: 'event-loop',
    type: 'theory_choice',
    difficulty: 2,
    title: 'Что выведет сначала?',
    questionText:
      "Что выведет код?\n```js\nsetTimeout(() => console.log('A'), 0);\nPromise.resolve().then(() => console.log('B'));\nconsole.log('C');\n```\n\nA) C B A  \nB) A B C  \nC) C A B  \nD) B C A",
    rubricItems: ['Правильный ответ: A', 'Объяснение порядка выполнения'],
    maxScore: 100,
  },
  {
    id: 'event-loop-3',
    topicId: 'event-loop',
    type: 'coding',
    difficulty: 4,
    title: 'Асинхронная очередь задач',
    questionText:
      'Реализуй функцию `delay(ms)`, которая возвращает Promise, резолвящийся через указанное количество миллисекунд.',
    codeTemplate:
      "function delay(ms) {\n  // твой код\n}\n\n// Использование:\ndelay(1000).then(() => console.log('Done!'));",
    testCode:
      'const start = Date.now();\nawait delay(100);\nconst elapsed = Date.now() - start;\nassert(elapsed >= 90 && elapsed < 200);',
    rubricItems: ['Возвращает Promise', 'Использует setTimeout внутри', 'Тест на время проходит'],
    maxScore: 100,
  },

  {
    id: 'async-1',
    topicId: 'async',
    type: 'theory_open',
    difficulty: 3,
    title: 'Promise.all vs Promise.allSettled',
    questionText:
      'В чём разница между `Promise.all` и `Promise.allSettled`? Когда использовать каждый из них?',
    rubricItems: [
      'Promise.all — упадёт при первой rejected',
      'Promise.allSettled — ждёт все промисы и возвращает статусы',
      'Привёл пример использования каждого',
    ],
    maxScore: 100,
  },
  {
    id: 'async-2',
    topicId: 'async',
    type: 'coding',
    difficulty: 4,
    title: 'Параллельные запросы',
    questionText:
      'Напиши функцию `fetchAll(urls)`, которая принимает массив URL, делает запросы параллельно и возвращает массив результатов. Если хотя бы один запрос падает — вернуть ошибку.',
    codeTemplate: 'async function fetchAll(urls) {\n  // твой код\n}\n',
    testCode:
      "const results = await fetchAll(['https://api.example.com/1', 'https://api.example.com/2']);\nassert(Array.isArray(results));\nassert(results.length === 2);",
    rubricItems: [
      'Использует Promise.all',
      'Запросы идут параллельно, а не последовательно',
      'Возвращает массив результатов',
    ],
    maxScore: 100,
  },
];
