<template>
  <div>
    <!-- Encabezado -->
    <div class="d-flex align-center mb-5">
      <v-icon color="primary" size="38" class="mr-3">mdi-clipboard-check</v-icon>
      <div>
        <h1 style="font-family:'Cinzel',serif;font-size:1.9rem;color:var(--text-primary);line-height:1.1;letter-spacing:0.06em">Evaluación</h1>
        <div style="color:var(--text-muted);font-size:0.95rem;font-family:'EB Garamond',serif;font-style:italic">
          <span v-if="tienda.studentName">Demuestra lo que sabes, {{ tienda.studentName }} <v-icon size="18" color="secondary" class="ml-1">mdi-trophy</v-icon></span>
          <span v-else>Demuestra lo que sabes <v-icon size="18" color="secondary" class="ml-1">mdi-trophy</v-icon></span>
        </div>
      </div>
    </div>

    <!-- RESULTADO FINAL -->
    <div v-if="tienda.evaluationCompleted && !mostrandoQuiz">
      <v-card rounded="xl" elevation="4" class="text-center pa-8" style="border:1px solid rgba(201,168,76,0.4)">
        <div style="height:4px;background:linear-gradient(90deg,#1B3A6B,#C9A84C,#1B3A6B);border-radius:4px 4px 0 0;margin:-32px -32px 32px"></div>
        <div style="margin-bottom:12px">
          <v-icon v-if="tienda.evaluationScore >= 80" size="80" color="success">mdi-star</v-icon>
          <v-icon v-else-if="tienda.evaluationScore >= 60" size="80" color="warning">mdi-thumb-up</v-icon>
          <v-icon v-else size="80" color="error">mdi-arm-flex</v-icon>
        </div>
        <div style="font-family:'Cinzel',serif;font-size:1.8rem;color:var(--text-primary);margin-bottom:4px">
          {{ tienda.scoreLabel }}
        </div>
        <div v-if="tienda.studentName" style="font-family:'EB Garamond',serif;font-size:1.1rem;color:var(--text-muted);font-style:italic;margin-bottom:16px">
          {{ tienda.studentName }}, {{ tienda.evaluationScore >= 80 ? 'has demostrado una comprensión sobresaliente de la filosofía.' : 'sigue explorando y pronto dominarás el ágora.' }}
        </div>
        <div style="font-size:3rem;font-weight:900;color:var(--text-primary);margin-bottom:20px; display:flex; align-items:center; justify-content:center; gap:20px;">
          <v-chip color="secondary" size="x-large" variant="flat" style="font-size:2rem; padding: 24px; font-family:'Cinzel',serif">
            {{ tienda.evaluationGrade }} / 5.0
          </v-chip>
          <span style="font-size:2rem; opacity:0.6">{{ tienda.evaluationScore }}%</span>
        </div>
        <v-progress-linear
          :model-value="tienda.evaluationScore ?? 0"
          :color="tienda.evaluationScore >= 80 ? 'success' : tienda.evaluationScore >= 60 ? 'warning' : 'error'"
          height="18" rounded class="mb-6"
        >
          <template #default="{ value }">
            <strong style="color:white">{{ Math.ceil(value) }}%</strong>
          </template>
        </v-progress-linear>

        <v-row justify="center" class="mb-6">
          <v-col cols="auto">
            <v-card color="success" variant="tonal" rounded="xl" class="pa-4 text-center" min-width="100">
              <div style="font-size:2rem;font-weight:900" class="text-success">{{ cantidadCorrectas }}</div>
              <div style="font-size:0.82rem;color:var(--text-muted);font-family:'Cinzel',serif">Correctas</div>
            </v-card>
          </v-col>
          <v-col cols="auto">
            <v-card color="error" variant="tonal" rounded="xl" class="pa-4 text-center" min-width="100">
              <div style="font-size:2rem;font-weight:900" class="text-error">{{ preguntas.length - cantidadCorrectas }}</div>
              <div style="font-size:0.82rem;color:var(--text-muted);font-family:'Cinzel',serif">Incorrectas</div>
            </v-card>
          </v-col>
          <v-col v-if="intentos > 1" cols="auto">
            <v-card color="info" variant="tonal" rounded="xl" class="pa-4 text-center" min-width="100">
              <div style="font-size:2rem;font-weight:900" class="text-info">{{ intentos }}</div>
              <div style="font-size:0.82rem;color:var(--text-muted);font-family:'Cinzel',serif">Intentos</div>
            </v-card>
          </v-col>
        </v-row>

        <v-expansion-panels variant="accordion" rounded="xl" class="mb-6 text-left">
          <v-expansion-panel v-for="(p, i) in preguntas" :key="i">
            <v-expansion-panel-title>
              <v-icon :color="respuestasUsuario[i] ? 'success' : 'error'" size="18" class="mr-2">
                {{ respuestasUsuario[i] ? 'mdi-check-circle' : 'mdi-close-circle' }}
              </v-icon>
              <span style="font-family:'EB Garamond',serif;font-size:0.95rem">{{ i+1 }}. {{ p.pregunta }}</span>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div class="pa-2">
                <v-alert type="info" density="compact" rounded="lg" class="mt-2" style="font-family:'EB Garamond',serif">
                  {{ p.explicacion }}
                </v-alert>
                <div class="text-right mt-2" v-if="p.temaRelacionado && !respuestasUsuario[i]">
                  <v-btn color="secondary" variant="text" size="small" rounded="xl" prepend-icon="mdi-television-play" :to="'/contenido?tema=' + p.temaRelacionado">
                    Revisar este tema
                  </v-btn>
                </div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
        
        <!-- REGISTRO DE NOTAS -->
        <div v-if="tienda.evaluationHistory.length > 1" class="mb-6">
          <div style="font-family:'Cinzel',serif; font-size:1.1rem; color:var(--text-primary); margin-bottom:12px; text-align:left; border-bottom:1px solid rgba(201,168,76,0.3); padding-bottom:6px">
            <v-icon class="mr-2">mdi-history</v-icon> Registro de Notas
          </div>
          <v-table density="compact" class="rounded-lg" style="background:transparent; border:1px solid rgba(201,168,76,0.2)">
            <thead>
              <tr style="font-family:'Cinzel',serif; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.05em">
                <th class="text-left">Fecha</th>
                <th class="text-center">Porcentaje</th>
                <th class="text-center">Nota (0.1-5.0)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(h, idx) in tienda.evaluationHistory" :key="idx" style="font-family:'EB Garamond',serif; font-size:1rem">
                <td class="text-left">{{ h.fecha }}</td>
                <td class="text-center">{{ h.score }}%</td>
                <td class="text-center"><strong>{{ h.grade.toFixed(1) }}</strong></td>
              </tr>
            </tbody>
          </v-table>
        </div>

        <div class="d-flex justify-center gap-3 flex-wrap">
          <v-btn color="primary" size="large" rounded="xl" prepend-icon="mdi-refresh" @click="reiniciarEvaluacion">
            Intentar de nuevo
          </v-btn>
          <v-btn v-if="tienda.logros.every(l => l.obtenido)" color="secondary" size="large" rounded="xl" prepend-icon="mdi-trophy-award" @click="generarCertificado">
            Descargar Certificado Maestro
          </v-btn>
          <v-btn v-else-if="tienda.evaluationScore >= 60" color="success" size="large" rounded="xl" prepend-icon="mdi-certificate" @click="generarCertificado">
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
        <div style="margin-bottom:12px"><v-icon size="56" color="#E8C97A">mdi-clipboard-text</v-icon></div>
        <div style="font-family:'Cinzel',serif;font-size:1.4rem;color:#E8C97A;margin-bottom:8px;letter-spacing:0.06em">
          {{ preguntas.length }} retos filosóficos
        </div>
        <div style="font-family:'EB Garamond',serif;color:rgba(232,201,122,0.85);font-size:1rem;margin-bottom:4px">
          Una evaluación completa con preguntas de opción múltiple, emparejamiento, ordenamiento y sopa de letras.
        </div>
        <div style="font-family:'EB Garamond',serif;color:rgba(232,201,122,0.7);font-size:0.9rem;margin-bottom:24px">
          En las actividades interactivas, al cometer el segundo error, la pregunta se contará como incorrecta.
        </div>
        <div class="d-flex justify-center gap-4 flex-wrap">
          <v-btn color="white" size="x-large" rounded="xl" prepend-icon="mdi-book-open-variant" @click="iniciarEvaluacion(true)"
            style="font-family:'Cinzel',serif;letter-spacing:0.08em;color:var(--text-primary)">
            Modo Práctica
          </v-btn>
          <v-btn color="primary" size="x-large" rounded="xl" prepend-icon="mdi-play" @click="iniciarEvaluacion(false)"
            style="font-family:'Cinzel',serif;letter-spacing:0.08em">
            Modo Examen
          </v-btn>
        </div>
      </v-card>
    </div>

    <!-- QUIZ EN PROGRESO -->
    <div v-else>
      <!-- Progression Bar across pages -->
      <v-card rounded="xl" class="mb-4" elevation="2" style="border:1px solid rgba(201,168,76,0.3)">
        <v-card-text class="pa-3">
          <div class="d-flex justify-space-between align-center mb-1">
            <span style="font-family:'Cinzel',serif;font-weight:700;color:var(--text-primary);font-size:0.9rem">
              Página {{ paginaActual + 1 }} de {{ totalPaginas }}
            </span>
            <v-chip color="primary" size="small" style="font-family:'Cinzel',serif">
              {{ Math.round(((paginaActual + 1) / totalPaginas) * 100) }}%
            </v-chip>
          </div>
          <v-progress-linear :model-value="((paginaActual + 1) / totalPaginas) * 100" color="primary" height="8" rounded />
        </v-card-text>
      </v-card>

      <!-- Paginated Questions Loop -->
      <div v-for="(q, indexEnPagina) in preguntasPaginadas" :key="indiceGlobal(indexEnPagina)">
        <v-card rounded="xl" elevation="4" class="mb-4" style="border:1px solid rgba(201,168,76,0.25)" aria-live="polite">
          <v-card-text class="pa-5 pa-md-6">
            <div class="d-flex align-center justify-space-between mb-3">
              <v-chip color="secondary" size="small" style="font-family:'Cinzel',serif">
                {{ iconoTipoPregunta(q.tipo) }} {{ textoTipoPregunta(q.tipo) }}
              </v-chip>
            </div>
            
            <div style="font-family:'EB Garamond',serif;font-size:1.15rem;font-weight:600;color:var(--text-primary);margin-bottom:20px;line-height:1.6">
              {{ indiceGlobal(indexEnPagina) + 1 }}. {{ q.pregunta }}
            </div>

            <!-- Múltiple -->
            <div v-if="q.tipo === 'multiple'" role="radiogroup" :aria-label="'Opciones de respuesta para la pregunta ' + (indiceGlobal(indexEnPagina) + 1)">
              <div v-for="(op, oi) in q.opciones" :key="oi"
                class="opcion-btn pa-4 rounded-xl mb-3"
                :class="opcionSeleccionada[indiceGlobal(indexEnPagina)] === oi ? 'opcion-seleccionada' : 'opcion-normal'"
                role="radio"
                tabindex="0"
                :aria-checked="opcionSeleccionada[indiceGlobal(indexEnPagina)] === oi ? 'true' : 'false'"
                @click="opcionSeleccionada[indiceGlobal(indexEnPagina)] = Number(oi)"
                @keyup.enter="opcionSeleccionada[indiceGlobal(indexEnPagina)] = Number(oi)"
                @keyup.space.prevent="opcionSeleccionada[indiceGlobal(indexEnPagina)] = Number(oi)"
              >
                <span class="opcion-letra">{{ String.fromCharCode(65+oi) }}.</span>
                {{ op }}
              </div>
            </div>

            <!-- VF -->
            <div v-if="q.tipo === 'vf'" class="d-flex gap-4 justify-center">
               <v-btn size="large" rounded="xl" width="140"
                 :color="vfSeleccionado[indiceGlobal(indexEnPagina)] === true ? 'primary' : 'default'"
                 :variant="vfSeleccionado[indiceGlobal(indexEnPagina)] === true ? 'flat' : 'outlined'"
                 @click="vfSeleccionado[indiceGlobal(indexEnPagina)] = true">Verdadero</v-btn>
               <v-btn size="large" rounded="xl" width="140"
                 :color="vfSeleccionado[indiceGlobal(indexEnPagina)] === false ? 'primary' : 'default'"
                 :variant="vfSeleccionado[indiceGlobal(indexEnPagina)] === false ? 'flat' : 'outlined'"
                 @click="vfSeleccionado[indiceGlobal(indexEnPagina)] = false">Falso</v-btn>
            </div>

            <!-- Emparejar -->
            <div v-if="q.tipo === 'emparejar'">
               <div v-if="empEncontrados[indiceGlobal(indexEnPagina)]?.length" class="mb-4 d-flex flex-wrap gap-2 justify-center">
                 <v-chip v-for="(par, pIdx) in empEncontrados[indiceGlobal(indexEnPagina)]" :key="pIdx"
                    color="primary" closable @click:close="desemparejar(indiceGlobal(indexEnPagina), par)">
                    {{ par.izq }} &harr; {{ par.der }}
                 </v-chip>
               </div>
               <v-row>
                 <v-col cols="12" md="6">
                    <div v-for="izq in empIzq[indiceGlobal(indexEnPagina)]" :key="izq" 
                         v-show="!estaEmparejadoIzq(indiceGlobal(indexEnPagina), izq)"
                         @click="clickEmpIzq(indiceGlobal(indexEnPagina), izq)" 
                         class="pa-3 mb-2 rounded-lg text-center cursor-pointer" 
                         :class="empSelIzq[indiceGlobal(indexEnPagina)] === izq ? 'emp-selected' : 'emp-normal'" style="transition:all 0.2s">
                      {{ izq }}
                    </div>
                 </v-col>
                 <v-col cols="12" md="6">
                    <div v-for="der in empDer[indiceGlobal(indexEnPagina)]" :key="der" 
                         v-show="!estaEmparejadoDer(indiceGlobal(indexEnPagina), der)"
                         @click="clickEmpDer(indiceGlobal(indexEnPagina), der)" 
                         class="pa-3 mb-2 rounded-lg text-center cursor-pointer" 
                         :class="empSelDer[indiceGlobal(indexEnPagina)] === der ? 'emp-selected' : 'emp-normal'" style="transition:all 0.2s">
                      {{ der }}
                    </div>
                 </v-col>
               </v-row>
            </div>

            <!-- Ordenar -->
            <div v-if="q.tipo === 'ordenar'">
              <div v-if="ordSeleccionados[indiceGlobal(indexEnPagina)]?.length" class="mb-4 d-flex flex-wrap gap-2 justify-center">
                <v-chip v-for="(sel, idx) in ordSeleccionados[indiceGlobal(indexEnPagina)]" :key="idx" 
                        color="success" size="large" closable @click:close="desordenar(indiceGlobal(indexEnPagina), sel)" style="font-weight:700">
                  {{ idx+1 }}. {{ sel.txt }}
                </v-chip>
              </div>
              <v-row justify="center">
                <v-col v-for="item in ordMezclado[indiceGlobal(indexEnPagina)]" :key="item.id" cols="12" sm="6">
                   <div v-show="!ordSeleccionados[indiceGlobal(indexEnPagina)]?.includes(item)"
                        class="pa-4 rounded-lg text-center cursor-pointer" 
                        style="border:2px solid rgba(201,168,76,0.3); transition:all 0.2s; background:var(--bg-light)"
                        @click="ordSeleccionados[indiceGlobal(indexEnPagina)].push(item)">
                      {{ item.txt }}
                   </div>
                </v-col>
              </v-row>
            </div>

            <!-- Sopa -->
            <div v-if="q.tipo === 'sopa'" class="text-center">
              <div class="d-flex justify-center align-center gap-4 mb-4 flex-wrap">
                <v-chip color="info" size="large" style="font-family:'Cinzel',serif;font-weight:700;letter-spacing:0.05em">
                  Encuentra: {{ q.palabra }}
                </v-chip>
                <v-chip v-if="sopaCeldasEncontradas[indiceGlobal(indexEnPagina)]?.length" color="success" size="large" closable @click:close="sopaCeldasEncontradas[indiceGlobal(indexEnPagina)] = []">
                  Palabra marcada
                </v-chip>
              </div>

              <div class="sopa-grid mx-auto">
                 <div v-for="(fila, y) in sopaGrid[indiceGlobal(indexEnPagina)]" :key="y" class="sopa-fila">
                   <div v-for="(letra, x) in fila" :key="x" class="sopa-celda" 
                        :class="claseSopa(indiceGlobal(indexEnPagina), x, y)" 
                        @click="clickSopa(indiceGlobal(indexEnPagina), x, y)">
                     {{ letra }}
                   </div>
                 </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>

      <!-- Botones de Navegación de Paginas -->
      <div class="d-flex justify-space-between mt-4">
        <v-btn v-if="paginaActual > 0" size="x-large" rounded="xl" @click="paginaActual--" style="font-family:'Cinzel',serif;letter-spacing:0.08em">
          Anterior
        </v-btn>
        <v-spacer v-else></v-spacer>
        
        <v-btn v-if="paginaActual < totalPaginas - 1" color="primary" size="x-large" rounded="xl" append-icon="mdi-arrow-right" @click="paginaActual++" style="font-family:'Cinzel',serif;letter-spacing:0.08em">
          Siguiente
        </v-btn>
        <v-btn v-else color="success" size="x-large" rounded="xl" prepend-icon="mdi-flag-checkered" @click="terminarEvaluacion" style="font-family:'Cinzel',serif;letter-spacing:0.08em">
          Enviar Evaluación
        </v-btn>
      </div>
    </div>


    <!-- CERTIFICADO OCULTO PARA PDF -->
    <div v-show="generandoPDF" class="cert-pdf-container">
      <div id="certificado-nodo" class="cert" style="width:860px; height:596px; border:3px solid #C9A84C; border-radius:16px; padding:40px 60px; position:relative; background:linear-gradient(160deg,#FDFAF3,#F0EBD8); display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
        <div class="friso" style="width:100%; height:6px; background:repeating-linear-gradient(90deg,#C9A84C 0,#C9A84C 10px,#1B3A6B 10px,#1B3A6B 20px); border-radius:4px; margin-bottom:24px;"></div>
        <img class="escudo" src="/img/agora.png" style="width:90px; height:90px; object-fit:contain; border-radius:50%; box-shadow:0 0 16px rgba(201,168,76,0.5); margin: 0 auto 10px; display:block;" alt="Ágora">
        <div class="ova-name" style="font-family:'Cinzel',serif; font-size:0.75rem; letter-spacing:0.25em; text-transform:uppercase; color:#555; margin-bottom:6px;">Objeto Virtual de Aprendizaje · Filosofía</div>
        <div class="cert-title" style="font-family:'Cinzel Decorative',serif; font-size:1.5rem; color:#1B3A6B; letter-spacing:0.06em; margin-bottom:6px;">Certificado de Logro</div>
        <div class="cert-sub" style="font-family:'Cinzel',serif; font-size:0.85rem; letter-spacing:0.15em; text-transform:uppercase; color:#555; margin-bottom:20px;">Ágora · Filosofía para Todos</div>
        <div class="sep" style="display:flex; align-items:center; gap:12px; margin:8px auto; max-width:300px;"><div style="flex:1; height:1px; background:#C9A84C;"></div><span style="color:#C9A84C; font-size:1rem;">✦</span><div style="flex:1; height:1px; background:#C9A84C;"></div></div>
        <div class="otorgado" style="font-size:1rem; color:#2C2416; font-family:'EB Garamond',serif; margin:10px 0 4px;">Se otorga el presente certificado a</div>
        <div class="nombre" style="font-family:'Cinzel',serif; font-size:2.2rem; color:#1B3A6B; font-weight:700; margin:4px 0 14px; letter-spacing:0.04em;">{{ tienda.studentName || 'Estudiante' }}</div>
        <div class="desc" style="font-size:0.95rem; color:#5A5040; font-family:'EB Garamond',serif; line-height:1.7; max-width:520px; margin:0 auto 18px;">por haber completado satisfactoriamente la evaluación del OVA<br>demostrando comprensión y dominio de los fundamentos filosóficos.</div>
        <div class="puntaje" style="font-family:'Cinzel',serif; font-size:3rem; font-weight:700; color:#C9A84C; margin:4px 0; display:flex; align-items:center; justify-content:center; gap:20px;">
          <span>{{ tienda.evaluationGrade.toFixed(1) }} / 5.0</span>
          <span style="font-size:1.5rem; opacity:0.6">({{ tienda.evaluationScore ?? 0 }}%)</span>
        </div>
        <div class="puntaje-label" style="font-family:'Cinzel',serif; font-size:0.75rem; letter-spacing:0.15em; text-transform:uppercase; color:#555;">Calificación y Desempeño</div>
        <div class="sep" style="display:flex; align-items:center; gap:12px; margin:8px auto; max-width:300px;"><div style="flex:1; height:1px; background:#C9A84C;"></div><span style="color:#C9A84C; font-size:1rem;">⬥</span><div style="flex:1; height:1px; background:#C9A84C;"></div></div>
        <div class="fecha" style="font-size:0.85rem; color:#555; font-family:'EB Garamond',serif; font-style:italic; margin-top:16px;">Expedido el {{ new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }) }}</div>
        <div class="firma" style="font-family:'Cinzel',serif; font-size:0.72rem; letter-spacing:0.12em; text-transform:uppercase; color:#1B3A6B; margin-top:8px;">
          <v-icon size="14">mdi-pillar</v-icon> Ágora · Filosofía para Todos · MMXXVI · Colombia
        </div>
        <div style="position:absolute; top:8px; left:8px; right:8px; bottom:8px; border:1px solid rgba(201,168,76,0.4); border-radius:10px; pointer-events:none;"></div>
      </div>
    </div>

    <NavegacionPaginas />
  </div>
