import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { FourStepProcess } from '@/components/FourStepProcess';
import { CurriculumModules } from '@/components/CurriculumModules';
import { InteractivePromptExplorer } from '@/components/InteractivePromptExplorer';
import { WhoIsThisFor } from '@/components/WhoIsThisFor';
import { BonusStack } from '@/components/BonusStack';
import { TestimonialsWall } from '@/components/TestimonialsWall';
import { PricingSection } from '@/components/PricingSection';
import { FaqSection } from '@/components/FaqSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FourStepProcess />
      <CurriculumModules />
      <InteractivePromptExplorer />
      <WhoIsThisFor />
      <BonusStack />
      <TestimonialsWall />
      <PricingSection />
      <FaqSection />
    </>
  );
}
