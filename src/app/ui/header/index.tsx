import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { MENU_LINK_TEXT } from './locales';
import { HeaderNav } from './ui/menu-links';

import { Button, ROUTES } from '@/shared';
import { LogoIcon } from '@/shared/assets/icons';
import { cn } from '@/shared/lib/utils';

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = () => setMobileOpen(false);

  return (
    <header className="bg-card px-4 sm:px-6 py-3 flex items-center justify-between relative z-50 shadow-md">
      <Link
        to={ROUTES.DASHBOARD}
        className="flex items-center gap-2 text-white text-lg lg:text-xl font-semibold whitespace-nowrap"
      >
        <LogoIcon className="w-6 h-6" />
        <span>{MENU_LINK_TEXT.APP_TITLE}</span>
      </Link>

      <nav className="hidden md:flex items-center gap-2 flex-wrap">
        <HeaderNav variant="desktop" />
      </nav>

      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-white hover:bg-white/10"
        onClick={() => setMobileOpen((prev) => !prev)}
        aria-label="navigation menu"
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      <nav
        className={cn(
          'absolute top-full right-4 mt-2 w-56 bg-card border border-white/10 rounded-lg shadow-lg flex flex-col md:hidden overflow-hidden transition-all duration-300',
          mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        )}
        aria-label="Mobile navigation"
      >
        <HeaderNav variant="mobile" onNavigate={handleNavigate} />
      </nav>
    </header>
  );
};
