'use client';

import { useEffect, useState } from 'react';
import { ResultType } from '@/lib/types';

// This page fetches from /api/admin/submissions which is protected by ADMIN_SECRET bearer token
// when the env var is set. Add a proper auth provider (NextAuth, Clerk) before production.

interface Submission {
  id: string;
  leadName: string;
  leadEmail: string;
  completedAt: string;
  resultType: ResultType | 'unknown';
  headline: string;
  scores: { category: string; percentage: number }[];
}

const resultTypeLabels: Record<string, string> = {
  strategy_misalignment: 'Strategy Gap',
  brand_misalignment: 'Brand Gap',
  marketing_gap: 'Marketing Gap',
  ai_readiness_gap: 'AI Readiness Gap',
  ai_scaling_candidate: 'AI Ready',
  unknown: 'Unknown',
};

const resultTypeColors: Record<string, string> = {
  strategy_misalignment: 'text-[#a3a3a3] bg-[#2a2a2a]',
  brand_misalignment: 'text-secondary bg-secondary/10',
  marketing_gap: 'text-primary bg-primary/10',
  ai_readiness_gap: 'text-[#a3a3a3] bg-[#2a2a2a]',
  ai_scaling_candidate: 'text-success bg-success/10',
  unknown: 'text-[#555] bg-[#1a1a1a]',
};

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/submissions')
      .then((res) => res.json())
      .then((data) => {
        setSubmissions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#f5f5f5] mb-1">
            Diagnostic Submissions
          </h1>
          <p className="text-[#a3a3a3] text-sm">
            {submissions.length} total submission{submissions.length !== 1 ? 's' : ''}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-20 text-[#555]">
            <p className="text-4xl mb-4">📭</p>
            <p>No submissions yet.</p>
          </div>
        ) : (
          <div className="bg-[#111] border border-[#2a2a2a] rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2a2a2a] bg-[#1a1a1a]">
                  <th className="text-left px-4 py-3 text-[#a3a3a3] font-medium">Name</th>
                  <th className="text-left px-4 py-3 text-[#a3a3a3] font-medium">Email</th>
                  <th className="text-left px-4 py-3 text-[#a3a3a3] font-medium">Result</th>
                  <th className="text-left px-4 py-3 text-[#a3a3a3] font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub, i) => (
                  <tr
                    key={sub.id}
                    className={`border-b border-[#2a2a2a] hover:bg-[#1a1a1a] transition-colors ${
                      i % 2 === 0 ? '' : 'bg-[#0d0d0d]'
                    }`}
                  >
                    <td className="px-4 py-3 text-[#f5f5f5] font-medium">
                      {sub.leadName}
                    </td>
                    <td className="px-4 py-3 text-[#a3a3a3]">{sub.leadEmail}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                          resultTypeColors[sub.resultType]
                        }`}
                      >
                        {resultTypeLabels[sub.resultType]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#555]">
                      {new Date(sub.completedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
