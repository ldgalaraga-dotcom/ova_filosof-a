<template>
  <div class="bienvenida-root">
    <!-- Fondo animado con columnas griegas -->
    <div class="fondo-decorativo" aria-hidden="true">
      <div class="columna col-1">🏛</div>
      <div class="columna col-2">🏛</div>
      <div class="columna col-3">🏛</div>
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

    <!-- Contenido central -->
    <div class="contenido-central">

      <!-- Medallón -->
      <div class="medallon-container" :class="{ visible: animado }">
        <div class="medallon">
          <span class="medallon-icono">🦉</span>
        </div>
        <div class="linea-decorativa"></div>
      </div>

      <!-- Título -->
      <div class="titulo-container" :class="{ visible: animado }">
        <div class="subtitulo-sup">Objeto Virtual de Aprendizaje</div>
        <h1 class="titulo-principal">
          <span class="titulo-phi">Φ</span>ilosophía
        </h1>
        <h2 class="titulo-secundario">para Todos</h2>
        <div class="separador-ornamental">
          <span class="sep-linea"></span>
          <span class="sep-simbolo">✦</span>
          <span class="sep-linea"></span>
        </div>
        <p class="descripcion-ova">
          Emprende un viaje al origen del pensamiento humano. Este OVA está diseñado
          para estudiantes de los grados <strong>X y XI</strong>, y te llevará por
          los grandes filósofos, sus preguntas eternas y las ideas que transformaron
          el mundo. Explorarás contenidos, actividades interactivas, evaluaciones y
          recursos que harán de la filosofía una aventura apasionante.
        </p>
        <div class="contenidos-ova">
          <div class="contenido-item">
            <span class="contenido-icono">▷</span>
            <span>Vídeos y contenido</span>
          </div>
          <div class="contenido-item">
            <span class="contenido-icono">✎</span>
            <span>Actividades interactivas</span>
          </div>
          <div class="contenido-item">
            <span class="contenido-icono">☑</span>
            <span>Evaluación final</span>
          </div>
          <div class="contenido-item">
            <span class="contenido-icono">📜</span>
            <span>Recursos y lecturas</span>
          </div>
        </div>
      </div>

      <!-- Formulario de nombre -->
      <div class="formulario-container" :class="{ visible: animado }">
        <div class="formulario-card">
          <div class="formulario-deco">🏛️</div>
          <p class="formulario-pregunta">¿Quién eres, viajero del saber?</p>
          <p class="formulario-desc">Ingresa tu nombre para que el ágora te reconozca</p>

          <div class="campo-nombre">
            <input
              ref="inputNombre"
              v-model="nombre"
              type="text"
              placeholder="Escribe tu nombre aquí..."
              class="input-nombre"
              maxlength="50"
              @keyup.enter="entrar"
              :disabled="entrando"
            />
          </div>

          <div v-if="error" class="mensaje-error">
            <span>⚠️ Por favor, escribe tu nombre para continuar</span>
          </div>

          <button
            class="btn-entrar"
            :class="{ 'btn-cargando': entrando }"
            @click="entrar"
            :disabled="entrando"
          >
            <span class="btn-texto">
              <span v-if="!entrando">🏛 Entrar al Ágora</span>
              <span v-else>Ingresando...</span>
            </span>
          </button>

          <div class="firma-ova">🦉 OVA Filosofía · MMXXVI</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useOvaStore } from '~/stores/ova'

definePageMeta({ layout: false })

const tienda = useOvaStore()
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
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(ellipse at 20% 15%, rgba(201,168,76,0.12) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 85%, rgba(74,127,165,0.12) 0%, transparent 55%),
    linear-gradient(160deg, #F8F4EC 0%, #EEE8D8 50%, #E8E0CC 100%);
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;
}

