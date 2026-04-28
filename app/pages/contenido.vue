<template>
  <div>
    <!-- Encabezado -->
    <div class="d-flex align-center mb-5">
      <v-icon color="primary" size="38" class="mr-3">mdi-play-circle</v-icon>
      <div>
        <h1 style="font-family:'Cinzel',serif;font-size:1.8rem;color:#1B3A6B;line-height:1.1;letter-spacing:0.06em;text-transform:uppercase">
          Contenido
        </h1>
        <div style="color:#8C7E6A;font-size:0.92rem;font-family:'EB Garamond',serif;font-style:italic">
          <span v-if="tienda.studentName">¡Bienvenido/a al ágora, <strong>{{ tienda.studentName }}</strong>! 🎥</span>
          <span v-else>Contempla los vídeos y bebe de la sabiduría 🎥</span>
        </div>
      </div>
    </div>

    <!-- Banner intro -->
    <v-card color="primary" rounded="lg" elevation="3" class="mb-5" style="border-top:3px solid #C9A84C">
      <v-card-text class="pa-5 d-flex align-center">
        <span style="font-size:2.5rem;margin-right:16px">🏛️</span>
        <div style="color:#E8C97A;font-size:1.05rem;line-height:1.7;font-family:'EB Garamond',serif">
          <strong style="font-family:'Cinzel',serif;letter-spacing:0.05em">¿Qué es la filosofía?</strong>
          <br>
          <span v-if="tienda.studentName">{{ tienda.studentName }}, es el arte de hacer grandes preguntas. Mira los videos, reflexiona y usa 🔊 para escuchar.</span>
          <span v-else>Es el arte de hacer grandes preguntas. Mira los videos y usa el botón 🔊 para escuchar.</span>
        </div>
      </v-card-text>
    </v-card>

    <!-- Progreso de videos -->
    <div class="mb-5 d-flex align-center gap-3 flex-wrap">
      <span style="font-family:'Cinzel',serif;font-size:0.78rem;letter-spacing:0.1em;text-transform:uppercase;color:#8C7E6A">
        Videos vistos:
      </span>
      <div class="d-flex gap-2">
        <div
          v-for="video in listaVideos" :key="video.id"
          :title="video.titulo"
          class="dot-video"
          :class="{ 'dot-video-visto': tienda.watchedVideos.includes(video.id) }"
        >
          <span v-if="tienda.watchedVideos.includes(video.id)" style="color:white;font-size:0.7rem;font-weight:700">✓</span>
          <span v-else style="opacity:0.4;font-family:'Cinzel',serif;font-size:0.72rem">{{ video.id }}</span>
        </div>
      </div>
      <v-chip v-if="tienda.watchedVideos.length === listaVideos.length" color="success" size="small" style="font-family:'Cinzel',serif">
        🎉 ¡Todos vistos!
      </v-chip>
    </div>

    <!-- Grilla de videos -->
    <v-row class="mb-6">
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

    <!-- ¿Sabías que? -->
    <v-card rounded="xl" elevation="2" class="mb-6" style="border:1px solid rgba(201,168,76,0.35);background:linear-gradient(135deg,#FDFAF3,#F0EBD8)">
      <v-card-title class="pa-5 pb-2 d-flex align-center">
        <span style="font-size:1.4rem;margin-right:10px">💡</span>
        <span style="font-family:'Cinzel',serif;color:#1B3A6B;font-size:1rem;letter-spacing:0.08em">¿Sabías que...?</span>
        <v-spacer />
        <div class="d-flex gap-2">
          <v-btn icon size="x-small" variant="text" color="primary" @click="curiosidadAnterior">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn icon size="x-small" variant="text" color="primary" @click="curiosidadSiguiente">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text class="pa-5 pt-2">
        <v-window v-model="curiosidadActual">
          <v-window-item v-for="(c, i) in curiosidades" :key="i" :value="i">
            <div class="d-flex align-start gap-3">
              <span style="font-size:2rem;flex-shrink:0">{{ c.emoji }}</span>
              <div>
                <div style="font-family:'Cinzel',serif;font-size:0.88rem;font-weight:700;color:#1B3A6B;margin-bottom:4px">{{ c.titulo }}</div>
                <div style="font-family:'EB Garamond',serif;font-size:1rem;color:#4A3E30;line-height:1.7">{{ c.texto }}</div>
              </div>
            </div>
          </v-window-item>
        </v-window>
        <!-- Dots navegación -->
        <div class="d-flex justify-center gap-1 mt-3">
          <div
            v-for="(_, i) in curiosidades" :key="i"
            class="dot-curiosidad"
            :class="{ 'dot-curiosidad-activo': curiosidadActual === i }"
            @click="curiosidadActual = i"
          />
        </div>
      </v-card-text>
    </v-card>

    <NavegacionPaginas />
  </div>
