import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
css: [
    '@/assets/css/tailwind.css'
    // '@/assets/stylus/main.styl'
  ],
  // modules: ['@nuxtjs/axios',{ proxyHeaders:false }],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {}
        }
      }
    }
  }
})
