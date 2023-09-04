import prompts from 'prompts'
import path from 'node:path'
import createDebug from 'debug'
import chalk from 'chalk'
import { dirExist, copyDir } from './utils/file.js'
import { injectPackageJson } from './utils/json.js'
import { lockfiles, starters } from './config/index.js'
import { checkPnpm } from './utils/pm.js'
import { shellRun } from './utils/shell.js'
import ora from 'ora'

const debug = createDebug('cmd:create:name')

const questions: prompts.PromptObject[] = [
  {
    type: 'text',
    name: 'name',
    message: "What's your project name",
    initial: 'demo',
    validate: (val) => val && val.trim().length > 0,
  },
  {
    type: 'select',
    name: 'starter',
    message: 'Select a starter',
    choices: [...starters],
  },
]

export default async function createStarter(...args: any[]) {
  return await create()
}

// 未传递参数，直接创建，让用户选择参数
export async function create() {
  console.log()
  const { name, starter } = await prompts(questions)
  console.log()
  await createWithArgs(name, starter)
}

// 传递参数创建
export async function createWithArgs(name: string, starter: string) {
  // 产物目录
  const outputDir = path.resolve(process.cwd(), name)
  if (await dirExist(outputDir)) {
    // 目标目录已存在，报错
    throw new Error(`目录 ${outputDir} 已存在`)
  }

  // 模板目录
  const starterDir = path.resolve(__dirname, '../template', starter)
  // 模板不存在，报错
  if (!(await dirExist(starterDir))) {
    throw new Error(`模板 ${starter.replace('-', ' ')} 不存在`)
  }

  debug('starterDir: %s, outputDir: %s', starterDir, outputDir)

  // 复制文件
  await copyDir(starterDir, outputDir, {
    filter: (stat, _filepath, filename) => {
      if (stat === 'file' && lockfiles.includes(filename)) {
        return false
      }
      return true
    },
  })
  console.log(chalk.green('✔ 模板复制成功'))

  await injectPackageJson(outputDir, { name })
  console.log(chalk.green('✔ 包名注入成功'))
  console.log()

  // 进入目录，执行安装指令
  const userPnpmInstalled = await checkPnpm()
  if (!userPnpmInstalled) {
    console.warn(
      chalk.bgYellow(
        'This repository requires using pnpm as the package manager for scripts to work properly.',
      ),
    )

    return console.log(
      chalk.yellowBright(`
👉 npm install pnpm -g
👉 cd ${name}
👉 pnpm i
    `),
    )
  }

  const loading = ora('开始安装依赖')
  loading.start('安装中')
  try {
    // 使用 pnpm 安装依赖
    await shellRun(`
cd ${outputDir}
pnpm i
    `)
  } catch (error) {
    loading.fail('安装失败')
    return console.log(chalk.red((error as Error).message))
  }

  loading.succeed(chalk.green('安装完成'))
  console.log()
  console.log(chalk.greenBright('🚀 Ready to code!'))
  console.log(
    chalk.blueBright(`
👉 cd ${name}
👉 code .
  `),
  )
  console.log()
}
