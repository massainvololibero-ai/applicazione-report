import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { StepIndicator } from './StepIndicator';
import { StepNavigation } from './StepNavigation';
import { GlassCard } from '@/components/layout/GlassCard';
import { Step1ProfiloComplessivo } from '@/components/steps/Step1ProfiloComplessivo';
import { Step2HighlightsBusinessCase } from '@/components/steps/Step2HighlightsBusinessCase';
import { Step3OverviewCompetenze } from '@/components/steps/Step3OverviewCompetenze';
import { Step4SupportoSviluppo } from '@/components/steps/Step4SupportoSviluppo';
import { Step5ReadinessTraiettorie } from '@/components/steps/Step5ReadinessTraiettorie';
import { Step6RischioUscita } from '@/components/steps/Step6RischioUscita';
import { Step7GrowthPotential } from '@/components/steps/Step7GrowthPotential';
import { StepReview } from '@/components/steps/StepReview';
import { useDossier } from '@/context/DossierContext';
import { generateDossier } from '@/pptx/generateDossier';

interface WizardContainerProps {
  currentStep: number;
  totalSteps: number;
  onStepChange: (step: number) => void;
}

const stepComponents = [
  Step1ProfiloComplessivo,
  Step2HighlightsBusinessCase,
  Step3OverviewCompetenze,
  Step4SupportoSviluppo,
  Step5ReadinessTraiettorie,
  Step6RischioUscita,
  Step7GrowthPotential,
  StepReview,
];

export function WizardContainer({ currentStep, totalSteps, onStepChange }: WizardContainerProps) {
  const [direction, setDirection] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const { state } = useDossier();

  const goNext = () => {
    if (currentStep < totalSteps) {
      setDirection(1);
      onStepChange(currentStep + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      onStepChange(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    setDirection(step > currentStep ? 1 : -1);
    onStepChange(step);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await generateDossier(state);
    } catch (err) {
      console.error('PPTX generation failed:', err);
      alert('Errore nella generazione del file. Riprova.');
    } finally {
      setIsGenerating(false);
    }
  };

  const StepComponent = stepComponents[currentStep - 1];

  return (
    <div>
      <StepIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        onStepClick={goToStep}
      />

      <GlassCard className="min-h-[500px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 40 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {StepComponent && <StepComponent />}
          </motion.div>
        </AnimatePresence>

        <StepNavigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          onBack={goBack}
          onNext={goNext}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />
      </GlassCard>
    </div>
  );
}
