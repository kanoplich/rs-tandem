import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { HEADER_LINKS } from './constants';
import { HEADER_LINK_TEXT } from './locales';

import { useAuth } from '@/shared/hooks/use-auth';

export const Header = () => {
  const auth = useAuth() as { signOut?: () => void };
  const [mobileOpen, setMobileOpen] = useState(false);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 rounded-md px-3 lg:px-4 py-2 text-sm transition
     ${
       isActive
         ? 'bg-sidebar-primary text-sidebar-primary-foreground'
         : 'text-white hover:bg-white/10'
     }`;

  return (
    <header className="bg-card px-4 sm:px-6 py-3 flex items-center justify-between relative z-50 shadow-md">
      <h1 className="text-white text-lg lg:text-xl font-semibold whitespace-nowrap">
        {HEADER_LINK_TEXT.APP_TITLE}
      </h1>

      <nav className="hidden md:flex items-center gap-1 lg:gap-2 flex-wrap">
        {HEADER_LINKS.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={navClass}>
            <Icon className="w-4 h-4" />
            <span className="hidden lg:inline">{label}</span>
          </NavLink>
        ))}

        <button
          onClick={() => auth.signOut?.()}
          className="flex items-center gap-2 px-3 lg:px-4 py-2 text-white hover:bg-white/10 rounded-md"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden lg:inline">{HEADER_LINK_TEXT.LOGOUT}</span>
        </button>
      </nav>

      <button
        className="md:hidden text-white p-2 rounded-md hover:bg-white/10"
        onClick={() => setMobileOpen((prev) => !prev)}
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <nav
        className={`absolute top-full right-4 mt-2 w-56 bg-card border border-white/10 rounded-lg shadow-lg flex flex-col md:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        {HEADER_LINKS.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className="px-4 py-3 flex gap-2 items-center hover:bg-white/10">
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}

        <button
          onClick={() => auth.signOut?.()}
          className="px-4 py-3 flex gap-2 items-center text-red-400 hover:bg-white/10"
        >
          <LogOut className="w-5 h-5" />
          {HEADER_LINK_TEXT.LOGOUT}
        </button>
      </nav>
    </header>
  );
};
