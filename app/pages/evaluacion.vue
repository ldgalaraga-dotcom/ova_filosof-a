<template>
  <div>
    <!-- Encabezado -->
    <div class="d-flex align-center mb-5">
      <v-icon color="primary" size="38" class="mr-3">mdi-clipboard-check</v-icon>
      <div>
        <h1 style="font-family:'Cinzel',serif;font-size:1.9rem;color:#1B3A6B;line-height:1.1;letter-spacing:0.06em">Evaluación</h1>
        <div style="color:#8C7E6A;font-size:0.95rem;font-family:'EB Garamond',serif;font-style:italic">
          <span v-if="tienda.studentName">Demuestra lo que sabes, {{ tienda.studentName }} 🏆</span>
          <span v-else>Demuestra lo que sabes 🏆</span>
        </div>
      </div>
    </div>

    <!-- RESULTADO FINAL -->
    <div v-if="tienda.evaluationCompleted && !mostrandoQuiz">
      <v-card rounded="xl" elevation="4" class="text-center pa-8" style="border:1px solid rgba(201,168,76,0.4)">
        <div style="height:4px;background:linear-gradient(90deg,#1B3A6B,#C9A84C,#1B3A6B);border-radius:4px 4px 0 0;margin:-32px -32px 32px"></div>
        <div style="font-size:5rem;margin-bottom:12px">
          {{ tienda.evaluationScore! >= 80 ? '🌟' : tienda.evaluationScore! >= 60 ? '👍' : '💪' }}
        </div>
        <div style="font-family:'Cinzel',serif;font-size:1.8rem;color:#1B3A6B;margin-bottom:4px">
          {{ tienda.scoreLabel }}
        </div>
        <div v-if="tienda.studentName" style="font-family:'EB Garamond',serif;font-size:1.1rem;color:#8C7E6A;font-style:italic;margin-bottom:16px">
          {{ tienda.studentName }}, {{ tienda.evaluationScore! >= 80 ? 'has demostrado una comprensión sobresaliente de la filosofía.' : 'sigue explorando y pronto dominarás el ágora.' }}
        </div>
        <div style="font-size:3rem;font-weight:900;color:#1B3A6B;margin-bottom:20px">
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

        <v-row justify="center" class="mb-6">
          <v-col cols="auto">
            <v-card color="#E8F5E9" rounded="xl" class="pa-4 text-center" min-width="100">
              <div style="font-size:2rem;font-weight:900;color:#43A047">{{ cantidadCorrectas }}</div>
              <div style="font-size:0.82rem;color:#666;font-family:'Cinzel',serif">Correctas</div>
            </v-card>
          </v-col>
          <v-col cols="auto">
            <v-card color="#FFEBEE" rounded="xl" class="pa-4 text-center" min-width="100">
              <div style="font-size:2rem;font-weight:900;color:#E53935">{{ preguntas.length - cantidadCorrectas }}</div>
              <div style="font-size:0.82rem;color:#666;font-family:'Cinzel',serif">Incorrectas</div>
            </v-card>
          </v-col>
          <v-col v-if="intentos > 1" cols="auto">
            <v-card color="#E3F2FD" rounded="xl" class="pa-4 text-center" min-width="100">
              <div style="font-size:2rem;font-weight:900;color:#1976D2">{{ intentos }}</div>
              <div style="font-size:0.82rem;color:#666;font-family:'Cinzel',serif">Intentos</div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Revisión de respuestas -->
        <v-expansion-panels variant="accordion" rounded="xl" class="mb-6 text-left">
          <v-expansion-panel v-for="(p, i) in preguntas" :key="i">
            <v-expansion-panel-title>
              <v-icon :color="respuestasUsuario[i] === p.correcto ? 'success' : 'error'" size="18" class="mr-2">
                {{ respuestasUsuario[i] === p.correcto ? 'mdi-check-circle' : 'mdi-close-circle' }}
              </v-icon>
              <span style="font-family:'EB Garamond',serif;font-size:0.95rem">{{ i+1 }}. {{ p.pregunta }}</span>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div class="pa-2">
                <div v-for="(op, oi) in p.opciones" :key="oi" class="pa-2 rounded-lg mb-1"
                  :style="oi === p.correcto ? 'background:#C8E6C9;border:1px solid #43A047' : (oi === respuestasUsuario[i] && oi !== p.correcto) ? 'background:#FFCDD2;border:1px solid #E53935' : 'background:#F5F5F5'"
                >
                  <span style="font-weight:700;margin-right:6px">{{ String.fromCharCode(65+oi) }}.</span>{{ op }}
                  <v-icon v-if="oi === p.correcto" color="success" size="14" class="ml-1">mdi-check</v-icon>
                </div>
                <v-alert type="info" density="compact" rounded="lg" class="mt-2" style="font-family:'EB Garamond',serif">
                  {{ p.explicacion }}
                </v-alert>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>

        <div class="d-flex justify-center gap-3 flex-wrap">
          <v-btn color="primary" size="large" rounded="xl" prepend-icon="mdi-refresh" @click="reiniciarEvaluacion">
            Intentar de nuevo
          </v-btn>
          <v-btn v-if="tienda.evaluationScore! >= 80" color="success" size="large" rounded="xl" prepend-icon="mdi-certificate" @click="generarCertificado">
            Descargar Certificado
          </v-btn>
          <v-btn color="secondary" size="large" rounded="xl" to="/recursos" prepend-icon="mdi-bookshelf">
            Ver Recursos
          </v-btn>
        </div>
      </v-card>
    </div>

    <!-- PANTALLA DE INICIO -->
    <div v-else-if="!mostrandoQuiz">
      <v-card color="primary" rounded="xl" elevation="3" class="text-center pa-8" style="border:2px solid rgba(201,168,76,0.4)">
        <div style="font-size:3.5rem;margin-bottom:12px">📋</div>
        <div style="font-family:'Cinzel',serif;font-size:1.4rem;color:#E8C97A;margin-bottom:8px;letter-spacing:0.06em">
          {{ preguntas.length }} preguntas filosóficas
        </div>
        <div style="font-family:'EB Garamond',serif;color:rgba(232,201,122,0.85);font-size:1rem;margin-bottom:4px">
          Cada pregunta muestra retroalimentación inmediata
        </div>
        <div style="font-family:'EB Garamond',serif;color:rgba(232,201,122,0.7);font-size:0.9rem;margin-bottom:24px">
          Puedes intentarlo cuantas veces necesites · Las preguntas se reorganizan en cada intento
        </div>
        <v-btn color="white" size="x-large" rounded="xl" prepend-icon="mdi-play" @click="iniciarEvaluacion"
          style="font-family:'Cinzel',serif;letter-spacing:0.08em;color:#1B3A6B">
          ¡Comenzar!
        </v-btn>
      </v-card>
    </div>

    <!-- QUIZ EN PROGRESO -->
    <div v-else>
      <!-- Barra progreso -->
      <v-card rounded="xl" class="mb-4" elevation="2" style="border:1px solid rgba(201,168,76,0.3)">
        <v-card-text class="pa-3">
          <div class="d-flex justify-space-between align-center mb-1">
            <span style="font-family:'Cinzel',serif;font-weight:700;color:#1B3A6B;font-size:0.9rem">
              Pregunta {{ preguntaActual + 1 }} / {{ preguntas.length }}
            </span>
            <div class="d-flex gap-2">
              <v-chip v-if="intentos > 1" color="secondary" size="x-small" style="font-family:'Cinzel',serif">
                Intento {{ intentos }}
              </v-chip>
              <v-chip color="primary" size="small" style="font-family:'Cinzel',serif">
                {{ Math.round((preguntaActual / preguntas.length) * 100) }}%
              </v-chip>
            </div>
          </div>
          <v-progress-linear :model-value="(preguntaActual / preguntas.length) * 100" color="primary" height="8" rounded />
          <!-- Dots de respuestas -->
          <div class="d-flex gap-1 mt-2 justify-center">
            <div v-for="i in preguntas.length" :key="i"
              class="dot-resp"
              :class="{
                'dot-correcto': i-1 < respuestasUsuario.length && respuestasUsuario[i-1] === preguntas[i-1].correcto,
                'dot-incorrecto': i-1 < respuestasUsuario.length && respuestasUsuario[i-1] !== preguntas[i-1].correcto,
                'dot-actual': i-1 === preguntaActual
              }"
            />
          </div>
        </v-card-text>
      </v-card>

      <!-- Tarjeta pregunta -->
      <v-card rounded="xl" elevation="4" class="mb-4" style="border:1px solid rgba(201,168,76,0.25)">
        <v-card-text class="pa-5 pa-md-6">
          <div style="font-family:'EB Garamond',serif;font-size:1.15rem;font-weight:600;color:#1B3A6B;margin-bottom:20px;line-height:1.6">
            {{ preguntaActual + 1 }}. {{ preguntas[preguntaActual].pregunta }}
          </div>
          <div
            v-for="(op, oi) in preguntas[preguntaActual].opciones"
            :key="oi"
            class="opcion-btn pa-4 rounded-xl mb-3"
            :class="claseOpcion(oi)"
            @click="seleccionarOpcion(oi)"
          >
            <span class="opcion-letra">{{ String.fromCharCode(65+oi) }}.</span>
            {{ op }}
            <v-icon v-if="yaRespondido && oi === preguntas[preguntaActual].correcto" color="success" class="float-right" size="20">mdi-check-circle</v-icon>
            <v-icon v-else-if="yaRespondido && oi === opcionSeleccionada && oi !== preguntas[preguntaActual].correcto" color="error" class="float-right" size="20">mdi-close-circle</v-icon>
          </div>

          <!-- Explicación inmediata -->
          <v-expand-transition>
            <v-alert v-if="yaRespondido"
              :type="opcionSeleccionada === preguntas[preguntaActual].correcto ? 'success' : 'warning'"
              rounded="xl" class="mt-3" density="compact"
              style="font-family:'EB Garamond',serif;font-size:1rem"
            >
              <strong>{{ opcionSeleccionada === preguntas[preguntaActual].correcto ? '¡Correcto! ' : 'No exactamente. ' }}</strong>
              {{ preguntas[preguntaActual].explicacion }}
            </v-alert>
          </v-expand-transition>
        </v-card-text>
      </v-card>

      <!-- Botón siguiente -->
      <div v-if="yaRespondido" class="text-center">
        <v-btn
          v-if="preguntaActual < preguntas.length - 1"
          color="primary" size="x-large" rounded="xl"
          append-icon="mdi-arrow-right" @click="siguientePregunta"
          style="font-family:'Cinzel',serif;letter-spacing:0.08em"
        >
          Siguiente
        </v-btn>
        <v-btn
          v-else
          color="success" size="x-large" rounded="xl"
          prepend-icon="mdi-flag-checkered" @click="terminarEvaluacion"
          style="font-family:'Cinzel',serif;letter-spacing:0.08em"
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
import NavegacionPaginas from '~/componentes/NavegacionPaginas.vue'

