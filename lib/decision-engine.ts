import type { Answer, Question } from './types';

export function shouldSkipQuestion(question: Question, answers: Answer[]): boolean {
  if (!question.showIf) return false;
  const { questionId, value } = question.showIf;
  const answer = answers.find((a) => a.questionId === questionId);
  if (!answer) return true;
  const answerValue = Array.isArray(answer.value) ? answer.value : [answer.value];
  return !answerValue.includes(value);
}

export function getVisibleQuestions(answers: Answer[], allQuestions: Question[]): Question[] {
  return allQuestions.filter((q) => !shouldSkipQuestion(q, answers));
}

export function getNextQuestion(
  currentQuestionId: string,
  answers: Answer[],
  allQuestions: Question[]
): Question | null {
  const currentAnswer = answers.find((a) => a.questionId === currentQuestionId);
  const currentQuestion = allQuestions.find((q) => q.id === currentQuestionId);

  // Check for branchTo override
  if (currentAnswer && currentQuestion) {
    const selectedOption = currentQuestion.options.find(
      (o) => o.value === currentAnswer.value
    );
    if (selectedOption?.branchTo) {
      const branchQuestion = allQuestions.find((q) => q.id === selectedOption.branchTo);
      if (branchQuestion && !shouldSkipQuestion(branchQuestion, answers)) {
        return branchQuestion;
      }
    }
  }

  const currentIndex = allQuestions.findIndex((q) => q.id === currentQuestionId);
  if (currentIndex === -1) return allQuestions[0] ?? null;

  for (let i = currentIndex + 1; i < allQuestions.length; i++) {
    const q = allQuestions[i];
    if (!shouldSkipQuestion(q, answers)) {
      return q;
    }
  }

  return null;
}
