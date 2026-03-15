import { ChevronLeft, ChevronRight, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function StepNavigation({ currentStep, totalSteps, onBack, onNext, onGenerate, isGenerating }: StepNavigationProps) {
  const isFirst = currentStep === 1;
  const isLast = currentStep === totalSteps;

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
      <Button variant="ghost" onClick={onBack} disabled={isFirst}>
        <ChevronLeft size={16} /> Indietro
      </Button>

      {isLast ? (
        <Button variant="primary" size="lg" onClick={onGenerate} disabled={isGenerating}>
          {isGenerating ? (
            <><Spinner size={18} /> Generazione...</>
          ) : (
            <><FileDown size={18} /> Genera PPTX</>
          )}
        </Button>
      ) : (
        <Button variant="primary" onClick={onNext}>
          Avanti <ChevronRight size={16} />
        </Button>
      )}
    </div>
  );
}
