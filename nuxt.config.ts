import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2026-04-26',
  srcDir: 'app/',
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    define: {
      'process.env.DEBUG': false,
    },
  },
  css: ['~/assets/main.css'],
  app: {
    head: {
      title: 'OVA Filosofía para Todos',
      meta: [
        { name: 'description', content: 'Objeto Virtual de Aprendizaje de Filosofía para grados 10 y 11' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Fredoka+One&display=swap' },
      ],
    },
  },
})
