<template>
  <div>
    <div class="d-flex align-center mb-5">
      <v-icon color="accent" size="38" class="mr-3">mdi-bookshelf</v-icon>
      <div>
        <h1 style="font-family:'Cinzel',serif;font-size:1.9rem;color:var(--text-primary);line-height:1.1">Recursos</h1>
        <div style="color:var(--text-muted);font-size:0.95rem">Material extra para seguir aprendiendo <v-icon size="16">mdi-bookshelf</v-icon></div>
      </div>
    </div>

    <!-- Línea del tiempo de filósofos -->
    <v-card rounded="xl" elevation="3" class="mb-5">
      <v-card-title class="pa-5 pb-2">
        <v-icon color="primary" class="mr-2">mdi-timeline-clock</v-icon>
        <span style="font-family:'Cinzel',serif">Grandes Filósofos</span>
      </v-card-title>
      <v-card-text class="pa-5 pt-2">
        <div v-for="(fil, i) in filosofos" :key="fil.nombre" class="d-flex align-start mb-4">
          <div class="d-flex flex-column align-center mr-4">
            <v-avatar :color="fil.color" size="44">
              <span style="color: #C9A84C"><v-icon size="36">{{ fil.icon }}</v-icon></span>
            </v-avatar>
            <div v-if="i < filosofos.length - 1" style="width:2px;height:28px;background:linear-gradient(to bottom,#9575CD,transparent);margin-top:4px" />
          </div>
          <div>
            <div class="d-flex align-center flex-wrap gap-2 mb-1">
              <span style="font-weight:800;font-size:1rem;color:var(--text-dark)">{{ fil.nombre }}</span>
              <v-chip :color="fil.color" size="x-small" label>{{ fil.periodo }}</v-chip>
            </div>
            <div style="font-size:0.9rem;color:var(--text-muted);line-height:1.5">{{ fil.aporte }}</div>
            <div style="font-size:0.82rem;font-style:italic;color:var(--text-muted);margin-top:3px">"{{ fil.cita }}"</div>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <!-- Glosario -->
    <v-card rounded="xl" elevation="3" class="mb-5">
      <v-card-title class="pa-5 pb-2 d-flex align-center flex-wrap gap-2">
        <v-icon color="secondary" class="mr-2">mdi-book-alphabet</v-icon>
        <span style="font-family:'Cinzel',serif">Glosario Filosófico</span>
        <v-chip size="x-small" color="secondary">{{ glosario.length }} términos</v-chip>
        <v-spacer />
        <v-text-field
          v-model="buscarGlosario"
          density="compact"
          variant="outlined"
          prepend-inner-icon="mdi-magnify"
          placeholder="Buscar término..."
          hide-details
          clearable
          rounded="xl"
          style="max-width: 260px; font-family:'EB Garamond',serif"
        />
      </v-card-title>

      <!-- Paginación superior -->
      <div v-if="!buscarGlosario" class="d-flex align-center justify-center gap-2 px-5 pb-2">
        <v-btn icon size="small" variant="text" color="secondary" :disabled="paginaGlosario === 1" @click="paginaGlosario--">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
          v-for="p in totalPaginas" :key="p"
          size="small"
          :variant="paginaGlosario === p ? 'flat' : 'outlined'"
          :color="paginaGlosario === p ? 'secondary' : 'default'"
          rounded="xl"
          style="min-width:36px;font-family:'Cinzel',serif;font-size:0.75rem"
          @click="paginaGlosario = p"
        >
          {{ p }}
        </v-btn>
        <v-btn icon size="small" variant="text" color="secondary" :disabled="paginaGlosario === totalPaginas" @click="paginaGlosario++">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <v-chip size="x-small" variant="outlined" color="secondary" style="font-family:'EB Garamond',serif">
          {{ letrasPagina }}
        </v-chip>
      </div>

      <v-card-text class="pa-5 pt-2">
        <v-row>
          <v-col v-for="termino in terminosVisibles" :key="termino.palabra" cols="12" sm="6">
            <div class="pa-4 rounded-xl glosario-item" style="border-left:4px solid #7E57C2;margin-bottom:8px">
              <div class="d-flex align-center gap-2 mb-1">
                <span style="font-weight:800;color:var(--text-primary);font-size:1rem;font-family:'Cinzel',serif">{{ termino.palabra }}</span>
                <v-chip v-if="termino.origen" size="x-small" variant="outlined" color="secondary" style="font-family:'EB Garamond',serif;font-size:0.65rem">{{ termino.origen }}</v-chip>
              </div>
              <div style="font-size:0.92rem;color:var(--text-muted);line-height:1.6;margin-top:4px;font-family:'EB Garamond',serif">{{ termino.definicion }}</div>
            </div>
          </v-col>
        </v-row>
        <div v-if="terminosVisibles.length === 0" class="text-center pa-6" style="color:var(--text-muted);font-family:'EB Garamond',serif;font-style:italic">
          No se encontraron términos para "{{ buscarGlosario }}"
        </div>
      </v-card-text>
    </v-card>

    <!-- Lecturas y videos recomendados -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="3" class="h-100">
          <v-card-title class="pa-5 pb-2">
            <v-icon color="primary" class="mr-2">mdi-book-open</v-icon>
            <span style="font-family:'Cinzel',serif">Lecturas Recomendadas</span>
          </v-card-title>
          <v-card-text class="pa-5 pt-2">
            <a v-for="libro in libros" :key="libro.titulo" :href="libro.url" target="_blank" rel="noopener" class="d-flex align-start mb-3 pa-3 rounded-xl recurso-link" style="background:var(--bg-light);text-decoration:none" :aria-label="libro.titulo + ' (' + libro.tipo + ') - Abrir en nueva pestaña'">
              <span style="margin-right:10px; color: #C9A84C"><v-icon size="40">{{ libro.icon }}</v-icon></span>
              <div>
                <div style="font-weight:800;font-size:0.93rem;color:var(--text-dark)">{{ libro.titulo }}</div>
                <div style="font-size:0.82rem;color:var(--text-muted)">{{ libro.descripcion }}</div>
                <v-chip size="x-small" :color="libro.tipo === 'PDF' ? 'error' : libro.tipo === 'Web' ? 'primary' : 'secondary'" class="mt-1" style="font-family:'Cinzel',serif;font-size:0.6rem">
                  {{ libro.tipo }} · Abrir ↗
                </v-chip>
              </div>
            </a>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card rounded="xl" elevation="3" class="h-100">
          <v-card-title class="pa-5 pb-2">
            <v-icon color="error" class="mr-2">mdi-youtube</v-icon>
            <span style="font-family:'Cinzel',serif">Videos Recomendados</span>
          </v-card-title>
          <v-card-text class="pa-5 pt-2">
            <a v-for="vid in videosExtra" :key="vid.titulo" :href="vid.url" target="_blank" rel="noopener" class="d-flex align-start mb-3 pa-3 rounded-xl recurso-link" style="background:var(--bg-light);text-decoration:none" :aria-label="vid.titulo + ' - Ver video en YouTube'">
              <span style="margin-right:10px; color: #C9A84C"><v-icon size="40">{{ vid.icon }}</v-icon></span>
              <div>
                <div style="font-weight:800;font-size:0.93rem;color:var(--text-dark)">{{ vid.titulo }}</div>
                <div style="font-size:0.82rem;color:var(--text-muted)">{{ vid.descripcion }}</div>
                <v-chip size="x-small" color="error" class="mt-1" style="font-family:'Cinzel',serif;font-size:0.6rem">
                  YouTube · Ver ↗
                </v-chip>
              </div>
            </a>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <NavegacionPaginas />
  </div>
