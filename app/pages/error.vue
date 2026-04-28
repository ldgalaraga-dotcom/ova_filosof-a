<template>
  <div class="error-root">
    <div class="fondo-deco" aria-hidden="true">
      <div class="columna c1">🏛</div>
      <div class="columna c2">🏛</div>
    </div>
    <div class="contenido">
      <div class="medallon">🦉</div>
      <div class="codigo">404</div>
      <h1 class="titulo">Página no encontrada</h1>
      <p class="desc">
        Como diría Sócrates: <em>"Solo sé que esta ruta no existe."</em><br>
        El camino que buscas no está en el ágora, {{ tienda.studentName || 'viajero' }}.
      </p>
      <div class="separador">
        <span class="sep-linea"></span>
        <span class="sep-sym">✦</span>
        <span class="sep-linea"></span>
      </div>
      <button class="btn-volver" @click="navigateTo('/contenido')">
        🏛 Volver al Ágora
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOvaStore } from '~/stores/ova'
definePageMeta({ layout: false })
const tienda = useOvaStore()
</script>

<style scoped>
.error-root {
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(160deg, #F8F4EC 0%, #EEE8D8 100%);
  position: relative; overflow: hidden; padding: 20px; box-sizing: border-box;
}
.fondo-deco { position: absolute; inset: 0; pointer-events: none; }
.columna { position: absolute; font-size: 10rem; opacity: 0.04; }
.c1 { left: 2%; top: 10%; }
.c2 { right: 3%; bottom: 10%; }
.contenido {
  text-align: center; max-width: 520px; width: 100%;
  background: rgba(255,252,245,0.9);
  border: 1px solid rgba(201,168,76,0.4);
  border-radius: 20px;
  padding: 48px 40px;
  box-shadow: 0 8px 40px rgba(27,58,107,0.1);
  position: relative;
}
.contenido::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, #1B3A6B, #C9A84C, #1B3A6B);
  border-radius: 20px 20px 0 0;
}
.medallon {
  font-size: 3.5rem;
  width: 80px; height: 80px; border-radius: 50%;
  background: linear-gradient(135deg, #C9A84C, #E8C97A);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px;
  box-shadow: 0 4px 20px rgba(201,168,76,0.35);
}
.codigo {
  font-family: 'Cinzel Decorative', 'Cinzel', serif;
  font-size: 5rem; font-weight: 700;
  color: rgba(27,58,107,0.15);
  line-height: 1;
  margin-bottom: 8px;
  letter-spacing: 0.1em;
}
.titulo {
  font-family: 'Cinzel', serif;
  font-size: 1.5rem; color: #1B3A6B;
  letter-spacing: 0.06em; margin: 0 0 12px;
}
.desc {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 1.05rem; color: #5A5040;
  line-height: 1.8; margin: 0 0 20px;
}
.separador {
  display: flex; align-items: center; gap: 12px;
  justify-content: center; margin: 0 0 24px;
}
.sep-linea { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #C9A84C); }
.sep-linea:last-child { background: linear-gradient(270deg, transparent, #C9A84C); }
.sep-sym { color: #C9A84C; }
.btn-volver {
  padding: 13px 28px;
  font-family: 'Cinzel', serif;
  font-size: 0.9rem; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: #E8C97A;
  background: linear-gradient(135deg, #1B3A6B, #2A5298);
  border: none; border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(27,58,107,0.3);
  transition: transform 0.15s, box-shadow 0.2s;
}
.btn-volver:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(27,58,107,0.4); }
</style>
