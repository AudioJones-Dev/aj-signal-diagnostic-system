# Audio Jones Signal Diagnostic OS

A Next.js 14 App Router application that helps businesses identify their growth bottleneck across four domains: Strategy, Brand, Marketing, and AI Readiness.

## Overview

The Signal Diagnostic System guides users through a 20-question branching assessment, then delivers a personalized diagnostic report with a specific recommended service.

**Five possible diagnostic outcomes:**
- **Strategy Misalignment** — Goals, ICP, or revenue model are unclear
- **Brand Misalignment** — Strategy is set but messaging isn't converting
- **Marketing Gap** — Foundation built but no reliable lead system
- **AI Readiness Gap** — AI could help but systems aren't ready
- **AI Scaling Candidate** — Ready to automate and scale

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **ID Generation**: nanoid@3
- **Store**: In-memory Map (swap-ready for Supabase or Cloudflare D1)

## Project Structure

```
app/
  page.tsx                      # Landing page
  assessment/page.tsx           # Assessment flow
  results/[id]/page.tsx         # Diagnostic results
  admin/submissions/page.tsx    # Admin submissions table
  api/
    assessment/submit/route.ts  # POST: submit assessment
    results/[id]/route.ts       # GET: fetch result by ID
    admin/submissions/route.ts  # GET: all submissions

components/
  ui/                           # Button, Card, ProgressBar, Badge
  assessment/                   # QuestionCard, LeadCaptureForm
  results/                      # ResultCard, RecommendationCard

lib/
  types.ts                      # TypeScript interfaces
  scoring.ts                    # Category score calculation
  decision-engine.ts            # Branching logic
  result-router.ts              # Result type determination
  store.ts                      # In-memory data store

schema/
  questions.json                # 20 assessment questions
  scoring-rules.json            # Priority-ordered scoring rules
```

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # ESLint
```

## Database Migration

The in-memory store in `lib/store.ts` resets on server restart. See the comments in that file for how to swap in Supabase or Cloudflare D1.

## Admin

Visit `/admin/submissions` to view all completed assessments. Add authentication middleware before deploying to production.

