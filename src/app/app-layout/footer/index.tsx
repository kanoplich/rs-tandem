import { useState } from 'react';

import { DEVELOPERS } from './constants/constants';

import { FOOTER_TEXTS } from '@/app/app-layout/footer/locales/locales';

export const Footer = () => {
  const [showDevs, setShowDevs] = useState(false);

  return (
    <footer className="mt-auto border-t border-border bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-14">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left space-y-2">
            <h3 className="text-lg sm:text-xl font-semibold text-light tracking-wide">
              Interview Training Platform
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto md:mx-0">
              {FOOTER_TEXTS.DESCRIPTION}
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4 text-sm relative">
            <a
              href="https://rs.school/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative no-underline text-foreground transition-colors duration-300 hover:text-primary
           after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0
           after:bg-primary hover:after:w-full"
            >
              {FOOTER_TEXTS.POWERED_BY}
            </a>

            <div
              className="relative flex flex-col items-center md:items-end"
              onMouseEnter={() => setShowDevs(true)}
              onMouseLeave={() => setShowDevs(false)}
            >
              <button
                type="button"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {FOOTER_TEXTS.DEVELOPERS_LABEL}
              </button>

              {showDevs && (
                <div
                  className="absolute mt-2 right-0 flex flex-col bg-card border border-border rounded-lg shadow-lg z-10
                             py-2 px-4 space-y-1 min-w-[160px] text-xs text-light"
                >
                  {DEVELOPERS.map((dev) => (
                    <a
                      key={dev.name}
                      href={dev.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-left hover:text-primary transition-colors duration-200"
                    >
                      {dev.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="mt-6 text-center text-xs text-muted-foreground tracking-wider">
          {FOOTER_TEXTS.COPYRIGHT}
        </div>
      </div>
    </footer>
  );
};
