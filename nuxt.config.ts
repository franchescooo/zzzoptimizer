// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  app: {
    baseURL: "/zzzoptimizer/"
  },
  modules: [
    "@nuxt/ui"
  ],
  css: [
    'assets/css/tailwind.css',
    'vue-final-modal/style.css'
  ]
})
