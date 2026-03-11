import { LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { MENU_LINK_TEXT } from '../locales';

import { MENU_LINKS } from './lib/constants';

import { Button } from '@/shared';
import { signOut } from '@/shared/api';
import { cn } from '@/shared/lib/utils';

interface MenuLinksProps {
  variant: 'desktop' | 'mobile';
  onNavigate?: () => void;
}

export const MenuLinks = ({ variant, onNavigate }: MenuLinksProps) => {
  const isDesktop = variant === 'desktop';
  const navClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center gap-2 rounded-md px-4 py-2 text-sm transition',
      isActive
        ? 'bg-sidebar-primary text-sidebar-primary-foreground'
        : 'text-white hover:bg-white/10'
    );
  const mobileLinkClass = 'px-4 py-3 flex items-center gap-2 hover:bg-white/10 transition-colors';

  const iconClass = isDesktop ? 'w-4 h-4' : 'w-5 h-5';
  const textClass = isDesktop ? 'hidden lg:inline' : '';

  return (
    <>
      {MENU_LINKS.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={isDesktop ? navClass : mobileLinkClass}
          onClick={onNavigate}
        >
          <Icon className={iconClass} />
          <span className={textClass}>{label}</span>
        </NavLink>
      ))}

      <Button
        type="button"
        variant="ghost"
        className={
          isDesktop
            ? 'flex items-center gap-2 text-white hover:bg-white/10'
            : 'px-4 py-3 flex items-center gap-2 text-red-400 hover:bg-white/10 justify-start'
        }
        onClick={() => {
          signOut();
          if (onNavigate) onNavigate();
        }}
      >
        <LogOut className={iconClass} />
        <span className={textClass}>{MENU_LINK_TEXT.LOGOUT}</span>
      </Button>
    </>
  );
};
