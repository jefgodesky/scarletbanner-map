import { defineConfig } from 'vite'
import { resolve } from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    },
  },
  plugins: [
    createHtmlPlugin({
      inject: {
        data: {
          injectScript: process.env.NODE_ENV === 'production'
            ? `<script type="module" src="src/index.js"></script>`
            : `<script type="module" src="src/index.ts"></script>`
        }
      }
    })
  ],
  server: {
    open: true,
  }
})
