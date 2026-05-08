<template>
  <v-app :theme="tienda.darkMode ? 'dark' : 'light'" :class="[tienda.fontClass, { 'dark-mode': tienda.darkMode }]">
    <!-- Enlace de salto para WCAG 2.1 AA —  2.4.1 Skip Blocks -->
    <a href="#contenido-principal" class="skip-link">Saltar al contenido principal</a>

    <!-- ===== BARRA SUPERIOR ===== -->
    <v-app-bar color="primary" elevation="4" class="app-header" role="banner">
      <template #prepend>
        <div class="ml-2 ml-md-3 d-flex align-center" style="gap:8px">
          <div class="header-logo">
            <img src="/img/agora.png" alt="Logo Ágora" style="width:100%;height:100%;object-fit:contain;" />
          </div>
        </div>
      </template>

      <v-app-bar-title>
        <div class="header-title">Ágora</div>
        <div class="header-subtitle d-none d-sm-block">Filosofía para Todos &nbsp;·&nbsp; OVA</div>
      </v-app-bar-title>

      <template #append>
        <!-- Logros badge -->
        <v-btn icon variant="text" color="white" class="mr-1" @click="mostrarLogros = true" aria-label="Ver logros desbloqueados">
          <v-badge :content="tienda.logrosObtenidos.length" color="secondary" text-color="white" :model-value="tienda.logrosObtenidos.length > 0">
            <v-icon>mdi-trophy</v-icon>
          </v-badge>
        </v-btn>

        <!-- Accesibilidad -->
        <v-btn icon variant="text" color="white" class="mr-1" @click="mostrarAccesibilidad = true" aria-label="Abrir configuración de accesibilidad">
          <v-icon>mdi-cog</v-icon>
        </v-btn>

        <!-- Nombre -->
        <v-menu v-if="tienda.studentName" location="bottom end">
          <template #activator="{ props: menuProps }">
            <v-chip v-bind="menuProps" color="white" variant="outlined" size="small" class="mr-2 d-none d-sm-inline-flex" prepend-icon="mdi-laurel-wreath"
              style="font-family:'Cinzel',serif;letter-spacing:0.05em;cursor:pointer;background:rgba(255,255,255,0.1)">
              {{ tienda.studentName }}
            </v-chip>
          </template>
          <v-list density="compact" style="font-family:'Cinzel',serif;min-width:180px">
            <v-list-item disabled>
              <v-list-item-title style="font-size:0.75rem;color:var(--text-muted);letter-spacing:0.08em;text-transform:uppercase">
                ¡Hola, {{ tienda.studentName }}!
              </v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list-item link prepend-icon="mdi-account-edit" @click="cambiarNombre">
              <v-list-item-title style="font-size:0.82rem">Cambiar nombre</v-list-item-title>
            </v-list-item>
            <v-list-item link prepend-icon="mdi-logout" @click="cerrarSesion" style="color:#b71c1c;">
              <v-list-item-title style="font-size:0.82rem">Cerrar sesión y reiniciar</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-chip color="white" variant="outlined" size="small" class="mr-1 d-none d-sm-inline-flex" prepend-icon="mdi-star-four-points"
          style="font-family:'Cinzel',serif;background:rgba(255,255,255,0.1)">
          {{ tienda.progress }}%
        </v-chip>
        <v-btn icon variant="text" color="white" class="d-md-none mr-1" @click="mostrarMenu = !mostrarMenu" aria-label="Abrir menú de navegación">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <!-- ===== BARRA LATERAL ===== -->
    <v-navigation-drawer v-model="mostrarMenu" :permanent="pantallaGrande" width="240"
      :style="tienda.darkMode
        ? 'background:linear-gradient(180deg,#1E1A14 0%,#16120E 100%);border-right:1px solid rgba(201,168,76,0.2)'
        : 'background:linear-gradient(180deg,#F8F4EC 0%,#EEE8D8 100%);border-right:1px solid rgba(201,168,76,0.3)'"
      elevation="2" role="navigation" aria-label="Navegación principal">
      <div style="height:4px;background:linear-gradient(90deg,#1B3A6B,#C9A84C,#1B3A6B)"></div>

      <div class="pa-4 pb-2">
        <div v-if="tienda.studentName" class="text-center">
          <div><v-icon size="36" color="#C9A84C">{{ iconoPaginaActual }}</v-icon></div>
          <div style="font-family:'Cinzel',serif;font-weight:700;font-size:0.95rem;margin-top:6px;letter-spacing:0.05em"
            :style="tienda.darkMode ? 'color:#C9A84C' : 'color:var(--text-primary)'">
            {{ tienda.studentName }}
          </div>
          <div style="height:1px;background:linear-gradient(90deg,transparent,#C9A84C,transparent);margin:8px 0"></div>
          <v-progress-linear :model-value="tienda.progress" color="secondary" height="6" rounded class="mt-1" />
          <div style="font-family:'Cinzel',serif;font-size:0.7rem;color:var(--text-muted);margin-top:4px;letter-spacing:0.08em;text-transform:uppercase">
            Progreso: {{ tienda.progress }}%
          </div>
          <!-- Detalles de progreso -->
          <div class="mt-2 d-flex justify-center gap-3" style="font-size:0.75rem; color:var(--text-muted)">
            <span title="Videos vistos" class="d-flex align-center gap-1"><v-icon size="14">mdi-video</v-icon> {{ tienda.progressDetails.videosWatched }}/{{ tienda.progressDetails.totalVideos }}</span>
            <span title="Actividades completadas" class="d-flex align-center gap-1"><v-icon size="14">mdi-pencil</v-icon> {{ tienda.progressDetails.activitiesCompleted }}/{{ tienda.progressDetails.totalActivities }}</span>
            <span title="Evaluación" class="d-flex align-center gap-1"><v-icon size="14">mdi-clipboard-text</v-icon> {{ tienda.progressDetails.evaluationDone ? '✓' : '✗' }}</span>
          </div>
          <!-- Logros en sidebar -->
          <div v-if="tienda.logrosObtenidos.length > 0" class="mt-2 d-flex flex-wrap justify-center gap-1">
            <v-icon v-for="l in tienda.logrosObtenidos" :key="l.id" :title="l.nombre" size="24" color="#C9A84C" style="cursor:default">{{ l.icon }}</v-icon>
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
        <div class="pa-3 text-center d-flex flex-column align-center" style="font-family:'Cinzel',serif;font-size:0.62rem;color:var(--text-muted);letter-spacing:0.1em;text-transform:uppercase">
          <img src="/img/agora.png" style="width:24px;height:24px;object-fit:contain;margin-bottom:6px;opacity:0.8;border-radius:50%;" />
          Ágora · MMXXVI
        </div>
        <div style="height:3px;background:linear-gradient(90deg,#1B3A6B,#C9A84C,#1B3A6B)"></div>
      </template>
    </v-navigation-drawer>

    <!-- ===== CONTENIDO PRINCIPAL ===== -->
    <v-main style="background:transparent" role="main">
      <v-container fluid class="pa-4 pa-md-6" id="contenido-principal">
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
          :aria-label="estandoLeyendo ? 'Detener lectura en voz alta' : 'Leer página en voz alta'"
          :aria-pressed="estandoLeyendo"
          style="position:fixed;bottom:28px;right:28px;z-index:999;border-radius:50%;border:2px solid rgba(201,168,76,0.5)"
          @click="alternarLectura"
        />
      </template>
    </v-tooltip>

    <!-- ===== TOAST DE LOGRO ===== -->
    <Transition name="logro-toast">
      <div v-if="tienda.logroReciente" class="logro-toast" role="alert" aria-live="assertive" @click="tienda.clearLogroReciente()">
        <div class="logro-toast-inner">
          <div class="logro-emoji" style="color: #E8C97A"><v-icon size="40">{{ tienda.logroReciente.icon }}</v-icon></div>
          <div>
            <div class="logro-titulo">¡Logro desbloqueado!</div>
            <div class="logro-nombre">{{ tienda.logroReciente.nombre }}</div>
            <div class="logro-desc">{{ tienda.logroReciente.descripcion }}</div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ===== DIALOG LOGROS ===== -->
    <v-dialog v-model="mostrarLogros" max-width="520" aria-label="Tus Logros">
      <v-card rounded="xl" style="border:1px solid rgba(201,168,76,0.4)">
        <div style="height:4px;background:linear-gradient(90deg,#1B3A6B,#C9A84C,#1B3A6B)"></div>
        <v-card-title class="pa-5 pb-2 d-flex align-center">
          <span style="font-family:'Cinzel',serif;letter-spacing:0.08em; display:flex; align-items:center;"
            :style="tienda.darkMode ? 'color:#E8C97A' : 'color:var(--text-primary)'">
            <v-icon class="mr-2">mdi-trophy</v-icon> Tus Logros
          </span>
          <v-spacer />
          <v-btn icon variant="text" @click="mostrarLogros = false" aria-label="Cerrar ventana de logros"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text class="pa-4" style="max-height:70vh;overflow-y:auto">
          <!-- Contador de logros -->
          <div class="mb-3 text-center">
            <v-chip :color="tienda.logros.every(l => l.obtenido) ? 'warning' : 'primary'" variant="tonal" size="small"
              style="font-family:'Cinzel',serif;font-size:0.72rem;letter-spacing:0.06em">
              {{ tienda.logrosObtenidos.length }} / {{ tienda.logros.length }} logros desbloqueados
            </v-chip>
          </div>
          <div class="d-flex flex-wrap gap-2">
            <div v-for="logro in tienda.logros" :key="logro.id"
              class="logro-badge"
              :class="[
                logro.obtenido ? 'logro-obtenido' : 'logro-bloqueado',
                tienda.darkMode ? 'dark-badge' : ''
              ]"
            >
              <div class="logro-badge-emoji">
                <v-icon v-if="logro.obtenido" color="#C9A84C">{{ logro.icon }}</v-icon>
                <v-icon v-else color="grey">mdi-lock</v-icon>
              </div>
              <div class="logro-badge-nombre"
                :style="tienda.darkMode ? 'color:#E8C97A' : 'color:var(--text-primary)'">
                {{ logro.nombre }}
              </div>
              <div class="logro-badge-desc"
                :style="tienda.darkMode ? 'color:rgba(232,201,122,0.75)' : 'color:var(--text-muted)'">
                {{ logro.descripcion }}
              </div>
              <div v-if="logro.obtenido && logro.fecha" class="logro-badge-fecha">{{ logro.fecha }}</div>
            </div>
          </div>
          <div v-if="tienda.logrosObtenidos.length === 0" class="text-center pa-4"
            :style="tienda.darkMode ? 'color:rgba(232,201,122,0.7);font-family:EB Garamond,serif;font-style:italic' : 'color:var(--text-muted);font-family:EB Garamond,serif;font-style:italic'">
            Aún no has desbloqueado logros. ¡Explora el OVA para conseguirlos!
          </div>

          <!-- Botón de certificado: solo visible si TODOS los logros están completos -->
          <div v-if="tienda.logros.every(l => l.obtenido)" class="mt-4 text-center">
            <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,0.5),transparent);margin-bottom:16px"></div>
            <div style="margin-bottom:6px"><v-icon size="40" color="#C9A84C">mdi-school</v-icon></div>
            <div style="font-family:'Cinzel Decorative',serif;font-size:0.95rem;margin-bottom:4px"
              :style="tienda.darkMode ? 'color:#E8C97A' : 'color:var(--text-primary)'">
              ¡Logros Completos!
            </div>
            <div style="font-family:'EB Garamond',serif;font-size:0.85rem;font-style:italic;margin-bottom:14px"
              :style="tienda.darkMode ? 'color:rgba(232,201,122,0.75)' : 'color:var(--text-muted)'">
              Has dominado el arte de la filosofía. Descarga tu certificado.
            </div>
            <v-btn
              color="secondary"
              size="large"
              rounded="lg"
              prepend-icon="mdi-certificate"
              style="font-family:'Cinzel',serif;letter-spacing:0.08em;text-transform:uppercase;font-weight:700"
              @click="generarCertificado"
            >
              Descargar Certificado
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- ===== DIALOG ACCESIBILIDAD ===== -->
    <v-dialog v-model="mostrarAccesibilidad" max-width="400" aria-label="Configuración de accesibilidad">
      <v-card rounded="xl" style="border:1px solid rgba(201,168,76,0.4)">
        <div style="height:4px;background:linear-gradient(90deg,#1B3A6B,#C9A84C,#1B3A6B)"></div>
        <v-card-title class="pa-5 pb-2 d-flex align-center">
          <span style="font-family:'Cinzel',serif;color:var(--text-primary);letter-spacing:0.08em;display:flex;align-items:center;"><v-icon class="mr-2">mdi-cog</v-icon> Accesibilidad</span>
          <v-spacer />
          <v-btn icon variant="text" @click="mostrarAccesibilidad = false" aria-label="Cerrar configuración de accesibilidad"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text class="pa-5">
          <!-- Modo oscuro -->
          <div style="font-family:'Cinzel',serif;font-size:0.82rem;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:10px"
            :style="tienda.darkMode ? 'color:#C9A84C' : 'color:var(--text-primary)'">
            <v-icon size="16" class="mr-1">mdi-theme-light-dark</v-icon> Modo de visualización
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
          <div style="font-family:'Cinzel',serif;font-size:0.82rem;color:var(--text-primary);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:10px">
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
          <div style="font-family:'Cinzel',serif;font-size:0.82rem;color:var(--text-primary);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:10px">
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

    <!-- ===== DIALOG CONFIRMACIÓN CIERRE SESIÓN ===== -->
    <v-dialog v-model="mostrarConfirmarCerrar" max-width="400">
      <v-card rounded="xl" class="pa-4 text-center">
        <v-card-title class="justify-center">
          <v-icon size="64" color="error" class="mb-4">mdi-alert-circle-outline</v-icon>
          <div style="font-family:'Cinzel',serif; white-space: normal;">¿Cerrar sesión y reiniciar?</div>
        </v-card-title>
        <v-card-text style="font-family:'EB Garamond',serif; font-size: 1.1rem;">
          Se borrará todo tu progreso y logros. Esta acción no se puede deshacer.
        </v-card-text>
        <v-card-actions class="justify-center gap-2 mt-4">
          <v-btn variant="outlined" rounded="lg" @click="mostrarConfirmarCerrar = false" style="font-family:'Cinzel',serif;">Cancelar</v-btn>
          <v-btn color="error" variant="flat" rounded="lg" @click="confirmarCierreSesion" style="font-family:'Cinzel',serif;">Sí, reiniciar todo</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- ===== PIE DE PÁGINA INSTITUCIONAL ===== -->
    <v-footer
      app
      border
      class="py-2 px-4 institucional-footer"
      :style="tienda.darkMode 
        ? 'background: #16120E; border-top: 1px solid rgba(201,168,76,0.3); color: #E8C97A' 
        : 'background: #F8F4EC; border-top: 1px solid rgba(201,168,76,0.4); color: #1B3A6B'"
    >
      <div class="w-100 d-flex flex-column flex-sm-row align-center justify-space-between gap-2">
        <div class="d-flex align-center" style="gap: 12px">
          <div class="footer-logo-container">
            <img src="/img/Escudo Universidad de Cordoba.jpg" alt="Logo Universidad de Córdoba" class="footer-logo" />
          </div>
          <div class="footer-info">
            <div class="universidad-nombre">Universidad de Córdoba</div>
            <div class="carrera-nombre">Licenciatura en Informática</div>
          </div>
        </div>
        
        <div class="footer-copyright">
          Ágora · Filosofía para Todos · MMXXVI
        </div>
      </div>
    </v-footer>
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
const mostrarConfirmarCerrar = ref(false)