</template>

<script setup lang="ts">
import { useOvaStore } from '~/stores/ova'
import { useAccessibility } from '~/composables/useAccessibility'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

const tienda = useOvaStore()
useAccessibility() // Mantén la instancia activa para que el watch funcione
const modoPractica = ref(false)
const generandoPDF = ref(false)
onMounted(() => {
  tienda.markPageVisited('evaluacion')
})
onUnmounted(() => {
  detenerTimerSopa()
})

const mostrandoQuiz = ref(false)
const paginaActual = ref(0)
const itemsPorPagina = 5
const respuestasUsuario = ref<boolean[]>([])
const intentos = ref(0)
const preguntasOrdenadas = ref<any[]>([])

const opcionSeleccionada = ref<Record<number, number | null>>({})
const vfSeleccionado = ref<Record<number, boolean | null>>({})

// Variables emparejar
const empIzq = ref<Record<number, string[]>>({})
const empDer = ref<Record<number, string[]>>({})
const empSelIzq = ref<Record<number, string | null>>({})
const empSelDer = ref<Record<number, string | null>>({})
const empEncontrados = ref<Record<number, {izq:string, der:string}[]>>({})

// Variables ordenar
const ordMezclado = ref<Record<number, any[]>>({})
const ordSeleccionados = ref<Record<number, any[]>>({})

