export interface Video {
  id: number
  titulo: string
  descripcion: string
  urlEmbed: string
  icon: string
  preguntaReflexion: string
}

export const listaVideos: Video[] = [
  // ── FILOSOFÍA GRIEGA CLÁSICA ──
  {
    id: 1,
    titulo: '¿Qué es la Filosofía?',
    descripcion: 'Introducción al pensamiento filosófico: el paso del mito al logos en la Grecia Antigua.',
    urlEmbed: 'https://www.youtube.com/embed/RDrTtZwQ0k4?start=82',
    icon: 'mdi-head-question',
    preguntaReflexion: '¿Cuál es la pregunta filosófica que más te genera curiosidad en tu vida cotidiana y por qué?',
  },
  {
    id: 2,
    titulo: 'Sócrates y la Mayéutica',
    descripcion: 'El filósofo que enseñaba haciendo preguntas en las calles de Atenas.',
    urlEmbed: 'https://www.youtube.com/embed/YduLzweRXjk',
    icon: 'mdi-pillar',
    preguntaReflexion: 'Sócrates decía "solo sé que no sé nada". ¿En qué áreas de tu vida sientes que necesitas aprender más?',
  },
  {
    id: 3,
    titulo: 'Platón y el Mundo de las Ideas',
    descripcion: 'El discípulo de Sócrates que fundó la Academia y propuso la Alegoría de la Caverna.',
    urlEmbed: 'https://www.youtube.com/embed/bU5hyn9bFNU',
    icon: 'mdi-book-open-page-variant',
    preguntaReflexion: 'Platón creía en un mundo de ideas perfectas. ¿Existe algo en tu vida que consideres verdaderamente perfecto?',
  },
  {
    id: 4,
    titulo: 'Aristóteles: Lógica y Ética',
    descripcion: 'El filósofo que sistematizó el conocimiento y enseñó que la felicidad está en la virtud.',
    urlEmbed: 'https://www.youtube.com/embed/um6coC8nAYc',
    icon: 'mdi-bookshelf',
    preguntaReflexion: 'Aristóteles decía que la virtud es un punto medio. ¿Puedes identificar un ejemplo en tu vida?',
  },
  // ── FILOSOFÍA MEDIEVAL ──
  {
    id: 5,
    titulo: 'Filosofía Medieval: Fe y Razón',
    descripcion: 'Santo Tomás de Aquino y la escolástica: cómo la filosofía griega se unió con la fe cristiana.',
    urlEmbed: 'https://www.youtube.com/embed/sQ_DWG34UOE',
    icon: 'mdi-cross',
    preguntaReflexion: '¿Crees que la fe y la razón pueden convivir o son incompatibles? Justifica tu respuesta.',
  },
  // ── FILOSOFÍA MODERNA ──
  {
    id: 6,
    titulo: 'Descartes: Pienso, luego existo',
    descripcion: 'El padre de la filosofía moderna y su método de la duda para encontrar certezas.',
    urlEmbed: 'https://www.youtube.com/embed/CAjWUrwvxs4',
    icon: 'mdi-microscope',
    preguntaReflexion: 'Si dudaras de absolutamente todo, ¿qué sería lo único que no podrías poner en duda?',
  },
  {
    id: 7,
    titulo: 'Kant y la Ética del Deber',
    descripcion: 'El imperativo categórico: actúa solo según la máxima que quisieras que fuera ley universal.',
    urlEmbed: 'https://www.youtube.com/embed/nsgAsw4XGvU',
    icon: 'mdi-scale-balance',
    preguntaReflexion: '¿Conoces alguna regla moral que creas que debería ser universal para todas las personas?',
  },
  // ── FILOSOFÍA DEL SIGLO XIX ──
  {
    id: 8,
    titulo: 'Marx y la Crítica Social',
    descripcion: 'El materialismo histórico, la alienación del trabajo y la lucha de clases.',
    urlEmbed: 'https://www.youtube.com/embed/fSQgCy_iIcc',
    icon: 'mdi-hammer-wrench',
    preguntaReflexion: '¿Piensas que las condiciones económicas determinan la forma en que pensamos y vivimos?',
  },
  {
    id: 9,
    titulo: 'Nietzsche: Más allá del Bien y del Mal',
    descripcion: 'La muerte de Dios, la voluntad de poder y la propuesta del Übermensch (superhombre).',
    urlEmbed: 'https://www.youtube.com/embed/wHWbZmg2hzU',
    icon: 'mdi-lightning-bolt',
    preguntaReflexion: '¿Qué valores de la sociedad actual crees que deberían cuestionarse o reinventarse?',
  },
  // ── FILOSOFÍA CONTEMPORÁNEA ──
  {
    id: 10,
    titulo: 'Existencialismo: Sartre y la Libertad',
    descripcion: '"La existencia precede a la esencia": somos lo que elegimos ser, no hay naturaleza humana fija.',
    urlEmbed: 'https://www.youtube.com/embed/3bQsZxDQgzU',
    icon: 'mdi-walk',
    preguntaReflexion: '¿Te sientes libre para elegir quién eres o sientes que tus circunstancias te definen?',
  },
  {
    id: 11,
    titulo: 'Foucault: Poder y Conocimiento',
    descripcion: 'Cómo las instituciones moldean lo que consideramos verdad, normal o aceptable.',
    urlEmbed: 'https://www.youtube.com/embed/BBJTeNTZtGU',
    icon: 'mdi-magnify',
    preguntaReflexion: '¿Puedes identificar alguna "verdad" que en realidad sea una construcción social o de poder?',
  },
  // ── FILOSOFÍA LATINOAMERICANA ──
  {
    id: 12,
    titulo: 'Filosofía Latinoamericana',
    descripcion: 'Pensamiento propio de América Latina: Leopoldo Zea, Enrique Dussel y la filosofía de la liberación.',
    urlEmbed: 'https://www.youtube.com/embed/EBYI6ZlOBZQ',
    icon: 'mdi-earth',
    preguntaReflexion: '¿Crees que América Latina necesita su propia filosofía o basta con la tradición europea? Argumenta.',
  },
]