const opcionesFuente = [
  { val: 'small' as const, etiq: 'A−' },
  { val: 'normal' as const, etiq: 'A' },
  { val: 'large' as const, etiq: 'A+' },
]
const opcionesVelocidad = [
  { val: 'slow' as const, etiq: 'Lento' },
  { val: 'normal' as const, etiq: 'Normal' },
  { val: 'fast' as const, etiq: 'Rápido' },
]

onMounted(() => {
  if (!tienda.studentName) navigateTo('/')
  else tienda._desbloquearLogro('madrugador')
})

watch(pantallaGrande, val => { mostrarMenu.value = val })
watch(() => rutaActual.path, () => detenerLectura())

function cambiarNombre() {
  console.log('Cambiando nombre...')
  tienda.studentName = ''
  if (typeof window !== 'undefined') {
    localStorage.removeItem('ova')
    window.location.href = '/'
  }
}

function cerrarSesion() {
  mostrarConfirmarCerrar.value = true
}

function confirmarCierreSesion() {
  console.log('Confirmado: Reiniciando OVA...')
  tienda.resetTodo()
  if (typeof window !== 'undefined') {
    localStorage.clear()
    window.location.href = '/'
  }
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
  { ruta: '/recursos',    icono: 'mdi-bookshelf',           etiqueta: 'Recursos' },
  { ruta: '/evaluacion',  icono: 'mdi-clipboard-check',     etiqueta: 'Evaluación' },
  { ruta: '/creditos',    icono: 'mdi-account-group',       etiqueta: 'Créditos' },
]

