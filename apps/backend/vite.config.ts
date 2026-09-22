import path from 'path';

import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';

import { builtinModules } from 'node:module';
import replace from '@rollup/plugin-replace';

function addDirnameGlobals() {
  return {
    name: 'add-dirname-globals',
    generateBundle(options: any, bundle: Record<string, any>) {
      for (const [fileName, fileInfo] of Object.entries(bundle)) {
        if (fileName.endsWith('.js') && fileInfo.type === 'chunk') {
          // Добавляем импорты в начало файла
          const imports = `import { fileURLToPath } from 'url';\nimport { dirname } from 'path';\nconst __filename = fileURLToPath(import.meta.url);\nconst __dirname = dirname(__filename);\n\n`;
          fileInfo.code = imports + fileInfo.code;
        }
      }
    }
  };
}

export default defineConfig({
  plugins: [
    checker({
      typescript: true,
    }),
    replace({
      preventAssignment: true,
      values: {
        '__dirname': '__dirname',
      }
    }),
    addDirnameGlobals(),
  ],
  build: {
    target: 'node22',
    outDir: path.resolve(__dirname, './dist'),
    emptyOutDir: true,
    ssr: true,
    rollupOptions: {
      input: 'src/server.ts',
      external: [...builtinModules, /^node:/],
      output: {
        format: 'esm',
        entryFileNames: '[name].js'
      }
    },
    minify: true,
    sourcemap: true,
    copyPublicDir: false,
  },
  optimizeDeps: {
    disabled: false,
  },
  ssr: {
    noExternal: true,
    target: 'node',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});