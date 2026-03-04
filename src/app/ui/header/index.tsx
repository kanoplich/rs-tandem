import { NavLink } from 'react-router-dom';

import { HEADER_LINK_TEXT } from './locales/locales';

import type { AuthUser as User } from '@/shared/api/auth/types';
import { ROUTES } from '@/shared/config/routes';

interface PrivateHeaderProps {
  user: User | null;
  signOut: () => Promise<void>;
}

export const Header = ({ user, signOut }: PrivateHeaderProps) => {
  return (
    <header>
      <nav>
        <NavLink to={ROUTES.DASHBOARD}>{HEADER_LINK_TEXT.DASHBOARD}</NavLink>
        <NavLink to={ROUTES.TOPICS}>{HEADER_LINK_TEXT.TOPICS}</NavLink>
        <NavLink to={ROUTES.HISTORY}>{HEADER_LINK_TEXT.HISTORY}</NavLink>
        <NavLink to={ROUTES.PROFILE}>{HEADER_LINK_TEXT.PROFILE}</NavLink>
      </nav>

      <div>
        <span>{user?.email}</span>
        <button onClick={signOut}>{HEADER_LINK_TEXT.EXIT}</button>
      </div>
    </header>
  );
};
