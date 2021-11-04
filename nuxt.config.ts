import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
  css: [
    "@/assets/css/tailwind.css",
    { src: "@/assets/stylus/main.styl", lang: "stylus" },
  ],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
});