</template>

<script setup lang="ts">
import { listaVideos } from '~/data/videos'
import { useOvaStore } from '~/stores/ova'
import TarjetaVideo from '~/componentes/TarjetaVideo.vue'
import NavegacionPaginas from '~/componentes/NavegacionPaginas.vue'

const tienda = useOvaStore()
onMounted(() => tienda.markPageVisited('contenido'))

const curiosidadActual = ref(0)

const curiosidades = [
  {
    emoji: '🏛️',
    titulo: 'La primera universidad del mundo',
    texto: 'Platón fundó en Atenas "La Academia" alrededor del año 387 a.C. Fue la primera institución de educación superior de la historia occidental. Funcionó durante casi 900 años.',
  },
  {
    emoji: '🦟',
    titulo: 'Sócrates nunca escribió nada',
    texto: 'Todo lo que sabemos de Sócrates fue escrito por sus discípulos, especialmente Platón. El propio Sócrates desconfiaba de la escritura: creía que debilitaba la memoria y el pensamiento vivo.',
  },
  {
    emoji: '⚡',
    titulo: 'La palabra "filosofía" la inventó Pitágoras',
    texto: 'Se atribuye a Pitágoras (el del teorema) haber acuñado la palabra "filósofo" para describirse a sí mismo: no un sabio, sino un amante de la sabiduría. La humildad como método.',
  },
  {
    emoji: '🌍',
    titulo: 'Aristóteles tenía razón... y estaba equivocado',
    texto: 'Aristóteles creía que la Tierra era el centro del universo — error. Pero también dedujo que la Tierra era esférica observando la sombra circular que proyecta en la Luna durante los eclipses — ¡correcto!',
  },
  {
    emoji: '🔑',
    titulo: 'La mayéutica: el arte de hacer nacer ideas',
    texto: 'Sócrates decía que su método de preguntas era como el oficio de su madre, que era partera: él no enseñaba, sino que ayudaba a las personas a "dar a luz" el conocimiento que ya tenían dentro.',
  },
  {
    emoji: '📐',
    titulo: 'Filosofía y matemáticas: inseparables',
    texto: 'En la entrada de la Academia de Platón había un cartel que decía: "Que no entre quien no sepa geometría." Para los griegos, la matemática y la filosofía eran la misma cosa.',
  },
]

function curiosidadSiguiente() {
  curiosidadActual.value = (curiosidadActual.value + 1) % curiosidades.length
}
function curiosidadAnterior() {
  curiosidadActual.value = (curiosidadActual.value - 1 + curiosidades.length) % curiosidades.length
}

// Rotación automática cada 8 segundos
let intervalo: ReturnType<typeof setInterval>
onMounted(() => { intervalo = setInterval(curiosidadSiguiente, 8000) })
onUnmounted(() => clearInterval(intervalo))
</script>

<style scoped>
.dot-video {
  width: 32px; height: 32px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: rgba(201,168,76,0.1);
  border: 2px solid rgba(201,168,76,0.3);
  transition: all 0.3s;
  cursor: default;
}
.dot-video-visto {
  background: #5C6E2E;
  border-color: #5C6E2E;
  box-shadow: 0 2px 8px rgba(92,110,46,0.3);
}
.dot-curiosidad {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: rgba(201,168,76,0.3);
  border: 1px solid rgba(201,168,76,0.5);
  cursor: pointer;
  transition: all 0.2s;
}
.dot-curiosidad:hover { background: #C9A84C; }
.dot-curiosidad-activo { background: #1B3A6B; border-color: #1B3A6B; transform: scale(1.2); }
</style>
