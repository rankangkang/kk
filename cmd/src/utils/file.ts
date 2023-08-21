import fs from 'node:fs'

// 
export function existDir(dir: string) {
// 先查看是否exist
  const stat = fs.statSync(dir)

}