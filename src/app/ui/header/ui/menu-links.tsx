import { LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { MENU_LINK_TEXT } from '../locales';

import { MENU_LINKS } from './lib/constants';

import { ModeToggle } from '@/features/theme';
import { Button, cn } from '@/shared';
import { signOut } from '@/shared/api';

interface MenuLinksProps {
  variant: 'desktop' | 'mobile';
  mobileOpen?: boolean;
  onNavigate?: () => void;
}

export const MenuLinks = ({ variant, mobileOpen, onNavigate }: MenuLinksProps) => {
  const isDesktop = variant === 'desktop';

  const navClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center gap-2 rounded-md px-4 py-2 text-sm transition',
      isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-light hover:bg-accent'
    );

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'px-3 py-2 flex items-center gap-2 text-sm transition-colors',
      isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-light hover:bg-accent'
    );

  const iconClass = isDesktop ? 'w-4 h-4' : 'w-5 h-5';
  const textClass = isDesktop ? 'hidden lg:inline' : '';

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
    onNavigate?.();
  };

  const baseNav = 'flex flex-col md:flex-row md:items-center md:gap-2 md:flex-wrap';
  const mobileNav =
    'absolute top-full right-4 mt-2 w-56 bg-card border border-white/10 rounded-lg shadow-lg';
  const desktopNav =
    'md:static md:mt-0 md:w-auto md:bg-transparent md:border-none md:rounded-none md:shadow-none';
  const animation = 'overflow-hidden transition-all duration-300';

  const openState = mobileOpen
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 -translate-y-2 pointer-events-none md:opacity-100 md:translate-y-0 md:pointer-events-auto';

  return (
    <nav
      className={cn(baseNav, mobileNav, desktopNav, animation, openState)}
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

      <div
        className={cn(
          'flex items-center',
          isDesktop ? 'ml-2' : 'px-4 py-2 border-t border-border mt-1 justify-between'
        )}
      >
        {!isDesktop && <span className="text-sm text-light/60"></span>}
        <ModeToggle />
      </div>

      <Button
        type="button"
        variant="ghost"
        className={
          isDesktop
            ? 'flex items-center gap-2 text-light hover:bg-accent'
            : 'px-4 py-3 flex items-center gap-2 text-destructive hover:bg-accent justify-start'
        }
        onClick={handleLogout}
      >
        <LogOut className={iconClass} />
        <span className={textClass}>{MENU_LINK_TEXT.LOGOUT}</span>
      </Button>
    </nav>
  );
};

MenuLinks.displayName = 'MenuLinks';