// Variables sopa
const sopaGrid = ref<Record<number, string[][]>>({})
const sopaPrimerClick = ref<Record<number, {x:number, y:number} | null>>({})
const sopaCeldasEncontradas = ref<Record<number, {x:number, y:number}[]>>({})

const preguntas = computed(() => preguntasOrdenadas.value)
const totalPaginas = computed(() => Math.ceil(preguntas.value.length / itemsPorPagina))
const preguntasPaginadas = computed(() => {
  const start = paginaActual.value * itemsPorPagina
  return preguntas.value.slice(start, start + itemsPorPagina)
})
const cantidadCorrectas = computed(() => respuestasUsuario.value.filter(r => r === true).length)

function indiceGlobal(indexEnPagina: number) {
  return paginaActual.value * itemsPorPagina + indexEnPagina
}

function iconoTipoPregunta(tipo: string) {
  if (tipo === 'multiple') return 'mdi-format-list-bulleted'
  if (tipo === 'vf') return 'mdi-scale-balance'
  if (tipo === 'emparejar') return 'mdi-source-merge'
  if (tipo === 'ordenar') return 'mdi-sort'
  if (tipo === 'sopa') return 'mdi-format-letter-matches'
  return 'mdi-help'
}
function textoTipoPregunta(tipo: string) {
  if (tipo === 'multiple') return 'Opción Múltiple'
  if (tipo === 'vf') return 'Verdadero o Falso'
  if (tipo === 'emparejar') return 'Emparejar'
  if (tipo === 'ordenar') return 'Ordenar'
  if (tipo === 'sopa') return 'Sopa de Letras'
  return ''
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray
}

