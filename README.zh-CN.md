# Senior Engineering Guardrails

[English](README.md)

一个面向编程 Agent 的小型 skill，用来让代码实现过程更聚焦、更简单、更容易验证。

它不是框架、代码生成器，也不是自动化工具。它是一组工程纪律规则，适用于 Codex、Claude Code，以及其他支持 skill 或指令文件的 Agent 工具。

## 它解决什么问题

- 在修改代码前明确关键假设。
- 优先沿用项目已有模式和朴素实现。
- 让代码变更保持小而聚焦，只服务于用户请求。
- 把 bug 修复和功能开发转成可验证目标。
- 清楚说明改了什么、如何验证、还有哪些剩余风险。

## 什么时候使用

适合在这些场景使用：

- 需要分析原因的 bug 修复
- 生产代码修改
- PR 反馈处理
- 重构和迁移
- 高风险路径，例如认证、账单、部署、数据完整性或权限
- 用户明确要求小改动、不要过度设计、谨慎处理假设或测试优先调试

如果只是非常小的机械修改，这个 skill 可能用不上。

## Codex 安装

把 skill 文件夹复制到 Codex 的 skills 目录：

```powershell
Copy-Item -Recurse .\skills\senior-engineering-guardrails "$env:USERPROFILE\.codex\skills\"
```

需要时显式调用：

```text
Use $senior-engineering-guardrails to keep this change focused and verifiable.
```

## Claude Code 安装

Claude Code 用户级 skills 可以复制到：

```powershell
Copy-Item -Recurse .\skills\senior-engineering-guardrails "$env:USERPROFILE\.claude\skills\"
```

如果你的工作流依赖项目级 `CLAUDE.md`，可以把下面文件里的片段合并进去：

```text
skills/senior-engineering-guardrails/references/claude-code.md
```

不要直接替换已有的 `CLAUDE.md`；建议作为一个简短章节追加进去，保留项目原有规则。

## 仓库结构

```text
skills/
  senior-engineering-guardrails/
    SKILL.md
    agents/
      openai.yaml
    references/
      claude-code.md
```

## 设计原则

这个 skill 有意保持短小。Agent 指令会占用上下文，所以这个包避免长篇理念、宽泛编码规范和项目特定偏好，只保留能跨代码库复用的行为准则：

- 明确关键假设
- 实现足够小的有效改动
- 避免无关清理
- 验证可观察结果
- 保留用户已有工作

## 许可证

MIT
