<template>
  <v-app :theme="tienda.darkMode ? 'dark' : 'light'" :class="[tienda.fontClass, { 'dark-mode': tienda.darkMode }]">
    <!-- ===== BARRA SUPERIOR ===== -->
    <v-app-bar color="primary" elevation="4" height="72">
      <template #prepend>
        <div class="ml-3 d-flex align-center" style="gap:10px">
          <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#E8C97A,#C9A84C);border:2px solid rgba(255,255,255,0.4);display:flex;align-items:center;justify-content:center;font-size:1.6rem;box-shadow:0 2px 8px rgba(0,0,0,0.25)">🦉</div>
        </div>
      </template>

      <v-app-bar-title>
        <div style="font-family:'Cinzel',serif;font-size:1.2rem;color:#E8C97A;letter-spacing:0.12em;text-transform:uppercase;font-weight:700">
          Φιλοσοφία para Todos
        </div>
        <div style="font-size:0.68rem;color:rgba(232,201,122,0.75);letter-spacing:0.15em;text-transform:uppercase;font-family:'Cinzel',serif">
          Grados X · XI &nbsp;·&nbsp; OVA
        </div>
      </v-app-bar-title>

      <template #append>
        <!-- Logros badge -->
        <v-btn icon variant="text" color="secondary" class="mr-1" @click="mostrarLogros = true">
          <v-badge :content="tienda.logrosObtenidos.length" color="secondary" :model-value="tienda.logrosObtenidos.length > 0">
            <v-icon>mdi-trophy</v-icon>
          </v-badge>
        </v-btn>

        <!-- Accesibilidad -->
        <v-btn icon variant="text" color="secondary" class="mr-1" @click="mostrarAccesibilidad = true">
          <v-icon>mdi-cog</v-icon>
        </v-btn>

        <!-- Nombre -->
        <v-menu v-if="tienda.studentName" location="bottom end">
          <template #activator="{ props: menuProps }">
            <v-chip v-bind="menuProps" color="secondary" size="small" class="mr-2" prepend-icon="mdi-laurel-wreath"
              style="font-family:'Cinzel',serif;letter-spacing:0.05em;cursor:pointer">
              {{ tienda.studentName }}
            </v-chip>
          </template>
          <v-list density="compact" style="font-family:'Cinzel',serif;min-width:180px">
            <v-list-item disabled>
              <v-list-item-title style="font-size:0.75rem;color:#8C7E6A;letter-spacing:0.08em;text-transform:uppercase">
                ¡Hola, {{ tienda.studentName }}!
              </v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list-item prepend-icon="mdi-account-edit" @click="cambiarNombre" style="cursor:pointer">
              <v-list-item-title style="font-size:0.82rem">Cambiar nombre</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-chip color="secondary" size="small" class="mr-2" prepend-icon="mdi-star-four-points"
          style="font-family:'Cinzel',serif">
          {{ tienda.progress }}%
        </v-chip>
        <v-btn icon variant="text" color="secondary" class="d-md-none mr-1" @click="mostrarMenu = !mostrarMenu">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <!-- ===== BARRA LATERAL ===== -->
    <v-navigation-drawer v-model="mostrarMenu" :permanent="pantallaGrande" width="240"
      :style="tienda.darkMode
        ? 'background:linear-gradient(180deg,#1E1A14 0%,#16120E 100%);border-right:1px solid rgba(201,168,76,0.2)'
        : 'background:linear-gradient(180deg,#F8F4EC 0%,#EEE8D8 100%);border-right:1px solid rgba(201,168,76,0.3)'"
      elevation="2">
      <div style="height:4px;background:linear-gradient(90deg,#1B3A6B,#C9A84C,#1B3A6B)"></div>

      <div class="pa-4 pb-2">
        <div v-if="tienda.studentName" class="text-center">
          <div style="font-size:2rem">🏛️</div>
          <div style="font-family:'Cinzel',serif;font-weight:700;font-size:0.95rem;margin-top:6px;letter-spacing:0.05em"
            :style="tienda.darkMode ? 'color:#C9A84C' : 'color:#1B3A6B'">
            {{ tienda.studentName }}
          </div>
          <div style="height:1px;background:linear-gradient(90deg,transparent,#C9A84C,transparent);margin:8px 0"></div>
          <v-progress-linear :model-value="tienda.progress" color="secondary" height="6" rounded class="mt-1" />
          <div style="font-family:'Cinzel',serif;font-size:0.7rem;color:#8C7E6A;margin-top:4px;letter-spacing:0.08em;text-transform:uppercase">
            Progreso: {{ tienda.progress }}%
          </div>
          <!-- Logros en sidebar -->
          <div v-if="tienda.logrosObtenidos.length > 0" class="mt-2 d-flex flex-wrap justify-center gap-1">
            <span v-for="l in tienda.logrosObtenidos" :key="l.id" :title="l.nombre" style="font-size:1.1rem;cursor:default">{{ l.emoji }}</span>
          </div>
        </div>
      </div>

      <div style="display:flex;align-items:center;gap:8px;padding:0 16px;margin:4px 0">
        <div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,0.6))"></div>
        <span style="color:#C9A84C;font-size:0.85rem">✦</span>
        <div style="flex:1;height:1px;background:linear-gradient(90deg,rgba(201,168,76,0.6),transparent)"></div>
      </div>

      <v-list nav class="px-2 pt-1">
        <v-list-item
          v-for="elemento in elementosNav"
          :key="elemento.ruta"
          :prepend-icon="elemento.icono"
          rounded="lg"
          class="mb-1 elemento-nav"
          :class="{ 'elemento-activo': rutaActual.path === elemento.ruta }"
          style="font-family:'Cinzel',serif;font-weight:600;cursor:pointer;letter-spacing:0.04em"
          @click="navegar(elemento.ruta)"
        >
          <v-list-item-title style="font-size:0.88rem">{{ elemento.etiqueta }}</v-list-item-title>
          <template #append>
            <v-icon v-if="elemento.ruta === '/actividades' && tienda.activitiesCompleted >= 5" color="success" size="16">mdi-check-circle</v-icon>
            <v-icon v-if="elemento.ruta === '/evaluacion' && tienda.evaluationCompleted" color="success" size="16">mdi-check-circle</v-icon>
          </template>
        </v-list-item>
      </v-list>

      <template #append>
        <div style="height:1px;background:linear-gradient(90deg,transparent,#C9A84C,transparent);margin:0 16px"></div>
        <div class="pa-3 text-center" style="font-family:'Cinzel',serif;font-size:0.62rem;color:#8C7E6A;letter-spacing:0.1em;text-transform:uppercase">
          🦉 OVA Filosofía · MMXXVI
        </div>
        <div style="height:3px;background:linear-gradient(90deg,#1B3A6B,#C9A84C,#1B3A6B)"></div>
      </template>
    </v-navigation-drawer>

    <!-- ===== CONTENIDO PRINCIPAL ===== -->
    <v-main style="background:transparent">
      <v-container fluid class="pa-4 pa-md-6">
        <slot />
      </v-container>
    </v-main>

    <!-- ===== BOTÓN TTS ===== -->
    <v-tooltip text="Leer en voz alta" location="left">
      <template #activator="{ props: tp }">
        <v-btn
          v-bind="tp"
          :color="estandoLeyendo ? 'error' : 'primary'"
          :icon="estandoLeyendo ? 'mdi-stop-circle' : 'mdi-volume-high'"
          :class="{ 'leyendo-pulso': estandoLeyendo }"
          size="56" elevation="8"
          style="position:fixed;bottom:28px;right:28px;z-index:999;border-radius:50%;border:2px solid rgba(201,168,76,0.5)"
          @click="alternarLectura"
        />
      </template>
    </v-tooltip>

    <!-- ===== TOAST DE LOGRO ===== -->
    <Transition name="logro-toast">
      <div v-if="tienda.logroReciente" class="logro-toast" @click="tienda.clearLogroReciente()">
        <div class="logro-toast-inner">
          <div class="logro-emoji">{{ tienda.logroReciente.emoji }}</div>
          <div>
            <div class="logro-titulo">¡Logro desbloqueado!</div>
            <div class="logro-nombre">{{ tienda.logroReciente.nombre }}</div>
            <div class="logro-desc">{{ tienda.logroReciente.descripcion }}</div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ===== DIALOG LOGROS ===== -->
    <v-dialog v-model="mostrarLogros" max-width="520">
      <v-card rounded="xl" style="border:1px solid rgba(201,168,76,0.4)">
        <div style="height:4px;background:linear-gradient(90deg,#1B3A6B,#C9A84C,#1B3A6B)"></div>
        <v-card-title class="pa-5 pb-2 d-flex align-center">
          <span style="font-family:'Cinzel',serif;color:#1B3A6B;letter-spacing:0.08em">🏆 Tus Logros</span>
          <v-spacer />
          <v-btn icon variant="text" @click="mostrarLogros = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text class="pa-4">
          <div class="d-flex flex-wrap gap-2">
            <div v-for="logro in tienda.logros" :key="logro.id"
              class="logro-badge"
              :class="{ 'logro-obtenido': logro.obtenido, 'logro-bloqueado': !logro.obtenido }"
            >
              <div class="logro-badge-emoji">{{ logro.obtenido ? logro.emoji : '🔒' }}</div>
              <div class="logro-badge-nombre">{{ logro.nombre }}</div>
              <div class="logro-badge-desc">{{ logro.descripcion }}</div>
              <div v-if="logro.obtenido && logro.fecha" class="logro-badge-fecha">{{ logro.fecha }}</div>
            </div>
          </div>
          <div v-if="tienda.logrosObtenidos.length === 0" class="text-center pa-4" style="color:#8C7E6A;font-family:'EB Garamond',serif;font-style:italic">
            Aún no has desbloqueado logros. ¡Explora el OVA para conseguirlos!
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- ===== DIALOG ACCESIBILIDAD ===== -->
    <v-dialog v-model="mostrarAccesibilidad" max-width="400">
      <v-card rounded="xl" style="border:1px solid rgba(201,168,76,0.4)">
        <div style="height:4px;background:linear-gradient(90deg,#1B3A6B,#C9A84C,#1B3A6B)"></div>
        <v-card-title class="pa-5 pb-2 d-flex align-center">
          <span style="font-family:'Cinzel',serif;color:#1B3A6B;letter-spacing:0.08em">⚙️ Accesibilidad</span>
          <v-spacer />
          <v-btn icon variant="text" @click="mostrarAccesibilidad = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text class="pa-5">
          <!-- Modo oscuro -->
          <div style="font-family:'Cinzel',serif;font-size:0.82rem;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:10px"
            :style="tienda.darkMode ? 'color:#C9A84C' : 'color:#1B3A6B'">
            🌙 Modo de visualización
          </div>
          <div class="d-flex gap-2 mb-5">
            <v-btn
              :variant="!tienda.darkMode ? 'flat' : 'outlined'"
              :color="!tienda.darkMode ? 'primary' : 'default'"
              size="small" rounded="lg" @click="tienda.darkMode = false"
              style="font-family:'Cinzel',serif;flex:1"
              prepend-icon="mdi-white-balance-sunny"
            >
              Claro
            </v-btn>
            <v-btn
              :variant="tienda.darkMode ? 'flat' : 'outlined'"
              :color="tienda.darkMode ? 'secondary' : 'default'"
              size="small" rounded="lg" @click="tienda.darkMode = true"
              style="font-family:'Cinzel',serif;flex:1"
              prepend-icon="mdi-moon-waning-crescent"
            >
              Oscuro
            </v-btn>
          </div>

          <!-- Tamaño de letra -->
          <div style="font-family:'Cinzel',serif;font-size:0.82rem;color:#1B3A6B;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:10px">
            Tamaño de letra
          </div>
          <div class="d-flex gap-2 mb-5">
            <v-btn
              v-for="op in opcionesFuente" :key="op.val"
              :variant="tienda.fontSize === op.val ? 'flat' : 'outlined'"
              :color="tienda.fontSize === op.val ? 'primary' : 'default'"
              size="small" rounded="lg" @click="tienda.fontSize = op.val"
              style="font-family:'Cinzel',serif;flex:1"
            >
              {{ op.etiq }}
            </v-btn>
          </div>

          <!-- Velocidad TTS -->
          <div style="font-family:'Cinzel',serif;font-size:0.82rem;color:#1B3A6B;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:10px">
            Velocidad de lectura en voz alta
          </div>
          <div class="d-flex gap-2">
            <v-btn
              v-for="op in opcionesVelocidad" :key="op.val"
              :variant="tienda.ttsSpeed === op.val ? 'flat' : 'outlined'"
              :color="tienda.ttsSpeed === op.val ? 'primary' : 'default'"
              size="small" rounded="lg" @click="tienda.ttsSpeed = op.val"
              style="font-family:'Cinzel',serif;flex:1"
            >
              {{ op.etiq }}
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
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
const estandoLeyendo = ref(false)
const mostrarLogros = ref(false)
const mostrarAccesibilidad = ref(false)