const preguntasBase = [
  // ═══ OPCIÓN MÚLTIPLE ═══

  // Filosofía Griega Clásica
  { tipo: 'multiple', pregunta: '¿Qué significa la palabra "filosofía"?', opciones: ['Amor a la ciencia', 'Amor a la sabiduría', 'Amor a la naturaleza', 'Amor al arte'], correcto: 1, explicacion: '"Philo" = amor y "sophia" = sabiduría, en griego antiguo.', temaRelacionado: 'intro' },
  { tipo: 'multiple', pregunta: '¿Cuál frase famosa dijo Sócrates?', opciones: ['El hombre es un animal político', 'Solo sé que no sé nada', 'Pienso, luego existo', 'El conocimiento es poder'], correcto: 1, explicacion: 'Sócrates enseñaba que reconocer la propia ignorancia es el primer paso hacia la sabiduría.', temaRelacionado: 'socrates' },
  { tipo: 'multiple', pregunta: '¿Qué estudia la ética?', opciones: ['La belleza', 'El conocimiento', 'Lo correcto e incorrecto', 'El universo'], correcto: 2, explicacion: 'La ética estudia la moral, los valores y cómo debemos actuar.', temaRelacionado: 'ramas' },
  { tipo: 'multiple', pregunta: '¿Dónde nació la filosofía occidental?', opciones: ['Roma, siglo I d.C.', 'Grecia Antigua, siglo VI a.C.', 'Egipto, siglo X a.C.', 'China, siglo III a.C.'], correcto: 1, explicacion: 'La filosofía occidental nació en la Antigua Grecia con Tales de Mileto y otros presocráticos.', temaRelacionado: 'intro' },
  { tipo: 'multiple', pregunta: 'En la Alegoría de la Caverna, el Sol representa:', opciones: ['A Dios', 'La idea del Bien y la verdad absoluta', 'La ciencia', 'El fuego artificial'], correcto: 1, explicacion: 'Para Platón, el Sol ilumina el mundo inteligible y representa la Idea del Bien.', temaRelacionado: 'platon' },
  { tipo: 'multiple', pregunta: 'Según Aristóteles, ¿cuál es el fin último del ser humano?', opciones: ['El poder', 'El placer', 'La eudaimonía (felicidad)', 'La riqueza'], correcto: 2, explicacion: 'Aristóteles sostenía que todas nuestras acciones buscan alcanzar la felicidad o plenitud.', temaRelacionado: 'aristoteles' },

  // Filosofía Medieval
  { tipo: 'multiple', pregunta: '¿Quién fue el máximo representante de la escolástica medieval?', opciones: ['San Agustín', 'Santo Tomás de Aquino', 'Averroes', 'Guillermo de Ockham'], correcto: 1, explicacion: 'Santo Tomás de Aquino unió la filosofía aristotélica con la teología cristiana en su Summa Theologiae.', temaRelacionado: 'medieval' },
  { tipo: 'multiple', pregunta: '¿Qué buscaba la filosofía medieval principalmente?', opciones: ['Negar la existencia de Dios', 'Conciliar fe y razón', 'Eliminar la filosofía griega', 'Promover el ateísmo'], correcto: 1, explicacion: 'La escolástica buscó demostrar que la fe cristiana y la razón filosófica podían complementarse.', temaRelacionado: 'medieval' },

  // Filosofía Moderna
  { tipo: 'multiple', pregunta: '¿Quién dijo "Pienso, luego existo"?', opciones: ['Platón', 'Kant', 'Aristóteles', 'Descartes'], correcto: 3, explicacion: 'René Descartes (siglo XVII) usó la duda metódica para probar la certeza de su propia existencia.', temaRelacionado: 'descartes' },
  { tipo: 'multiple', pregunta: '¿Qué es el "imperativo categórico" de Kant?', opciones: ['Un mandato militar', 'Una ley de la naturaleza', 'Actuar según una máxima universal', 'Hacer lo que más convenga'], correcto: 2, explicacion: 'Kant propuso que solo es moral una acción si puede convertirse en una regla universal para todos.', temaRelacionado: 'kant' },
  { tipo: 'multiple', pregunta: '¿Qué corriente sostiene que todo conocimiento viene de la experiencia?', opciones: ['Racionalismo', 'Idealismo', 'Empirismo', 'Existencialismo'], correcto: 2, explicacion: 'El empirismo (Locke, Hume, Berkeley) afirma que la mente al nacer es una "tabula rasa".', temaRelacionado: 'moderna' },

  // Filosofía del siglo XIX
  { tipo: 'multiple', pregunta: '¿Qué filósofo declaró "la muerte de Dios"?', opciones: ['Marx', 'Hegel', 'Nietzsche', 'Kierkegaard'], correcto: 2, explicacion: 'Nietzsche diagnosticó que la civilización occidental había perdido su fundamento moral con la crisis de los valores religiosos.', temaRelacionado: 'nietzsche' },
  { tipo: 'multiple', pregunta: '¿Qué concepto es central en la filosofía de Karl Marx?', opciones: ['El imperativo categórico', 'La alienación del trabajador', 'La voluntad de poder', 'El cogito'], correcto: 1, explicacion: 'Marx analizó cómo el sistema capitalista aliena al obrero de su trabajo, su producto y su propia humanidad.', temaRelacionado: 'marx' },
  { tipo: 'multiple', pregunta: 'La dialéctica de Hegel se basa en:', opciones: ['Fe y razón', 'Tesis, antítesis y síntesis', 'Duda y certeza', 'Experiencia y razón'], correcto: 1, explicacion: 'Hegel propuso que el conocimiento avanza a través de contradicciones que se resuelven en una síntesis superior.', temaRelacionado: 'hegel' },

  // Filosofía Contemporánea
  { tipo: 'multiple', pregunta: '¿Qué corriente filosófica afirma que "la existencia precede a la esencia"?', opciones: ['Positivismo', 'Pragmatismo', 'Existencialismo', 'Escolástica'], correcto: 2, explicacion: 'Sartre sostuvo que no hay naturaleza humana fija: primero existimos y luego nos definimos por nuestros actos.', temaRelacionado: 'sartre' },
  { tipo: 'multiple', pregunta: '¿Qué estudió Michel Foucault?', opciones: ['La lógica formal', 'Las relaciones entre poder y conocimiento', 'La física cuántica', 'La estética del Renacimiento'], correcto: 1, explicacion: 'Foucault investigó cómo las instituciones (cárceles, hospitales, escuelas) construyen lo que llamamos "verdad" y "normalidad".', temaRelacionado: 'foucault' },
  { tipo: 'multiple', pregunta: '¿Qué propuso Karl Popper sobre la ciencia?', opciones: ['Que toda teoría es verdadera', 'Que la ciencia debe basarse en la fe', 'Que una teoría es científica solo si puede ser refutada', 'Que la ciencia y la filosofía son lo mismo'], correcto: 2, explicacion: 'Popper propuso el criterio de falsabilidad: una teoría científica debe poder ser puesta a prueba y potencialmente refutada.', temaRelacionado: 'contemporanea' },

  // Filosofía Latinoamericana
  { tipo: 'multiple', pregunta: '¿Qué propone la Filosofía de la Liberación?', opciones: ['Copiar la filosofía europea', 'Pensar desde la realidad de los oprimidos de América Latina', 'Ignorar la historia colonial', 'Volver a la filosofía griega pura'], correcto: 1, explicacion: 'Enrique Dussel propuso pensar desde la periferia, desde los excluidos, como punto de partida filosófico.', temaRelacionado: 'latinoamericana' },
  { tipo: 'multiple', pregunta: '¿Quién escribió "Pedagogía del oprimido"?', opciones: ['Leopoldo Zea', 'Enrique Dussel', 'Paulo Freire', 'Octavio Paz'], correcto: 2, explicacion: 'Paulo Freire propuso una educación crítica y liberadora que forma ciudadanos conscientes de su realidad.', temaRelacionado: 'latinoamericana' },

  // ═══ VERDADERO / FALSO ═══

  // Griega
  { tipo: 'vf', pregunta: 'La filosofía busca imponer verdades absolutas sin cuestionamiento.', correcto: false, explicacion: 'Falso. La filosofía se basa en la duda, el asombro y el cuestionamiento constante.', temaRelacionado: 'intro' },
  { tipo: 'vf', pregunta: 'El "Mito de la Caverna" fue escrito por Aristóteles.', correcto: false, explicacion: 'Falso. Fue escrito por Platón en su obra "La República".', temaRelacionado: 'platon' },
  { tipo: 'vf', pregunta: 'La frase "Conócete a ti mismo" estaba inscrita en el Templo de Delfos.', correcto: true, explicacion: 'Verdadero. Sócrates la adoptó como piedra angular de su pensamiento.', temaRelacionado: 'socrates' },
  // Medieval
  { tipo: 'vf', pregunta: 'La escolástica medieval rechazó completamente la filosofía de Aristóteles.', correcto: false, explicacion: 'Falso. Santo Tomás de Aquino integró la filosofía aristotélica con la teología cristiana.', temaRelacionado: 'medieval' },
  // Moderna
  { tipo: 'vf', pregunta: 'El racionalismo y el empirismo son corrientes filosóficas opuestas sobre el origen del conocimiento.', correcto: true, explicacion: 'Verdadero. El racionalismo privilegia la razón y el empirismo la experiencia sensorial.', temaRelacionado: 'moderna' },
  { tipo: 'vf', pregunta: 'Kant afirmó que la moral depende de las consecuencias de nuestros actos.', correcto: false, explicacion: 'Falso. Para Kant, lo moral depende del deber y la intención, no de las consecuencias (eso es utilitarismo).', temaRelacionado: 'kant' },
  // Contemporánea
  { tipo: 'vf', pregunta: 'Sartre creía que el ser humano está "condenado a ser libre".', correcto: true, explicacion: 'Verdadero. Para Sartre, no podemos escapar de la libertad: incluso no elegir es una elección.', temaRelacionado: 'sartre' },
  // Latinoamericana
  { tipo: 'vf', pregunta: 'La filosofía latinoamericana simplemente repite las ideas de la filosofía europea.', correcto: false, explicacion: 'Falso. Pensadores como Dussel, Zea y Freire desarrollaron un pensamiento propio desde la realidad latinoamericana.', temaRelacionado: 'latinoamericana' },

  // ═══ EMPAREJAR ═══

  { tipo: 'emparejar', pregunta: 'Empareja a cada filósofo griego con su concepto clave', pares: [{ izq: 'Sócrates', der: 'Mayéutica' }, { izq: 'Platón', der: 'Caverna' }, { izq: 'Aristóteles', der: 'Liceo' }], explicacion: 'Sócrates creó la Mayéutica, Platón la Alegoría de la Caverna, y Aristóteles fundó el Liceo.' },
  { tipo: 'emparejar', pregunta: 'Empareja a cada filósofo moderno con su frase o concepto', pares: [{ izq: 'Descartes', der: 'Cogito ergo sum' }, { izq: 'Kant', der: 'Imperativo categórico' }, { izq: 'Hume', der: 'Empirismo' }], explicacion: 'Descartes partió del "pienso luego existo", Kant formuló el imperativo categórico, y Hume fue empirista.' },
  { tipo: 'emparejar', pregunta: 'Empareja a cada filósofo contemporáneo con su corriente', pares: [{ izq: 'Sartre', der: 'Existencialismo' }, { izq: 'Foucault', der: 'Biopoder' }, { izq: 'Popper', der: 'Falsabilidad' }], explicacion: 'Sartre fue existencialista, Foucault estudió el biopoder, y Popper propuso la falsabilidad.' },
  { tipo: 'emparejar', pregunta: 'Empareja cada pensador latinoamericano con su aporte', pares: [{ izq: 'Dussel', der: 'Filosofía de la Liberación' }, { izq: 'Freire', der: 'Pedagogía del oprimido' }, { izq: 'Leopoldo Zea', der: 'Identidad latinoamericana' }], explicacion: 'Estos tres pensadores crearon filosofía desde y para América Latina.' },

  // ═══ ORDENAR ═══

  { tipo: 'ordenar', pregunta: 'Ordena cronológicamente las grandes etapas de la filosofía', elementos: ['Filosofía Griega', 'Filosofía Medieval', 'Filosofía Moderna', 'Filosofía Contemporánea'], explicacion: 'La filosofía pasó de Grecia (s. VI a.C.) → Edad Media (s. V-XV) → Modernidad (s. XVII-XVIII) → Contemporánea (s. XIX-XXI).', temaRelacionado: 'intro' },
  { tipo: 'ordenar', pregunta: 'Ordena cronológicamente a estos filósofos', elementos: ['Aristóteles', 'Santo Tomás', 'Descartes', 'Nietzsche', 'Sartre'], explicacion: 'Aristóteles (s. IV a.C.) → Santo Tomás (s. XIII) → Descartes (s. XVII) → Nietzsche (s. XIX) → Sartre (s. XX).', temaRelacionado: 'intro' },
  { tipo: 'ordenar', pregunta: 'Ordena los grados de conocimiento según Platón (de menor a mayor)', elementos: ['Ignorancia', 'Doxa', 'Episteme'], explicacion: 'Se asciende desde la ignorancia hacia la opinión (doxa), hasta la verdad (episteme).', temaRelacionado: 'platon' },

  // ═══ SOPA DE LETRAS ═══

  { tipo: 'sopa', pregunta: 'Encuentra en la sopa la escuela fundada por Platón.', palabra: 'ACADEMIA', explicacion: 'La Academia de Platón fue el gran centro de estudios en Atenas.', temaRelacionado: 'platon' },
  { tipo: 'sopa', pregunta: 'Encuentra el nombre de la corriente de Sartre.', palabra: 'EXISTENCIALISMO', explicacion: 'El existencialismo afirma que la existencia precede a la esencia.', temaRelacionado: 'sartre' },
  { tipo: 'sopa', pregunta: 'Encuentra el concepto clave de la ética kantiana.', palabra: 'IMPERATIVO', explicacion: 'El imperativo categórico es la base de la moral según Kant.', temaRelacionado: 'kant' },
]

