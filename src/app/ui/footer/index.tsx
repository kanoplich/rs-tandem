import { Github, ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { DEVELOPERS } from './lib/constants';
import { FOOTER_TEXTS } from './locales';

import { cn, HEADERS_TEXT } from '@/shared';
import { RsSchool } from '@/shared/assets/icons';

export const Footer = () => {
  const [showDevs, setShowDevs] = useState(false);

  return (
    <footer className="mt-auto border-t border-border bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 pt-12 sm:pt-14 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left space-y-2 max-w-md mx-auto md:mx-0">
            <h3 className="text-lg sm:text-xl font-semibold text-light tracking-wide">
              {HEADERS_TEXT.SITE_TITLE}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground">{FOOTER_TEXTS.DESCRIPTION}</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4 text-sm relative">
            <a
              href="https://rs.school/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 no-underline text-foreground transition-colors duration-300 hover:text-primary"
            >
              {FOOTER_TEXTS.POWERED_BY}
              <RsSchool className="h-8 w-auto shrink-0" />
            </a>
            <div
              className="relative flex flex-col items-center md:items-end"
              onMouseEnter={() => setShowDevs(true)}
              onMouseLeave={() => setShowDevs(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 cursor-pointer text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {FOOTER_TEXTS.DEVELOPERS_LABEL}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${showDevs ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className={cn(
                  'absolute bottom-full right-0 flex flex-col bg-popover border border-border rounded-lg shadow-xl',
                  'py-2 px-1 space-y-0.5 min-w-[180px] text-xs text-foreground z-50 transition-all duration-300 ease-out',
                  showDevs
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-2 pointer-events-none'
                )}
              >
                {DEVELOPERS.map((dev) => (
                  <a
                    key={dev.name}
                    href={dev.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-accent transition-colors"
                  >
                    <Github
                      size={14}
                      className="text-muted-foreground group-hover:text-primary transition-colors"
                    />
                    <span className="transition-colors">{dev.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="mt-6 flex justify-center items-center text-xs text-muted-foreground tracking-normal h-10">
          {FOOTER_TEXTS.COPYRIGHT}
        </div>
      </div>
    </footer>
  );
};
