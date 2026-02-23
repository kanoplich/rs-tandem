import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/config/routes';

export const NotFound = () => {
  return (
    <div>
      <h2>404 - Страница не найдена</h2>
      <Link to={ROUTES.LANDING}>Вернуться на главную</Link>
    </div>
  );
};
