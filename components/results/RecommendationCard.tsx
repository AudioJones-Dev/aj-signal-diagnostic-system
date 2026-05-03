import { DiagnosticResult } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface RecommendationCardProps {
  result: DiagnosticResult;
}

export function RecommendationCard({ result }: RecommendationCardProps) {
  return (
    <Card variant="elevated" className="border border-primary/30">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
          <span className="text-primary text-xl">✦</span>
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            Recommended Next Step
          </p>
          <h3 className="text-xl font-bold text-[#f5f5f5] mb-2">
            {result.recommendedService}
          </h3>
          <p className="text-[#a3a3a3] text-sm mb-4">
            Based on your diagnostic results, this is the highest-leverage investment you can make right now.
          </p>
          <Link href={result.ctaUrl}>
            <Button variant="primary" size="md">
              {result.ctaLabel} →
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
