import { Link } from 'react-router-dom';

import styles from './styles.module.css';

import { useIntersectionObserver } from '@/pages/landing/hooks/use-intersection-observer';
import { INTERSECTION_OBSERVER_THRESHOLD } from '@/pages/landing/lib/constants';
import { LANDING_READY_TEXT } from '@/pages/landing/locales';
import { ROUTES } from '@/shared/config/routes';
import { cn } from '@/shared/lib/utils';
import { BUTTON_TEXT } from '@/shared/model/constants';
import { Button } from '@/shared/ui/button';

export const ReadyToStart = () => {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: INTERSECTION_OBSERVER_THRESHOLD,
  });

  return (
    <section className="py-12 sm:py-16 lg:py-24 flex justify-center overflow-x-hidden">
      <div className="w-full flex justify-center px-4">
        <div
          ref={ref}
          className={cn(
            styles.readyCard,
            isVisible && styles.readyCardVisible,
            'border border-secondary rounded-2xl flex flex-col items-center bg-secondary/45 gap-5 py-10 px-6 w-full max-w-[720px] sm:max-w-[960px] lg:max-w-[1240px] sm:scale-[0.95] lg:scale-100 origin-top text-center'
          )}
        >
          <img
            src="/images/bg-landing2.png"
            alt="RS School interview"
            className="w-36 h-36 sm:w-48 sm:h-48 lg:w-52 lg:h-52"
          />

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
            {LANDING_READY_TEXT.TITLE}
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-[90%] sm:max-w-[672px] mx-auto">
            {LANDING_READY_TEXT.DESCRIPTION}
          </p>

          <Button asChild className="mt-4 px-6 sm:px-8 py-4 sm:py-5 text-base sm:text-lg">
            <Link to={ROUTES.REGISTER}>{BUTTON_TEXT.REGISTER_NOW}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
