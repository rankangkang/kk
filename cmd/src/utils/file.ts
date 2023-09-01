import copydir from "copy-dir";
import fs from "node:fs/promises";
import path from "node:path";

// 递归创建目标目录结构，不存在时，先创建其父目录
export async function mkdirp(name: string) {
  try {
    await fs.mkdir(name, { recursive: true });
  } catch (error) {
    await (async function makeDir(dir: string) {
      const child = dir;
      if (await dirExist(child)) {
        return true;
      }
      // 获取父目录
      const parent = path.dirname(child);
      // 创建父目录
      await makeDir(parent);
      // 创建目标目录
      await fs.mkdir(child);
    })(name);
  }
}

export async function copyDir(from: string, to: string, options = {}) {
  await mkdirp(to);
  copydir.sync(from, to, options);
}

export async function pathExist(name: string) {
  try {
    await fs.access(name, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}

export async function dirExist(name: string) {
  const bPathExist = await pathExist(name);
  if (!bPathExist) {
    return false;
  }

  const stat = await fs.stat(name);
  if (!stat.isDirectory()) {
    return false;
  }

  return true;
}

export async function fileExist(name: string) {
  const bPathExist = await pathExist(name);
  if (!bPathExist) {
    return false;
  }

  const stat = await fs.stat(name);
  if (!stat.isFile()) {
    return false;
  }

  return true;
}
