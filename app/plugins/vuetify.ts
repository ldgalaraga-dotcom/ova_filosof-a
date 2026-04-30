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
      defaultTheme: 'light',
      themes: {
        light: {
          dark: false,
          colors: {
            primary:    '#1B3A6B',
            secondary:  '#C9A84C',
            accent:     '#1B3A6B',
            success:    '#5C6E2E',
            warning:    '#C9A84C',
            error:      '#8B3A2A',
            info:       '#1B3A6B',
            background: '#F8F4EC',
            surface:    '#FDFAF3',
            'on-background': '#1A1A1A',
            'on-surface': '#1A1A1A',
          },
        },
        dark: {
          dark: true,
          colors: {
            primary:    '#122440',
            secondary:  '#E8C97A',
            accent:     '#1B3A6B',
            success:    '#80963E',
            warning:    '#E8C97A',
            error:      '#B75440',
            info:       '#122440',
            background: '#121212',
            surface:    '#1E1E1E',
            'on-background': '#E0E0E0',
            'on-surface': '#E0E0E0',
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
