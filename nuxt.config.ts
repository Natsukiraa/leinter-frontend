// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  ui: {
    colorMode: true,
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@vueuse/nuxt'
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    }
  ],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://api-leitner-656412307077.europe-west1.run.app',
    }
  },
  app: {
    head: {
      title: 'Leitner - Cleancode',
      htmlAttrs: {
        lang: 'en',
      },
    },
  }
})
