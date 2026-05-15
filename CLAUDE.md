# CLAUDE.md

Operating instructions for Claude Code (and other AI coding agents) working in this repository.

## Safety rules

- **Inspect before editing.** Read the relevant files and run `git status` before making changes. Never edit blind.
- **Check git state before changes.** Confirm the working tree is in a known state and you are on the intended branch.
- **Never expose secrets.** Do not print, log, or echo environment values, API keys, tokens, or credentials in chat, code, or commit messages.
- **Never commit `.env` files.** Only `.env.example` (with placeholder values) is permitted in version control.
- **No destructive commands without approval.** Do not run `git reset --hard`, `git push --force`, `git clean -fd`, `rm -rf`, branch deletion, or anything that rewrites or discards history without explicit user confirmation.
- **Keep docs in `docs/`.** Long-form documentation belongs under `docs/<subfolder>/`, not at the repo root.
- **Small branches, clear commits.** One concern per branch. Commit messages should describe intent ("why"), not just the diff.

## Working conventions

- Prefer editing existing files over creating new ones.
- Do not install dependencies or introduce a stack without an explicit decision recorded in `docs/decisions/`.
- Mark anything you cannot verify from repo evidence as `TODO: Confirm with owner` rather than guessing.
- Surface risks and ambiguity early; ask before taking irreversible action.

## Branching

- Never push directly to `main`.
- Use descriptive branch names (e.g. `chore/...`, `feat/...`, `fix/...`, `docs/...`).
- Open a pull request using `.github/pull_request_template.md` and complete the checklist before requesting review.
