#!/usr/bin/env node

import process from "node:process";
import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";
import { Command } from "commander";
import creatReact from "./createReact.js";
import creatLib from "./createLib.js";

// const { default: pkg } = await import('../package.json', { assert: { type: 'json' } })
const pkg = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../package.json")).toString(),
);

const program = new Command();

program
  .name("kk")
  .description("😄 kk's simple cli to create commonly used templates.")
  .version(pkg.version, "-v, --version");

program
  .command("create <type>")
  .description(
    `
create template of different types, eg:
👉 ${chalk.greenBright("kk create react")}
👉 ${chalk.greenBright("kk create vue")}
👉 ${chalk.greenBright("kk create lib")}
...
  `,
  )
  .action(async (type) => {
    if (type === "react") {
      return await creatReact();
    }

    if (type === "lib") {
      return await creatLib();
    }

    console.log(chalk.yellow("📢 没有匹配的指令"));
    console.log();
  });

program.parse();

// 捕获错误
process.on("uncaughtException", (err, origin) => {
  console.error(chalk.red(`📢 出错了 👇`));
  console.error(
    `❌ ${chalk.redBright(origin)}: ${chalk.redBright(err.message)}`,
  );
  console.error(`🐛 ${chalk.red(err.stack)}`);
  console.log();
});
