<template>
  <v-card class="video-card h-100" rounded="xl" elevation="3">
    <!-- Video Container -->
    <div class="video-container">
      <iframe
        :src="video.url"
        title="Video de Filosofía"
        width="100%"
        height="250"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>

    <!-- Card Content -->
    <v-card-text class="pa-4">
      <!-- Title -->
      <div class="d-flex align-start justify-space-between mb-2">
        <h3 class="display-font" style="font-size: 1.1rem; color: #5E35B1; flex: 1;">
          {{ video.titulo }}
        </h3>
        <v-chip
          size="small"
          color="secondary"
          text-color="white"
          prepend-icon="mdi-clock"
          class="ml-2"
        >
          {{ video.duracion }}
        </v-chip>
      </div>

      <!-- Description -->
      <p style="color: #666; font-size: 0.95rem; line-height: 1.5; margin-bottom: 12px;">
        {{ video.descripcion }}
      </p>

      <!-- Audio Controls -->
      <div class="d-flex gap-2 align-center mt-3">
        <v-btn
          size="small"
          color="primary"
          variant="outlined"
          prepend-icon="mdi-volume-high"
          @click="speakText"
          :loading="isSpeaking"
          rounded="xl"
        >
          Leer en Voz Alta
        </v-btn>
        <v-btn
          v-if="isSpeaking"
          size="small"
          color="error"
          variant="outlined"
          icon
          @click="stopSpeech"
          rounded="xl"
        >
          <v-icon>mdi-stop</v-icon>
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Video } from '~/data/videos'

interface Props {
  video: Video
}

defineProps<Props>()

const isSpeaking = ref(false)

const speakText = () => {
  if ('speechSynthesis' in window) {
    // Detener si ya hay un audio en progreso
    if (isSpeaking.value) {
      window.speechSynthesis.cancel()
      isSpeaking.value = false
      return
    }

    const textToSpeak = `${props.video.titulo}. ${props.video.descripcion}`
    const utterance = new SpeechSynthesisUtterance(textToSpeak)
    
    utterance.lang = 'es-ES'
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onstart = () => {
      isSpeaking.value = true
    }

    utterance.onend = () => {
      isSpeaking.value = false
    }

    utterance.onerror = () => {
      isSpeaking.value = false
    }

    window.speechSynthesis.speak(utterance)
  }
}

const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    isSpeaking.value = false
  }
}

onBeforeUnmount(() => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
})
</script>

<style scoped>
.video-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
  border-radius: 12px;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
}
</style>
