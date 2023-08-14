import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    coverage: {
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