function iniciarEvaluacion(practica: boolean = false) {
  modoPractica.value = practica
  intentos.value++
  
  // Mezclar las preguntas y las opciones (solo en tipo multiple)
  const mezcladas = shuffleArray(preguntasBase).map((q: any) => {
    if (q.tipo === 'multiple') {
      const correctText = q.opciones[q.correcto]
      const shuffledOptions = shuffleArray(q.opciones)
      const newCorrectIndex = shuffledOptions.indexOf(correctText)
      return { ...q, opciones: shuffledOptions, correcto: newCorrectIndex }
    }
    return q
  })
  
  preguntasOrdenadas.value = mezcladas
  
  // Reiniciar estados
  opcionSeleccionada.value = {}
  vfSeleccionado.value = {}
  empIzq.value = {}
  empDer.value = {}
  empSelIzq.value = {}
  empSelDer.value = {}
  empEncontrados.value = {}
  ordMezclado.value = {}
  ordSeleccionados.value = {}
  sopaGrid.value = {}
  sopaPrimerClick.value = {}
  sopaCeldasEncontradas.value = {}
  
  mezcladas.forEach((q, idx) => {
    if (q.tipo === 'multiple') {
       opcionSeleccionada.value[idx] = null
    } else if (q.tipo === 'vf') {
       vfSeleccionado.value[idx] = null
    } else if (q.tipo === 'emparejar') {
       empIzq.value[idx] = [...q.pares].map((p:any) => p.izq).sort(() => Math.random() - 0.5)
       empDer.value[idx] = [...q.pares].map((p:any) => p.der).sort(() => Math.random() - 0.5)
       empSelIzq.value[idx] = null
       empSelDer.value[idx] = null
       empEncontrados.value[idx] = []
    } else if (q.tipo === 'ordenar') {
       ordMezclado.value[idx] = [...q.elementos].map((e:any) => ({ txt: e, id: Math.random() })).sort(() => Math.random() - 0.5)
       ordSeleccionados.value[idx] = []
    } else if (q.tipo === 'sopa') {
       sopaGrid.value[idx] = generarSopaPalabraUnica(q.palabra)
       sopaPrimerClick.value[idx] = null
       sopaCeldasEncontradas.value[idx] = []
    }
  })
  
  mostrandoQuiz.value = true
  respuestasUsuario.value = []
  paginaActual.value = 0
}

