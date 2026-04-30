<template>
  <div>
    <!-- Encabezado -->
    <div class="d-flex align-center mb-5" role="banner">
      <v-icon color="primary" size="38" class="mr-3" aria-hidden="true">mdi-book-open-page-variant</v-icon>
      <div>
        <h1 style="font-family:'Cinzel',serif;font-size:1.9rem;color:var(--text-primary);line-height:1.1;letter-spacing:0.06em">Cuaderno de Reflexión</h1>
        <div style="color:var(--text-muted);font-size:0.95rem;font-family:'EB Garamond',serif;font-style:italic">
          Plasma tus ideas y desarrolla tu pensamiento crítico.
        </div>
      </div>
    </div>

    <v-card rounded="xl" elevation="2" class="mb-6 pa-5" style="border:1px solid rgba(201,168,76,0.3)">
      <div style="font-family:'Cinzel',serif;font-size:1.2rem;color:var(--text-primary);margin-bottom:12px">
        Nueva Reflexión
      </div>
      
      <div class="mb-4 d-flex align-center gap-2">
        <v-btn size="small" variant="tonal" color="secondary" rounded="xl" @click="generarTema" aria-label="Sugerir nuevo tema">
          <v-icon left>mdi-refresh</v-icon> Sugerir tema
        </v-btn>
        <span style="font-family:'EB Garamond',serif;font-size:1rem;color:var(--text-dark);font-style:italic">
          "{{ temaSugerido }}"
        </span>
      </div>

      <v-textarea
        v-model="nuevaReflexion"
        variant="outlined"
        color="primary"
        placeholder="Escribe tus pensamientos aquí..."
        rows="4"
        auto-grow
        hide-details
        class="mb-4"
        aria-label="Área de texto para nueva reflexión"
      ></v-textarea>

      <v-btn color="primary" rounded="xl" prepend-icon="mdi-pencil" @click="guardarReflexion" :disabled="!nuevaReflexion.trim()">
        Guardar Reflexión
      </v-btn>
    </v-card>

    <div v-if="tienda.reflexiones.length > 0">
      <h2 style="font-family:'Cinzel',serif;font-size:1.4rem;color:var(--text-primary);margin-bottom:16px;letter-spacing:0.05em">
        Mis Pensamientos
      </h2>
      <v-row>
        <v-col v-for="(ref, i) in [...tienda.reflexiones].reverse()" :key="i" cols="12" md="6">
          <v-card rounded="xl" elevation="1" class="pa-4 h-100" style="background:var(--bg-light);border:1px solid rgba(201,168,76,0.2)">
            <div style="font-family:'EB Garamond',serif;font-size:0.85rem;color:var(--text-muted);margin-bottom:8px">
              {{ ref.fecha }}
            </div>
            <div style="font-family:'Cinzel',serif;font-size:0.9rem;color:var(--text-primary);margin-bottom:8px;font-weight:700">
              Tema: {{ ref.tema }}
            </div>
            <div style="font-family:'EB Garamond',serif;font-size:1.05rem;color:var(--text-dark);line-height:1.6;white-space:pre-wrap;">
              {{ ref.texto }}
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div v-else class="text-center pa-8" style="background:var(--bg-light);border-radius:16px;border:1px dashed rgba(201,168,76,0.5)">
      <div style="font-size:3rem;margin-bottom:12px;opacity:0.5">✍️</div>
      <div style="font-family:'EB Garamond',serif;font-size:1.1rem;color:var(--text-muted)">
        Aún no has escrito ninguna reflexión. ¡Anímate a empezar!
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOvaStore } from '~/stores/ova'

const tienda = useOvaStore()

const temas = [
  "¿Qué significa la frase 'Solo sé que no sé nada' en la vida actual?",
  "¿Cómo aplicarías la Mayéutica de Sócrates al aprender algo nuevo?",
  "Si estuvieras en la caverna de Platón, ¿cuáles serían las 'sombras' hoy en día?",
  "¿Por qué crees que Aristóteles decía que somos 'animales políticos'?",
  "¿Qué es para ti la eudaimonía (felicidad) y cómo la buscas?",
  "¿Cómo crees que la filosofía puede ayudarte a tomar mejores decisiones?",
  "¿Crees que el conocimiento es poder? ¿Por qué?",
  "Si pudieras hablar con Platón, ¿qué le preguntarías?"
]

const temaSugerido = ref(temas[0])
const nuevaReflexion = ref('')

function generarTema() {
  const temasDisponibles = temas.filter(t => t !== temaSugerido.value)
  temaSugerido.value = temasDisponibles[Math.floor(Math.random() * temasDisponibles.length)]
}

function guardarReflexion() {
  if (!nuevaReflexion.value.trim()) return
  tienda.agregarReflexion(temaSugerido.value, nuevaReflexion.value.trim())
  nuevaReflexion.value = ''
  generarTema()
}
</script>
