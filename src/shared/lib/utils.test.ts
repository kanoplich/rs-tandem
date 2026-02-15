import { expect, test } from 'vitest';

import { cn } from './utils';

test('should merge css classes', () => {
  expect(cn('custom', 'active')).toBe('custom active');
});
