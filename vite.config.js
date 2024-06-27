import { extname, relative, resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import { glob } from 'glob';

const outDir = resolve(__dirname, 'dist');
const publicDir = resolve(__dirname, 'public');

export default defineConfig({
  root: resolve('src'),
  publicDir,
  resolve: {
    alias: {
      '@public': publicDir,
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    sourcemap: process.env.__DEV__ === 'true',
    emptyOutDir: true,
    outDir,
    rollupOptions: {
      // Input mappings are provided as an object where the object key is the output path
      // to the file and the object value is the absolute path to the file.
      // {
      //   extension/foo: '/project/extension/foo/bar.js'
      // }
      // will result in the following output in dist:
      // /dist/extension/foo/bar.js
      input: Object.fromEntries(
        glob.sync('src/**/*.{ts,html}').map((file) => [
          // This will remove `src/` as well as the file extension from each
          // file, so e.g. src/nested/foo.js becomes nested/foo
          relative('src', file.slice(0, file.length - extname(file).length)),
          // This expands the relative paths to absolute paths, so e.g.
          // /src/nested/foo becomes /project/src/nested/foo.js
          fileURLToPath(new URL(file, import.meta.url)),
        ])
      ),
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
});
