import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { saveSession, saveResult } from '@/lib/store';
import { buildDiagnosticResult } from '@/lib/result-router';
import type { Answer, AssessmentSession, CategoryScore } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { answers, categoryScores, leadName, leadEmail } = body as {
      answers: Answer[];
      categoryScores: CategoryScore[];
      leadName: string;
      leadEmail: string;
    };

    const sessionId = nanoid();
    const session: AssessmentSession = {
      id: sessionId,
      answers,
      leadEmail,
      leadName,
      completedAt: new Date().toISOString(),
      resultId: '',
    };

    const result = buildDiagnosticResult(session, categoryScores);
    session.resultId = result.id;

    await saveSession(session);
    await saveResult(result);

    return NextResponse.json({ resultId: result.id, sessionId });
  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
