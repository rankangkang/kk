import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true
    }),
  ],
  build: {
    sourcemap: false,
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: '@cmkk/kk',
      formats: ['cjs'],
      fileName: (format) => `kk.js`,
    },
    rollupOptions: {
      external: [],
      output: {},
    },
  },
});
