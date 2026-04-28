// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  srcDir: 'app',

  // Registrar la carpeta 'componentes' (en español) para auto-import
  components: [
    { path: '~/componentes', pathPrefix: false },
    '~/components',
  ],

  // Módulos
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'vuetify-nuxt-module',
  ],

  // Página de error personalizada
  app: {
    head: {
      title: 'Φιλοσοφία para Todos – OVA',
      meta: [
        { name: 'description', content: 'Objeto Virtual de Aprendizaje de Filosofía para grados X y XI' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cinzel+Decorative:wght@400;700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap',
        },
      ],
    },
  },
})
