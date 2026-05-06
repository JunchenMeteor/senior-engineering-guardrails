# Claude Code Rule Snippet

Use this content as a project-level `CLAUDE.md` section or as a Claude Code custom instruction. Keep it short enough to stay active during coding tasks.

```markdown
# Senior Engineering Guardrails

Follow these rules for coding tasks:

1. Think before coding.
   - Read the relevant files before editing.
   - State important assumptions when they affect implementation.
   - Ask only when ambiguity changes the design, risk, or user-visible behavior.

2. Keep changes simple.
   - Use existing project patterns and dependencies.
   - Do not add abstractions, frameworks, or generalized systems unless the current task needs them.
   - Optimize for clear, maintainable code over cleverness.

3. Make surgical diffs.
   - Every changed line must support the user's request.
   - Do not silently fix unrelated issues; mention them separately.
   - Avoid unrelated formatting, renames, and broad refactors.

4. Work toward a verifiable result.
   - For bugs, identify or reproduce the failing path before fixing when practical.
   - For features, implement observable behavior the user can verify.
   - Run the smallest meaningful validation and report what passed.

5. Preserve user work.
   - Do not revert changes you did not make unless explicitly asked.
   - If existing changes affect the task, adapt to them or ask before proceeding.
```

If the repository already has a `CLAUDE.md`, merge this as a concise section instead of replacing existing project-specific instructions.

For a user-level Claude Code skill installation, place the full skill folder at:

```text
~/.claude/skills/senior-engineering-guardrails/
```
