<template>
  <div class="bienvenida-root" :class="{ 'dark-mode': tienda.darkMode }">
    <!-- Fondo animado con columnas griegas -->
    <div class="fondo-decorativo" aria-hidden="true">
      <img src="/img/agora.png" class="logo-fondo" alt="" />
      <div class="columna col-1"><v-icon size="128">mdi-pillar</v-icon></div>
      <div class="columna col-2"><v-icon size="128">mdi-pillar</v-icon></div>
      <div class="columna col-3"><v-icon size="128">mdi-pillar</v-icon></div>
      <div class="orbe orbe-1"></div>
      <div class="orbe orbe-2"></div>
      <div class="orbe orbe-3"></div>
      <div class="friso friso-top">
        <span v-for="n in 30" :key="n" class="friso-item">◈</span>
      </div>
      <div class="friso friso-bottom">
        <span v-for="n in 30" :key="n" class="friso-item">◈</span>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="layout-principal" :class="{ visible: animado }">
      
      <!-- Columna de Texto -->
      <div class="columna-texto">
        <div class="subtitulo-sup">Objeto Virtual de Aprendizaje</div>
        <h1 class="titulo-principal">Ágora</h1>
        <h2 class="titulo-secundario">Filosofía para Todos</h2>
        <div class="separador-ornamental">
          <span class="sep-linea"></span>
          <span class="sep-simbolo">✦</span>
          <span class="sep-linea-der"></span>
        </div>
        <p class="descripcion-ova">
          Emprende un viaje al origen del pensamiento humano. Explora las ideas de los grandes filósofos a través de contenidos y retos interactivos en este ágora digital.
        </p>
      </div>

      <!-- Columna de Formulario -->
      <div class="columna-formulario">
        <div class="formulario-card">
          <div class="formulario-deco"><v-icon size="40">mdi-pillar</v-icon></div>
          <p class="formulario-pregunta">¿Quién eres, viajero del saber?</p>
          <p class="formulario-desc">Ingresa tu nombre para que el ágora te reconozca</p>

          <div class="campo-nombre">
            <label for="input-nombre" class="sr-only">Tu nombre</label>
            <input
              id="input-nombre"
              ref="inputNombre"
              v-model="nombre"
              type="text"
              placeholder="Escribe tu nombre aquí..."
              class="input-nombre"
              maxlength="50"
              autocomplete="name"
              aria-required="true"
              :aria-invalid="error ? 'true' : 'false'"
              :aria-describedby="error ? 'error-nombre' : undefined"
              @keyup.enter="entrar"
              :disabled="entrando"
            />
          </div>

          <div v-if="error" id="error-nombre" class="mensaje-error" role="alert" aria-live="assertive">
            <span class="d-flex align-center justify-center"><v-icon color="error" size="18" class="mr-1">mdi-alert</v-icon> Por favor, escribe tu nombre para continuar</span>
          </div>

          <button
            class="btn-entrar"
            :class="{ 'btn-cargando': entrando }"
            @click="entrar"
            :disabled="entrando"
          >
            <span class="btn-texto">
              <span v-if="!entrando" class="d-flex align-center"><v-icon class="mr-2">mdi-pillar</v-icon> Entrar al Ágora</span>
              <span v-else>Ingresando...</span>
            </span>
          </button>

          <div class="firma-ova d-flex flex-column align-center">
            Ágora · Filosofía para Todos · MMXXVI
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useOvaStore } from '~/stores/ova'
import { useAccessibility } from '~/composables/useAccessibility'

definePageMeta({ layout: false })

const tienda = useOvaStore()
useAccessibility() // Mantén la instancia activa para que el watch funcione
const nombre = ref('')
const error = ref(false)
const entrando = ref(false)
const animado = ref(false)
const inputNombre = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (tienda.studentName) {
    navigateTo('/contenido')
    return
  }
  setTimeout(() => { animado.value = true }, 100)
  setTimeout(() => { inputNombre.value?.focus() }, 800)
})

function entrar() {
  const nombreLimpio = nombre.value.trim()
  if (!nombreLimpio) {
    error.value = true
    inputNombre.value?.focus()
    return
  }
  error.value = false
  entrando.value = true
  tienda.studentName = nombreLimpio
  setTimeout(() => { navigateTo('/contenido') }, 600)
}
</script>

