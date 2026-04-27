export interface Video {
  id: number
  titulo: string
  descripcion: string
  urlEmbed: string
  emoji: string
}

export const listaVideos: Video[] = [
  {
    id: 1,
    titulo: '¿Qué es la Filosofía?',
    descripcion: 'Una introducción clara y sencilla al mundo del pensamiento filosófico.',
    urlEmbed: 'https://www.youtube.com/embed/RDrTtZwQ0k4?start=82',
    emoji: '🤔',
  },
  {
    id: 2,
    titulo: 'Sócrates',
    descripcion: 'Conoce al filósofo que enseñaba haciendo preguntas en las calles de Atenas.',
    urlEmbed: 'https://www.youtube.com/embed/YduLzweRXjk',
    emoji: '🏛️',
  },
  {
    id: 3,
    titulo: 'Platón',
    descripcion: 'El discípulo de Sócrates que escribió sus ideas y fundó la primera universidad.',
    urlEmbed: 'https://www.youtube.com/embed/bU5hyn9bFNU',
    emoji: '📜',
  },
  {
    id: 4,
    titulo: '¿Quiénes Somos?',
    descripcion: 'Reflexiona sobre la identidad personal: ¿qué me hace ser yo?',
    urlEmbed: 'https://www.youtube.com/embed/um6coC8nAYc',
    emoji: '👤',
  },
  {
    id: 5,
    titulo: '¿Qué es la Ética?',
    descripcion: 'Aprende sobre lo que está bien y lo que está mal, y cómo decidirlo.',
    urlEmbed: 'https://www.youtube.com/embed/sQ_DWG34UOE',
    emoji: '⚖️',
  },
]
