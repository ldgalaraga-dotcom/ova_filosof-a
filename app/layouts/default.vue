<template>
  <v-app>
    <!-- ===== BARRA SUPERIOR ===== -->
    <v-app-bar color="primary" elevation="4" height="68">
      <template #prepend>
        <v-avatar size="48" color="white" class="ml-3" style="border:3px solid rgba(255,255,255,0.5)">
          <span style="font-size:1.5rem">🦉</span>
        </v-avatar>
      </template>
      <v-app-bar-title>
        <div style="font-family:'Fredoka One',cursive;font-size:1.25rem;color:white;letter-spacing:1px">
          Filosofía para Todos
        </div>
        <div style="font-size:0.7rem;color:rgba(255,255,255,0.82);font-weight:700">
          Grados 10 y 11 · OVA
        </div>
      </v-app-bar-title>
      <template #append>
        <v-chip v-if="tienda.studentName" color="white" size="small" class="mr-2" prepend-icon="mdi-account-circle">
          {{ tienda.studentName }}
        </v-chip>
        <v-chip color="secondary" size="small" class="mr-2" prepend-icon="mdi-star">
          {{ tienda.progress }}%
        </v-chip>
        <v-btn icon variant="text" color="white" class="d-md-none mr-1" @click="mostrarMenu = !mostrarMenu">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <!-- ===== BARRA LATERAL ===== -->
    <v-navigation-drawer v-model="mostrarMenu" :permanent="pantallaGrande" width="230" color="white" elevation="3">
      <div class="pa-4 pb-2">
        <div v-if="!tienda.studentName" class="text-center">
          <div style="font-size:2.2rem;margin-bottom:8px">🎓</div>
          <v-text-field
            v-model="nombreIngresado"
            label="¿Cómo te llamas?"
            density="compact"
            variant="outlined"
            color="primary"
            hide-details
            rounded="xl"
            @keyup.enter="guardarNombre"
          />
          <v-btn block color="primary" class="mt-2" size="small" rounded="xl" @click="guardarNombre">
            ¡Entrar!
          </v-btn>
        </div>
        <div v-else class="text-center">
          <div style="font-size:2rem">😊</div>
          <div style="font-weight:800;color:#5E35B1;font-size:1rem;margin-top:4px">
            ¡Hola, {{ tienda.studentName }}!
          </div>
          <v-progress-linear :model-value="tienda.progress" color="secondary" height="8" rounded class="mt-2" />
          <div style="font-size:0.76rem;color:#888;margin-top:4px;font-weight:700">Progreso: {{ tienda.progress }}%</div>
        </div>
      </div>

      <v-divider class="mb-1" />

      <v-list nav class="px-2 pt-1">
        <v-list-item
          v-for="elemento in elementosNav"
          :key="elemento.ruta"
          :prepend-icon="elemento.icono"
          rounded="xl"
          class="mb-1 elemento-nav"
          :class="{ 'elemento-activo': rutaActual.path === elemento.ruta }"
          style="font-weight:700;cursor:pointer"
          @click="navegar(elemento.ruta)"
        >
          <v-list-item-title style="font-size:0.97rem">{{ elemento.etiqueta }}</v-list-item-title>
          <template #append>
            <v-icon v-if="elemento.ruta === '/actividades' && tienda.activitiesCompleted === 4" color="success" size="16">mdi-check-circle</v-icon>
            <v-icon v-if="elemento.ruta === '/evaluacion' && tienda.evaluationCompleted" color="success" size="16">mdi-check-circle</v-icon>
          </template>
        </v-list-item>
      </v-list>

      <template #append>
        <v-divider />
        <div class="pa-3 text-center" style="font-size:0.66rem;color:#bbb">🦉 OVA Filosofía · 2026</div>
      </template>
    </v-navigation-drawer>

    <!-- ===== CONTENIDO PRINCIPAL ===== -->
    <v-main>
      <v-container fluid class="pa-4 pa-md-6">
        <slot />
      </v-container>
    </v-main>

    <!-- ===== BOTÓN FLOTANTE LEER EN VOZ ALTA ===== -->
    <v-tooltip text="Leer en voz alta" location="left">
      <template #activator="{ props: tp }">
        <v-btn
          v-bind="tp"
          :color="estandoLeyendo ? 'error' : 'primary'"
          :icon="estandoLeyendo ? 'mdi-stop-circle' : 'mdi-volume-high'"
          :class="{ 'leyendo-pulso': estandoLeyendo }"
          size="56"
          elevation="8"
          style="position:fixed;bottom:28px;right:28px;z-index:999;border-radius:50%"
          @click="alternarLectura"
        />
      </template>
    </v-tooltip>
  </v-app>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { useOvaStore } from '~/stores/ova'

const { mdAndUp: pantallaGrande } = useDisplay()
const mostrarMenu = ref(pantallaGrande.value)
const tienda = useOvaStore()
const rutaActual = useRoute()
const enrutador = useRouter()
const nombreIngresado = ref('')
const estandoLeyendo = ref(false)

watch(pantallaGrande, val => { mostrarMenu.value = val })
watch(() => rutaActual.path, () => detenerLectura())

function guardarNombre() {
  if (nombreIngresado.value.trim()) tienda.studentName = nombreIngresado.value.trim()
}

function navegar(ruta: string) {
  detenerLectura()
  enrutador.push(ruta)
  if (!pantallaGrande.value) mostrarMenu.value = false
}

function detenerLectura() {
  if (typeof window !== 'undefined') window.speechSynthesis?.cancel()
  estandoLeyendo.value = false
}

function alternarLectura() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  if (estandoLeyendo.value) { detenerLectura(); return }
  const el = document.querySelector('.v-main')
  const texto = (el as HTMLElement)?.innerText?.replace(/\n+/g, '. ').replace(/\s+/g, ' ').trim() ?? ''
  const enunciado = new SpeechSynthesisUtterance(texto)
  enunciado.lang = 'es-ES'
  enunciado.rate = 0.88
  enunciado.pitch = 1.05
  enunciado.onstart = () => { estandoLeyendo.value = true }
  enunciado.onend   = () => { estandoLeyendo.value = false }
  enunciado.onerror = () => { estandoLeyendo.value = false }
  window.speechSynthesis.speak(enunciado)
}

const elementosNav = [
  { ruta: '/contenido',   icono: 'mdi-play-circle',         etiqueta: '📺 Contenido' },
  { ruta: '/actividades', icono: 'mdi-pencil-box-multiple', etiqueta: '✏️ Actividades' },
  { ruta: '/evaluacion',  icono: 'mdi-clipboard-check',     etiqueta: '📋 Evaluación' },
  { ruta: '/recursos',    icono: 'mdi-bookshelf',           etiqueta: '📚 Recursos' },
  { ruta: '/creditos',    icono: 'mdi-account-group',       etiqueta: '👥 Créditos' },
]
</script>

<style>
.elemento-nav { color: #555 !important; transition: background 0.18s; }
.elemento-activo { background: linear-gradient(135deg,#5E35B1,#7E57C2) !important; }
.elemento-activo .v-icon,
.elemento-activo .v-list-item-title { color: white !important; }
@keyframes pulso {
  0%   { box-shadow: 0 0 0 0 rgba(229,57,53,.5); }
  70%  { box-shadow: 0 0 0 14px rgba(229,57,53,0); }
  100% { box-shadow: 0 0 0 0 rgba(229,57,53,0); }
}
.leyendo-pulso { animation: pulso 1.2s infinite; }
</style>
