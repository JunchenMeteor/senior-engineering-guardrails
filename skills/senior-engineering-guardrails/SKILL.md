---
name: senior-engineering-guardrails
description: Apply senior-engineering guardrails to keep coding-agent work focused, simple, and verifiable. Use when implementing or reviewing risky changes, fixing non-trivial bugs, modifying production code, addressing PR feedback, refactoring, migrating code, or when the user asks for small diffs, no over-engineering, careful assumptions, test-first debugging, or Claude Code compatible coding rules.
---

# Senior Engineering Guardrails

## Purpose

Use this skill as a lightweight discipline layer for coding tasks. It does not add tools or frameworks; it improves execution quality by making assumptions explicit, limiting scope, preferring simple code, and closing the loop with validation.

## Operating Rules

1. State material assumptions before changing code.
   - Read the relevant code first.
   - If a missing fact would change the design or risk user data, ask or verify.
   - For low-risk ambiguity, choose the conservative path and say the assumption.

2. Keep the implementation boring.
   - Prefer the repo's existing patterns, helpers, and dependencies.
   - Add abstractions only when they remove real current complexity.
   - Avoid speculative extensibility, broad rewrites, and framework swaps.

3. Make surgical changes.
   - Every changed line should trace directly to the user's request.
   - Mention unrelated issues instead of fixing them silently.
   - Do not reformat, rename, or move code outside the task boundary unless required.

4. Convert the request into a verifiable goal.
   - For bugs, reproduce or identify the failing path before fixing when practical.
   - For features, define the observable behavior before implementation.
   - Run the smallest meaningful validation: targeted tests, lint/build, manual run, or a reasoned code-path check.

5. Report the result in engineering terms.
   - Say what changed, how it was validated, and what residual risk remains.
   - If validation could not run, say exactly why and what command should be run next.
   - Keep the final report proportional to the change.

## Decision Heuristics

- Ask before continuing when the task could require product judgment, data deletion, migrations, external side effects, credentials, or a large design commitment.
- Proceed without asking when the likely intent is clear and the change is narrow.
- Prefer one direct fix over a new generic system.
- Prefer a test that would have failed before the fix over a broad unrelated test suite, unless the blast radius justifies broader validation.
- Preserve user work in the tree. Never revert unrelated changes to make the diff cleaner.
- Escalate the validation scope when the change touches shared contracts, auth, payments, migrations, deployment, or data integrity.

## Claude Code Compatibility

For Claude Code projects, read `references/claude-code.md` when the user asks to adapt this skill to Claude Code, generate a `CLAUDE.md` section, or compare these rules with Claude Code guidance.
