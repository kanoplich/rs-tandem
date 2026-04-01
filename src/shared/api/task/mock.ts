import { type Task } from './types';

export const MOCK_TASKS: Task[] = [
  {
    id: 'closures-1',
    topicId: 'closures',
    type: 'theory_open',
    stage: 2,
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
    stage: 1,
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
    stage: 3,
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
    stage: 3,
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
    stage: 2,
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
    stage: 3,
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
    stage: 3,
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
    type: 'theory_choice',
    stage: 2,
    difficulty: 2,
    title: 'Результат await на rejected',
    questionText:
      'Что произойдёт при выполнении?\n```js\nasync function foo() {\n  const result = await Promise.reject("error");\n  console.log(result);\n}\nfoo();\n```\n\nA) Выведет "error"\nB) Выведет undefined\nC) Будет Unhandled Promise Rejection\nD) Бесконечный цикл',
    rubricItems: ['Правильный ответ: C', 'Объяснение: await пробросит rejected как исключение'],
    maxScore: 100,
  },
  {
    id: 'async-3',
    topicId: 'async',
    type: 'coding',
    stage: 3,
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

  // --- Types & Coercion ---
  {
    id: 'types-coercion-1',
    topicId: 'types-coercion',
    type: 'theory_open',
    stage: 2,
    difficulty: 2,
    title: 'Явное и неявное приведение типов',
    questionText:
      'Объясните разницу между явным (explicit) и неявным (implicit) приведением типов в JavaScript. Приведите примеры каждого.',
    rubricItems: [
      'Описал явное приведение: Number(), String(), Boolean()',
      'Описал неявное приведение: +, ==, if()',
      'Привёл корректные примеры',
    ],
    maxScore: 100,
  },
  {
    id: 'types-coercion-2',
    topicId: 'types-coercion',
    type: 'theory_choice',
    stage: 1,
    difficulty: 1,
    title: 'typeof null',
    questionText:
      'Что вернёт выражение `typeof null`?\n\nA) "null"\nB) "undefined"\nC) "object"\nD) "number"',
    rubricItems: ['Правильный ответ: C', 'Объяснение: историческая ошибка в спецификации'],
    maxScore: 100,
  },
  {
    id: 'types-coercion-3',
    topicId: 'types-coercion',
    type: 'coding',
    stage: 3,
    difficulty: 3,
    title: 'Строгое сравнение',
    questionText:
      'Напишите функцию `strictEquals(a, b)`, которая реализует поведение оператора `===` без использования самого `===` или `==`. Учтите NaN и +0/-0.',
    codeTemplate: 'function strictEquals(a, b) {\n  // твой код\n}\n',
    testCode:
      'assert(strictEquals(1, 1) === true);\nassert(strictEquals(NaN, NaN) === false);\nassert(strictEquals(0, -0) === true);\nassert(strictEquals("1", 1) === false);',
    rubricItems: [
      'Обрабатывает NaN (NaN !== NaN)',
      'Обрабатывает +0/-0',
      'Не использует == или ===',
    ],
    maxScore: 100,
  },

  // --- Prototypes & OOP ---
  {
    id: 'prototypes-1',
    topicId: 'prototypes',
    type: 'theory_open',
    stage: 3,
    difficulty: 3,
    title: 'Прототипная цепочка',
    questionText:
      'Объясните, как работает прототипная цепочка в JavaScript. Что происходит при обращении к свойству, которого нет у объекта?',
    rubricItems: [
      'Описал __proto__ / Object.getPrototypeOf()',
      'Объяснил поиск свойства вверх по цепочке',
      'Упомянул Object.prototype как конец цепочки (null)',
    ],
    maxScore: 100,
  },
  {
    id: 'prototypes-2',
    topicId: 'prototypes',
    type: 'theory_choice',
    stage: 2,
    difficulty: 2,
    title: 'instanceof vs typeof',
    questionText:
      'Что вернёт код?\n```js\nconst arr = [1, 2, 3];\nconsole.log(typeof arr);\nconsole.log(arr instanceof Array);\n```\n\nA) "array", true\nB) "object", true\nC) "object", false\nD) "array", false',
    rubricItems: ['Правильный ответ: B', 'Объяснение: typeof для массива возвращает "object"'],
    maxScore: 100,
  },
  {
    id: 'prototypes-3',
    topicId: 'prototypes',
    type: 'coding',
    stage: 3,
    difficulty: 4,
    title: 'Наследование через классы',
    questionText:
      'Создайте класс `Animal` с методом `speak()`, и класс `Dog`, который наследует `Animal` и переопределяет `speak()`, возвращая "Woof!". Вызов `super.speak()` должен возвращать "...".',
    codeTemplate:
      'class Animal {\n  // твой код\n}\n\nclass Dog extends Animal {\n  // твой код\n}\n\nconst dog = new Dog();\nconsole.log(dog.speak()); // "Woof!"',
    testCode:
      'const a = new Animal();\nassert(a.speak() === "...");\nconst d = new Dog();\nassert(d.speak() === "Woof!");\nassert(d instanceof Animal);',
    rubricItems: [
      'Animal.speak() возвращает "..."',
      'Dog наследует Animal через extends',
      'Dog.speak() возвращает "Woof!"',
    ],
    maxScore: 100,
  },

  // --- TypeScript Basics ---
  {
    id: 'typescript-basics-1',
    topicId: 'typescript-basics',
    type: 'theory_open',
    stage: 2,
    difficulty: 2,
    title: 'Interface vs Type',
    questionText:
      'В чём различия между `interface` и `type` в TypeScript? Когда лучше использовать каждый из них?',
    rubricItems: [
      'Interface поддерживает declaration merging',
      'Type поддерживает union и intersection типы',
      'Привёл практические примеры использования',
    ],
    maxScore: 100,
  },
  {
    id: 'typescript-basics-2',
    topicId: 'typescript-basics',
    type: 'theory_choice',
    stage: 1,
    difficulty: 1,
    title: 'Narrowing типов',
    questionText:
      'Какой тип будет у `x` внутри блока if?\n```ts\nfunction foo(x: string | number) {\n  if (typeof x === "string") {\n    // тип x здесь?\n  }\n}\n```\n\nA) string | number\nB) string\nC) number\nD) unknown',
    rubricItems: ['Правильный ответ: B', 'Объяснение: typeof guard сужает тип'],
    maxScore: 100,
  },
  {
    id: 'typescript-basics-3',
    topicId: 'typescript-basics',
    type: 'coding',
    stage: 3,
    difficulty: 3,
    title: 'Generic-функция filter',
    questionText:
      'Напишите generic-функцию `filterByKey<T>(arr: T[], key: keyof T, value: T[keyof T]): T[]`, которая фильтрует массив объектов по значению указанного ключа.',
    codeTemplate:
      'function filterByKey<T>(arr: T[], key: keyof T, value: T[keyof T]): T[] {\n  // твой код\n}\n',
    testCode:
      'const users = [{name: "Alice", age: 25}, {name: "Bob", age: 30}];\nconst result = filterByKey(users, "age", 25);\nassert(result.length === 1);\nassert(result[0].name === "Alice");',
    rubricItems: [
      'Корректная generic-сигнатура',
      'Фильтрует по ключу и значению',
      'Тесты проходят',
    ],
    maxScore: 100,
  },

  // --- Algorithms ---
  {
    id: 'algorithms-1',
    topicId: 'algorithms',
    type: 'theory_open',
    stage: 2,
    difficulty: 2,
    title: 'O(n) vs O(n log n)',
    questionText:
      'Объясните разницу между сложностью O(n) и O(n log n). Приведите пример алгоритма для каждой сложности.',
    rubricItems: [
      'Корректно описал линейную сложность O(n)',
      'Корректно описал O(n log n) (например, mergesort)',
      'Привёл примеры алгоритмов',
    ],
    maxScore: 100,
  },
  {
    id: 'algorithms-2',
    topicId: 'algorithms',
    type: 'theory_choice',
    stage: 1,
    difficulty: 1,
    title: 'Сложность бинарного поиска',
    questionText:
      'Какова временная сложность бинарного поиска в отсортированном массиве?\n\nA) O(1)\nB) O(n)\nC) O(log n)\nD) O(n log n)',
    rubricItems: ['Правильный ответ: C', 'Объяснение: массив делится пополам на каждом шаге'],
    maxScore: 100,
  },
  {
    id: 'algorithms-3',
    topicId: 'algorithms',
    type: 'coding',
    stage: 3,
    difficulty: 3,
    title: 'Бинарный поиск',
    questionText:
      'Реализуйте функцию `binarySearch(arr, target)`, которая возвращает индекс элемента в отсортированном массиве или -1, если элемент не найден.',
    codeTemplate: 'function binarySearch(arr, target) {\n  // твой код\n}\n',
    testCode:
      'assert(binarySearch([1, 3, 5, 7, 9], 5) === 2);\nassert(binarySearch([1, 3, 5, 7, 9], 4) === -1);\nassert(binarySearch([], 1) === -1);',
    rubricItems: [
      'Использует деление массива пополам',
      'Корректно обрабатывает пустой массив',
      'Возвращает -1 при отсутствии элемента',
    ],
    maxScore: 100,
  },

  // --- Data Structures ---
  {
    id: 'data-structures-1',
    topicId: 'data-structures',
    type: 'theory_open',
    stage: 2,
    difficulty: 2,
    title: 'Stack vs Queue',
    questionText:
      'Объясните разницу между Stack и Queue. Какие операции поддерживает каждая структура и какова их сложность?',
    rubricItems: [
      'Stack: LIFO, push/pop — O(1)',
      'Queue: FIFO, enqueue/dequeue — O(1)',
      'Привёл практический пример использования',
    ],
    maxScore: 100,
  },
  {
    id: 'data-structures-2',
    topicId: 'data-structures',
    type: 'theory_choice',
    stage: 1,
    difficulty: 1,
    title: 'Сложность поиска в Hash Map',
    questionText:
      'Какова средняя временная сложность поиска элемента в Hash Map?\n\nA) O(n)\nB) O(log n)\nC) O(1)\nD) O(n log n)',
    rubricItems: ['Правильный ответ: C', 'Объяснение: прямой доступ по хешу ключа'],
    maxScore: 100,
  },
  {
    id: 'data-structures-3',
    topicId: 'data-structures',
    type: 'coding',
    stage: 3,
    difficulty: 4,
    title: 'Реализация Stack',
    questionText:
      'Реализуйте класс `Stack` с методами `push(item)`, `pop()`, `peek()` и `isEmpty()`. Не используйте встроенные методы массива кроме доступа по индексу.',
    codeTemplate:
      'class Stack {\n  constructor() {\n    // твой код\n  }\n  push(item) {}\n  pop() {}\n  peek() {}\n  isEmpty() {}\n}\n',
    testCode:
      'const s = new Stack();\nassert(s.isEmpty() === true);\ns.push(1);\ns.push(2);\nassert(s.peek() === 2);\nassert(s.pop() === 2);\nassert(s.pop() === 1);\nassert(s.isEmpty() === true);',
    rubricItems: [
      'push и pop работают по LIFO',
      'peek не удаляет элемент',
      'isEmpty корректно отражает состояние',
    ],
    maxScore: 100,
  },

  // --- Design Patterns ---
  {
    id: 'patterns-1',
    topicId: 'patterns',
    type: 'theory_open',
    stage: 3,
    difficulty: 3,
    title: 'Паттерн Observer',
    questionText:
      'Опишите паттерн Observer (Наблюдатель). Где он используется в JavaScript/браузере?',
    rubricItems: [
      'Описал суть: подписка на события, уведомление подписчиков',
      'Упомянул примеры: addEventListener, EventEmitter, RxJS',
      'Описал интерфейс: subscribe/unsubscribe/notify',
    ],
    maxScore: 100,
  },
  {
    id: 'patterns-2',
    topicId: 'patterns',
    type: 'theory_choice',
    stage: 2,
    difficulty: 2,
    title: 'Какой это паттерн?',
    questionText:
      'Какой паттерн реализован?\n```js\nclass DB {\n  static instance = null;\n  static getInstance() {\n    if (!DB.instance) DB.instance = new DB();\n    return DB.instance;\n  }\n}\n```\n\nA) Factory\nB) Observer\nC) Singleton\nD) Strategy',
    rubricItems: ['Правильный ответ: C', 'Объяснение: один экземпляр на всё приложение'],
    maxScore: 100,
  },
  {
    id: 'patterns-3',
    topicId: 'patterns',
    type: 'coding',
    stage: 3,
    difficulty: 4,
    title: 'EventEmitter',
    questionText:
      'Реализуйте класс `EventEmitter` с методами `on(event, callback)`, `off(event, callback)` и `emit(event, ...args)`.',
    codeTemplate:
      'class EventEmitter {\n  constructor() {\n    // твой код\n  }\n  on(event, cb) {}\n  off(event, cb) {}\n  emit(event, ...args) {}\n}\n',
    testCode:
      'const ee = new EventEmitter();\nlet result = 0;\nconst fn = (x) => { result += x; };\nee.on("add", fn);\nee.emit("add", 5);\nassert(result === 5);\nee.off("add", fn);\nee.emit("add", 10);\nassert(result === 5);',
    rubricItems: [
      'on добавляет обработчик',
      'off удаляет конкретный обработчик',
      'emit вызывает все обработчики с аргументами',
    ],
    maxScore: 100,
  },
];
