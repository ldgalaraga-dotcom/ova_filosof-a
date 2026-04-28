import { defineStore } from 'pinia'

export interface Logro {
  id: string
  nombre: string
  descripcion: string
  emoji: string
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
    activityResults: {} as Record<number, boolean>,
    watchedVideos: [] as number[],
    fontSize: 'normal' as 'small' | 'normal' | 'large',
    ttsSpeed: 'normal' as 'slow' | 'normal' | 'fast',
    darkMode: false as boolean,
    logros: [
      { id: 'bienvenida',  nombre: 'Primer Paso',        descripcion: 'Ingresaste al OVA',                      emoji: '🏛️', obtenido: false },
      { id: 'video1',      nombre: 'Curioso Filosófico',  descripcion: 'Viste tu primer video',                  emoji: '🎬', obtenido: false },
      { id: 'todosVideos', nombre: 'Cinéfilo del Saber',  descripcion: 'Viste los 5 videos',                     emoji: '🎥', obtenido: false },
      { id: 'actividad1',  nombre: 'Dialéctico',          descripcion: 'Completaste una actividad',              emoji: '✏️', obtenido: false },
      { id: 'actividades', nombre: 'Filósofo en Acción',  descripcion: 'Completaste todas las actividades',      emoji: '🏅', obtenido: false },
      { id: 'eval60',      nombre: 'Discípulo',           descripcion: 'Obtuviste 60% o más en la evaluación',   emoji: '👍', obtenido: false },
      { id: 'eval80',      nombre: 'Sabio del Ágora',     descripcion: 'Obtuviste 80% o más en la evaluación',   emoji: '🌟', obtenido: false },
      { id: 'eval100',     nombre: 'Sucesor de Sócrates', descripcion: 'Obtuviste 100% en la evaluación',        emoji: '🦉', obtenido: false },
      { id: 'explorador',  nombre: 'Explorador',          descripcion: 'Visitaste todas las secciones',          emoji: '🗺️', obtenido: false },
    ] as Logro[],
    logroReciente: null as Logro | null,
  }),

  getters: {
    progress: (state) => {
      const total = 7
      const visited = new Set(state.visitedPages).size
      return Math.min(Math.round((visited / total) * 100), 100)
    },
    activitiesCompleted: (state) => state.completedActivities.length,
    scoreLabel: (state) => {
      if (state.evaluationScore === null) return 'Sin evaluar'
      if (state.evaluationScore >= 80) return '¡Excelente! 🌟'
      if (state.evaluationScore >= 60) return '¡Muy bien! 👍'
      if (state.evaluationScore >= 40) return 'Puedes mejorar 💪'
      return 'Sigue intentando 🤗'
    },
    ttsFactor: (state) => state.ttsSpeed === 'slow' ? 0.7 : state.ttsSpeed === 'fast' ? 1.3 : 0.88,
    fontClass: (state) => `font-size-${state.fontSize}`,
    logrosObtenidos: (state) => state.logros.filter(l => l.obtenido),
  },

  actions: {
    markPageVisited(page: string) {
      if (!this.visitedPages.includes(page)) {
        this.visitedPages.push(page)
      }
      // Logro bienvenida
      this._desbloquearLogro('bienvenida')
      // Logro explorador
      const paginas = ['contenido','actividades','evaluacion','recursos','creditos']
      if (paginas.every(p => this.visitedPages.includes(p))) {
        this._desbloquearLogro('explorador')
      }
    },
    markVideoWatched(id: number) {
      if (!this.watchedVideos.includes(id)) {
        this.watchedVideos.push(id)
        if (this.watchedVideos.length === 1) this._desbloquearLogro('video1')
        if (this.watchedVideos.length === 5) this._desbloquearLogro('todosVideos')
      }
    },
    completeActivity(id: number) {
      if (!this.completedActivities.includes(id)) {
        this.completedActivities.push(id)
        if (this.completedActivities.length === 1) this._desbloquearLogro('actividad1')
        if (this.completedActivities.length >= 5) this._desbloquearLogro('actividades')
      }
    },
    setEvaluationScore(score: number) {
      this.evaluationScore = score
      this.evaluationCompleted = true
      if (score >= 60) this._desbloquearLogro('eval60')
      if (score >= 80) this._desbloquearLogro('eval80')
      if (score === 100) this._desbloquearLogro('eval100')
    },
    resetEvaluation() {
      this.evaluationScore = null
      this.evaluationCompleted = false
    },
    _desbloquearLogro(id: string) {
      const logro = this.logros.find(l => l.id === id)
      if (logro && !logro.obtenido) {
        logro.obtenido = true
        logro.fecha = new Date().toLocaleDateString('es-CO')
        this.logroReciente = { ...logro }
        setTimeout(() => { this.logroReciente = null }, 4000)
      }
    },
    clearLogroReciente() {
      this.logroReciente = null
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode
    },
  },

  persist: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
  },
})