<style scoped>
.bienvenida-root {
  --text-dark: #E8C97A;
  --text-muted: rgba(232,201,122,0.85);
  --text-primary: #E8C97A;
  --bg-card: rgba(13, 30, 56, 0.6);
  --bg-light: rgba(201, 168, 76, 0.08);

  min-height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(ellipse at 20% 15%, rgba(201,168,76,0.15) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 85%, rgba(74,127,165,0.15) 0%, transparent 55%),
    linear-gradient(160deg, #1B3A6B 0%, #1B3A6B 100%);
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;
}
.bienvenida-root.dark-mode {
  background:
    radial-gradient(ellipse at 20% 15%, rgba(201,168,76,0.08) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 85%, rgba(74,127,165,0.08) 0%, transparent 55%),
    linear-gradient(160deg, #1B3A6B 0%, #1B3A6B 100%);
}

.fondo-decorativo {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.logo-fondo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vh;
  height: 90vh;
  max-width: 90vw;
  max-height: 90vw;
  object-fit: contain;
  opacity: 0.6;
  filter: grayscale(0.2) blur(1px);
  animation: pulsoLogo 10s ease-in-out infinite;
  z-index: 0;
  pointer-events: none;
}
.dark-mode .logo-fondo {
  opacity: 0.6;
  filter: grayscale(0.5) blur(1px);
}

@keyframes pulsoLogo {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.03); }
}

.columna {
  position: absolute;
  font-size: 8rem;
  opacity: 0.04;
  animation: flotarColumna 8s ease-in-out infinite;
}
.col-1 { left: 2%; top: 15%; animation-delay: 0s; }
.col-2 { right: 3%; top: 20%; animation-delay: 2.5s; }
.col-3 { left: 50%; top: 60%; animation-delay: 5s; }

@keyframes flotarColumna {
  0%, 100% { transform: translateY(0px) rotate(-2deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
}

.orbe {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  animation: pulsarOrbe 6s ease-in-out infinite;
}
.orbe-1 { width:300px;height:300px;background:radial-gradient(circle,rgba(201,168,76,0.15),transparent);top:-80px;left:-80px;animation-delay:0s; }
.orbe-2 { width:250px;height:250px;background:radial-gradient(circle,rgba(27,58,107,0.12),transparent);bottom:-60px;right:-60px;animation-delay:3s; }
.orbe-3 { width:200px;height:200px;background:radial-gradient(circle,rgba(74,127,165,0.1),transparent);top:40%;left:40%;animation-delay:1.5s; }

@keyframes pulsarOrbe {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.2); opacity: 1; }
}

