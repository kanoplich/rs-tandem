import { HowItWorks, ReadyToStart, Training, WhyChooseUs } from '@/pages/landing/ui';

export const Landing = () => {
  return (
    <div className="flex flex-col">
      <Training />
      <WhyChooseUs />
      <HowItWorks />
      <ReadyToStart />
    </div>
  );
}
