#!/usr/bin/env node
'use strict'
const readline = require('readline')

const LANG = (process.env.LANG || process.env.LC_ALL || '').toLowerCase().includes('zh') ||
  (process.env.MENU_LANG || '').toLowerCase() === 'zh' ? 'zh' : 'en'

const ITEMS = {
  zh: [
    'Pre-commit review — 提交前检查变更',
    'Bug fix — 测试优先的 debug 流程',
    'Feature — 最小范围实现新功能',
    'PR feedback — 安全应用 PR 评审意见',
    'Refactor — 不改行为的重构',
    'Background mode — 对整个会话应用这些规则',
    '其他（手动输入）',
  ],
  en: [
    'Pre-commit review — check a change before committing',
    'Bug fix — test-first debug workflow',
    'Feature — minimal-scope implementation',
    'PR feedback — apply review comments safely',
    'Refactor — behavior-preserving cleanup',
    'Background mode — apply rules to the whole session',
    'Other (type manually)',
  ],
}

const PROMPT = { zh: '需要哪种 guardrail？', en: 'Which guardrail do you need?' }
const OTHER_PROMPT = { zh: '请描述你的任务：', en: 'Describe your task: ' }
const HINT = { zh: '（↑↓ 移动，Enter 确认，Ctrl+C 退出）', en: '(↑↓ to move, Enter to confirm, Ctrl+C to exit)' }

const items = ITEMS[LANG]
let selected = 0

function render() {
  process.stdout.write('\x1B[2J\x1B[0f')
  console.log(`${PROMPT[LANG]}\n${HINT[LANG]}\n`)
  items.forEach((s, i) => {
    process.stdout.write(i === selected ? `\x1B[36m❯ ${s}\x1B[0m\n` : `  ${s}\n`)
  })
}

function promptOther() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  if (process.stdin.isTTY) process.stdin.setRawMode(false)
  rl.question(`\n${OTHER_PROMPT[LANG]}`, answer => {
    rl.close()
    process.stdout.write(`\n${answer}\n`)
    process.exit(0)
  })
}

if (!process.stdin.isTTY) {
  console.log(`${PROMPT[LANG]}\n`)
  items.forEach((s, i) => console.log(`${i + 1}. ${s}`))
  process.exit(0)
}

render()
readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

process.stdin.on('keypress', (_, key) => {
  if (!key) return
  if (key.name === 'up') { selected = (selected - 1 + items.length) % items.length; render() }
  else if (key.name === 'down') { selected = (selected + 1) % items.length; render() }
  else if (key.name === 'return') {
    if (selected === items.length - 1) { promptOther() }
    else { process.stdout.write(`\n${items[selected]}\n`); process.exit(0) }
  }
  else if (key.ctrl && key.name === 'c') process.exit(1)
})
