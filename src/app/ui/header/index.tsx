import { Menu, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { MENU_LINK_TEXT } from './locales';
import { MenuLinks } from './ui/menu-links';

import { Button, ROUTES } from '@/shared';
import { LogoIcon } from '@/shared/assets/icons';

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleNavigate = () => setMobileOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileOpen]);

  return (
    <header className="bg-card px-4 sm:px-6 py-3 lg:py-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
      <Link
        to={ROUTES.DASHBOARD}
        className="flex items-center gap-2 text-white text-lg lg:text-xl font-semibold whitespace-nowrap"
      >
        <LogoIcon className="w-6 h-6" />
        <span>{MENU_LINK_TEXT.APP_TITLE}</span>
      </Link>

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

      <MenuLinks
        ref={menuRef}
        variant={mobileOpen ? 'mobile' : 'desktop'}
        mobileOpen={mobileOpen}
        onNavigate={handleNavigate}
      />
    </header>
  );
};
