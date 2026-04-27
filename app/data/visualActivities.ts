export interface VisualActivity {
  id: number
  type: 'quiz' | 'match' | 'sequence' | 'multiple'
  title: string
  emoji: string
  color: string
}

export interface QuizQuestion {
  id: number
  emoji: string
  question: string
  options: { emoji: string; text: string; correct: boolean }[]
}

export interface MatchPair {
  id: number
  leftEmoji: string
  leftText: string
  rightEmoji: string
  rightText: string
}

export interface SequenceStep {
  id: number
  emoji: string
  text: string
  order: number
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    emoji: '🤔',
    question: '¿Qué hace un filósofo?',
    options: [
      { emoji: '🧠', text: 'Piensa y pregunta', correct: true },
      { emoji: '⚽', text: 'Juega fútbol', correct: false },
      { emoji: '🍕', text: 'Come pizza', correct: false },
    ],
  },
  {
    id: 2,
    emoji: '💭',
    question: '¿Cuál es la pregunta más importante?',
    options: [
      { emoji: '❓', text: '¿Quién soy yo?', correct: true },
      { emoji: '🌮', text: '¿Qué es la comida?', correct: false },
      { emoji: '🎮', text: '¿Qué es un videojuego?', correct: false },
    ],
  },
  {
    id: 3,
    emoji: '🎯',
    question: '¿Para qué sirve la sabiduría?',
    options: [
      { emoji: '✨', text: 'Para vivir mejor', correct: true },
      { emoji: '🎪', text: 'Para hacer trucos', correct: false },
      { emoji: '💤', text: 'Para dormir', correct: false },
    ],
  },
  {
    id: 4,
    emoji: '⚖️',
    question: '¿Qué es lo correcto?',
    options: [
      { emoji: '❤️', text: 'Ayudar a otros', correct: true },
      { emoji: '😠', text: 'Ser malo', correct: false },
      { emoji: '🤐', text: 'No hablar', correct: false },
    ],
  },
]

export const matchPairs: MatchPair[] = [
  {
    id: 1,
    leftEmoji: '🧠',
    leftText: 'Pensar',
    rightEmoji: '💡',
    rightText: 'Entender las cosas',
  },
  {
    id: 2,
    leftEmoji: '❓',
    leftText: 'Preguntar',
    rightEmoji: '📚',
    rightText: 'Aprender',
  },
  {
    id: 3,
    leftEmoji: '❤️',
    leftText: 'Amor',
    rightEmoji: '😊',
    rightText: 'Sentimiento',
  },
  {
    id: 4,
    leftEmoji: '⚖️',
    leftText: 'Justicia',
    rightEmoji: '✨',
    rightText: 'Lo correcto',
  },
]

export const sequenceSteps: SequenceStep[] = [
  { id: 1, emoji: '👀', text: 'Observar', order: 1 },
  { id: 2, emoji: '❓', text: 'Preguntar', order: 2 },
  { id: 3, emoji: '🧠', text: 'Pensar', order: 3 },
  { id: 4, emoji: '💬', text: 'Hablar', order: 4 },
  { id: 5, emoji: '✨', text: 'Aprender', order: 5 },
]
