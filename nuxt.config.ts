// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  ssr: false,
  runtimeConfig: {
    mugloarBaseUrl: 'https://dragonsofmugloar.com/api/v2',
  },
});