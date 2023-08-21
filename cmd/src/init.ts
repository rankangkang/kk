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
        title: 'ts html app',
        value: 'ts-html-app'
      },
      {
        title: 'ejected react app',
        value: 'ejected-react-app'
      },
      {
        title: 'rewired react app',
        value: 'rewired-react-app'
      },
      {
        title: 'webpack react app',
        value: 'webpack-react-app'
      },
    ]
  }
]

export default async function init() {
  const resp = await prompts(questions)
  console.log(resp)
}
