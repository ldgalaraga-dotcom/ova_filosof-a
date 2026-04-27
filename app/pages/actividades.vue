<template>
  <div>
    <!-- Encabezado -->
    <div class="d-flex align-center justify-space-between mb-5">
      <div class="d-flex align-center">
        <v-icon color="secondary" size="38" class="mr-3">mdi-pencil-box-multiple</v-icon>
        <div>
          <h1 style="font-family:'Fredoka One',cursive;font-size:1.9rem;color:#FF8F00;line-height:1.1">
            Actividades
          </h1>
          <div style="color:#888;font-size:0.95rem">¡Aprende jugando! ✏️</div>
        </div>
      </div>
      <v-chip color="secondary" size="small" prepend-icon="mdi-check-circle">
        {{ cantidadCompletadas }}/4
      </v-chip>
    </div>

    <!-- Selector de actividades (4 tarjetas) -->
    <v-row class="mb-5">
      <v-col v-for="(act, idx) in actividades" :key="idx" cols="6" sm="3">
        <v-card
          rounded="xl"
          elevation="2"
          style="cursor:pointer;border:3px solid transparent;transition:all .2s"
          :style="actividadActual === idx ? 'border-color:#5E35B1;background:#EDE7F6' : ''"
          @click="actividadActual = idx"
        >
          <v-card-text class="pa-4 text-center">
            <div style="font-size:2rem;margin-bottom:4px">{{ act.emoji }}</div>
            <div style="font-size:0.85rem;font-weight:800;color:#333">{{ act.nombre }}</div>
            <v-chip
              :color="tienda.completedActivities.includes(idx) ? 'success' : 'grey-lighten-3'"
              size="x-small"
              class="mt-2"
              label
            >
              {{ tienda.completedActivities.includes(idx) ? '✅ Lista' : 'Pendiente' }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Ventana de actividades -->
    <v-window v-model="actividadActual">

      <!-- ACTIVIDAD 1: Quiz Verdadero/Falso -->
      <v-window-item :value="0">
        <v-card rounded="xl" elevation="3">
          <v-card-title class="pa-5 pb-2">
            <v-icon color="purple" class="mr-2">mdi-brain</v-icon>
            <span style="font-family:'Fredoka One',cursive">¿Verdadero o Falso?</span>
          </v-card-title>
          <v-card-text class="pa-5">
            <div v-for="(pregunta, i) in preguntasVF" :key="i" class="mb-4">
              <v-card variant="outlined" rounded="xl" class="pa-4"
                :color="respuestasVF[i] === null ? '' : (respuestasVF[i] === pregunta.correcto ? 'success' : 'error')"
              >
                <div style="font-size:1rem;font-weight:700;color:#333;margin-bottom:10px">
                  {{ i + 1 }}. {{ pregunta.enunciado }}
                </div>
                <div v-if="respuestasVF[i] === null" class="d-flex gap-3">
                  <v-btn color="success" variant="tonal" rounded="xl" @click="responderVF(i, true)">
                    ✅ Verdadero
                  </v-btn>
                  <v-btn color="error" variant="tonal" rounded="xl" @click="responderVF(i, false)">
                    ❌ Falso
                  </v-btn>
                </div>
                <div v-else style="font-size:0.9rem;color:#555">
                  <strong>{{ respuestasVF[i] === pregunta.correcto ? '¡Correcto! 🎉' : 'Incorrecto 💡' }}</strong>
                  — {{ pregunta.explicacion }}
                </div>
              </v-card>
            </div>
            <div v-if="vfCompletado" class="text-center mt-3">
              <v-btn color="success" rounded="xl" @click="tienda.completeActivity(0)">
                <v-icon class="mr-1">mdi-check</v-icon> Marcar completada
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-window-item>

      <!-- ACTIVIDAD 2: Emparejar filósofo + idea -->
      <v-window-item :value="1">
        <v-card rounded="xl" elevation="3">
          <v-card-title class="pa-5 pb-2">
            <v-icon color="primary" class="mr-2">mdi-puzzle</v-icon>
            <span style="font-family:'Fredoka One',cursive">Emparejar filósofo con su idea</span>
          </v-card-title>
          <v-card-subtitle class="px-5 pb-1">
            Toca un filósofo y luego su idea 🧩
          </v-card-subtitle>
          <v-card-text class="pa-5">
            <v-row>
              <v-col cols="12" md="6">
                <div class="text-center mb-2"><v-chip color="primary" size="small">👤 Filósofo</v-chip></div>
                <div
                  v-for="fil in juegoEmparejamiento.filosofos"
                  :key="fil.id"
                  class="match-card pa-3 rounded-xl mb-3 text-center"
                  :class="claseFilosofo(fil.id)"
                  style="background:#EDE7F6;border:3px solid transparent;transition:all .2s;cursor:pointer"
                  @click="seleccionarFilosofo(fil.id)"
                >
                  <div style="font-size:1.8rem">{{ fil.emoji }}</div>
                  <div style="font-weight:800;font-size:0.95rem;color:#333">{{ fil.nombre }}</div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="text-center mb-2"><v-chip color="secondary" size="small">💡 Idea</v-chip></div>
                <div
                  v-for="idea in juegoEmparejamiento.ideas"
                  :key="idea.id"
                  class="pa-3 rounded-xl mb-3"
                  :class="claseIdea(idea.id)"
                  style="background:#FFF3E0;border:3px solid transparent;transition:all .2s;cursor:pointer;font-size:0.92rem;color:#555;font-style:italic"
                  @click="seleccionarIdea(idea.id)"
                >
                  "{{ idea.texto }}"
                </div>
              </v-col>
            </v-row>
            <div class="mt-3 d-flex gap-3 align-center">
              <div style="color:#888;font-size:0.88rem">
                Pares: {{ juegoEmparejamiento.paresCorrectos }}/{{ juegoEmparejamiento.filosofos.length }}
              </div>
              <v-btn v-if="juegoEmparejamiento.paresCorrectos > 0" color="grey" variant="outlined" size="small" rounded="xl" @click="reiniciarEmparejamiento">
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </div>
            <div v-if="juegoEmparejamiento.paresCorrectos === juegoEmparejamiento.filosofos.length" class="text-center mt-4">
              <v-alert type="success" rounded="xl" class="mb-3">🎉 ¡Perfecto! Relacionaste a todos.</v-alert>
              <v-btn color="success" rounded="xl" @click="tienda.completeActivity(1)">
                <v-icon class="mr-1">mdi-check</v-icon> Marcar completada
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-window-item>

      <!-- ACTIVIDAD 3: Ordenar pasos -->
      <v-window-item :value="2">
        <v-card rounded="xl" elevation="3">
          <v-card-title class="pa-5 pb-2">
            <v-icon color="blue" class="mr-2">mdi-sort</v-icon>
            <span style="font-family:'Fredoka One',cursive">Ordena los pasos del filósofo</span>
          </v-card-title>
          <v-card-subtitle class="px-5 pb-1">
            Toca en el orden correcto (1 → 5) 🔢
          </v-card-subtitle>
          <v-card-text class="pa-5">
            <v-row>
              <v-col v-for="paso in juegoOrden.pasosMezclados" :key="paso.id" cols="6" sm="4">
                <div
                  class="pa-4 rounded-xl text-center mb-2"
                  :class="claseOrden(paso.id)"
                  style="background:#E3F2FD;border:3px solid transparent;transition:all .2s;cursor:pointer"
                  @click="tocarPasoOrden(paso.id)"
                >
                  <div style="font-size:2rem;margin-bottom:6px">{{ paso.emoji }}</div>
                  <div style="font-size:0.88rem;font-weight:800;color:#333">{{ paso.etiqueta }}</div>
                </div>
              </v-col>
            </v-row>

            <div v-if="juegoOrden.seleccionados.length" class="mt-3">
              <div style="font-weight:700;font-size:0.9rem;color:#555;margin-bottom:6px">Tu orden:</div>
              <div class="d-flex flex-wrap gap-2">
                <v-chip
                  v-for="(id, i) in juegoOrden.seleccionados"
                  :key="id"
                  :color="juegoOrden.completado ? (juegoOrden.ordenCorrecto[i] === id ? 'success' : 'error') : 'primary'"
                  size="small"
                >
                  {{ i + 1 }}. {{ juegoOrden.pasosMezclados.find(s => s.id === id)?.etiqueta }}
                </v-chip>
              </div>
            </div>

            <div v-if="juegoOrden.seleccionados.length === 5 && !juegoOrden.completado" class="mt-4">
              <v-btn color="primary" rounded="xl" @click="verificarOrden">
                <v-icon class="mr-1">mdi-check</v-icon> Verificar
              </v-btn>
            </div>
            <div v-if="juegoOrden.completado" class="mt-4">
              <v-alert :type="juegoOrden.esCorrecto ? 'success' : 'warning'" rounded="xl" class="mb-3">
                {{ juegoOrden.esCorrecto ? '🎉 ¡Orden correcto!' : '💡 Orden correcto: Observar → Preguntar → Razonar → Argumentar → Concluir' }}
              </v-alert>
              <div class="d-flex gap-3">
                <v-btn v-if="!juegoOrden.esCorrecto" color="grey" variant="outlined" rounded="xl" @click="reiniciarOrden">
                  <v-icon class="mr-1">mdi-refresh</v-icon> Reintentar
                </v-btn>
                <v-btn color="success" rounded="xl" @click="tienda.completeActivity(2)">
                  <v-icon class="mr-1">mdi-check</v-icon> Marcar completada
                </v-btn>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-window-item>

      <!-- ACTIVIDAD 4: Preguntas finales -->
      <v-window-item :value="3">
        <v-card rounded="xl" elevation="3">
          <v-card-title class="pa-5 pb-2">
            <v-icon color="green" class="mr-2">mdi-help-circle</v-icon>
            <span style="font-family:'Fredoka One',cursive">Preguntas rápidas</span>
          </v-card-title>
          <v-card-text class="pa-5">
            <div v-for="(preg, i) in preguntasFinales" :key="i" class="mb-4">
              <v-card variant="outlined" rounded="xl" class="pa-4">
                <div style="font-size:1rem;font-weight:700;color:#333;margin-bottom:10px">
                  {{ preg.emoji }} {{ preg.pregunta }}
                </div>
                <v-row>
                  <v-col v-for="(op, oi) in preg.opciones" :key="oi" cols="12" sm="6">
                    <v-btn
                      block
                      rounded="xl"
                      variant="tonal"
                      :color="respuestasFinales[i] === oi
                        ? (oi === preg.correcto ? 'success' : 'error')
                        : 'grey-lighten-2'"
                      @click="responderFinal(i, oi)"
                    >
                      {{ op }}
                    </v-btn>
                  </v-col>
                </v-row>
                <div v-if="respuestasFinales[i] !== null" class="mt-2" style="font-size:0.88rem;color:#777">
                  {{ respuestasFinales[i] === preg.correcto ? '✅ ¡Correcto!' : `❌ La respuesta es: ${preg.opciones[preg.correcto]}` }}
                </div>
              </v-card>
            </div>
            <div v-if="finalesCompletado" class="text-center mt-3">
              <v-btn color="success" rounded="xl" @click="tienda.completeActivity(3)">
                <v-icon class="mr-1">mdi-check</v-icon> Marcar completada
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-window-item>
    </v-window>

    <!-- Completado todo -->
    <v-card v-if="todasCompletadas" class="mt-6" color="success" rounded="xl" elevation="3">
      <v-card-text class="pa-5 text-center">
        <div style="font-size:3rem">🏆🎉</div>
        <div style="font-family:'Fredoka One',cursive;font-size:1.5rem;color:white;margin:8px 0">
          ¡Completaste todo!
        </div>
        <v-btn color="white" to="/evaluacion" size="large" prepend-icon="mdi-clipboard-check" rounded="xl">
          Ir a la Evaluación
        </v-btn>
      </v-card-text>
    </v-card>

    <NavegacionPaginas />
  </div>
</template>

<script setup lang="ts">
import { useOvaStore } from '~/stores/ova'

const tienda = useOvaStore()
onMounted(() => tienda.markPageVisited('actividades'))

const actividadActual = ref(0)
const actividades = [
  { emoji: '🧠', nombre: 'V o F' },
  { emoji: '🧩', nombre: 'Emparejar' },
  { emoji: '🔢', nombre: 'Ordenar' },
  { emoji: '✅', nombre: 'Preguntas' },
]
const cantidadCompletadas = computed(() => tienda.completedActivities.length)
const todasCompletadas = computed(() => tienda.completedActivities.length === 4)

// ---- ACTIVIDAD 1: Verdadero/Falso ----
const preguntasVF = [
  { enunciado: 'La filosofía busca respuestas haciendo preguntas.', correcto: true, explicacion: 'Sí. Preguntar es el corazón de la filosofía.' },
  { enunciado: 'Sócrates escribió muchos libros.', correcto: false, explicacion: 'No. Sócrates enseñaba hablando. Sus ideas las escribió Platón.' },
  { enunciado: 'La ética estudia lo correcto e incorrecto.', correcto: true, explicacion: 'Sí. La ética nos ayuda a decidir cómo actuar bien.' },
]
const respuestasVF = ref<(boolean | null)[]>(Array(preguntasVF.length).fill(null))
const vfCompletado = computed(() => respuestasVF.value.every(r => r !== null))
function responderVF(i: number, valor: boolean) { respuestasVF.value[i] = valor }

// ---- ACTIVIDAD 2: Emparejar ----
const juegoEmparejamiento = reactive({
  filosofos: [
    { id: 'soc', nombre: 'Sócrates', emoji: '🏛️' },
    { id: 'ari', nombre: 'Aristóteles', emoji: '📚' },
    { id: 'kan', nombre: 'Kant', emoji: '⚖️' },
  ],
  ideas: [
    { id: 'soc', texto: 'Solo sé que no sé nada.' },
    { id: 'ari', texto: 'La felicidad es la meta de la vida.' },
    { id: 'kan', texto: 'Actúa como si tu regla fuera ley universal.' },
  ].sort(() => Math.random() - 0.5),
  seleccionadoFilosofo: null as string | null,
  seleccionadaIdea: null as string | null,
  emparejados: {} as Record<string, string>,
  paresCorrectos: 0,
})

function claseFilosofo(id: string) {
  if (juegoEmparejamiento.emparejados[id]) return 'border-success-match'
  if (juegoEmparejamiento.seleccionadoFilosofo === id) return 'border-selected-match'
  return ''
}
function claseIdea(id: string) {
  if (Object.values(juegoEmparejamiento.emparejados).includes(id)) return 'border-success-match'
  if (juegoEmparejamiento.seleccionadaIdea === id) return 'border-selected-match'
  return ''
}
function seleccionarFilosofo(id: string) {
  if (juegoEmparejamiento.emparejados[id]) return
  juegoEmparejamiento.seleccionadoFilosofo = id
  intentarEmparejar()
}
function seleccionarIdea(id: string) {
  if (Object.values(juegoEmparejamiento.emparejados).includes(id)) return
  juegoEmparejamiento.seleccionadaIdea = id
  intentarEmparejar()
}
function intentarEmparejar() {
  const { seleccionadoFilosofo: f, seleccionadaIdea: i } = juegoEmparejamiento
  if (!f || !i) return
  if (f === i) {
    juegoEmparejamiento.emparejados[f] = i
    juegoEmparejamiento.paresCorrectos++
  }
  setTimeout(() => {
    juegoEmparejamiento.seleccionadoFilosofo = null
    juegoEmparejamiento.seleccionadaIdea = null
  }, 350)
}
function reiniciarEmparejamiento() {
  juegoEmparejamiento.emparejados = {}
  juegoEmparejamiento.paresCorrectos = 0
  juegoEmparejamiento.seleccionadoFilosofo = null
  juegoEmparejamiento.seleccionadaIdea = null
}

// ---- ACTIVIDAD 3: Ordenar pasos ----
const pasosBase = [
  { id: 1, emoji: '👁️', etiqueta: 'Observar' },
  { id: 2, emoji: '❓', etiqueta: 'Preguntar' },
  { id: 3, emoji: '🧠', etiqueta: 'Razonar' },
  { id: 4, emoji: '💬', etiqueta: 'Argumentar' },
  { id: 5, emoji: '✅', etiqueta: 'Concluir' },
]
const juegoOrden = reactive({
  pasosMezclados: [...pasosBase].sort(() => Math.random() - 0.5),
  seleccionados: [] as number[],
  ordenCorrecto: [1, 2, 3, 4, 5],
  completado: false,
  esCorrecto: false,
})
function claseOrden(id: number) {
  if (juegoOrden.seleccionados.includes(id)) {
    if (juegoOrden.completado) {
      const pos = juegoOrden.seleccionados.indexOf(id)
      return juegoOrden.ordenCorrecto[pos] === id ? 'border-success-match' : 'border-error-match'
    }
    return 'border-selected-match'
  }
  return ''
}
function tocarPasoOrden(id: number) {
  if (juegoOrden.seleccionados.includes(id) || juegoOrden.completado) return
  juegoOrden.seleccionados.push(id)
}
function verificarOrden() {
  juegoOrden.completado = true
  juegoOrden.esCorrecto = juegoOrden.seleccionados.every((id, i) => id === juegoOrden.ordenCorrecto[i])
}
function reiniciarOrden() {
  juegoOrden.seleccionados = []
  juegoOrden.completado = false
  juegoOrden.esCorrecto = false
  juegoOrden.pasosMezclados = [...pasosBase].sort(() => Math.random() - 0.5)
}

// ---- ACTIVIDAD 4: Preguntas finales ----
const preguntasFinales = [
  { emoji: '🤔', pregunta: '¿Qué significa filosofía?', opciones: ['Amor a la sabiduría', 'Amor al dinero', 'Amor a los juegos'], correcto: 0 },
  { emoji: '👀', pregunta: '¿Qué hace un filósofo?', opciones: ['Pregunta sobre todo', 'Corre muy rápido', 'Cocina rico'], correcto: 0 },
  { emoji: '⚖️', pregunta: 'La ética estudia…', opciones: ['Lo correcto e incorrecto', 'El clima', 'Los animales'], correcto: 0 },
]
const respuestasFinales = ref<(number | null)[]>(Array(preguntasFinales.length).fill(null))
const finalesCompletado = computed(() => respuestasFinales.value.every(r => r !== null))
function responderFinal(i: number, opcion: number) { respuestasFinales.value[i] = opcion }
</script>

<style scoped>
.border-selected-match { border-color: #5E35B1 !important; background: #EDE7F6 !important; }
.border-success-match  { border-color: #43A047 !important; background: #C8E6C9 !important; }
.border-error-match    { border-color: #E53935 !important; background: #FFCDD2 !important; }
</style>
