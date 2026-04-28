<template>
  <v-dialog v-model="mostrarPreguntas" max-width="600">
    <v-card rounded="lg" elevation="3">
      <!-- Encabezado -->
      <div style="background:linear-gradient(135deg,#1B3A6B,#2A5298);padding:20px;border-radius:8px 8px 0 0">
        <div class="d-flex align-center gap-2 mb-2">
          <v-icon color="secondary" size="large">mdi-lightbulb-on</v-icon>
          <span style="font-family:'Cinzel',serif;font-size:1.1rem;color:#E8C97A;letter-spacing:0.06em;font-weight:700">
            Reflexión sobre el video
          </span>
        </div>
        <div style="font-family:'EB Garamond',serif;font-style:italic;color:rgba(232,201,122,0.75);font-size:0.95rem">
          {{ preguntas[preguntaActual]?.subtitulo }}
        </div>
      </div>

      <v-card-text class="pa-6">
        <div v-if="preguntas.length > 0" class="mb-6">
          <!-- Número de pregunta -->
          <div style="font-family:'Cinzel',serif;font-size:0.85rem;color:#1B3A6B;margin-bottom:8px;letter-spacing:0.05em">
            Pregunta {{ preguntaActual + 1 }} de {{ preguntas.length }}
          </div>

          <!-- Pregunta -->
          <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:16px">
            <span style="font-size:1.6rem">{{ preguntas[preguntaActual].emoji }}</span>
            <div style="font-family:'EB Garamond',serif;font-size:1.05rem;font-weight:600;color:#2C2416;line-height:1.6">
              {{ preguntas[preguntaActual].pregunta }}
            </div>
          </div>

          <!-- Opciones -->
          <v-row dense class="mb-4">
            <v-col v-for="(opcion, idx) in preguntas[preguntaActual].opciones" :key="idx" cols="12">
              <v-card
                rounded="lg"
                variant="outlined"
                :color="respuestaActual === idx ? (idx === preguntas[preguntaActual].correcto ? 'success' : 'error') : 'grey-lighten-4'"
                :style="{
                  borderColor: respuestaActual === idx ? '#5C6E2E' : 'rgba(201,168,76,0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }"
                @click="respuestaActual = idx"
                class="pa-3"
              >
                <div class="d-flex align-center gap-2">
                  <v-radio
                    :model-value="respuestaActual"
                    :value="idx"
                    :color="respuestaActual === idx ? (idx === preguntas[preguntaActual].correcto ? 'success' : 'error') : 'primary'"
                  />
                  <div style="font-family:'EB Garamond',serif;font-size:0.95rem;color:#2C2416">
                    {{ opcion }}
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>

          <!-- Explicación -->
          <div v-if="respuestaActual !== null" class="pa-4 rounded-lg mb-4"
            :style="{
              background: respuestaActual === preguntas[preguntaActual].correcto ? '#D7EDD5' : '#F5D9D4',
              borderLeft: '4px solid ' + (respuestaActual === preguntas[preguntaActual].correcto ? '#5C6E2E' : '#8B3A2A'),
            }">
            <div style="font-family:'EB Garamond',serif;font-size:0.95rem;color:#2C2416;line-height:1.5">
              {{ preguntas[preguntaActual].explicacion[respuestaActual] }}
            </div>
          </div>
        </div>

        <!-- Botones de navegación -->
        <div class="d-flex justify-space-between align-center mt-4">
          <v-btn
            v-if="preguntaActual > 0"
            color="grey"
            variant="outlined"
            rounded="lg"
            @click="preguntaActual--"
            style="font-family:'Cinzel',serif;font-size:0.78rem"
          >
            <v-icon class="mr-1">mdi-arrow-left</v-icon> Anterior
          </v-btn>

          <v-chip
            :color="respuestaActual === preguntas[preguntaActual].correcto ? 'success' : 'grey-lighten-2'"
            size="small"
            style="font-family:'Cinzel',serif;font-size:0.75rem"
          >
            {{ respuestaActual === null ? 'Sin responder' : (respuestaActual === preguntas[preguntaActual].correcto ? '✓ Correcto' : '✗ Incorrecto') }}
          </v-chip>

          <v-btn
            v-if="preguntaActual < preguntas.length - 1"
            color="primary"
            variant="tonal"
            rounded="lg"
            @click="preguntaActual++"
            style="font-family:'Cinzel',serif;font-size:0.78rem"
          >
            Siguiente <v-icon class="ml-1">mdi-arrow-right</v-icon>
          </v-btn>
          <v-btn
            v-else
            color="success"
            variant="tonal"
            rounded="lg"
            @click="cerrar"
            style="font-family:'Cinzel',serif;font-size:0.78rem;text-transform:uppercase"
          >
            <v-icon class="mr-1">mdi-check</v-icon> Entendido
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useOvaStore } from '~/stores/ova'

interface PreguntaComprension {
  emoji: string
  subtitulo: string
  pregunta: string
  opciones: string[]
  correcto: number
  explicacion: string[]
}

const props = defineProps<{
  videoId: number
  mostrar: boolean
  preguntas: PreguntaComprension[]
}>()

const emit = defineEmits<{
  close: []
}>()

const tienda = useOvaStore()
const mostrarPreguntas = computed({
  get: () => props.mostrar,
  set: (val) => {
    if (!val) emit('close')
  },
})

const preguntaActual = ref(0)
const respuestaActual = ref<number | null>(null)

const cerrar = () => {
  tienda.markVideoQuestionCompleted(props.videoId)
  mostrarPreguntas.value = false
}

watch(() => preguntaActual.value, () => {
  respuestaActual.value = null
})
</script>
