<template>
  <div>
    <div class="d-flex align-center mb-5">
      <v-icon color="secondary" size="38" class="mr-3">mdi-account-group</v-icon>
      <div>
        <h1 style="font-family:'Fredoka One',cursive;font-size:1.9rem;color:#FF8F00;line-height:1.1">Créditos</h1>
        <div style="color:#888;font-size:0.95rem">El equipo detrás de este OVA 🌟</div>
      </div>
    </div>

    <!-- Banner principal -->
    <v-card rounded="xl" elevation="4" class="mb-6 text-center"
      style="background:linear-gradient(135deg,#5E35B1,#7E57C2,#9575CD)"
    >
      <v-card-text class="pa-7">
        <div style="font-size:4rem;margin-bottom:10px">🦉</div>
        <div style="font-family:'Fredoka One',cursive;font-size:2rem;color:white;margin-bottom:4px">
          Filosofía para Todos
        </div>
        <div style="color:rgba(255,255,255,0.85);font-size:1rem;margin-bottom:14px">
          Objeto Virtual de Aprendizaje · Grados 10 y 11
        </div>
        <div class="d-flex justify-center flex-wrap gap-2">
          <v-chip color="white" label>📅 2026</v-chip>
          <v-chip color="white" label>🎓 Filosofía</v-chip>
          <v-chip color="white" label>🌎 Colombia</v-chip>
          <v-chip color="white" label>♿ Inclusivo</v-chip>
        </div>
      </v-card-text>
    </v-card>

    <!-- Equipo -->
    <div style="font-family:'Fredoka One',cursive;font-size:1.4rem;color:#5E35B1;text-align:center;margin-bottom:16px">
      👥 Equipo de Desarrollo
    </div>
    <v-row class="mb-5">
      <v-col v-for="integrante in equipo" :key="integrante.nombre" cols="12" sm="6" md="4">
        <v-card rounded="xl" elevation="3" class="text-center h-100">
          <v-card-text class="pa-5">
            <v-avatar :color="integrante.color" size="64" class="mb-3">
              <span style="font-size:1.8rem">{{ integrante.emoji }}</span>
            </v-avatar>
            <div style="font-weight:800;font-size:1rem;color:#333;margin-bottom:4px">{{ integrante.nombre }}</div>
            <v-chip :color="integrante.color" size="small" label class="mb-2">{{ integrante.rol }}</v-chip>
            <div style="font-size:0.87rem;color:#666;line-height:1.5">{{ integrante.descripcion }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Accesibilidad -->
    <v-card rounded="xl" elevation="3" class="mb-5">
      <v-card-title class="pa-5 pb-2">
        <v-icon color="info" class="mr-2">mdi-accessibility</v-icon>
        <span style="font-family:'Fredoka One',cursive">Accesibilidad e Inclusión</span>
      </v-card-title>
      <v-card-text class="pa-5 pt-2">
        <v-row>
          <v-col v-for="caract in caracteristicas" :key="caract.titulo" cols="12" sm="6">
            <div class="d-flex align-start pa-3 rounded-xl mb-2" style="background:#E8EAF6">
              <span style="font-size:1.5rem;margin-right:10px">{{ caract.emoji }}</span>
              <div>
                <div style="font-weight:700;color:#3949AB;font-size:0.93rem">{{ caract.titulo }}</div>
                <div style="font-size:0.83rem;color:#555;line-height:1.4">{{ caract.descripcion }}</div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Licencia -->
    <v-card rounded="xl" elevation="2" color="#F5F5F5">
      <v-card-text class="pa-4 text-center" style="font-size:0.85rem;color:#888;line-height:1.8">
        <v-icon color="grey" class="mr-1">mdi-creative-commons</v-icon>
        Uso educativo sin ánimo de lucro ·
        <strong style="color:#5E35B1">Creative Commons BY-NC-SA 4.0</strong>
      </v-card-text>
    </v-card>

    <NavegacionPaginas />
  </div>
</template>

<script setup lang="ts">
import { useOvaStore } from '~/stores/ova'
const tienda = useOvaStore()
onMounted(() => tienda.markPageVisited('creditos'))

const equipo = [
  { nombre: 'Patricia Barroso Berrocal', rol: 'Dirección Pedagógica', emoji: '🎓', color: 'primary', descripcion: 'Docente de Filosofía - Diseño curricular y validación del aprendizaje.' },
  { nombre: 'Luis Galaraga', rol: 'Desarrollo Tecnológico', emoji: '💻', color: 'accent', descripcion: 'Equipo TIC - Programación e interactividad del OVA.' },
  { nombre: 'Lina Franco', rol: 'Desarrollo Tecnológico', emoji: '💻', color: 'accent', descripcion: 'Equipo TIC - Programación e interactividad del OVA.' },
  { nombre: 'Jesus Diaz Arteaga', rol: 'Desarrollo Tecnológico', emoji: '💻', color: 'accent', descripcion: 'Equipo TIC - Programación e interactividad del OVA.' },
  { nombre: 'Psicología Educativa', rol: 'Diseño Inclusivo', emoji: '🧠', color: 'success', descripcion: 'Adaptación de contenidos para educación inclusiva.' },
  { nombre: 'Rector/a', rol: 'Dirección Institucional', emoji: '🏫', color: 'secondary', descripcion: 'Apoyo institucional y gestión de recursos.' },
  { nombre: 'Estudiantes Piloto', rol: 'Pruebas', emoji: '⭐', color: 'warning', descripcion: 'Grados 10 y 11 que probaron y evaluaron el OVA.' },
  { nombre: 'Padres de Familia', rol: 'Comunidad', emoji: '❤️', color: 'error', descripcion: 'Apoyo continuo al aprendizaje desde el hogar.' },
]

const caracteristicas = [
  { emoji: '🔤', titulo: 'Texto grande y legible', descripcion: 'Fuentes amplificadas para facilitar la lectura.' },
  { emoji: '🔊', titulo: 'Lectura en voz alta', descripcion: 'Botón flotante para escuchar cualquier página.' },
  { emoji: '📱', titulo: 'Diseño responsivo', descripcion: 'Funciona en celular, tableta y computador.' },
  { emoji: '🔁', titulo: 'Sin límite de intentos', descripcion: 'Actividades y evaluación se pueden repetir.' },
  { emoji: '✅', titulo: 'Retroalimentación inmediata', descripcion: 'Respuesta visual y textual al instante.' },
  { emoji: '🗺️', titulo: 'Navegación simple', descripcion: 'Menú claro y botones siguiente/anterior en cada página.' },
]
</script>