.friso { position:absolute;width:100%;display:flex;justify-content:space-around;overflow:hidden; }
.friso-top { top:0; }
.friso-bottom { bottom:0; }
.friso-item { font-size:1rem;color:#C9A84C;opacity:0.25;line-height:1;padding:4px 0; }

.layout-principal {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  opacity: 60;
  transform: translateY(30px);
  transition: opacity 1s ease, transform 1s ease;
}
.layout-principal.visible {
  opacity: 1;
  transform: translateY(0);
}

.columna-texto {
  flex: 1;
  text-align: left;
}

.columna-formulario {
  flex: 0 0 420px;
  width: 100%;
}

.subtitulo-sup { font-family:'Cinzel',serif;font-size:0.85rem;letter-spacing:0.25em;text-transform:uppercase;color:var(--text-muted);margin-bottom:12px; }
.dark-mode .subtitulo-sup { color: #C9A84C; }

.titulo-principal { font-family:'Cinzel Decorative','Cinzel',serif;font-size:clamp(3rem,8vw,5.5rem);font-weight:700;color:var(--text-primary);letter-spacing:0.06em;line-height:1;margin:0 0 10px 0;text-shadow:2px 2px 0 rgba(201,168,76,0.2); }
.dark-mode .titulo-principal { color: #E8C97A; text-shadow: 2px 2px 0 rgba(0,0,0,0.5); }

.titulo-secundario { font-family:'Cinzel',serif;font-size:clamp(1.2rem,4vw,2rem);font-weight:400;color:#d6d640;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 24px 0; }
.dark-mode .titulo-secundario { color: #e6cb36; }

.separador-ornamental { display:flex;align-items:center;gap:12px;justify-content:flex-start;margin:10px 0 24px; }
.sep-linea { width: 80px;height:1px;background:linear-gradient(90deg,var(--text-primary),transparent); }
.sep-linea-der { width: 80px;height:1px;background:linear-gradient(270deg,var(--text-primary),transparent); } 
.sep-simbolo { color:#C9A84C;font-size:1.2rem; }

.descripcion-ova { font-family:'EB Garamond',Georgia,serif;font-size:clamp(1.05rem,2.5vw,1.25rem);line-height:1.8;color:var(--text-dark);margin:0;max-width: 450px; }
.dark-mode .descripcion-ova { color: rgba(232,201,122,0.85); }

.formulario-card {
  background:var(--bg-card);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(201,168,76,0.4);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 40px rgba(27,58,107,0.1), 0 1px 0 rgba(255,255,255,0.8) inset;
  position: relative;
  overflow: hidden;
  text-align: center;
}
.dark-mode .formulario-card {
  background: rgba(22,18,14,0.92);
  box-shadow: 0 8px 40px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset;
}
.formulario-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, #1B3A6B, #C9A84C, #1B3A6B);
}

.formulario-deco { font-size:2rem;margin-bottom:10px; }
.formulario-pregunta { font-family:'Cinzel',serif;font-size:1.1rem;font-weight:600;color:var(--text-primary);letter-spacing:0.06em;margin:0 0 4px; }
.dark-mode .formulario-pregunta { color: #E8C97A; }
.formulario-desc { font-family:'EB Garamond',serif;font-size:0.95rem;color:var(--text-muted);font-style:italic;margin:0 0 18px; }
.dark-mode .formulario-desc { color: rgba(232,201,122,0.6); }

.campo-nombre { margin-bottom:12px; }

.input-nombre {
  width: 100%;
  padding: 13px 18px;
  font-family: 'Cinzel', serif;
  font-size: 1rem;
  letter-spacing: 0.05em;
  color: #1B3A6B;
  background: rgba(248,244,236,0.8);
  border: 2px solid rgba(201,168,76,0.4);
  border-radius: 12px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s, color 0.2s;
}
.dark-mode .input-nombre {
  background: rgba(0,0,0,0.3);
  color: #E8C97A;
  border-color: rgba(201,168,76,0.3);
}
.input-nombre::placeholder { color:#B0A48C;font-style:italic;letter-spacing:0.03em; }
.dark-mode .input-nombre::placeholder { color: rgba(201,168,76,0.4); }
.input-nombre:focus { border-color:#C9A84C;box-shadow:0 0 0 3px rgba(201,168,76,0.15); }

.mensaje-error { font-family:'EB Garamond',serif;font-size:0.9rem;color:#8B3A2A;margin-bottom:10px;padding:8px 12px;background:rgba(139,58,42,0.07);border-radius:8px;border-left:3px solid #8B3A2A; }
.dark-mode .mensaje-error { color: #E57373; background: rgba(229,115,115,0.1); border-color: #E57373; }

.btn-entrar {
  width: 100%;
  padding: 14px 24px;
  font-family: 'Cinzel', serif;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #1B3A6B;
  background: linear-gradient(135deg, #E8C97A 0%, #C9A84C 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.2s;
  box-shadow: 0 4px 16px rgba(201,168,76,0.3);
  overflow: hidden;
}
.btn-entrar:hover:not(:disabled) { transform:translateY(-2px);box-shadow:0 6px 24px rgba(27,58,107,0.4); }
.btn-entrar:active:not(:disabled) { transform:translateY(0); }
.btn-entrar:disabled { opacity:0.7;cursor:not-allowed; }
.btn-texto { display:flex;align-items:center;justify-content:center;gap:10px; }

.firma-ova { font-family:'Cinzel',serif;font-size:0.62rem;color:#B0A48C;letter-spacing:0.12em;text-transform:uppercase;margin-top:16px; }

@media (max-width: 900px) {
  .layout-principal {
    flex-direction: column;
    text-align: center;
    gap: 30px;
  }
  .columna-texto {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .separador-ornamental { justify-content: center; }
  .sep-linea { width: 60px; background:linear-gradient(90deg,transparent,#C9A84C); }
  .sep-linea-der { width: 60px; background:linear-gradient(270deg,transparent,#C9A84C); }
  .descripcion-ova { padding: 0 20px; max-width: 600px; }
  .columna-formulario { flex: 0 0 auto; max-width: 480px; }
}

@media (max-width: 600px) {
  .bienvenida-root { padding: 16px; }
  .formulario-card { padding: 24px 20px 20px; }
  .titulo-principal { font-size: 3.5rem; }
  .titulo-secundario { font-size: 1.2rem; }
}

/* WCAG: screen reader only text */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
