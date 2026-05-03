/**
 * In-memory store using Map singletons.
 * 
 * To swap for Supabase:
 *   import { createClient } from '@supabase/supabase-js'
 *   const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
 *   Replace each function body with Supabase queries.
 * 
 * To swap for Cloudflare D1:
 *   Use the D1 binding from the Cloudflare Workers environment.
 *   Replace each function body with D1 SQL queries.
 * 
 * Note: This in-memory store resets on server restart. Use a persistent store in production.
 */

import type { AssessmentSession, DiagnosticResult } from './types';

const sessions = new Map<string, AssessmentSession>();
const results = new Map<string, DiagnosticResult>();

export async function saveSession(session: AssessmentSession): Promise<string> {
  sessions.set(session.id, session);
  return session.id;
}

export async function getSession(id: string): Promise<AssessmentSession | null> {
  return sessions.get(id) ?? null;
}

export async function getAllSessions(): Promise<AssessmentSession[]> {
  return Array.from(sessions.values());
}

export async function saveResult(result: DiagnosticResult): Promise<void> {
  results.set(result.id, result);
}

export async function getResult(id: string): Promise<DiagnosticResult | null> {
  return results.get(id) ?? null;
}

export async function getAllResults(): Promise<DiagnosticResult[]> {
  return Array.from(results.values());
}
