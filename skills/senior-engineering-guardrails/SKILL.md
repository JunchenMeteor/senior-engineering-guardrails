---
name: senior-engineering-guardrails
description: Apply senior-engineering guardrails to keep coding-agent work focused, simple, and verifiable. Use when implementing or reviewing risky changes, fixing non-trivial bugs, modifying production code, addressing PR feedback, refactoring, migrating code, or when the user asks for small diffs, no over-engineering, careful assumptions, test-first debugging, or Claude Code compatible coding rules.
---

# Senior Engineering Guardrails

## Entry Gate

触发此 skill 且没有明确任务时，先确定用户需要哪种 guardrail。

按以下优先级选择交互方式：

1. **有 Bash 工具且 Node.js 可用**：执行 `node scripts/menu.js`，读取输出后继续。
2. **Claude Code UI**：调用 `AskUserQuestion` 展示选项。
3. **纯对话环境**：输出以下文本菜单，等待用户回复数字或关键词：

```
需要哪种 guardrail？/ Which guardrail do you need?

1. Pre-commit review — 提交前检查变更 / check a change before committing
2. Bug fix — 测试优先的 debug 流程 / test-first debug workflow
3. Feature — 最小范围实现新功能 / minimal-scope implementation
4. PR feedback — 安全应用 PR 评审意见 / apply review comments safely
5. Refactor — 不改行为的重构 / behavior-preserving cleanup
6. Background mode — 对整个会话应用这些规则 / apply rules to the whole session
7. 其他 / Other (describe freely)
```

如果用户触发时已说清楚任务，跳过菜单直接执行。

## Step Closure

每步完成后，AI 必须：

1. 说明做了什么、验证了什么、残余风险是什么（1-2 句）
2. 等待用户指令，不自动继续

用户可以：
- 说"重来"/"redo" → 询问哪里不满意，重新执行当前步骤
- 说"回到菜单"/"menu" → 重新走 Entry Gate

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
