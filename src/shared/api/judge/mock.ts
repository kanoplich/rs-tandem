import type { JudgeResult } from './types';

export const MOCK_JUDGE_RESULT_GOOD: ReadableStreamDefaultReader = (() => {
  const encoder = new TextEncoder();

  const text =
    'Отличное теоретическое объяснение! ' +
    'Ты правильно описал лексическое окружение и механизм сохранения переменных. ' +
    'Для полного балла добавь конкретный пример кода.';

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(text));
      controller.close();
    },
  });

  return stream.getReader();
})();

export const MOCK_JUDGE_RESULT_POOR: JudgeResult = {
  score: 30,
  maxScore: 100,
  coveredPoints: ['Упомянул лексическое окружение'],
  missedPoints: [
    'Объяснил сохранение переменных во внешней области видимости',
    'Привёл корректный пример кода',
  ],
  feedback:
    'Ты двигаешься в правильном направлении — ты упомянул лексическое окружение. Но объяснение неполное. Попробуй написать функцию, которая возвращает другую функцию, и объясни, как внутренняя функция обращается к переменным внешней.',
  judgeLevel: 0,
};
