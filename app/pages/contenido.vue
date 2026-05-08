<template>
  <div>
    <!-- Encabezado -->
    <div class="d-flex align-center mb-5">
      <v-icon color="primary" size="38" class="mr-3">mdi-play-circle</v-icon>
      <div>
        <h1 style="font-family:'Cinzel',serif;font-size:1.8rem;color:var(--text-primary);line-height:1.1;letter-spacing:0.06em;text-transform:uppercase">
          Contenido
        </h1>
        <div style="color:var(--text-muted);font-size:0.92rem;font-family:'EB Garamond',serif;font-style:italic">
          <span v-if="tienda.studentName">¡Bienvenido/a al ágora, <strong>{{ tienda.studentName }}</strong>! <v-icon size="16">mdi-video</v-icon></span>
          <span v-else>Contempla los vídeos y bebe de la sabiduría <v-icon size="16">mdi-video</v-icon></span>
        </div>
      </div>
    </div>

    <!-- Banner intro -->
    <v-card color="primary" rounded="lg" elevation="3" class="mb-5" style="border-top:3px solid #C9A84C">
      <v-card-text class="pa-5 d-flex align-center flex-wrap gap-4">
        <div class="d-flex align-center flex-grow-1" style="min-width: 250px;">
          <div style="margin-right:16px"><v-icon size="40" color="#E8C97A">mdi-pillar</v-icon></div>
          <div style="color:#E8C97A;font-size:1.05rem;line-height:1.7;font-family:'EB Garamond',serif">
            <strong style="font-family:'Cinzel',serif;letter-spacing:0.05em">¿Qué es la filosofía?</strong>
            <br>
            <span v-if="tienda.studentName">{{ tienda.studentName }}, es el arte de hacer grandes preguntas. Mira los videos, reflexiona y usa <v-icon size="16">mdi-volume-high</v-icon> para escuchar.</span>
            <span v-else>Es el arte de hacer grandes preguntas. Mira los videos y usa el botón <v-icon size="16">mdi-volume-high</v-icon> para escuchar.</span>
          </div>
        </div>
        <v-btn color="secondary" variant="flat" rounded="xl" prepend-icon="mdi-timeline" @click="mostrarMapa = true">
          Ver Línea de Tiempo
        </v-btn>
      </v-card-text>
    </v-card>

    <!-- MAPA CONCEPTUAL DIALOG -->
    <v-dialog v-model="mostrarMapa" fullscreen transition="dialog-bottom-transition">
      <v-card class="mapa-dialog-card">
        <v-toolbar color="primary" style="border-bottom: 2px solid #C9A84C; flex: 0 0 auto;">
          <v-btn icon variant="text" @click="mostrarMapa = false"><v-icon color="#E8C97A">mdi-arrow-left</v-icon></v-btn>
          <v-toolbar-title style="font-family:'Cinzel',serif;color:#E8C97A;font-size:1.1rem">Línea de Tiempo Interactiva</v-toolbar-title>
          <v-spacer />
          <v-chip v-if="!nodoSeleccionado" color="#E8C97A" variant="outlined" size="small" class="mr-2" style="font-family:'EB Garamond',serif">
            <v-icon start size="14">mdi-gesture-tap</v-icon> Toca un nodo
          </v-chip>
          <v-btn icon variant="text" @click="mostrarMapa = false"><v-icon color="white">mdi-close</v-icon></v-btn>
        </v-toolbar>

        <div class="mapa-body">
          <!-- SVG Map Area -->
          <div class="mapa-svg-area">
            <svg viewBox="0 0 1200 600" class="mapa-svg" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad-main" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#1B3A6B;stop-opacity:0.6" />
                  <stop offset="100%" style="stop-color:#C9A84C;stop-opacity:0.6" />
                </linearGradient>
                <linearGradient id="grad-branch" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#C9A84C;stop-opacity:0.4" />
                  <stop offset="100%" style="stop-color:#1B3A6B;stop-opacity:0.3" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <filter id="glow-gold">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              <!-- Main Timeline Line -->
              <line x1="140" y1="300" x2="1050" y2="300" stroke="url(#grad-main)" stroke-width="5" class="connector-line" />

              <!-- Branches to Philosophers (y=157/397 centers) -->
              <!-- Griega (250) -->
              <line x1="250" y1="300" x2="250" y2="180" stroke="url(#grad-branch)" stroke-width="3" stroke-dasharray="6,4" class="connector-line-dash" />
              <line x1="250" y1="300" x2="180" y2="420" stroke="url(#grad-branch)" stroke-width="3" stroke-dasharray="6,4" class="connector-line-dash" />
              <line x1="250" y1="300" x2="320" y2="420" stroke="url(#grad-branch)" stroke-width="3" stroke-dasharray="6,4" class="connector-line-dash" />
              
              <!-- Medieval (450) -->
              <line x1="450" y1="300" x2="450" y2="180" stroke="url(#grad-branch)" stroke-width="3" stroke-dasharray="6,4" class="connector-line-dash" />
              
              <!-- Moderna (650) -->
              <line x1="650" y1="300" x2="580" y2="180" stroke="url(#grad-branch)" stroke-width="3" stroke-dasharray="6,4" class="connector-line-dash" />
              <line x1="650" y1="300" x2="720" y2="180" stroke="url(#grad-branch)" stroke-width="3" stroke-dasharray="6,4" class="connector-line-dash" />
              
              <!-- Contemp (850) -->
              <line x1="850" y1="300" x2="800" y2="180" stroke="url(#grad-branch)" stroke-width="3" stroke-dasharray="6,4" class="connector-line-dash" />
              <line x1="850" y1="300" x2="900" y2="180" stroke="url(#grad-branch)" stroke-width="3" stroke-dasharray="6,4" class="connector-line-dash" />
              <line x1="850" y1="300" x2="850" y2="420" stroke="url(#grad-branch)" stroke-width="3" stroke-dasharray="6,4" class="connector-line-dash" />

              <!-- Latam (1050) -->
              <line x1="1050" y1="300" x2="1050" y2="180" stroke="url(#grad-branch)" stroke-width="3" stroke-dasharray="6,4" class="connector-line-dash" />

              <!-- Root Node -->
              <g class="svg-node" :class="{ 'node-active': nodoSeleccionado === 'filosofia' }" @click="seleccionarNodo('filosofia')">
                <rect x="20" y="270" width="120" height="60" rx="15" fill="#1B3A6B" stroke="#C9A84C" stroke-width="3" class="node-shape" :filter="nodoSeleccionado === 'filosofia' ? 'url(#glow-gold)' : ''" />
                <text x="80" y="306" text-anchor="middle" fill="#FFFFFF" font-family="'Cinzel', serif" font-weight="bold" font-size="16">Filosofía</text>
              </g>

              <!-- ERA NODES (circles y=300) -->
              <!-- Griega -->
              <g class="svg-node" :class="{ 'node-active': nodoSeleccionado === 'clasica' }" @click="seleccionarNodo('clasica')">
                <circle cx="250" cy="300" r="35" fill="#E8C97A" stroke="#1B3A6B" stroke-width="3" class="node-shape" :filter="nodoSeleccionado === 'clasica' ? 'url(#glow-gold)' : ''" />
                <text x="250" y="304" text-anchor="middle" fill="#1B3A6B" font-family="'Cinzel', serif" font-weight="bold" font-size="12">Antigua</text>
              </g>
              <!-- Medieval -->
              <g class="svg-node" :class="{ 'node-active': nodoSeleccionado === 'medieval' }" @click="seleccionarNodo('medieval')">
                <circle cx="450" cy="300" r="35" fill="#E8C97A" stroke="#1B3A6B" stroke-width="3" class="node-shape" :filter="nodoSeleccionado === 'medieval' ? 'url(#glow-gold)' : ''" />
                <text x="450" y="304" text-anchor="middle" fill="#1B3A6B" font-family="'Cinzel', serif" font-weight="bold" font-size="12">Medieval</text>
              </g>
              <!-- Moderna -->
              <g class="svg-node" :class="{ 'node-active': nodoSeleccionado === 'moderna' }" @click="seleccionarNodo('moderna')">
                <circle cx="650" cy="300" r="35" fill="#E8C97A" stroke="#1B3A6B" stroke-width="3" class="node-shape" :filter="nodoSeleccionado === 'moderna' ? 'url(#glow-gold)' : ''" />
                <text x="650" y="304" text-anchor="middle" fill="#1B3A6B" font-family="'Cinzel', serif" font-weight="bold" font-size="12">Moderna</text>
              </g>
              <!-- Contemp -->
              <g class="svg-node" :class="{ 'node-active': nodoSeleccionado === 'contemp' }" @click="seleccionarNodo('contemp')">
                <circle cx="850" cy="300" r="35" fill="#E8C97A" stroke="#1B3A6B" stroke-width="3" class="node-shape" :filter="nodoSeleccionado === 'contemp' ? 'url(#glow-gold)' : ''" />
                <text x="850" y="300" text-anchor="middle" fill="#1B3A6B" font-family="'Cinzel', serif" font-weight="bold" font-size="11">Siglo</text>
                <text x="850" y="312" text-anchor="middle" fill="#1B3A6B" font-family="'Cinzel', serif" font-weight="bold" font-size="11">XIX-XX</text>
              </g>
              <!-- Latam -->
              <g class="svg-node" :class="{ 'node-active': nodoSeleccionado === 'latam' }" @click="seleccionarNodo('latam')">
                <circle cx="1050" cy="300" r="35" fill="#E8C97A" stroke="#1B3A6B" stroke-width="3" class="node-shape" :filter="nodoSeleccionado === 'latam' ? 'url(#glow-gold)' : ''" />
                <text x="1050" y="304" text-anchor="middle" fill="#1B3A6B" font-family="'Cinzel', serif" font-weight="bold" font-size="12">Latam</text>
              </g>

              <!-- PHILOSOPHER NODES -->
              <!-- Sócrates: x=195, y=157 -->
              <g class="svg-node" :class="{ 'node-active': nodoSeleccionado === 'socrates' }" @click="seleccionarNodo('socrates')">
                <rect x="195" y="157" width="110" height="46" rx="12" fill="#FFFFFF" stroke="#C9A84C" stroke-width="2.5" class="node-shape" :filter="nodoSeleccionado === 'socrates' ? 'url(#glow-gold)' : ''" />
                <text x="250" y="185" text-anchor="middle" fill="#1B3A6B" font-family="'Cinzel', serif" font-weight="bold" font-size="12">Sócrates</text>
              </g>
              <!-- Platón: x=125, y=397 -->
              <g class="svg-node" :class="{ 'node-active': nodoSeleccionado === 'platon' }" @click="seleccionarNodo('platon')">
                <rect x="125" y="397" width="110" height="46" rx="12" fill="#FFFFFF" stroke="#C9A84C" stroke-width="2.5" class="node-shape" :filter="nodoSeleccionado === 'platon' ? 'url(#glow-gold)' : ''" />
                <text x="180" y="425" text-anchor="middle" fill="#1B3A6B" font-family="'Cinzel', serif" font-weight="bold" font-size="12">Platón</text>
              </g>
              <!-- Aristóteles: x=265, y=397 -->
              <g class="svg-node" :class="{ 'node-active': nodoSeleccionado === 'aristoteles' }" @click="seleccionarNodo('aristoteles')">
                <rect x="265" y="397" width="110" height="46" rx="12" fill="#FFFFFF" stroke="#C9A84C" stroke-width="2.5" class="node-shape" :filter="nodoSeleccionado === 'aristoteles' ? 'url(#glow-gold)' : ''" />
                <text x="320" y="425" text-anchor="middle" fill="#1B3A6B" font-family="'Cinzel', serif" font-weight="bold" font-size="12">Aristóteles</text>
              </g>

              <!-- Tomás: x=395, y=157 -->
              <g class="svg-node" :class="{ 'node-active': nodoSeleccionado === 'tomas' }" @click="seleccionarNodo('tomas')">
                <rect x="395" y="157" width="110" height="46" rx="12" fill="#FFFFFF" stroke="#C9A84C" stroke-width="2.5" class="node-shape" :filter="nodoSeleccionado === 'tomas' ? 'url(#glow-gold)' : ''" />
                <text x="450" y="185" text-anchor="middle" fill="#1B3A6B" font-family="'Cinzel', serif" font-weight="bold" font-size="12">S. Tomás</text>
              </g>

              <!-- Descartes: x=525, y=157 -->
              <g class="svg-node" :class="{ 'node-active': nodoSeleccionado === 'descartes' }" @click="seleccionarNodo('descartes')">
                <rect x="525" y="157" width="110" height="46" rx="12" fill="#FFFFFF" stroke="#C9A84C" stroke-width="2.5" class="node-shape" :filter="nodoSeleccionado === 'descartes' ? 'url(#glow-gold)' : ''" />
                <text x="580" y="185" text-anchor="middle" fill="#1B3A6B" font-family="'Cinzel', serif" font-weight="bold" font-size="12">Descartes</text>
              </g>
              <!-- Kant: x=665, y=157 -->
              <g class="svg-node" :class="{ 'node-active': nodoSeleccionado === 'kant' }" @click="seleccionarNodo('kant')">
                <rect x="665" y="157" width="110" height="46" rx="12" fill="#FFFFFF" stroke="#C9A84C" stroke-width="2.5" class="node-shape" :filter="nodoSeleccionado === 'kant' ? 'url(#glow-gold)' : ''" />
                <text x="720" y="185" text-anchor="middle" fill="#1B3A6B" font-family="'Cinzel', serif" font-weight="bold" font-size="12">Kant</text>
              </g>

              <!-- Nietzsche: x=745, y=157 -->
              <g class="svg-node" :class="{ 'node-active': nodoSeleccionado === 'nietzsche' }" @click="seleccionarNodo('nietzsche')">
                <rect x="745" y="157" width="110" height="46" rx="12" fill="#FFFFFF" stroke="#C9A84C" stroke-width="2.5" class="node-shape" :filter="nodoSeleccionado === 'nietzsche' ? 'url(#glow-gold)' : ''" />
                <text x="800" y="185" text-anchor="middle" fill="#1B3A6B" font-family="'Cinzel', serif" font-weight="bold" font-size="12">Nietzsche</text>
              </g>
              <!-- Marx: x=845, y=157 -->
              <g class="svg-node" :class="{ 'node-active': nodoSeleccionado === 'marx' }" @click="seleccionarNodo('marx')">
                <rect x="845" y="157" width="110" height="46" rx="12" fill="#FFFFFF" stroke="#C9A84C" stroke-width="2.5" class="node-shape" :filter="nodoSeleccionado === 'marx' ? 'url(#glow-gold)' : ''" />
                <text x="900" y="185" text-anchor="middle" fill="#1B3A6B" font-family="'Cinzel', serif" font-weight="bold" font-size="12">Marx</text>
              </g>
              <!-- Sartre: x=795, y=397 -->
              <g class="svg-node" :class="{ 'node-active': nodoSeleccionado === 'sartre' }" @click="seleccionarNodo('sartre')">
                <rect x="795" y="397" width="110" height="46" rx="12" fill="#FFFFFF" stroke="#C9A84C" stroke-width="2.5" class="node-shape" :filter="nodoSeleccionado === 'sartre' ? 'url(#glow-gold)' : ''" />
                <text x="850" y="425" text-anchor="middle" fill="#1B3A6B" font-family="'Cinzel', serif" font-weight="bold" font-size="12">Sartre</text>
              </g>

              <!-- Dussel: x=995, y=157 -->
              <g class="svg-node" :class="{ 'node-active': nodoSeleccionado === 'dussel' }" @click="seleccionarNodo('dussel')">
                <rect x="995" y="157" width="110" height="46" rx="12" fill="#FFFFFF" stroke="#C9A84C" stroke-width="2.5" class="node-shape" :filter="nodoSeleccionado === 'dussel' ? 'url(#glow-gold)' : ''" />
                <text x="1050" y="185" text-anchor="middle" fill="#1B3A6B" font-family="'Cinzel', serif" font-weight="bold" font-size="12">Dussel</text>
              </g>
            </svg>
          </div>

          <!-- Panel de detalle con imagen -->
          <Transition name="slide-detail">
            <div v-if="nodoSeleccionado" class="mapa-detail-panel" :key="nodoSeleccionado">
              <div class="detail-close-bar">
                <v-btn icon size="small" variant="text" @click="nodoSeleccionado = null"><v-icon>mdi-chevron-down</v-icon></v-btn>
              </div>
              <div class="detail-content">
                <div class="detail-image-wrap">
                  <img :src="infoNodos[nodoSeleccionado].img" :alt="infoNodos[nodoSeleccionado].titulo" class="detail-image" />
                </div>
                <div class="detail-text">
                  <div class="detail-title">{{ infoNodos[nodoSeleccionado].titulo }}</div>
                  <div class="detail-desc">{{ infoNodos[nodoSeleccionado].desc }}</div>
                  <div v-if="infoNodos[nodoSeleccionado].dato" class="detail-dato">
                    <v-icon size="16" color="#C9A84C" class="mr-1">mdi-lightbulb-outline</v-icon>
                    {{ infoNodos[nodoSeleccionado].dato }}
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </v-card>
    </v-dialog>

    <!-- Progreso de videos -->
    <div class="mb-5 d-flex align-center gap-3 flex-wrap">
      <span style="font-family:'Cinzel',serif;font-size:0.78rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted)">
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
        <v-icon class="mr-1">mdi-party-popper</v-icon> ¡Todos vistos!
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
    <v-card rounded="xl" elevation="2" class="mb-6" style="border:1px solid rgba(201,168,76,0.35);background:var(--bg-warm)">
      <v-card-title class="pa-5 pb-2 d-flex align-center">
        <v-icon size="28" color="#C9A84C" class="mr-3">mdi-lightbulb-on</v-icon>
        <span style="font-family:'Cinzel',serif;color:var(--text-primary);font-size:1rem;letter-spacing:0.08em">¿Sabías que...?</span>
        <v-spacer />
        <div class="d-flex gap-2">
          <v-btn icon size="x-small" variant="text" color="primary" @click="curiosidadAnterior" aria-label="Curiosidad anterior">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn icon size="x-small" variant="text" color="primary" @click="curiosidadSiguiente" aria-label="Curiosidad siguiente">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text class="pa-5 pt-2">
        <v-window v-model="curiosidadActual">
          <v-window-item v-for="(c, i) in curiosidades" :key="i" :value="i">
            <div class="d-flex align-start gap-3">
              <span style="flex-shrink:0; color: #C9A84C"><v-icon size="40">{{ c.icon }}</v-icon></span>
              <div>
                <div style="font-family:'Cinzel',serif;font-size:0.88rem;font-weight:700;color:var(--text-primary);margin-bottom:4px">{{ c.titulo }}</div>
                <div style="font-family:'EB Garamond',serif;font-size:1rem;color:var(--text-dark);line-height:1.7">{{ c.texto }}</div>
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
            role="button"
            tabindex="0"
            :aria-label="'Ir a curiosidad ' + (i + 1) + ' de ' + curiosidades.length"
            :aria-current="curiosidadActual === i ? 'true' : undefined"
            @click="curiosidadActual = i"
            @keyup.enter="curiosidadActual = i"
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
import { useAccessibility } from '~/composables/useAccessibility'

