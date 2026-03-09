import type { Topic } from './types';

export const MOCK_TOPICS: Topic[] = [
  {
    id: 'closures',
    title: 'Closures',
    description: 'Лексическое окружение, замыкания, IIFE',
    icon: '🔒',
    taskCount: 3,
    stage: 1,
  },
  {
    id: 'types-coercion',
    title: 'Types & Coercion',
    description: 'Примитивы, приведение типов, typeof vs instanceof',
    icon: '🔄',
    taskCount: 3,
    stage: 1,
  },
  {
    id: 'event-loop',
    title: 'Event Loop',
    description: 'Call stack, microtasks, macrotasks, Promise vs setTimeout',
    icon: '⚙️',
    taskCount: 3,
    stage: 1,
  },

  {
    id: 'prototypes',
    title: 'Prototypes & OOP',
    description: 'Прототипная цепочка, классы, наследование',
    icon: '🧬',
    taskCount: 3,
    stage: 2,
  },
  {
    id: 'async',
    title: 'Async JavaScript',
    description: 'Callbacks, Promises, async/await, параллельность',
    icon: '⏳',
    taskCount: 3,
    stage: 2,
  },
  {
    id: 'typescript-basics',
    title: 'TypeScript Basics',
    description: 'Типы, интерфейсы, generics, narrowing',
    icon: '🟦',
    taskCount: 3,
    stage: 2,
  },

  {
    id: 'algorithms',
    title: 'Algorithms',
    description: 'Сортировки, бинарный поиск, сложность O(n)',
    icon: '📊',
    taskCount: 3,
    stage: 3,
  },
  {
    id: 'data-structures',
    title: 'Data Structures',
    description: 'Stack, Queue, Linked List, Hash Map',
    icon: '🗂️',
    taskCount: 3,
    stage: 3,
  },
  {
    id: 'patterns',
    title: 'Design Patterns',
    description: 'Observer, Singleton, Factory, Strategy',
    icon: '🏗️',
    taskCount: 3,
    stage: 3,
  },
];
