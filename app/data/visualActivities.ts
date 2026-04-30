export interface VisualActivity {
  id: number
  type: 'quiz' | 'match' | 'sequence' | 'multiple'
  title: string
  icon: string
  color: string
}

export interface QuizQuestion {
  id: number
  icon: string
  question: string
  options: { icon: string; text: string; correct: boolean }[]
}

export interface MatchPair {
  id: number
  leftIcon: string
  leftText: string
  rightIcon: string
  rightText: string
}

export interface SequenceStep {
  id: number
  icon: string
  text: string
  order: number
}

export const quizQuestions: QuizQuestion[] = [
  // Griega
  { id: 1, icon: 'mdi-head-question', question: '¿Qué hace un filósofo?', options: [{ icon: 'mdi-brain', text: 'Piensa y pregunta', correct: true }, { icon: 'mdi-soccer', text: 'Juega fútbol', correct: false }, { icon: 'mdi-pizza', text: 'Come pizza', correct: false }] },
  { id: 2, icon: 'mdi-thought-bubble', question: '¿Quién dijo "Solo sé que no sé nada"?', options: [{ icon: 'mdi-pillar', text: 'Sócrates', correct: true }, { icon: 'mdi-book-open-page-variant', text: 'Platón', correct: false }, { icon: 'mdi-bookshelf', text: 'Aristóteles', correct: false }] },
  // Moderna
  { id: 3, icon: 'mdi-microscope', question: '¿Quién dijo "Pienso, luego existo"?', options: [{ icon: 'mdi-microscope', text: 'Descartes', correct: true }, { icon: 'mdi-scale-balance', text: 'Kant', correct: false }, { icon: 'mdi-pillar', text: 'Sócrates', correct: false }] },
  // Contemporánea
  { id: 4, icon: 'mdi-walk', question: '¿Qué corriente dice que "la existencia precede a la esencia"?', options: [{ icon: 'mdi-walk', text: 'Existencialismo', correct: true }, { icon: 'mdi-bookshelf', text: 'Racionalismo', correct: false }, { icon: 'mdi-scale-balance', text: 'Utilitarismo', correct: false }] },
  // Latinoamericana
  { id: 5, icon: 'mdi-earth', question: '¿Qué propone la Filosofía de la Liberación?', options: [{ icon: 'mdi-hand-back-right', text: 'Pensar desde los oprimidos', correct: true }, { icon: 'mdi-cash', text: 'Acumular riqueza', correct: false }, { icon: 'mdi-crown', text: 'Obedecer al poder', correct: false }] },
]

export const matchPairs: MatchPair[] = [
  // Griega
  { id: 1, leftIcon: 'mdi-pillar', leftText: 'Sócrates', rightIcon: 'mdi-help', rightText: 'Mayéutica' },
  { id: 2, leftIcon: 'mdi-book-open-page-variant', leftText: 'Platón', rightIcon: 'mdi-star', rightText: 'Mundo de las Ideas' },
  // Moderna
  { id: 3, leftIcon: 'mdi-microscope', leftText: 'Descartes', rightIcon: 'mdi-thought-bubble', rightText: 'Cogito ergo sum' },
  { id: 4, leftIcon: 'mdi-scale-balance', leftText: 'Kant', rightIcon: 'mdi-ruler', rightText: 'Imperativo categórico' },
  // Contemporánea
  { id: 5, leftIcon: 'mdi-walk', leftText: 'Sartre', rightIcon: 'mdi-lock-open', rightText: 'Libertad radical' },
  // Latinoamericana
  { id: 6, leftIcon: 'mdi-earth', leftText: 'Dussel', rightIcon: 'mdi-hand-back-right', rightText: 'Filosofía de la Liberación' },
]

export const sequenceSteps: SequenceStep[] = [
  { id: 1, icon: 'mdi-water', text: 'Presocráticos (s. VI a.C.)', order: 1 },
  { id: 2, icon: 'mdi-pillar', text: 'Filosofía Clásica (s. V-IV a.C.)', order: 2 },
  { id: 3, icon: 'mdi-cross', text: 'Filosofía Medieval (s. V-XV)', order: 3 },
  { id: 4, icon: 'mdi-microscope', text: 'Filosofía Moderna (s. XVII-XVIII)', order: 4 },
  { id: 5, icon: 'mdi-lightning-bolt', text: 'Filosofía del s. XIX', order: 5 },
  { id: 6, icon: 'mdi-walk', text: 'Filosofía Contemporánea (s. XX)', order: 6 },
  { id: 7, icon: 'mdi-earth', text: 'Filosofía Latinoamericana', order: 7 },
]