const tienda = useOvaStore()
useAccessibility() // Mantén la instancia activa para que el watch funcione
const route = useRoute()
onMounted(() => {
  tienda.markPageVisited('contenido')
  // Check if a specific video is requested via query param (temaRelacionado)
  const tema = route.query.tema as string
  if (tema) {
    const video = listaVideos.find(v => v.id.toLowerCase().includes(tema) || v.titulo.toLowerCase().includes(tema))
    if (video) {
      setTimeout(() => {
        document.getElementById(`video-${video.id}`)?.scrollIntoView({ behavior: 'smooth' })
      }, 500)
    }
  }
})

const curiosidadActual = ref(0)
const mostrarMapa = ref(false)
const nodoSeleccionado = ref<keyof typeof infoNodos | null>(null)

const infoNodos: Record<string, { titulo: string; desc: string; img: string; dato?: string }> = {
  filosofia: { titulo: 'La Historia de la Filosofía', desc: 'Un viaje milenario a través de las grandes preguntas del pensamiento occidental, estructurado en épocas que responden a distintos desafíos de su contexto histórico.', img: '/img/filosofia.png', dato: 'La filosofía nunca se detiene; es un diálogo continuo a través del tiempo.' },
  
  clasica: { titulo: 'Filosofía Clásica (s. V a.C.)', desc: 'El nacimiento de la razón en la Grecia antigua. Se marca el "paso del mito al logos", donde las respuestas comienzan a buscarse en la lógica y no en los dioses.', img: '/img/agora.png', dato: 'Atenas fue la cuna de este estallido intelectual.' },
  medieval: { titulo: 'Filosofía Medieval (s. V - XV)', desc: 'Época dominada por la relación entre la fe cristiana y la razón griega. Se destaca la escolástica y el desarrollo de la teología filosófica.', img: '/img/medieval.png', dato: 'Las primeras universidades de Europa nacieron en esta época.' },
  moderna: { titulo: 'Filosofía Moderna (s. XVII - XVIII)', desc: 'Con el desarrollo de la ciencia, el centro del conocimiento pasa a ser el "sujeto cognoscente" humano. Surge el racionalismo y el empirismo.', img: '/img/moderna.png', dato: 'Es el periodo de la Revolución Científica y la Ilustración.' },
  contemp: { titulo: 'Siglos XIX y XX', desc: 'Una época de grandes convulsiones sociales e intelectuales. Nacen corrientes críticas como el marxismo, el psicoanálisis, la sospecha sobre la moral y el existencialismo.', img: '/img/contemp.png', dato: 'Las dos guerras mundiales impactaron profundamente la forma de hacer filosofía.' },
  latam: { titulo: 'Filosofía Latinoamericana', desc: 'Un esfuerzo de emancipación intelectual. Propone dejar de copiar modelos europeos para pensar desde la propia realidad periférica y los oprimidos.', img: '/img/latam.png', dato: 'Enrique Dussel y Leopoldo Zea son dos de sus mayores exponentes.' },

  socrates: { titulo: 'Sócrates', desc: 'Creador de la Mayéutica, el arte de hacer "dar a luz" ideas a través de preguntas punzantes.', img: '/img/socrates.png', dato: 'Murió bebiendo cicuta tras ser condenado por "corromper a los jóvenes".' },
  platon: { titulo: 'Platón', desc: 'Postuló que este mundo es una copia imperfecta de un "Mundo de las Ideas" perfecto e inmutable.', img: '/img/platon.png', dato: 'Su alegoría de la caverna es la metáfora epistemológica más famosa de la historia.' },
  aristoteles: { titulo: 'Aristóteles', desc: 'Padre de la lógica formal. En su ética defiende que la felicidad humana (Eudaimonía) se logra con la virtud racional.', img: '/img/aristoteles.png', dato: 'Tutor personal de Alejandro Magno.' },
  tomas: { titulo: 'Tomás de Aquino', desc: 'Representante cumbre de la escolástica. Demostró que la razón aristotélica es compatible con la revelación cristiana.', img: '/img/tomas.png', dato: 'Escribió "La Suma Teológica", una obra de dimensiones titánicas.' },
  descartes: { titulo: 'René Descartes', desc: '"Pienso, luego existo". Fundó el racionalismo partiendo de la duda metódica como primera certeza indudable.', img: '/img/descartes.png', dato: 'Además de filósofo, fue un brillante matemático que inventó la geometría analítica.' },
  kant: { titulo: 'Immanuel Kant', desc: 'Investigó los límites de la razón pura y estableció el "imperativo categórico" en la ética.', img: '/img/kant.png', dato: 'Nunca salió de su ciudad natal, Königsberg, en toda su vida.' },
  marx: { titulo: 'Karl Marx', desc: 'Analizó la historia como una "lucha de clases" y planteó que la estructura económica determina la cultura.', img: '/img/marx.png', dato: 'Dijo la famosa frase: "Los filósofos han interpretado el mundo, de lo que se trata es de transformarlo".' },
  nietzsche: { titulo: 'Friedrich Nietzsche', desc: 'Declaró "La muerte de Dios" (el fin de las verdades absolutas) y propuso crear nuevos valores como el Superhombre.', img: '/img/nietzsche.png', dato: 'Tenía un estilo poético y aforístico inconfundible.' },
  sartre: { titulo: 'Jean-Paul Sartre', desc: 'Exponente del existencialismo ateo. Propuso que "la existencia precede a la esencia": primero existimos, luego nos definimos.', img: '/img/sartre.png', dato: 'Rechazó recibir el Premio Nobel de Literatura en 1964.' },
  dussel: { titulo: 'Enrique Dussel', desc: 'Fundador de la Filosofía de la Liberación. Insta a pensar la ética desde "el otro" excluido por la modernidad europea.', img: '/img/dussel.png', dato: 'Unió la crítica social con una aguda reflexión fenomenológica.' },
}

