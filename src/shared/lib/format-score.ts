export const formatScore = (score: number): string => {
  const value = score / 10;
  return value % 1 === 0 ? String(value) : value.toFixed(1);
};
