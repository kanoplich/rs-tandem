import { LogOut } from 'lucide-react';
import { forwardRef } from 'react';
import { NavLink } from 'react-router-dom';

import { MENU_LINK_TEXT } from '../locales';

import { MENU_LINKS } from './lib/constants';

import { Button } from '@/shared';
import { signOut } from '@/shared/api';
import { cn } from '@/shared/lib/utils';

interface MenuLinksProps {
  variant: 'desktop' | 'mobile';
  mobileOpen: boolean;
  onNavigate?: () => void;
}

export const MenuLinks = forwardRef<HTMLDivElement, MenuLinksProps>(
  ({ variant, mobileOpen, onNavigate }, ref) => {
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
      <nav
        ref={ref}
        className={cn(
          'flex flex-col md:flex-row md:items-center md:gap-2 md:flex-wrap absolute md:static top-full right-4 mt-2 md:mt-0 w-56 md:w-auto bg-card md:bg-transparent border md:border-none border-white/10 rounded-lg md:rounded-none shadow-lg md:shadow-none overflow-hidden transition-all duration-300',
          mobileOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2 pointer-events-none md:opacity-100 md:translate-y-0 md:pointer-events-auto'
        )}
        aria-label="Navigation"
      >
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
      </nav>
    );
  }
);

MenuLinks.displayName = 'MenuLinks';
