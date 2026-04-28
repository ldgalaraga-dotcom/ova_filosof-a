<template>
  <v-card rounded="lg" elevation="2" class="h-100" style="border-top:3px solid #C9A84C;border:1px solid rgba(201,168,76,0.25)">
    <!-- Badge de video visto -->
    <div v-if="estaVisto" style="position:absolute;top:8px;right:8px;background:#5C6E2E;color:white;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;z-index:10">
      ✓
    </div>

    <!-- Video embed 16:9 -->
    <div class="contenedor-video" @play="marcarComoVisto">
      <iframe
        :src="video.urlEmbed"
        :title="video.titulo"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>

    <v-card-text class="pa-4">
      <!-- Título con indicador -->
      <div class="d-flex align-center mb-2">
        <span style="font-size:1.5rem; margin-right:8px">{{ video.emoji }}</span>
        <div style="font-family:'Cinzel',serif;font-weight:700; font-size:0.95rem; color:#1B3A6B;letter-spacing:0.04em; line-height:1.2;flex:1">
          {{ video.titulo }}
        </div>
        <v-tooltip v-if="estaVisto" text="Video visto">
          <template #activator="{ props }">
            <v-icon color="success" size="small" v-bind="props" class="ml-2">mdi-check-circle</v-icon>
          </template>
        </v-tooltip>
      </div>

      <!-- Descripción corta -->
      <div style="font-family:'EB Garamond',serif;font-size:0.95rem;font-style:italic; color:#5A5040; line-height:1.5; margin-bottom:12px">
        {{ video.descripcion }}
      </div>

      <!-- Botón leer en voz alta -->
      <v-btn
        :color="estandoLeyendo ? 'error' : 'primary'"
        :prepend-icon="estandoLeyendo ? 'mdi-stop' : 'mdi-volume-high'"
        size="small"
        variant="tonal"
        rounded="lg"
        @click="alternarLectura"
      >
        {{ estandoLeyendo ? 'Detener' : 'Leer en voz alta' }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Video } from '~/data/videos'
import { useOvaStore } from '~/stores/ova'

const props = defineProps<{ video: Video }>()

const tienda = useOvaStore()
const estandoLeyendo = ref(false)
const estaVisto = computed(() => tienda.isVideoWatched(props.video.id))

// Velocidades de reproducción según configuración
const velocidadPorConfiguracion = {
  slow: 0.75,
  normal: 0.88,
  fast: 1.1,
}

function marcarComoVisto() {
  tienda.markVideoWatched(props.video.id)
}

function alternarLectura() {
  if (!('speechSynthesis' in window)) return
  if (estandoLeyendo.value) {
    window.speechSynthesis.cancel()
    estandoLeyendo.value = false
    return
  }
  const textoALeer = `${props.video.titulo}. ${props.video.descripcion}`
  const enunciado = new SpeechSynthesisUtterance(textoALeer)
  enunciado.lang = 'es-ES'
  enunciado.rate = velocidadPorConfiguracion[tienda.textToSpeechSpeed]
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
.contenedor-video {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
}
.contenedor-video iframe {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
}
</style>
