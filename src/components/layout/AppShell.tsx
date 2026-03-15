import { useState } from 'react';
import { Header } from './Header';
import { WizardContainer } from '@/components/wizard/WizardContainer';

export function AppShell() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 py-6 max-w-7xl mx-auto w-full">
        <WizardContainer
          currentStep={currentStep}
          totalSteps={totalSteps}
          onStepChange={setCurrentStep}
        />
      </main>
    </div>
  );
}
