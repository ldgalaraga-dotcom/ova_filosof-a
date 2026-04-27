<template>
  <div>
    <!-- Encabezado -->
    <div class="d-flex align-center mb-5">
      <v-icon color="primary" size="38" class="mr-3">mdi-play-circle</v-icon>
      <div>
        <h1 style="font-family:'Fredoka One',cursive;font-size:1.9rem;color:#5E35B1;line-height:1.1">
          Contenido
        </h1>
        <div style="color:#888;font-size:0.95rem">Mira los videos y aprende 🎥</div>
      </div>
    </div>

    <!-- Banner intro -->
    <v-card color="primary" rounded="xl" elevation="3" class="mb-6">
      <v-card-text class="pa-4 d-flex align-center">
        <span style="font-size:2.5rem;margin-right:14px">🤔</span>
        <div style="color:white;font-size:1.05rem;line-height:1.6">
          <strong>¿Qué es la filosofía?</strong> Es el arte de hacer grandes preguntas.
          ¡Mira los videos y usa el botón 🔊 para escuchar!
        </div>
      </v-card-text>
    </v-card>

    <!-- Grilla de videos -->
    <v-row>
      <v-col
        v-for="video in listaVideos"
        :key="video.id"
        cols="12"
        md="6"
        lg="4"
      >
        <TarjetaVideo :video="video" />
      </v-col>
    </v-row>

    <!-- Navegación inferior -->
    <NavegacionPaginas />
  </div>
</template>

<script setup lang="ts">
import { listaVideos } from '~/data/videos'
import { useOvaStore } from '~/stores/ova'

const tienda = useOvaStore()
onMounted(() => tienda.markPageVisited('contenido'))
</script>
