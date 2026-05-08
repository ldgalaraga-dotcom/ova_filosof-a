<template>
  <v-card rounded="lg" elevation="2" class="pa-4" style="background:linear-gradient(135deg,rgba(27,58,107,0.05),rgba(201,168,76,0.05))">
    <!-- Título -->
    <div style="font-family:'Cinzel',serif;font-weight:700;color:var(--text-primary);margin-bottom:12px;letter-spacing:0.05em;font-size:0.95rem">
      <v-icon size="18" color="primary" class="mr-1">mdi-poll</v-icon> Tu Progreso en el Viaje Filosófico
    </div>

    <!-- Barra de progreso general -->
    <div class="mb-4">
      <div class="d-flex justify-space-between align-center mb-2">
        <span style="font-family:'EB Garamond',serif;font-size:0.9rem;color:var(--text-secondary);font-weight:600">
          Progreso general
        </span>
        <span style="font-family:'Cinzel',serif;font-weight:700;color:var(--text-primary);font-size:0.85rem">
          {{ Math.round(progreso) }}%
        </span>
      </div>
      <v-progress-linear
        :model-value="progreso"
        height="16"
        rounded="lg"
        :color="progreso < 33 ? 'warning' : progreso < 67 ? 'info' : 'success'"
        class="mb-2"
      />
    </div>

    <!-- Detalles por sección -->
    <v-row class="mb-4">
      <!-- Videos -->
      <v-col cols="12" sm="4">
        <v-card rounded="lg" elevation="0" style="background:rgba(27,58,107,0.08);border:2px solid rgba(27,58,107,0.15)">
          <v-card-text class="pa-3 text-center">
            <div style="margin-bottom:4px"><v-icon size="40" color="primary">mdi-video</v-icon></div>
            <div style="font-family:'Cinzel',serif;font-size:0.8rem;font-weight:700;color:var(--text-primary);letter-spacing:0.04em;margin-bottom:4px">
              VIDEOS
            </div>
            <div style="font-family:'EB Garamond',serif;font-size:1.3rem;font-weight:600;color:var(--text-secondary)">
              {{ details.videosWatched }}<span style="font-size:0.85rem;color:var(--text-muted)">/{{ details.totalVideos }}</span>
            </div>
            <v-progress-linear
              :model-value="(details.videosWatched / details.totalVideos) * 100"
              height="6"
              rounded="lg"
              color="primary"
              class="mt-2"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Actividades -->
      <v-col cols="12" sm="4">
        <v-card rounded="lg" elevation="0" style="background:rgba(201,168,76,0.08);border:2px solid rgba(201,168,76,0.15)">
          <v-card-text class="pa-3 text-center">
            <div style="margin-bottom:4px"><v-icon size="40" color="secondary">mdi-pencil</v-icon></div>
            <div style="font-family:'Cinzel',serif;font-size:0.8rem;font-weight:700;color:var(--text-primary);letter-spacing:0.04em;margin-bottom:4px">
              ACTIVIDADES
            </div>
            <div style="font-family:'EB Garamond',serif;font-size:1.3rem;font-weight:600;color:var(--text-secondary)">
              {{ details.activitiesCompleted }}<span style="font-size:0.85rem;color:var(--text-muted)">/{{ details.totalActivities }}</span>
            </div>
            <v-progress-linear
              :model-value="(details.activitiesCompleted / details.totalActivities) * 100"
              height="6"
              rounded="lg"
              color="secondary"
              class="mt-2"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Evaluación -->
      <v-col cols="12" sm="4">
        <v-card rounded="lg" elevation="0" :style="{
          background: details.evaluationDone ? 'rgba(92,110,46,0.08)' : 'rgba(139,58,42,0.08)',
          border: '2px solid ' + (details.evaluationDone ? 'rgba(92,110,46,0.15)' : 'rgba(139,58,42,0.15)'),
        }">
          <v-card-text class="pa-3 text-center">
            <div style="margin-bottom:4px">
              <v-icon v-if="details.evaluationDone" size="40" color="success">mdi-check-circle</v-icon>
              <v-icon v-else size="40" color="error">mdi-clipboard-text</v-icon>
            </div>
            <div style="font-family:'Cinzel',serif;font-size:0.8rem;font-weight:700;color:var(--text-primary);letter-spacing:0.04em;margin-bottom:4px">
              EVALUACIÓN
            </div>
            <div style="font-family:'EB Garamond',serif;font-size:1rem;font-weight:600;color:var(--text-secondary)">
              {{ details.evaluationDone ? '¡Completada!' : 'Pendiente' }}
            </div>
            <v-chip
              v-if="details.evaluationDone"
              size="small"
              color="success"
              class="mt-2"
              style="font-family:'Cinzel',serif;font-size:0.7rem"
            >
              ✓ Listo
            </v-chip>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Consejos -->
    <div class="pa-3 rounded-lg" style="background:rgba(232,201,122,0.1);border-left:4px solid #C9A84C">
      <div style="font-family:'EB Garamond',serif;font-size:0.9rem;color:var(--text-secondary);line-height:1.5;font-style:italic">
        <span v-if="details.videosWatched < details.totalVideos">
          <v-icon size="16" class="mr-1">mdi-lightbulb-on</v-icon> Continúa viendo los videos. Cada uno te acerca a la sabiduría filosófica.
        </span>
        <span v-else-if="details.activitiesCompleted < details.totalActivities">
          <v-icon size="16" class="mr-1">mdi-lightbulb-on</v-icon> ¡Excelente! Ya viste todos los videos. Ahora completa las actividades para consolidar tu aprendizaje.
        </span>
        <span v-else-if="!details.evaluationDone">
          <v-icon size="16" class="mr-1">mdi-lightbulb-on</v-icon> ¡Casi terminas! Solo falta la evaluación final para demostrar lo que aprendiste.
        </span>
        <span v-else>
          <v-icon size="16" color="secondary" class="mr-1">mdi-trophy</v-icon> ¡Felicidades! Has completado todo el viaje filosófico.
        </span>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { useOvaStore } from '~/stores/ova'

const tienda = useOvaStore()

const progreso = computed(() => tienda.progress)
const details = computed(() => tienda.progressDetails)
</script>
