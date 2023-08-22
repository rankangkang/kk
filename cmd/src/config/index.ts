interface TemplateOrStarter {
  title: string
  value: string
}

export const reactTemplates: TemplateOrStarter[] = [
  {
    title: 'simple h5 app with ts and live-server',
    value: 'ts-html-app'
  },
  {
    title: 'customize react app',
    value: 'rewired-react-app'
  },
]

export const libraryStarters: TemplateOrStarter[] = [
  {
    title: 'develop libraries for web app',
    value: 'web-lib-starter'
  },
]
