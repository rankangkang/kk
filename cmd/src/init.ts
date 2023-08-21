// init 创建模板
import prompts from 'prompts'

const questions: prompts.PromptObject[] = [
  {
    type: 'text',
    name: 'project',
    message: 'What is your project name'
  },
  {
    type: 'select',
    name: 'end',
    message: 'select a template to start',
    choices: [
      {
        title: 'nodejs',
        value: 'nodejs'
      },
      {
        title: 'web',
        value: 'web'
      }
    ]
  }
]

export default async function init() {
  const resp = await prompts(questions)
  console.log(resp)
}