const opcionesFuente = [
  { val: 'small' as const, etiq: 'A−' },
  { val: 'normal' as const, etiq: 'A' },
  { val: 'large' as const, etiq: 'A+' },
]
const opcionesVelocidad = [
  { val: 'slow' as const, etiq: '🐢 Lento' },
  { val: 'normal' as const, etiq: '▶ Normal' },
  { val: 'fast' as const, etiq: '⚡ Rápido' },
]

onMounted(() => {
  if (!tienda.studentName) navigateTo('/')
})

watch(pantallaGrande, val => { mostrarMenu.value = val })
watch(() => rutaActual.path, () => detenerLectura())

function cambiarNombre() {
  tienda.studentName = ''
  navigateTo('/')
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
  enunciado.rate = tienda.ttsFactor
  enunciado.pitch = 1.05
  enunciado.onstart = () => { estandoLeyendo.value = true }
  enunciado.onend   = () => { estandoLeyendo.value = false }
  enunciado.onerror = () => { estandoLeyendo.value = false }
  window.speechSynthesis.speak(enunciado)
}

const elementosNav = [
  { ruta: '/contenido',   icono: 'mdi-play-circle',         etiqueta: '▷ Contenido' },
  { ruta: '/actividades', icono: 'mdi-pencil-box-multiple', etiqueta: '✎ Actividades' },
  { ruta: '/evaluacion',  icono: 'mdi-clipboard-check',     etiqueta: '☑ Evaluación' },
  { ruta: '/recursos',    icono: 'mdi-bookshelf',           etiqueta: '📜 Recursos' },
  { ruta: '/creditos',    icono: 'mdi-account-group',       etiqueta: '🏛 Créditos' },
]
</script>

