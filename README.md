# Senior Engineering Guardrails

A small skill for coding agents that keeps implementation work focused, simple, and verifiable.

This is not a framework, code generator, or automation tool. It is a discipline layer for agents such as Codex, Claude Code, and other tools that support skill or instruction files.

## What It Does

- Makes important assumptions explicit before code changes.
- Prefers existing project patterns and boring implementation choices.
- Keeps diffs surgical and tied to the user's request.
- Turns bugs and features into verifiable goals.
- Reports changes, validation, and residual risk clearly.

## When To Use It

Use this skill for:

- Non-trivial bug fixes
- Production code changes
- PR feedback
- Refactors and migrations
- High-risk code paths such as auth, billing, deployment, data integrity, or permissions
- Requests that mention small diffs, no over-engineering, careful assumptions, or test-first debugging

For tiny mechanical edits, this skill may be unnecessary.

## Codex Installation

Copy the skill folder into your Codex skills directory:

```powershell
Copy-Item -Recurse .\skills\senior-engineering-guardrails "$env:USERPROFILE\.codex\skills\"
```

Then invoke it explicitly when useful:

```text
Use $senior-engineering-guardrails to keep this change focused and verifiable.
```

## Claude Code Installation

For Claude Code user-level skills, copy the same folder into:

```powershell
Copy-Item -Recurse .\skills\senior-engineering-guardrails "$env:USERPROFILE\.claude\skills\"
```

If your workflow relies on project-level `CLAUDE.md`, merge the snippet from:

```text
skills/senior-engineering-guardrails/references/claude-code.md
```

Do not replace an existing `CLAUDE.md`; add the guardrails as a concise section.

## Repository Layout

```text
skills/
  senior-engineering-guardrails/
    SKILL.md
    agents/
      openai.yaml
    references/
      claude-code.md
```

## Design Notes

The skill is intentionally short. Agent instructions compete for context, so this package avoids long philosophy, broad coding standards, and repo-specific opinions. It focuses on behaviors that generalize across codebases:

- clarify material assumptions
- implement the smallest sufficient change
- avoid unrelated cleanup
- validate the observable outcome
- preserve user work

## License

MIT
