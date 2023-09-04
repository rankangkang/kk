import * as esbuild from 'esbuild'

// const builds = ['index', 'kk'].map((entry) => {
//   const entryPoint = `src/${entry}.ts`
//   const outPoint = `bin/${entry}.cjs`
//   return esbuild.build({
//     bundle: true,
//     entryPoints: [entryPoint],
//     outfile: outPoint,
//     format: 'cjs',
//     platform: 'node',
//     target: 'node14',
//     plugins: [
//       {
//         name: 'alias',
//         setup({ onResolve, resolve }) {
//           onResolve(
//             { filter: /^prompts$/, namespace: 'file' },
//             async ({ importer, resolveDir }) => {
//               // we can always use non-transpiled code since we support 14.16.0+
//               const result = await resolve('prompts/lib/index.js', {
//                 importer,
//                 resolveDir,
//                 kind: 'import-statement',
//               })
//               return result
//             },
//           )
//         },
//       },
//     ],
//   })
// })

// await Promise.all(builds)

await esbuild.build({
  bundle: true,
  entryPoints: ['src/index.ts'],
  outdir: 'bin',
  outExtension: {
    '.js': '.cjs',
  },
  format: 'cjs',
  platform: 'node',
  target: 'node14',
  plugins: [
    {
      name: 'alias',
      setup({ onResolve, resolve }) {
        onResolve({ filter: /^prompts$/, namespace: 'file' }, async ({ importer, resolveDir }) => {
          // we can always use non-transpiled code since we support 14.16.0+
          const result = await resolve('prompts/lib/index.js', {
            importer,
            resolveDir,
            kind: 'import-statement',
          })
          return result
        })
      },
    },
  ],
})

console.log(chalk.green('✔ 编译成功'))
console.log()
