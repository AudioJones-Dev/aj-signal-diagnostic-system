import type { AssessmentSession, CategoryScore, DiagnosticResult, ResultType, ScoringRule, ScoringCondition } from './types';
import scoringRulesData from '../schema/scoring-rules.json';
import { nanoid } from 'nanoid';

const scoringRules = scoringRulesData as ScoringRule[];

function evaluateCondition(condition: ScoringCondition, scores: CategoryScore[]): boolean {
  const categoryScore = scores.find((s) => s.category === condition.category);
  if (!categoryScore) return false;
  const { percentage } = categoryScore;
  switch (condition.operator) {
    case 'lt': return percentage < condition.threshold;
    case 'lte': return percentage <= condition.threshold;
    case 'gt': return percentage > condition.threshold;
    case 'gte': return percentage >= condition.threshold;
    case 'eq': return percentage === condition.threshold;
    default: return false;
  }
}

export function determineResult(categoryScores: CategoryScore[]): ResultType {
  const sortedRules = [...scoringRules].sort((a, b) => a.priority - b.priority);
  for (const rule of sortedRules) {
    const allMet = rule.conditions.every((c) => evaluateCondition(c, categoryScores));
    if (allMet) return rule.resultType;
  }
  return 'ai_scaling_candidate';
}

export function getResultContent(resultType: ResultType): {
  headline: string;
  description: string;
  recommendedService: string;
  ctaLabel: string;
  ctaUrl: string;
} {
  const content: Record<ResultType, { headline: string; description: string; recommendedService: string; ctaLabel: string; ctaUrl: string }> = {
    strategy_misalignment: {
      headline: 'Your Signal Is Broken at the Foundation',
      description:
        'Your business lacks the strategic clarity needed to make branding, marketing, or AI work. The real bottleneck is upstream—in how you\'ve defined your goals, audience, and revenue model.',
      recommendedService: 'Strategic Clarity Session',
      ctaLabel: 'Book a Strategy Session',
      ctaUrl: '/contact?service=strategy',
    },
    brand_misalignment: {
      headline: "Your Message Isn't Landing",
      description:
        "Your strategy is solid, but your brand isn't converting the signal. Potential clients don't trust or understand your offer because the visual identity and messaging don't match the value you deliver.",
      recommendedService: 'Brand Alignment Sprint',
      ctaLabel: 'Book a Brand Audit',
      ctaUrl: '/contact?service=brand',
    },
    marketing_gap: {
      headline: "You're Invisible in the Market",
      description:
        "Your foundation is built, but you don't have a reliable system bringing people to you. The bottleneck is marketing—channels, content, or conversion.",
      recommendedService: 'Marketing System Build',
      ctaLabel: 'Book a Marketing Strategy Call',
      ctaUrl: '/contact?service=marketing',
    },
    ai_readiness_gap: {
      headline: "You're Not Ready to Automate",
      description:
        "AI could help you scale—but your systems aren't documented or clean enough to automate safely. Automating chaos creates faster chaos.",
      recommendedService: 'AI Readiness Audit',
      ctaLabel: 'Book an AI Readiness Call',
      ctaUrl: '/contact?service=ai-readiness',
    },
    ai_scaling_candidate: {
      headline: "You're Ready to Scale with AI",
      description:
        'Your strategy, brand, and marketing are working. Now it\'s time to use AI and automation to remove yourself from repetitive processes and scale impact.',
      recommendedService: 'AI Automation Build',
      ctaLabel: 'Book Your AI Strategy Session',
      ctaUrl: '/contact?service=ai-automation',
    },
  };
  return content[resultType];
}

export function buildDiagnosticResult(
  session: AssessmentSession,
  categoryScores: CategoryScore[]
): DiagnosticResult {
  const resultType = determineResult(categoryScores);
  const content = getResultContent(resultType);
  return {
    id: nanoid(),
    sessionId: session.id,
    resultType,
    scores: categoryScores,
    ...content,
  };
}
