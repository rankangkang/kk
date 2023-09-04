import { exec } from 'node:child_process'

export function shellRun(scripts: string) {
  return new Promise((resolve, reject) => {
    exec(scripts, (err, stdout, stderr) => {
      if (err) {
        return reject(err)
      }
      if (stderr) {
        return reject(new Error(stderr))
      }
      return resolve(stdout)
    })
  })
}
