import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import './ReadyToStart.css';
import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';

export function ReadyToStart() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.length === 0 || !entries[0]?.isIntersecting) return;
        el.classList.add('visible');
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-12 sm:py-16 lg:py-24 flex justify-center overflow-x-hidden">
      <div className="w-full flex justify-center">
        <div
          ref={ref}
          className="ready-card flex flex-col items-center bg-secondary/45 w-[1240px] h-[480px] gap-5 py-13 scale-[0.85] sm:scale-[0.95] lg:scale-100 origin-top"
        >
          <img src="/images/Image Speakers.png" alt="RS School interview" className="w-48 h-48" />

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            Готовы начать?
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground text-center w-[672px] h-14">
            Присоединяйтесь к тысячам студентов RS School, которые успешно готовятся к техническим
            интервью
          </p>

          <Button asChild className="mt-4 px-10 py-6 text-base sm:text-lg">
            <Link to={ROUTES.REGISTER}>Зарегистрироваться сейчас</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
