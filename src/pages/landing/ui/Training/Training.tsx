import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import './Training.css';
import { ROUTES } from '@/shared/config/routes';
import robotIcon from '@/shared/icons/icons8-ai-chatting.svg';
import { Button } from '@/shared/ui/button';

const stats = [
  { value: '1000+', label: 'Студентов' },
  { value: '37', label: 'Тем' },
  { value: '3', label: 'Этапа' },
];

export function Training() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animatedElements = entry.target.querySelectorAll(
              '.animate-fade-up, .animate-fade-in, .stat-item, .success-badge'
            );
            animatedElements.forEach((el) => {
              el.classList.add('visible');
            });
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -80px 0px',
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 lg:py-28 overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16 xl:gap-20">
          <div className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2 xl:w-[55%] text-center lg:text-left animate-fade-up">
            <div className="flex flex-col gap-5 lg:gap-6">
              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold leading-tight flex flex-col sm:flex-col md:flex-row  items-center md:items-start">
                <img
                  src={robotIcon}
                  alt="AI Robot"
                  className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 opacity-90 mb-2 sm:mb-4 md:mb-0 md:mr-4 order-1 sm:order-1 md:order-0"
                />

                <span className="text-center md:text-left">Interview Training Platform</span>
              </h1>

              <p className="text-lg sm:text-xl lg:text-xl font-medium text-muted-foreground animate-fade-in delay-300 leading-relaxed">
                Готовьтесь к техническим собеседованиям RS School с интерактивными тренировками и
                персональной обратной связью
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center lg:justify-start animate-fade-in delay-500">
              <Button asChild className="w-full sm:w-auto px-9 py-7">
                <Link to={ROUTES.REGISTER}>Начать бесплатно</Link>
              </Button>

              <Button asChild variant="outline" className="w-full sm:w-auto px-9 py-7">
                <Link to={ROUTES.LOGIN}>Войти</Link>
              </Button>
            </div>

            <div className="flex gap-10 sm:gap-12 lg:gap-14 pt-4 animate-fade-in justify-center lg:justify-start flex-wrap">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="stat-item text-center lg:text-left transition-opacity duration-500 hover:opacity-80"
                >
                  <p className="text-3xl sm:text-4xl font-bold text-primary">{item.value}</p>
                  <p className="text-base sm:text-lg text-muted-foreground mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end w-full lg:w-1/2 xl:w-[45%] animate-fade-in delay-400">
            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
              <img
                src="/images/RS School About.png"
                alt="RS School interview"
                className="cursor-pointer w-full h-auto object-contain rounded-3xl shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
              />

              <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 bg-primary rounded-2xl px-5 py-4 sm:px-6 sm:py-5 shadow-xl animate-fade-in delay-1000 success-badge">
                <p className="text-2xl sm:text-3xl font-bold text-primary-foreground">98%</p>
                <p className="text-sm sm:text-base text-primary-foreground mt-1">Успешность</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
