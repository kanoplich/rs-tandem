import { HowItWorks } from '@/pages/landing/ui/HowItWorks/HowItWorks';
import { ReadyToStart } from '@/pages/landing/ui/ReadyToStart/ReadyToStart';
import { Training } from '@/pages/landing/ui/Training/Training';
import { WhyChooseUs } from '@/pages/landing/ui/WhyChooseUs/WhyChooseUs';

export function Landing() {
  return (
    <div className="flex flex-col">
      <Training />
      <WhyChooseUs />
      <HowItWorks />
      <ReadyToStart />
    </div>
  );
}
