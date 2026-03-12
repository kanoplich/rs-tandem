import { useState } from 'react';

import { getActiveStage, setActiveStage } from '../lib/stage-context';

import { cn } from '@/shared/lib/utils';

const STAGES = [
  { id: 1, label: 'Stage 1', description: 'Основы JavaScript и алгоритмы' },
  { id: 2, label: 'Stage 2', description: 'Продвинутый JavaScript и фреймворки' },
  { id: 3, label: 'Stage 3', description: 'Бэкенд и базы данных' },
] as const;

export const StageTabs = () => {
  const [currentStage, setCurrentStage] = useState<1 | 2 | 3>(getActiveStage());

  const handleStageChange = (stage: 1 | 2 | 3) => {
    setCurrentStage(stage);
    setActiveStage(stage);
  };
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="w-full max-w-[1248px] h-[36px] mx-auto rounded-lg bg-foreground">
        <div className="flex h-full">
          {STAGES.map((stage) => (
            <div
              key={stage.id}
              className={cn(
                'w-[414px] h-[29px] rounded-[12px] transition-all',
                currentStage === stage.id ? 'bg-card' : 'bg-transparent'
              )}
            >
              <button
                onClick={() => handleStageChange(stage.id)}
                className="w-full h-full flex items-center justify-center text-foreground text-sm font-normal no-underline font-['Arimo']"
              >
                {stage.label}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