.fondo-decorativo {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
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

.contenido-central {
  position: relative;
  z-index: 10;
  max-width: 680px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.medallon-container {
  opacity: 0;
  transform: translateY(-30px);
  transition: opacity 0.7s ease, transform 0.7s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
}
.medallon-container.visible { opacity: 1; transform: translateY(0); }

.medallon {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: linear-gradient(135deg, #C9A84C, #E8C97A, #C9A84C);
  border: 3px solid rgba(255,255,255,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.8rem;
  box-shadow: 0 4px 24px rgba(201,168,76,0.4), 0 0 0 8px rgba(201,168,76,0.1), 0 0 0 16px rgba(201,168,76,0.05);
  animation: brillarMedallon 3s ease-in-out infinite;
}
@keyframes brillarMedallon {
  0%, 100% { box-shadow: 0 4px 24px rgba(201,168,76,0.4), 0 0 0 8px rgba(201,168,76,0.1); }
  50% { box-shadow: 0 4px 32px rgba(201,168,76,0.6), 0 0 0 12px rgba(201,168,76,0.18); }
}

.linea-decorativa { width:2px;height:24px;background:linear-gradient(to bottom,#C9A84C,transparent);margin-top:8px; }

.titulo-container {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s ease 0.25s, transform 0.8s ease 0.25s;
}
.titulo-container.visible { opacity: 1; transform: translateY(0); }

.subtitulo-sup { font-family:'Cinzel',serif;font-size:0.7rem;letter-spacing:0.25em;text-transform:uppercase;color:#8C7E6A;margin-bottom:6px; }
.titulo-principal { font-family:'Cinzel Decorative','Cinzel',serif;font-size:clamp(2.2rem,7vw,3.8rem);font-weight:700;color:#1B3A6B;letter-spacing:0.06em;line-height:1;margin:0 0 4px 0;text-shadow:2px 2px 0 rgba(201,168,76,0.2); }
.titulo-phi { color:#C9A84C;font-size:1.15em; }
.titulo-secundario { font-family:'Cinzel',serif;font-size:clamp(1rem,3vw,1.5rem);font-weight:400;color:#4A7FA5;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 16px 0; }

.separador-ornamental { display:flex;align-items:center;gap:12px;justify-content:center;margin:4px 0 18px; }
.sep-linea { flex:1;max-width:120px;height:1px;background:linear-gradient(90deg,transparent,#C9A84C); }
.sep-linea:last-child { background:linear-gradient(270deg,transparent,#C9A84C); }
.sep-simbolo { color:#C9A84C;font-size:0.9rem; }

.descripcion-ova { font-family:'EB Garamond',Georgia,serif;font-size:clamp(0.95rem,2.5vw,1.08rem);line-height:1.8;color:#4A3E30;margin:0 0 20px;padding:0 8px; }

.contenidos-ova { display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:6px; }
.contenido-item { display:flex;align-items:center;gap:6px;background:rgba(27,58,107,0.06);border:1px solid rgba(201,168,76,0.3);border-radius:20px;padding:5px 14px;font-family:'Cinzel',serif;font-size:0.72rem;letter-spacing:0.06em;color:#1B3A6B; }
.contenido-icono { color:#C9A84C; }

.formulario-container {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s;
  width: 100%;
  max-width: 480px;
  margin-top: 20px;
}
.formulario-container.visible { opacity: 1; transform: translateY(0); }

.formulario-card {
  background: rgba(255,252,245,0.92);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(201,168,76,0.4);
  border-radius: 20px;
  padding: 28px 32px 24px;
  box-shadow: 0 8px 40px rgba(27,58,107,0.1), 0 1px 0 rgba(255,255,255,0.8) inset;
  position: relative;
  overflow: hidden;
}
.formulario-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, #1B3A6B, #C9A84C, #1B3A6B);
}

.formulario-deco { font-size:2rem;margin-bottom:10px; }
.formulario-pregunta { font-family:'Cinzel',serif;font-size:1.1rem;font-weight:600;color:#1B3A6B;letter-spacing:0.06em;margin:0 0 4px; }
.formulario-desc { font-family:'EB Garamond',serif;font-size:0.95rem;color:#8C7E6A;font-style:italic;margin:0 0 18px; }

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
  transition: border-color 0.2s, box-shadow 0.2s;
}
.input-nombre::placeholder { color:#B0A48C;font-style:italic;letter-spacing:0.03em; }
.input-nombre:focus { border-color:#C9A84C;box-shadow:0 0 0 3px rgba(201,168,76,0.15); }

.mensaje-error { font-family:'EB Garamond',serif;font-size:0.9rem;color:#8B3A2A;margin-bottom:10px;padding:8px 12px;background:rgba(139,58,42,0.07);border-radius:8px;border-left:3px solid #8B3A2A; }

.btn-entrar {
  width: 100%;
  padding: 14px 24px;
  font-family: 'Cinzel', serif;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #E8C97A;
  background: linear-gradient(135deg, #1B3A6B 0%, #2A5298 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.2s;
  box-shadow: 0 4px 16px rgba(27,58,107,0.3);
  overflow: hidden;
}
.btn-entrar:hover:not(:disabled) { transform:translateY(-2px);box-shadow:0 6px 24px rgba(27,58,107,0.4); }
.btn-entrar:active:not(:disabled) { transform:translateY(0); }
.btn-entrar:disabled { opacity:0.7;cursor:not-allowed; }
.btn-texto { display:flex;align-items:center;justify-content:center;gap:10px; }

.firma-ova { font-family:'Cinzel',serif;font-size:0.62rem;color:#B0A48C;letter-spacing:0.12em;text-transform:uppercase;margin-top:16px; }

@media (max-width: 600px) {
  .bienvenida-root { padding: 12px; }
  .formulario-card { padding: 22px 18px 18px; }
  .contenido-item { font-size: 0.67rem; padding: 4px 10px; }
}
</style>
