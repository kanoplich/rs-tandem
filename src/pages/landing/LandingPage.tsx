import { HowItWorks } from './ui/HowItWorks/HowItWorks';
import { Landing } from './ui/Landing/Landing';
import { WhyChooseUs } from './ui/WhyChooseUs/WhyChooseUs';

export function LandingPage() {
  return (
    <div className="flex flex-col">
      <Landing />
      <WhyChooseUs />
      <HowItWorks />
    </div>
  );
}
