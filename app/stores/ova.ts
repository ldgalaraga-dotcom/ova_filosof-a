import { defineStore } from 'pinia'

export interface Logro {
  id: string
  nombre: string
  descripcion: string
  icon: string
  obtenido: boolean
  fecha?: string
}

export const useOvaStore = defineStore('ova', {
  state: () => ({
    studentName: '',
    completedActivities: [] as number[],
    evaluationScore: null as number | null,
    evaluationCompleted: false,
    visitedPages: [] as string[],
    watchedVideos: [] as number[],
    reflexiones: [] as { fecha: string; tema: string; texto: string }[],
    fontSize: 'normal' as 'small' | 'normal' | 'large',
    ttsSpeed: 'normal' as 'slow' | 'normal' | 'fast',
    darkMode: false,
    logros: [
      { id: 'bienvenida',  nombre: 'Primer Paso',          descripcion: 'Ingresaste al OVA',                        icon: 'mdi-pillar', obtenido: false },
      { id: 'video1',      nombre: 'Curioso Filosófico',    descripcion: 'Viste tu primer video',                    icon: 'mdi-movie-open-outline', obtenido: false },
      { id: 'video3',      nombre: 'Aprendiz del Saber',    descripcion: 'Viste 3 videos',                           icon: 'mdi-play-box-multiple', obtenido: false },
      { id: 'todosVideos', nombre: 'Cinéfilo del Saber',    descripcion: 'Viste todos los videos',                   icon: 'mdi-filmstrip', obtenido: false },
      { id: 'actividad1',  nombre: 'Dialéctico',            descripcion: 'Completaste tu primera actividad',         icon: 'mdi-pencil-ruler', obtenido: false },
      { id: 'actividad3',  nombre: 'Pensador Activo',       descripcion: 'Completaste 3 actividades',                icon: 'mdi-brain', obtenido: false },
      { id: 'actividades', nombre: 'Filósofo en Acción',    descripcion: 'Completaste todas las actividades',        icon: 'mdi-medal', obtenido: false },
      { id: 'eval60',      nombre: 'Discípulo',             descripcion: 'Obtuviste 60% o más en la evaluación',     icon: 'mdi-thumb-up-outline', obtenido: false },
      { id: 'eval80',      nombre: 'Sabio del Ágora',       descripcion: 'Obtuviste 80% o más en la evaluación',     icon: 'mdi-star-shooting', obtenido: false },
      { id: 'eval100',     nombre: 'Sucesor de Sócrates',   descripcion: 'Obtuviste 100% en la evaluación',          icon: 'mdi-owl', obtenido: false },
      { id: 'explorador',  nombre: 'Explorador',            descripcion: 'Visitaste todas las secciones',            icon: 'mdi-map-search-outline', obtenido: false },
      { id: 'madrugador',  nombre: 'Alma Filosófica',       descripcion: 'Iniciaste la jornada filosófica',          icon: 'mdi-weather-sunset-up', obtenido: false },
      { id: 'reflexivo',   nombre: 'Filósofo Reflexivo',    descripcion: 'Escribiste 3 reflexiones',                 icon: 'mdi-feather', obtenido: false },
      { id: 'recursos',    nombre: 'Bibliófilo',            descripcion: 'Visitaste la sección de recursos',         icon: 'mdi-book-open-page-variant', obtenido: false },
      { id: 'constante',   nombre: 'Mente Constante',       descripcion: 'Completaste actividades y evaluación',     icon: 'mdi-lightning-bolt', obtenido: false },
      { id: 'maestro',     nombre: 'Maestro del Ágora',     descripcion: 'Desbloqueaste todos los logros',           icon: 'mdi-trophy-award', obtenido: false },
    ] as Logro[],
    logroReciente: null as Logro | null,
  }),

  getters: {
    progress: (state) => {
      const total = 7
      const visited = new Set(state.visitedPages).size
      return Math.min(Math.round((visited / total) * 100), 100)
    },
    progressDetails: (state) => ({
      videosWatched: state.watchedVideos.length,
      totalVideos: 5,
      activitiesCompleted: state.completedActivities.length,
      totalActivities: 5,
      evaluationDone: state.evaluationCompleted,
    }),
    activitiesCompleted: (state) => state.completedActivities.length,
    scoreLabel: (state) => {
      if (state.evaluationScore === null) return 'Sin evaluar'
      if (state.evaluationScore >= 80) return '¡Excelente!'
      if (state.evaluationScore >= 60) return '¡Muy bien!'
      if (state.evaluationScore >= 40) return 'Puedes mejorar'
      return 'Sigue intentando'
    },
    ttsFactor: (state) =>
      state.ttsSpeed === 'slow' ? 0.7 : state.ttsSpeed === 'fast' ? 1.3 : 0.88,
    fontClass: (state) => `font-size-${state.fontSize}`,
    logrosObtenidos: (state) => state.logros.filter(l => l.obtenido),
  },

  actions: {
    markPageVisited(page: string) {
      if (!this.visitedPages.includes(page)) {
        this.visitedPages.push(page)
      }
      this._desbloquearLogro('bienvenida')
      if (page === 'recursos') this._desbloquearLogro('recursos')
      const paginas = ['contenido', 'actividades', 'reflexiones', 'evaluacion', 'recursos', 'creditos']
      if (paginas.every(p => this.visitedPages.includes(p))) {
        this._desbloquearLogro('explorador')
      }
    },
    markVideoWatched(id: number) {
      if (!this.watchedVideos.includes(id)) {
        this.watchedVideos.push(id)
        if (this.watchedVideos.length === 1) this._desbloquearLogro('video1')
        if (this.watchedVideos.length === 3) this._desbloquearLogro('video3')
        if (this.watchedVideos.length === 5) this._desbloquearLogro('todosVideos')
      }
    },
    completeActivity(id: number) {
      if (!this.completedActivities.includes(id)) {
        this.completedActivities.push(id)
        if (this.completedActivities.length === 1) this._desbloquearLogro('actividad1')
        if (this.completedActivities.length === 3) this._desbloquearLogro('actividad3')
        if (this.completedActivities.length >= 5) {
          this._desbloquearLogro('actividades')
          if (this.evaluationCompleted) this._desbloquearLogro('constante')
        }
      }
    },
    setEvaluationScore(score: number) {
      this.evaluationScore = score
      this.evaluationCompleted = true
      if (score >= 60) this._desbloquearLogro('eval60')
      if (score >= 80) this._desbloquearLogro('eval80')
      if (score === 100) this._desbloquearLogro('eval100')
      if (this.completedActivities.length >= 5) this._desbloquearLogro('constante')
    },
    resetEvaluation() {
      this.evaluationScore = null
      this.evaluationCompleted = false
    },
    resetTodo() {
      this.studentName = ''
      this.completedActivities = []
      this.evaluationScore = null
      this.evaluationCompleted = false
      this.visitedPages = []
      this.watchedVideos = []
      this.reflexiones = []
      this.logros.forEach(l => {
        l.obtenido = false
        l.fecha = undefined
      })
      this.logroReciente = null
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode
    },
    clearLogroReciente() {
      this.logroReciente = null
    },
    _desbloquearLogro(id: string) {
      const logro = this.logros.find(l => l.id === id)
      if (logro && !logro.obtenido) {
        logro.obtenido = true
        logro.fecha = new Date().toLocaleDateString('es-CO')
        this.logroReciente = { ...logro }
        setTimeout(() => { this.logroReciente = null }, 4000)
        // Verificar si se desbloquearon todos (excepto 'maestro') para dar el maestro
        if (id !== 'maestro') {
          const sinMaestro = this.logros.filter(l => l.id !== 'maestro')
          if (sinMaestro.every(l => l.obtenido)) {
            setTimeout(() => this._desbloquearLogro('maestro'), 1500)
          }
        }
      }
    },
    agregarReflexion(tema: string, texto: string) {
      this.reflexiones.push({
        fecha: new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        tema,
        texto
      })
      if (this.reflexiones.length >= 3) {
        this._desbloquearLogro('reflexivo')
      }
    }
  },

  persist: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
  },
})
