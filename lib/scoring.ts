import type { Answer, CategoryScore, Question, Category } from './types';
import questionsData from '../schema/questions.json';

const questions = questionsData as Question[];

export function scoreAnswer(answer: Answer, question: Question): number {
  if (question.type === 'single') {
    const option = question.options.find((o) => o.value === answer.value);
    return option ? option.score * question.weight : 0;
  }
  if (question.type === 'multi') {
    const values = Array.isArray(answer.value) ? answer.value : [answer.value];
    return values.reduce((sum, v) => {
      const option = question.options.find((o) => o.value === v);
      return sum + (option ? option.score * question.weight : 0);
    }, 0);
  }
  if (question.type === 'scale') {
    return Number(answer.value) * question.weight;
  }
  return 0;
}

export function calculateCategoryScores(
  answers: Answer[],
  allQuestions?: Question[]
): CategoryScore[] {
  const qs = allQuestions ?? questions;
  const categories: Category[] = ['strategy', 'branding', 'marketing', 'ai'];

  return categories.map((category) => {
    const categoryQuestions = qs.filter((q) => q.category === category);
    const answeredQuestions = categoryQuestions.filter((q) =>
      answers.some((a) => a.questionId === q.id)
    );

    const maxScore = answeredQuestions.reduce(
      (sum, q) => sum + 10 * q.weight,
      0
    );

    const score = answeredQuestions.reduce((sum, q) => {
      const answer = answers.find((a) => a.questionId === q.id);
      if (!answer) return sum;
      return sum + scoreAnswer(answer, q);
    }, 0);

    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

    return { category, score, maxScore, percentage };
  });
}

export function calculateTotalScore(categoryScores: CategoryScore[]): number {
  const total = categoryScores.reduce((sum, cs) => sum + cs.score, 0);
  const max = categoryScores.reduce((sum, cs) => sum + cs.maxScore, 0);
  return max > 0 ? Math.round((total / max) * 100) : 0;
}