function seleccionarNodo(nodo: keyof typeof infoNodos) {
  nodoSeleccionado.value = nodo
}

const curiosidades = [
  {
    icon: 'mdi-pillar',
    titulo: 'La primera universidad del mundo',
    texto: 'Platón fundó en Atenas "La Academia" alrededor del año 387 a.C. Fue la primera institución de educación superior de la historia occidental. Funcionó durante casi 900 años.',
  },
  {
    icon: 'mdi-book-open-page-variant',
    titulo: 'Sócrates nunca escribió nada',
    texto: 'Todo lo que sabemos de Sócrates fue escrito por sus discípulos, especialmente Platón. El propio Sócrates desconfiaba de la escritura: creía que debilitaba la memoria y el pensamiento vivo.',
  },
  {
    icon: 'mdi-lightning-bolt',
    titulo: 'La palabra "filosofía" la inventó Pitágoras',
    texto: 'Se atribuye a Pitágoras (el del teorema) haber acuñado la palabra "filósofo" para describirse a sí mismo: no un sabio, sino un amante de la sabiduría. La humildad como método.',
  },
  {
    icon: 'mdi-earth',
    titulo: 'Aristóteles tenía razón... y estaba equivocado',
    texto: 'Aristóteles creía que la Tierra era el centro del universo — error. Pero también dedujo que la Tierra era esférica observando la sombra circular que proyecta en la Luna durante los eclipses — ¡correcto!',
  },
  {
    icon: 'mdi-key-variant',
    titulo: 'La mayéutica: el arte de hacer nacer ideas',
    texto: 'Sócrates decía que su método de preguntas era como el oficio de su madre, que era partera: él no enseñaba, sino que ayudaba a las personas a "dar a luz" el conocimiento que ya tenían dentro.',
  },
  {
    icon: 'mdi-math-compass',
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
.dot-curiosidad-activo { background: #1B3A6B; border-color:var(--text-primary); transform: scale(1.2); }
</style>

<style scoped>
/* ===== Mapa Conceptual Dialog ===== */
.mapa-dialog-card {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(160deg, #FAF9F6 0%, #F0EBD8 50%, #E8E0CC 100%);
}
.mapa-body {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}
.mapa-svg-area {
  flex: 1 1 auto;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 16px;
}
.mapa-svg {
  width: 100%;
  max-width: 820px;
  height: auto;
}

/* Connector animations */
.connector-line {
  transition: opacity 0.3s;
}
.connector-line-dash {
  animation: dash-flow 1.5s linear infinite;
}
@keyframes dash-flow {
  to { stroke-dashoffset: -24; }
}

/* Node styles */
.svg-node {
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(.4,0,.2,1), opacity 0.25s;
}
.svg-node:hover {
  transform: scale(1.07);
}
.svg-node:hover .node-shape {
  filter: drop-shadow(0 4px 12px rgba(201,168,76,0.65));
}
.svg-node.node-active .node-shape {
  stroke: #C9A84C;
  stroke-width: 5;
}

/* Detail panel */
.mapa-detail-panel {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, rgba(253,250,243,0.97), #FDFAF3);
  border-top: 3px solid #C9A84C;
  box-shadow: 0 -8px 32px rgba(27,58,107,0.12);
  border-radius: 20px 20px 0 0;
  max-height: 55%;
  overflow-y: auto;
  z-index: 10;
}
.detail-close-bar {
  display: flex;
  justify-content: center;
  padding: 6px 0 0;
}
.detail-content {
  display: flex;
  gap: 20px;
  padding: 8px 24px 24px;
  align-items: flex-start;
}
.detail-image-wrap {
  flex-shrink: 0;
  width: 150px;
  height: 150px;
  border-radius: 16px;
  overflow: hidden;
  border: 3px solid #C9A84C;
  box-shadow: 0 4px 16px rgba(201,168,76,0.25);
}
.detail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.detail-text {
  flex: 1;
  min-width: 0;
}
.detail-title {
  font-family: 'Cinzel', serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 6px;
  letter-spacing: 0.04em;
}
.detail-desc {
  font-family: 'EB Garamond', serif;
  font-size: 1.02rem;
  line-height: 1.65;
  color: var(--text-dark);
  margin-bottom: 10px;
}
.detail-dato {
  display: flex;
  align-items: flex-start;
  gap: 4px;
  font-family: 'EB Garamond', serif;
  font-size: 0.92rem;
  color: #8B7A3B;
  font-style: italic;
  background: rgba(201,168,76,0.08);
  border-left: 3px solid #C9A84C;
  padding: 8px 12px;
  border-radius: 0 8px 8px 0;
  line-height: 1.5;
}

/* Detail panel transition */
.slide-detail-enter-active {
  transition: transform 0.35s cubic-bezier(.4,0,.2,1), opacity 0.25s;
}
.slide-detail-leave-active {
  transition: transform 0.25s cubic-bezier(.4,0,.2,1), opacity 0.2s;
}
.slide-detail-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
.slide-detail-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* Mobile responsive */
@media (max-width: 600px) {
  .detail-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 8px 16px 20px;
  }
  .detail-image-wrap {
    width: 120px;
    height: 120px;
  }
  .detail-dato {
    text-align: left;
  }
  .mapa-detail-panel {
    max-height: 60%;
  }
}
</style>