</template>

<script setup lang="ts">
import { useOvaStore } from '~/stores/ova'
import { useAccessibility } from '~/composables/useAccessibility'

const tienda = useOvaStore()
useAccessibility() // Mantén la instancia activa para que el watch funcione
onMounted(() => tienda.markPageVisited('recursos'))

const filosofos = [
  { nombre: 'Tales de Mileto', periodo: '624–546 a.C.', icon: 'mdi-water', color: 'blue-lighten-3', aporte: 'Primer filósofo de occidente. Creía que todo venía del agua.', cita: 'El agua es el principio de todas las cosas.' },
  { nombre: 'Sócrates', periodo: '470–399 a.C.', icon: 'mdi-pillar', color: 'purple-lighten-3', aporte: 'Creó el método socrático: enseñar preguntando. Fue condenado a muerte por sus ideas.', cita: 'Solo sé que no sé nada.' },
  { nombre: 'Platón', periodo: '427–347 a.C.', icon: 'mdi-star', color: 'indigo-lighten-3', aporte: 'Discípulo de Sócrates. Fundó La Academia, la primera universidad del mundo.', cita: 'El conocimiento es el recuerdo del alma.' },
  { nombre: 'Aristóteles', periodo: '384–322 a.C.', icon: 'mdi-bookshelf', color: 'teal-lighten-3', aporte: 'Estudió lógica, biología, política y ética. Maestro de Alejandro Magno.', cita: 'El hombre es un animal político.' },
  { nombre: 'Santo Tomás de Aquino', periodo: '1225–1274', icon: 'mdi-cross', color: 'amber-lighten-3', aporte: 'Máximo representante de la escolástica medieval. Unió fe cristiana y razón aristotélica.', cita: 'La verdad es la adecuación del intelecto a la cosa.' },
  { nombre: 'René Descartes', periodo: '1596–1650', icon: 'mdi-microscope', color: 'green-lighten-3', aporte: 'Padre de la filosofía moderna. Usó la duda metódica para encontrar certezas.', cita: 'Pienso, luego existo.' },
  { nombre: 'Immanuel Kant', periodo: '1724–1804', icon: 'mdi-scale-balance', color: 'orange-lighten-3', aporte: 'Revolucionó la filosofía con sus tres Críticas. Creó la ética del deber.', cita: 'Actúa solo según aquello que pudieras querer que fuera ley universal.' },
  { nombre: 'G.W.F. Hegel', periodo: '1770–1831', icon: 'mdi-sync', color: 'deep-purple-lighten-3', aporte: 'Creador del idealismo absoluto y la dialéctica (tesis-antítesis-síntesis).', cita: 'Lo real es racional y lo racional es real.' },
  { nombre: 'Karl Marx', periodo: '1818–1883', icon: 'mdi-hammer-wrench', color: 'red-lighten-3', aporte: 'Fundó el materialismo histórico. Analizó la alienación y la lucha de clases.', cita: 'Los filósofos solo han interpretado el mundo; de lo que se trata es de transformarlo.' },
  { nombre: 'Friedrich Nietzsche', periodo: '1844–1900', icon: 'mdi-lightning-bolt', color: 'yellow-lighten-3', aporte: 'Declaró "la muerte de Dios" y propuso la voluntad de poder y el superhombre.', cita: 'Lo que no me mata, me hace más fuerte.' },
  { nombre: 'Jean-Paul Sartre', periodo: '1905–1980', icon: 'mdi-walk', color: 'blue-grey-lighten-3', aporte: 'Padre del existencialismo. Afirmó que la existencia precede a la esencia.', cita: 'El hombre está condenado a ser libre.' },
  { nombre: 'Michel Foucault', periodo: '1926–1984', icon: 'mdi-magnify', color: 'pink-lighten-3', aporte: 'Estudió las relaciones entre poder, conocimiento y control social.', cita: 'Donde hay poder, hay resistencia.' },
]

