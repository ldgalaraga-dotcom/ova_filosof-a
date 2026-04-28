export interface Video {
  id: number
  titulo: string
  descripcion: string
  urlEmbed: string
  emoji: string
  preguntaReflexion: string
}

export const listaVideos: Video[] = [
  {
    id: 1,
    titulo: '¿Qué es la Filosofía?',
    descripcion: 'Una introducción clara y sencilla al mundo del pensamiento filosófico.',
    urlEmbed: 'https://www.youtube.com/embed/RDrTtZwQ0k4?start=82',
    emoji: '🤔',
    preguntaReflexion: '¿Cuál es la pregunta filosófica que más te genera curiosidad en tu vida cotidiana y por qué?',
  },
  {
    id: 2,
    titulo: 'Sócrates',
    descripcion: 'Conoce al filósofo que enseñaba haciendo preguntas en las calles de Atenas.',
    urlEmbed: 'https://www.youtube.com/embed/YduLzweRXjk',
    emoji: '🏛️',
    preguntaReflexion: 'Sócrates decía "solo sé que no sé nada". ¿En qué áreas de tu vida sientes que necesitas aprender más?',
  },
  {
    id: 3,
    titulo: 'Platón',
    descripcion: 'El discípulo de Sócrates que escribió sus ideas y fundó la primera universidad.',
    urlEmbed: 'https://www.youtube.com/embed/bU5hyn9bFNU',
    emoji: '📜',
    preguntaReflexion: 'Platón creía en un mundo de ideas perfectas. ¿Existe algo en tu vida que consideres verdaderamente perfecto o ideal?',
  },
  {
    id: 4,
    titulo: '¿Quiénes Somos?',
    descripcion: 'Reflexiona sobre la identidad personal: ¿qué me hace ser yo?',
    urlEmbed: 'https://www.youtube.com/embed/um6coC8nAYc',
    emoji: '👤',
    preguntaReflexion: '¿Qué tres valores o características te definen como persona y por qué son importantes para ti?',
  },
  {
    id: 5,
    titulo: '¿Qué es la Ética?',
    descripcion: 'Aprende sobre lo que está bien y lo que está mal, y cómo decidirlo.',
    urlEmbed: 'https://www.youtube.com/embed/sQ_DWG34UOE',
    emoji: '⚖️',
    preguntaReflexion: 'Describe una situación en que hayas tenido que tomar una decisión difícil. ¿Cómo decidiste qué era lo correcto?',
  },
]
