import prompts from 'prompts'
import path from 'node:path'
import createDebug from 'debug'
import { fileURLToPath } from 'node:url'
import chalk from 'chalk'
import { dirExist, copyDir } from './utils/file.js'
import { injectPackageJson } from './utils/json.js'
import { reactTemplates } from './config/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const debug = createDebug('cmd:init')

const questions: prompts.PromptObject[] = [
  {
    type: 'text',
    name: 'project',
    message: "What's your project name",
    initial: 'react-demo',
    validate: (val) => val && val.trim().length > 0
  },
  {
    type: 'select',
    name: 'template',
    message: 'Select a template',
    choices: [...reactTemplates]
  }
]

export default async function createReact(...args: any[]) {
  return await create()
}

// 未传递参数，直接创建，让用户选择参数
export async function create() {
  const { project, template } = await prompts(questions)
  await createWithArgs(project, template)
}

// 传递参数创建
export async function createWithArgs(project: string, template: string) {
  // 产物目录
  const outputDir = path.resolve(process.cwd(), project)
  if (await dirExist(outputDir)) {
    // 目标目录已存在，报错
    throw new Error(`目录 ${outputDir} 已存在`)
  }

  // 模板目录
  const templateDir = path.resolve(__dirname, '../templates', template)
  // 模板不存在，报错
  if (!(await dirExist(templateDir))) {
    throw new Error(`模板 ${template.replace('-', ' ')} 不存在`)
  }

  debug('templateDir: %s, outputDir: %s', templateDir, outputDir)

  // 复制文件
  await copyDir(templateDir, outputDir)
  console.log(chalk.green('✔ 模板复制成功'))

  await injectPackageJson(outputDir, { name: project })
  console.log(chalk.green('✔ 包名注入成功'))

  console.log(chalk.green('😄 模板创建成功'))
}
