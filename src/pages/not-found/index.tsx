import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared';

export const NotFound = () => {
  return (
    <div>
      <h2>404 - Страница не найдена</h2>
      <Link to={ROUTES.HOME}>Вернуться на главную</Link>
    </div>
  );
};
