import { useEffect, useRef } from 'react';

import Icons1 from '@/assets/LandingIcons/HowItWorks/Icons1.svg';
import Icons2 from '@/assets/LandingIcons/HowItWorks/Icons2.svg';
import Icons3 from '@/assets/LandingIcons/HowItWorks/Icons3.svg';
import Icons4 from '@/assets/LandingIcons/HowItWorks/Icons4.svg';

import './HowItWorks.css';

const steps = [
  {
    icon: Icons1,
    title: 'Выберите этап',
    description: 'Начните с того этапа, который вам нужен',
  },
  {
    icon: Icons2,
    title: 'Выберите темы',
    description: 'Определите темы для тренировки',
  },
  {
    icon: Icons3,
    title: 'Тренируйтесь',
    description: 'Отвечайте на вопросы интервьюера',
  },
  {
    icon: Icons4,
    title: 'Анализируйте',
    description: 'Получайте результаты и улучшайтесь',
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.length === 0 || !entries[0]?.isIntersecting) return;

        const cards = section.querySelectorAll('.step-card');
        cards.forEach((card) => card.classList.add('visible'));
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-sidebar">
      <div className="container mx-auto max-w-[1280px] px-6 py-16">
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <h2 className="mb-4 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
            Как это работает?
          </h2>
          <p className="text-sm text-sidebar-foreground sm:text-base lg:text-lg">
            Простой процесс для эффективной подготовки
          </p>
        </div>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 text-center"
        >
          {steps.map((step, index) => (
            <div key={index} className={`step-card delay-${(index + 1) * 100}`}>
              <div className="step-inner flex flex-col items-center gap-4">
                <img
                  src={step.icon}
                  alt={step.title}
                  className="
                    h-12 w-12
                    sm:h-14 sm:w-14
                    lg:h-16 lg:w-16
                    opacity-90
                  "
                />

                <h4 className="text-lg font-semibold sm:text-xl">{step.title}</h4>

                <p className="text-sm sm:text-base text-muted-foreground max-w-xs">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
