import path from "node:path"
import fs from 'node:fs/promises'

export async function injectPackageJson(dir: string, obj2Inject: Record<string, any>) {
  const pkgJsonPath = path.resolve(dir, 'package.json')
  let content = (await fs.readFile(pkgJsonPath)).toString()
  let jsonObj = JSON.parse(content)
  jsonObj = Object.assign({}, { ...obj2Inject }, jsonObj)
  content = JSON.stringify(jsonObj, null, '  ')
  await fs.writeFile(pkgJsonPath, Buffer.from(content))
}