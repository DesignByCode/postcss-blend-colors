import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    coverage: {
      lines: 60,
      branches: 60,
      functions: 60,
      statements: 60,
      provider: "istanbul",
      reporter: ["json-summary", "text"],
    },
  },
  // build: {
  //   lib: {
  //     // Could also be a dictionary or array of multiple entry points
  //     entry: resolve(__dirname, "src/index.ts"),
  //     name: "Tailwindcss Text Shadow",
  //     // the proper extensions will be added
  //     fileName: "index",
  //     formats: ["cjs", "umd"],
  //   },
  //   minify: "terser",
  // },
  plugins: [],
})
