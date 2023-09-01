import prompts from "prompts";
import path from "node:path";
import createDebug from "debug";
import chalk from "chalk";
import { dirExist, copyDir } from "./utils/file.js";
import { injectPackageJson } from "./utils/json.js";
import { libraryStarters } from "./config/index.js";

const debug = createDebug("cmd:create:lib");

const questions: prompts.PromptObject[] = [
  {
    type: "text",
    name: "lib",
    message: "What's your lib name",
    initial: "my-lib",
    validate: (val) => val && val.trim().length > 0,
  },
  {
    type: "select",
    name: "starter",
    message: "Select a starter",
    choices: [...libraryStarters],
  },
];

export default async function createStarter(...args: any[]) {
  return await create();
}

// 未传递参数，直接创建，让用户选择参数
export async function create() {
  console.log();
  const { lib, starter } = await prompts(questions);
  console.log();
  await createWithArgs(lib, starter);
}

// 传递参数创建
export async function createWithArgs(lib: string, starter: string) {
  // 产物目录
  const outputDir = path.resolve(process.cwd(), lib);
  if (await dirExist(outputDir)) {
    // 目标目录已存在，报错
    throw new Error(`目录 ${outputDir} 已存在`);
  }

  // 模板目录
  const starterDir = path.resolve(__dirname, "../templates", starter);
  // 模板不存在，报错
  if (!(await dirExist(starterDir))) {
    throw new Error(`模板 ${starter.replace("-", " ")} 不存在`);
  }

  debug("starterDir: %s, outputDir: %s", starterDir, outputDir);

  // 复制文件
  await copyDir(starterDir, outputDir);
  console.log(chalk.green("✔ 模板复制成功"));

  await injectPackageJson(outputDir, { name: lib });
  console.log(chalk.green("✔ 包名注入成功"));
  console.log();
  console.log(chalk.greenBright("✅ success!"));
  console.log();
  console.log(chalk.greenBright("🚀 Ready to code!"));
  console.log(
    chalk.blueBright(`
👉 cd ${lib}
👉 npm i
  `),
  );
  console.log();
}
