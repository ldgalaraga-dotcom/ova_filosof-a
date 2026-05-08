<template>
  <v-card rounded="lg" elevation="2" class="h-100 tarjeta-video" :class="{ 'tarjeta-vista': visto }">
    <div style="height:3px" :style="visto ? 'background:linear-gradient(90deg,#5C6E2E,#8BC34A)' : 'background:linear-gradient(90deg,#1B3A6B,#C9A84C)'"></div>

    <!-- Video embed 16:9 -->
    <div class="contenedor-video">
      <template v-if="!reproduciendo">
        <img :src="thumbnailUrl" :alt="video.titulo" class="video-thumbnail" @click="reproducir" />
        <div class="play-overlay" @click="reproducir">
          <v-icon size="64" color="white">mdi-play-circle</v-icon>
        </div>
      </template>
      <iframe
        v-else
        :src="embedAutoplay"
        :title="video.titulo"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>

    <v-card-text class="pa-4">
      <!-- Título + badge visto -->
      <div class="d-flex align-center mb-2">
        <div style="margin-right:8px; color: #C9A84C"><v-icon size="32">{{ video.icon }}</v-icon></div>
        <div style="font-family:'Cinzel',serif;font-weight:700;font-size:0.95rem;color:var(--text-primary);letter-spacing:0.04em;line-height:1.2;flex:1">
          {{ video.titulo }}
        </div>
        <v-chip v-if="visto" color="success" size="x-small" label style="font-family:'Cinzel',serif;font-size:0.62rem;margin-left:6px">
          ✓ Visto
        </v-chip>
      </div>

      <!-- Descripción -->
      <div style="font-family:'EB Garamond',serif;font-size:0.95rem;font-style:italic;color:var(--text-secondary);line-height:1.5;margin-bottom:12px">
        {{ video.descripcion }}
      </div>

      <!-- Botón reflexión -->
      <v-btn
        size="small" variant="tonal" color="secondary" rounded="lg"
        :prepend-icon="mostrarReflexion ? 'mdi-chevron-up' : 'mdi-comment-question'"
        class="mb-2 mr-2"
        style="font-family:'Cinzel',serif;font-size:0.72rem;letter-spacing:0.05em"
        @click="mostrarReflexion = !mostrarReflexion"
      >
        {{ mostrarReflexion ? 'Cerrar' : 'Reflexiona' }}
      </v-btn>

      <!-- Botón TTS -->
      <v-btn
        :color="estandoLeyendo ? 'error' : 'primary'"
        :prepend-icon="estandoLeyendo ? 'mdi-stop' : 'mdi-volume-high'"
        size="small" variant="tonal" rounded="lg"
        style="font-family:'Cinzel',serif;font-size:0.72rem"
        @click="alternarLectura"
      >
        {{ estandoLeyendo ? 'Detener' : 'Escuchar' }}
      </v-btn>

      <!-- Panel de reflexión -->
      <v-expand-transition>
        <div v-if="mostrarReflexion" class="reflexion-panel mt-3">
          <div class="reflexion-titulo"><v-icon size="18" class="mr-1">mdi-owl</v-icon> Pregunta de reflexión</div>
          <div class="reflexion-pregunta">{{ video.preguntaReflexion }}</div>
          <v-textarea
            v-model="respuestaReflexion"
            placeholder="Escribe tu reflexión aquí..."
            variant="outlined"
            density="compact"
            rows="3"
            hide-details
            rounded="lg"
            color="primary"
            class="mt-2"
            style="font-family:'EB Garamond',serif"
          />
          <v-btn
            v-if="respuestaReflexion.trim()"
            color="primary" size="small" rounded="lg" class="mt-2"
            style="font-family:'Cinzel',serif;font-size:0.72rem"
            @click="guardarReflexion"
          >
            ✓ Guardar reflexión
          </v-btn>
          <div v-if="reflexionGuardada" class="reflexion-guardada mt-2">
            ¡Excelente reflexión, {{ tienda.studentName }}! <v-icon size="18" color="success">mdi-star</v-icon>
          </div>
        </div>
      </v-expand-transition>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Video } from '~/data/videos'
import { useOvaStore } from '~/stores/ova'

const props = defineProps<{ video: Video }>()
const tienda = useOvaStore()

const estandoLeyendo = ref(false)
const mostrarReflexion = ref(false)
const respuestaReflexion = ref('')
const reflexionGuardada = ref(false)
const reproduciendo = ref(false)
const visto = computed(() => tienda.watchedVideos.includes(props.video.id))

const youtubeId = computed(() => {
  const match = props.video.urlEmbed.match(/\/embed\/([^?]+)/)
  return match ? match[1] : ''
})

const thumbnailUrl = computed(() => {
  return `https://img.youtube.com/vi/${youtubeId.value}/hqdefault.jpg`
})

const embedAutoplay = computed(() => {
  return props.video.urlEmbed.includes('?') 
    ? props.video.urlEmbed + '&autoplay=1'
    : props.video.urlEmbed + '?autoplay=1'
})

function reproducir() {
  reproduciendo.value = true
  tienda.markVideoWatched(props.video.id)
}

function guardarReflexion() {
  reflexionGuardada.value = true
  setTimeout(() => { reflexionGuardada.value = false }, 3000)
}

function alternarLectura() {
  if (!('speechSynthesis' in window)) return
  if (estandoLeyendo.value) {
    window.speechSynthesis.cancel()
    estandoLeyendo.value = false
    return
  }
  const texto = `${props.video.titulo}. ${props.video.descripcion}. Pregunta de reflexión: ${props.video.preguntaReflexion}`
  const enunciado = new SpeechSynthesisUtterance(texto)
  enunciado.lang = 'es-ES'
  enunciado.rate = tienda.ttsFactor
  enunciado.onstart = () => { estandoLeyendo.value = true }
  enunciado.onend   = () => { estandoLeyendo.value = false }
  enunciado.onerror = () => { estandoLeyendo.value = false }
  window.speechSynthesis.speak(enunciado)
}

onBeforeUnmount(() => {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel()
})
</script>

<style scoped>
.tarjeta-video { border: 1px solid rgba(201,168,76,0.25); transition: box-shadow 0.2s, transform 0.2s; }
.tarjeta-video:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(27,58,107,0.14) !important; }
.tarjeta-vista { border-color: rgba(92,110,46,0.35) !important; }

.contenedor-video {
  position: relative; width: 100%; padding-top: 56.25%; overflow: hidden; border-radius: 0; background: #000;
}
.contenedor-video iframe, .video-thumbnail {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; cursor: pointer;
}
.play-overlay {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.3); cursor: pointer; transition: background 0.3s;
}
.play-overlay:hover {
  background: rgba(0,0,0,0.5);
}
.play-overlay:hover .v-icon {
  transform: scale(1.1); transition: transform 0.2s;
}

.reflexion-panel {
  background: linear-gradient(135deg,var(--bg-subtle),var(--bg-light));
  border: 1px solid rgba(201,168,76,0.4);
  border-radius: 12px;
  padding: 14px;
}
.reflexion-titulo {
  font-family: 'Cinzel', serif;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color:var(--text-muted);
  margin-bottom: 6px;
}
.reflexion-pregunta {
  font-family: 'EB Garamond', serif;
  font-size: 1rem;
  font-weight: 600;
  color:var(--text-primary);
  line-height: 1.5;
}
.reflexion-guardada {
  font-family: 'EB Garamond', serif;
  font-size: 0.9rem;
  color: var(--text-success);
  font-style: italic;
}
</style>
