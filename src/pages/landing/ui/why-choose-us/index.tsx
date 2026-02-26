import styles from './styles.module.css';

import { useIntersectionObserver } from '@/pages/landing/hooks/use-intersection-observer';
import {
  ANIMATION_DELAYS,
  INTERSECTION_OBSERVER_THRESHOLD_FEATURES,
} from '@/pages/landing/lib/constants';
import { FEATURES_TEXT, TEXT_CONSTANTS } from '@/pages/landing/locales/locales';
import {
  AwardIcon,
  CheckIcon,
  MessageIcon,
  ProgressIcon,
  StatisticIcon,
  TopicIcon,
} from '@/shared/assets/icons';
import { cn } from '@/shared/lib/utils';

const features = [
  {
    id: 'interactive-training',
    icon: <MessageIcon />,
    title: 'Интерактивные тренировки',
    text: 'Практикуйтесь в реальном времени с AI-интервьюером, отвечая на технические вопросы',
  },
  {
    id: 'personal-tracking',
    icon: <ProgressIcon />,
    title: 'Персональный трекинг',
    text: 'Отслеживайте свой прогресс, средние оценки и сильные стороны по каждой теме',
  },
  {
    id: 'current-topics',
    icon: <TopicIcon />,
    title: '37 актуальных тем',
    text: 'От основ JavaScript до продвинутой архитектуры и Node.js',
  },
  {
    id: 'analysis',
    icon: <StatisticIcon />,
    title: 'Анализ результатов',
    text: 'Получайте детальную статистику и рекомендации для улучшения',
  },
  {
    id: 'training-stage',
    icon: <CheckIcon />,
    title: '3 этапа обучения',
    text: 'Структурированная программа от базовых концепций до продвинутых тем',
  },
  {
    id: 'achievements',
    icon: <AwardIcon />,
    title: 'Достижения',
    text: 'Зарабатывайте награды и отслеживайте свои успехи',
  },
];

export const WhyChooseUs = () => {
  const { ref, isVisible } = useIntersectionObserver({
    threshold: INTERSECTION_OBSERVER_THRESHOLD_FEATURES,
  });

  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4">
            {TEXT_CONSTANTS.whyChooseUsTitle}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
            {TEXT_CONSTANTS.whyChooseUsDescription}
          </p>
        </div>

        <div ref={ref} className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => {
            const textItem = FEATURES_TEXT.find((f) => f.id === item.id);
            if (!textItem) return null;
            return (
              <div
                key={item.id}
                className={cn(
                  'bg-card border rounded-2xl p-6 sm:p-8',
                  styles.whyCard,
                  isVisible && styles.whyCardVisible
                )}
                style={
                  {
                    '--delay': `${(index + 1) * ANIMATION_DELAYS.FEATURE_CARD}ms`,
                  } as React.CSSProperties
                }
              >
                <div className={cn('flex flex-col gap-4', styles.whyCardInner)}>
                  {item.icon}
                  <h4 className="text-lg sm:text-xl font-semibold">{item.title}</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
