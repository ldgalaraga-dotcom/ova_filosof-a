<template>
  <v-card rounded="xl" elevation="3" class="h-100">
    <!-- Video embed 16:9 -->
    <div class="contenedor-video">
      <iframe
        :src="video.urlEmbed"
        :title="video.titulo"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>

    <v-card-text class="pa-4">
      <!-- Título -->
      <div class="d-flex align-center mb-2">
        <span style="font-size:1.5rem; margin-right:8px">{{ video.emoji }}</span>
        <div style="font-weight:800; font-size:1rem; color:#5E35B1; line-height:1.2">
          {{ video.titulo }}
        </div>
      </div>

      <!-- Descripción corta -->
      <div style="font-size:0.9rem; color:#666; line-height:1.5; margin-bottom:12px">
        {{ video.descripcion }}
      </div>

      <!-- Botón leer en voz alta -->
      <v-btn
        :color="estandoLeyendo ? 'error' : 'primary'"
        :prepend-icon="estandoLeyendo ? 'mdi-stop' : 'mdi-volume-high'"
        size="small"
        variant="tonal"
        rounded="xl"
        @click="alternarLectura"
      >
        {{ estandoLeyendo ? 'Detener' : 'Leer en voz alta' }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Video } from '~/data/videos'

const props = defineProps<{ video: Video }>()

const estandoLeyendo = ref(false)

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
  enunciado.rate = 0.88
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
