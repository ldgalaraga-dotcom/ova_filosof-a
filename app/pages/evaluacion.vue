<template>
  <div>
    <!-- Encabezado -->
    <div class="d-flex align-center mb-5">
      <v-icon color="primary" size="38" class="mr-3">mdi-clipboard-check</v-icon>
      <div>
        <h1 style="font-family:'Fredoka One',cursive;font-size:1.9rem;color:#5E35B1;line-height:1.1">Evaluación</h1>
        <div style="color:#888;font-size:0.95rem">Demuestra lo que sabes 🏆</div>
      </div>
    </div>

    <!-- Resultado final -->
    <div v-if="tienda.evaluationCompleted && !mostrandoQuiz">
      <v-card rounded="xl" elevation="4" class="text-center pa-8">
        <div style="font-size:5rem;margin-bottom:12px">
          {{ tienda.evaluationScore! >= 80 ? '🌟' : tienda.evaluationScore! >= 60 ? '👍' : '💪' }}
        </div>
        <div style="font-family:'Fredoka One',cursive;font-size:2rem;color:#5E35B1;margin-bottom:6px">
          {{ tienda.scoreLabel }}
        </div>
        <div style="font-size:2.5rem;font-weight:900;color:#5E35B1;margin-bottom:20px">
          {{ tienda.evaluationScore }}%
        </div>
        <v-progress-linear
          :model-value="tienda.evaluationScore ?? 0"
          :color="tienda.evaluationScore! >= 80 ? 'success' : tienda.evaluationScore! >= 60 ? 'warning' : 'error'"
          height="18" rounded class="mb-6"
        >
          <template #default="{ value }">
            <strong style="color:white">{{ Math.ceil(value) }}%</strong>
          </template>
        </v-progress-linear>
        <v-row justify="center" class="mb-5">
          <v-col cols="auto">
            <v-card color="#E8F5E9" rounded="xl" class="pa-4 text-center" min-width="100">
              <div style="font-size:2rem;font-weight:900;color:#43A047">{{ cantidadCorrectas }}</div>
              <div style="font-size:0.82rem;color:#666">Correctas</div>
            </v-card>
          </v-col>
          <v-col cols="auto">
            <v-card color="#FFEBEE" rounded="xl" class="pa-4 text-center" min-width="100">
              <div style="font-size:2rem;font-weight:900;color:#E53935">{{ preguntas.length - cantidadCorrectas }}</div>
              <div style="font-size:0.82rem;color:#666">Incorrectas</div>
            </v-card>
          </v-col>
        </v-row>
        <div class="d-flex justify-center gap-3 flex-wrap">
          <v-btn color="primary" size="large" rounded="xl" prepend-icon="mdi-refresh" @click="reiniciarEvaluacion">
            Intentar de nuevo
          </v-btn>
          <v-btn color="secondary" size="large" rounded="xl" to="/recursos" prepend-icon="mdi-bookshelf">
            Ver Recursos
          </v-btn>
        </div>
      </v-card>
    </div>

    <!-- Pantalla de inicio -->
    <div v-else-if="!mostrandoQuiz">
      <v-card color="primary" rounded="xl" elevation="3" class="text-center pa-8">
        <div style="font-size:3rem;margin-bottom:8px">📋</div>
        <div style="font-family:'Fredoka One',cursive;font-size:1.5rem;color:white;margin-bottom:8px">
          {{ preguntas.length }} preguntas · Una respuesta correcta cada una
        </div>
        <v-btn color="white" size="x-large" rounded="xl" prepend-icon="mdi-play" @click="iniciarEvaluacion">
          ¡Comenzar!
        </v-btn>
      </v-card>
    </div>

    <!-- Quiz en progreso -->
    <div v-else>
      <!-- Barra progreso -->
      <v-card rounded="xl" class="mb-4" elevation="2">
        <v-card-text class="pa-3">
          <div class="d-flex justify-space-between align-center mb-1">
            <span style="font-weight:700;color:#5E35B1;font-size:0.95rem">
              Pregunta {{ preguntaActual + 1 }} / {{ preguntas.length }}
            </span>
            <v-chip color="primary" size="small">
              {{ Math.round((preguntaActual / preguntas.length) * 100) }}%
            </v-chip>
          </div>
          <v-progress-linear :model-value="(preguntaActual / preguntas.length) * 100" color="primary" height="8" rounded />
        </v-card-text>
      </v-card>

      <!-- Tarjeta pregunta -->
      <v-card rounded="xl" elevation="4" class="mb-4">
        <v-card-text class="pa-5">
          <div style="font-size:1.1rem;font-weight:700;color:#333;margin-bottom:20px;line-height:1.6">
            {{ preguntaActual + 1 }}. {{ preguntas[preguntaActual].pregunta }}
          </div>
          <div
            v-for="(op, oi) in preguntas[preguntaActual].opciones"
            :key="oi"
            class="pa-4 rounded-xl mb-3"
            :class="claseOpcion(oi)"
            style="cursor:pointer;border:2px solid #e0e0e0;transition:all .15s;font-size:1rem;color:#333"
            @click="seleccionarOpcion(oi)"
          >
            <span style="font-weight:800;margin-right:10px;color:#9575CD">{{ String.fromCharCode(65+oi) }}.</span>
            {{ op }}
            <v-icon v-if="yaRespondido && oi === preguntas[preguntaActual].correcto" color="success" class="float-right">mdi-check-circle</v-icon>
            <v-icon v-else-if="yaRespondido && oi === opcionSeleccionada && oi !== preguntas[preguntaActual].correcto" color="error" class="float-right">mdi-close-circle</v-icon>
          </div>

          <!-- Explicación -->
          <v-alert v-if="yaRespondido"
            :type="opcionSeleccionada === preguntas[preguntaActual].correcto ? 'success' : 'warning'"
            rounded="xl" class="mt-3" density="compact"
          >
            {{ preguntas[preguntaActual].explicacion }}
          </v-alert>
        </v-card-text>
      </v-card>

      <!-- Botón siguiente -->
      <div v-if="yaRespondido" class="text-center">
        <v-btn
          v-if="preguntaActual < preguntas.length - 1"
          color="primary" size="x-large" rounded="xl"
          prepend-icon="mdi-arrow-right" @click="siguientePregunta"
        >
          Siguiente
        </v-btn>
        <v-btn
          v-else
          color="success" size="x-large" rounded="xl"
          prepend-icon="mdi-flag-checkered" @click="terminarEvaluacion"
        >
          ¡Ver resultados!
        </v-btn>
      </div>
    </div>

    <NavegacionPaginas />
  </div>
