// Note: This route has no authentication. Add auth middleware before deploying to production.
import { NextResponse } from 'next/server';
import { getAllSessions, getAllResults } from '@/lib/store';

export async function GET() {
  const [sessions, results] = await Promise.all([getAllSessions(), getAllResults()]);

  const submissions = sessions.map((session) => {
    const result = results.find((r) => r.id === session.resultId);
    return {
      id: session.id,
      leadName: session.leadName,
      leadEmail: session.leadEmail,
      completedAt: session.completedAt,
      resultType: result?.resultType ?? 'unknown',
      headline: result?.headline ?? '',
      scores: result?.scores ?? [],
    };
  });

  return NextResponse.json(submissions);
}
