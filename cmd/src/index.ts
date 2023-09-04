#!/usr/bin/env node

import process from 'node:process'
import fs from 'node:fs'
import path from 'node:path'
import chalk from 'chalk'
import { Command } from 'commander'
import createStarter from './createStarter.js'

const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json')).toString())

const program = new Command()

program
  .name('kk')
  .description("😄 kk's simple cli to create commonly used templates.")
  .version(pkg.version, '-v, --version')
  // create-kk
  .action(async () => {
    await createStarter()
  })

program
  .command('create')
  .description(
    `
create template of different types, eg:
👉 ${chalk.greenBright('kk create react')}
👉 ${chalk.greenBright('kk create vue')}
👉 ${chalk.greenBright('kk create lib')}
...
  `,
  )
  // -t 参数，目前只有starter模板，故注释掉
  // .option('-t --type [type]', 'type to create', 'starter')
  .action(async (args) => {
    // create others
    await createStarter()
  })

program.parse(process.argv)

function sighandle() {
  console.log(chalk.greenBright('👋 bye bye ~'))
  process.exit(0)
}

process
  .on('SIGINT', sighandle)
  .on('SIGTERM', sighandle)
  .on('SIGBREAK', sighandle)
  .on('SIGUSR1', sighandle)

// 捕获错误
process.on('uncaughtException', (err, origin) => {
  console.error(chalk.red(`📢 出错了 👇`))
  console.error(`❌ ${chalk.redBright(origin)}: ${chalk.redBright(err.message)}`)
  console.error(`🐛 ${chalk.red(err.stack)}`)
  console.log()
})
