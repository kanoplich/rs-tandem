import { Outlet, NavLink } from 'react-router-dom';

import styles from '././protected-app-layout.module.css';

import { ROUTES } from '@/shared/config/routes';
import { useAuth } from '@/shared/hooks/use-auth';
import { HEADER_LINK_TEXT } from '@/shared/ui/i18n/header-form';

export const ProtectedAppLayout = () => {
  const { user, signOut } = useAuth();

  return (
    <div className={styles['container']}>
      <header className={styles['header']}>
        <nav className={styles['nav']}>
          <NavLink to={ROUTES.DASHBOARD}>{HEADER_LINK_TEXT.DASHBOARD}</NavLink>
          <NavLink to={ROUTES.TOPICS}>{HEADER_LINK_TEXT.TOPICS}</NavLink>
          <NavLink to={ROUTES.HISTORY}>{HEADER_LINK_TEXT.HISTORY}</NavLink>
          <NavLink to={ROUTES.PROFILE}>{HEADER_LINK_TEXT.PROFILE}</NavLink>
        </nav>

        <div className={styles['user-section']}>
          <span className={styles['user-mail']}>{user?.email}</span>
          <button onClick={signOut} className={styles['logout-button']}>
            {HEADER_LINK_TEXT.EXIT}
          </button>
        </div>
      </header>
      <main className={styles['main']}>
        <Outlet />
      </main>
    </div>
  );
};
