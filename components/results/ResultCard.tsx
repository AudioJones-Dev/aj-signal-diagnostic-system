import { DiagnosticResult, ResultType } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

const resultTypeLabels: Record<ResultType, string> = {
  strategy_misalignment: 'Strategy Gap',
  brand_misalignment: 'Brand Gap',
  marketing_gap: 'Marketing Gap',
  ai_readiness_gap: 'AI Readiness Gap',
  ai_scaling_candidate: 'AI Ready',
};

const resultTypeVariants: Record<ResultType, 'primary' | 'secondary' | 'success' | 'muted'> = {
  strategy_misalignment: 'muted',
  brand_misalignment: 'secondary',
  marketing_gap: 'primary',
  ai_readiness_gap: 'muted',
  ai_scaling_candidate: 'success',
};

interface ResultCardProps {
  result: DiagnosticResult;
}

export function ResultCard({ result }: ResultCardProps) {
  return (
    <Card variant="bordered" className="text-center">
      <Badge variant={resultTypeVariants[result.resultType]} className="mb-4">
        {resultTypeLabels[result.resultType]}
      </Badge>
      <h1 className="text-3xl font-bold text-[#f5f5f5] mb-4 leading-tight">
        {result.headline}
      </h1>
      <p className="text-[#a3a3a3] text-lg leading-relaxed max-w-2xl mx-auto">
        {result.description}
      </p>
    </Card>
  );
}