const tienda = useOvaStore()
onMounted(() => tienda.markPageVisited('evaluacion'))

const mostrandoQuiz = ref(false)
const preguntaActual = ref(0)
const opcionSeleccionada = ref<number | null>(null)
const yaRespondido = ref(false)
const respuestasUsuario = ref<number[]>([])
const intentos = ref(0)
const preguntasOrdenadas = ref<typeof preguntasBase>([])

const preguntasBase = [
  { pregunta: '¿Qué significa la palabra "filosofía"?', opciones: ['Amor a la ciencia', 'Amor a la sabiduría', 'Amor a la naturaleza', 'Amor al arte'], correcto: 1, explicacion: '"Philo" = amor y "sophia" = sabiduría, en griego antiguo.' },
  { pregunta: '¿Cuál frase famosa dijo Sócrates?', opciones: ['El hombre es un animal político', 'Solo sé que no sé nada', 'Pienso, luego existo', 'El conocimiento es poder'], correcto: 1, explicacion: 'Sócrates enseñaba que reconocer la propia ignorancia es el primer paso hacia la sabiduría.' },
  { pregunta: '¿Qué estudia la ética?', opciones: ['La belleza', 'El conocimiento', 'Lo correcto e incorrecto', 'El universo'], correcto: 2, explicacion: 'La ética estudia la moral, los valores y cómo debemos actuar.' },
  { pregunta: '¿Quién dijo "Pienso, luego existo"?', opciones: ['Platón', 'Kant', 'Aristóteles', 'Descartes'], correcto: 3, explicacion: 'René Descartes (siglo XVII) usó esta frase para probar la certeza de su propia existencia.' },
  { pregunta: '¿Qué estudia la epistemología?', opciones: ['La belleza en el arte', 'El origen del universo', 'El conocimiento y sus límites', 'La conducta moral'], correcto: 2, explicacion: 'La epistemología estudia cómo conocemos, sus alcances y límites, y qué es la verdad.' },
  { pregunta: '¿Dónde nació la filosofía occidental?', opciones: ['Roma, siglo I d.C.', 'Grecia Antigua, siglo VI a.C.', 'Egipto, siglo X a.C.', 'China, siglo III a.C.'], correcto: 1, explicacion: 'La filosofía occidental nació en la Antigua Grecia con Tales de Mileto y otros presocráticos.' },
  { pregunta: '¿Cuál NO es un filósofo griego?', opciones: ['Sócrates', 'Platón', 'Descartes', 'Aristóteles'], correcto: 2, explicacion: 'Descartes fue un filósofo francés del siglo XVII, no de la Grecia Antigua.' },
  { pregunta: 'Aristóteles decía que el ser humano es…', opciones: ['Un ser espiritual', 'Un animal político', 'Una mente pura', 'Un ser racional aislado'], correcto: 1, explicacion: 'Aristóteles llamó al hombre "zoon politikon": un ser que necesita vivir en comunidad.' },
  { pregunta: '¿Cuál es el primer paso del método filosófico?', opciones: ['Argumentar', 'Concluir', 'Observar', 'Razonar'], correcto: 2, explicacion: 'El método filosófico comienza observando el mundo, luego se pregunta, razona, argumenta y concluye.' },
  { pregunta: '¿Qué es un dilema ético?', opciones: ['Un problema matemático', 'Una situación donde dos valores entran en conflicto', 'Una discusión política', 'Un debate entre filósofos'], correcto: 1, explicacion: 'Un dilema ético surge cuando debemos elegir entre dos opciones con consecuencias morales importantes.' },
]

