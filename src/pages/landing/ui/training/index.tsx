import { Link } from 'react-router-dom';

import { useIntersectionObserver } from '../../hooks/use-intersection-observer';

import styles from './styles.module.css';

import { ROUTES } from '@/shared/config/routes';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

const stats = [
  { value: '1000+', label: 'Студентов' },
  { value: '37', label: 'Тем' },
  { value: '3', label: 'Этапа' },
];

export const Training = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-28 overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16 xl:gap-20">
          <div
            className={cn(
              'flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2 xl:w-[55%] text-center lg:text-left',
              styles['animateFadeUp'],
              isVisible && styles['visible']
            )}
          >
            <div className="flex flex-col sm:gap-4 lg:gap-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-center lg:text-left">
                Interview Training Platform
              </h1>

              <p
                className={cn(
                  styles['animateFadeIn'],
                  'text-lg sm:text-xl lg:text-xl font-medium text-muted-foreground leading-relaxed',
                  isVisible && styles['visible']
                )}
                style={{ transitionDelay: '300ms' }}
              >
                Готовьтесь к техническим собеседованиям RS School с интерактивными тренировками и
                персональной обратной связью
              </p>
            </div>

            <div
              className={cn(
                'flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center lg:justify-start',
                styles['animateFadeIn'],
                isVisible && styles['visible']
              )}
              style={{ transitionDelay: '500ms' }}
            >
              <Button asChild className="w-full sm:w-auto px-9 py-7">
                <Link to={ROUTES.REGISTER}>Начать бесплатно</Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto px-9 py-7">
                <Link to={ROUTES.LOGIN}>Войти</Link>
              </Button>
            </div>

            <div
              className={cn(
                'flex gap-10 sm:gap-12 lg:gap-14 pt-4 justify-center lg:justify-start flex-wrap',
                styles['animateFadeIn'],
                isVisible && styles['visible']
              )}
            >
              {stats.map((item) => (
                <div
                  key={item.label}
                  className={cn(
                    styles['statItem'],
                    'text-center lg:text-left transition-opacity duration-500 hover:opacity-80',
                    isVisible && styles['visible']
                  )}
                >
                  <p className="text-3xl sm:text-4xl font-bold text-primary">{item.value}</p>
                  <p className="text-base sm:text-lg text-muted-foreground mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className={cn(
              'relative flex justify-center lg:justify-end w-full lg:w-1/2 xl:w-[45%]',
              styles['animateFadeIn'],
              isVisible && styles['visible']
            )}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
              <img
                src="/images/bg-landing1.png"
                alt="RS School interview"
                className="cursor-pointer w-full h-auto object-contain rounded-3xl shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
              />
              <div
                className={cn(
                  styles['successBadge'],
                  'absolute bottom-6 left-6 sm:bottom-8 sm:left-8 bg-primary rounded-2xl px-5 py-4 sm:px-6 sm:py-5 shadow-xl',
                  isVisible && styles['visible']
                )}
                style={{ transitionDelay: '1000ms' }}
              >
                <p className="text-2xl sm:text-3xl font-bold text-primary-foreground">98%</p>
                <p className="text-sm sm:text-base text-primary-foreground mt-1">Успешность</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