// Lógica Emparejar
function clickEmpIzq(idx: number, item: string) {
  if (empSelIzq.value[idx] === item) { empSelIzq.value[idx] = null; return }
  empSelIzq.value[idx] = item
  verificarEmparejamiento(idx)
}
function clickEmpDer(idx: number, item: string) {
  if (empSelDer.value[idx] === item) { empSelDer.value[idx] = null; return }
  empSelDer.value[idx] = item
  verificarEmparejamiento(idx)
}
function verificarEmparejamiento(idx: number) {
  const i = empSelIzq.value[idx]
  const d = empSelDer.value[idx]
  if (i && d) {
    empEncontrados.value[idx].push({ izq: i, der: d })
    empSelIzq.value[idx] = null
    empSelDer.value[idx] = null
  }
}
function desemparejar(idx: number, par: any) {
  empEncontrados.value[idx] = empEncontrados.value[idx].filter(p => p !== par)
}
function estaEmparejadoIzq(idx: number, item: string) {
  return empEncontrados.value[idx]?.some(e => e.izq === item)
}
function estaEmparejadoDer(idx: number, item: string) {
  return empEncontrados.value[idx]?.some(e => e.der === item)
}

// Lógica Ordenar
function desordenar(idx: number, item: any) {
  ordSeleccionados.value[idx] = ordSeleccionados.value[idx].filter(s => s.id !== item.id)
}

