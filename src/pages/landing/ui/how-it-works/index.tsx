import styles from './styles.module.css';

import { useIntersectionObserver } from '@/pages/landing/hooks/use-intersection-observer';
import { ANIMATION_DELAYS, INTERSECTION_OBSERVER_THRESHOLD } from '@/pages/landing/lib/constants';
import { TEXT_CONSTANTS, STEPS_TEXT } from '@/pages/landing/locales/locales';
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
            {TEXT_CONSTANTS.howItWorksTitle}
          </h2>
          <p className="text-sm text-sidebar-foreground sm:text-base lg:text-lg">
            {TEXT_CONSTANTS.howItWorksDescription}
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 text-center"
        >
          {STEPS_TEXT.map((step, index) => {
            return (
              <div
                key={step.id}
                className={cn(styles.stepCard, isVisible && styles.stepCardVisible)}
                style={{ transitionDelay: `${(index + 1) * ANIMATION_DELAYS.STEP}ms` }}
              >
                <div className={cn('flex flex-col items-center gap-4', styles.stepInner)}>
                  <span className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    {index + 1}
                  </span>
                  <h4 className="text-lg font-semibold sm:text-xl">{step.title}</h4>
                  <p className="text-sm sm:text-base text-muted-foreground max-w-xs">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
