import { ErrorFallback } from './error-fallback';
import { useError } from './use-error';

export const RouteErrorBoundary = () => {
  const error = useError();
  return <ErrorFallback error={error} />;
};
