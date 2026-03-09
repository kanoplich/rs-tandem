import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { MENU_LINKS } from './constants';
import { MENU_LINK_TEXT } from './locales/locales';

import { Button } from '@/shared';
import { signOut } from '@/shared/api';
import { cn } from '@/shared/lib/utils';

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center gap-2 rounded-md px-4 py-2 text-sm transition',
      isActive
        ? 'bg-sidebar-primary text-sidebar-primary-foreground'
        : 'text-white hover:bg-white/10'
    );

  return (
    <header className="bg-card px-4 sm:px-6 py-3 flex items-center justify-between relative z-50 shadow-md">
      <h1 className="text-white text-lg lg:text-xl font-semibold whitespace-nowrap">
        {MENU_LINK_TEXT.APP_TITLE}
      </h1>

      <nav className="hidden md:flex items-center gap-2 flex-wrap">
        {MENU_LINKS.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={navClass}>
            <Icon className="w-4 h-4" />
            <span className="hidden lg:inline">{label}</span>
          </NavLink>
        ))}

        <Button
          variant="ghost"
          className="flex items-center gap-2 text-white hover:bg-white/10"
          onClick={signOut}
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden lg:inline">{MENU_LINK_TEXT.LOGOUT}</span>
        </Button>
      </nav>

      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-white hover:bg-white/10"
        onClick={() => setMobileOpen((prev) => !prev)}
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      <nav
        className={cn(
          'absolute top-full right-4 mt-2 w-56 bg-card border border-white/10 rounded-lg shadow-lg flex flex-col md:hidden overflow-hidden transition-all duration-300',
          mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        )}
      >
        {MENU_LINKS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className="px-4 py-3 flex items-center gap-2 hover:bg-white/10 transition-colors"
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </NavLink>
        ))}

        <Button
          variant="ghost"
          className="px-4 py-3 flex items-center gap-2 text-red-400 hover:bg-white/10 justify-start"
          onClick={signOut}
        >
          <LogOut className="w-5 h-5" />
          <span>{MENU_LINK_TEXT.LOGOUT}</span>
        </Button>
      </nav>
    </header>
  );
};
