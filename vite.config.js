import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy'

const filename = fileURLToPath(import.meta.url);
const pathSegments = path.dirname(filename);

export default defineConfig({
  mode: process.env.NODE_ENV !== 'production' ? 'development' : 'production',
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: path.join(__dirname, 'src', `manifest.${process.env.NODE_ENV}.json`),
          dest: path.join(__dirname, 'extension'),
          rename: 'manifest.json'
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(pathSegments, './src'),
    },
    extensions: ['.mjs', '.js', '.json'],
  },
  build: {
    manifest: true,
    emptyOutDir: true,
    copyPublicDir: true,
    outDir: path.join(__dirname, 'extension'),
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, 'src/popup/popup.html'),
        options: path.resolve(__dirname, 'src/options/options.html'),
        devtools: path.resolve(__dirname, 'src/devtools/devtools.html'),
        content: path.resolve(__dirname, 'src/scripts/content.js'),
        background: path.resolve(__dirname, 'src/scripts/background.js'),
      },
      output: {
        entryFileNames: ({name, ...chunk}) => {
          
          if(name === 'popup' || name === 'options' || name === 'devtools')  {
            return 'src/[name]/[name].js'
          }

          return '[name].js'
        },
        // assetFileNames: '[name].js',
        // chunkFileNames: '[name].js'
      }
    }
  }
})