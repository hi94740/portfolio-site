import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3003
  },
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "./src/components"),
      formats: ["es"]
    },
    rollupOptions: {
      external: ["vue"]
    }
  }
})
