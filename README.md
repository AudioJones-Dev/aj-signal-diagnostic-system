# aj-signal-diagnostic-system
Audio Jones Diagnostic OS — a custom assessment and lead qualification engine that diagnoses whether a business is blocked by strategy, branding, marketing, or AI automation readiness.

## Purpose
Provide a structured diagnostic that converts unstructured business pain into a clear signal across four domains — strategy, branding, marketing, and AI automation readiness — and routes qualified leads accordingly.

## Current Status
Pre-implementation. The repository is in bootstrap: foundational docs and conventions only. No application stack, dependencies, or services have been chosen or wired up yet.

## Setup Placeholder
Stack and tooling are not yet selected. Once decided, this section will document:
- prerequisites (runtimes, package manager)
- install steps
- environment variables (see `.env.example` once added)
- local run / test / lint commands

## Repo Rules
- Never commit secrets, credentials, or `.env` files (`.env.example` is allowed).
- Keep changes small and scoped; prefer focused branches over large multi-purpose ones.
- Use clear commit messages that describe intent, not just diff.
- Do not run destructive git operations (force-push, hard reset, branch deletion) without explicit approval.
- Documentation lives under `docs/`. Do not scatter design notes at the repo root.

## Agent Workflow
AI agents (Claude Code, Codex, etc.) working in this repo must:
1. Inspect the repo state (`git status`, recent commits, relevant files) before editing.
2. Follow the rules in `CLAUDE.md`.
3. Work on a feature branch — never push directly to `main`.
4. Open a pull request using `.github/pull_request_template.md`.
5. Surface unknowns as `TODO: Confirm with owner` instead of inventing answers.

## Documentation Layout
All long-form documentation lives in `docs/`. See `docs/README.md` for the folder map. Planned subfolders:
- `docs/specs/` — product and feature specifications
- `docs/architecture/` — system design and component diagrams
- `docs/decisions/` — architecture decision records (ADRs)
- `docs/archive/` — superseded or historical documents retained for context
