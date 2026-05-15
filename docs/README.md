# Documentation

All long-form documentation for this repository lives here. Keep design notes, specs, and decisions out of the repo root.

## Folder layout

- `docs/specs/` — product requirements and feature specifications. One file per spec; name files in kebab-case.
- `docs/architecture/` — system design, component diagrams, data flow, integration boundaries.
- `docs/decisions/` — architecture decision records (ADRs). One file per decision; numbered chronologically (e.g. `0001-record-architecture-decisions.md`).
- `docs/archive/` — superseded or historical documents retained for context. Do not delete outdated docs; move them here.

## Conventions

- Write in plain Markdown.
- Prefer short, durable docs over long, speculative ones.
- Mark unresolved questions as `TODO: Confirm with owner`.
- When a doc is replaced, move the old version into `docs/archive/` and link the replacement.