const iconoPaginaActual = computed(() => {
  const encontrado = elementosNav.find(e => rutaActual.path === e.ruta)
  return encontrado ? encontrado.icono : 'mdi-pillar'
})

function generarCertificado() {
  const nombre = tienda.studentName || 'Estudiante Filósofo'
  const fecha = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })
  const logrosEmojis = tienda.logros.map(l => `<i class="mdi ${l.icon}" style="margin: 0 4px; color: #C9A84C;"></i>`).join('')
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <title>Certificado - Φιλοσοφία para Todos</title>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;700&family=EB+Garamond:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet"/>
  <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { background:#1B3A6B; display:flex; align-items:center; justify-content:center; min-height:100vh; font-family:'EB Garamond',serif; }
    .cert {
      width:800px; background:linear-gradient(160deg,#1B3A6B 0%,#1B3A6B 50%,#1B3A6B 100%);
      border:3px solid #C9A84C; border-radius:20px; padding:60px 70px; position:relative; overflow:hidden;
      box-shadow:0 0 80px rgba(201,168,76,0.25), inset 0 0 60px rgba(201,168,76,0.04);
    }
    .corner { position:absolute; width:80px; height:80px; }
    .corner-tl { top:12px; left:12px; border-top:3px solid #C9A84C; border-left:3px solid #C9A84C; border-radius:4px 0 0 0; }
    .corner-tr { top:12px; right:12px; border-top:3px solid #C9A84C; border-right:3px solid #C9A84C; border-radius:0 4px 0 0; }
    .corner-bl { bottom:12px; left:12px; border-bottom:3px solid #C9A84C; border-left:3px solid #C9A84C; border-radius:0 0 0 4px; }
    .corner-br { bottom:12px; right:12px; border-bottom:3px solid #C9A84C; border-right:3px solid #C9A84C; border-radius:0 0 4px 0; }
    .owl { font-size:4rem; text-align:center; margin-bottom:10px; filter:drop-shadow(0 0 16px rgba(201,168,76,0.5)); }
    .title-small { font-family:'Cinzel',serif; font-size:0.8rem; letter-spacing:0.3em; text-transform:uppercase; color:#C9A84C; text-align:center; margin-bottom:14px; }
    .title-main { font-family:'Cinzel Decorative',serif; font-size:2rem; color:#E8C97A; text-align:center; letter-spacing:0.06em; margin-bottom:8px; line-height:1.2; text-shadow:0 0 30px rgba(232,201,122,0.4); }
    .divider { height:1px; background:linear-gradient(90deg,transparent,#C9A84C,transparent); margin:20px 0; }
    .presented { font-family:'Cinzel',serif; font-size:0.78rem; letter-spacing:0.2em; text-transform:uppercase; color:rgba(201,168,76,0.7); text-align:center; margin-bottom:10px; }
    .student-name { font-family:'Cinzel Decorative',serif; font-size:2.4rem; color:#fff; text-align:center; margin-bottom:6px; text-shadow:0 0 20px rgba(255,255,255,0.2); }
    .description { font-family:'EB Garamond',serif; font-size:1.05rem; color:rgba(232,201,122,0.8); text-align:center; font-style:italic; line-height:1.7; margin-bottom:20px; }
    .achievements { font-size:1.5rem; text-align:center; letter-spacing:4px; margin-bottom:22px; filter:drop-shadow(0 0 6px rgba(201,168,76,0.4)); }
    .badge-row { display:flex; justify-content:center; gap:14px; margin-bottom:24px; flex-wrap:wrap; }
    .badge { background:rgba(201,168,76,0.1); border:1px solid rgba(201,168,76,0.35); border-radius:10px; padding:8px 14px; text-align:center; }
    .badge-emoji { font-size:1.4rem; color: #C9A84C; }
    .badge-label { font-family:'Cinzel',serif; font-size:0.6rem; letter-spacing:0.08em; text-transform:uppercase; color:#C9A84C; margin-top:3px; }
    .quote { font-family:'EB Garamond',serif; font-size:1.1rem; color:rgba(232,201,122,0.6); text-align:center; font-style:italic; margin-bottom:28px; line-height:1.5; }
    .footer-row { display:flex; justify-content:space-between; align-items:flex-end; }
    .footer-left { text-align:left; }
    .footer-right { text-align:right; }
    .footer-label { font-family:'Cinzel',serif; font-size:0.62rem; letter-spacing:0.12em; text-transform:uppercase; color:rgba(201,168,76,0.5); margin-bottom:4px; }
    .footer-value { font-family:'Cinzel',serif; font-size:0.82rem; color:#C9A84C; }
    .seal { font-size:3rem; text-align:center; filter:drop-shadow(0 0 20px rgba(201,168,76,0.6)); }
    .print-btn { position:fixed; bottom:24px; right:24px; background:#C9A84C; color:#1B3A6B; border:none; border-radius:12px; padding:12px 28px; font-family:'Cinzel',serif; font-size:0.9rem; letter-spacing:0.08em; cursor:pointer; font-weight:700; box-shadow:0 4px 20px rgba(201,168,76,0.4); }
    .print-btn:hover { background:#E8C97A; }
    @media print { .print-btn { display:none; } body { background:white; } .cert { box-shadow:none; } }
  </style>
</head>
<body>
  <div class="cert">
    <div class="corner corner-tl"></div>
    <div class="corner corner-tr"></div>
    <div class="corner corner-bl"></div>
    <div class="corner corner-br"></div>
    <img src="/img/agora.png" alt="Ágora" style="width:80px; height:80px; object-fit:contain; border-radius:50%; display:block; margin:0 auto 10px; box-shadow:0 0 16px rgba(201,168,76,0.5);" />
    <div class="title-small">Certificado de Excelencia Filosófica</div>
    <div class="title-main">Ágora</div>
    <div class="divider"></div>
    <div class="presented">Se otorga con honor a</div>
    <div class="student-name">${nombre}</div>
    <div class="description">
      Por haber completado con dedicación y excelencia el<br/>
      Objeto Virtual de Aprendizaje de Filosofía para Grados X y XI,<br/>
      demostrando dominio de los grandes temas del pensamiento clásico.
    </div>
    <div class="achievements">${logrosEmojis}</div>
    <div class="quote">
      «El inicio de la sabiduría es el asombro.»<br/>
      <span style="font-size:0.85rem;letter-spacing:0.1em;font-style:normal;font-family:'Cinzel',serif;color:rgba(201,168,76,0.5)">— ARISTÓTELES</span>
    </div>
    <div class="divider"></div>
    <div class="footer-row">
      <div class="footer-left">
        <div class="footer-label">Fecha de obtención</div>
        <div class="footer-value">${fecha}</div>
      </div>
      <div style="text-align:center">
        <div class="seal"><v-icon color="#C9A84C" size="32">mdi-trophy-award</v-icon></div>
      </div>
      <div class="footer-right">
        <div class="footer-label">Logros desbloqueados</div>
        <div class="footer-value">15 / 15</div>
      </div>
    </div>
  </div>
  <button class="print-btn" onclick="window.print()"><v-icon size="18" class="mr-1">mdi-printer</v-icon> Imprimir / Guardar PDF</button>
</body>
</html>`
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  window.open(url, '_blank')
}
</script>

<style>
/* Tamaños de letra globales */
.font-size-small  { font-size: 90% !important; }
.font-size-normal { font-size: 100% !important; }
.font-size-large  { font-size: 116% !important; }

/* ===== APP BAR RESPONSIVE ===== */
.app-header {
  height: 72px !important;
}
.header-logo {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  border: 2px solid rgba(201,168,76,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.25);
  padding: 2px;
  flex-shrink: 0;
}
.header-title {
  font-family: 'Cinzel', serif;
  font-size: 1.4rem;
  color: #E8C97A;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
}
.header-subtitle {
  font-size: 0.68rem;
  color: rgba(232,201,122,0.75);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-family: 'Cinzel', serif;
}

@media (max-width: 600px) {
  .app-header {
    height: 56px !important;
  }
  .header-logo {
    width: 38px;
    height: 38px;
  }
  .header-title {
    font-size: 1rem;
    letter-spacing: 0.06em;
  }
}

.elemento-nav { transition: background 0.18s; }
.v-theme--light .elemento-nav { color:var(--text-dark) !important; }
.v-theme--dark .elemento-nav { color: #E8C97A !important; }

.elemento-activo { background: linear-gradient(135deg,#1B3A6B,#1B3A6B) !important; }
.v-theme--light .elemento-activo .v-icon,
.v-theme--light .elemento-activo .v-list-item-title { color: #F8F4EC !important; }
.v-theme--dark .elemento-activo .v-icon,
.v-theme--dark .elemento-activo .v-list-item-title { color: #FFFFFF !important; }

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
  background: linear-gradient(135deg, #1B3A6B, #122440);
  border: 2px solid #C9A84C;
  border-radius: 16px;
  padding: 14px 18px;
  box-shadow: 0 8px 32px rgba(27,58,107,0.4);
}
.logro-emoji { flex-shrink: 0; }
.logro-titulo { font-family: 'Cinzel', serif; font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: #C9A84C; margin-bottom: 2px; }
.logro-nombre { font-family: 'Cinzel', serif; font-size: 0.9rem; font-weight: 700; color: #E8C97A; }
.logro-desc   { font-family: 'EB Garamond', serif; font-size: 0.82rem; color: rgba(232,201,122,0.8); margin-top: 2px; }

.logro-toast-enter-active { animation: toastIn 0.4s cubic-bezier(0.34,1.56,0.64,1); }
.logro-toast-leave-active { animation: toastOut 0.3s ease-in forwards; }
@keyframes toastIn  { from { transform: translateX(120%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes toastOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(120%); opacity: 0; } }

/* ===== BADGES DE LOGROS ===== */
.logro-badge {
  width: calc(50% - 4px);
  border-radius: 14px;
  padding: 12px;
  text-align: center;
  transition: transform 0.15s;
}
.logro-badge:hover { transform: translateY(-2px); }
.logro-obtenido { background: linear-gradient(135deg,#F8F4EC,#EEE8D8); border: 2px solid #C9A84C; }
.logro-bloqueado { background:var(--bg-light); border: 2px solid #DDD; opacity: 0.6; }
.dark-badge.logro-obtenido { background: linear-gradient(135deg,#2A2010,#3A300A) !important; border: 2px solid #C9A84C; }
.dark-badge.logro-bloqueado { background: #1A1A1A !important; border: 2px solid #333; opacity: 0.6; }
.logro-badge-emoji { font-size: 1.8rem; margin-bottom: 4px; }
.logro-badge-nombre { font-family: 'Cinzel', serif; font-size: 0.75rem; font-weight: 700; color:var(--text-primary); }
.logro-badge-desc { font-family: 'EB Garamond', serif; font-size: 0.75rem; color:var(--text-muted); line-height: 1.3; margin-top: 2px; }
.logro-badge-fecha { font-family: 'Cinzel', serif; font-size: 0.62rem; color: #C9A84C; margin-top: 4px; letter-spacing: 0.05em; }

/* ===== WCAG 2.1 AA — Accesibilidad ===== */

/* 2.4.1 Skip navigation link */
.skip-link {
  position: absolute;
  top: -100px;
  left: 16px;
  z-index: 10000;
  background: #1B3A6B;
  color: #E8C97A;
  padding: 12px 24px;
  border-radius: 0 0 8px 8px;
  font-family: 'Cinzel', serif;
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: 0.06em;
  transition: top 0.2s ease;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
}
.skip-link:focus {
  top: 0;
  outline: 3px solid #C9A84C;
  outline-offset: 2px;
}

/* 2.4.7 Focus Visible — indicador claro de foco para teclado */
*:focus-visible {
  outline: 3px solid #C9A84C !important;
  outline-offset: 2px !important;
}

/* 2.5.5 Target Size — tamaño mínimo 44x44px para elementos interactivos */
button, [role="button"], a, input, select, textarea,
.v-btn, .v-list-item, .v-chip, .opcion-btn, .sopa-celda {
  min-height: 44px;
  min-width: 44px;
}

/* Excepción: chips decorativos que no necesitan ser interactivos */
.v-chip--disabled { min-height: unset; min-width: unset; }

/* ===== PIE DE PÁGINA INSTITUCIONAL ===== */
.institucional-footer {
  transition: background-color 0.3s, color 0.3s;
  z-index: 100;
}

.footer-logo-container {
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 8px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.footer-logo {
  height: 100%;
  width: auto;
  object-fit: contain;
}

.footer-info {
  font-family: 'Cinzel', serif;
  line-height: 1.2;
}

.universidad-nombre {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.carrera-nombre {
  font-size: 0.7rem;
  opacity: 0.8;
  letter-spacing: 0.02em;
}

.footer-copyright {
  font-family: 'Cinzel', serif;
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.6;
}

@media (max-width: 600px) {
  .institucional-footer {
    padding: 8px !important;
  }
  /* Mover el botón TTS más arriba en móvil para que no tape el footer */
  .v-btn[style*="fixed"] {
    bottom: 70px !important;
  }
  .footer-logo-container {
    width: 32px;
    height: 32px;
  }
  .universidad-nombre {
    font-size: 0.75rem;
  }
  .carrera-nombre {
    display: none; /* Ocultar carrera en pantallas muy pequeñas para ahorrar espacio */
  }
  .footer-copyright {
    font-size: 0.55rem;
    margin-top: 4px;
  }
}
</style>