// Lógica Sopa
function generarSopaPalabraUnica(palabra: string) {
  const SZ = Math.max(10, palabra.length + 2)
  const grid = Array(SZ).fill(null).map(() => Array(SZ).fill(''))
  const dirs = [[0,1],[1,0],[1,1],[1,-1],[-1,0],[0,-1],[-1,-1],[-1,1]]
  
  let placed = false
  while (!placed) {
    const d = dirs[Math.floor(Math.random()*dirs.length)]
    const sx = Math.floor(Math.random()*SZ)
    const sy = Math.floor(Math.random()*SZ)
    let ok = true
    for (let i = 0; i < palabra.length; i++) {
      const nx = sx + d[0]*i
      const ny = sy + d[1]*i
      if (nx<0||nx>=SZ||ny<0||ny>=SZ) { ok = false; break }
    }
    if (ok) {
      for (let i = 0; i < palabra.length; i++) {
        grid[sy + d[1]*i][sx + d[0]*i] = palabra[i]
      }
      placed = true
    }
  }
  const alfa = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
  for (let y=0; y<SZ; y++) {
    for (let x=0; x<SZ; x++) {
      if (grid[y][x] === '') grid[y][x] = alfa[Math.floor(Math.random()*alfa.length)]
    }
  }
  return grid
}
function clickSopa(idx: number, x: number, y: number) {
  if (!sopaPrimerClick.value[idx]) {
    sopaPrimerClick.value[idx] = {x, y}
    sopaCeldasEncontradas.value[idx] = [] // clear previous
  } else {
    const p1 = sopaPrimerClick.value[idx]
    const p2 = {x, y}
    const dx = Math.sign(p2.x - p1.x)
    const dy = Math.sign(p2.y - p1.y)
    const lenX = Math.abs(p2.x - p1.x)
    const lenY = Math.abs(p2.y - p1.y)
    
    if (lenX !== 0 && lenY !== 0 && lenX !== lenY) {
      sopaPrimerClick.value[idx] = null; return
    }
    
    const len = Math.max(lenX, lenY) + 1
    const celdas = []
    for (let i = 0; i < len; i++) {
      celdas.push({x: p1.x + dx*i, y: p1.y + dy*i})
    }
    
    sopaCeldasEncontradas.value[idx] = celdas
    sopaPrimerClick.value[idx] = null
  }
}
function claseSopa(idx: number, x: number, y: number) {
  if (sopaPrimerClick.value[idx]?.x === x && sopaPrimerClick.value[idx]?.y === y) return 'celda-seleccionada'
  if (sopaCeldasEncontradas.value[idx]?.some(c => c.x === x && c.y === y)) return 'celda-encontrada'
  return ''
}

