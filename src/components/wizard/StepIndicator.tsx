const STEP_LABELS = [
  'Profilo',
  'Business Case',
  'Competenze',
  'Sviluppo',
  'Readiness',
  'Rischio',
  'Growth',
  'Review',
];

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}

export function StepIndicator({ currentStep, totalSteps, onStepClick }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-1 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <button
            key={step}
            onClick={() => onStepClick(step)}
            className="flex items-center gap-1 group"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                isActive
                  ? 'bg-k2p-violet text-white scale-110 shadow-lg shadow-k2p-violet/30'
                  : isCompleted
                    ? 'bg-k2p-light text-k2p-grape'
                    : 'bg-k2p-grey text-gray-400'
              }`}
            >
              {isCompleted ? '\u2713' : step}
            </div>
            <span className={`text-[10px] font-medium hidden sm:inline mr-2 transition-colors ${
              isActive ? 'text-k2p-violet' : isCompleted ? 'text-k2p-grape' : 'text-gray-400'
            }`}>
              {STEP_LABELS[i]}
            </span>
            {i < totalSteps - 1 && (
              <div className={`w-4 h-0.5 ${isCompleted ? 'bg-k2p-light' : 'bg-k2p-grey'}`} />
            )}
          </button>
        );
      })}
    </div>
  );
}