<style>
/* Tamaños de letra globales */
.font-size-small  { font-size: 90% !important; }
.font-size-normal { font-size: 100% !important; }
.font-size-large  { font-size: 116% !important; }

.elemento-nav { color: #2C2416 !important; transition: background 0.18s; }
.elemento-activo { background: linear-gradient(135deg,#1B3A6B,#4A7FA5) !important; }
.elemento-activo .v-icon,
.elemento-activo .v-list-item-title { color: #E8C97A !important; }

@keyframes pulso {
  0%   { box-shadow: 0 0 0 0 rgba(139,58,42,0.5); }
  70%  { box-shadow: 0 0 0 14px rgba(139,58,42,0); }
  100% { box-shadow: 0 0 0 0 rgba(139,58,42,0); }
}
.leyendo-pulso { animation: pulso 1.2s infinite; }

/* ===== TOAST DE LOGRO ===== */
.logro-toast {
  position: fixed;
  bottom: 100px;
  right: 24px;
  z-index: 9999;
  cursor: pointer;
  max-width: 300px;
}
.logro-toast-inner {
  display: flex;
  align-items: center;
  gap: 14px;
  background: linear-gradient(135deg, #1B3A6B, #2A5298);
  border: 2px solid #C9A84C;
  border-radius: 16px;
  padding: 14px 18px;
  box-shadow: 0 8px 32px rgba(27,58,107,0.4);
}
.logro-emoji { font-size: 2.2rem; flex-shrink: 0; }
.logro-titulo { font-family: 'Cinzel', serif; font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: #C9A84C; margin-bottom: 2px; }
.logro-nombre { font-family: 'Cinzel', serif; font-size: 0.9rem; font-weight: 700; color: #E8C97A; }
.logro-desc   { font-family: 'EB Garamond', serif; font-size: 0.82rem; color: rgba(232,201,122,0.8); margin-top: 2px; }

.logro-toast-enter-active { animation: toastIn 0.4s cubic-bezier(0.34,1.56,0.64,1); }
.logro-toast-leave-active { animation: toastOut 0.3s ease-in forwards; }
@keyframes toastIn  { from { transform: translateX(120%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes toastOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(120%); opacity: 0; } }

/* ===== BADGES DE LOGROS ===== */
.logro-badge {
  width: calc(50% - 6px);
  border-radius: 14px;
  padding: 12px;
  text-align: center;
  transition: transform 0.15s;
}
.logro-badge:hover { transform: translateY(-2px); }
.logro-obtenido { background: linear-gradient(135deg,#F8F4EC,#EEE8D8); border: 2px solid #C9A84C; }
.logro-bloqueado { background: #F0F0F0; border: 2px solid #DDD; opacity: 0.6; }
.logro-badge-emoji { font-size: 1.8rem; margin-bottom: 4px; }
.logro-badge-nombre { font-family: 'Cinzel', serif; font-size: 0.75rem; font-weight: 700; color: #1B3A6B; }
.logro-badge-desc { font-family: 'EB Garamond', serif; font-size: 0.75rem; color: #8C7E6A; line-height: 1.3; margin-top: 2px; }
.logro-badge-fecha { font-family: 'Cinzel', serif; font-size: 0.62rem; color: #C9A84C; margin-top: 4px; letter-spacing: 0.05em; }
</style>
