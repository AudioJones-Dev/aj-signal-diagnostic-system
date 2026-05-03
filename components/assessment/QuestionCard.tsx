'use client';

import { Question, Answer } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface QuestionCardProps {
  question: Question;
  currentAnswer?: Answer;
  onAnswer: (answer: Answer) => void;
  onBack: () => void;
  onNext: () => void;
  canGoBack: boolean;
  isLast: boolean;
}

const categoryLabels: Record<string, string> = {
  strategy: 'Business Strategy',
  branding: 'Brand & Identity',
  marketing: 'Marketing & Growth',
  ai: 'AI & Automation',
};

export function QuestionCard({
  question,
  currentAnswer,
  onAnswer,
  onBack,
  onNext,
  canGoBack,
  isLast,
}: QuestionCardProps) {
  const selectedValue = currentAnswer?.value;

  const handleSelect = (optionValue: string, optionScore: number) => {
    onAnswer({
      questionId: question.id,
      value: optionValue,
      score: optionScore * question.weight,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          {categoryLabels[question.category] ?? question.category}
        </span>
      </div>

      <Card variant="bordered" className="mb-6">
        <h2 className="text-xl font-semibold text-[#f5f5f5] mb-6 leading-relaxed">
          {question.text}
        </h2>

        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = selectedValue === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value, option.score)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-[#f5f5f5]'
                    : 'border-[#2a2a2a] bg-[#1a1a1a] text-[#a3a3a3] hover:border-[#3a3a3a] hover:text-[#f5f5f5]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all ${
                      isSelected
                        ? 'border-primary bg-primary'
                        : 'border-[#3a3a3a]'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-full h-full rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-black" />
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium">{option.text}</span>
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      <div className="flex items-center justify-between">
        {canGoBack ? (
          <Button variant="ghost" onClick={onBack}>
            ← Back
          </Button>
        ) : (
          <div />
        )}
        <Button
          variant="primary"
          onClick={onNext}
          disabled={!currentAnswer}
        >
          {isLast ? 'Continue to Results →' : 'Next →'}
        </Button>
      </div>
    </div>
  );
}
