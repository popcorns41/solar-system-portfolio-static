import { defineConfig } from "vite";

export default defineConfig({
  root: "./",
  publicDir: "public",
  base: "/",

  server: {
    host: true,
    open: !(
      "SANDBOX_URL" in process.env ||
      "CODESANDBOX_HOST" in process.env
    )
  },

  build: {
    target: "esnext",
    outDir: "docs",
    emptyOutDir: true,
    sourcemap: true
  }
});