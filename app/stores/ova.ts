import { defineStore } from 'pinia'

export const useOvaStore = defineStore('ova', {
  state: () => ({
    studentName: '',
    completedActivities: [] as number[],
    evaluationScore: null as number | null,
    evaluationCompleted: false,
    visitedPages: [] as string[],
    activityResults: {} as Record<number, boolean>,
  }),

  getters: {
    progress: (state) => {
      const total = 7 // 4 actividades + evaluación + contenido + recursos
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
  },

  actions: {
    markPageVisited(page: string) {
      if (!this.visitedPages.includes(page)) {
        this.visitedPages.push(page)
      }
    },
    completeActivity(id: number) {
      if (!this.completedActivities.includes(id)) {
        this.completedActivities.push(id)
      }
    },
    setEvaluationScore(score: number) {
      this.evaluationScore = score
      this.evaluationCompleted = true
    },
    resetEvaluation() {
      this.evaluationScore = null
      this.evaluationCompleted = false
    },
  },

  persist: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
  },
})