const buscarGlosario = ref('')
const paginaGlosario = ref(1)
const TERMINOS_POR_PAGINA = 10

import { glosario } from '~/data/glosario'

const totalPaginas = computed(() => Math.ceil(glosario.length / TERMINOS_POR_PAGINA))

const glosarioFiltrado = computed(() => {
  const q = (buscarGlosario.value || '').toLowerCase().trim()
  if (!q) return glosario
  return glosario.filter(t => t.palabra.toLowerCase().includes(q) || t.definicion.toLowerCase().includes(q))
})

const terminosVisibles = computed(() => {
  if (buscarGlosario.value) return glosarioFiltrado.value
  const inicio = (paginaGlosario.value - 1) * TERMINOS_POR_PAGINA
  return glosario.slice(inicio, inicio + TERMINOS_POR_PAGINA)
})

const letrasPagina = computed(() => {
  const items = terminosVisibles.value
  if (items.length === 0) return ''
  const primera = items[0].palabra[0]
  const ultima = items[items.length - 1].palabra[0]
  return primera === ultima ? primera : `${primera} — ${ultima}`
})

const libros = [
  { icon: 'mdi-book', titulo: 'La República — Platón', descripcion: 'Texto completo en español de la obra más influyente de Platón, incluyendo la Alegoría de la Caverna. Dominio público.', url: 'https://www.elejandria.com/libro/la-republica/platon/45', tipo: 'Web' },
  { icon: 'mdi-book-open-page-variant', titulo: 'Apología de Sócrates — Platón', descripcion: 'El discurso de defensa de Sócrates ante el tribunal que lo condenaría a muerte. Descarga gratuita.', url: 'https://www.elejandria.com/libro/apologia-de-socrates/platon/44', tipo: 'Web' },
  { icon: 'mdi-bookshelf', titulo: 'Ética a Nicómaco — Aristóteles', descripcion: 'Obra fundamental donde Aristóteles explora la virtud, la felicidad y el bien vivir. Versión en español.', url: 'https://www.elejandria.com/libro/etica-a-nicomaco/aristoteles/227', tipo: 'Web' },
  { icon: 'mdi-book-education', titulo: 'El Mundo de Sofía — Jostein Gaarder', descripcion: 'Ficha del best-seller que recorre toda la historia de la filosofía occidental en forma de novela.', url: 'https://es.wikipedia.org/wiki/El_mundo_de_Sof%C3%ADa', tipo: 'Web' },
  { icon: 'mdi-web', titulo: 'Biblioteca Virtual Miguel de Cervantes', descripcion: 'Miles de obras clásicas en español de acceso libre, incluyendo textos filosóficos fundamentales.', url: 'https://www.cervantesvirtual.com/portales/platon/', tipo: 'Web' },
  { icon: 'mdi-wikipedia', titulo: 'Wikipedia: Historia de la Filosofía', descripcion: 'Artículo extenso y bien referenciado con la evolución del pensamiento filosófico occidental.', url: 'https://es.wikipedia.org/wiki/Historia_de_la_filosof%C3%ADa', tipo: 'Web' },
]

