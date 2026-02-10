import { defineConfig } from 'vite'
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src/renderer',
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
  },
  plugins: [
    react(),
    electron({
      main: {
        entry: path.join(process.cwd(), 'src/main/main.ts'),
        vite: {
          build: {
            outDir: '../../dist-electron',

          },
        },
      },
      preload: {
        input: path.join(process.cwd(), 'src/preload/preload.ts'),
        vite: {
          build: {
            outDir: '../../dist-electron',

          },
        },
      },
      // 为渲染进程填充 Electron 和 Node.js API。
      // 如果你想在渲染进程中使用 Node.js，需要在主进程中启用 `nodeIntegration`。
      // 参见 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer: process.env.NODE_ENV === 'test'
        // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
        ? undefined
        : {},
    }),
  ],
})
