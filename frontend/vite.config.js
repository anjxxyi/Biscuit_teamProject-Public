import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
  plugins: [react()],
  base: env.VITE_BASE_PATH || (mode === 'production' ? '/biscuit-project/' : '/'),
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/react-icons/')) return 'iconsVendor'
          if (id.includes('/node_modules/xlsx/')) return 'spreadsheetVendor'
          if (id.includes('/node_modules/draft-js/') || id.includes('/node_modules/react-draft-wysiwyg/')) return 'editorVendor'
          // Keep React and its CommonJS consumers together to preserve initialization order.
          if (id.includes('/node_modules/')) return 'vendor'
        },
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:9090/api",
        changeOrigin: true,
        secure: false,
        // ws: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/ws-stomp/chat": {
        target: "ws://localhost:9091",
        // changeOrigin: true,
        // secure: false,
        ws: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    open: true,
  },
  define: {
    '_global': {},
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    mockReset: true,
  },
  }
})
