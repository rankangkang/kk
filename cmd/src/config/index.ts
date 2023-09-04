interface TemplateOrStarter {
  title: string
  value: string
}

// export const reactTemplates: TemplateOrStarter[] = [
//   {
//     title: 'simple h5 app with ts and live-server',
//     value: 'ts-html-app',
//   },
//   {
//     title: 'customize react app',
//     value: 'rewired-react-app',
//   },
// ]
export const lockfiles = ['package-lock.json', 'pnpm-lock.yaml', 'yarn.lock']

export const starters: TemplateOrStarter[] = [
  {
    title: 'monorepo project starter with typescript',
    value: 'ts-monorepo-starter',
  },
  {
    title: 'libraries project starter for nodejs',
    value: 'node-lib-starter',
  },
  {
    title: 'libraries project starter for web',
    value: 'web-lib-starter',
  },
]
