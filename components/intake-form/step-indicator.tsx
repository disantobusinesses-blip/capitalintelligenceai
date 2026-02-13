'use client';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {[...Array(totalSteps)].map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={stepNumber} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    isActive
                      ? 'bg-accent text-background glow-effect scale-110'
                      : isCompleted
                      ? 'bg-accent/50 text-background'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {isCompleted ? '✓' : stepNumber}
                </div>
                <span className="text-xs mt-2 text-muted-foreground">Step {stepNumber}</span>
              </div>
              {stepNumber < totalSteps && (
                <div
                  className={`h-1 flex-1 mx-2 rounded transition-all ${
                    isCompleted ? 'bg-accent/50' : 'bg-secondary'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
