import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  // base: import.meta.env.PUBLIC_URL,
  base: '/biscuit-project',
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
    setupFiles: "@testing-library/jest-dom",
    mockReset: true,
  },
})
