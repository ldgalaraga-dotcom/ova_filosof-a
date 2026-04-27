import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'ovaTheme',
      themes: {
        ovaTheme: {
          dark: false,
          colors: {
            primary: '#5E35B1',
            secondary: '#FF8F00',
            accent: '#00ACC1',
            success: '#43A047',
            warning: '#FB8C00',
            error: '#E53935',
            info: '#039BE5',
            background: '#F3E5F5',
            surface: '#FFFFFF',
          },
        },
      },
    },
    defaults: {
      VBtn: {
        rounded: 'xl',
        size: 'large',
      },
      VCard: {
        rounded: 'xl',
        elevation: 3,
      },
    },
  })
  app.vueApp.use(vuetify)
})
