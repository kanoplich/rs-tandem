import { useEffect, useRef } from 'react';

import LandingIcons1 from '@/assets/LandingIcons/WhyChooseUs/Container1.svg';
import LandingIcons2 from '@/assets/LandingIcons/WhyChooseUs/Container2.svg';
import LandingIcons3 from '@/assets/LandingIcons/WhyChooseUs/Container3.svg';
import LandingIcons4 from '@/assets/LandingIcons/WhyChooseUs/Container4.svg';
import LandingIcons5 from '@/assets/LandingIcons/WhyChooseUs/Container5.svg';
import LandingIcons6 from '@/assets/LandingIcons/WhyChooseUs/Container6.svg';

import './WhyChooseUs.css';

export function WhyChooseUs() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.why-card');
            cards.forEach((card) => {
              card.classList.add('visible');
            });
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    observer.observe(gridRef.current);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: LandingIcons1,
      title: 'Интерактивные тренировки',
      text: 'Практикуйтесь в реальном времени с AI-интервьюером, отвечая на технические вопросы',
    },
    {
      icon: LandingIcons2,
      title: 'Персональный трекинг',
      text: 'Отслеживайте свой прогресс, средние оценки и сильные стороны по каждой теме',
    },
    {
      icon: LandingIcons3,
      title: '37 актуальных тем',
      text: 'От основ JavaScript до продвинутой архитектуры и Node.js',
    },
    {
      icon: LandingIcons4,
      title: 'Анализ результатов',
      text: 'Получайте детальную статистику и рекомендации для улучшения',
    },
    {
      icon: LandingIcons5,
      title: '3 этапа обучения',
      text: 'Структурированная программа от базовых концепций до продвинутых тем',
    },
    {
      icon: LandingIcons6,
      title: 'Достижения',
      text: 'Зарабатывайте награды и отслеживайте свои успехи',
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4">
            Почему выбирают нас?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
            Платформа разработана специально для подготовки к интервью в рамках программы RS School
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((item, index) => (
            <div key={index} className="why-card bg-card border rounded-2xl p-6 sm:p-8">
              <div className="why-card-inner cursor-pointer flex flex-col gap-4">
                <img src={item.icon} alt={item.title} className="w-12 h-12 sm:w-14 sm:h-14" />
                <h4 className="text-lg sm:text-xl font-semibold">{item.title}</h4>
                <p className="text-sm sm:text-base text-muted-foreground">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