function terminarEvaluacion() {
  let correctas = 0
  respuestasUsuario.value = []

  preguntasOrdenadas.value.forEach((q, idx) => {
    let esCorrecto = false
    if (q.tipo === 'multiple') {
      esCorrecto = (opcionSeleccionada.value[idx] === q.correcto)
    } else if (q.tipo === 'vf') {
      esCorrecto = (vfSeleccionado.value[idx] === q.correcto)
    } else if (q.tipo === 'emparejar') {
      const userPares = empEncontrados.value[idx] || []
      if (userPares.length === q.pares.length) {
         esCorrecto = userPares.every(up => q.pares.some((p:any) => p.izq === up.izq && p.der === up.der))
      }
    } else if (q.tipo === 'ordenar') {
      const userOrd = ordSeleccionados.value[idx] || []
      if (userOrd.length === q.elementos.length) {
         esCorrecto = userOrd.every((uo, i) => uo.txt === q.elementos[i])
      }
    } else if (q.tipo === 'sopa') {
       const celdas = sopaCeldasEncontradas.value[idx] || []
       let word = ""
       const grid = sopaGrid.value[idx]
       celdas.forEach(c => word += grid[c.y][c.x])
       if (word === q.palabra || word.split('').reverse().join('') === q.palabra) {
         esCorrecto = true
       }
    }
    
    respuestasUsuario.value[idx] = esCorrecto
    if (esCorrecto) correctas++
  })
  
  const puntaje = Math.round((correctas / preguntasOrdenadas.value.length) * 100)
  if (!modoPractica.value) {
    tienda.setEvaluationScore(puntaje)
  }
  mostrandoQuiz.value = false
}

function reiniciarEvaluacion() {
  tienda.resetEvaluation()
  mostrandoQuiz.value = false
  iniciarEvaluacion(modoPractica.value)
}

function detenerTimerSopa() {}


async function generarCertificado() {
  const nombre = tienda.studentName || 'Estudiante'
  generandoPDF.value = true
  
  // Dar tiempo al DOM para renderizar el certificado oculto
  await new Promise(r => setTimeout(r, 100))
  
  try {
    const el = document.getElementById('certificado-nodo')
    if (!el) return
    
    const canvas = await html2canvas(el, { scale: 2, useCORS: true })
    const imgData = canvas.toDataURL('image/png')
    
    // PDF apaisado A4 (297x210 mm)
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    })
    
    // Calcular tamaño para ajustar manteniendo proporción
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgProps = pdf.getImageProperties(imgData)
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width
    
    pdf.addImage(imgData, 'PNG', 0, (pdfHeight - imgHeight) / 2, pdfWidth, imgHeight)
    pdf.save(`certificado-filosofia-${nombre.replace(/\s+/g,'-').toLowerCase()}.pdf`)
  } catch (error) {
    console.error('Error generando PDF:', error)
  } finally {
    generandoPDF.value = false
  }
}
</script>

<style scoped>
.opcion-btn {
  cursor: pointer;
  border: 2px solid #E0E0E0;
  transition: all 0.15s;
  font-family: 'EB Garamond', serif;
  font-size: 1rem;
  color:var(--text-dark);
  user-select: none;
}
.opcion-btn:hover { border-color: #C9A84C; background:var(--bg-hover); }
.opcion-normal     { background:var(--bg-light); }
.opcion-seleccionada { background: #EDE7F6; border-color: #5E35B1 !important; }
.opcion-correcta   { background: var(--bg-success); border-color: var(--border-success) !important; cursor: default; }
.opcion-incorrecta { background: var(--bg-error); border-color: var(--border-error) !important; cursor: default; }
.opcion-letra { font-weight: 800; margin-right: 10px; color:var(--text-primary); font-family: 'Cinzel', serif; }

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

/* Emparejar */
.emp-normal { background: var(--bg-light); border: 2px solid rgba(201,168,76,0.3); }
.emp-selected { background: #E4EBF5; border: 2px solid var(--text-primary); box-shadow: 0 0 6px rgba(27,58,107,0.2); }
.emp-found { background: #D7EDD5; border: 2px solid #5C6E2E; color: #334018; opacity: 0.8; pointer-events: none; }

/* Dark mode overrides */
.dark-mode .opcion-seleccionada { background: rgba(94,53,177,0.25); color: #D1C4E9; }
.dark-mode .opcion-correcta { background: rgba(67,160,71,0.2); color: #A5D6A7; }
.dark-mode .opcion-incorrecta { background: rgba(229,57,53,0.2); color: #EF9A9A; }
.dark-mode .dot-resp { background: #555; border-color: #777; }
.dark-mode .dot-actual { background: #E8C97A; }
.dark-mode .emp-selected { background: rgba(27,58,107,0.3); }
.dark-mode .emp-found { background: rgba(139,195,74,0.15); color: #AED581; }

/* Sopa */
.sopa-grid {
  display: inline-block;
  background: var(--bg-card);
  border: 2px solid rgba(201,168,76,0.3);
  border-radius: 8px;
  padding: 6px;
  user-select: none;
}
.sopa-fila {
  display: flex;
}
.sopa-celda {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Cinzel', monospace;
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.15s;
  border-radius: 4px;
  margin: 1px;
}
.sopa-celda:hover {
  background: rgba(201,168,76,0.15);
}
.celda-seleccionada {
  background: #C9A84C !important;
  color: #1B3A6B !important;
  box-shadow: 0 0 8px rgba(201,168,76,0.6);
}
.celda-encontrada {
  background: rgba(139,195,74,0.3) !important;
  color: #5C6E2E !important;
  font-weight: 800;
}
.dark-mode .celda-encontrada {
  color: #AED581 !important;
}
@media (max-width: 400px) {
  .sopa-celda { width: 24px; height: 24px; font-size: 0.8rem; }
}

.cert-pdf-container {
  position: absolute;
  top: -9999px;
  left: -9999px;
  opacity: 0;
  pointer-events: none;
}
</style>
