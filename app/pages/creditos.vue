<template>
  <div>
    <div class="d-flex align-center mb-5">
      <v-icon color="secondary" size="38" class="mr-3">mdi-account-group</v-icon>
      <div>
        <h1 style="font-family:'Cinzel',serif;font-size:1.8rem;color:#C9A84C;line-height:1.1;letter-spacing:0.08em;text-transform:uppercase">
          Créditos
        </h1>
        <div style="color:#8C7E6A;font-size:0.92rem;font-family:'EB Garamond',serif;font-style:italic">
          Los artesanos de este Ágora del Saber ✦
        </div>
      </div>
    </div>

    <!-- Banner principal -->
    <v-card rounded="lg" elevation="4" class="mb-6 text-center"
      style="background:linear-gradient(135deg,#1B3A6B,#2A5298,#1B3A6B);border:2px solid rgba(201,168,76,0.4)"
    >
      <!-- Friso superior -->
      <div style="height:6px;background:repeating-linear-gradient(90deg,#C9A84C 0px,#C9A84C 10px,#1B3A6B 10px,#1B3A6B 20px)"></div>
      <v-card-text class="pa-8">
        <div style="font-size:3.5rem;margin-bottom:10px">🏛️</div>
        <div style="font-family:'Cinzel Decorative',serif;font-size:1.7rem;color:#E8C97A;margin-bottom:4px;letter-spacing:0.08em">
          Filosofía para Todos
        </div>
        <div style="color:rgba(232,201,122,0.75);font-size:1rem;margin-bottom:16px;font-family:'EB Garamond',serif;font-style:italic">
          Objeto Virtual de Aprendizaje · Grados X y XI
        </div>
        <!-- Divisor ornamental -->
        <div style="display:flex;align-items:center;gap:10px;margin:0 auto 14px;max-width:300px">
          <div style="flex:1;height:1px;background:rgba(201,168,76,0.5)"></div>
          <span style="color:#C9A84C;font-size:0.9rem">⬥</span>
          <div style="flex:1;height:1px;background:rgba(201,168,76,0.5)"></div>
        </div>
        <div class="d-flex justify-center flex-wrap gap-2">
          <v-chip color="secondary" label style="font-family:'Cinzel',serif;font-size:0.75rem;letter-spacing:0.08em">📅 MMXXVI</v-chip>
          <v-chip color="secondary" label style="font-family:'Cinzel',serif;font-size:0.75rem;letter-spacing:0.08em">⚗️ Filosofía</v-chip>
          <v-chip color="secondary" label style="font-family:'Cinzel',serif;font-size:0.75rem;letter-spacing:0.08em">🌎 Colombia</v-chip>
          <v-chip color="secondary" label style="font-family:'Cinzel',serif;font-size:0.75rem;letter-spacing:0.08em">♿ Inclusivo</v-chip>
        </div>
      </v-card-text>
      <div style="height:6px;background:repeating-linear-gradient(90deg,#C9A84C 0px,#C9A84C 10px,#1B3A6B 10px,#1B3A6B 20px)"></div>
    </v-card>

    <!-- Equipo -->
    <div style="font-family:'Cinzel',serif;font-size:1.3rem;color:#1B3A6B;text-align:center;margin-bottom:6px;letter-spacing:0.1em;text-transform:uppercase">
      Los Filósofos del Proyecto
    </div>
    <div style="display:flex;align-items:center;gap:8px;padding:0;margin:0 auto 20px;max-width:360px">
      <div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,#C9A84C)"></div>
      <span style="color:#C9A84C">✦</span>
      <div style="flex:1;height:1px;background:linear-gradient(90deg,#C9A84C,transparent)"></div>
    </div>

    <v-row class="mb-5">
      <v-col v-for="integrante in equipo" :key="integrante.nombre" cols="12" sm="6" md="4">
        <v-card rounded="lg" elevation="2" class="text-center h-100 greek-panel">
          <div style="height:4px;background:linear-gradient(90deg,#1B3A6B,#C9A84C,#1B3A6B)"></div>
          <v-card-text class="pa-5">
            <v-avatar :color="integrante.color" size="60" class="mb-3"
              style="border:2px solid rgba(201,168,76,0.5)">
              <span style="font-size:1.6rem">{{ integrante.emoji }}</span>
            </v-avatar>
            <div style="font-family:'Cinzel',serif;font-weight:700;font-size:0.88rem;color:#1B3A6B;margin-bottom:4px;letter-spacing:0.03em">
              {{ integrante.nombre }}
            </div>
            <v-chip :color="integrante.color" size="small" label class="mb-2"
              style="font-family:'Cinzel',serif;font-size:0.72rem;letter-spacing:0.06em">
              {{ integrante.rol }}
            </v-chip>
            <div style="font-family:'EB Garamond',serif;font-size:0.9rem;color:#5A5040;line-height:1.55;font-style:italic">
              {{ integrante.descripcion }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Accesibilidad -->
    <v-card rounded="lg" elevation="2" class="mb-5 greek-panel">
      <div style="height:4px;background:linear-gradient(90deg,#1B3A6B,#C9A84C,#1B3A6B)"></div>
      <v-card-title class="pa-5 pb-2">
        <v-icon color="accent" class="mr-2">mdi-accessibility</v-icon>
        <span style="font-family:'Cinzel',serif;letter-spacing:0.06em;color:#1B3A6B">Accesibilidad e Inclusión</span>
      </v-card-title>
      <v-card-text class="pa-5 pt-2">
        <v-row>
          <v-col v-for="caract in caracteristicas" :key="caract.titulo" cols="12" sm="6">
            <div class="d-flex align-start pa-3 rounded-lg mb-2"
              style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25)">
              <span style="font-size:1.4rem;margin-right:10px">{{ caract.emoji }}</span>
              <div>
                <div style="font-family:'Cinzel',serif;font-weight:600;color:#1B3A6B;font-size:0.85rem;letter-spacing:0.04em">
                  {{ caract.titulo }}
                </div>
                <div style="font-family:'EB Garamond',serif;font-size:0.88rem;color:#5A5040;line-height:1.4;font-style:italic">
                  {{ caract.descripcion }}
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Licencia -->
    <v-card rounded="lg" elevation="1" style="background:#F5F0E8;border:1px solid rgba(201,168,76,0.3)">
      <v-card-text class="pa-4 text-center"
        style="font-family:'EB Garamond',serif;font-size:0.9rem;color:#8C7E6A;line-height:1.8;font-style:italic">
        <v-icon color="grey" class="mr-1">mdi-creative-commons</v-icon>
        Uso educativo sin ánimo de lucro ·
        <strong style="color:#1B3A6B;font-style:normal;font-family:'Cinzel',serif;font-size:0.8rem;letter-spacing:0.05em">
          Creative Commons BY-NC-SA 4.0
        </strong>
      </v-card-text>
    </v-card>

    <NavegacionPaginas />
  </div>
