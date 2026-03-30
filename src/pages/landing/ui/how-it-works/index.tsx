import { Link } from 'react-router-dom';

import styles from './styles.module.css';

import { useIntersectionObserver } from '@/pages/landing/hooks/use-intersection-observer';
import { ANIMATION_DELAYS, INTERSECTION_OBSERVER_THRESHOLD } from '@/pages/landing/lib/constants';
import { LANDING_HOW_IT_WORKS_TEXT, LANDING_STEPS_TEXT } from '@/pages/landing/locales';
import { Button, ROUTES } from '@/shared';
import { cn } from '@/shared/lib/utils';

export const HowItWorks = () => {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: INTERSECTION_OBSERVER_THRESHOLD,
  });

  return (
    <section className="bg-sidebar">
      <div className="container mx-auto max-w-[1280px] px-6 py-16">
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <h2 className="mb-4 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
            {LANDING_HOW_IT_WORKS_TEXT.TITLE}
          </h2>
          <p className="text-sm text-sidebar-foreground sm:text-base lg:text-lg">
            {LANDING_HOW_IT_WORKS_TEXT.DESCRIPTION}
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 text-center"
        >
          {LANDING_STEPS_TEXT.map((step, index) => {
            return (
              <div
                key={step.ID}
                className={cn(styles.stepCard, isVisible && styles.stepCardVisible)}
                style={{ transitionDelay: `${(index + 1) * ANIMATION_DELAYS.STEP}ms` }}
              >
                <div className={cn('flex flex-col items-center gap-4', styles.stepInner)}>
                  <span className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    {index + 1}
                  </span>
                  <h4 className="text-lg font-semibold sm:text-xl">{step.TITLE}</h4>
                  <p className="text-sm sm:text-base text-muted-foreground max-w-xs">
                    {step.DESCRIPTION}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-8">
          <Button asChild className="px-6 sm:px-8 py-4 sm:py-5 text-base sm:text-lg">
            <Link to={ROUTES.HOME}>{LANDING_HOW_IT_WORKS_TEXT.CTA}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
