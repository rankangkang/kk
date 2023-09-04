import { shellRun } from './shell.js'

export async function checkPnpm() {
  try {
    await shellRun('pnpm --version')
    return true
  } catch (error) {
    return false
  }
}
