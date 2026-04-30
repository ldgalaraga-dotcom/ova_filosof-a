<template>
  <div style="min-height: 80vh; display: flex; align-items: center; justify-content: center;">
    
    <v-card v-if="!autenticado" rounded="xl" elevation="4" class="pa-8 text-center" style="max-width: 400px; width: 100%; border: 2px solid #C9A84C;">
      <v-icon size="64" color="primary" class="mb-4">mdi-shield-lock</v-icon>
      <h1 style="font-family:'Cinzel',serif;font-size:1.5rem;color:var(--text-primary);margin-bottom:16px;">
        Acceso Docente
      </h1>
      <p style="font-family:'EB Garamond',serif;color:var(--text-muted);margin-bottom:24px;">
        Ingrese la clave de acceso para ver las estadísticas del estudiante.
      </p>
      <v-text-field
        v-model="password"
        type="password"
        variant="outlined"
        density="comfortable"
        placeholder="Código de acceso"
        @keyup.enter="verificarAcceso"
        :error-messages="error"
        color="primary"
      ></v-text-field>
      <v-btn color="primary" size="large" rounded="xl" block class="mt-2" @click="verificarAcceso">
        Ingresar
      </v-btn>
    </v-card>

    <div v-else style="width: 100%; max-width: 800px;">
      <div class="d-flex align-center justify-space-between mb-6">
        <div>
          <h1 style="font-family:'Cinzel',serif;font-size:2rem;color:var(--text-primary);">Panel Docente</h1>
          <div style="color:var(--text-muted);font-family:'EB Garamond',serif;">Estadísticas de la sesión actual</div>
        </div>
        <v-btn color="error" variant="tonal" rounded="xl" prepend-icon="mdi-logout" @click="autenticado = false">
          Salir
        </v-btn>
      </div>

      <v-row>
        <v-col cols="12" md="6">
          <v-card rounded="xl" elevation="2" class="pa-5 h-100" style="border:1px solid rgba(201,168,76,0.3)">
            <h3 style="font-family:'Cinzel',serif;color:var(--text-primary);margin-bottom:16px;">Datos del Estudiante</h3>
            <v-list bg-color="transparent">
              <v-list-item>
                <template v-slot:prepend><v-icon color="primary">mdi-account</v-icon></template>
                <v-list-item-title>Nombre</v-list-item-title>
                <v-list-item-subtitle>{{ tienda.studentName || 'No registrado' }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <template v-slot:prepend><v-icon color="warning">mdi-trophy</v-icon></template>
                <v-list-item-title>Evaluación Final</v-list-item-title>
                <v-list-item-subtitle>
                  {{ tienda.evaluationScore !== null ? tienda.evaluationScore + '%' : 'No completada' }}
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <template v-slot:prepend><v-icon color="success">mdi-percent</v-icon></template>
                <v-list-item-title>Progreso General</v-list-item-title>
                <v-list-item-subtitle>{{ tienda.progress }}% del OVA explorado</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card rounded="xl" elevation="2" class="pa-5 h-100" style="border:1px solid rgba(201,168,76,0.3)">
            <h3 style="font-family:'Cinzel',serif;color:var(--text-primary);margin-bottom:16px;">Métricas Detalladas</h3>
            <v-list bg-color="transparent" density="compact">
              <v-list-item>
                <v-list-item-title>Videos Vistos</v-list-item-title>
                <template v-slot:append>
                  <strong>{{ tienda.progressDetails.videosWatched }} / {{ tienda.progressDetails.totalVideos }}</strong>
                </template>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Actividades Completadas</v-list-item-title>
                <template v-slot:append>
                  <strong>{{ tienda.progressDetails.activitiesCompleted }} / {{ tienda.progressDetails.totalActivities }}</strong>
                </template>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Reflexiones Escritas</v-list-item-title>
                <template v-slot:append>
                  <strong>{{ tienda.reflexiones.length }}</strong>
                </template>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Logros Desbloqueados</v-list-item-title>
                <template v-slot:append>
                  <strong>{{ tienda.logrosObtenidos.length }} / {{ tienda.logros.length }}</strong>
                </template>
              </v-list-item>
            </v-list>
            
            <div class="mt-4 text-center">
              <v-btn color="secondary" rounded="xl" prepend-icon="mdi-download" @click="exportarCSV">
                Exportar a CSV
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useOvaStore } from '~/stores/ova'

const tienda = useOvaStore()
const autenticado = ref(false)
const password = ref('')
const error = ref('')

function verificarAcceso() {
  if (password.value === 'AGORA2026') {
    autenticado.value = true
    error.value = ''
    password.value = ''
  } else {
    error.value = 'Código incorrecto'
  }
}

function exportarCSV() {
  const data = [
    ['Estudiante', 'Progreso (%)', 'Evaluación (%)', 'Videos Vistos', 'Actividades', 'Reflexiones', 'Logros'],
    [
      tienda.studentName || 'Anónimo',
      tienda.progress,
      tienda.evaluationScore ?? 'N/A',
      tienda.progressDetails.videosWatched,
      tienda.progressDetails.activitiesCompleted,
      tienda.reflexiones.length,
      tienda.logrosObtenidos.length
    ]
  ]
  
  const csvContent = "data:text/csv;charset=utf-8," 
    + data.map(e => e.join(",")).join("\n")
    
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement("a")
  link.setAttribute("href", encodedUri)
  link.setAttribute("download", `reporte-agora-${new Date().getTime()}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>