</template>

<script setup lang="ts">
import { useOvaStore } from '~/stores/ova'

const tienda = useOvaStore()
onMounted(() => tienda.markPageVisited('evaluacion'))

const mostrandoQuiz = ref(false)
const preguntaActual = ref(0)
const opcionSeleccionada = ref<number | null>(null)
const yaRespondido = ref(false)
const respuestasUsuario = ref<number[]>([])

const preguntas = [
  { pregunta: '¿Qué significa la palabra "filosofía"?', opciones: ['Amor a la ciencia', 'Amor a la sabiduría', 'Amor a la naturaleza', 'Amor al arte'], correcto: 1, explicacion: '"Philo" = amor y "sophia" = sabiduría, en griego.' },
  { pregunta: '¿Cuál frase dijo Sócrates?', opciones: ['El hombre es un animal político', 'Solo sé que no sé nada', 'Pienso, luego existo', 'El conocimiento es poder'], correcto: 1, explicacion: 'Sócrates enseñaba que el primer paso a la sabiduría es reconocer nuestra ignorancia.' },
  { pregunta: '¿Qué estudia la ética?', opciones: ['La belleza', 'El conocimiento', 'Lo correcto e incorrecto', 'El universo'], correcto: 2, explicacion: 'La ética estudia la moral, los valores y la conducta humana.' },
  { pregunta: '¿Quién dijo "Pienso, luego existo"?', opciones: ['Platón', 'Kant', 'Aristóteles', 'Descartes'], correcto: 3, explicacion: 'René Descartes usó esta frase para probar la certeza de su propia existencia.' },
  { pregunta: '¿Qué estudia la epistemología?', opciones: ['La belleza en el arte', 'El origen del universo', 'El conocimiento y sus límites', 'La conducta moral'], correcto: 2, explicacion: 'La epistemología estudia cómo conocemos, sus límites y qué es la verdad.' },
  { pregunta: '¿Dónde nació la filosofía occidental?', opciones: ['Roma, siglo I d.C.', 'Grecia Antigua, siglo VI a.C.', 'Egipto, siglo X a.C.', 'China, siglo III a.C.'], correcto: 1, explicacion: 'La filosofía occidental nació en la Antigua Grecia con filósofos como Tales de Mileto.' },
  { pregunta: '¿Cuál NO es un filósofo griego?', opciones: ['Sócrates', 'Platón', 'Descartes', 'Aristóteles'], correcto: 2, explicacion: 'Descartes fue filósofo francés del siglo XVII.' },
  { pregunta: 'Aristóteles decía que el ser humano es…', opciones: ['Un ser espiritual', 'Un animal político', 'Una mente pura', 'Un ser racional aislado'], correcto: 1, explicacion: 'Aristóteles decía "zoon politikon": el hombre necesita vivir en sociedad.' },
  { pregunta: '¿Cuál es el primer paso del método filosófico?', opciones: ['Argumentar', 'Concluir', 'Observar', 'Razonar'], correcto: 2, explicacion: 'El método comienza observando el mundo, luego preguntar, razonar, argumentar y concluir.' },
  { pregunta: '¿Qué es un dilema ético?', opciones: ['Un problema matemático', 'Una situación donde dos valores entran en conflicto', 'Una discusión política', 'Un debate entre filósofos'], correcto: 1, explicacion: 'Un dilema ético es cuando debemos elegir entre dos opciones con consecuencias morales importantes.' },
]

