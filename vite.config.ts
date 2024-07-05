import { resolve } from "path"
import { defineConfig } from "vitest/config"
import dts from "vite-plugin-dts"

export default defineConfig({
  test: {
    alias: {
      "@/": resolve(__dirname, "src"),
    },
    coverage: {
      lines: 60,
      branches: 60,
      functions: 60,
      statements: 60,
      provider: "istanbul",
      reporter: ["json-summary", "text", "json"],
      reportOnFailure: true
    },
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.ts"),
      name: "Postcss blend colors",
      // the proper extensions will be added
      fileName: "index",
      formats: ["cjs", "umd"],
    },
    minify: "terser",
  },
  plugins: [dts()],
})
