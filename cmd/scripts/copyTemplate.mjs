#!/usr/bin/env zx

// 从 templates 文件夹复制文件
import 'zx/globals'
import copydir from 'copy-dir'
import ora from 'ora'

// 在构建前复制文件夹，一般 cwd 为 cmd 目录
// 1. 进入 templates 目录，拉取最新的代码
// 2. copy-dir 复制文件夹至 template 文件夹
// 3. 递归移除 .git 文件

const sourceDir = path.resolve(__dirname, '..', '..', 'templates')
const targetDir = path.resolve(__dirname, '..', 'template')

console.log('👉 source dir:', sourceDir)
console.log('👉 target dir:', targetDir)

await $`npx rimraf ${targetDir}`
await fs.mkdirp(targetDir)

cd(sourceDir)

const sp1 = ora('从 github 拉取模板代码')
sp1.start('拉取中...\n')

// 拉取所有代码
await $`git submodule update --init --recursive`

sp1.succeed('拉取成功')

const sp2 = ora('复制模板模板')
sp2.start('开始复制')

// 复制文件，不复制 .git 文件
copydir.sync(sourceDir, targetDir, {
  filter: (stat, _filepath, filename) => {
    if (stat === 'directory' && filename === '.git') {
      return false
    }
    return true
  },
})

sp2.succeed('复制完成')