const preguntas = computed(() => preguntasOrdenadas.value)

const cantidadCorrectas = computed(() =>
  respuestasUsuario.value.filter((r, i) => r === preguntas.value[i].correcto).length
)

function iniciarEvaluacion() {
  intentos.value++
  // Reorganizar preguntas en cada intento
  preguntasOrdenadas.value = [...preguntasBase].sort(() => Math.random() - 0.5)
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
  const puntaje = Math.round((cantidadCorrectas.value / preguntas.value.length) * 100)
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
  if (!yaRespondido.value) return opcionSeleccionada.value === oi ? 'opcion-seleccionada' : 'opcion-normal'
  if (oi === preguntas.value[preguntaActual.value].correcto) return 'opcion-correcta'
  if (oi === opcionSeleccionada.value) return 'opcion-incorrecta'
  return 'opcion-normal'
}

function generarCertificado() {
  const nombre = tienda.studentName || 'Estudiante'
  const puntaje = tienda.evaluationScore ?? 0
  const fecha = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:900px; height:636px; font-family:'EB Garamond',Georgia,serif; background:#F8F4EC; display:flex; align-items:center; justify-content:center; }
  .cert { width:860px; height:596px; border:3px solid #C9A84C; border-radius:16px; padding:40px 60px; position:relative; background:linear-gradient(160deg,#FDFAF3,#F0EBD8); display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; }
  .cert::before { content:''; position:absolute; inset:8px; border:1px solid rgba(201,168,76,0.4); border-radius:10px; pointer-events:none; }
  .friso { width:100%; height:6px; background:repeating-linear-gradient(90deg,#C9A84C 0,#C9A84C 10px,#1B3A6B 10px,#1B3A6B 20px); border-radius:4px; margin-bottom:24px; }
  .escudo { font-size:3.5rem; margin-bottom:10px; }
  .ova-name { font-family:'Cinzel',serif; font-size:0.75rem; letter-spacing:0.25em; text-transform:uppercase; color:#8C7E6A; margin-bottom:6px; }
  .cert-title { font-family:'Cinzel Decorative',serif; font-size:1.5rem; color:#1B3A6B; letter-spacing:0.06em; margin-bottom:6px; }
  .cert-sub { font-family:'Cinzel',serif; font-size:0.85rem; letter-spacing:0.15em; text-transform:uppercase; color:#8C7E6A; margin-bottom:20px; }
  .sep { display:flex; align-items:center; gap:12px; margin:8px auto; max-width:300px; }
  .sep-line { flex:1; height:1px; background:#C9A84C; }
  .sep-sym { color:#C9A84C; font-size:1rem; }
  .otorgado { font-size:1rem; color:#4A3E30; margin:10px 0 4px; }
  .nombre { font-family:'Cinzel',serif; font-size:2.2rem; color:#1B3A6B; font-weight:700; margin:4px 0 14px; letter-spacing:0.04em; }
  .desc { font-size:0.95rem; color:#5A5040; line-height:1.7; max-width:520px; margin:0 auto 18px; }
  .puntaje { font-family:'Cinzel',serif; font-size:3rem; font-weight:700; color:#C9A84C; margin:4px 0; }
  .puntaje-label { font-family:'Cinzel',serif; font-size:0.75rem; letter-spacing:0.15em; text-transform:uppercase; color:#8C7E6A; }
  .fecha { font-size:0.85rem; color:#8C7E6A; font-style:italic; margin-top:16px; }
  .firma { font-family:'Cinzel',serif; font-size:0.72rem; letter-spacing:0.12em; text-transform:uppercase; color:#1B3A6B; margin-top:8px; }
</style>
</head>
<body>
<div class="cert">
  <div class="friso"></div>
  <div class="escudo">🦉</div>
  <div class="ova-name">Objeto Virtual de Aprendizaje · Filosofía</div>
  <div class="cert-title">Certificado de Logro</div>
  <div class="cert-sub">Φιλοσοφία para Todos · Grados X y XI</div>
  <div class="sep"><div class="sep-line"></div><span class="sep-sym">✦</span><div class="sep-line"></div></div>
  <div class="otorgado">Se otorga el presente certificado a</div>
  <div class="nombre">${nombre}</div>
  <div class="desc">por haber completado satisfactoriamente la evaluación del OVA<br>demostrando comprensión y dominio de los fundamentos filosóficos.</div>
  <div class="puntaje">${puntaje}%</div>
  <div class="puntaje-label">Calificación obtenida</div>
  <div class="sep"><div class="sep-line"></div><span class="sep-sym">⬥</span><div class="sep-line"></div></div>
  <div class="fecha">Expedido el ${fecha}</div>
  <div class="firma">🏛 OVA Filosofía · MMXXVI · Colombia</div>
</div>
</body>
</html>`

  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `certificado-filosofia-${nombre.replace(/\s+/g,'-').toLowerCase()}.html`
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.opcion-btn {
  cursor: pointer;
  border: 2px solid #E0E0E0;
  transition: all 0.15s;
  font-family: 'EB Garamond', serif;
  font-size: 1rem;
  color: #333;
  user-select: none;
}
.opcion-btn:hover { border-color: #C9A84C; background: #FDF8EE; }
.opcion-normal     { background: #F5F5F5; }
.opcion-seleccionada { background: #EDE7F6; border-color: #5E35B1 !important; }
.opcion-correcta   { background: #C8E6C9; border-color: #43A047 !important; cursor: default; }
.opcion-incorrecta { background: #FFCDD2; border-color: #E53935 !important; cursor: default; }
.opcion-letra { font-weight: 800; margin-right: 10px; color: #1B3A6B; font-family: 'Cinzel', serif; }

.dot-resp {
  width: 10px; height: 10px;
  border-radius: 50%;
  background: #E0E0E0;
  border: 1px solid #CCC;
  transition: all 0.2s;
}
.dot-actual    { background: #1B3A6B; transform: scale(1.3); }
.dot-correcto  { background: #43A047; border-color: #43A047; }
.dot-incorrecto { background: #E53935; border-color: #E53935; }
</style>
