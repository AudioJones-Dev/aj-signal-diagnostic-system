import { NextRequest, NextResponse } from 'next/server';
import { getAllSessions, getAllResults } from '@/lib/store';

// TODO: Replace with a proper authentication provider (e.g. NextAuth, Clerk) before production.
// Set ADMIN_SECRET in your environment to enable bearer-token protection.
function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return true; // No secret configured → open in local dev
  const auth = request.headers.get('authorization') ?? '';
  return auth === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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
