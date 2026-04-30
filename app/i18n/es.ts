// Diccionario base en español (preparación para internacionalización)
// Para implementar multi-idioma a futuro:
// 1. Instalar @nuxtjs/i18n
// 2. Configurar en nuxt.config.ts
// 3. Reemplazar textos duros con $t('clave')

export default {
  general: {
    app_name: 'Ágora — Filosofía para Todos',
    welcome: '¡Bienvenido/a al ágora, {name}!',
    progress: 'Progreso',
    achievements: 'Tus Logros',
  },
  navigation: {
    content: 'Contenido',
    activities: 'Actividades',
    reflections: 'Reflexiones',
    dialogue: 'Diálogo',
    evaluation: 'Evaluación',
    resources: 'Recursos',
    credits: 'Créditos',
  },
  evaluation: {
    title: 'Evaluación',
    practice_mode: 'Modo Práctica',
    exam_mode: 'Modo Examen',
    score: 'Calificación obtenida',
    download_cert: 'Descargar Certificado',
    review_topic: 'Revisar este tema',
  },
  reflections: {
    title: 'Cuaderno de Reflexión',
    new: 'Nueva Reflexión',
    save: 'Guardar Reflexión',
    empty: 'Aún no has escrito ninguna reflexión. ¡Anímate a empezar!',
  },
  dialogue: {
    title: 'Diálogo Socrático',
    socrates: 'Sócrates Virtual',
    placeholder: 'Escribe tu idea o respuesta...',
  }
}