const cantidadCorrectas = computed(() =>
  respuestasUsuario.value.filter((r, i) => r === preguntas[i].correcto).length
)

function iniciarEvaluacion() {
  mostrandoQuiz.value = true
  preguntaActual.value = 0
  respuestasUsuario.value = []
  opcionSeleccionada.value = null
  yaRespondido.value = false
}

function seleccionarOpcion(oi: number) {
  if (yaRespondido.value) return
  opcionSeleccionada.value = oi
  yaRespondido.value = true
  respuestasUsuario.value.push(oi)
}

function siguientePregunta() {
  preguntaActual.value++
  opcionSeleccionada.value = null
  yaRespondido.value = false
}

function terminarEvaluacion() {
  const puntaje = Math.round((cantidadCorrectas.value / preguntas.length) * 100)
  tienda.setEvaluationScore(puntaje)
  mostrandoQuiz.value = false
}

function reiniciarEvaluacion() {
  tienda.resetEvaluation()
  mostrandoQuiz.value = false
  preguntaActual.value = 0
  respuestasUsuario.value = []
  opcionSeleccionada.value = null
  yaRespondido.value = false
}

function claseOpcion(oi: number) {
  if (!yaRespondido.value) return opcionSeleccionada.value === oi ? 'fondo-seleccionado' : 'fondo-normal'
  if (oi === preguntas[preguntaActual.value].correcto) return 'fondo-correcto'
  if (oi === opcionSeleccionada.value) return 'fondo-incorrecto'
  return 'fondo-normal'
}
</script>

<style scoped>
.fondo-normal    { background: #F5F5F5; }
.fondo-seleccionado { background: #EDE7F6; border-color: #5E35B1 !important; }
.fondo-correcto  { background: #C8E6C9; border-color: #43A047 !important; }
.fondo-incorrecto { background: #FFCDD2; border-color: #E53935 !important; }
</style>
