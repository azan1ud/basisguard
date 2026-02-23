"use client";

interface StepIndicatorProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: "Upload" },
  { number: 2, label: "Connect" },
  { number: 3, label: "Analysis" },
  { number: 4, label: "Payment" },
  { number: 5, label: "Download" },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          const isUpcoming = step.number > currentStep;

          return (
            <div key={step.number} className="flex items-center flex-1 last:flex-none">
              {/* Step circle + label */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold
                    transition-colors duration-200
                    ${isCompleted ? "bg-emerald text-white" : ""}
                    ${isCurrent ? "bg-emerald text-white ring-4 ring-emerald/20" : ""}
                    ${isUpcoming ? "bg-gray-200 text-slate" : ""}
                  `}
                >
                  {isCompleted ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3.5 8.5L6.5 11.5L12.5 4.5" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={`
                    mt-2 text-xs font-medium whitespace-nowrap
                    ${isCurrent ? "text-emerald" : ""}
                    ${isCompleted ? "text-emerald" : ""}
                    ${isUpcoming ? "text-slate" : ""}
                  `}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={`
                    flex-1 h-0.5 mx-3 mt-[-1.25rem]
                    ${step.number < currentStep ? "bg-emerald" : "bg-gray-200"}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
