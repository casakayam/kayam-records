import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";

// Regex matching both Unix and Windows node_modules paths
const nm = (pkg: string) =>
  new RegExp(`node_modules[/\\\\](${pkg})[/\\\\]`);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    // Brotli — primary format, 20–26 % smaller than Gzip
    // Served by all modern browsers and CDNs; requires server to check for .br sidecar files.
    compression({
      algorithm: "brotliCompress",
      // Skip already-compressed binary formats — compressing them wastes CPU
      exclude: [/\.(png|jpe?g|webp|avif|gif|svg|ico|woff2?)$/i],
    }),

    // Gzip fallback — for older proxies, shared hosting, or servers without Brotli support
    compression({
      algorithm: "gzip",
      exclude: [/\.(png|jpe?g|webp|avif|gif|svg|ico|woff2?)$/i],
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },

  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),

  // Drop console.* and debugger statements in production at transform time.
  // Applied by esbuild before minification — zero overhead in the output bundle.
  esbuild: {
    drop: process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
  },

  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,

    // Target modern JS — no legacy transpilation, smaller and faster output.
    // Kayam Records audience: creative professionals on modern devices/browsers.
    target: "esnext",

    // No sourcemaps shipped to production.
    // Sourcemaps add 2–10× file size and expose source code to the public.
    sourcemap: false,

    // CSS per-chunk: only the styles for visible sections are loaded initially.
    // Works hand-in-hand with React.lazy splits in Home.tsx.
    cssCodeSplit: true,

    // Skip Vite's own gzip estimation step — we generate real compressed files above.
    reportCompressedSize: false,

    rollupOptions: {
      output: {
        manualChunks(id) {
          // ── React runtime ─────────────────────────────────────────────────
          // Isolated so browsers cache it forever — it almost never changes
          // across deploys. Shared by every other chunk implicitly.
          if (nm("react|react-dom|scheduler").test(id)) {
            return "vendor-react";
          }

          // ── Framer Motion ─────────────────────────────────────────────────
          // ~100 KB minified. Used by Hero, BuildPackage, Services, Testimonials,
          // Accommodation. Without isolation, Rollup would embed it once per
          // lazy chunk that imports it — multiplying the download cost.
          if (nm("framer-motion").test(id)) {
            return "vendor-motion";
          }

          // ── UI primitives ─────────────────────────────────────────────────
          // Radix UI (~30 packages), Lucide icons, Sonner toasts, and CSS
          // utility libs. None of these change with business logic — they
          // deserve their own long-lived cache entry.
          if (
            nm(
              "@radix-ui|lucide-react|sonner|class-variance-authority|tailwind-merge|clsx|cmdk|vaul|embla-carousel-react"
            ).test(id)
          ) {
            return "vendor-ui";
          }
        },
      },
    },
  },

  server: {
    port: 3000,
    strictPort: false,
    host: true,
  },
});
