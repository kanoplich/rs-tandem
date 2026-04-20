import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export const useError = (): Error | null => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return new Error(`${error.status} ${error.statusText}`);
  }

  return error instanceof Error ? error : null;
};
