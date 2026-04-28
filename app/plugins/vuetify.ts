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
      defaultTheme: 'greekTheme',
      themes: {
        greekTheme: {
          dark: false,
          colors: {
            primary:    '#1B3A6B',
            secondary:  '#C9A84C',
            accent:     '#4A7FA5',
            success:    '#5C6E2E',
            warning:    '#C9A84C',
            error:      '#8B3A2A',
            info:       '#4A7FA5',
            background: '#F8F4EC',
            surface:    '#FDFAF3',
          },
        },
      },
    },
    defaults: {
      VBtn: {
        rounded: 'lg',
        size: 'large',
      },
      VCard: {
        rounded: 'lg',
        elevation: 2,
      },
    },
  })
  app.vueApp.use(vuetify)
})
