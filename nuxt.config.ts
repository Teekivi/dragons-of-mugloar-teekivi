// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      Cinzel: [400, 700],
      'Crimson Pro': [400, 600],
    },
  },
  ssr: false,
  runtimeConfig: {
    mugloarBaseUrl: 'https://dragonsofmugloar.com/api/v2',
  },
});