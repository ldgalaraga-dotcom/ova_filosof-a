<template>
  <div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,#1B3A6B,#122440);padding:20px">
    <!-- Ornamento superior -->
    <div style="position:absolute;top:0;left:0;right:0;height:8px;background:repeating-linear-gradient(90deg,#C9A84C 0px,#C9A84C 20px,#1B3A6B 20px,#1B3A6B 40px)"></div>

    <!-- Contenido principal -->
    <div class="text-center">
      <!-- Iconos decorativos -->
      <div style="margin-bottom:24px;opacity:0.9"><v-icon size="96" color="#C9A84C">mdi-pillar</v-icon></div>

      <!-- Número 404 estilizado -->
      <div style="
        font-family:'Cinzel Decorative',serif;
        font-size:5rem;
        font-weight:700;
        color:#E8C97A;
        letter-spacing:0.15em;
        margin-bottom:12px;
        text-shadow:0 4px 12px rgba(0,0,0,0.3);
        line-height:1;
      ">
        404
      </div>

      <!-- Mensaje principal -->
      <div style="
        font-family:'EB Garamond',serif;
        font-size:1.8rem;
        color:#E8C97A;
        margin-bottom:12px;
        letter-spacing:0.04em;
        font-style:italic;
      ">
        "No sé que hay aquí"
      </div>

      <!-- Subtítulo -->
      <div style="
        font-family:'Cinzel',serif;
        font-size:1.1rem;
        color:rgba(232,201,122,0.75);
        margin-bottom:24px;
        letter-spacing:0.06em;
        text-transform:uppercase;
        max-width:400px;
      ">
        La página que buscas no existe en el ágora
      </div>

      <!-- Mensaje filosófico -->
      <div style="
        font-family:'EB Garamond',serif;
        font-size:1rem;
        color:rgba(255,255,255,0.75);
        margin-bottom:32px;
        line-height:1.8;
        max-width:500px;
      ">
        Como dijo Sócrates: "Solo sé que no sé nada." Quizás esta página tampoco existe en el conocimiento universal.
        <br><br>
        Pero no te preocupes, ¡aún hay mucho que aprender en el ágora!
      </div>

      <!-- Botones de navegación -->
      <div class="d-flex justify-center gap-3 flex-wrap" style="margin-bottom:32px">
        <v-btn
          to="/contenido"
          color="secondary"
          size="large"
          rounded="lg"
          prepend-icon="mdi-play-circle"
          style="font-family:'Cinzel',serif;letter-spacing:0.08em;text-transform:uppercase"
        >
          Volver al Contenido
        </v-btn>
        <v-btn
          to="/"
          color="primary"
          variant="outlined"
          size="large"
          rounded="lg"
          prepend-icon="mdi-home"
          style="font-family:'Cinzel',serif;letter-spacing:0.08em;text-transform:uppercase;border-color:#E8C97A;color:#E8C97A"
        >
          Ir al Inicio
        </v-btn>
      </div>

      <!-- Decoración de iconos -->
      <div style="margin-top:40px">
        <div style="opacity:0.3;color:#C9A84C" class="d-flex align-center justify-center gap-4">
          <v-icon size="64">mdi-owl</v-icon>
          <span style="font-size: 2rem">✦</span>
          <v-icon size="64">mdi-bookshelf</v-icon>
        </div>
      </div>
    </div>

    <!-- Ornamento inferior -->
    <div style="position:absolute;bottom:0;left:0;right:0;height:8px;background:repeating-linear-gradient(90deg,#C9A84C 0px,#C9A84C 20px,#1B3A6B 20px,#1B3A6B 40px)"></div>
  </div>
</template>

<script setup lang="ts">
import { useAccessibility } from '~/composables/useAccessibility'

useAccessibility() // Mantén la instancia activa para que el watch funcione
useHead({
  title: 'Página no encontrada · OVA Filosofía',
})
</script>
