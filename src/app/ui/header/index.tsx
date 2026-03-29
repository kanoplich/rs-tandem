import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { MENU_LINK_TEXT } from './locales';
import { MenuLinks } from './ui/menu-links';

import { Button, ROUTES } from '@/shared';
import { LogoIcon } from '@/shared/assets/icons';

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = () => setMobileOpen(false);

  return (
    <header className="bg-card px-4 sm:px-6 py-3 lg:py-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
      <Link
        to={ROUTES.DASHBOARD}
        className="flex items-center gap-2 text-light text-lg lg:text-xl font-semibold whitespace-nowrap"
      >
        <LogoIcon className="w-6 h-6" />
        <span>{MENU_LINK_TEXT.APP_TITLE}</span>
      </Link>

      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-light hover:bg-accent"
        onClick={() => setMobileOpen((prev) => !prev)}
        aria-label="navigation menu"
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      <MenuLinks
        variant={window.innerWidth >= 768 ? 'desktop' : 'mobile'}
        mobileOpen={mobileOpen}
        onNavigate={handleNavigate}
      />
    </header>
  );
};
