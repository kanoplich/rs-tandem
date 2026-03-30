export const buildTools = (rubricItems: string[]) => {
  const properties: Record<string, { type: string; enum: number[]; description: string }> = {};

  for (const item of rubricItems) {
    properties[item] = {
      type: 'integer',
      enum: [0, 1, 2],
      description: `Score: 0 = not addressed, 1 = partial, 2 = full`,
    };
  }

  return [
    {
      type: 'function',
      function: {
        name: 'saveSubmission',
        description:
          'Save evaluation scores. Each parameter is a rubric point that must be scored 0, 1, or 2.',
        parameters: {
          type: 'object',
          properties,
          required: rubricItems,
        },
      },
    },
  ];
};
