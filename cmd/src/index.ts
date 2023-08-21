#!/usr/bin/env node

// TODO: 1. 收集选项（交互）
// TODO: 2. 目录复制
// TODO: 3. 依赖安装
// TODO: 3. 依赖安装

// 使用纯ts编写

import { Command } from 'commander'

const { default: pkg } = await import('../package.json', { assert: { type: 'json' } })
import init from './init.js'

const program = new Command()

program
  .name('kk')
  .description("kk's simple cli to create commonly used templates.")
  .version(pkg.version, '-v, --version')

program
  .command('init <name>')
  .action(async (name) => {
    console.log('init ===>', name)
    // TODO: prompt 创建
    await init()
  })

program.parse()
