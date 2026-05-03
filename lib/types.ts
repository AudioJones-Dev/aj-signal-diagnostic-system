export type QuestionType = 'single' | 'multi' | 'scale';

export type Category = 'strategy' | 'branding' | 'marketing' | 'ai';

export interface QuestionOption {
  text: string;
  value: string;
  score: number;
  branchTo?: string;
}

export interface ShowIfCondition {
  questionId: string;
  value: string;
}

export interface Question {
  id: string;
  text: string;
  category: Category;
  type: QuestionType;
  options: QuestionOption[];
  weight: number;
  showIf?: ShowIfCondition;
}

export interface Answer {
  questionId: string;
  value: string | string[];
  score: number;
}

export interface AssessmentSession {
  id: string;
  answers: Answer[];
  leadEmail: string;
  leadName: string;
  completedAt: string;
  resultId: string;
}

export type ResultType =
  | 'strategy_misalignment'
  | 'brand_misalignment'
  | 'marketing_gap'
  | 'ai_readiness_gap'
  | 'ai_scaling_candidate';

export interface CategoryScore {
  category: Category;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface DiagnosticResult {
  id: string;
  sessionId: string;
  resultType: ResultType;
  scores: CategoryScore[];
  headline: string;
  description: string;
  recommendedService: string;
  ctaLabel: string;
  ctaUrl: string;
}

export interface ScoringRule {
  id: string;
  resultType: ResultType;
  conditions: ScoringCondition[];
  priority: number;
}

export interface ScoringCondition {
  category: Category;
  operator: 'lt' | 'lte' | 'gt' | 'gte' | 'eq';
  threshold: number;
}
