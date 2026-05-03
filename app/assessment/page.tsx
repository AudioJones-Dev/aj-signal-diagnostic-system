'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { QuestionCard } from '@/components/assessment/QuestionCard';
import { LeadCaptureForm } from '@/components/assessment/LeadCaptureForm';
import { getNextQuestion, getVisibleQuestions } from '@/lib/decision-engine';
import type { Answer, Question } from '@/lib/types';
import questionsData from '@/schema/questions.json';
import Link from 'next/link';

const allQuestions = questionsData as Question[];

export default function AssessmentPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(allQuestions[0]);
  const [questionHistory, setQuestionHistory] = useState<string[]>([allQuestions[0].id]);
  const [pendingAnswer, setPendingAnswer] = useState<Answer | undefined>(undefined);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const visibleQuestions = getVisibleQuestions(answers, allQuestions);
  const currentIndex = visibleQuestions.findIndex((q) => q.id === currentQuestion.id);
  const progress = visibleQuestions.length > 0
    ? ((currentIndex + 1) / visibleQuestions.length) * 100
    : 0;

  const currentAnswer = answers.find((a) => a.questionId === currentQuestion.id) ?? pendingAnswer;

  const handleAnswer = useCallback((answer: Answer) => {
    setPendingAnswer(answer);
  }, []);

  const handleNext = () => {
    if (!pendingAnswer && !answers.find((a) => a.questionId === currentQuestion.id)) return;

    const answerToSave = pendingAnswer ?? answers.find((a) => a.questionId === currentQuestion.id)!;
    const updatedAnswers = [
      ...answers.filter((a) => a.questionId !== currentQuestion.id),
      answerToSave,
    ];
    setAnswers(updatedAnswers);
    setPendingAnswer(undefined);

    const next = getNextQuestion(currentQuestion.id, updatedAnswers, allQuestions);
    if (next) {
      setCurrentQuestion(next);
      setQuestionHistory((prev) => [...prev, next.id]);
    } else {
      setShowLeadCapture(true);
    }
  };

  const handleBack = () => {
    if (questionHistory.length <= 1) return;
    const newHistory = questionHistory.slice(0, -1);
    setQuestionHistory(newHistory);
    const prevId = newHistory[newHistory.length - 1];
    const prevQuestion = allQuestions.find((q) => q.id === prevId);
    if (prevQuestion) {
      setCurrentQuestion(prevQuestion);
      setPendingAnswer(undefined);
    }
  };

  const handleLeadSubmit = async (name: string, email: string) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, leadName: name, leadEmail: email }),
      });

      if (!response.ok) throw new Error('Submission failed');
      const { resultId } = await response.json();
      router.push(`/results/${resultId}`);
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Top bar */}
      <div className="fixed top-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-[#2a2a2a]">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link href="/" className="text-primary font-bold text-sm">
              ← Audio Jones
            </Link>
            {!showLeadCapture && (
              <span className="text-[#a3a3a3] text-sm">
                {currentIndex + 1} / {visibleQuestions.length}
              </span>
            )}
          </div>
          {!showLeadCapture && (
            <ProgressBar value={progress} max={100} />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          {showLeadCapture ? (
            <LeadCaptureForm onSubmit={handleLeadSubmit} isLoading={isSubmitting} />
          ) : (
            <QuestionCard
              question={currentQuestion}
              currentAnswer={currentAnswer}
              onAnswer={handleAnswer}
              onBack={handleBack}
              onNext={handleNext}
              canGoBack={questionHistory.length > 1}
              isLast={getNextQuestion(currentQuestion.id, answers, allQuestions) === null}
            />
          )}
        </div>
      </div>
    </main>
  );
}
