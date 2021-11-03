import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
    // buildModules: ['@nuxtjs/tailwindcss'],
    css: ['@/assets/css/tailwind.css'],
    build: {
      postcss: {
        // add Postcss options
        postcssOptions: require('./postcss.config.js'),
      },
    },
})
