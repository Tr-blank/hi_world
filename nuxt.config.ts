import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
css: [
    '@/assets/css/tailwind.css'
    // '@/assets/stylus/main.styl'
  ],
  // modules: ['@nuxtjs/axios',{ proxyHeaders:false }],
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ['defineStore', 'definePiniaStore'] // import { defineStore as definePiniaStore } from 'pinia'
        ]
      }
    ]
  ],
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
