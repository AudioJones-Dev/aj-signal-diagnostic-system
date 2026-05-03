'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { DiagnosticResult, CategoryScore } from '@/lib/types';
import { ResultCard } from '@/components/results/ResultCard';
import { RecommendationCard } from '@/components/results/RecommendationCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const categoryLabels: Record<string, string> = {
  strategy: 'Business Strategy',
  branding: 'Brand & Identity',
  marketing: 'Marketing & Growth',
  ai: 'AI & Automation',
};

function ScoreBreakdown({ scores }: { scores: CategoryScore[] }) {
  return (
    <Card variant="bordered">
      <h3 className="text-lg font-bold text-[#f5f5f5] mb-6">Score Breakdown</h3>
      <div className="space-y-5">
        {scores.map((score) => (
          <ProgressBar
            key={score.category}
            value={score.percentage}
            max={100}
            label={categoryLabels[score.category] ?? score.category}
            showPercent
            color={score.percentage >= 60 ? 'success' : score.percentage >= 40 ? 'primary' : 'secondary'}
          />
        ))}
      </div>
    </Card>
  );
}

export default function ResultsPage() {
  const params = useParams();
  const id = params?.id as string;
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/results/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Result not found');
        return res.json();
      })
      .then((data) => {
        setResult(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#a3a3a3]">Loading your diagnostic report...</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#a3a3a3] mb-4">Diagnostic report not found.</p>
          <Link href="/assessment">
            <Button variant="primary">Retake Assessment</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <nav className="border-b border-[#2a2a2a] py-4 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-primary font-bold">
            Audio Jones
          </Link>
          <span className="text-[#555] text-sm">Signal Diagnostic Report</span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <ResultCard result={result} />
        <ScoreBreakdown scores={result.scores} />
        <RecommendationCard result={result} />

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link href="/assessment" className="flex-1">
            <Button variant="outline" className="w-full">
              Retake Assessment
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button variant="ghost" className="w-full">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
