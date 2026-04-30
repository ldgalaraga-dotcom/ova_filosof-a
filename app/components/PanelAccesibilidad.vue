<template>
  <v-card rounded="lg" elevation="2" class="pa-4">
    <div class="mb-4">
      <div style="font-family:'Cinzel',serif;font-weight:700;color:var(--text-primary);margin-bottom:8px;letter-spacing:0.05em">
        <v-icon size="18" color="primary" class="mr-1">mdi-accessibility</v-icon> Accesibilidad
      </div>
    </div>

    <!-- Modo oscuro -->
    <div class="mb-4">
      <div style="font-family:'EB Garamond',serif;font-size:0.9rem;color:#5A5040;margin-bottom:6px;font-weight:600">
        Modo de visualización:
      </div>
      <div class="d-flex gap-2">
        <v-btn
          :color="!tienda.darkMode ? 'primary' : 'grey-lighten-2'"
          :variant="!tienda.darkMode ? 'tonal' : 'plain'"
          size="small" rounded="lg"
          prepend-icon="mdi-white-balance-sunny"
          @click="tienda.darkMode = false"
          style="font-family:'Cinzel',serif;font-size:0.75rem"
        >
          Claro
        </v-btn>
        <v-btn
          :color="tienda.darkMode ? 'secondary' : 'grey-lighten-2'"
          :variant="tienda.darkMode ? 'tonal' : 'plain'"
          size="small" rounded="lg"
          prepend-icon="mdi-moon-waning-crescent"
          @click="tienda.darkMode = true"
          style="font-family:'Cinzel',serif;font-size:0.75rem"
        >
          Oscuro
        </v-btn>
      </div>
    </div>

    <!-- Control de velocidad de texto -->
    <div class="mb-4">
      <div style="font-family:'EB Garamond',serif;font-size:0.9rem;color:#5A5040;margin-bottom:6px;font-weight:600">
        Velocidad de lectura:
      </div>
      <div class="d-flex gap-2">
        <v-btn
          v-for="speed in speeds"
          :key="speed.value"
          :color="currentSpeed === speed.value ? 'primary' : 'grey-lighten-2'"
          :variant="currentSpeed === speed.value ? 'tonal' : 'plain'"
          size="small"
          rounded="lg"
          :prepend-icon="speed.icon"
          @click="currentSpeed = speed.value"
          style="font-family:'Cinzel',serif;font-size:0.75rem"
        >
          {{ speed.label }}
        </v-btn>
      </div>
    </div>

    <!-- Control de tamaño de fuente -->
    <div>
      <div style="font-family:'EB Garamond',serif;font-size:0.9rem;color:#5A5040;margin-bottom:6px;font-weight:600">
        Tamaño de fuente:
      </div>
      <div class="d-flex gap-2">
        <v-btn
          v-for="size in sizes"
          :key="size.value"
          :color="currentSize === size.value ? 'primary' : 'grey-lighten-2'"
          :variant="currentSize === size.value ? 'tonal' : 'plain'"
          size="small"
          rounded="lg"
          :prepend-icon="size.icon"
          @click="currentSize = size.value"
          style="font-family:'Cinzel',serif;font-size:0.75rem;min-width:44px"
        >
          {{ size.label }}
        </v-btn>
      </div>
    </div>

    <!-- Información -->
    <div style="margin-top:12px;padding-top:12px;border-top:1px solid rgba(201,168,76,0.2)">
      <div style="font-family:'EB Garamond',serif;font-size:0.82rem;color:var(--text-muted);font-style:italic">
        <v-icon size="14" class="mr-1">mdi-lightbulb-on</v-icon> Estos controles se guardan automáticamente y se aplican en todas las páginas.
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { useAccessibility } from '~/composables/useAccessibility'
import { useOvaStore } from '~/stores/ova'

const tienda = useOvaStore()
const { speeds, sizes, currentSpeed, currentSize } = useAccessibility()
</script>