</template>

<script setup lang="ts">
import { useOvaStore } from '~/stores/ova'
import NavegacionPaginas from '~/componentes/NavegacionPaginas.vue'
const tienda = useOvaStore()
onMounted(() => tienda.markPageVisited('creditos'))

const equipo = [
  { nombre: 'Patricia Barroso Berrocal', rol: 'Dirección Pedagógica', emoji: '🎓', color: 'primary',   descripcion: 'Docente de Filosofía — Diseño curricular y validación del aprendizaje.' },
  { nombre: 'Luis Galaraga',             rol: 'Desarrollo TIC',       emoji: '💻', color: 'accent',    descripcion: 'Equipo TIC — Programación e interactividad del OVA.' },
  { nombre: 'Lina Franco',               rol: 'Desarrollo TIC',       emoji: '💻', color: 'accent',    descripcion: 'Equipo TIC — Programación e interactividad del OVA.' },
  { nombre: 'Jesus Diaz Arteaga',        rol: 'Desarrollo TIC',       emoji: '💻', color: 'accent',    descripcion: 'Equipo TIC — Programación e interactividad del OVA.' },
  { nombre: 'Psicología Educativa',      rol: 'Diseño Inclusivo',     emoji: '🧠', color: 'success',   descripcion: 'Adaptación de contenidos para educación inclusiva.' },
  { nombre: 'Rector/a',                  rol: 'Dirección Inst.',      emoji: '🏛️', color: 'secondary', descripcion: 'Apoyo institucional y gestión de recursos.' },
  { nombre: 'Estudiantes Piloto',        rol: 'Pruebas',              emoji: '⭐', color: 'warning',   descripcion: 'Grados X y XI que probaron y evaluaron el OVA.' },
  { nombre: 'Padres de Familia',         rol: 'Comunidad',            emoji: '❤️', color: 'error',     descripcion: 'Apoyo continuo al aprendizaje desde el hogar.' },
]

const caracteristicas = [
  { emoji: '🔤', titulo: 'Texto grande y legible',   descripcion: 'Fuentes clásicas amplificadas para facilitar la lectura.' },
  { emoji: '🔊', titulo: 'Lectura en voz alta',       descripcion: 'Botón flotante para escuchar cualquier página.' },
  { emoji: '📱', titulo: 'Diseño responsivo',         descripcion: 'Funciona en celular, tableta y computador.' },
  { emoji: '🔁', titulo: 'Sin límite de intentos',    descripcion: 'Actividades y evaluación se pueden repetir.' },
  { emoji: '✅', titulo: 'Retroalimentación inmediata', descripcion: 'Respuesta visual y textual al instante.' },
  { emoji: '🗺️', titulo: 'Navegación simple',         descripcion: 'Menú claro y botones siguiente/anterior en cada página.' },
]
</script>