const videosExtra = [
  { icon: 'mdi-play-circle', titulo: '¿Qué es la Filosofía? — Educatina', descripcion: 'Introducción en español a la filosofía: definición, ramas y su importancia. Canal educativo.', url: 'https://www.youtube.com/watch?v=HxpgVhX59F4' },
  { icon: 'mdi-play-circle', titulo: '¿Quién fue Sócrates? — En 20 minutos', descripcion: 'Explicación completa en español del método socrático, la mayéutica y su trágica muerte.', url: 'https://www.youtube.com/watch?v=kY3P95d10r8' },
  { icon: 'mdi-play-circle', titulo: 'El Mito de la Caverna — TED-Ed (Subtitulado)', descripcion: 'Explicación animada de la alegoría más famosa de la filosofía. Video TED-Ed con subtítulos en español.', url: 'https://www.youtube.com/watch?v=1RWOpQXTltA' },
  { icon: 'mdi-play-circle', titulo: '¿Qué es la Ética? — Educatina', descripcion: 'Diferencia entre ética y moral, ramas de la ética y su importancia para la vida. En español.', url: 'https://www.youtube.com/watch?v=R9jJ_w7H21A' },
  { icon: 'mdi-play-circle', titulo: 'Aristóteles: Ética y Política — Adictos a la Filosofía', descripcion: 'El ser humano como animal político, la eudaimonía y el término medio. Completamente en español.', url: 'https://www.youtube.com/watch?v=33PYT1aIQxI' },
  { icon: 'mdi-play-circle', titulo: 'Crash Course: Filosofía #1 (Subtitulado)', descripcion: 'Primer episodio de la famosa serie Crash Course Philosophy. Disponible con subtítulos en español.', url: 'https://www.youtube.com/watch?v=1A_CAkYt3GY' },
]
</script>

<style scoped>
.recurso-link {
  transition: all 0.2s;
  border: 1px solid transparent;
}
.recurso-link:hover {
  border-color: rgba(201,168,76,0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.glosario-item {
  background: var(--bg-light);
  transition: all 0.2s;
}
.glosario-item:hover {
  background: rgba(126,87,194,0.06);
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(126,87,194,0.1);
}
</style>
