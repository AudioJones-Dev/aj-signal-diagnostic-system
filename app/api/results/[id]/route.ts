import { NextRequest, NextResponse } from 'next/server';
import { getResult } from '@/lib/store';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const result = await getResult(params.id);
  if (!result) {
    return NextResponse.json({ error: 'Result not found' }, { status: 404 });
  }
  return NextResponse.json(result);
}
